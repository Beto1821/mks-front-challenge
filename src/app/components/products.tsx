import { motion } from 'framer-motion';
import Image from "next/image";
import useCart from '../utils/state';
import { storageService } from '../services/storage';

export default function Products({ products }: { products: IProduct[] }) {
  const { cart, addToCart } = useCart();

  const handleBuyClick = (product: IProduct) => {
    // add to zustand state
    addToCart(product);

    // add to cart
    // storageService.setItem('cart', cart);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.length > 0 && products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white p-4 rounded-lg shadow-md w-72"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={product.photo}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover mb-4 rounded-md"
            priority={true}
          />
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-gray-800 font-semibold mb-2">${product.price}</p>
          <motion.button
            onClick={() => handleBuyClick(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Comprar
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
