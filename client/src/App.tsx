import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({ uri: 'http://127.0.0.1:50000' }) as any, // https://github.com/jaydenseric/apollo-upload-client/issues/174
  cache: new InMemoryCache()
});

const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
const MULTIPLE_UPLOAD_FILE = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Mutation mutation={UPLOAD_FILE}>
        {
          (singleUpload: any) => (
            <input
              type="file"
              required
              onChange={({ target: { validity, files: [file] } }: any) => {
                if (validity.valid) {
                  singleUpload({ variables: { file } });
                }
              }}
            />
          )
        }
      </Mutation>
      <Mutation mutation={MULTIPLE_UPLOAD_FILE}>
        {
          (multipleUpload: any) => (
            <input
              type="file"
              multiple
              required
              onChange={({ target: { validity, files } }: any) => {
                if (validity.valid) {
                  multipleUpload({ variables: { files } });
                }
              }}
            />
          )
        }
      </Mutation>
    </ApolloProvider>
  );
}

export default App;
