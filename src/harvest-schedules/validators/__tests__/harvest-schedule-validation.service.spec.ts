/**
 * @file harvest-schedule-validation.service.spec.ts
 * @description Comprehensive unit tests for HarvestScheduleValidationService
 * @coverage validateTotalGoods() and validatePhaseAddition() with Normal, Boundary, and Abnormal cases
 */

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestScheduleValidationService } from '../harvest-schedule-validation.service';
import { HarvestDetailEntity } from '../../../harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';
import { HarvestInvoiceDetailEntity } from '../../../harvest-invoice-details/infrastructure/persistence/relational/entities/harvest-invoice-detail.entity';
import { HarvestPhaseEntity } from '../../../harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';

describe('HarvestScheduleValidationService', () => {
  let service: HarvestScheduleValidationService;
  let harvestDetailRepo: jest.Mocked<Repository<HarvestDetailEntity>>;
  let harvestInvoiceDetailRepo: jest.Mocked<Repository<HarvestInvoiceDetailEntity>>;
  let harvestPhaseRepo: jest.Mocked<Repository<HarvestPhaseEntity>>;

  const mockQueryBuilder = () => ({
    leftJoin: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestScheduleValidationService,
        {
          provide: getRepositoryToken(HarvestDetailEntity),
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(HarvestInvoiceDetailEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(HarvestPhaseEntity),
          useValue: {
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HarvestScheduleValidationService>(
      HarvestScheduleValidationService,
    );
    harvestDetailRepo = module.get(getRepositoryToken(HarvestDetailEntity));
    harvestInvoiceDetailRepo = module.get(
      getRepositoryToken(HarvestInvoiceDetailEntity),
    );
    harvestPhaseRepo = module.get(getRepositoryToken(HarvestPhaseEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateTotalGoods', () => {
    const scheduleId = 'schedule-123';

    describe('Normal Cases', () => {
      it('UTC_validateTotalGoods_01: should pass validation when totals match', async () => {
        // Arrange
        const harvestDetails = [
          { product: { id: 'product-1' }, quantity: 100 },
          { product: { id: 'product-2' }, quantity: 200 },
        ];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [
                { product: { id: 'product-1' }, quantity: 60 },
                { product: { id: 'product-2' }, quantity: 120 },
              ],
            },
          },
          {
            harvestInvoice: {
              harvestInvoiceDetails: [
                { product: { id: 'product-1' }, quantity: 40 },
                { product: { id: 'product-2' }, quantity: 80 },
              ],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).resolves.not.toThrow();
      });

      it('UTC_validateTotalGoods_02: should handle single product validation', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 100 }],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).resolves.not.toThrow();
      });

      it('UTC_validateTotalGoods_03: should handle multiple phases correctly', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 300 }];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 100 }],
            },
          },
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 100 }],
            },
          },
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 100 }],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).resolves.not.toThrow();
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_validateTotalGoods_04: should handle zero quantities', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 0 }];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 0 }],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).resolves.not.toThrow();
      });

      it('UTC_validateTotalGoods_05: should handle large quantities', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 1000000 }];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [
                { product: { id: 'product-1' }, quantity: 1000000 },
              ],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).resolves.not.toThrow();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_validateTotalGoods_06: should throw BadRequestException when no harvest details found', async () => {
        // Arrange
        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue([]);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          BadRequestException,
        );
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          'No harvest details found for this schedule',
        );
      });

      it('UTC_validateTotalGoods_07: should throw BadRequestException when no phases found', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue([]);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          BadRequestException,
        );
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          'No phases found for this schedule',
        );
      });

      it('UTC_validateTotalGoods_08: should throw BadRequestException when totals do not match', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 80 }],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          BadRequestException,
        );
      });

      it('UTC_validateTotalGoods_09: should throw error when product in phases but not in schedule', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const phases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [
                { product: { id: 'product-1' }, quantity: 100 },
                { product: { id: 'product-2' }, quantity: 50 },
              ],
            },
          },
        ];

        const qb = mockQueryBuilder();
        qb.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
        harvestPhaseRepo.find.mockResolvedValue(phases as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          BadRequestException,
        );
      });

      it('UTC_validateTotalGoods_10: should handle database query error', async () => {
        // Arrange
        const qb = mockQueryBuilder();
        qb.getMany.mockRejectedValue(new Error('Database error'));
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);

        // Act & Assert
        await expect(service.validateTotalGoods(scheduleId)).rejects.toThrow(
          'Database error',
        );
      });
    });
  });

  describe('validatePhaseAddition', () => {
    const scheduleId = 'schedule-123';
    const newInvoiceDetails = [{ productId: 'product-1', quantity: 50 }];

    describe('Normal Cases', () => {
      it('UTC_validatePhaseAddition_01: should pass when addition is within limits', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const qb1 = mockQueryBuilder();
        qb1.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb1 as any);

        const existingPhases = [
          {
            harvestInvoice: {
              harvestInvoiceDetails: [{ product: { id: 'product-1' }, quantity: 30 }],
            },
          },
        ];

        const qb2 = mockQueryBuilder();
        qb2.getMany.mockResolvedValue(existingPhases);
        harvestPhaseRepo.createQueryBuilder.mockReturnValue(qb2 as any);

        // Act & Assert
        await expect(
          service.validatePhaseAddition(scheduleId, newInvoiceDetails),
        ).resolves.not.toThrow();
      });

      it('UTC_validatePhaseAddition_02: should handle multiple products', async () => {
        // Arrange
        const harvestDetails = [
          { product: { id: 'product-1' }, quantity: 100 },
          { product: { id: 'product-2' }, quantity: 200 },
        ];

        const multipleProducts = [
          { productId: 'product-1', quantity: 40 },
          { productId: 'product-2', quantity: 80 },
        ];

        const qb1 = mockQueryBuilder();
        qb1.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb1 as any);

        const qb2 = mockQueryBuilder();
        qb2.getMany.mockResolvedValue([]);
        harvestPhaseRepo.createQueryBuilder.mockReturnValue(qb2 as any);

        // Act & Assert
        await expect(
          service.validatePhaseAddition(scheduleId, multipleProducts),
        ).resolves.not.toThrow();
      });

      it('UTC_validatePhaseAddition_03: should exclude specified phase ID from calculation', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const qb1 = mockQueryBuilder();
        qb1.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb1 as any);

        const qb2 = mockQueryBuilder();
        qb2.getMany.mockResolvedValue([]);
        harvestPhaseRepo.createQueryBuilder.mockReturnValue(qb2 as any);

        // Act & Assert
        await expect(
          service.validatePhaseAddition(scheduleId, newInvoiceDetails, 'phase-123'),
        ).resolves.not.toThrow();

        expect(qb2.andWhere).toHaveBeenCalledWith('hp.id != :excludePhaseId', {
          excludePhaseId: 'phase-123',
        });
      });
    });

    describe('Boundary Cases', () => {
      it('UTC_validatePhaseAddition_04: should allow exact match to schedule total', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const exactMatchDetails = [{ productId: 'product-1', quantity: 100 }];

        const qb1 = mockQueryBuilder();
        qb1.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb1 as any);

        const qb2 = mockQueryBuilder();
        qb2.getMany.mockResolvedValue([]);
        harvestPhaseRepo.createQueryBuilder.mockReturnValue(qb2 as any);

        // Act & Assert
        await expect(
          service.validatePhaseAddition(scheduleId, exactMatchDetails),
        ).resolves.not.toThrow();
      });
    });

    describe('Abnormal Cases', () => {
      it('UTC_validatePhaseAddition_05: should throw error when addition exceeds schedule total', async () => {
        // Arrange
        const harvestDetails = [{ product: { id: 'product-1' }, quantity: 100 }];

        const exceedingDetails = [{ productId: 'product-1', quantity: 150 }];

        const qb1 = mockQueryBuilder();
        qb1.getMany.mockResolvedValue(harvestDetails);
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb1 as any);

        const qb2 = mockQueryBuilder();
        qb2.getMany.mockResolvedValue([]);
        harvestPhaseRepo.createQueryBuilder.mockReturnValue(qb2 as any);

        // Act & Assert
        await expect(
          service.validatePhaseAddition(scheduleId, exceedingDetails),
        ).rejects.toThrow(BadRequestException);
        await expect(
          service.validatePhaseAddition(scheduleId, exceedingDetails),
        ).rejects.toThrow(/Phase addition would exceed schedule limits/);
      });

      it('UTC_validatePhaseAddition_06: should handle database error gracefully', async () => {
        // Arrange
        const qb = mockQueryBuilder();
        qb.getMany.mockRejectedValue(new Error('Database error'));
        harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);

        // Act & Assert
        await expect(
          service.validatePhaseAddition(scheduleId, newInvoiceDetails),
        ).rejects.toThrow('Database error');
      });
    });
  });
});
