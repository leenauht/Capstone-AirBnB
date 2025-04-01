import { Input } from "antd";
import SharpSearch from "./../../../Icons/SharpSearch";
import { fetchLocation } from "../RoomList/sliceLocation";
import { fetchRoomList } from "../RoomList/sliceRoomList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useValidationStore from "../_component/useValidationStore.jsx";

export default function Search(props) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { resetValidation, clearReset } = useValidationStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setErrorMessage("Nhập phòng bạn muốn tìm kiếm!");
    }
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "") {
      setErrorMessage("Nhập phòng bạn muốn tìm kiếm!");
    } else {
      setErrorMessage("");
    }
    props.onSearch(e.target.value);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setErrorMessage("Nhập phòng bạn muốn tìm kiếm!");
    }
  };

  useEffect(() => {
    if (resetValidation) {
      setInputValue("");
      setErrorMessage("");
      clearReset();
    }
  }, [resetValidation, clearReset]);

  return (
    <div className="w-2/5 mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <Input
          onBlur={handleBlur}
          required
          className="rounded-full pl-5 text-lg text-black"
          onChange={handleOnChange}
          placeholder="Tìm kiếm phòng"
          value={inputValue}
          suffix={
            <div
              onClick={handleSubmit}
              className="bg-[#FF385C] p-4 cursor-pointer !text-white rounded-full hover:bg-[#db0d63]"
            >
              <SharpSearch />
            </div>
          }
        />
        {errorMessage && (
          <p className="text-red-500 text-sm pl-5 pt-1">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
