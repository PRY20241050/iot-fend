"use client";

import ChartCard from "./chartCard";
import Header from "./header";

export default function Dashboard() {
  return (
    <section className="wrapper">
      <Header />
      <div className="inner-wrapper p-8 flex gap-4">
        <ChartCard />
        <ChartCard />
      </div>
    </section>
  );
}
