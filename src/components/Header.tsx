import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';

const Header = () => {

 const date = new Date().toLocaleDateString ("bn-BD", {dateStyle : "full" });
return(
<header className=" max-w-7xl px-40 py-6">
  <div className="flex items-center justify-between">


    <div className="flex items-center gap-3">
      <button className="bg-green-800 rounded-lg">
        <Image
          className="w-10 h-10"
          height={40}
          width={40}
          src="/logo-icon.png"
          alt="Logo"
        />
      </button>

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
  <NavLinks/>
</header>

);
};

export default Header;