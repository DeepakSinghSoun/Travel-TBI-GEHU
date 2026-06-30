import { z } from "zod";

export const tripSchema = z.object({
  destination: z.string().min(2, "Destination required"),
  checkIn: z.string().min(1, "Check-in required"),
  checkOut: z.string().min(1, "Check-out required"),
  travelers: z.number().min(1, "At least 1 traveler"),
  budget: z.number().min(0, "Budget must be positive"),
  travelStyle: z.string().optional(),
  transport: z.string().optional(),
  hotelType: z.string().optional(),
});