import { ActionFunction, LoaderFunction, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { prisma } from "~/db.server";

// Server-side: handle form submission
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const customer = formData.get("customer")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const bikeModel = formData.get("bikeModel")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const date = new Date(formData.get("date")?.toString() || "");

    if (!customer || !phone || !bikeModel || !service || isNaN(date.getTime())) {
        return json({ error: "All fields are required." }, { status: 400 });
    }

    await prisma.appointment.create({
        data: {
            customer,
            phone,
            bikeModel,
            service,
            date,
        },
    });

    return redirect("/appointments");
};

// Optional loader if you want to fetch initial data like services or mechanics
export const loader: LoaderFunction = async () => {
    return json({});
};

export default function NewAppointment() {
    const actionData = useActionData<typeof action>();
    const serviceOptions = services.map((s) => ({
        value: s.id,
        label: s.name
    }));
    return (
        <div className="max-w-xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">New Appointment</h1>
            {actionData?.error && (
                <div className="mb-4 text-red-600">{actionData.error}</div>
            )}
            <Form method="post" className="space-y-4">
                <div>
                    <label className="block font-medium">Service</label>
                    <select name="service" className="w-full border p-2 rounded" required>
                        <option value="">Select a service</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Tire Replacement">Tire Replacement</option>
                        <option value="General Inspection">General Inspection</option>
                        <option value="Brake Check">Brake Check</option>
                        <option value="Chain Adjustment">Chain Adjustment</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Customer Name</label>
                    <input name="customer" type="text" className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium">Phone</label>
                    <input name="phone" type="text" className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium">Bike Model</label>
                    <input name="bikeModel" type="text" className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium">Date & Time</label>
                    <input name="date" type="datetime-local" className="w-full border p-2 rounded" required />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create Appointment
                </button>
            </Form>
        </div>
    );
}
