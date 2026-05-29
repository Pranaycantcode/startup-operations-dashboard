import { Activity } from "@/types/activity";
import { API_BASE_URL } from "@/config/api";

const API_URL = `${API_BASE_URL}/api/activities`;

export const fetchActivities = async (): Promise<Activity[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  const result = await response.json();

  return result.data;
};