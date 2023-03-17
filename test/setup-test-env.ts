import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/extend-expect";
import { beforeEach } from "vitest";
import { db } from "~/utils/db.server";

installGlobals();
beforeEach(async () => {
  await db.buddy.deleteMany();
});
