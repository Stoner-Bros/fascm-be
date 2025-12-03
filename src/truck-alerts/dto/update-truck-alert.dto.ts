import { PartialType } from '@nestjs/swagger';
import { CreateTruckAlertDto } from './create-truck-alert.dto';

export class UpdateTruckAlertDto extends PartialType(CreateTruckAlertDto) {}
