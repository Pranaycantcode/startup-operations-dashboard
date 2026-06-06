import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = async (
  token: string
): Promise<User[]> => {
  const response = await fetch(`${API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return result.data;
};