import {useCallback, useState} from "react";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import {ActionFunction, json} from "@remix-run/node";
import { Calendar, dateFnsLocalizer, type Event as CalendarEvent } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import itIT from "date-fns/locale/it";
import EditAppointmentModal from "~/components/EditAppointmentModal";
import { Appointment } from "@prisma/client";
import NewAppointmentModal from "~/components/NewAppointmentModal";

const locales = {
    "it-IT": itIT,
};


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const customer = formData.get("customer")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const bikeModel = formData.get("bikeModel")?.toString() || "";
    const date = new Date(formData.get("date")?.toString() || "");

    const serviceId = Number(formData.get("serviceId"));

    if (!customer || !phone || !bikeModel || !serviceId || isNaN(date.getTime())) {
        return json({ error: "All fields are required." }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
        data: {
            customer,
            phone,
            bikeModel,
            date,
            serviceId,
        },
        include: { service: true },
    });

    return json({ success: true, appointment });
};

const statusColors: Record<string, string> = {
    Scheduled: "#3B82F6", // blue
    Completed: "#10B981", // green
    Postponed: "#F59E0B", // amber
    Deleted: "#EF4444",   // red
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const loader = async () => {
    const appointments = await prisma.appointment.findMany();
    const services = await prisma.service.findMany();
    return json({ appointments, services });};

export default function CalendarPage() {
    const { appointments: initialAppointments, services } = useLoaderData<{
        appointments: Appointment[];
        services: { id: number; name: string }[];
    }>();

    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [showModal, setShowEditModal] = useState(false);
    const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    // Convert to calendar format
    const events: CalendarEvent[] = appointments.map((a) => ({
        id: a.id,
        title: a.customer,
        start: new Date(a.date),
        end: new Date(a.date),
        allDay: false,
        status: a.status,
    }));

    function handleEdit(appointment: Appointment) {
        setEditingAppointment(appointment);
        setShowEditModal(true);

    }

    // Handle save (after edit or creation) to update the state
    const handleSave = (updatedAppointment: Appointment) => {
        // Update appointment locally after edit
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === updatedAppointment.id ? updatedAppointment : appointment
            )
        );
        setShowEditModal(false);
    };

    const handleClose = useCallback(() => {
        setShowNewAppointmentModal(false);
        setShowEditModal(false);
    }, []);

    const handleCreated = useCallback((newAppt) => {
        setAppointments((prev) => [...prev, newAppt]);
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Motorbike Workshop Calendar</h1>
                <button
                    onClick={() => setShowNewAppointmentModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + New Appointment
                </button>
            </div>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
                eventPropGetter={(event) => {
                    const backgroundColor = statusColors[event.status] || "#6B7280";
                    return {
                        style: {
                            backgroundColor,
                            color: "white",
                            borderRadius: "4px",
                            border: "none",
                        },
                    };
                }}
                onSelectEvent={(event) => {
                    // Find the appointment data by ID and pass it to the modal
                    const foundAppointment = appointments.find((a) => a.id === event.id);
                    if (foundAppointment) {
                        handleEdit(foundAppointment);
                    }
                }}
            />

            {showModal && (
                <EditAppointmentModal
                    appointment={editingAppointment}
                    onSave={handleSave}
                    onClose={handleClose}
                    services={services}
                />

            )}

            {showNewAppointmentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <NewAppointmentModal
                        onClose={handleClose}
                        onCreated={handleCreated}
                        services={services}
                    />
                </div>
            )}
        </div>
    );
}
