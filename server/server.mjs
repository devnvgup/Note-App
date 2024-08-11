import express, { query } from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData.mjs";

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql

  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author:[Author],
    notes:[Note]
  }

  type Note {
    id:String,
    content:String
  }

  type Author {
    id:String,
    name:String,
  }

  type Notes {
    id:String,
    content:String,
    folderId:String
  }

  type Query {
    folders : [Folder],
    folder(folderId:String):Folder 
  }
`;
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders
    },
    folder: (_, arg) => {
      return fakeData.folders.find(({ id }) => id === arg.folderId)
    }
  },
  Folder: {
    author: (parent) => {
      return []
    },
    notes: (parent, arg) => {
      return fakeData.notes.filter(({ folderId }) => folderId === parent.id)
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("Server running at port 4000");
