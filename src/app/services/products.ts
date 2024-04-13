import { api } from "@/boot/axios";

class Products {
  public async get() {
    try {
      const { data }: { data: { products: IProduct[] } } = await api.get(`/products?page=1&rows=8&sortBy=id&orderBy=DESC`);

      return Promise.resolve(data.products)
    } catch (error) {
      return Promise.reject()
    }
  }
}

export const productsService = new Products();
