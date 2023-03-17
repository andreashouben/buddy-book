import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";

export type BuddyType = {
  id: number;
  name: string;
  birthDate: string;
  favoriteColor: string;
};
export const Buddy = ({
  buddy: { id, birthDate, favoriteColor, name },
}: {
  buddy: BuddyType;
}) => {
  return (
    <div className=" card w-64 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{name}</h2>
          <Form method="post">
            <input type="hidden" name="id" value={id} />
            <button
              className="btn-error btn-square btn-xs btn"
              name="_action"
              value="delete"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </Form>
        </div>
        <h3>Birthday: {birthDate}</h3>
        <h3>
          Favourite Color:{" "}
          <span style={{ color: favoriteColor }}>{favoriteColor}</span>{" "}
        </h3>
      </div>
    </div>
  );
};
