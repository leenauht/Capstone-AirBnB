import { useDispatch, useSelector } from "react-redux";
import useStore from "../../../store";
import { useEffect, useMemo, useState } from "react";
import Footer from "./../_component/Footer/index";
import { fetchRoomList } from "../RoomList/sliceRoomList";
import { fetchLocation, setKeySearch } from "../RoomList/sliceLocation";
import Room from "../RoomList/Room";
import { useSearchParams } from "react-router-dom";
import Header from "../_component/Header";
import Loading from "../_component/Loading";
import { Empty } from "antd";

export default function RoomLocation() {
  const { dataSearch } = useSelector((state) => state.locationReducer);
  const { data: dataRoom, loading } = useSelector(
    (state) => state.roomListReducer
  );
  console.log(dataSearch);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyParam = searchParams.get("key");

  const roomFilter = useMemo(() => {
    const roomList = [];
    dataRoom.forEach((room) => {
      const findLocation = dataSearch.find((item) => item.id === room.maViTri);
      if (findLocation) {
        roomList.push({ ...room, location: findLocation });
      }
    });
    return roomList;
  }, [dataRoom, dataSearch]);

  const [isScrollBottom, setIsScrollBottom] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      const isScrollToBottom =
        window.innerHeight + window.scrollY + 132 >=
        document.documentElement.scrollHeight;
      setIsScrollBottom(isScrollToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchRoomList());
    dispatch(fetchLocation());
  }, []);

  useEffect(() => {
    dispatch(setKeySearch(keyParam));
  }, [keyParam]);

  if (loading) return <Loading open={loading} />;

  return (
    <div>
      <div className="flex gap-5 flex-col-reverse w-[90%] mx-auto pt-28 xl:flex-row relative pb-10 min-h-screen">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:w-full md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {dataSearch.length > 0 ? (
            roomFilter?.map((item) => {
              return (
                <Room key={item.id} room={item} location={item.location} />
              );
            })
          ) : (
            <Empty
              description="Không tìm thấy phòng nào!"
              className="lg:col-span-3 md:col-span-2 pt-20"
            />
          )}
        </div>

        <div className="w-full xl:w-2/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.9416186644617!2d106.69419050198695!3d10.782229869025425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f369339942d%3A0x2e5c61408d70ef53!2zSOG7kyBDb24gUsO5YQ!5e0!3m2!1svi!2s!4v1743759957301!5m2!1svi!2s"
            className={`xl:fixed top-[74px] h-[400px] w-full rounded-lg md:h-[600px] xl:w-2/5`}
            style={{
              border: 0,
              height: !isScrollBottom ? "100%" : "calc(100% - 206px)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
