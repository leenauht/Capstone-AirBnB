import CommentMessage from "./CommentMessage";
import CommentInput from "./CommentInput";
import { useEffect, useState } from "react";
import { timeDelay } from "../../../../utils";
import api from "./../../../../services/api";
import { useParams } from "react-router-dom";
import Pagination from "../../_component/Pagination";
import { toast } from "react-toastify";

export default function ListComment() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const commentsPerPage = 10;

  const { id } = useParams();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [userComment, setUserComment] = useState({
    maPhong: id,
    maNguoiBinhLuan: userInfo.id,
    ngayBinhLuan: "",
    noiDung: "",
    saoBinhLuan: "",
  });

  const onSubmit = async (message, star) => {
    console.log("message", message);
    console.log("star", star);

    const date = new Date().toISOString();
    if (!message) return;
    const newComment = {
      ...userComment,
      ngayBinhLuan: date,
      noiDung: message,
      saoBinhLuan: star,
    };
    setUserComment(newComment);
    console.log("userComment", newComment);

    try {
      const result = await api.post("/binh-luan", newComment);
      toast.success("Bình luận thành công!", { autoClose: 1000 });
      setComments((prev) => [newComment, ...prev]);
      return result.content;
    } catch (error) {
      return error;
    }
  };

  const handleChangePage = async (currentPage) => {
    setCurrentPage(currentPage);
    setIsLoading(true);
    await timeDelay(1000);
    setIsLoading(false);
  };

  const fetchComment = async () => {
    try {
      const result = await api.get(`/binh-luan`);
      const data = result?.content;
      if (data.length === 0) return;
      const searchResult = data.filter((item) => item.maPhong === Number(id));
      const sortedArray = searchResult?.reverse();
      setTotalPages(Math.ceil(sortedArray?.length / commentsPerPage));
      const startIndex = (currentPage - 1) * commentsPerPage;
      setComments(sortedArray?.slice(startIndex, startIndex + commentsPerPage));
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchComment();
  }, [currentPage, totalPages]);

  return (
    <div className="w-full">
      <CommentInput
        onSubmit={onSubmit}
        imgAvatar="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODE5NTY3ODE3ODIwMjIzMzIw/original/322d445c-efe0-437a-9cf8-9a7212da9c96.png?im_w=720"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : comments ? (
        <div className="grid grid-cols-2 gap-5">
          {comments.map((item, index) => (
            <div key={index}>
              <CommentMessage
                rating={item.saoBinhLuan}
                message={item.noiDung}
                imgAvatar="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODE5NTY3ODE3ODIwMjIzMzIw/original/322d445c-efe0-437a-9cf8-9a7212da9c96.png?im_w=720"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">
          Chưa có bình luận nào.
        </p>
      )}
      {comments && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
}
