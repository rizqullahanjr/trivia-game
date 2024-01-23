import * as path from "path"
import { fileURLToPath } from 'url';
import grpc from "@grpc/grpc-js"
import { loadSync } from "@grpc/proto-loader"

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const packageDefinitionDiamond = loadSync(
    path.join(currentDir, '../proto/diamond.proto')
);

const diamondProto = grpc.loadPackageDefinition(packageDefinitionDiamond)

const diamondStub = new diamondProto.Diamond('192.168.18.174:50051', grpc.credentials.createInsecure())

export default diamondStub;


