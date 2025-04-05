import { useSelector } from "react-redux";
import useStore from "../../../store";
import Room from "../RoomList/Room";
import { useEffect, useRef, useState } from "react";
import Footer from "./../_component/Footer/index";

export default function RoomLocation() {
  const data = useStore((state) => state.data);
  const { data: dataRoom } = useSelector((state) => state.roomListReducer);
  const [dataRender, setDataRender] = useState([
    {
      room: {},
      location: {},
    },
  ]);

  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Nếu footer xuất hiện trên màn hình => không fix ảnh nữa
      if (footerTop <= windowHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!data || !dataRoom) return;

    // Tạo danh sách mới từ data
    const updatedData = data.flatMap((location) => {
      const filteredRooms = dataRoom?.filter(
        (room) => room.maViTri === location.id
      );

      return filteredRooms.map((room) => ({
        room,
        location,
      }));
    });

    setDataRender(updatedData);
  }, [data, dataRoom]);

  console.log(dataRender);

  return (
    <div>
      <div className="flex gap-5 flex-col-reverse w-[90%] mx-auto pt-5 xl:flex-row relative pb-10">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:w-full md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {dataRender?.map((item) => {
            return (
              <Room
                key={item.room.id}
                location={item.location}
                room={item.room}
              />
            );
          })}
        </div>

        <div className="w-full xl:w-2/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.9416186644617!2d106.69419050198695!3d10.782229869025425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f369339942d%3A0x2e5c61408d70ef53!2zSOG7kyBDb24gUsO5YQ!5e0!3m2!1svi!2s!4v1743759957301!5m2!1svi!2s"
            // className={`h-full w-2/5 ${
            //   isFixed ? "fixed bottom-0 right-0" : "absolute bottom-0 right-0"
            // }`}
            className={`h-[400px] w-full rounded-lg md:h-[600px] xl:w-2/5 xl:h-full 
              ${isFixed ? "xl:fixed bottom-0" : "xl:fixed xl:h-3/4 top-0"}
              `}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
