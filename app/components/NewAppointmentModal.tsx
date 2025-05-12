import { useFetcher } from "@remix-run/react";
import {useEffect, useState} from "react";
import Select from "react-select";

export default function NewAppointmentModal({ onClose, onCreated, services, bikeMakers }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const error = fetcher.data?.error;
    const [serviceId, setServiceId] = useState(null);
    const [bikeMakerId, setBikeMakerId] = useState(null);

    useEffect(() => {
        if (fetcher.data?.success) {
            onCreated(fetcher.data.appointment);
            onClose();
        }
    }, [fetcher.data, onClose, onCreated]);


    const serviceOptions = services.map((s) => ({
        value: s.id,
        label: s.name
    }));

    const bikeMakerOptions = bikeMakers.map((s) => ({
        value: s.id,
        label: s.name
    }));


    return (
        <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">New Appointment</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <fetcher.Form method="post" className="space-y-4">
                <div>
                    <label className="block font-medium">Service</label>

                    <Select
                        name="serviceId"
                        value={serviceOptions.find(opt => opt.value === serviceId)}
                        onChange={(selected) => setServiceId(selected?.value)}
                        options={serviceOptions}
                        placeholder="Select a service"
                    />
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
                    <label className="block font-medium">Bike Maker</label>

                    <Select
                        name="bikeMakerId"
                        value={bikeMakerOptions.find(opt => opt.value === bikeMakerId)}
                        onChange={(selected) => setBikeMakerId(selected?.value)}
                        options={bikeMakerOptions}
                        placeholder="Select a bike maker"
                    />
                </div>
                <div>
                    <label className="block font-medium">Bike Model</label>
                    <input name="bikeModel" type="text" className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium">Date & Time</label>
                    <input name="date" type="datetime-local" className="w-full border p-2 rounded" required />
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
                        {isSubmitting ? "Saving..." : "Create"}
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}
