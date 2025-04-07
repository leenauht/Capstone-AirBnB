import CommentMessage from "./CommentMessage";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";
import { timeDelay } from "../../../../utils";
import api from "./../../../../services/api";
import { useParams } from "react-router-dom";
import Pagination from "../../_component/Pagination";
import { toast } from "react-toastify";

export default function ListComment(props) {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const commentsPerPage = 10;

  const { id } = props;

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
      toast.success("Bình luận thành công!", { autoClose: 1000 });
      setComments((prev) => [newComment, ...prev]);
      return result.content;
    } catch (error) {
      toast.error(error.response.data.content, { autoClose: 1000 });
      setTimeout(() => {
        toast.info("Bạn cần đăng nhập lại để làm mới token.", {
          autoClose: 1500,
        });
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

  return (
    <div className="w-full pt-10 pb-10">
      <CommentInput onSubmit={onSubmit} imgAvatar={userInfo?.avatar} />
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
        <p className="text-gray-500 text-center py-20">
          Chưa có bình luận nào.
        </p>
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
