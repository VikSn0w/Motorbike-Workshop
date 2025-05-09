// app/routes/appointments/$id/edit.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";

export async function action({ request, params }: ActionFunctionArgs) {
    const id = parseInt(params.id as string);
    const formData = await request.formData();

    if (!id) {
        throw new Response("Missing appointment ID", { status: 400 });
    }

    const customer = formData.get("customer") as string;
    const phone = formData.get("phone") as string;
    const bikeModel = formData.get("bikeModel") as string;
    const service = formData.get("service") as string;
    const date = formData.get("date") as string;
    const notes = formData.get("notes") as string;

    // Basic validation to check if required fields are filled
    if (!customer || !phone || !bikeModel || !service || !date) {
        throw new Response("Missing required fields", { status: 400 });
    }

    const data = {
        customer,
        phone,
        bikeModel,
        service,
        date: new Date(date),
        notes: notes || "",
    };

    try {
        // Update appointment in the database
        const updatedAppointment = await prisma.appointment.update({
            where: { id },
            data,
        });

        // Return the updated appointment data, which can be used to update the modal state
        return { updatedAppointment };
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw new Response("Could not update appointment", { status: 500 });
    }
}