import { app } from 'grpc-graphql-sdk';

import graphql from './graphql';
import { config, updateSchemaForGateway } from './components';

const main = async () => {
  try {
    app(config.port, graphql);
    // await updateSchemaForGateway().catch(() => console.error('update schema gateway error'));
  } catch (e) {
    console.error(e, 'global error');
  }
  console.log(`server is listening on port ${config.port}`);
};

main();
