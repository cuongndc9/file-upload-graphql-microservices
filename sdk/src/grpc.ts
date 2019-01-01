import { join } from 'path';
import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = join(__dirname, 'protos/server.proto');

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
const serverProto: any = grpc.loadPackageDefinition(packageDefinition).server;

const callRequest = (graphql: any) => (call: any, callback: Function) => {

  graphql(call.request, callback);

}

export const app = (port: number | string, graphql: any): void => {
  const server = new grpc.Server({
    'grpc.max_receive_message_length': 1024 * 1024 * 100,
    'grpc.max_send_message_length': 1024 * 1024 * 100,
  });
  server.addService(serverProto.Server.service, { callRequest: callRequest(graphql) });
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
}

export const server = serverProto.Server;
export const credentials = grpc.credentials;
