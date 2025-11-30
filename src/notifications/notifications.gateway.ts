import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type NotifyPayload = {
  type: string;
  title?: string;
  message?: string;
  data?: any;
  timestamp?: string;
};

@WebSocketGateway({ namespace: '/notifications', cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notify:subscribeConsignee')
  async handleSubscribeConsignee(
    @MessageBody() payload: { consigneeId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `notify:consignee:${payload.consigneeId}`;
    await client.join(room);
    client.emit('notify:subscribed', { room });
  }

  @SubscribeMessage('notify:subscribeSupplier')
  async handleSubscribeSupplier(
    @MessageBody() payload: { supplierId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `notify:supplier:${payload.supplierId}`;
    await client.join(room);
    client.emit('notify:subscribed', { room });
  }

  notifyConsignee(consigneeId: string, payload: NotifyPayload) {
    const room = `notify:consignee:${consigneeId}`;
    this.server.to(room).emit('notify', payload);
  }

  notifySupplier(supplierId: string, payload: NotifyPayload) {
    const room = `notify:supplier:${supplierId}`;
    this.server.to(room).emit('notify', payload);
  }
}
