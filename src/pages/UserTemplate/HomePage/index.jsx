import { useState } from "react";
import RoomList from "../RoomList";
import Search from "../Search";
import Topic from "../Topic";

export default function HomePage() {
  return (
    <div className="pt-20 overflow-x-hidden flex flex-col min-h-screen">
      <Search />
      <Topic />
      <RoomList />
    </div>
  );
}
