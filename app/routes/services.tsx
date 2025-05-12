import {Link, useFetcher, useLoaderData} from "@remix-run/react";
import {ActionFunction, json} from "@remix-run/node";
import {prisma} from "~/db.server";
import {useCallback, useEffect, useState} from "react";
import {Service} from "@prisma/client";
import NewEntityModal from "~/components/NewEntityModal";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const _action = formData.get("_action");
    const entityType = formData.get("entityType"); // Get the entityType from the form

    console.log("FormData keys:", Array.from(formData.keys()));
    console.log("Full FormData:", Object.fromEntries(formData.entries()));


    if (_action === "delete") {
        const entityId = parseInt(formData.get(`${entityType}Id`)?.toString() || "", 10);

        // Check for associated appointments, bike makers, or services
        const related = await prisma[entityType].findFirst({
            where: { id: entityId },
        });

        if (related) {
            return json({ error: `Cannot delete: ${entityType} is in use.` }, { status: 400 });
        }

        await prisma[entityType].delete({ where: { id: entityId } });
        return json({ success: true, deletedId: entityId });
    }

    // Default: creation
    const entity_name = formData.get(`name`)?.toString() || "";
    console.log(entityType);
    if (!entity_name) {
        return json({ error: `All fields are required. ${entity_name}` }, { status: 400 });
    }

    const entity = await prisma[entityType].create({
        data: { name: entity_name },
    });

    return json({ success: true, [entityType.toLowerCase()]: entity });
};


// Dummy loader for demonstration – replace with your DB query
export const loader = async () => {
    const services = await prisma.service.findMany();
    return json({ services });};


export default function ServicesPage() {
    const { services: initialServices } = useLoaderData<typeof loader>();
    const [services, setServices] = useState<Service[]>(initialServices);
    const [showNewServiceModal, setShowNewServiceModal] = useState(false);
    const fetcher = useFetcher();

    const handleClose = () => {
        setShowNewServiceModal(false);
    };

    const handleCreated = (newService) => {
        if (newService) {
            setServices((prev) => [...prev, newService]); // Immediately update state
        }
    };

    const handleDelete = (id: number) => {
        const form = new FormData();
        form.append("_action", "delete");
        form.append("serviceId", id.toString());
        fetcher.submit(form, { method: "post" });
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowNewServiceModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add Service
                    </button>
                </div>
                <Link to="/calendar">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Go back
                    </button>
                </Link>
            </div>

            <table className="min-w-full bg-white border border-gray-200 shadow rounded">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border-b">ID</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{service.id}</td>
                        <td className="px-4 py-2 border-b">{service.name}</td>

                        <td className="px-4 py-2 border-b">
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showNewServiceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <NewEntityModal
                        onClose={handleClose}
                        onCreated={handleCreated}
                        entityType="Service"
                    />
                </div>
            )}
        </div>
    );
}