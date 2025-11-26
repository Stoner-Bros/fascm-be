import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { IoTDevicesService } from './io-t-devices.service';
import { AreaSettingsService } from 'src/area-settings/area-settings.service';
import { AreaAlertsService } from 'src/area-alerts/area-alerts.service';

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

    // Find the area with iot devide id
    const area = await this.ioTDevicesService.findAreaByDeviceId(data.deviceId);
    if (area) {
      const areaSetting = await this.areaSettingService.findByAreaId(area.id);
      if (areaSetting) {
        // Compare with area settings min.max temperature and humidity (if set) and create alert if out of range

        const existAlert = await this.areaAlertService.findActiveAlertByAreaId(
          area.id,
        );

        if (
          (areaSetting.minTemperature !== null &&
            areaSetting.minTemperature !== undefined &&
            data.temperature < areaSetting.minTemperature) ||
          (areaSetting.maxTemperature !== null &&
            areaSetting.maxTemperature !== undefined &&
            data.temperature > areaSetting.maxTemperature) ||
          (areaSetting.minHumidity !== null &&
            areaSetting.minHumidity !== undefined &&
            data.humidity < areaSetting.minHumidity) ||
          (areaSetting.maxHumidity !== null &&
            areaSetting.maxHumidity !== undefined &&
            data.humidity > areaSetting.maxHumidity)
        ) {
          if (existAlert) {
            // An active alert already exists for this area
            existAlert.status = 'active';
            existAlert.message = `Alert for temperature and humidity out of range. Current temperature: ${data.temperature}, humidity: ${data.humidity}`;
            await this.areaAlertService.update(existAlert.id, existAlert);
            return;
          }
          await this.areaAlertService.create({
            area: {
              id: area.id,
            },
            status: 'active',
            message: `Alert for temperature and humidity out of range. Current temperature: ${data.temperature}, humidity: ${data.humidity}`,
            alertType: 'sensor',
          });
        } else {
          if (existAlert) {
            // Resolve the existing alert
            existAlert.status = 'resolved';
            await this.areaAlertService.update(existAlert.id, existAlert);
          }
        }
      }
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
