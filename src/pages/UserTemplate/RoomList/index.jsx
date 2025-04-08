import { useDispatch, useSelector } from "react-redux";
import Room from "./Room";
import { useEffect, useRef, useState } from "react";
import { fetchRoomList } from "./sliceRoomList";
import { fetchLocation } from "./sliceLocation";
import Pagination from "../_component/Pagination";
import { timeDelay } from "../../../utils";
import Loading from "./../_component/Loading/index";
import { Empty } from "antd";

export default function RoomList(props) {
  const dispatch = useDispatch();
  const dataContainerRef = useRef(null);
  const { data: dataRoom, loading: loadingRoom } = useSelector(
    (state) => state.roomListReducer
  );
  const { data: dataLocation, loading: loadingLocation } = useSelector(
    (state) => state.locationReducer
  );

  const [listRoom, setListRoom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const listRoomsPerPage = 12;

  const handleChangePage = async (currentPage) => {
    setCurrentPage(currentPage);
    setIsLoading(true);
    await timeDelay(1000);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchRoomList());
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    if (!dataRoom || dataRoom.length === 0) return;
    setTotalPages(Math.ceil(dataRoom.length / listRoomsPerPage));
    const startIndex = (currentPage - 1) * listRoomsPerPage;
    setListRoom(dataRoom.slice(startIndex, startIndex + listRoomsPerPage));
  }, [currentPage, dataRoom]);

  if (loadingRoom && loadingLocation)
    return <Loading open={loadingRoom || loadingLocation} />;
  if (isLoading) return <Loading open={isLoading} />;

  return (
    <>
      <div
        id="data-section"
        ref={dataContainerRef}
        className="max-w-[90%] min-h-screen mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5"
      >
        {isLoading ? (
          <p className="flex justify-center items-center col-span-full h-[50vh]">
            Loading...
          </p>
        ) : listRoom ? (
          listRoom?.map((room) => {
            const location = dataLocation?.find(
              (item) => room.maViTri === item.id
            );
            if (!location) return null;
            return <Room key={room.id} location={location} room={room} />;
          })
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </div>
      {listRoom.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </>
  );
}
