import { ShoppingCart, X } from "@phosphor-icons/react";
import useCart from "../utils/state";

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart, addToCart } = useCart();

  const ref = useRef(null);

  const toggleSidebar = () => setOpen(prev => !prev)

  return (
    <header>
      <span>MKs sistemas</span>

      <button
        onClick={toggleSidebar}
        className="p-3 border-2 border-zinc-800 rounded-xl relative"
        aria-label="toggle sidebar"
      >
        <ShoppingCart size={32} />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
            {cart.map((item) => item.count).reduce((total, number) => total + number, 0)}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 right-0 px-7 z-50 w-72 h-screen max-w-xs bg-[#0F52BA]"
              ref={ref}
              aria-label="Sidebar"
            >
              <button
                onClick={toggleSidebar}
                className="absolute top-3 right-3 p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                aria-label="Close sidebar"
              >
                <X size={20} style={{ color: 'black' }} />
              </button>

              <div style={{ marginTop: '80px' }}>
                {cart.length === 0 ? (
                  <p className="text-center mt-5">O carrinho está vazio</p>
                ) : (
                  <ul>
                    {cart.map((product, idx) => {
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-5 mb-3 p-5 transition-all bg-white rounded-md"
                        >
                          <motion.div {...framerIcon}>
                            <Image
                              src={product.photo}
                              alt={product.name}
                              width={50}
                              height={60}
                              priority={true}
                            />
                          </motion.div>
                          <motion.span {...framerText(idx)} className="text-black">
                            {product.name} - {product.price}
                          </motion.span>
                        </div>
                      )
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}

const framerSidebarPanel = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { duration: 0.3 },
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

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
}
