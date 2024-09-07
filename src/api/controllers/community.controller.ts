import { Logger } from '../../config/logger.config';
import {
  CommunityJid,
  CommunitySettingUpdateDto,
  CreateCommunityDto,
  LinkGroupToCommunityDto,
  UnLinkGroupToCommunityDto,
} from '../dto/community.dto';
import { InstanceDto } from '../dto/instance.dto';
import { WAMonitoringService } from '../services/monitor.service';

const logger = new Logger('ChatController');

export class CommunityController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  public async createCommunity(instance: InstanceDto, create: CreateCommunityDto) {
    logger.verbose('requested createCommunity from ' + instance.instanceName + ' instance');
    return await this.waMonitor.waInstances[instance.instanceName].createCommunity(create);
  }
  public async linkGroupToCommunity(instance: InstanceDto, link: LinkGroupToCommunityDto) {
    logger.verbose('requested createCommunity from ' + instance.instanceName + ' instance');
    return await this.waMonitor.waInstances[instance.instanceName].linkSubGroup(link);
  }
  public async unLinkGroupToCommunity(instance: InstanceDto, unlink: UnLinkGroupToCommunityDto) {
    logger.verbose('requested createCommunity from ' + instance.instanceName + ' instance');
    return await this.waMonitor.waInstances[instance.instanceName].unLinkSubGroup(unlink);
  }
  public async communitySettingUpdate(instance: InstanceDto, update: CommunitySettingUpdateDto) {
    logger.verbose('requested createCommunity from ' + instance.instanceName + ' instance');
    return await this.waMonitor.waInstances[instance.instanceName].updateCommunitySetting(update);
  }
  public async findCommunityInfo(instance: InstanceDto, communityJid: CommunityJid) {
    return await this.waMonitor.waInstances[instance.instanceName].findCommunity(communityJid);
  }

  public async fetchAllCommunities(instance: InstanceDto) {
    return await this.waMonitor.waInstances[instance.instanceName].fetchAllCommunity();
  }
}
