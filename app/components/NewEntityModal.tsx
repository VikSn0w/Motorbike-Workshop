import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

const entityKeyMap = {
    BikeMaker: "BikeMaker",
    Service: "Service",
};

export default function NewEntityModal({ onClose, onCreated, entityType }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const error = fetcher.data?.error;
    const entityKey = entityKeyMap[entityType];
    if (!entityKey) {
        console.warn(`Unsupported entityType: ${entityType}`);
    }
    const successMessage = fetcher.data?.success && fetcher.data?.[entityKey];

    useEffect(() => {
        if (successMessage) {
            onCreated(successMessage);
            onClose();
        }
    }, [fetcher.data, onClose, onCreated, successMessage]);

    return (
        <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">New {entityType}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <fetcher.Form method="post" className="space-y-4">
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
