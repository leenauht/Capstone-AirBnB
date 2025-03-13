import RoomList from "../RoomList";
import Topic from "../Topic";

export default function HomePage() {
  return (
    <div className="pt-[400px] overflow-x-hidden">
      <Topic />
      <RoomList />
    </div>
  );
}
