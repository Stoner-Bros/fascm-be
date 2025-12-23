import { AreasService } from '../areas/areas.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAreaAlertDto } from './dto/create-area-alert.dto';
import { UpdateAreaAlertDto } from './dto/update-area-alert.dto';
import { AreaAlertRepository } from './infrastructure/persistence/area-alert.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { AreaAlert } from './domain/area-alert';
import { Area } from '../areas/domain/area';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { IoTGateway } from '../io-t-devices/iot.gateway';

@Injectable()
export class AreaAlertsService {
  constructor(
    private readonly areaService: AreasService,

    // Dependencies here
    private readonly areaAlertRepository: AreaAlertRepository,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly ioTGateway: IoTGateway,
  ) {}

  async create(createAreaAlertDto: CreateAreaAlertDto) {
    // Do not remove comment below.
    // <creating-property />

    let area: Area | null | undefined = undefined;

    if (createAreaAlertDto.area) {
      const areaObject = await this.areaService.findById(
        createAreaAlertDto.area.id,
      );
      if (!areaObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            area: 'notExists',
          },
        });
      }
      area = areaObject;
    } else if (createAreaAlertDto.area === null) {
      area = null;
    }

    const created = await this.areaAlertRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createAreaAlertDto.status,

      message: createAreaAlertDto.message,

      alertType: createAreaAlertDto.alertType,

      area,
    });
    try {
      const warehouseId = area?.warehouse?.id;
      if (warehouseId) {
        const payload = {
          id: String(created.id),
          type: 'area-alert',
          title: 'areaAlert',
          message:
            (created.status ?? '') === 'resolved'
              ? 'areaAlertResolved'
              : 'areaAlertActive',
          data: {
            areaId: area?.id,
            warehouseId,
            status: created.status ?? null,
            alertType: created.alertType ?? null,
          },
          timestamp:
            (created.createdAt as any)?.toISOString?.() ??
            new Date().toISOString(),
        };
        this.notificationsGateway.notifyWarehouse(String(warehouseId), payload);
      }
    } catch {}
    return created;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.areaAlertRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: AreaAlert['id']) {
    return this.areaAlertRepository.findById(id);
  }

  findByIds(ids: AreaAlert['id'][]) {
    return this.areaAlertRepository.findByIds(ids);
  }

  async update(
    id: AreaAlert['id'],

    updateAreaAlertDto: UpdateAreaAlertDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let area: Area | null | undefined = undefined;

    if (updateAreaAlertDto.area) {
      const areaObject = await this.areaService.findById(
        updateAreaAlertDto.area.id,
      );
      if (!areaObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            area: 'notExists',
          },
        });
      }
      area = areaObject;
    } else if (updateAreaAlertDto.area === null) {
      area = null;
    }

    const updated = await this.areaAlertRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status: updateAreaAlertDto.status,

      message: updateAreaAlertDto.message,

      alertType: updateAreaAlertDto.alertType,

      area,
    });

    try {
      if (
        updateAreaAlertDto.status &&
        updateAreaAlertDto.status.toLowerCase() === 'resolved'
      ) {
        const fullAlert = await this.findById(id);
        const warehouseId = fullAlert?.area?.warehouse?.id;

        if (warehouseId) {
          const payload = {
            id: String(fullAlert?.id),
            type: 'area-alert',
            title: 'areaAlert',
            message: 'areaAlertResolved',
            data: {
              areaId: fullAlert?.area?.id,
              warehouseId,
              status: 'resolved',
              alertType: fullAlert?.alertType ?? null,
              currentTemperature: updateAreaAlertDto.currentTemperature,
              currentHumidity: updateAreaAlertDto.currentHumidity,
            },
            timestamp: new Date().toISOString(),
          };
          this.notificationsGateway.notifyWarehouse(
            String(warehouseId),
            payload,
          );

          this.ioTGateway.broadcastAreaAlert({
            id: String(fullAlert.id),
            areaId: String(fullAlert.area?.id),
            status: 'resolved',
            message: 'areaAlertResolved',
            alertType: fullAlert.alertType ?? null,
            data: payload.data,
            updatedAt: new Date().toISOString(),
          });
        }
      }
    } catch {}

    return updated;
  }

  remove(id: AreaAlert['id']) {
    return this.areaAlertRepository.remove(id);
  }

  findActiveAlertByAreaId(areaId: string) {
    return this.areaAlertRepository.findActiveAlertByAreaId(areaId);
  }
}
