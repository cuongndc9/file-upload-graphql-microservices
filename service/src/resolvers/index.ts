import fs from 'fs';
import path from 'path';
import { resolvers as scalarResolvers } from 'graphql-scalars';

import root from './root.resolver';

const resolvers = [root, scalarResolvers];
fs
  .readdirSync(__dirname)
  .filter((fileName) => /.resolver.[t|j]s$/.test(fileName) && fileName.split('.')[0] !== 'root')
  .forEach((fileName) => {
    const resolver = require(path.join(__dirname, fileName));
    resolvers.push(resolver.default);
  });

export default resolvers;
