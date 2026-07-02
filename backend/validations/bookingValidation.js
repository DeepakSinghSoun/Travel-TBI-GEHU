import { z } from "zod";

export const bookingSchema = z.object({
  homestay: z.string().min(1, "Homestay is required"),

  checkIn: z.string().min(1, "Check-in date is required"),

  checkOut: z.string().min(1, "Check-out date is required"),

  guests: z
    .number({ invalid_type_error: "Guests must be a number" })
    .min(1, "At least 1 guest is required"),

  // totalPrice: z
  //   .number({ invalid_type_error: "Total price must be a number" })
  //   .min(0, "Price cannot be negative"),
});