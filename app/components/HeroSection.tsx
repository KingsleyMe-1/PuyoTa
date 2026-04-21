import Image from "next/image";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[560px] md:min-h-[640px]">
      <Image
        src="/Cebu-City.jpg"
        alt="Cebu City skyline at sunset"
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />



      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 px-0 w-full py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white text-center max-w-2xl leading-tight tracking-tight px-6"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
        >
          Where do you want to live in Cebu?
        </h1>
        <SearchBar />
      </div>
    </section>
  );
}

