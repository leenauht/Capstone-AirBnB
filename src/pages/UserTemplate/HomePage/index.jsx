import { useState } from "react";
import RoomList from "../RoomList";
import Search from "../Search";
import Topic from "../Topic";

export default function HomePage() {
  const [dataSearch, setDataSearch] = useState([]);

  return (
    <div className="pt-20 overflow-x-hidden">
      <Search onSearch={setDataSearch} />
      <Topic />
      <RoomList dataSearch={dataSearch} />
    </div>
  );
}
