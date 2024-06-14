"use client";

import ChartCard from "./chartCard";
import Filter from "./filter";
import Header from "./Header";

export default function Dashboard() {
  return (
    <section className="wrapper">
      <div className="inner-wrapper flex gap-6 pt-8">
        <div className="flex-grow">
          <Header />
          <div className="py-8 flex gap-4">
            <ChartCard />
            <ChartCard />
          </div>
        </div>
        <Filter />
      </div>
    </section>
  );
}
