import { mergeTypes } from 'merge-graphql-schemas';

import typeDefs from '../typeDefs';

const resolver = {
  Query: {
    getSchema: () => mergeTypes(typeDefs),
  }
};

export default resolver;
