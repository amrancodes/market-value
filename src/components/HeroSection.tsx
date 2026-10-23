import Image from 'next/image';


const HeroSection = () => {
    const date = new Date().toLocaleDateString ("bn-BD", {dateStyle : "full" });
    return (
        <section className="relative mx-auto w-full max-w-7xl px-4 py-6">
      <div className="flex min-h-[180px] items-center justify-between overflow-hidden rounded-2xl border border-gray-200 bg-[#f8fbf8] px-6 py-5 md:px-10">

        {/* Left Content */}
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {date}
          </span>

          <h1 className="mt-3 text-2xl font-bold text-gray-800 md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, তথ্য, সর্বনিম্ন-সর্বোচ্চ
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="mt-4 rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-800">
            সব দাম দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden shrink-0 md:block">
          <Image
            src="/bazar-hero.png"
            alt=""
            width={180}
            height={150}
            className="h-[140px] w-[180px] "
          />
        </div>

      </div>
    </section>
    );
};

export default HeroSection;