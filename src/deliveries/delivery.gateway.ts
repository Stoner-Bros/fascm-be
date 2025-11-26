'use strict';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type StartPayload = {
  deliveryId: string;
  orderId?: string;
  startLat: number;
  startLng: number;
  startTime?: string;
  route?: [number, number][];
};

type UpdatePayload = {
  deliveryId: string;
  lat: number;
  lng: number;
  speedKmh?: number;
  headingDeg?: number;
  timestamp?: string;
};

type EndPayload = {
  deliveryId: string;
  endLat: number;
  endLng: number;
  endTime?: string;
};

@WebSocketGateway({ namespace: '/deliveries', cors: true })
export class DeliveryGateway {
  @WebSocketServer()
  server: Server;

  private starts = new Map<string, StartPayload>();
  private lastUpdates = new Map<string, UpdatePayload>();
  private ends = new Map<string, EndPayload>();

  @SubscribeMessage('delivery:subscribe')
  async handleSubscribe(
    @MessageBody() payload: { deliveryId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `delivery:${payload.deliveryId}`;
    await client.join(room);
    client.emit('delivery:subscribed', { room });

    const start = this.starts.get(payload.deliveryId);
    if (start) {
      client.emit('delivery:start', start);
    }
    const last = this.lastUpdates.get(payload.deliveryId);
    if (last) {
      client.emit('delivery:update', last);
    }
    const end = this.ends.get(payload.deliveryId);
    if (end) {
      client.emit('delivery:end', end);
    }
  }

  @SubscribeMessage('delivery:start')
  handleStart(@MessageBody() payload: StartPayload) {
    const room = `delivery:${payload.deliveryId}`;
    this.starts.set(payload.deliveryId, payload);
    this.server.to(room).emit('delivery:start', payload);
  }

  @SubscribeMessage('delivery:update')
  handleUpdate(@MessageBody() payload: UpdatePayload) {
    const room = `delivery:${payload.deliveryId}`;
    this.lastUpdates.set(payload.deliveryId, payload);
    this.server.to(room).emit('delivery:update', payload);
  }

  @SubscribeMessage('delivery:end')
  handleEnd(@MessageBody() payload: EndPayload) {
    const room = `delivery:${payload.deliveryId}`;
    this.ends.set(payload.deliveryId, payload);
    this.server.to(room).emit('delivery:end', payload);
  }
}
