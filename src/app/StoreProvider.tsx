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

  // Restore auth state from cookies and refresh if needed
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        console.log("🔍 Attempting to restore auth from cookies...");
        const token = Cookies.get("accessToken");

        if (!token) {
          console.log("❌ No access token found in cookies");
          return;
        }

        console.log("✅ Access token found in cookies");
        let currentToken = token;
        let user: TLoggedUser;

        try {
          user = verifyToken(currentToken) as TLoggedUser;

          // Check if token is expired or will expire soon (within 5 minutes)
          const currentTime = Date.now() / 1000;
          const expiryBuffer = 5 * 60; // 5 minutes

          if (user.exp < currentTime + expiryBuffer) {
            console.log(
              "⏰ Token expired or expiring soon, attempting refresh..."
            );

            // Try to refresh token
            console.log("🍪 Available cookies:", document.cookie);
            const refreshToken = Cookies.get("refreshToken");
            console.log("🔑 Refresh token found:", !!refreshToken);

            if (!refreshToken) {
              console.log("❌ No refresh token available");
              clearTokens();
              return;
            }

            // Check refresh token validity
            try {
              const refreshTokenDecoded = verifyToken(
                refreshToken
              ) as TLoggedUser;
              const currentTime = Date.now() / 1000;
              console.log(
                "🔍 Refresh token expiry:",
                new Date(refreshTokenDecoded.exp * 1000)
              );
              console.log(
                "🔍 Refresh token expired?",
                refreshTokenDecoded.exp < currentTime
              );

              if (refreshTokenDecoded.exp < currentTime) {
                console.log(
                  "💥 Refresh token is expired! Cannot restore auth."
                );
                clearTokens();
                return;
              }
            } catch (error) {
              console.log("⚠️ Could not decode refresh token:", error);
            }

            console.log("📤 Sending refresh request during restore...");

            const refreshResponse = await fetch(
              "http://localhost:5005/api/v1/auth/refresh-token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include", // refreshToken sent automatically via HTTP-only cookie
              }
            );

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              console.log("🔄 Refresh response during restore:", refreshData);

              if (refreshData?.success && refreshData?.data?.accessToken) {
                console.log("✅ Token refreshed successfully during restore");
                console.log(
                  "🔄 New refresh token automatically set via HTTP-only cookie"
                );
                currentToken = refreshData.data.accessToken;
                user = verifyToken(currentToken) as TLoggedUser;

                // Save new token
                Cookies.set("accessToken", currentToken, {
                  expires: 7,
                  sameSite: "lax",
                  secure: process.env.NODE_ENV === "production",
                });
              } else {
                console.log("❌ Token refresh failed during restore");
                clearTokens();
                return;
              }
            } else {
              console.log("❌ Token refresh request failed during restore");
              clearTokens();
              return;
            }
          }
        } catch (error) {
          console.error("❌ Error verifying token:", error);
          clearTokens();
          return;
        }

        console.log("👤 User restored:", user);
        console.log("✅ Auth restored successfully from cookies");

        storeRef.current?.dispatch(
          setUser({
            user,
            token: currentToken,
          })
        );
      } catch (error) {
        console.error("❌ Error restoring auth from cookies:", error);
        clearTokens();
      }
    };

    restoreAuth();
  }, []);

  return (
    <Provider store={storeRef.current}>
      <TokenRefreshManager />
      {children}
    </Provider>
  );
}
