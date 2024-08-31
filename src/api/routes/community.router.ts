import { RequestHandler, Router } from 'express';

import { Logger } from '../../config/logger.config';
import { createCommunitySchema } from '../../validate/validate.schema';
import { RouterBroker } from '../abstract/abstract.router';
import { CreateCommunityDto } from '../dto/group.dto';
import { communityController } from '../server.module';
import { HttpStatus } from './index.router';

const logger = new Logger('CommunityRouter');

export class CommunityRouter extends RouterBroker {
  constructor(...guards: RequestHandler[]) {
    super();
    this.router.post(this.routerPath('create'), ...guards, async (req, res) => {
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
    });
  }

  public readonly router = Router();
}
