import { RequestHandler, Router } from 'express';

import { Logger } from '../../config/logger.config';
import {
  communityJidSchema,
  createCommunitySchema,
  linkGroupCommunutySchema,
  unLinkGroupCommunutySchema,
  updateCommunitySettingsSchema,
} from '../../validate/validate.schema';
import { RouterBroker } from '../abstract/abstract.router';
import {
  CommunityJid,
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
      .get(this.routerPath('findCommunityInfos'), ...guards, async (req, res) => {
        const response = await this.communityValidate<CommunityJid>({
          request: req,
          schema: communityJidSchema,
          ClassRef: CommunityJid,
          execute: (instance, data) => communityController.findCommunityInfo(instance, data),
        });

        res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('fetchAllCommunities'), ...guards, async (req, res) => {
        const response = await this.communityNoValidate({
          request: req,
          execute: (instance) => communityController.fetchAllCommunities(instance),
        });

        res.status(HttpStatus.OK).json(response);
      })
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
