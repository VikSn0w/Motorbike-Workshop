import { z } from "zod";

export const appointmentSchema = z.object({
    customer: z.string().min(1, "Customer name is required"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    serviceId: z.string().min(1, "Service is required"),
    bikeMakerId: z.string().min(1, "Bike maker is required"),
    status: z.enum(["Scheduled", "Completed", "Postponed", "Deleted"]),
    phone: z.string().min(1, "Phone number is required"),
    bikeModel: z.string().min(1, "Bike model is required"),
});