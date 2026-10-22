import { useEffect, useState } from "react"
import { searchApi } from "../api/searchAPI.js"
import { useSearchParams } from "react-router";
import BooksCard from "./BooksCard.js";
import { useSelector } from "react-redux";


const Home = ({ handleSetCard, setLoading, bookData, loading }: { handleSetCard: (data: any[]) => void; setLoading: (loading: boolean) => void; bookData: any[]; loading: boolean }) => {
    const [searchBook, setSearchBook] = useState("")
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('query') || '';
    const { favbooks } = useSelector((state) => state.favorites)

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
        const searchBookApi = async (query: string, page: number) => {
            try {
                const res = await searchApi({ query, page })
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

        if (useDebounceSearch.length > 3 && page > 0) {
            searchBookApi(useDebounceSearch, page)
            setLoading(true)
        }

        if ((useDebounceSearch.length < 3 && useDebounceSearch.length > 0) || (searchQuery.length == 0 && useDebounceSearch.length == 0)) {
            handleSetCard([])
            setTotalResults(0)
        }

    }, [useDebounceSearch, page])

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
                <div className="flex flex-row items-center gap-2 mt-2 justify-between w-full">
                    <span className="font-bold">searching for: {searchBook}</span>
                    <div>
                        <span>current page : {page}</span>
                        <button className="ml-2 p-1 rounded border-2" disabled={page <= 0} onClick={() => setPage((prev) => prev - 1)}>Back Page</button>
                        <button className="ml-2 p-1 rounded border-2" onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
                    </div>
                </div>
            </div>

            <BooksCard data={bookData} loading={loading} isFavorite={(id) => favbooks.some((book) => book.id === id)} />
        </>
    )
}

export default Home