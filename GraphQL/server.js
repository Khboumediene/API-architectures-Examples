import http from "node:http";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

const PORT = 4000;
const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({ schema });
await apolloServer.start();

app.use("/graphql", express.json(), expressMiddleware(apolloServer));

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql"
});

const wsServerCleanup = useServer({ schema }, wsServer);

httpServer.listen(PORT, () => {
  console.log(`HTTP: http://localhost:${PORT}/graphql`);
  console.log(`WS: ws://localhost:${PORT}/graphql`);
});

const shutdown = async () => {
  await apolloServer.stop();
  await wsServerCleanup.dispose();
  wsServer.close();
  httpServer.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
