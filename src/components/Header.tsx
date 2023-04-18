"use client";
import React from "react";

import Link from "next/link";
import { useAppSelector } from "@/store/hook";
import { totalProductsCount } from "@/store/slices/cartSlice";
import { BsFillCartFill } from "react-icons/bs";
import { SiEventstore } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";

const Header = () => {
  const totalItems = useAppSelector(totalProductsCount);
  console.log(totalItems);
  return (
    <div className="font-bold py-4 bg-white text-black px-9 flex items-center justify-between">
      <Link className="flex  gap-2 items-center" href="/">
        <SiEventstore size={28} />
        <p className="font-extrabold text-2xl ">Store</p>
      </Link>
      <div className={`flex gap-5 relative `}>
        <Link href="/">
          <AiFillHome size={28} />
        </Link>
        <Link className="" href="/cart">
          <p className="absolute z-50  top-0 h-[16px] w-[16px] flex justify-center items-center rounded-full bg-[#764abc] text-white  right-0 font-bold text-[10px]">
            {totalItems}
          </p>
          <BsFillCartFill size={28} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
