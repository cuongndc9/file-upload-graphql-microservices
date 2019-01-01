const typeDef = `
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  extend type Query {
    uploads: [File]
  }
  type Mutation {
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File!]
  }
`;

export default typeDef;
