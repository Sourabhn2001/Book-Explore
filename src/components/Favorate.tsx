import { useSelector } from "react-redux"
import BooksCard from "./BooksCard"

const FavoriteBooks = () => {
    const { favbooks } = useSelector((state) => state.favorites);
    return (
        <div>
            <BooksCard data={favbooks} loading={false} isFavoritePage={true} />
        </div>
    )
}

export default FavoriteBooks