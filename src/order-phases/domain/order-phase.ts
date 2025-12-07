import { ApiProperty } from '@nestjs/swagger';
import { ImageProof } from 'src/image-proofs/domain/image-proof';
import { OrderSchedule } from '../../order-schedules/domain/order-schedule';
import { OrderPhaseStatusEnum } from '../enum/order-phase-status.enum';

export class OrderPhase {
  @ApiProperty({
    type: () => [ImageProof],
    nullable: true,
  })
  imageProof?: ImageProof[] | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    enum: OrderPhaseStatusEnum,
    nullable: true,
  })
  status?: OrderPhaseStatusEnum | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  phaseNumber?: number | null;

  @ApiProperty({
    type: () => OrderSchedule,
    nullable: true,
  })
  orderSchedule?: OrderSchedule | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
