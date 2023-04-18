"use client";
import React from "react";
import Link from "next/link";
import {
  add,
  remove,
  selectedProducts,
  updateQuantity,
} from "../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Image from "next/image";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectedProducts);
  console.log("productsss", products);
  const itemsCheck = products.length===0 
  return (
    <div className={`bg-black ${itemsCheck && 'justify-center items-center'}  mt-0 p-12 sm:py-24 sm:px-32 flex flex-col gap-10`}>
      {products.length === 0 && (
        <div className="bg-white h-[300px] gap-2 p-5 rounded-lg w-[250px]  flex flex-col  justify-center ">
          <p className="text-black  font-bold">
            No Item in the cart. Go Back to Start Shopping{" "}
          </p>
          <Link
            href="/"
            className="bg-black justify-between flex rounded-md w-[82%]    hover:bg-[#764abc]  text-white font-semibold py-1 px-2"
          >
            <p>Back</p>
            <BsArrowLeftShort className="self-center" size={20} />
          </Link>
        </div>
      )}
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white relative  font-semibold flex max-[975px]:gap-2 max-[975px]:flex-col  sm:px-4 sm:w-auto flex-row  items-center  justify-between  text-black mb-5 p-3.5 rounded-md"
        >
          <Image src={product.image} height={150} width={80} alt="" />
          <h5 className="text-center max-[975px]:w-full w-[50%]">
            {product.title}
          </h5>
          <h5 className=" font-bold">${product.calculatedPrice.toFixed(0)}</h5>
          <div className=" flex gap-1  ">
            <AiFillMinusCircle
              className="hover:text-[#764abc] self-end cursor-pointer"
              onClick={() => dispatch(updateQuantity(product))}
              size={20}
            />
            <p className="justify-self-start font-bold ">{product.quantity}</p>
            <AiFillPlusCircle
              className="hover:text-[#764abc] self-end cursor-pointer"
              onClick={() => dispatch(add(product))}
              size={20}
            />
          </div>
          <button
            className="bg-black rounded-md  hover:bg-[#764abc]  text-white font-semibold py-1 px-6"
            onClick={() => dispatch(remove(product))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
