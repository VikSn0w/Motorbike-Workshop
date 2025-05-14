import type { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const id = formData.get("id") ? parseInt(formData.get("id") as string) : null;
    const customer = formData.get("customer") as string;
    const phone = formData.get("phone") as string;
    const bikeModel = formData.get("bikeModel") as string;
    const serviceId = parseInt(formData.get("serviceId") as string);
    const bikeMakerId = parseInt(formData.get("bikeMakerId") as string);
    const date = new Date(formData.get("date") as string);
    const status = formData.get("status") as string;

    if (!customer || !phone || !bikeModel || !serviceId || !bikeMakerId || isNaN(date.getTime())) {
        return new Response("Missing required fields", { status: 400 });
    }

    const data = {
        customer,
        phone,
        bikeModel,
        serviceId,
        bikeMakerId,
        date,
        status,
    };

    try {
        if (id) {
            // Update existing appointment
            const updatedAppointment = await prisma.appointment.update({
                where: { id },
                data,
            });
            return { updatedAppointment };
        } else {
            // Create a new appointment
            const newAppointment = await prisma.appointment.create({
                data,
            });
            return { newAppointment };
        }
    } catch (error) {
        console.error("Error saving appointment:", error);
        return new Response("Could not save appointment", { status: 500 });
    }
}