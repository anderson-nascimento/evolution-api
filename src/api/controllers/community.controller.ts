import { Logger } from '../../config/logger.config';
import { CreateCommunityDto } from '../dto/group.dto';
import { InstanceDto } from '../dto/instance.dto';
import { WAMonitoringService } from '../services/monitor.service';

const logger = new Logger('ChatController');

export class CommunityController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  public async createCommunity(instance: InstanceDto, create: CreateCommunityDto) {
    logger.verbose('requested createCommunity from ' + instance.instanceName + ' instance');
    return await this.waMonitor.waInstances[instance.instanceName].createCommunity(create);
  }
}
