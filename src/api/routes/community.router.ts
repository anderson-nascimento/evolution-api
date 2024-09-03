import { RequestHandler, Router } from 'express';

import { Logger } from '../../config/logger.config';
import {
  createCommunitySchema,
  linkGroupCommunutySchema,
  unLinkGroupCommunutySchema,
  updateCommunitySettingsSchema,
} from '../../validate/validate.schema';
import { RouterBroker } from '../abstract/abstract.router';
import {
  CommunitySettingUpdateDto,
  CreateCommunityDto,
  LinkGroupToCommunityDto,
  UnLinkGroupToCommunityDto,
} from '../dto/community.dto';
import { communityController } from '../server.module';
import { HttpStatus } from './index.router';

const logger = new Logger('CommunityRouter');

export class CommunityRouter extends RouterBroker {
  constructor(...guards: RequestHandler[]) {
    super();
    this.router
      .post(this.routerPath('create'), ...guards, async (req, res) => {
        logger.verbose('request received in createCommunity');
        logger.verbose('request body: ');
        logger.verbose(req.body);

        logger.verbose('request query: ');
        logger.verbose(req.query);
        const response = await this.dataValidate<CreateCommunityDto>({
          request: req,
          schema: createCommunitySchema,
          ClassRef: CreateCommunityDto,
          execute: (instance, data) => communityController.createCommunity(instance, data),
        });

        res.status(HttpStatus.CREATED).json(response);
      })
      .post(this.routerPath('linkGroupCommunity'), ...guards, async (req, res) => {
        logger.verbose('request received in linkGroupCommunity');
        logger.verbose('request body: ');
        logger.verbose(req.body);

        logger.verbose('request query: ');
        logger.verbose(req.query);
        const response = await this.communityValidate<LinkGroupToCommunityDto>({
          request: req,
          ClassRef: LinkGroupToCommunityDto,
          schema: linkGroupCommunutySchema,
          execute: (instance, data) => communityController.linkGroupToCommunity(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .post(this.routerPath('unlinkGroupCommunity'), ...guards, async (req, res) => {
        logger.verbose('request received in unlinkGroupCommunity');
        logger.verbose('request body: ');
        logger.verbose(req.body);

        logger.verbose('request query: ');
        logger.verbose(req.query);
        const response = await this.communityValidate<UnLinkGroupToCommunityDto>({
          request: req,
          ClassRef: UnLinkGroupToCommunityDto,
          schema: unLinkGroupCommunutySchema,
          execute: (instance, data) => communityController.unLinkGroupToCommunity(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .put(this.routerPath('updateSetting'), ...guards, async (req, res) => {
        logger.verbose('request received in updateSetting');
        logger.verbose('request body: ');
        logger.verbose(req.body);

        logger.verbose('request query: ');
        logger.verbose(req.query);
        const response = await this.communityValidate<CommunitySettingUpdateDto>({
          request: req,
          ClassRef: CommunitySettingUpdateDto,
          schema: updateCommunitySettingsSchema,
          execute: (instance, data) => communityController.communitySettingUpdate(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      });
  }

  public readonly router = Router();
}
