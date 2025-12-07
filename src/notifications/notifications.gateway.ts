import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type NotifyPayload = {
  id?: string;
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

  @SubscribeMessage('notify:subscribeManager')
  async handleSubscribeManager(
    @MessageBody() payload: { managerId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `notify:manager:${payload.managerId}`;
    await client.join(room);
    client.emit('notify:subscribed', { room });
  }

  @SubscribeMessage('notify:subscribeStaff')
  async handleSubscribeStaff(
    @MessageBody() payload: { staffId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `notify:staff:${payload.staffId}`;
    await client.join(room);
    client.emit('notify:subscribed', { room });
  }

  @SubscribeMessage('notify:subscribeDeliveryStaff')
  async handleSubscribeDeliveryStaff(
    @MessageBody() payload: { deliveryStaffId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `notify:delivery:${payload.deliveryStaffId}`;
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

  notifyManager(managerId: string, payload: NotifyPayload) {
    const room = `notify:manager:${managerId}`;
    this.server.to(room).emit('notify', payload);
  }

  notifyStaff(staffId: string, payload: NotifyPayload) {
    const room = `notify:staff:${staffId}`;
    this.server.to(room).emit('notify', payload);
  }

  notifyDeliveryStaff(deliveryStaffId: string, payload: NotifyPayload) {
    const room = `notify:delivery:${deliveryStaffId}`;
    this.server.to(room).emit('notify', payload);
  }
}
