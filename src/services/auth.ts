"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`http://172.252.13.71:5005/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include", // Include HTTP-only cookies
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (err: any) {
    return Error(err);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `http://172.252.13.71:5005/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const result = await res.json();

    if (result?.success) {
      console.log("✅ Token refreshed via server action");
      console.log(
        "🔄 New refresh token automatically set via HTTP-only cookie"
      );
    }

    return result;
  } catch (err: any) {
    return Error(err);
  }
};
