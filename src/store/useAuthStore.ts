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
  login_test: (credentials: any) => Promise<void>;
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
      // if (storedToken) {
      //   set({ token: storedToken, isAuthenticated: true });
      //   await get().fetchUser();
      // }
      // 💡 FIX: If it's your mock token, bypass the network request and hydrate the user locally
      if (storedToken === "mock-jwt-token-12345") {
        set({
          user: {
            id: 1,
            name: "Samuel Taiwo",
            email: "onayemi18@gmail.com",
          },
          isAuthenticated: true,
        });
      } else {
        // Otherwise, run the normal production API database check
        await get().fetchUser();
      }
    } catch (e) {
      await SecureStore.deleteItemAsync("auth_token");
    } finally {
      set({ isHydrated: true });
    }
  },

  login_test: async (credentials: any) => {
    // 1. Simulate API Network Latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 2. Local Business Logic for Mock Testing
    if (
      credentials.email === "onayemi18@gmail.com" &&
      credentials.password === "123456"
    ) {
      const dummyToken = "mock-jwt-token-12345";
      const dummyUser = {
        id: 1,
        name: "Samuel Taiwo",
        email: credentials.email,
      };

      // Persist the dummy token locally
      await SecureStore.setItemAsync("auth_token", dummyToken);

      // Update store state
      set({ token: dummyToken, user: dummyUser, isAuthenticated: true });
    } else {
      // Throw a mock Axios-shaped error to match backend response structures
      const error = new Error("Unauthorized") as any;
      error.response = {
        data: {
          message: "Invalid credentials. Use test@example.com / password123",
        },
      };
      throw error;
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
    // 💡 FIX: Prevent the backend from intercepting your mock session
    if (get().token === "mock-jwt-token-12345") {
      return;
    }
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
