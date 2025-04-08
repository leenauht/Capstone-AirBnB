import SharpSearch from "./../../../Icons/SharpSearch";
import { useState } from "react";
import SearchLocation from "./SearchLocation.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Search(props) {
  const [open, setOpen] = useState(false);
  const { keySearch } = useSelector((state) => state.locationReducer);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const keySearchTrim = keySearch.trim();
    if (!keySearchTrim) {
      return;
    }
    navigate(`/search?key=${keySearchTrim}`);
  };

  return (
    <div className="w-4/5 sm:w-[90%] md:w-[90%] custom-900:w-4/5 lg:w-4/5 xl:w-3/5 mx-auto my-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-box-shadow-3 rounded-xl sm:rounded-full"
      >
        <div className="grid grid-cols-2 gap-2 p-5 sm:flex sm:flex-row sm:gap-0 sm:px-0 py-2">
          <SearchLocation open={open} setOpen={setOpen} />

          <div className="sm:p-1 md:px-2 custom-900:px-4 lg:px-6 sm:border-x">
            <p className="text-sm font-medium">Nhận phòng</p>
            <p className="text-gray-500 sm:text-xs">Thêm ngày</p>
          </div>
          <div className="sm:p-1 md:px-2 custom-900:px-4 lg:px-6 sm:border-x">
            <p className="text-sm font-medium">Trả phòng</p>
            <p className="text-gray-500 sm:text-xs">Thêm ngày</p>
          </div>
          <div className="sm:px-2 sm:w-2/5 md:px-2 custom-900:px-4 lg:px-6 flex flex-1 gap-5 justify-between items-center">
            <div>
              <p className="text-sm font-medium">Khách</p>
              <p className="text-gray-500 sm:text-xs">Thêm khách</p>
            </div>
            <div
              onClick={handleSubmit}
              className={`${
                open === true ? "flex-1 bg-[#db0d63]" : ""
              } hidden bg-[#FF385C] sm:flex items-center justify-between sm:p-2 md:p-2 md:h-8 lg:p-3 lg:h-10 xl:p-4 xl:h-12 cursor-pointer text-white rounded-full hover:bg-[#db0d63]`}
            >
              {open && (
                <span className="text-white sm:text-xs leading-[18px] font-medium md">
                  Tìm kiếm
                </span>
              )}
              <SharpSearch />
            </div>
          </div>
        </div>
        <div className="flex justify-end px-5 pb-5 sm:p-0">
          <div
            onClick={handleSubmit}
            className={`${
              open === true ? "flex-1 bg-[#db0d63]" : ""
            } sm:hidden bg-[#FF385C] px-3 py-2 min-w-[100px] gap-1 flex items-center justify-between cursor-pointer text-white rounded-full hover:bg-[#db0d63]`}
          >
            <span className="text-white leading-[18px] font-medium md">
              Tìm kiếm
            </span>

            <SharpSearch />
          </div>
        </div>
      </form>
    </div>
  );
}
