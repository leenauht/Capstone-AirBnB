import CommentMessage from "./CommentMessage";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";
import {
  timeDelay,
  toastError,
  toastInfo,
  toastSuccess,
} from "../../../../utils";
import api from "./../../../../services/api";
import Pagination from "../../_component/Pagination";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import Loading from "../../_component/Loading";

export default function ListComment(props) {
  const { userInfo } = useSelector((state) => state.userInfoReducer);

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const commentsPerPage = 10;

  const { id } = props;

  const [userComment, setUserComment] = useState({
    maPhong: id,
    maNguoiBinhLuan: userInfo?.id,
    ngayBinhLuan: "",
    noiDung: "",
    saoBinhLuan: "",
  });

  const fetchDataCommentRoomId = async () => {
    try {
      const result = await api.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`);
      const data = result?.content;
      if (data.length === 0) return;
      props.dataRating(data);
      const sortedArray = data.reverse();
      setTotalPages(Math.ceil(sortedArray?.length / commentsPerPage));
      const startIndex = (currentPage - 1) * commentsPerPage;
      setComments(sortedArray?.slice(startIndex, startIndex + commentsPerPage));
    } catch (error) {
      return error;
    }
  };

  const onSubmit = async (message, star) => {
    const date = new Date().toISOString();
    if (!message) return;
    const newComment = {
      ...userComment,
      ngayBinhLuan: date,
      noiDung: `${message}`,
      saoBinhLuan: star,
    };
    setUserComment(newComment);
    try {
      const result = await api.post("/binh-luan", newComment);
      toastSuccess("Bình luận thành công!");
      setComments((prev) => [newComment, ...prev]);
      fetchDataCommentRoomId();
      return result.content;
    } catch (error) {
      toastError(error.response.data.content);
      setTimeout(() => {
        toastInfo("Bạn cần đăng nhập lại để làm mới token.");
      }, 1500);
      return error;
    }
  };

  const handleChangePage = async (currentPage) => {
    setCurrentPage(currentPage);
    setIsLoading(true);
    await timeDelay(1000);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataCommentRoomId();
  }, [currentPage, totalPages]);

  if (isLoading) return <Loading open={isLoading} />;

  return (
    <div className="w-full pt-10 pb-10">
      <CommentInput onSubmit={onSubmit} />
      {isLoading && <p className="text-center">Loading...</p>}
      {comments.length > 0 ? (
        <div className="md:grid xl:grid-cols-2 gap-5">
          {comments.map((item, index) => (
            <div key={index} className="p-5">
              <CommentMessage comment={item} />
            </div>
          ))}
        </div>
      ) : (
        <Empty description="Không có dữ liệu" />
      )}
      {comments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
}
