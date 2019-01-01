import fs from 'fs';
import path from 'path';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

import root from './root.typeDef';

const typeDefs = [root, ...scalarTypeDefs];
fs
  .readdirSync(__dirname)
  .filter((fileName) => /.typeDef.[t|j]s$/.test(fileName) && fileName.split('.')[0] !== 'root')
  .forEach((fileName) => {
    const typeDef = require(path.join(__dirname, fileName));
    typeDefs.push(typeDef.default);
  });

export default typeDefs;
