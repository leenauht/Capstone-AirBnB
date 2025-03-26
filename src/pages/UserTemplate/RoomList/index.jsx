import { useDispatch, useSelector } from "react-redux";
import Room from "./Room";
import { useEffect } from "react";
import { fetchRoomList } from "./sliceRoomList";
import { fetchLocation } from "./sliceLocation";

export default function RoomList() {
  const dispath = useDispatch();
  const stateRoom = useSelector((state) => state.roomListReducer);
  const stateLocation = useSelector((state) => state.locationReducer);
  const { data: dataRoom } = stateRoom;
  const { data: dataLocation } = stateLocation;

  console.log("stateRoom", dataRoom);
  console.log(dataLocation);

  useEffect(() => {
    dispath(fetchRoomList());
    dispath(fetchLocation());
  }, []);

  return (
    <div className="max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
      {dataLocation?.map((item) => {
        const roomId = dataRoom?.find((room) => room.maViTri === item.id);
        console.log(roomId);

        return <Room key={item.id} location={item} roomId={roomId} />;
      })}
    </div>
  );
}
