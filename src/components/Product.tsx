"use client";
import Image from "next/image";
import React, { useEffect,useState} from "react";
import Loader from "./Loader";
import { add } from "@/store/slices/cartSlice";
import {  fetchProducts } from "@/store/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {BsArrowRightShort} from 'react-icons/bs'
import { useRouter } from "next/navigation";
import type {Product} from '@/store/slices/productSlice'

const Products = () => {
  const dispatch = useAppDispatch();
  const {loading,products,error} = useAppSelector((state) => state.product);
  const [buttonLoading,setButtonLoading] = useState<number|undefined>()
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchProducts());
    
  }, [dispatch]);

  if (loading) return <Loader />;

  if (!loading && error)
    return (
      <div className="flex  mt-0 items-center bg-white h-[200px] text-red-500">
        <p>Error: {error}</p>
      </div>

    );

    const addProducts =(product:Product,idx:number|undefined)=>{
      dispatch(add(product));
      setButtonLoading(idx)
      setTimeout(()=>{
        setButtonLoading(undefined)
        router.push('/cart')
      },2000)
    }

  
  return (
    <div className="flex flex-wrap justify-center   gap-5">
      {!loading &&
        Array.isArray(products) &&
        products.length > 1 &&
        products.map((product,index) => (
          <div
            className="relative font-semibold  bg-white flex flex-col items-center gap-2 px-2 text-black justify-center h-[380px]  w-[250px]  text-center rounded-md"
            key={product.id}
          >
            <Image src={product.image} width={100} priority height={0} alt="" />
            <h4>{product.title} </h4>
            <h5 className="font-bold">${product.price}</h5>
            <button
              onClick={()=> addProducts(product,index)}
              className=" bg-white border-2 border-[#764abc] hover:bg-[#764abc] hover:font-bold     flex  justify-between w-[70%] rounded-md text-black py-1 px-2 absolute bottom-2"
            >
              {buttonLoading===index ? <p>Adding...</p> : <p>Add to cart</p>}
              
              <BsArrowRightShort className="self-center" size={20} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Products;
