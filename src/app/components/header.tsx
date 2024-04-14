import { ShoppingCart } from "@phosphor-icons/react";
import useCart from "../utils/state";

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import Cart from "./cart";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const ref = useRef(null);

  const toggleSidebar = () => setOpen(prev => !prev);

  return (
    <header>
      <span className="text-lg"><b className="text-bold text-3xl">MKS</b> Sistemas</span>

      <button
        onClick={toggleSidebar}
        className="p-2 relative"
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
              onClick={toggleSidebar}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 right-0 z-50 min-w-[35%] h-screen bg-[#0F52BA]"
              ref={ref}
              aria-label="Sidebar"
            >
              <Cart toggleSidebar={toggleSidebar} />
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
