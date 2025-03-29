import ChevronLeft from "../../../../Icons/ChevronLeft";
import ChevronRight from "../../../../Icons/ChevronRight";

export default function Pagination(props) {
  const { currentPage, totalPages, handleChangePage } = props;
  return (
    <div className="flex gap-2 justify-center items-center py-10">
      <button
        className={`px-3 py-1 bg-gray-300 rounded duration-300 transition ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:text-blue-600"
        }`}
        onClick={() => handleChangePage(1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft width={24} heigth={24} type="double" />
      </button>
      <button
        className={`px-3 py-1 bg-gray-300 rounded duration-300 transition ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:text-blue-600"
        }`}
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft width={24} heigth={24} type="single" />
      </button>
      <span>
        Trang <span className="font-medium">{currentPage}</span> / {totalPages}
      </span>
      <button
        className={`px-3 py-1 bg-gray-300 rounded duration-300 transition ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : "hover:text-blue-600"
        }`}
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight width={24} heigth={24} type="single" />
      </button>
      <button
        className={`px-3 py-1 bg-gray-300 rounded duration-300 transition ${
          currentPage === totalPages
            ? "cursor-not-allowed"
            : "hover:text-blue-600"
        }`}
        onClick={() => handleChangePage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <div className="flex">
          <ChevronRight width={24} heigth={24} type="double" />
        </div>
      </button>
    </div>
  );
}
