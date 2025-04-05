import { filterIncludes } from "../../../utils";

export function buildDataLocation(data) {
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
  return data.map((item) => {
    const randomIndex = Number((Math.random() * 100).toFixed(0)) % array.length;
    return {
      ...item,
      icon: array[randomIndex].img,
      description: array[randomIndex].description,
      label: `${item.tenViTri} - ${item.tinhThanh}`,
    };
  });
}

export function filterLocation(keysearch, data) {
  if (!keysearch) return data;
  return data?.filter((location) => {
    return filterIncludes(keysearch, [
      location.tinhThanh,
      location.tenViTri,
      location.description,
      location.label,
    ]);
  });
}
