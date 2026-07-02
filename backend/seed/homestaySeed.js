import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Homestay from "../models/Homestay.js";


dotenv.config();

await connectDB();

await Homestay.deleteMany();

await Homestay.insertMany([
  {
    title: "Goa Beach Villa",
    location: "Goa",
    price: 2500,
    roomType: "Deluxe",
    availableRooms: 5,
    availableFrom: new Date(),
    availableTo: new Date("2026-12-31"),
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    ],
  },
  {
    title: "Manali Mountain Stay",
    location: "Manali",
    price: 1800,
    roomType: "Standard",
    availableRooms: 3,
    availableFrom: new Date(),
    availableTo: new Date("2026-12-31"),
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    ],
  },
]);

console.log("✅ Homestays seeded successfully");

process.exit();