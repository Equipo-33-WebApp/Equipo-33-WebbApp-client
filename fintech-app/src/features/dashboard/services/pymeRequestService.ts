import { API_URL } from "@/constants/api";
import { getToken } from "@/utils/getToken";

export const fetchPymeRequests = async (status?: string, page?: number, limit?: number) => {
    const token = getToken();
    if (!token) {
        throw new Error("No token found");
    }

    const url = new URL(`${API_URL}/pymes`);
    const params = new URLSearchParams();

    if (status) {
        params.append('status', status);
    }
    if (page) {
        params.append('page', String(page));
    }
    if (limit) {
        params.append('pageSize', String(limit));
    }
    url.search = params.toString();

    const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch pyme applications");
    }

    return res.json();
};
