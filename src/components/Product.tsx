"use client";
import Image from "next/image";
import React, { useEffect} from "react";
import Loader from "./Loader";
import { add, remove } from "@/store/slices/cartSlice";
import { fetchProducts } from "@/store/slices/productSlice";
import { useAppDispatch } from "@/store/hook";
import { useAppSelector } from "@/store/hook";


const Product = () => {
  const dispatch = useAppDispatch();
  const {loading,products,error} = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    
  }, []);

  if (loading) return <Loader />;

  if (!loading && error)
    return (
      <div className="flex  mt-0 items-center bg-white h-[200px] text-red-500">
        <p>Error: {error}</p>
      </div>
    );

  console.log("pro", products);
  
  return (
    <div className="flex flex-wrap justify-center   gap-5">
      {!loading &&
        Array.isArray(products) &&
        products.length >= 1 &&
        products.map((product) => (
          <div
            className="relative font-semibold  bg-white flex flex-col items-center gap-2 px-2 text-black justify-center h-[380px]  w-[250px]  text-center rounded-md"
            key={product.id}
          >
            <Image src={product.image} width={100} priority height={0} alt="" />
            <h4>{product.title} </h4>
            <h5 className="font-bold">${product.price}</h5>
            <button
              onClick={() => dispatch(add(product))}
              className=" bg-[#764abc] w-[70%] rounded-md text-white py-1 px-2 absolute bottom-2"
            >
              Add to cart
            </button>
          </div>
        ))}
    </div>
  );
};

export default Product;
