import { config } from "./config.js";
import { PrismaClient } from "../generated/prisma/index.js";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (config.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
