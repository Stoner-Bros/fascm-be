// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateIoTDeviceDto } from './create-io-t-device.dto';

export class UpdateIoTDeviceDto extends PartialType(CreateIoTDeviceDto) {}
