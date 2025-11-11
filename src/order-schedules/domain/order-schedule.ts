import { Consignee } from '../../consignees/domain/consignee';
import { ApiProperty } from '@nestjs/swagger';

export class OrderSchedule {
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
  orderDate?: Date | null;

  @ApiProperty({
    type: () => Consignee,
    nullable: true,
  })
  consignee?: Consignee | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
