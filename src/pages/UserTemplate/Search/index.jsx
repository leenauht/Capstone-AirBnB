import SharpSearch from "./../../../Icons/SharpSearch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useValidationStore from "../_component/useValidationStore.jsx";
import SearchLocation from "./SearchLocation.jsx";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store/index.js";

export default function Search(props) {
  const [inputValue, setInputValue] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const { data } = useSelector((state) => state.locationReducer);
  const [listDataSearch, setListDataSearch] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState("");

  const setData = useStore((state) => state.setData);

  // console.log(listDataSearch);

  const handleSubmit = () => {
    setData(listDataSearch);
    navigate(`/search?key=${keyword.trim()}`);
  };

  // const handleBlur = () => {
  //   if (!inputValue) {
  //     setErrorMessage("Nhập phòng bạn muốn tìm kiếm!");
  //   }
  // };

  const handleSearch = (data, keyword) => {
    setListDataSearch(data);
    setKeyWord(keyword);
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    handleSearch(data, keyword);
  }, [data]);

  return (
    <div className="w-4/5 md:w-3/5 mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <div className="flex py-2 shadow-box-shadow-3 rounded-full">
          <SearchLocation
            open={open}
            setOpen={setOpen}
            data={data}
            listDataSearch={listDataSearch}
            setListDataSearch={handleSearch}
          />

          <div className="px-6 border-x">
            <p className="text-sm font-medium">Nhận phòng</p>
            <p className="text-gray-500">Thêm ngày</p>
          </div>
          <div className="px-6 border-x">
            <p className="text-sm font-medium">Trả phòng</p>
            <p className="text-gray-500">Thêm ngày</p>
          </div>
          <div className="px-6 flex flex-1 gap-5 justify-between">
            <div>
              <p className="text-sm font-medium">Khách</p>
              <p className="text-gray-500">Thêm khách</p>
            </div>
            <div
              onClick={keyword === "" ? null : () => handleSubmit()}
              className={`${
                open === true ? "flex-1 bg-[#db0d63]" : ""
              } bg-[#FF385C] flex items-center justify-between px-4 cursor-pointer text-white rounded-full hover:bg-[#db0d63]`}
            >
              {open && (
                <span className="text-white leading-[18px] font-medium">
                  Tìm kiếm
                </span>
              )}
              <SharpSearch />
            </div>
          </div>
        </div>

        {/* {errorMessage && (
          <p className="text-red-500 text-sm pl-5 pt-1">{errorMessage}</p>
        )} */}
      </form>
    </div>
  );
}
