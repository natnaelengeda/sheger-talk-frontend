// Components
import BottomBar from "@/components/BottomBar";
import Messages from "@/components/Messages";

export default function Home() {

  return (
    <div
      className="relative w-full h-full flex flex-col-reverse items-end justify-end font-Roboto pb-16">
      <Messages />

      <BottomBar />
    </div>
  );
}
