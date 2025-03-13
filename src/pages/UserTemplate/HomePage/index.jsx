import RoomList from "../RoomList";
import Topic from "../Topic";

export default function HomePage() {
  return (
    <div className="pt-[400px] container mx-auto">
      <Topic />
      <RoomList />
    </div>
  );
}
