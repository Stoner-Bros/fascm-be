import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { IoTDevicesService } from './io-t-devices.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;
  private readonly BROKER_URL =
    'mqtts://03bb100ff666407a80eaeafa79b3d9d5.s1.eu.hivemq.cloud:8883';
  private readonly USERNAME = 'bububai';
  private readonly PASSWORD = 'Bububai257';
  private readonly TOPIC_DATA = 'sensors/dht22/data';
  private readonly TOPIC_STATUS = 'sensors/dht22/status';

  constructor(private readonly ioTDevicesService: IoTDevicesService) {}

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
