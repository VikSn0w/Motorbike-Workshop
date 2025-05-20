import {Link, useFetcher, useLoaderData} from "@remix-run/react";
import {ActionFunction, json} from "@remix-run/node";
import {prisma} from "~/db.server";
import {useCallback, useEffect, useState} from "react";
import {BikeMaker} from "@prisma/client";
import NewEntityModal from "~/components/NewEntityModal";
import { serviceSchema } from "~/schemas/service";
import {bikeMakerSchema} from "~/schemas/bikeMaker";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const _action = formData.get("_action");
    const entityType = formData.get("entityType");

    if (_action === "delete") {
        const raw = formData.get("BikeMakerId")?.toString();
        const bikeMakerId = raw ? parseInt(raw, 10) : NaN;
        if (isNaN(bikeMakerId)) {
            return json({ error: "Invalid BikeMaker ID." }, { status: 400 });
        }

        const existing = await prisma.bikeMaker.findUnique({
            where: { id: bikeMakerId },
        });
        if (!existing) {
            return json({ error: `BikeMaker #${bikeMakerId} not found.` }, { status: 404 });
        }

        const appointmentCount = await prisma.appointment.count({
            where: { bikeMakerId },
        });

        if (appointmentCount > 0) {
            return json({
                error: `Cannot delete: BikeMaker #${bikeMakerId} is used by ${appointmentCount} appointment(s).`,
            }, { status: 400 });
        }

        await prisma.bikeMaker.delete({
            where: { id: bikeMakerId },
        });

        return json({ success: true, deletedId: bikeMakerId });
    }

    const entity_name = formData.get(`name`)?.toString() || "";
    if (entityType === "BikeMaker") {
        const result = bikeMakerSchema.safeParse({ name: entity_name });
        if (!result.success) {
            return json({ error: result.error.errors[0].message }, { status: 400 });
        }
    }

    const entity = await prisma[entityType].create({
        data: { name: entity_name },
    });

    return json({ success: true, [entityType]: entity });
};


export const loader = async () => {
    const bikeMakers = await prisma.bikeMaker.findMany();
    return json({ bikeMakers });};


export default function BikeMakersPage() {
    const { bikeMakers: initialBikeMakers } = useLoaderData<typeof loader>();
    const [bikeMakers, setBikeMakers] = useState<BikeMaker[]>(initialBikeMakers);
    const [showNewBikeMakerModal, setShowNewBikeMakerModal] = useState(false);
    const fetcher = useFetcher();

    const handleClose = () => {
        setShowNewBikeMakerModal(false);
    };

    const handleCreated = (newBikeMaker) => {
        if (newBikeMaker) {
            setBikeMakers((prev) => [...prev, newBikeMaker]); // Immediately update state
        }
    };

    const handleDelete = (id: number) => {
        const form = new FormData();
        form.append("_action", "delete");
        form.append("BikeMakerId", id.toString());
        form.append("entityType", "BikeMaker");
        fetcher.submit(form, { method: "post" });
    };

    useEffect(() => {
        const data = fetcher.data;

        if (data?.success && data.bikeMaker) {
            setBikeMakers((prev) => [...prev, data.bikeMaker]); // Add the newly created bike maker to the list
        }

        if (data?.success && data.deletedId) {
            setBikeMakers((prev) => prev.filter((bm) => bm.id !== data.deletedId)); // Remove deleted bike maker
        }

        if (data?.error) {
            alert(data.error); // Handle errors (e.g., when trying to delete a bike maker that's in use)
        }
    }, [fetcher.data]);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Manage BikeMakers</h1>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowNewBikeMakerModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add BikeMaker
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
                {bikeMakers.map((bikeMaker) => (
                    <tr key={bikeMaker.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{bikeMaker.id}</td>
                        <td className="px-4 py-2 border-b">{bikeMaker.name}</td>

                        <td className="px-4 py-2 border-b">
                            <button
                                onClick={() => handleDelete(bikeMaker.id)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showNewBikeMakerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <NewEntityModal
                        onClose={handleClose}
                        onCreated={handleCreated}
                        entityType="BikeMaker"
                    />
                </div>
            )}
        </div>
    );
}