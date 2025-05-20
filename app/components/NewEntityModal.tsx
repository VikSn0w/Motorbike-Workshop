import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { z } from "zod";

const entityKeyMap = {
    BikeMaker: "BikeMaker",
    Service: "Service",
};

const entitySchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export default function NewEntityModal({ onClose, onCreated, entityType }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const error = fetcher.data?.error;
    const entityKey = entityKeyMap[entityType];
    const successMessage = fetcher.data?.success && fetcher.data?.[entityKey];

    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        if (successMessage) {
            onCreated(successMessage);
            onClose();
        }
    }, [fetcher.data, onClose, onCreated, successMessage]);

    function handleSubmit(e) {
        setFormError(null);
        const form = e.target;
        const formData = {
            name: form.name.value,
        };
        const result = entitySchema.safeParse(formData);
        if (!result.success) {
            e.preventDefault();
            setFormError(result.error.errors[0].message);
        }
    }

    return (
        <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">New {entityType}</h2>
            {formError && <div className="text-red-600 mb-2">{formError}</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <fetcher.Form method="post" className="space-y-4" onSubmit={handleSubmit}>
                <input type="hidden" name="entityType" value={entityType} />
                <div>
                    <label className="block font-medium">{entityType} Name</label>
                    <input
                        name="name"
                        type="text"
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {isSubmitting ? "Saving..." : "Create"}
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}