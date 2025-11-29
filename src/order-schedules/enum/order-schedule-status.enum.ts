export enum OrderScheduleStatusEnum {
  PENDING = 'pending', //chờ duyệt đơn
  REJECTED = 'rejected', //từ chối đơn
  PREPARING = 'preparing', //chuẩn bị hàng
  DELIVERING = 'delivering', //đang giao hàng
  DELIVERED = 'delivered', //đã giao hàng
  COMPLETED = 'completed', //đã hoàn thành
  CANCELED = 'canceled', //đã hủy đơn
}
