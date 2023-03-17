import { Form, useNavigate } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/router";
import { redirect } from "@remix-run/router";
import { db } from "~/utils/db.server";
import { useCallback, useEffect } from "react";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  const { name, birthDate, favoriteColor } = Object.fromEntries(formData);

  if (
    typeof name !== "string" ||
    typeof birthDate !== "string" ||
    typeof favoriteColor !== "string"
  )
    throw new Error("Bad FormData");

  await db.buddy.create({ data: { name, birthDate, favoriteColor } });

  return redirect("/buddies");
};

export default function Add() {
  const navigate = useNavigate();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        navigate("/");
      }
    },
    [navigate]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Add New Buddy!</h2>
        <Form method="post">
          <div className="form-control ">
            <label className="input-group-sm input-group">
              <span>Name</span>
              <input
                name="name"
                required
                autoFocus
                type="text"
                className="input-bordered input input-sm w-full"
              />
            </label>
            <div className="form-control">
              <label className="input-group-sm input-group">
                <span>Birthday</span>
                <input
                  name="birthDate"
                  type="date"
                  className="input-bordered input input-sm"
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group-sm input-group">
                <span>Favourite Color</span>
                <input
                  name="favoriteColor"
                  required
                  type="color"
                  className="input-bordered input input-sm "
                />
              </label>
            </div>
            <button className="btn-secondary btn-sm btn">Submit</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
