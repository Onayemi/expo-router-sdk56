// src/store/useProductStore.ts
import { create } from "zustand";
import api from "../services/api";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  createProduct: (data: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/products");
      set({ products: response.data });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (data) => {
    const response = await api.post("/products", data);
    set((state) => ({ products: [...state.products, response.data] }));
  },

  updateProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? response.data : p)),
    }));
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
}));
