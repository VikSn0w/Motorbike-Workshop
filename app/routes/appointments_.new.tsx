import { json } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const customer = formData.get("customer") as string;
    const phone = formData.get("phone") as string;
    const bikeModel = formData.get("bikeModel") as string;
    const serviceId = parseInt(formData.get("serviceId") as string);
    const bikeMakerId = parseInt(formData.get("bikeMakerId") as string);
    const date = new Date(formData.get("date") as string);
    const status = formData.get("status") as string;

    if (!customer || !phone || !bikeModel || !serviceId || !bikeMakerId || isNaN(date.getTime())) {
        return json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                customer,
                phone,
                bikeModel,
                serviceId,
                bikeMakerId,
                date,
                status,
            },
        });
        return json({ newAppointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return json({ error: "Could not create appointment" }, { status: 500 });
    }
};