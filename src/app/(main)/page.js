import FeaturedTiles from "@/components/FeaturedTiles";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedTiles />
    </>
  );
}
