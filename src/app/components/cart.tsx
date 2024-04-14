import { Minus, Plus, X } from "@phosphor-icons/react";
import Image from "next/image";
import { motion } from 'framer-motion';

import useCart from "../utils/state";
import { storageService } from "../services/storage";

interface ICartOptions {
  toggleSidebar: () => void
}

export default function Cart({ toggleSidebar }: ICartOptions) {
  const { cart, addToCart, removeFromCart, updateProductCount, clearCart } = useCart();

  const handleMinus = (product: IProduct) => {
    removeFromCart(product);
  };

  const handlePlus = (product: IProduct) => {
    addToCart(product);
  };

  const handleInputChange = (value: number, product: IProduct) => {
    setTimeout(() => {
      updateProductCount(product, value);

    }, 300)
  };

  const handleRemoveProduct = (product: IProduct) => {
    removeFromCart(product, true);
  };

  const handleFinalizeCheckout = () => {
    clearCart();
    storageService.removeItem('cart');
    toggleSidebar();
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className='absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 focus:outline-none text-white rounded-full'
        aria-label='Close sidebar'
      >
        <X size={23} />
      </button>

      <div className="px-7 h-full max-h-[70%] overflow-y-auto" style={{ marginTop: '80px' }}>
        {cart.length === 0 ? (
          <p className='text-center mt-5 text-3xl'>O carrinho está vazio</p>
        ) : (
          <div className='flex flex-col items-center gap-3'>
            {cart.map((product, idx) => {
              return (
                <motion.div
                  key={product.id}
                  {...framerText(idx)}
                  className='relative flex items-center justify-between w-full py-3 px-5 transition-all bg-white rounded-md text-black'
                >
                  <button
                    onClick={() => handleRemoveProduct(product)}
                    className='absolute top-2 right-2 p-1 rounded-full bg-black text-white'
                  >
                    <X size={15} />
                  </button>

                  <div className='flex items-center gap-4 w-[40%]'>
                    <Image
                      src={product.photo}
                      alt={product.name}
                      width={120}
                      height={140}
                      priority={true}
                    />

                    <span className='text-md'>{product.name}</span>
                  </div>

                  <div className='flex w-[20%]'>
                    <button
                      onClick={() => handleMinus(product)}
                      className='border border-gray-200 py-2 px-3 rounded-md'
                    >
                      <Minus size={10} />
                    </button>

                    <input
                      type='number'
                      value={product.count}
                      onChange={(e) =>
                        handleInputChange(Number(e.target.value), product)
                      }
                      className='border border-gray-200 py-2 px-3 w-12 text-center'
                    />

                    <button
                      onClick={() => handlePlus(product)}
                      className='border border-gray-200 py-2 px-3 rounded-md'
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  <b className='text-lg w-[20%]'>
                    {formatter.format(Number(product.price))}
                  </b>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="flex flex-col align-center w-full gap-5 absolute bottom-0">
          <div className="flex align-center justify-between px-[10%] text-3xl font-bold">
            <span>Total:</span>

            <span>
              {formatter.format(
                cart.reduce((total, item) => total + item.count * Number(item.price), 0)
              )}
            </span>
          </div>

          <div onClick={handleFinalizeCheckout} className="w-full bg-black text-white text-center text-4xl p-7 font-bold cursor-pointer">
            Finalizar compra
          </div>
        </div>
      )}
    </>
  );
}

const framerText = (delay: number) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  }
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL' 
});
