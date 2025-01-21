import Image from "next/image";

// AppAsset
import AppAsset from "@/core/AppAsset";

export default function Home() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center pt-20 md:pt-20 font-Roboto">
      <div
        className="w-full flex flex-col items-center justify-start gap-5">
        <Image
          className="w-28 md:w-40 h-auto object-contain"
          src={AppAsset.logo}
          alt={"Logo"} />
        <h1
          className="text-3xl md:text-4xl font-extrabold">
          Sheger Talk
        </h1>
      </div>

      <div className="pt-60 md:pt-80">
        <h1 className="text-2xl md:text-3xl">Comming Soon...</h1>
      </div>

    </div>
  );
}
