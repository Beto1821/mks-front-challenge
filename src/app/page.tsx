'use client'

import { useEffect, useState } from "react";

import Header from "./components/header";
import Products from "./components/products";
import Footer from "./components/footer";

import { productsService } from "./services/products";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const productsData = await productsService.get();
        setProducts(productsData);
      } catch (err) {
        console.log('Error occurred when fetching products');
      } finally {
        setLoading(false);
      }
    })();
  }, []); 

  return (
    <>
      {loading ? (
        <p className="text-center p-3">Loading...</p>
      ) : (
        <div className="flex flex-col gap-10">
          <Header />
          <Products products={products} />
          <Footer />
        </div>
      )}
    </>
  );
}
