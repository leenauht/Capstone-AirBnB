import { Input } from "antd";

export default function Comment() {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div>
      <h3>Đánh giá</h3>
      <div className="pb-10 flex items-center gap-5">
        <div>
          <img
            style={{ width: 56, height: 56, borderRadius: "50%" }}
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODE5NTY3ODE3ODIwMjIzMzIw/original/322d445c-efe0-437a-9cf8-9a7212da9c96.png?im_w=720"
            alt="logo"
          />
        </div>
        <div className="flex-grow lg:w-1/2 lg:flex-grow-0">
          <Input
            showCount
            maxLength={100}
            onChange={onChange}
            suffix={
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 24 24"
              >
                {/* Icon from All by undefined - undefined */}
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M22 12L3 20l3.563-8L3 4zM6.5 12H22"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
