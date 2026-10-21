import BooksCard from "./BooksCard"

const FavoriteBooks = () => {
    return (
        <div>
            <BooksCard data={[]} loading={false} isFavorite={true} />
        </div>
    )
}

export default FavoriteBooks