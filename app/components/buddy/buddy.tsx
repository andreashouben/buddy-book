import React from "react";

export type BuddyType = {
  id: number;
  name: string;
  birthDate: string;
  favoriteColor: string;
};
export const Buddy = ({
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
