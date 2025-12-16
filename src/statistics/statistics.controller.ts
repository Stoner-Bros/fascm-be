import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import {
  DateRangeQueryDto,
  PeriodQueryDto,
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

@ApiTags('Statistics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'statistics',
  version: '1',
})
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // ==================== DASHBOARD ====================
  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard summary statistics' })
  @ApiOkResponse({ type: DashboardSummaryDto })
  getDashboardSummary(): Promise<DashboardSummaryDto> {
    return this.statisticsService.getDashboardSummary();
  }

  // ==================== OVERVIEW ====================
  @Get('overview')
  @ApiOperation({ summary: 'Get overview statistics' })
  @ApiOkResponse({ type: OverviewStatisticsDto })
  getOverviewStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<OverviewStatisticsDto> {
    return this.statisticsService.getOverviewStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== ORDERS ====================
  @Get('orders')
  @ApiOperation({ summary: 'Get order statistics' })
  @ApiOkResponse({ type: OrderStatisticsDto })
  getOrderStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<OrderStatisticsDto> {
    return this.statisticsService.getOrderStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== HARVEST ====================
  @Get('harvest')
  @ApiOperation({ summary: 'Get harvest statistics' })
  @ApiOkResponse({ type: HarvestStatisticsDto })
  getHarvestStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<HarvestStatisticsDto> {
    return this.statisticsService.getHarvestStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== PRODUCTS ====================
  @Get('products')
  @ApiOperation({ summary: 'Get product statistics' })
  @ApiOkResponse({ type: ProductStatisticsDto })
  getProductStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<ProductStatisticsDto> {
    return this.statisticsService.getProductStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== INVENTORY ====================
  @Get('inventory')
  @ApiOperation({ summary: 'Get inventory statistics' })
  @ApiOkResponse({ type: InventoryStatisticsDto })
  getInventoryStatistics(): Promise<InventoryStatisticsDto> {
    return this.statisticsService.getInventoryStatistics();
  }

  // ==================== DELIVERIES ====================
  @Get('deliveries')
  @ApiOperation({ summary: 'Get delivery statistics' })
  @ApiOkResponse({ type: DeliveryStatisticsDto })
  getDeliveryStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<DeliveryStatisticsDto> {
    return this.statisticsService.getDeliveryStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== DEBTS ====================
  @Get('debts')
  @ApiOperation({ summary: 'Get debt statistics' })
  @ApiOkResponse({ type: DebtStatisticsDto })
  getDebtStatistics(): Promise<DebtStatisticsDto> {
    return this.statisticsService.getDebtStatistics();
  }

  // ==================== PAYMENTS ====================
  @Get('payments')
  @ApiOperation({ summary: 'Get payment statistics' })
  @ApiOkResponse({ type: PaymentStatisticsDto })
  getPaymentStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<PaymentStatisticsDto> {
    return this.statisticsService.getPaymentStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== REVENUE TREND ====================
  @Get('revenue-trend')
  @ApiOperation({ summary: 'Get revenue trend over time' })
  @ApiOkResponse({ type: [RevenueTrendDto] })
  getRevenueTrend(@Query() query: PeriodQueryDto): Promise<RevenueTrendDto[]> {
    return this.statisticsService.getRevenueTrend(
      query.startDate,
      query.endDate,
      query.period,
    );
  }

  // ==================== SUPPLIERS ====================
  @Get('suppliers')
  @ApiOperation({ summary: 'Get supplier statistics' })
  @ApiOkResponse({ type: SupplierStatisticsDto })
  getSupplierStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<SupplierStatisticsDto> {
    return this.statisticsService.getSupplierStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== CONSIGNEES ====================
  @Get('consignees')
  @ApiOperation({ summary: 'Get consignee statistics' })
  @ApiOkResponse({ type: ConsigneeStatisticsDto })
  getConsigneeStatistics(
    @Query() query: DateRangeQueryDto,
  ): Promise<ConsigneeStatisticsDto> {
    return this.statisticsService.getConsigneeStatistics(
      query.startDate,
      query.endDate,
    );
  }

  // ==================== WAREHOUSES ====================
  @Get('warehouses')
  @ApiOperation({ summary: 'Get warehouse statistics' })
  @ApiOkResponse({ type: WarehouseStatisticsDto })
  getWarehouseStatistics(): Promise<WarehouseStatisticsDto> {
    return this.statisticsService.getWarehouseStatistics();
  }

  // ==================== TRUCKS ====================
  @Get('trucks')
  @ApiOperation({ summary: 'Get truck statistics' })
  @ApiOkResponse({ type: TruckStatisticsDto })
  getTruckStatistics(): Promise<TruckStatisticsDto> {
    return this.statisticsService.getTruckStatistics();
  }
}
