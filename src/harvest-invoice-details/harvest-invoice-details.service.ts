import {
  // common
  Injectable,
} from '@nestjs/common';
import { HarvestInvoiceDetail } from './domain/harvest-invoice-detail';
import { HarvestInvoiceDetailRepository } from './infrastructure/persistence/harvest-invoice-detail.repository';

@Injectable()
export class HarvestInvoiceDetailsService {
  constructor(
    // Dependencies here
    private readonly harvestInvoiceDetailRepository: HarvestInvoiceDetailRepository,
  ) {}

  findById(id: HarvestInvoiceDetail['id']) {
    return this.harvestInvoiceDetailRepository.findById(id);
  }

  findByIds(ids: HarvestInvoiceDetail['id'][]) {
    return this.harvestInvoiceDetailRepository.findByIds(ids);
  }
}
