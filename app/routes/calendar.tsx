import {useCallback, useState} from "react";
import {Link, useLoaderData} from "@remix-run/react";
import { prisma } from "~/db.server";
import {json} from "@remix-run/node";
import { Calendar, dateFnsLocalizer, type Event as CalendarEvent } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import itIT from "date-fns/locale/it";
import AppointmentModal from "~/components/AppointmentModal";
import { useRevalidator } from "@remix-run/react";

const locales = {
    "it-IT": itIT,
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
    const bikeMakers = await prisma.bikeMaker.findMany();
    return json({ appointments, services, bikeMakers});
};

export default function CalendarPage() {
    const { appointments, services, bikeMakers } = useLoaderData<LoaderData>();
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [currentAppointment, setCurrentAppointment] = useState(null);

    const events: CalendarEvent[] = appointments
        .filter((a): a is Appointment => !!a && typeof a.id !== "undefined")
        .map((a) => ({
            id: a.id,
            title: a.customer,
            start: new Date(a.date),
            end: new Date(a.date),
            allDay: false,
            status: a.status,
        }));

    const handleEdit = (appointment) => {
        setCurrentAppointment(appointment);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleCreate = () => {
        setCurrentAppointment(null);
        setModalMode("create");
        setShowModal(true);
    };

    const handleSave = () => {
        setShowModal(false);
        // No need to update appointments manually; loader will refresh after redirect
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Workshop Calendar</h1>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + New Appointment
                </button>
                <Link to="/services"><button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Manage Services
                </button></Link>

                <Link to="/bikeMakers"><button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Manage Bike Makers
                </button></Link>
            </div>

            <Calendar
                localizer={localizer}
                events={events}
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
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
                onSelectEvent={(event) => {
                    const foundAppointment = appointments.find((a) => a.id === event.id);
                    if (foundAppointment) handleEdit(foundAppointment);
                }}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <AppointmentModal
                        mode={modalMode}
                        appointment={currentAppointment}
                        onClose={handleClose}
                        onCompleted={handleSave}
                        services={services}
                        bikeMakers={bikeMakers}
                    />
                </div>
            )}
        </div>
    );
}