import { json } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";
import { appointmentSchema } from "~/schemas/appointments";
import { z } from "zod";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const validated = appointmentSchema.parse(data);

        const appointment = await prisma.appointment.create({
            data: {
                customer: validated.customer,
                date: new Date(validated.date),
                serviceId: parseInt(validated.serviceId, 10),
                bikeMakerId: parseInt(validated.bikeMakerId, 10),
                status: validated.status,
                phone: validated.phone,
                bikeModel: validated.bikeModel,
            },
        });

        return json({ success: true, appointment });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return json({ error: error.errors }, { status: 400 });
        }
        throw error;
    }
};