import axios from "axios";
const BASE_URL = "https://openlibrary.org/search.json"

export const searchApi = async ({ query, page }) => {
    try {
        const params = {
            q: query,
            page,
            limit: 10
        }
        const res = await axios.get(`${BASE_URL}`, { params })
        return res.data;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
}