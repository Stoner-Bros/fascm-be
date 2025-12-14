'use strict';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type IotUpdatePayload = {
  deviceId: string;
  areaId?: string | null;
  truckId?: string | null;
  temperature: number;
  humidity: number;
  timestamp?: string;
  status?: string | null;
};

type AreaAlertPayload = {
  id: string;
  areaId: string;
  status: string;
  message?: string | null;
  alertType?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type TruckAlertPayload = {
  id: string;
  truckId: string;
  status: string;
  message?: string | null;
  alertType?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

@WebSocketGateway({ namespace: '/iot', cors: true })
export class IoTGateway {
  @WebSocketServer()
  server: Server;

  private lastByDevice = new Map<string, IotUpdatePayload>();

  @SubscribeMessage('iot:subscribeDevice')
  async handleSubscribeDevice(
    @MessageBody() payload: { deviceId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `iot:device:${payload.deviceId}`;
    await client.join(room);
    client.emit('iot:subscribed', { room });
    const last = this.lastByDevice.get(payload.deviceId);
    if (last) {
      client.emit('iot:update', last);
    }
  }

  @SubscribeMessage('iot:subscribeArea')
  async handleSubscribeArea(
    @MessageBody() payload: { areaId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `iot:area:${payload.areaId}`;
    await client.join(room);
    client.emit('iot:subscribed', { room });
  }

  @SubscribeMessage('iot:subscribeTruck')
  async handleSubscribeTruck(
    @MessageBody() payload: { truckId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `iot:truck:${payload.truckId}`;
    await client.join(room);
    client.emit('iot:subscribed', { room });
  }

  @SubscribeMessage('alert:subscribeArea')
  async handleSubscribeAreaAlert(
    @MessageBody() payload: { areaId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `alert:area:${payload.areaId}`;
    await client.join(room);
    client.emit('alert:subscribed', { room });
  }

  @SubscribeMessage('alert:subscribeTruck')
  async handleSubscribeTruckAlert(
    @MessageBody() payload: { truckId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `alert:truck:${payload.truckId}`;
    await client.join(room);
    client.emit('alert:subscribed', { room });
  }

  broadcastUpdate(payload: IotUpdatePayload) {
    this.lastByDevice.set(payload.deviceId, payload);
    const deviceRoom = `iot:device:${payload.deviceId}`;
    this.server.to(deviceRoom).emit('iot:update', payload);
    if (payload.areaId) {
      const areaRoom = `iot:area:${payload.areaId}`;
      this.server.to(areaRoom).emit('iot:update', payload);
    }
    if (payload.truckId) {
      const truckRoom = `iot:truck:${payload.truckId}`;
      this.server.to(truckRoom).emit('iot:update', payload);
    }
    this.server.emit('iot:update', payload);
  }

  broadcastStatus(payload: {
    deviceId: string;
    status: string;
    areaId?: string | null;
    truckId?: string | null;
    timestamp?: string;
  }) {
    const deviceRoom = `iot:device:${payload.deviceId}`;
    this.server.to(deviceRoom).emit('iot:status', payload);
    if (payload.areaId) {
      const areaRoom = `iot:area:${payload.areaId}`;
      this.server.to(areaRoom).emit('iot:status', payload);
    }
    if (payload.truckId) {
      const truckRoom = `iot:truck:${payload.truckId}`;
      this.server.to(truckRoom).emit('iot:status', payload);
    }
    this.server.emit('iot:status', payload);
  }

  broadcastAreaAlert(payload: AreaAlertPayload) {
    const room = `alert:area:${payload.areaId}`;
    this.server.to(room).emit('area-alert', payload);
    this.server.emit('area-alert', payload);
  }

  broadcastTruckAlert(payload: TruckAlertPayload) {
    const room = `alert:truck:${payload.truckId}`;
    this.server.to(room).emit('truck-alert', payload);
    this.server.emit('truck-alert', payload);
  }
}
