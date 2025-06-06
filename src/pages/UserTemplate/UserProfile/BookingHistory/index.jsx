import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "./sliceBookingHistory";
import { timeDelay } from "../../../../utils";
import { Card, Empty } from "antd";
import LabelItem from "../../_component/LabelItem";
import dayjs from "dayjs";
import Pagination from "../../_component/Pagination";
import Loading from "../../_component/Loading";

const BookingHistory = () => {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();
  const { historyList } = useSelector((state) => state.bookingHistoryReducer);
  const { data, loading } = historyList;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const PAGE_SIZE = 4;

  const totalPages = useMemo(() => {
    return Math.floor(data.length / 4);
  }, [data]);

  const bookingHistoryView = useMemo(() => {
    if (!data) return undefined;
    console.log(data);

    const dataSort = [...data].sort((a, b) => b.id - a.id);
    return dataSort.filter(
      (_, index) =>
        (currentPage - 1) * PAGE_SIZE <= index &&
        currentPage * PAGE_SIZE > index
    );
  }, [data, currentPage]);

  const handleChangePage = async (currentPage) => {
    setCurrentPage(currentPage);
    setIsLoading(true);
    await timeDelay(1000);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };
  console.log(bookingHistoryView);

  useEffect(() => {
    if (!userInfo) return;
    dispatch(fetchBookingHistory(userInfo?.id));
  }, [userInfo?.id]);

  if (loading) return <Loading open={loading} />;
  if (isLoading) return <Loading open={isLoading} />;

  return (
    <div className="flex flex-col gap-5 w-full">
      {bookingHistoryView.length > 0 ? (
        bookingHistoryView.map((item, index) => {
          return (
            <Card
              key={item.id}
              className={`${index % 2 === 0 ? "bg-cyan-50" : "bg-cyan-100"}`}
            >
              <div className="space-y-2">
                <LabelItem
                  label={"Mã phòng đặt:"}
                  value={item.maPhong}
                  classNameLabel="text-base"
                  classNameValue="font-bold text-base"
                />

                <LabelItem
                  label={"Số lượng khách: "}
                  value={item.soLuongKhach}
                  classNameLabel="text-base"
                  classNameValue="font-bold text-base"
                />

                <LabelItem
                  label={"Ngày nhận phòng: "}
                  value={dayjs(`${item.ngayDen}`).format("DD/MM/YYYY")}
                  classNameLabel="text-base"
                  classNameValue="font-bold text-base"
                />

                <LabelItem
                  label={"Ngày trả phòng: "}
                  value={dayjs(`${item.ngayDi}`).format("DD/MM/YYYY")}
                  classNameLabel="text-base"
                  classNameValue="font-bold text-base"
                />
              </div>
            </Card>
          );
        })
      ) : (
        <Empty description="Không có dữ liệu" />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default BookingHistory;
