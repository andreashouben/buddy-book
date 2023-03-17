import { beforeEach, describe, expect } from "vitest";
import { db } from "~/utils/db.server";
import { loader } from "~/routes/buddies";
import type { LoaderFunctionArgs } from "@remix-run/router";
import { redirect } from "@remix-run/router";
import type { Response } from "@remix-run/node";

describe("Buddies Page", () => {
  const loaderFunctionArgsMock = {
    request: {
      url: "",
    },
  };

  beforeEach(() => {
    loaderFunctionArgsMock.request.url = "";
  });

  it("returns buddies as data", async () => {
    const buddies = [
      {
        id: 1,
        name: "John",
        birthDate: "1999-08-23",
        favoriteColor: "#ffee44",
      },
      {
        id: 2,
        name: "Dana",
        birthDate: "1969-04-23",
        favoriteColor: "#aaee44",
      },
    ];
    for (const data of buddies) {
      await db.buddy.create({ data });
    }

    let response: Response = await loader(
      loaderFunctionArgsMock as unknown as LoaderFunctionArgs
    );

    expect(await response.json()).toEqual(buddies);
  });

  it("returns empty buddy list when no buddies are available and add form is visible", async () => {
    loaderFunctionArgsMock.request.url = "buddies/add";

    let response: Response = await loader(
      loaderFunctionArgsMock as unknown as LoaderFunctionArgs
    );

    expect(await response.json()).toEqual([]);
  });

  it("redirects to main page when no buddies are available and add form is invisible", async () => {
    loaderFunctionArgsMock.request.url = "buddies";

    let response: Response = await loader(
      loaderFunctionArgsMock as unknown as LoaderFunctionArgs
    );

    expect(response).toEqual(redirect("/"));
  });
});
