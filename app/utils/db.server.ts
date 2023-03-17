import { PrismaClient } from "@prisma/client";
import * as process from "process";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else if (process.env.NODE_ENV === "test") {
  db = new PrismaClient({
    datasources: {
      db: {
        url: "file:./dev_test.db",
      },
    },
  });
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  db = global.__db;
}

export { db };
