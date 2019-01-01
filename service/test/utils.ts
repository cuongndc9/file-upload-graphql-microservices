import { graphql, buildSchema } from 'graphql';
import { mergeTypes } from 'merge-graphql-schemas';

import typeDefs from 'src/typeDefs';
import resolvers from 'src/resolvers';

export const callGraphql = async (query: string) => {
  const schema = buildSchema(mergeTypes(typeDefs));
  const result = await graphql(schema, query, resolvers);
  if (result.errors) {
    return result.errors[0];
  }
  return result.data;
};
