import { Link } from "@remix-run/react";

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
