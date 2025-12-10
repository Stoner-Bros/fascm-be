'use strict';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export type PaymentStatusUpdatePayload = {
  paymentId: string;
  paymentCode: string;
  status: string;
  amount?: number;
  paymentMethod?: string;
  timestamp: string;
};

@WebSocketGateway({ namespace: '/payments', cors: true })
export class PaymentsGateway {
  @WebSocketServer()
  server: Server;

  private lastUpdates = new Map<string, PaymentStatusUpdatePayload>();

  /**
   * Subscribe to payment updates by payment code
   */
  @SubscribeMessage('payment:subscribe')
  async handleSubscribe(
    @MessageBody() payload: { paymentCode: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `payment:${payload.paymentCode}`;
    await client.join(room);
    client.emit('payment:subscribed', {
      room,
      paymentCode: payload.paymentCode,
    });

    // Send last update if exists
    const lastUpdate = this.lastUpdates.get(payload.paymentCode);
    if (lastUpdate) {
      client.emit('payment:statusUpdate', lastUpdate);
    }
  }

  /**
   * Unsubscribe from payment updates
   */
  @SubscribeMessage('payment:unsubscribe')
  async handleUnsubscribe(
    @MessageBody() payload: { paymentCode: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `payment:${payload.paymentCode}`;
    await client.leave(room);
    client.emit('payment:unsubscribed', {
      room,
      paymentCode: payload.paymentCode,
    });
  }

  /**
   * Emit payment status update to all subscribed clients
   * Called from PaymentsService when payment status changes
   */
  emitPaymentStatusUpdate(payload: PaymentStatusUpdatePayload) {
    const room = `payment:${payload.paymentCode}`;

    // Store the last update
    this.lastUpdates.set(payload.paymentCode, payload);

    // Emit to all clients in the room
    this.server.to(room).emit('payment:statusUpdate', payload);

    console.log(
      `[PaymentsGateway] Emitted status update to room ${room}:`,
      payload,
    );

    // Clean up after 5 minutes for completed/cancelled payments
    if (payload.status === 'paid' || payload.status === 'canceled') {
      setTimeout(
        () => {
          this.lastUpdates.delete(payload.paymentCode);
          console.log(
            `[PaymentsGateway] Cleaned up cache for payment ${payload.paymentCode}`,
          );
        },
        5 * 60 * 1000,
      );
    }
  }

  /**
   * Get the count of connected clients for a payment
   */
  getSubscriberCount(paymentCode: string): number {
    const room = `payment:${paymentCode}`;
    const roomSockets = this.server.sockets.adapter.rooms.get(room);
    return roomSockets ? roomSockets.size : 0;
  }
}
