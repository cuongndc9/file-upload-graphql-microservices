import { Request } from 'express';
import { GraphQLSchema } from 'graphql';
import { makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools';
import {
  BaseController, getSchema, relay, config,
} from '../components';

class SchemaController extends BaseController {
  async update(req: Request) {
    const schemas: GraphQLSchema[] = await Promise.all(
      Object.values(config.services).map(async (service) => makeRemoteExecutableSchema({
        schema: await getSchema(service.url),
        fetcher: await relay(service.url),
      }))
    );
    req.app.locals.schema = mergeSchemas({ schemas });
    return 'success';
  }
}

export default SchemaController;
