import AllProducts from "@/components/Allproducts";
import DamBarce from "@/components/DamBarce";
import DamKomce from "@/components/DamKomce";
import HeroSection from "@/components/HeroSection";



export default function Home() {
  
  return (
    <div>
      
      <HeroSection/>
      <DamBarce/>
      <DamKomce/>
      <AllProducts/>
    </div>
  );
}
