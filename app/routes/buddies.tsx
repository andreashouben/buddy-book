import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/router";
import { json } from "@remix-run/router";
import React from "react";
import { db } from "~/utils/db.server";
import type { BuddyType } from "~/components/buddy/buddy";
import { Buddy } from "~/components/buddy/buddy";

export const loader: LoaderFunction = async () => {
  const buddies = await db.buddy.findMany();

  return json(buddies);
};

export default function Buddies() {
  const buddies: BuddyType[] = useLoaderData<typeof loader>();
  const [lastMatch] = useMatches().slice(-1);
  const showAdd = !lastMatch.pathname.endsWith("add");

  return (
    <div className="container mx-auto min-h-screen">
      <div className="mx-auto grid place-items-center gap-10 pt-10 md:grid-cols-3 lg:grid-cols-4">
        {buddies.map((b) => (
          <Buddy buddy={b} key={b.id} />
        ))}
        {showAdd && (
          <Link to={"/buddies/add"}>
            <button className="btn-primary btn">Add Buddy</button>
          </Link>
        )}
        <Outlet />
      </div>
    </div>
  );
}
