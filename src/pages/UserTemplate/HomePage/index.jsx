import RoomList from "../RoomList";
import Topic from "../Topic";

export default function HomePage() {
  return (
    <div className="pt-[160px] overflow-x-hidden">
      <Topic />
      <RoomList />
    </div>
  );
}
