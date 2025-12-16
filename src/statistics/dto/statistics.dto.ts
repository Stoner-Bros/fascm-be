import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class DateRangeQueryDto {
  @ApiPropertyOptional({
    description: 'Start date for statistics (YYYY-MM-DD)',
    example: '2020-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'End date for statistics (YYYY-MM-DD)',
    example: '2030-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class PeriodQueryDto extends DateRangeQueryDto {
  @ApiPropertyOptional({
    description: 'Period for grouping: day, week, month, year',
    example: 'month',
    enum: ['day', 'week', 'month', 'year'],
  })
  @IsOptional()
  @IsString()
  period?: 'day' | 'week' | 'month' | 'year';
}

// Overview Statistics Response
export class OverviewStatisticsDto {
  @ApiProperty({ description: 'Total revenue from sales' })
  totalRevenue: number;

  @ApiProperty({ description: 'Total cost from purchases' })
  totalPurchaseCost: number;

  @ApiProperty({ description: 'Gross profit (revenue - cost)' })
  grossProfit: number;

  @ApiProperty({ description: 'Total number of orders' })
  totalOrders: number;

  @ApiProperty({ description: 'Total number of harvest schedules' })
  totalHarvestSchedules: number;

  @ApiProperty({ description: 'Total number of deliveries' })
  totalDeliveries: number;

  @ApiProperty({ description: 'Total debt receivable' })
  totalDebtReceivable: number;

  @ApiProperty({ description: 'Total debt payable' })
  totalDebtPayable: number;
}

// Order Statistics Response
export class OrderStatisticsDto {
  @ApiProperty({ description: 'Total number of orders' })
  totalOrders: number;

  @ApiProperty({ description: 'Orders by status' })
  ordersByStatus: { status: string; count: number }[];

  @ApiProperty({ description: 'Total revenue from orders' })
  totalRevenue: number;

  @ApiProperty({ description: 'Average order value' })
  averageOrderValue: number;
}

// Harvest Statistics Response
export class HarvestStatisticsDto {
  @ApiProperty({ description: 'Total number of harvest schedules' })
  totalHarvestSchedules: number;

  @ApiProperty({ description: 'Harvest schedules by status' })
  harvestSchedulesByStatus: { status: string; count: number }[];

  @ApiProperty({ description: 'Total purchase amount' })
  totalPurchaseAmount: number;

  @ApiProperty({ description: 'Total quantity harvested' })
  totalQuantityHarvested: number;
}

// Product Statistics Response
export class ProductStatisticsDto {
  @ApiProperty({ description: 'Total number of products' })
  totalProducts: number;

  @ApiProperty({ description: 'Products by category' })
  productsByCategory: {
    categoryId: string;
    categoryName: string;
    count: number;
  }[];

  @ApiProperty({ description: 'Top selling products' })
  topSellingProducts: {
    productId: string;
    productName: string;
    totalQuantity: number;
    totalAmount: number;
  }[];

  @ApiProperty({ description: 'Top purchased products' })
  topPurchasedProducts: {
    productId: string;
    productName: string;
    totalQuantity: number;
    totalAmount: number;
  }[];
}

// Inventory Statistics Response
export class InventoryStatisticsDto {
  @ApiProperty({ description: 'Total batches in stock' })
  totalBatches: number;

  @ApiProperty({ description: 'Total quantity in stock' })
  totalQuantityInStock: number;

  @ApiProperty({ description: 'Total inventory value' })
  totalInventoryValue: number;

  @ApiProperty({ description: 'Batches by product' })
  batchesByProduct: {
    productId: string;
    productName: string;
    totalQuantity: number;
    totalValue: number;
  }[];

  @ApiProperty({ description: 'Batches by area' })
  batchesByArea: { areaId: string; areaName: string; totalQuantity: number }[];

  @ApiProperty({ description: 'Expiring soon batches (within 30 days)' })
  expiringSoonBatches: number;
}

// Delivery Statistics Response
export class DeliveryStatisticsDto {
  @ApiProperty({ description: 'Total number of deliveries' })
  totalDeliveries: number;

  @ApiProperty({ description: 'Deliveries by status' })
  deliveriesByStatus: { status: string; count: number }[];

  @ApiProperty({ description: 'Completed deliveries' })
  completedDeliveries: number;

  @ApiProperty({ description: 'Average delivery time (hours)' })
  averageDeliveryTime: number;
}

// Debt Statistics Response
export class DebtStatisticsDto {
  @ApiProperty({ description: 'Total debt receivable (from consignees)' })
  totalDebtReceivable: number;

  @ApiProperty({ description: 'Total debt payable (to suppliers)' })
  totalDebtPayable: number;

  @ApiProperty({ description: 'Debts by status' })
  debtsByStatus: { status: string; count: number; totalAmount: number }[];

  @ApiProperty({ description: 'Overdue debts' })
  overdueDebts: number;

  @ApiProperty({ description: 'Total overdue amount' })
  totalOverdueAmount: number;
}

// Payment Statistics Response
export class PaymentStatisticsDto {
  @ApiProperty({ description: 'Total payments received' })
  totalPaymentsReceived: number;

  @ApiProperty({ description: 'Total payments made' })
  totalPaymentsMade: number;

  @ApiProperty({ description: 'Payments by status' })
  paymentsByStatus: { status: string; count: number; totalAmount: number }[];

  @ApiProperty({ description: 'Payments by method' })
  paymentsByMethod: { method: string; count: number; totalAmount: number }[];
}

// Revenue Trend Response
export class RevenueTrendDto {
  @ApiProperty({ description: 'Period label (date/week/month)' })
  period: string;

  @ApiProperty({ description: 'Revenue for the period' })
  revenue: number;

  @ApiProperty({ description: 'Cost for the period' })
  cost: number;

  @ApiProperty({ description: 'Profit for the period' })
  profit: number;
}

// Supplier Statistics Response
export class SupplierStatisticsDto {
  @ApiProperty({ description: 'Total number of suppliers' })
  totalSuppliers: number;

  @ApiProperty({ description: 'Top suppliers by purchase amount' })
  topSuppliers: {
    supplierId: string;
    supplierName: string;
    totalAmount: number;
    totalOrders: number;
  }[];
}

// Consignee Statistics Response
export class ConsigneeStatisticsDto {
  @ApiProperty({ description: 'Total number of consignees' })
  totalConsignees: number;

  @ApiProperty({ description: 'Top consignees by order amount' })
  topConsignees: {
    consigneeId: string;
    consigneeName: string;
    totalAmount: number;
    totalOrders: number;
  }[];
}

// Warehouse Statistics Response
export class WarehouseStatisticsDto {
  @ApiProperty({ description: 'Total number of warehouses' })
  totalWarehouses: number;

  @ApiProperty({ description: 'Total number of areas' })
  totalAreas: number;

  @ApiProperty({ description: 'Inventory by warehouse' })
  inventoryByWarehouse: {
    warehouseId: string;
    warehouseName: string;
    totalQuantity: number;
    totalValue: number;
  }[];
}

// Truck Statistics Response
export class TruckStatisticsDto {
  @ApiProperty({ description: 'Total number of trucks' })
  totalTrucks: number;

  @ApiProperty({ description: 'Trucks by status' })
  trucksByStatus: { status: string; count: number }[];

  @ApiProperty({ description: 'Total capacity' })
  totalCapacity: number;
}

// Dashboard Summary Response
export class DashboardSummaryDto {
  @ApiProperty({ description: 'Overview statistics' })
  overview: OverviewStatisticsDto;

  @ApiProperty({ description: 'Recent orders count (last 7 days)' })
  recentOrdersCount: number;

  @ApiProperty({ description: 'Recent harvest schedules count (last 7 days)' })
  recentHarvestSchedulesCount: number;

  @ApiProperty({ description: 'Pending deliveries count' })
  pendingDeliveriesCount: number;

  @ApiProperty({ description: 'Overdue debts count' })
  overdueDebtsCount: number;

  @ApiProperty({ description: 'Low stock batches count' })
  lowStockBatchesCount: number;
}
