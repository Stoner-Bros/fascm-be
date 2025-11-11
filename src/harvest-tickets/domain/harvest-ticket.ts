import { HarvestSchedule } from '../../harvest-schedules/domain/harvest-schedule';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestTicket {
  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  date?: Date | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  unit?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalPayment?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  vatAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalAmount?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  taxRate?: number | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  accountNumber?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  paymentMethod?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  ticketNumber?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  ticketUrl?: string | null;

  @ApiProperty({
    type: () => HarvestSchedule,
    nullable: true,
  })
  harvestScheduleId?: HarvestSchedule | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
