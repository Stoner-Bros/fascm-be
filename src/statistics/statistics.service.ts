import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

// Import entities
import { OrderEntity } from '../orders/infrastructure/persistence/relational/entities/order.entity';
import { OrderDetailEntity } from '../order-details/infrastructure/persistence/relational/entities/order-detail.entity';
import { OrderScheduleEntity } from '../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';
import { OrderInvoiceEntity } from '../order-invoices/infrastructure/persistence/relational/entities/order-invoice.entity';
import { HarvestScheduleEntity } from '../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';
import { HarvestDetailEntity } from '../harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';
import { HarvestInvoiceEntity } from '../harvest-invoices/infrastructure/persistence/relational/entities/harvest-invoice.entity';
import { BatchEntity } from '../batches/infrastructure/persistence/relational/entities/batch.entity';
import { DeliveryEntity } from '../deliveries/infrastructure/persistence/relational/entities/delivery.entity';
import { DebtEntity } from '../debts/infrastructure/persistence/relational/entities/debt.entity';
import { PaymentEntity } from '../payments/infrastructure/persistence/relational/entities/payment.entity';
import { ProductEntity } from '../products/infrastructure/persistence/relational/entities/product.entity';
import { SupplierEntity } from '../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { ConsigneeEntity } from '../consignees/infrastructure/persistence/relational/entities/consignee.entity';
import { WarehouseEntity } from '../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';
import { AreaEntity } from '../areas/infrastructure/persistence/relational/entities/area.entity';
import { TruckEntity } from '../trucks/infrastructure/persistence/relational/entities/truck.entity';

// Import enums
import { DebtStatusEnum, DebtTypeEnum } from '../debts/enum/debt.enum';
import {
  PaymentStatus,
  PaymentType,
} from '../payments/enums/payment-status.enum';
import { DeliveryStatusEnum } from '../deliveries/enum/delivery-status.enum';

