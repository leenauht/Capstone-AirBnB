import { useDispatch, useSelector } from "react-redux";
import Room from "./Room";
import { useEffect, useRef, useState } from "react";
import { fetchRoomList } from "./sliceRoomList";
import { fetchLocation } from "./sliceLocation";
import Pagination from "../_component/Pagination";
import { timeDelay } from "../../../utils";

export default function RoomList(props) {
  const dispatch = useDispatch();
  const dataContainerRef = useRef(null);
  const { data: dataRoom } = useSelector((state) => state.roomListReducer);
  const { data: dataLocation } = useSelector((state) => state.locationReducer);

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
    // window.scrollTo(0, 0);
  };

  const updateRoomList = (rooms) => {
    setTotalPages(Math.ceil(rooms.length / commentsPerPage));
    const startIndex = (currentPage - 1) * commentsPerPage;
    setListRoom(rooms.slice(startIndex, startIndex + commentsPerPage));
  };

  console.log(dataLocation);
  console.log(dataRoom);

  useEffect(() => {
    dispatch(fetchRoomList());
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    // if (dataContainerRef.current) {
    //   dataContainerRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
    // window.scrollTo({
    //   top: document.getElementById("data-section").offsetTop,
    //   behavior: "smooth",
    // });
    if (!dataRoom || dataRoom.length === 0) return;
    updateRoomList(dataRoom);

    const keyword = props.dataSearch;
    if (!keyword || typeof keyword !== "string") return;
    const filteredRooms = dataRoom.filter((room) =>
      room.tenPhong.toLowerCase().includes(keyword?.toLowerCase())
    );
    console.log(filteredRooms);
    updateRoomList(filteredRooms);
  }, [currentPage, dataRoom, props.dataSearch]);

  return (
    <>
      <div
        id="data-section"
        ref={dataContainerRef}
        className="max-w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-5"
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
          <p className="text-gray-500 text-center py-10">
            Chưa có bình luận nào.
          </p>
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
