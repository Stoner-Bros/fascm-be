import { Supplier } from '../../suppliers/domain/supplier';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestSchedule {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  harvestDate?: Date | null;

  @ApiProperty({
    type: () => Supplier,
    nullable: true,
  })
  supplierId?: Supplier | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
