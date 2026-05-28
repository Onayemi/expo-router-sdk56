// src/store/useAuthStore.ts
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (credentials: any) => Promise<void>;
  register: (details: any) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  hydrateAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isHydrated: false,

  hydrateAuth: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("auth_token");
      if (storedToken) {
        set({ token: storedToken, isAuthenticated: true });
        await get().fetchUser();
      }
    } catch (e) {
      await SecureStore.deleteItemAsync("auth_token");
    } finally {
      set({ isHydrated: true });
    }
  },

  login: async (credentials) => {
    // Communicates natively with Fortify/Sanctum endpoint
    const response = await api.post("/login", credentials);
    const { token, user } = response.data;

    await SecureStore.setItemAsync("auth_token", token);
    set({ token, user, isAuthenticated: true });
  },

  register: async (details) => {
    const response = await api.post("/register", details);
    const { token, user } = response.data;

    await SecureStore.setItemAsync("auth_token", token);
    set({ token, user, isAuthenticated: true });
  },

  fetchUser: async () => {
    try {
      const response = await api.get("/user");
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      get().logout();
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch {
      // Fail-silent on backend validation expiration during local purge
    } finally {
      await SecureStore.deleteItemAsync("auth_token");
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));
