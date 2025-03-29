export default function Avatar(props) {
  const { imgAvatar, width, height, children } = props;
  return (
    <div>
      <div className="pb-4 flex items-center gap-5">
        <div>
          <img
            style={{ width: width, height: height, borderRadius: "50%" }}
            src={imgAvatar}
            alt="logo"
          />
        </div>
        <div className="flex-grow lg:w-1/2 lg:flex-grow-0">{children}</div>
      </div>
    </div>
  );
}
