import express, { query } from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import "./firebaseConfig.js";
import { getAuth } from "firebase-admin/auth";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-app.kik9qly.mongodb.net/?retryWrites=true&w=majority&appName=Note-app`;
const PORT = process.env.PORT || 4000;

const authorizationJWT = async (req, res, next) => {
  // if (req.headers.host == "localhost:4000") {
  //   console.log("Debug");
  //   next();
  //   return;
  // }
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        const { uid } = decodedToken;
        res.locals.uid = uid;
        next();
      })
      .catch((error) => {
        console.log(error);
        return res.status(403).json({ message: "Forbidden", error });
      });
  } else {
    // return res.status(401).json("Unauthorize");
    next()
  }
};

app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to DB");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log("Server running at port 4000");
  });
