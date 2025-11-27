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
}
