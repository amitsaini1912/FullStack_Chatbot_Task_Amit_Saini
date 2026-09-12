import mongoose from "mongoose";
import { env } from "../config/env";
import { Enquiry } from "../models/Enquiry";

const sampleEnquiries = [
  {
    name: "Riya Sharma",
    email: "riya.sharma@example.com",
    phone: "9876543210",
    userType: "Student",
    interest: "Drone Pilot Training Course",
    message: "I would like to know the fee structure and duration of the course.",
    status: "New",
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "9123456780",
    userType: "Customer",
    interest: "Agricultural Spraying Drone Service",
    message: "Looking for a quote to spray drones across 50 acres of farmland.",
    status: "Contacted",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "9988776655",
    userType: "Student",
    interest: "Drone Assembly Workshop",
    message: "Is the workshop suitable for someone with no prior electronics background?",
    status: "New",
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "9871234560",
    userType: "Customer",
    interest: "Aerial Survey and Mapping Service",
    message: "We need aerial mapping for a 200-acre construction site. Please share pricing.",
    status: "In Progress",
  },
  {
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "9012345678",
    userType: "Student",
    interest: "Drone Pilot Certification Course",
    message: "Do you provide DGCA-approved certification after course completion?",
    status: "Closed",
  },
  {
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    phone: "9765432108",
    userType: "Customer",
    interest: "Drone Videography for Events",
    message: "Need a drone videographer for a wedding event next month.",
    status: "New",
  },
  {
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    phone: "9345678901",
    userType: "Other",
    interest: "Franchise / Partnership Opportunities",
    message: "Interested in exploring franchise opportunities with DroneTV in Pune.",
    status: "Contacted",
  },
  {
    name: "Karan Desai",
    email: "karan.desai@example.com",
    phone: "9556789012",
    userType: "Student",
    interest: "Advanced Drone Maintenance Course",
    message: "What are the prerequisites for the advanced maintenance course?",
    status: "New",
  },
];

async function seed(): Promise<void> {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Connected to MongoDB for seeding");

    await Enquiry.deleteMany({});
    console.log("Cleared existing enquiries");

    await Enquiry.insertMany(sampleEnquiries);
    console.log(`Inserted ${sampleEnquiries.length} sample enquiries`);

    await mongoose.disconnect();
    console.log("Seeding complete. Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
