// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateAreaSettingDto } from './create-area-setting.dto';

export class UpdateAreaSettingDto extends PartialType(CreateAreaSettingDto) {}
