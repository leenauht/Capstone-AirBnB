import { useRef, useState } from "react";
import { useOutsideClick } from "../../../Hooks/useClickUotSide";
import { Input, Select } from "antd";
import "./style.css";

export default function SearchLocation(props) {
  const { listDataSearch, setListDataSearch, data } = props;
  //   const [open, setOpen] = useState(false);
  const menuWapperElm = useRef(null);
  // const { Option } = Select;

  const array = [
    {
      img: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/7a891a2c-4e67-4309-8292-854c7ae18e73.png",
      description: "Có các thắng cảnh đẹp",
    },
    {
      img: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/fa32e243-625d-486b-80d2-0a1bd74e214f.png",
      description: "Có kiến trúc ấn tượng",
    },
    {
      img: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/62436c65-5a7f-4726-ae37-e33b376c495a.png",
      description: "Có ẩm thực đỉnh cao",
    },
  ];

  const repeatedArray = Array.from(
    { length: data?.length },
    (_, i) => array[i % array.length]
  );

  const renderItem = () => {
    return listDataSearch?.map((item, index) => {
      return (
        <div key={item.id} className="!flex gap-5 pb-4">
          <img className="w-14 h-14" src={repeatedArray[index].img} alt="" />
          <div>
            <p className="font-medium">
              {item.tenViTri} - {item.tinhThanh}
            </p>
            <p className="text-gray-600">{repeatedArray[index].description}</p>
          </div>
        </div>
      );
    });
  };

  const handleFilter = (input, option) => {
    console.log("aaa");

    if (!option) return false;

    // Tìm div trong children
    const div = option.children.find((child) => child.type === "div");
    console.log(div);

    if (!div) return false;

    // Tìm thẻ <p> đầu tiên bên trong <div>
    const firstP = div.props.children.find((child) => child.type === "p");

    if (!firstP) return false;

    return firstP.props.children.toLowerCase().includes(input.toLowerCase());
  };

  const handleOnChange = (e) => {
    const keyword = e.target.value;

    const filteredLocations = data?.filter(
      (location) =>
        location.tenViTri.toLowerCase().includes(keyword?.toLowerCase()) ||
        location.tinhThanh.toLowerCase().includes(keyword?.toLowerCase())
    );
    setListDataSearch(filteredLocations, keyword);
  };

  useOutsideClick(menuWapperElm, () => {
    props.setOpen(false);
  });

  return (
    <div
      ref={menuWapperElm}
      onClick={() => props.setOpen(true)}
      className="px-6 flex-1 relative cursor-pointer"
    >
      <p className="text-sm font-medium">Địa điểm</p>

      <input
        onChange={handleOnChange}
        className="border-none outline-none !shadow-none w-full"
        type="text"
        placeholder="Tìm kiếm điểm đến"
      />
      {/* <Select
        onChange={handleOnChange}
        showSearch
        allowClear
        suffixIcon={null}
        placeholder="Tìm kiếm điểm đến"
        className="!shadow-none w-full border-none outline-none focus:ring-0 focus:border-transparent"
        // optionFilterProp="children"
        // filterOption={handleFilter}
      >
        {renderItem()}
      </Select> */}

      {props.open && (
        <div className="absolute top-16 left-0 w-[150%] rounded-3xl z-10 shadow-box-shadow-3 bg-white p-5">
          <div className="overflow-y-scroll -mr-4 h-[60vh] no-scrollbar-buttons">
            <p className="text-sm pb-3">Điểm đến được đề xuất</p>
            {renderItem()}
          </div>
        </div>
      )}
    </div>
  );
}
