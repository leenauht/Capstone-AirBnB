import { useRef } from "react";
import { useOutsideClick } from "../../../Hooks/useClickUotSide";
import { Button, Input } from "antd";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { setKeySearch } from "../RoomList/sliceLocation";

export default function SearchLocation(props) {
  const inputRef = useRef(null);
  const { dataSearch, keySearch } = useSelector(
    (state) => state.locationReducer
  );
  const menuWapperElm = useRef(null);
  const dispatch = useDispatch();

  const handleSelectedLocation = (item) => {
    handleOnChange(item.label);
  };

  const renderItem = () => {
    return dataSearch?.map((item) => {
      return (
        <div
          key={item.id}
          className="!flex gap-5 pb-4"
          onClick={() => handleSelectedLocation(item)}
        >
          <img className="w-14 h-14" src={item.icon} alt="" />
          <div>
            <p className="font-medium">{item.label}</p>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>
      );
    });
  };

  const handleOnChange = (keyword) => {
    dispatch(setKeySearch(keyword));
  };

  const handleClick = () => {
    props.setOpen(true);
    inputRef.current.focus();
  };

  useOutsideClick(menuWapperElm, () => {
    props.setOpen(false);
  });

  return (
    <div
      ref={menuWapperElm}
      onClick={handleClick}
      className="sm:pl-6 sm:pr-2 md:pr-2 lg:pr-6 flex-1 relative cursor-pointer"
    >
      <p className="text-sm font-medium">Địa điểm</p>

      <Input
        ref={inputRef}
        allowClear
        value={keySearch}
        onChange={(e) => handleOnChange(e.target.value)}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        className="border-none !shadow-none p-0 truncate w-full"
        type="text"
        placeholder="Tìm kiếm điểm đến"
      />

      {props.open && (
        <div className="absolute top-16 -left-5 sm:left-0 w-[calc(200%+48px)] sm:w-[150%] rounded-3xl z-10 shadow-box-shadow-3 bg-white p-5">
          <div className="overflow-y-scroll -mr-4 max-h-[60vh] no-scrollbar-buttons">
            <p className="text-sm pb-3">Điểm đến được đề xuất</p>
            {renderItem()}
          </div>
          <div className="flex justify-end pt-1">
            <Button
              onClick={(e) => (props.setOpen(false), e.stopPropagation())}
              type="primary"
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
