import { Form } from "@remix-run/react";
import {useState} from "react";
import {Appointment} from "@prisma/client";
import Select from 'react-select';

interface AppointmentModalProps {
    appointment: Appointment;
    onSave: (updatedAppointment: Appointment) => void;
    onClose: () => void;
    services: { id: number; name: string }[];
}

const EditAppointmentModal: React.FC<AppointmentModalProps> = ({ appointment, onSave, onClose, services }) => {
    const [customer, setCustomer] = useState(appointment?.customer || '');
    const [phone, setPhone] = useState(appointment?.phone || '');
    const [bikeModel, setBikeModel] = useState(appointment?.bikeModel || '');
    const [service, setService] = useState<number>(appointment?.serviceId || 0);
    const [status, setStatus] = useState(appointment?.status || 'Scheduled');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (appointment) {
            const updatedAppointment = {
                ...appointment,
                customer,
                phone,
                bikeModel,
                serviceId: service, // important!
                status
            };
            onSave(updatedAppointment); // Call onSave with the updated appointment
        }
    };

    const serviceOptions = services.map((s) => ({
        value: s.id,
        label: s.name
    }));


    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl mb-4">Edit Appointment</h2>

                <Form method="post" onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="id" value={appointment?.id} />

                    <div className="mb-2">
                        <label>Customer</label>
                        <input
                            type="text"
                            name="customer"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-2">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-2">
                        <label>Bike Model</label>
                        <input
                            type="text"
                            name="bikeModel"
                            value={bikeModel}
                            onChange={(e) => setBikeModel(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-2">
                        <label>Service</label>
                        <Select
                            name="serviceId"
                            value={serviceOptions.find(option => option.value === appointment?.serviceId)}
                            onChange={(selectedOption) => setService(selectedOption?.value || '')}
                            options={serviceOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <div className="mb-2">
                        <label>Status</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Postponed">Postponed</option>
                            <option value="Deleted">Deleted</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            Save
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default EditAppointmentModal;
