import { PartialType } from '@nestjs/swagger';
import { CreateTruckSettingDto } from './create-truck-setting.dto';

export class UpdateTruckSettingDto extends PartialType(CreateTruckSettingDto) {}
