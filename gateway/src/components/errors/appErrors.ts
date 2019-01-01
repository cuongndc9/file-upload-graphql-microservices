import { GraphQLError, SourceLocation, Source, ASTNode } from 'graphql';
import { snakeCase } from 'lodash';

type Maybe<T> = null | undefined | T;

export class ParserError extends Error implements GraphQLError {
  public extensions: Record<string, any>;
  readonly name: string;
  readonly locations: ReadonlyArray<SourceLocation> | undefined;
  readonly path: ReadonlyArray<string | number> | undefined;
  readonly source: Source | undefined;
  readonly positions: ReadonlyArray<number> | undefined;
  readonly nodes: ReadonlyArray<ASTNode> | undefined;
  public originalError: Maybe<Error>;

  [key: string]: any;

  constructor(message: string, extensions: Record<string, any>, locations: ReadonlyArray<SourceLocation> | undefined) {
    super(message);
    this.extensions = extensions;
    // this.locations = locations;
  }
}

export class AppError extends Error {
  code: string;
  constructor(message = 'Internal Service Error') {
    super(message);
    this.code = snakeCase(this.constructor.name).toUpperCase();
  }
}

export class ServiceError extends AppError {
  constructor(message = 'There is service error happened') {
    super(message);
  }
}
