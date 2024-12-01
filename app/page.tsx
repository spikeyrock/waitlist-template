"use client"

import Waitlist from "./components/waitlist";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">Coming Soon</h1>
        <p className="text-lg text-center">
          We're working hard to launch our new website. Stay tuned!
        </p>
        <Waitlist />
      </main>
    </div>
  );
}
