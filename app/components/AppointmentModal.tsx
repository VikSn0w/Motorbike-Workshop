import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function AppointmentModal({
                                             onClose,
                                             onCompleted,
                                             services,
                                             bikeMakers,
                                             mode = "create",
                                             appointment = null,
                                         }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const error = fetcher.data?.error;

    const [serviceId, setServiceId] = useState(appointment?.serviceId || null);
    const [bikeMakerId, setBikeMakerId] = useState(appointment?.bikeMakerId || null);
    const [customer, setCustomer] = useState(appointment?.customer || "");
    const [phone, setPhone] = useState(appointment?.phone || "");
    const [bikeModel, setBikeModel] = useState(appointment?.bikeModel || "");
    const [date, setDate] = useState(appointment?.date ? new Date(appointment.date).toISOString().slice(0, 16) : "");
    const [status, setStatus] = useState(appointment?.status || "Scheduled");

    useEffect(() => {
        setServiceId(appointment?.serviceId || null);
        setBikeMakerId(appointment?.bikeMakerId || null);
        setCustomer(appointment?.customer || "");
        setPhone(appointment?.phone || "");
        setBikeModel(appointment?.bikeModel || "");
        setDate(appointment?.date ? new Date(appointment.date).toISOString().slice(0, 16) : "");
        setStatus(appointment?.status || "Scheduled");
    }, [appointment]);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data && !fetcher.data.error) {
            onCompleted(fetcher.data.updatedAppointment || fetcher.data.newAppointment);
            onClose();
        }
    }, [fetcher.state, fetcher.data, onCompleted, onClose]);

    const serviceOptions = services.map((s) => ({
        value: s.id,
        label: s.name,
    }));

    const bikeMakerOptions = bikeMakers.map((s) => ({
        value: s.id,
        label: s.name,
    }));

    return (
        <div className="fixed bg-white p-6 rounded shadow-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
                {mode === "create" ? "New Appointment" : "Edit Appointment"}
            </h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <fetcher.Form method="post" className="space-y-4" action={mode === "edit" ? `/appointments/${appointment?.id}/edit` : "/appointments/new"}>
                {mode === "edit" && (
                    <input type="hidden" name="id" value={appointment?.id} />
                )}
                <div>
                    <label className="block font-medium">Service</label>
                    <Select
                        name="serviceId"
                        value={serviceOptions.find((opt) => opt.value === serviceId)}
                        onChange={(selected) => setServiceId(selected?.value)}
                        options={serviceOptions}
                        placeholder="Select a service"
                    />
                </div>
                <div>
                    <label className="block font-medium">Customer Name</label>
                    <input
                        name="customer"
                        type="text"
                        className="w-full border p-2 rounded"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Phone</label>
                    <input
                        name="phone"
                        type="text"
                        className="w-full border p-2 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Bike Maker</label>
                    <Select
                        name="bikeMakerId"
                        value={bikeMakerOptions.find((opt) => opt.value === bikeMakerId)}
                        onChange={(selected) => setBikeMakerId(selected?.value)}
                        options={bikeMakerOptions}
                        placeholder="Select a bike maker"
                    />
                </div>
                <div>
                    <label className="block font-medium">Bike Model</label>
                    <input
                        name="bikeModel"
                        type="text"
                        className="w-full border p-2 rounded"
                        value={bikeModel}
                        onChange={(e) => setBikeModel(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Date & Time</label>
                    <input
                        name="date"
                        type="datetime-local"
                        className="w-full border p-2 rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Status</label>
                    <select
                        name="status"
                        className="w-full border p-2 rounded"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Postponed">Postponed</option>
                        <option value="Deleted">Deleted</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Update"}
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}