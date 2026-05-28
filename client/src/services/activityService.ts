import { Activity } from "@/types/activity";

const API_URL = "http://localhost:5000/api/activities";

export const fetchActivities = async (): Promise<Activity[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  const result = await response.json();

  return result.data;
};