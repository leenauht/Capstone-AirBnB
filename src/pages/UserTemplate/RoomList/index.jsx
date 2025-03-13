import { useDispatch } from "react-redux";
import Room from "./Room";
import useSelection from "antd/es/table/hooks/useSelection";
import { useEffect, useState } from "react";
import { fetchRoomList } from "./sliceRoomList";
import axios from "axios";

export default function RoomList() {
  // const state = useSelection((state) => state.roomListReducer);
  // const dispath = useDispatch();
  // console.log(state);

  // useEffect(() => {
  //   dispath(fetchRoomList());
  // }, []);

  const [dataRoom, setDataRoom] = useState([]);
  const [dataLocation, setDataLocation] = useState([]);

  const fetchListBanner = async () => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjIwLzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Mjk2OTYwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzMTE3MjAwfQ.Qh5EKISAVqlhbNkgh1gtzDLUv1TXC7WpqNdNpAS2274",
        },
      });
      return setDataRoom(result.data.content);
    } catch (error) {
      return error;
    }
  };

  const fetchLocation = async () => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/vi-tri",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjIwLzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Mjk2OTYwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzMTE3MjAwfQ.Qh5EKISAVqlhbNkgh1gtzDLUv1TXC7WpqNdNpAS2274",
        },
      });
      return setDataLocation(result.data.content);
    } catch (error) {
      return error;
    }
  };

  console.log("dataLocation", dataLocation);
  console.log("dataRoom", dataRoom);

  useEffect(() => {
    fetchListBanner();
    fetchLocation();
  }, []);

  return (
    <div className="max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
      {dataRoom?.map((room) => {
        return <Room key={room.id} room={room} dataLocation={dataLocation} />;
      })}
    </div>
  );
}
