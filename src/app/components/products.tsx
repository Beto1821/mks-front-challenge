import { motion } from 'framer-motion';
import Image from "next/image";
import useCart from '../utils/state';
import { storageService } from '../services/storage';
import { ShoppingBag } from '@phosphor-icons/react';
import { useEffect } from 'react';

export default function Products({ products }: { products: IProduct[] }) {
  const { cart, addToCart, createCart } = useCart();

  useEffect(() => {
    storageService.setItem('cart', cart);
  }, [cart]);

  const handleBuyClick = (product: IProduct) => {
    // add to zustand state
    addToCart(product);

    // add to cart
    storageService.setItem('cart', cart);
  };

  return (
    <div className="flex flex-wrap gap-5 justify-center px-4 rounded-2xl shadow-lg items-stretch">
      {products.length > 0 && products.map((product) => (
        <motion.div
          key={product.id}
          className="self-stretch relative flex flex-col w-100 items-center p-4 justify-around gap-4 bg-white rounded-2xl shadow-md w-72 border-1"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        > 
          <Image
            src={product.photo}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover mb-4 rounded-md py-12"
            priority={true}
          />


          <div className='flex items-center justify-between w-full self-center py-1 '>
            <h2 className="text-xl font-semibold w-3/5 ">{product.name}</h2>
            <p className="font-semibold bg-black text-white w-9/12 h-30 rounded-2xl text-center">{formatter.format(Number(product.price))}</p>
          </div>

          <p className="text-gray-600 text-md mb-0 inset-x-0 bottom-0 h-200 py-10">{product.description}</p>

          <motion.button
            onClick={() => handleBuyClick(product)}
            className="absolute bottom-0 flex gap-2 items-center justify-center bg-blue-500 hover:bg-blue-600 w-full text-white px-4 py-2 rounded-b-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ShoppingBag size={20} />
            Comprar
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL' 
});
