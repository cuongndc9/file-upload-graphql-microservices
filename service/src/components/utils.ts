import { get } from 'lodash';
import Umzug from 'umzug';
import { Sequelize, BaseError, ValidationError } from 'sequelize';
import axios, { AxiosRequestConfig } from 'axios';
import { GraphQLError } from 'graphql';

import {
  AppError,
  GraphqlError,
  DatabaseError,
  DatabaseValidationError,
} from './errors';

export const handleResponse = (_: any, data: any, callback: Function) => {
  callback(null, { data: JSON.stringify(data) });
};

const transformError = (key: string, value: any) => {
  if (value instanceof Error) {
    return {
      ...value,
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }
  return value;
};

export const handleError = (_: any, error: GraphQLError, callback: Function) => {
  const { originalError } = error;
  let formattedError;

  if (!originalError) {
    formattedError = new GraphqlError(error.message);
  } else if (originalError instanceof ValidationError) {
    formattedError = new DatabaseValidationError(originalError);
  } else if (originalError instanceof BaseError) {
    formattedError = new DatabaseError(originalError.message);
  } else if (!get(originalError, 'extensions.code')) {
    formattedError = new AppError(error.message);
  } else {
    formattedError = error;
  }

  callback(null, { error: JSON.stringify(formattedError, transformError) });
};

/**
 *
 * @param {string} url A url from a network.
 * @param {object} options Options to config request.
 * See more option here: https://github.com/axios/axios
 */
export const request = (url = '', options: AxiosRequestConfig = {}) => {
  const {
    method = 'get', responseType = 'json', data = {}, ...config
  } = options;
  return axios({
    method,
    url,
    responseType,
    data,
    ...config,
  });
};

export const updateSchemaForGateway = () => {
  const endpoint = 'http://127.0.0.1:50000/schema';
  return request(endpoint, {
    method: 'PUT',
  });
};

export const migrateDB = (sequelize: Sequelize, path: string) => new Umzug({
  migrations: {
    path,
    pattern: /\.migration.ts$/,
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor,
      () => {
        throw new Error(`Migration tried to use old style "done" callback.
          Please upgrade to "umzug" and return a promise instead.`);
      },
    ],
  },
  storage: 'sequelize',
  storageOptions: { sequelize },
}).up();
