import { addFavorite, removeFavorite } from "../redux/slice/favorateSlice"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router";

const BooksCard = ({ data, loading, isFavoritePage, isFavorite }: { data: any[]; loading: boolean; isFavoritePage: boolean }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { isLoggedIn } = useSelector<RootState>((state: any) => state.login);
    const naviagate = useNavigate();
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    const handleRemoveFav = (book, id) => {
        dispatch(removeFavorite(book, id))
    }

    const handleAddFav = (fav) => {
        if (!isLoggedIn) {
            naviagate('/login')
        }
        const { title, author_name, cover_i, first_publish_year, key, id } = fav;
        const favObj = {
            id: key ?? id,
            title,
            author_name,
            cover_i,
            first_publish_year,
            createAt: new Date().toISOString()
        }
        dispatch(addFavorite(favObj))
    }

    return (
        <>
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
                {data.length > 0 ? (data.map((book: any) => {
                    const id = book.key ?? book.id;
                    const favStatus = isFavorite?.(id) || isFavoritePage;
                    console.log("favStatus", favStatus)
                    return (
                        <div key={book.key} className="card border-2 rounded p-4 shadow-md">
                            <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/300x400/cccccc/969696/?text=No+Image"} alt={book.title} className="w-full h-auto" />
                            <div className="card-body">
                                <h2>{book.title}</h2>
                                <p>Author: {book.author_name?.map((name: string) => <span key={name}>{name}</span>)}</p>
                                <p>First Published: {book.first_publish_year}</p>
                            </div>
                            <button className="button-secondary mt-2" onClick={() => !favStatus ? handleAddFav(book) : handleRemoveFav(book, id)}> {favStatus ? '★ Remove favourite' : '☆ Add to favourites'}</button>
                            {/* <div> Books</div> */}
                        </div>
                    )

                })) : isFavoritePage ? "You haven't added any favorite books yet." : "Search for books to see results."}
            </div>

        </>

    )
}



export default BooksCard;