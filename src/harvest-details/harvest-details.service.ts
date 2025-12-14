import {
  // common
  Injectable,
} from '@nestjs/common';
import { HarvestDetail } from './domain/harvest-detail';
import { HarvestDetailRepository } from './infrastructure/persistence/harvest-detail.repository';

@Injectable()
export class HarvestDetailsService {
  constructor(
    // Dependencies here
    private readonly harvestDetailRepository: HarvestDetailRepository,
  ) {}
  findById(id: HarvestDetail['id']) {
    return this.harvestDetailRepository.findById(id);
  }

  findByIds(ids: HarvestDetail['id'][]) {
    return this.harvestDetailRepository.findByIds(ids);
  }

  findByHarvestTicketId(harvestTicketId: string) {
    return this.harvestDetailRepository.findByHarvestTicketId(harvestTicketId);
  }

  updateFinalPrice(harvestDetailId: string, finalPrice: number) {
    return this.harvestDetailRepository.update(harvestDetailId, {
      finalUnitPrice: finalPrice,
    });
  }

  updateFinalUnitPriceAccepted(
    harvestDetailId: string,
    finalUnitPriceAccepted: boolean,
  ) {
    return this.harvestDetailRepository.update(harvestDetailId, {
      finalUnitPriceAccepted: finalUnitPriceAccepted,
    });
  }
}
