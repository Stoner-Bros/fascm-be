export enum HarvestScheduleStatusEnum {
  PENDING = 'pending', //chờ duyệt đơn
  REJECTED = 'rejected', //đã từ chối đơn
  APPROVED = 'approved', //đã duyệt đơn
  PREPARING = 'preparing', //chuẩn đi lấy
  DELIVERING = 'delivering', //đang đi lấy
  DELIVERED = 'delivered', //đã lấy
  COMPLETED = 'completed', //đã hoàn thành
  CANCELED = 'canceled', //đã hủy đơn
}
