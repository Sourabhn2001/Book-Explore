import { useEffect, useState } from "react"
import { searchApi } from "../api/searchAPI.js"
import { useSearchParams } from "react-router";
import BooksCard from "./BooksCard.js";


const Home = ({ handleSetCard, setLoading, bookData, loading }: { handleSetCard: (data: any[]) => void; setLoading: (loading: boolean) => void; bookData: any[]; loading: boolean }) => {
    const [searchBook, setSearchBook] = useState("")
    const [totalResults, setTotalResults] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('query') || '';

    const [useDebounceSearch, setUseDebounceSearch] = useState("")

    useEffect(() => {

        const timer = setTimeout(() => {
            setUseDebounceSearch(searchBook)
        }, 200);

        return () => clearTimeout(timer)

    }, [searchBook])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchParams((prev) => {
            if (value) {
                prev.set('query', value);
            } else {
                prev.delete('query');
            }
            return prev;
        });
        // setSearchParams({ query: value });
        setSearchBook(value)
    }

    useEffect(() => {
        if (searchQuery) {
            setSearchBook(searchQuery);
        } else {
            setSearchBook("");
            setSearchParams((prev) => {
                prev.delete('query');
                return prev;
            });
        }

    }, [searchQuery]);

    useEffect(() => {
        const searchBookApi = async (query: string) => {
            try {
                const res = await searchApi(query)
                const data = res.docs;
                handleSetCard(data)
                setTotalResults(data.length)
                console.log("searchBook", res.docs)
            } catch (error) {
                console.log("error", error)
                handleSetCard([])
                setTotalResults(0)
            } finally {
                setLoading(false)
            }
        }

        if (useDebounceSearch.length > 3) {
            searchBookApi(useDebounceSearch)
            setLoading(true)
        }

        if (useDebounceSearch.length < 3 && useDebounceSearch.length > 0) {
            handleSetCard([])
            setTotalResults(0)
        }

    }, [useDebounceSearch])

    const handleReset = () => {
        setSearchBook("")
        handleSetCard([])
        setTotalResults(0);
    }


    return (
        <>
            <div className="container mx-auto p-4 flex flex-col items-center justify-center">
                <h1>Book Explorer</h1>
                <div className="flex flex-row items-center gap-2">
                    <input autoFocus className="form-control rounded border-2 p-2 w-100" type="text" placeholder="Search for books..." onChange={handleSearch} value={searchBook} />
                    <button className="btn btn-primary ml-2 p-2 rounded border-2" onClick={handleReset}>Clear</button>
                    <h2> Results:{totalResults}</h2>
                </div>
            </div>

            <BooksCard data={bookData} loading={loading} isFavorite={false} />
        </>
    )
}

export default Home