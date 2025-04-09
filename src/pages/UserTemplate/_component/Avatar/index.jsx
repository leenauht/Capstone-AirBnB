export default function Avatar(props) {
  const { imgAvatar, width, height, children } = props;
  return (
    <div className="flex items-center gap-2 sm:gap-5">
      <div>
        <img
          style={{ width: width, height: height, borderRadius: "50%" }}
          src={imgAvatar}
          alt="logo"
        />
      </div>
      <div className="flex-grow flex-1 custom-900:flex-none custom-900:w-3/5 lg:w-1/2 lg:flex-grow-0">
        {children}
      </div>
    </div>
  );
}
