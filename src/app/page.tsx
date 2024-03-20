"use client";

import { AutoDeleteTodoList, CreateDataFromAPI } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen py-24 px-8 lg:px-80">
      <p className="text-3xl text-center">7 Solution Testing</p>
      <AutoDeleteTodoList />
      <CreateDataFromAPI />
    </main>
  );
}
