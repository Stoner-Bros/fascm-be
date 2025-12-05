import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { IoTDevicesService } from './io-t-devices.service';
import { IoTGateway } from './iot.gateway';
import { AreaSettingsService } from 'src/area-settings/area-settings.service';
import { AreaAlertsService } from 'src/area-alerts/area-alerts.service';
import { TruckSettingsService } from 'src/truck-settings/truck-settings.service';
import { TruckAlertsService } from 'src/truck-alerts/truck-alerts.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;
  private readonly BROKER_URL =
    'mqtts://03bb100ff666407a80eaeafa79b3d9d5.s1.eu.hivemq.cloud:8883';
  private readonly USERNAME = 'bububai';
  private readonly PASSWORD = 'Bububai257';
  private readonly TOPIC_DATA = 'sensors/dht22/data';
  private readonly TOPIC_STATUS = 'sensors/dht22/status';

  constructor(
    private readonly ioTDevicesService: IoTDevicesService,
    private readonly areaSettingService: AreaSettingsService,
    private readonly areaAlertService: AreaAlertsService,
    private readonly truckSettingService: TruckSettingsService,
    private readonly truckAlertService: TruckAlertsService,
    private readonly iotGateway: IoTGateway,
  ) {}

  onModuleInit() {
    this.connectToBroker();
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }

  private connectToBroker() {
    this.client = mqtt.connect(this.BROKER_URL, {
      username: this.USERNAME,
      password: this.PASSWORD,
      clientId: `fascm-backend-${Math.random().toString(16).slice(3)}`,
      clean: true,
      reconnectPeriod: 5000,
    });

    this.client.on('connect', () => {
      // Subscribe to data topic
      this.client.subscribe(this.TOPIC_DATA, (err) => {
        if (err) {
          console.error('❌ Failed to subscribe to data topic:', err);
        }
      });

      // Subscribe to status topic (for LWT messages)
      this.client.subscribe(this.TOPIC_STATUS, (err) => {
        if (err) {
          console.error('❌ Failed to subscribe to status topic:', err);
        }
      });
    });

    this.client.on('message', async (topic, message) => {
      try {
        const payload = message.toString();

        if (topic === this.TOPIC_DATA) {
          // Handle sensor data
          const data = JSON.parse(payload);
          await this.handleSensorData(data);
        } else if (topic === this.TOPIC_STATUS) {
          // Handle status messages (including LWT offline messages)
          await this.handleStatusMessage(payload);
        }
      } catch (error) {
        console.error('❌ Error processing MQTT message:', error);
      }
    });

    this.client.on('error', (error) => {
      console.error('❌ MQTT connection error:', error);
    });

    this.client.on('offline', () => {
      // MQTT client offline
    });

    this.client.on('reconnect', () => {
      // MQTT client reconnecting
    });
  }
  //connect to socket io
  private async handleSensorData(data: {
    deviceId?: string;
    temperature: number;
    humidity: number;
  }) {
    if (!data.deviceId) {
      console.error('⚠️  Device ID missing in MQTT payload');
      return;
    }

    await this.ioTDevicesService.updateDeviceData(
      data.deviceId,
      data.temperature,
      data.humidity,
    );

    const device = await this.ioTDevicesService.findById(data.deviceId);
    this.iotGateway.broadcastUpdate({
      deviceId: data.deviceId,
      areaId: device?.id ?? null,
      truckId: device?.id ?? null,
      temperature: data.temperature,
      humidity: data.humidity,
      timestamp: new Date().toISOString(),
    });

    // Check area alerts
    const area = await this.ioTDevicesService.findAreaByDeviceId(data.deviceId);
    if (area) {
      await this.checkAreaAlert(area.id, data.temperature, data.humidity);
    }

    // Check truck alerts
    const truck = await this.ioTDevicesService.findTruckByDeviceId(
      data.deviceId,
    );
    if (truck) {
      await this.checkTruckAlert(truck.id, data.temperature, data.humidity);
    }
  }

  private async checkAreaAlert(
    areaId: string,
    temperature: number,
    humidity: number,
  ) {
    const areaSetting = await this.areaSettingService.findByAreaId(areaId);
    if (!areaSetting) return;

    const existAlert =
      await this.areaAlertService.findActiveAlertByAreaId(areaId);
    const isOutOfRange =
      (areaSetting.minTemperature !== null &&
        areaSetting.minTemperature !== undefined &&
        temperature < areaSetting.minTemperature) ||
      (areaSetting.maxTemperature !== null &&
        areaSetting.maxTemperature !== undefined &&
        temperature > areaSetting.maxTemperature) ||
      (areaSetting.minHumidity !== null &&
        areaSetting.minHumidity !== undefined &&
        humidity < areaSetting.minHumidity) ||
      (areaSetting.maxHumidity !== null &&
        areaSetting.maxHumidity !== undefined &&
        humidity > areaSetting.maxHumidity);

    if (isOutOfRange) {
      const message = `Alert for temperature and humidity out of range. Current temperature: ${temperature}, humidity: ${humidity}`;

      if (existAlert) {
        existAlert.status = 'active';
        existAlert.message = message;
        await this.areaAlertService.update(existAlert.id, existAlert);
      } else {
        await this.areaAlertService.create({
          area: { id: areaId },
          status: 'active',
          message,
          alertType: 'sensor',
        });
      }
    } else if (existAlert) {
      existAlert.status = 'resolved';
      existAlert.message = `Alert resolved. Current temperature: ${temperature}, humidity: ${humidity}`;
      await this.areaAlertService.update(existAlert.id, existAlert);
    }
  }

  private async checkTruckAlert(
    truckId: string,
    temperature: number,
    humidity: number,
  ) {
    const truckSetting = await this.truckSettingService.findByTruckId(truckId);
    if (!truckSetting) return;

    const existAlert =
      await this.truckAlertService.findActiveAlertByTruckId(truckId);
    const isOutOfRange =
      (truckSetting.minTemperature !== null &&
        truckSetting.minTemperature !== undefined &&
        temperature < truckSetting.minTemperature) ||
      (truckSetting.maxTemperature !== null &&
        truckSetting.maxTemperature !== undefined &&
        temperature > truckSetting.maxTemperature) ||
      (truckSetting.minHumidity !== null &&
        truckSetting.minHumidity !== undefined &&
        humidity < truckSetting.minHumidity) ||
      (truckSetting.maxHumidity !== null &&
        truckSetting.maxHumidity !== undefined &&
        humidity > truckSetting.maxHumidity);

    if (isOutOfRange) {
      const message = `Alert for temperature and humidity out of range. Current temperature: ${temperature}, humidity: ${humidity}`;

      if (existAlert) {
        existAlert.status = 'active';
        existAlert.message = message;
        await this.truckAlertService.update(existAlert.id, existAlert);
      } else {
        await this.truckAlertService.create({
          truck: { id: truckId },
          status: 'active',
          message,
          alertType: 'sensor',
        });
      }
    } else if (existAlert) {
      existAlert.status = 'resolved';
      existAlert.message = `Alert resolved. Current temperature: ${temperature}, humidity: ${humidity}`;
      await this.truckAlertService.update(existAlert.id, existAlert);
    }
  }

  private async handleStatusMessage(payload: string) {
    // Parse status message format: "IOT_0001 offline" or "IOT_0001 online"
    const parts = payload.split(' ');
    if (parts.length >= 2) {
      const deviceId = parts[0];
      const status = parts[1];

      if (status === 'offline') {
        await this.ioTDevicesService.setDeviceOffline(deviceId);
      } else if (status === 'online') {
        // Device status will be set to active when first data arrives
      }
    }
  }
}
