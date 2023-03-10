import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/router";
import { json } from "@remix-run/router";
import React from "react";
import { db } from "~/utils/db.server";

type BuddyType = {
  id: number;
  name: string;
  birthDate: string;
  favoriteColor: string;
};
export const loader: LoaderFunction = async () => {
  const buddies = await db.buddy.findMany();

  return json(buddies);
};

const Buddy = ({
  buddy: { birthDate, favoriteColor, name },
}: {
  buddy: BuddyType;
}) => {
  return (
    <div className=" card w-64 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>Birthday: {birthDate}</h3>
        <h3>
          Favourite Color:{" "}
          <span style={{ color: favoriteColor }}>{favoriteColor}</span>{" "}
        </h3>
      </div>
    </div>
  );
};

export default function Buddies() {
  const buddies: BuddyType[] = useLoaderData<typeof loader>();
  const [lastMatch] = useMatches().slice(-1);
  const showAdd = !lastMatch.pathname.endsWith("add");

  return (
    <div className="container mx-auto min-h-screen">
      <div className="mx-auto  grid grid-cols-4 place-items-center gap-10">
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
