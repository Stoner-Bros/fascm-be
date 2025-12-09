import {
  // common
  Injectable,
} from '@nestjs/common';
import { HarvestInvoice } from './domain/harvest-invoice';
import { HarvestInvoiceRepository } from './infrastructure/persistence/harvest-invoice.repository';

@Injectable()
export class HarvestInvoicesService {
  constructor(
    // Dependencies here
    private readonly harvestInvoiceRepository: HarvestInvoiceRepository,
  ) {}

  findById(id: HarvestInvoice['id']) {
    return this.harvestInvoiceRepository.findById(id);
  }

  findByIds(ids: HarvestInvoice['id'][]) {
    return this.harvestInvoiceRepository.findByIds(ids);
  }
}
