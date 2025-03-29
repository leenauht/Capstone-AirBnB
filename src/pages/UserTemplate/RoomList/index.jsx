import { useDispatch, useSelector } from "react-redux";
import Room from "./Room";
import { useEffect, useState } from "react";
import { fetchRoomList } from "./sliceRoomList";
import { fetchLocation } from "./sliceLocation";
import Pagination from "../_component/Pagination";
import { timeDelay } from "../../../utils";

export default function RoomList() {
  const dispatch = useDispatch();
  const { data: dataRoom } = useSelector((state) => state.roomListReducer);
  const { data: dataLocation } = useSelector((state) => state.locationReducer);

  console.log("dataLocation", dataLocation);
  console.log("dataRoom", dataRoom);

  const [listRoom, setListRoom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const commentsPerPage = 12;

  const handleChangePage = async (currentPage) => {
    setCurrentPage(currentPage);
    setIsLoading(true);
    await timeDelay(1000);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(fetchRoomList());
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    if (!dataLocation || dataLocation.length === 0) return;

    setTotalPages(Math.ceil(dataLocation.length / commentsPerPage));
    const startIndex = (currentPage - 1) * commentsPerPage;
    setListRoom(dataLocation.slice(startIndex, startIndex + commentsPerPage));
  }, [currentPage, dataLocation]);

  return (
    <>
      <div className="max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          listRoom?.map((item) => {
            const room = dataRoom?.find((room) => room.maViTri === item.id);
            if (!room) return null;
            return <Room key={item.id} location={item} room={room} />;
          })
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
