export default function Send(props) {
  return (
    <svg
      onClick={props.onClick}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M22 12L3 20l3.563-8L3 4zM6.5 12H22"
      />
    </svg>
  );
}