// Import DTOs
import {
  OverviewStatisticsDto,
  OrderStatisticsDto,
  HarvestStatisticsDto,
  ProductStatisticsDto,
  InventoryStatisticsDto,
  DeliveryStatisticsDto,
  DebtStatisticsDto,
  PaymentStatisticsDto,
  RevenueTrendDto,
  SupplierStatisticsDto,
  ConsigneeStatisticsDto,
  WarehouseStatisticsDto,
  TruckStatisticsDto,
  DashboardSummaryDto,
} from './dto/statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
    @InjectRepository(OrderScheduleEntity)
    private readonly orderScheduleRepository: Repository<OrderScheduleEntity>,
    @InjectRepository(OrderInvoiceEntity)
    private readonly orderInvoiceRepository: Repository<OrderInvoiceEntity>,
    @InjectRepository(HarvestScheduleEntity)
    private readonly harvestScheduleRepository: Repository<HarvestScheduleEntity>,
    @InjectRepository(HarvestDetailEntity)
    private readonly harvestDetailRepository: Repository<HarvestDetailEntity>,
    @InjectRepository(HarvestInvoiceEntity)
    private readonly harvestInvoiceRepository: Repository<HarvestInvoiceEntity>,
    @InjectRepository(BatchEntity)
    private readonly batchRepository: Repository<BatchEntity>,
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
    @InjectRepository(DebtEntity)
    private readonly debtRepository: Repository<DebtEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(ConsigneeEntity)
    private readonly consigneeRepository: Repository<ConsigneeEntity>,
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
    @InjectRepository(TruckEntity)
    private readonly truckRepository: Repository<TruckEntity>,
  ) {}

  private getDateRange(startDate?: string, endDate?: string) {
    const start = startDate ? new Date(startDate) : new Date('2000-01-01');
    const end = endDate ? new Date(endDate) : new Date('2099-12-31');
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  // ==================== OVERVIEW STATISTICS ====================
  async getOverviewStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<OverviewStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total revenue from order invoices (only completed phases)
    const revenueResult = await this.orderInvoiceRepository
      .createQueryBuilder('oi')
      .leftJoin('oi.orderPhase', 'op')
      .select('COALESCE(SUM(oi.totalPayment), 0)', 'total')
      .where('oi.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('op.status = :completedStatus', {
        completedStatus: 'completed',
      })
      .getRawOne();

    // Total purchase cost from harvest invoices (only completed phases)
    const costResult = await this.harvestInvoiceRepository
      .createQueryBuilder('hi')
      .leftJoin('hi.harvestPhase', 'hp')
      .select('COALESCE(SUM(hi.totalPayment), 0)', 'total')
      .where('hi.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('hp.status = :completedStatus', {
        completedStatus: 'completed',
      })
      .getRawOne();

    // Total orders
    const totalOrders = await this.orderRepository.count({
      where: { createdAt: Between(start, end) },
    });

    // Total harvest schedules
    const totalHarvestSchedules = await this.harvestScheduleRepository.count({
      where: { createdAt: Between(start, end) },
    });

    // Total deliveries
    const totalDeliveries = await this.deliveryRepository.count({
      where: { createdAt: Between(start, end) },
    });

    // Total debt receivable
    const receivableResult = await this.debtRepository
      .createQueryBuilder('d')
      .select('COALESCE(SUM(d.remainingAmount), 0)', 'total')
      .where('d.debtType = :type', { type: DebtTypeEnum.RECEIVABLE })
      .andWhere('d.status != :status', { status: DebtStatusEnum.PAID })
      .getRawOne();

    // Total debt payable
    const payableResult = await this.debtRepository
      .createQueryBuilder('d')
      .select('COALESCE(SUM(d.remainingAmount), 0)', 'total')
      .where('d.debtType = :type', { type: DebtTypeEnum.PAYABLE })
      .andWhere('d.status != :status', { status: DebtStatusEnum.PAID })
      .getRawOne();

    const totalRevenue = parseFloat(revenueResult?.total || '0');
    const totalPurchaseCost = parseFloat(costResult?.total || '0');

    return {
      totalRevenue,
      totalPurchaseCost,
      grossProfit: totalRevenue - totalPurchaseCost,
      totalOrders,
      totalHarvestSchedules,
      totalDeliveries,
      totalDebtReceivable: parseFloat(receivableResult?.total || '0'),
      totalDebtPayable: parseFloat(payableResult?.total || '0'),
    };
  }

  // ==================== ORDER STATISTICS ====================
  async getOrderStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<OrderStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total orders
    const totalOrders = await this.orderRepository.count({
      where: { createdAt: Between(start, end) },
    });

    // Orders by status (via order schedule)
    const ordersByStatus = await this.orderScheduleRepository
      .createQueryBuilder('os')
      .select('os.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('os.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('os.status')
      .getRawMany();

    // Total revenue (only completed phases)
    const revenueResult = await this.orderInvoiceRepository
      .createQueryBuilder('oi')
      .leftJoin('oi.orderPhase', 'op')
      .select('COALESCE(SUM(oi.totalPayment), 0)', 'total')
      .where('oi.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('op.status = :completedStatus', {
        completedStatus: 'completed',
      })
      .getRawOne();

    const totalRevenue = parseFloat(revenueResult?.total || '0');

    return {
      totalOrders,
      ordersByStatus: ordersByStatus.map((item) => ({
        status: item.status || 'unknown',
        count: parseInt(item.count, 10),
      })),
      totalRevenue,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    };
  }

  // ==================== HARVEST STATISTICS ====================
  async getHarvestStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<HarvestStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total harvest schedules
    const totalHarvestSchedules = await this.harvestScheduleRepository.count({
      where: { createdAt: Between(start, end) },
    });

    // Harvest schedules by status
    const harvestSchedulesByStatus = await this.harvestScheduleRepository
      .createQueryBuilder('hs')
      .select('hs.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('hs.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('hs.status')
      .getRawMany();

    // Total purchase amount (only completed phases)
    const purchaseResult = await this.harvestInvoiceRepository
      .createQueryBuilder('hi')
      .leftJoin('hi.harvestPhase', 'hp')
      .select('COALESCE(SUM(hi.totalPayment), 0)', 'total')
      .where('hi.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('hp.status = :completedStatus', {
        completedStatus: 'completed',
      })
      .getRawOne();

    // Total quantity harvested
    const quantityResult = await this.harvestDetailRepository
      .createQueryBuilder('hd')
      .select('COALESCE(SUM(hd.quantity), 0)', 'total')
      .where('hd.createdAt BETWEEN :start AND :end', { start, end })
      .getRawOne();

    return {
      totalHarvestSchedules,
      harvestSchedulesByStatus: harvestSchedulesByStatus.map((item) => ({
        status: item.status || 'unknown',
        count: parseInt(item.count, 10),
      })),
      totalPurchaseAmount: parseFloat(purchaseResult?.total || '0'),
      totalQuantityHarvested: parseFloat(quantityResult?.total || '0'),
    };
  }

  // ==================== PRODUCT STATISTICS ====================
  async getProductStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<ProductStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total products
    const totalProducts = await this.productRepository.count();

    // Products by category
    const productsByCategory = await this.productRepository
      .createQueryBuilder('p')
      .leftJoin('p.category', 'c')
      .select('c.id', 'categoryId')
      .addSelect('c.name', 'categoryName')
      .addSelect('COUNT(*)', 'count')
      .groupBy('c.id')
      .addGroupBy('c.name')
      .getRawMany();

    // Top selling products (by order details)
    const topSellingProductsRaw = await this.orderDetailRepository
      .createQueryBuilder('od')
      .leftJoin('od.product', 'p')
      .select('p.id', 'productId')
      .addSelect('p.name', 'productName')
      .addSelect('COALESCE(SUM(od.quantity), 0)', 'totalQuantity')
      .addSelect('COALESCE(SUM(od.amount), 0)', 'totalAmount')
      .where('od.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('p.id IS NOT NULL')
      .groupBy('p.id')
      .addGroupBy('p.name')
      .getRawMany();

    const topSellingProducts = topSellingProductsRaw
      .sort(
        (a, b) =>
          parseFloat(b.totalQuantity || '0') -
          parseFloat(a.totalQuantity || '0'),
      )
      .slice(0, 10);

    // Top purchased products (by harvest details)
    const topPurchasedProductsRaw = await this.harvestDetailRepository
      .createQueryBuilder('hd')
      .leftJoin('hd.product', 'p')
      .select('p.id', 'productId')
      .addSelect('p.name', 'productName')
      .addSelect('COALESCE(SUM(hd.quantity), 0)', 'totalQuantity')
      .addSelect('COALESCE(SUM(hd.amount), 0)', 'totalAmount')
      .where('hd.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('p.id IS NOT NULL')
      .groupBy('p.id')
      .addGroupBy('p.name')
      .getRawMany();

    const topPurchasedProducts = topPurchasedProductsRaw
      .sort(
        (a, b) =>
          parseFloat(b.totalQuantity || '0') -
          parseFloat(a.totalQuantity || '0'),
      )
      .slice(0, 10);

    return {
      totalProducts,
      productsByCategory: productsByCategory.map((item) => ({
        categoryId: item.categoryId || 'uncategorized',
        categoryName: item.categoryName || 'Uncategorized',
        count: parseInt(item.count, 10),
      })),
      topSellingProducts: topSellingProducts.map((item) => ({
        productId: item.productId,
        productName: item.productName || 'Unknown',
        totalQuantity: parseFloat(item.totalQuantity || '0'),
        totalAmount: parseFloat(item.totalAmount || '0'),
      })),
      topPurchasedProducts: topPurchasedProducts.map((item) => ({
        productId: item.productId,
        productName: item.productName || 'Unknown',
        totalQuantity: parseFloat(item.totalQuantity || '0'),
        totalAmount: parseFloat(item.totalAmount || '0'),
      })),
    };
  }

  // ==================== INVENTORY STATISTICS ====================
  async getInventoryStatistics(): Promise<InventoryStatisticsDto> {
    // Total batches
    const totalBatches = await this.batchRepository.count();

    // Total quantity and value
    const inventoryResult = await this.batchRepository
      .createQueryBuilder('b')
      .select('COALESCE(SUM(b.currentQuantity), 0)', 'totalQuantity')
      .addSelect('COALESCE(SUM(CAST(b.costPrice AS NUMERIC)), 0)', 'totalValue')
      .getRawOne();

    // Batches by product
    const batchesByProductRaw = await this.batchRepository
      .createQueryBuilder('b')
      .leftJoin('b.product', 'p')
      .select('p.id', 'productId')
      .addSelect('p.name', 'productName')
      .addSelect('COALESCE(SUM(b.currentQuantity), 0)', 'totalQuantity')
      .addSelect('COALESCE(SUM(CAST(b.costPrice AS NUMERIC)), 0)', 'totalValue')
      .groupBy('p.id')
      .addGroupBy('p.name')
      .getRawMany();

    const batchesByProduct = batchesByProductRaw.sort(
      (a, b) =>
        parseFloat(b.totalQuantity || '0') - parseFloat(a.totalQuantity || '0'),
    );

    // Batches by area
    const batchesByArea = await this.batchRepository
      .createQueryBuilder('b')
      .leftJoin('b.area', 'a')
      .select('a.id', 'areaId')
      .addSelect('a.name', 'areaName')
      .addSelect('COALESCE(SUM(b.currentQuantity), 0)', 'totalQuantity')
      .groupBy('a.id')
      .addGroupBy('a.name')
      .getRawMany();

    // Expiring soon (within 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const expiringSoonBatches = await this.batchRepository.count({
      where: {
        expiredAt: LessThanOrEqual(thirtyDaysFromNow),
        currentQuantity: MoreThanOrEqual(1),
      },
    });

    return {
      totalBatches,
      totalQuantityInStock: parseFloat(inventoryResult?.totalQuantity || '0'),
      totalInventoryValue: parseFloat(inventoryResult?.totalValue || '0'),
      batchesByProduct: batchesByProduct.map((item) => ({
        productId: item.productId,
        productName: item.productName || 'Unknown',
        totalQuantity: parseFloat(item.totalQuantity || '0'),
        totalValue: parseFloat(item.totalValue || '0'),
      })),
      batchesByArea: batchesByArea.map((item) => ({
        areaId: item.areaId,
        areaName: item.areaName || 'Unknown',
        totalQuantity: parseFloat(item.totalQuantity || '0'),
      })),
      expiringSoonBatches,
    };
  }

  // ==================== DELIVERY STATISTICS ====================
  async getDeliveryStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<DeliveryStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total deliveries
    const totalDeliveries = await this.deliveryRepository.count({
      where: { createdAt: Between(start, end) },
    });

    // Deliveries by status
    const deliveriesByStatus = await this.deliveryRepository
      .createQueryBuilder('d')
      .select('d.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('d.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('d.status')
      .getRawMany();

    // Completed deliveries
    const completedDeliveries = await this.deliveryRepository.count({
      where: {
        status: DeliveryStatusEnum.COMPLETED,
        createdAt: Between(start, end),
      },
    });

    // Average delivery time (for completed deliveries)
    const avgTimeResult = await this.deliveryRepository
      .createQueryBuilder('d')
      .select(
        'AVG(EXTRACT(EPOCH FROM (d.endTime - d.startTime)) / 3600)',
        'avgHours',
      )
      .where('d.status = :status', { status: DeliveryStatusEnum.COMPLETED })
      .andWhere('d.startTime IS NOT NULL')
      .andWhere('d.endTime IS NOT NULL')
      .andWhere('d.createdAt BETWEEN :start AND :end', { start, end })
      .getRawOne();

    return {
      totalDeliveries,
      deliveriesByStatus: deliveriesByStatus.map((item) => ({
        status: item.status || 'unknown',
        count: parseInt(item.count, 10),
      })),
      completedDeliveries,
      averageDeliveryTime: parseFloat(avgTimeResult?.avgHours || '0'),
    };
  }

  // ==================== DEBT STATISTICS ====================
  async getDebtStatistics(): Promise<DebtStatisticsDto> {
    // Total debt receivable
    const receivableResult = await this.debtRepository
      .createQueryBuilder('d')
      .select('COALESCE(SUM(d.remainingAmount), 0)', 'total')
      .where('d.debtType = :type', { type: DebtTypeEnum.RECEIVABLE })
      .getRawOne();

    // Total debt payable
    const payableResult = await this.debtRepository
      .createQueryBuilder('d')
      .select('COALESCE(SUM(d.remainingAmount), 0)', 'total')
      .where('d.debtType = :type', { type: DebtTypeEnum.PAYABLE })
      .getRawOne();

    // Debts by status
    const debtsByStatus = await this.debtRepository
      .createQueryBuilder('d')
      .select('d.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(d.remainingAmount), 0)', 'totalAmount')
      .groupBy('d.status')
      .getRawMany();

    // Overdue debts
    const now = new Date();
    const overdueResult = await this.debtRepository
      .createQueryBuilder('d')
      .select('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(d.remainingAmount), 0)', 'totalAmount')
      .where('d.status = :status', { status: DebtStatusEnum.OVERDUE })
      .orWhere('(d.dueDate < :now AND d.status != :paidStatus)', {
        now,
        paidStatus: DebtStatusEnum.PAID,
      })
      .getRawOne();

    return {
      totalDebtReceivable: parseFloat(receivableResult?.total || '0'),
      totalDebtPayable: parseFloat(payableResult?.total || '0'),
      debtsByStatus: debtsByStatus.map((item) => ({
        status: item.status || 'unknown',
        count: parseInt(item.count, 10),
        totalAmount: parseFloat(item.totalAmount || '0'),
      })),
      overdueDebts: parseInt(overdueResult?.count || '0', 10),
      totalOverdueAmount: parseFloat(overdueResult?.totalAmount || '0'),
    };
  }

  // ==================== PAYMENT STATISTICS ====================
  async getPaymentStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<PaymentStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total payments received (IN)
    const receivedResult = await this.paymentRepository
      .createQueryBuilder('p')
      .select('COALESCE(SUM(p.amount), 0)', 'total')
      .where('p.paymentType = :type', { type: PaymentType.IN })
      .andWhere('p.status = :status', { status: PaymentStatus.PAID })
      .andWhere('p.createdAt BETWEEN :start AND :end', { start, end })
      .getRawOne();

    // Total payments made (OUT)
    const madeResult = await this.paymentRepository
      .createQueryBuilder('p')
      .select('COALESCE(SUM(p.amount), 0)', 'total')
      .where('p.paymentType = :type', { type: PaymentType.OUT })
      .andWhere('p.status = :status', { status: PaymentStatus.PAID })
      .andWhere('p.createdAt BETWEEN :start AND :end', { start, end })
      .getRawOne();

    // Payments by status
    const paymentsByStatus = await this.paymentRepository
      .createQueryBuilder('p')
      .select('p.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(p.amount), 0)', 'totalAmount')
      .where('p.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('p.status')
      .getRawMany();

    // Payments by method
    const paymentsByMethod = await this.paymentRepository
      .createQueryBuilder('p')
      .select('p.paymentMethod', 'method')
      .addSelect('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(p.amount), 0)', 'totalAmount')
      .where('p.createdAt BETWEEN :start AND :end', { start, end })
      .groupBy('p.paymentMethod')
      .getRawMany();

    return {
      totalPaymentsReceived: parseFloat(receivedResult?.total || '0'),
      totalPaymentsMade: parseFloat(madeResult?.total || '0'),
      paymentsByStatus: paymentsByStatus.map((item) => ({
        status: item.status || 'unknown',
        count: parseInt(item.count, 10),
        totalAmount: parseFloat(item.totalAmount || '0'),
      })),
      paymentsByMethod: paymentsByMethod.map((item) => ({
        method: item.method || 'unknown',
        count: parseInt(item.count, 10),
        totalAmount: parseFloat(item.totalAmount || '0'),
      })),
    };
  }

  // ==================== REVENUE TREND ====================
  async getRevenueTrend(
    startDate?: string,
    endDate?: string,
    period: 'day' | 'week' | 'month' | 'year' = 'month',
  ): Promise<RevenueTrendDto[]> {
    const { start, end } = this.getDateRange(startDate, endDate);

    let dateFormat: string;
    switch (period) {
      case 'day':
        dateFormat = 'YYYY-MM-DD';
        break;
      case 'week':
        dateFormat = 'IYYY-IW';
        break;
      case 'month':
        dateFormat = 'YYYY-MM';
        break;
      case 'year':
        dateFormat = 'YYYY';
        break;
    }

    // Revenue trend (only completed phases)
    const revenueData = await this.orderInvoiceRepository
      .createQueryBuilder('oi')
      .leftJoin('oi.orderPhase', 'op')
      .select(`TO_CHAR(oi.createdAt, '${dateFormat}')`, 'period')
      .addSelect('COALESCE(SUM(oi.totalPayment), 0)', 'revenue')
      .where('oi.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('op.status = :completedStatus', {
        completedStatus: 'completed',
      })
      .groupBy(`TO_CHAR(oi.createdAt, '${dateFormat}')`)
      .orderBy('period', 'ASC')
      .getRawMany();

    // Cost trend (only completed phases)
    const costData = await this.harvestInvoiceRepository
      .createQueryBuilder('hi')
      .leftJoin('hi.harvestPhase', 'hp')
      .select(`TO_CHAR(hi.createdAt, '${dateFormat}')`, 'period')
      .addSelect('COALESCE(SUM(hi.totalPayment), 0)', 'cost')
      .where('hi.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('hp.status = :completedStatus', {
        completedStatus: 'completed',
      })
      .groupBy(`TO_CHAR(hi.createdAt, '${dateFormat}')`)
      .orderBy('period', 'ASC')
      .getRawMany();

    // Merge revenue and cost data
    const periodMap = new Map<string, { revenue: number; cost: number }>();

    revenueData.forEach((item) => {
      periodMap.set(item.period, {
        revenue: parseFloat(item.revenue || '0'),
        cost: 0,
      });
    });

    costData.forEach((item) => {
      const existing = periodMap.get(item.period) || { revenue: 0, cost: 0 };
      periodMap.set(item.period, {
        ...existing,
        cost: parseFloat(item.cost || '0'),
      });
    });

    return Array.from(periodMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([period, data]) => ({
        period,
        revenue: data.revenue,
        cost: data.cost,
        profit: data.revenue - data.cost,
      }));
  }

  // ==================== SUPPLIER STATISTICS ====================
  async getSupplierStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<SupplierStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total suppliers
    const totalSuppliers = await this.supplierRepository.count();

    // Top suppliers by harvest schedule count and amount
    const topSuppliersRaw = await this.harvestScheduleRepository
      .createQueryBuilder('hs')
      .leftJoin('hs.supplier', 's')
      .leftJoin('hs.harvestPhases', 'hp')
      .leftJoin('hp.harvestInvoice', 'hi')
      .select('s.id', 'supplierId')
      .addSelect('s.gardenName', 'supplierName')
      .addSelect('COALESCE(SUM(hi.totalPayment), 0)', 'totalAmount')
      .addSelect('COUNT(DISTINCT hs.id)', 'totalOrders')
      .where('hs.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('s.id IS NOT NULL')
      .groupBy('s.id')
      .addGroupBy('s.gardenName')
      .getRawMany();

    const topSuppliers = topSuppliersRaw
      .sort(
        (a, b) =>
          parseFloat(b.totalAmount || '0') - parseFloat(a.totalAmount || '0'),
      )
      .slice(0, 10);

    return {
      totalSuppliers,
      topSuppliers: topSuppliers.map((item) => ({
        supplierId: item.supplierId,
        supplierName: item.supplierName || 'Unknown',
        totalAmount: parseFloat(item.totalAmount || '0'),
        totalOrders: parseInt(item.totalOrders || '0', 10),
      })),
    };
  }

  // ==================== CONSIGNEE STATISTICS ====================
  async getConsigneeStatistics(
    startDate?: string,
    endDate?: string,
  ): Promise<ConsigneeStatisticsDto> {
    const { start, end } = this.getDateRange(startDate, endDate);

    // Total consignees
    const totalConsignees = await this.consigneeRepository.count();

    // Top consignees by order count and amount
    const topConsigneesRaw = await this.orderScheduleRepository
      .createQueryBuilder('os')
      .leftJoin('os.consignee', 'c')
      .leftJoin('os.orderPhases', 'op')
      .leftJoin('op.orderInvoice', 'oi')
      .select('c.id', 'consigneeId')
      .addSelect('c.organizationName', 'consigneeName')
      .addSelect('COALESCE(SUM(oi.totalPayment), 0)', 'totalAmount')
      .addSelect('COUNT(DISTINCT os.id)', 'totalOrders')
      .where('os.createdAt BETWEEN :start AND :end', { start, end })
      .andWhere('c.id IS NOT NULL')
      .groupBy('c.id')
      .addGroupBy('c.organizationName')
      .getRawMany();

    const topConsignees = topConsigneesRaw
      .sort(
        (a, b) =>
          parseFloat(b.totalAmount || '0') - parseFloat(a.totalAmount || '0'),
      )
      .slice(0, 10);

    return {
      totalConsignees,
      topConsignees: topConsignees.map((item) => ({
        consigneeId: item.consigneeId,
        consigneeName: item.consigneeName || 'Unknown',
        totalAmount: parseFloat(item.totalAmount || '0'),
        totalOrders: parseInt(item.totalOrders || '0', 10),
      })),
    };
  }

  // ==================== WAREHOUSE STATISTICS ====================
  async getWarehouseStatistics(): Promise<WarehouseStatisticsDto> {
    // Total warehouses
    const totalWarehouses = await this.warehouseRepository.count();

    // Total areas
    const totalAreas = await this.areaRepository.count();

    // Inventory by warehouse
    const inventoryByWarehouse = await this.batchRepository
      .createQueryBuilder('b')
      .leftJoin('b.area', 'a')
      .leftJoin('a.warehouse', 'w')
      .select('w.id', 'warehouseId')
      .addSelect('w.name', 'warehouseName')
      .addSelect('COALESCE(SUM(b.currentQuantity), 0)', 'totalQuantity')
      .addSelect('COALESCE(SUM(CAST(b.costPrice AS NUMERIC)), 0)', 'totalValue')
      .groupBy('w.id')
      .addGroupBy('w.name')
      .getRawMany();

    return {
      totalWarehouses,
      totalAreas,
      inventoryByWarehouse: inventoryByWarehouse.map((item) => ({
        warehouseId: item.warehouseId,
        warehouseName: item.warehouseName || 'Unknown',
        totalQuantity: parseFloat(item.totalQuantity || '0'),
        totalValue: parseFloat(item.totalValue || '0'),
      })),
    };
  }

  // ==================== TRUCK STATISTICS ====================
  async getTruckStatistics(): Promise<TruckStatisticsDto> {
    // Total trucks
    const totalTrucks = await this.truckRepository.count();

    // Trucks by status
    const trucksByStatus = await this.truckRepository
      .createQueryBuilder('t')
      .select('t.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('t.status')
      .getRawMany();

    // Total capacity
    const capacityResult = await this.truckRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.capacity), 0)', 'total')
      .getRawOne();

    return {
      totalTrucks,
      trucksByStatus: trucksByStatus.map((item) => ({
        status: item.status || 'unknown',
        count: parseInt(item.count, 10),
      })),
      totalCapacity: parseFloat(capacityResult?.total || '0'),
    };
  }

  // ==================== DASHBOARD SUMMARY ====================
  async getDashboardSummary(): Promise<DashboardSummaryDto> {
    const overview = await this.getOverviewStatistics();

    // Recent orders (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentOrdersCount = await this.orderRepository.count({
      where: { createdAt: MoreThanOrEqual(sevenDaysAgo) },
    });

    // Recent harvest schedules (last 7 days)
    const recentHarvestSchedulesCount =
      await this.harvestScheduleRepository.count({
        where: { createdAt: MoreThanOrEqual(sevenDaysAgo) },
      });

    // Pending deliveries
    const pendingDeliveriesCount = await this.deliveryRepository.count({
      where: [
        { status: DeliveryStatusEnum.SCHEDULED },
        { status: DeliveryStatusEnum.DELIVERING },
      ],
    });

    // Overdue debts
    const now = new Date();
    const overdueDebtsCount = await this.debtRepository.count({
      where: [
        { status: DebtStatusEnum.OVERDUE },
        { dueDate: LessThanOrEqual(now), status: DebtStatusEnum.UNPAID },
        {
          dueDate: LessThanOrEqual(now),
          status: DebtStatusEnum.PARTIALLY_PAID,
        },
      ],
    });

    // Low stock batches (less than 10 units)
    const lowStockBatchesCount = await this.batchRepository
      .createQueryBuilder('b')
      .where('b.currentQuantity > 0 AND b.currentQuantity < 10')
      .getCount();

    return {
      overview,
      recentOrdersCount,
      recentHarvestSchedulesCount,
      pendingDeliveriesCount,
      overdueDebtsCount,
      lowStockBatchesCount,
    };
  }
}
