import { z } from "zod";

export const bikeMakerSchema = z.object({
    name: z.string().min(1, "Bike maker name is required"),
});