import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

import { Link } from "@remix-run/react";

export default function Index() {
  return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Motorbike Workshop Manager</h1>
        <Link to="/calendar" className="bg-blue-600 text-white px-4 py-2 rounded">
          View Appointments
        </Link>
      </main>
  );
}
