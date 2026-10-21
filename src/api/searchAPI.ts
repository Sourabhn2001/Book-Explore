import axios from "axios";
const BASE_URL = "https://openlibrary.org/search.json?q="

export const searchApi = async (query : string) => {
    try {
        const res = await axios.get(`${BASE_URL}${query}`)
        return res.data;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
}