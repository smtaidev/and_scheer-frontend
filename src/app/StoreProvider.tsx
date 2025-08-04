"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../redux/store";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../lib/verifyToken";
import { clearTokens } from "../lib/tokenUtils";
import { TLoggedUser } from "../types/reduxType";
import Cookies from "js-cookie";
import TokenRefreshManager from "../components/TokenRefreshManager";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  // Restore auth state from HTTP-only cookies
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        console.log(
          "🔍 StoreProvider: Attempting to restore auth from HTTP-only cookies..."
        );

        // Call backend to validate session from HTTP-only cookies
        const response = await fetch(
          "http://172.252.13.71:5005/api/v1/auth/validate-session",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send HTTP-only cookies
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data?.success && data?.data?.accessToken && data?.data?.user) {
            console.log("✅ StoreProvider: Session validated successfully");
            console.log("👤 StoreProvider: User restored:", data.data.user);

            // Decode user from access token to get full JWT payload
            const user = verifyToken(data.data.accessToken) as TLoggedUser;

            console.log("🚀 StoreProvider: Dispatching setUser to Redux...");
            storeRef.current?.dispatch(
              setUser({
                user,
                token: data.data.accessToken,
              })
            );
            console.log("✅ StoreProvider: Redux dispatch completed");
          } else {
            console.log("❌ StoreProvider: Session validation failed");
          }
        } else {
          console.log("❌ StoreProvider: No valid session found");
        }
      } catch (error) {
        console.error(
          "❌ StoreProvider: Error restoring auth from HTTP-only cookies:",
          error
        );
      }
    };

    // Add a small delay to avoid conflicts with login
    const timeoutId = setTimeout(restoreAuth, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Provider store={storeRef.current}>
      <TokenRefreshManager />
      {children}
    </Provider>
  );
}
