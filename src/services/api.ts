import { Meeting, Review } from "../types/events";
import { mockEvents, mockReviews } from "./data";

export const fetchEvents = async (): Promise<Meeting[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockEvents), 1000));
};

export const fetchReviews = async (): Promise<Review[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockReviews), 1000));
};

//TODO implement mock api via json.server to return changing mock data
