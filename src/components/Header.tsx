import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <>
      <header className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-icon.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg bg-green-800"
              />

              <div className="flex flex-col">
                <span className="font-bold">বাজার দর</span>
                <span>{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <button className="btn">সাইন ইন</button>
              <button className="btn bg-green-700 text-white">
                সাইন আপ
              </button>
            </div>
          </div>

          <NavLinks />
        </div>
      </header>

      {/* Marquee full width */}
      <div className="relative z-10 w-full bg-white">
        <Marquee />
      </div>
    </>
  );
};

export default Header;
