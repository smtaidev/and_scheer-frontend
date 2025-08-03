import Cookies from "js-cookie";
import { useEffect } from "react";
import { verifyToken } from "@/lib/verifyToken";
import { clearTokens } from "@/lib/tokenUtils";
import { TLoggedUser } from "@/types/reduxType";
import { setUser, logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useTokenRefresh = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!token) return;

      try {
        const decodedToken = verifyToken(token) as TLoggedUser;
        const currentTime = Date.now() / 1000;
        const expiryBuffer = 2 * 60; // 2 minutes before expiry

        // If token will expire soon, refresh it
        if (decodedToken.exp < currentTime + expiryBuffer) {
          console.log("🔄 Token expiring soon, auto-refreshing...");

          console.log("🍪 Available cookies for refresh:", document.cookie);
          const refreshToken = Cookies.get("refreshToken");
          console.log(
            "🔑 Refresh token found for auto-refresh:",
            !!refreshToken
          );

          if (!refreshToken) {
            console.log("❌ No refresh token available for auto-refresh");
            clearTokens();
            dispatch(logOut());
            return;
          }

          // Check if refresh token is valid
          try {
            const refreshTokenDecoded = verifyToken(
              refreshToken
            ) as TLoggedUser;
            const currentTime = Date.now() / 1000;
            console.log(
              "🔍 Refresh token expiry:",
              new Date(refreshTokenDecoded.exp * 1000)
            );
            console.log("🔍 Current time:", new Date());
            console.log(
              "🔍 Refresh token expired?",
              refreshTokenDecoded.exp < currentTime
            );

            if (refreshTokenDecoded.exp < currentTime) {
              console.log("💥 Refresh token is expired! Logging out...");
              clearTokens();
              dispatch(logOut());
              return;
            }
          } catch (error) {
            console.log("⚠️ Could not decode refresh token:", error);
            console.log(
              "🔍 Refresh token content:",
              refreshToken.substring(0, 50) + "..."
            );
          }

          console.log(
            "📤 Sending refresh request with token:",
            refreshToken.substring(0, 50) + "..."
          );

          const response = await fetch(
            "http://localhost:5005/api/v1/auth/refresh-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // refreshToken sent automatically via HTTP-only cookie
            }
          );

          if (response.ok) {
            const data = await response.json();

            if (data?.success && data?.data?.accessToken) {
              console.log("✅ Token auto-refreshed successfully");
              console.log(
                "🔄 New refresh token automatically set via HTTP-only cookie"
              );
              const newUser = verifyToken(data.data.accessToken) as TLoggedUser;

              // Save new token
              Cookies.set("accessToken", data.data.accessToken, {
                expires: 7,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
              });

              dispatch(
                setUser({
                  user: newUser,
                  token: data.data.accessToken,
                })
              );
            } else {
              console.log("❌ Auto-refresh failed, logging out");
              clearTokens();
              dispatch(logOut());
            }
          } else {
            console.log("❌ Auto-refresh request failed, logging out");
            clearTokens();
            dispatch(logOut());
          }
        }
      } catch (error) {
        console.error("❌ Error during auto-refresh:", error);
        clearTokens();
        dispatch(logOut());
      }
    };

    // Check token immediately
    checkAndRefreshToken();

    // Set up interval to check every minute
    const interval = setInterval(checkAndRefreshToken, 60 * 1000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return { user, token };
};
