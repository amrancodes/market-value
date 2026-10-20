import DamBarce from "@/components/DamBarce";
import DamKomce from "@/components/DamKomce";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";


export default function Home() {
  
  return (
    <div>
      <Marquee/>
      <HeroSection/>
      <DamBarce/>
      <DamKomce/>
    </div>
  );
}
