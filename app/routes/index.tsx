import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/router";
import { redirect } from "@remix-run/router";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  let buddyCount = await db.buddy.count();
  if (buddyCount > 0) {
    return redirect("/buddies");
  }
  return null;
};

export default function Index() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to <br /> Buddy Book
          </h1>
          <p className="py-6">
            Seems like you don't have a buddy yet. Let's create one! 👫
          </p>
          <Link to={"/buddies/add"}>
            <button className="btn-primary btn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
