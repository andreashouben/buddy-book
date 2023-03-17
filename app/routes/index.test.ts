import { describe, expect } from "vitest";
import { loader } from "~/routes/index";
import type { LoaderFunctionArgs } from "@remix-run/router";
import { redirect } from "@remix-run/router";
import { db } from "~/utils/db.server";

describe("MainPage", () => {
  it(`should redirect to /buddies page when at least one buddy exist in db`, async () => {
    await db.buddy.create({
      data: {
        name: "John Doe",
        birthDate: "2000-01-01",
        favoriteColor: "#ffffff",
      },
    });

    let response = await loader({} as LoaderFunctionArgs);

    expect(response).toEqual(redirect("/buddies"));
  });

  it("should not redirect when no buddies exist in db", async () => {
    let response = await loader({} as LoaderFunctionArgs);

    expect(response).toEqual(null);
  });
});
