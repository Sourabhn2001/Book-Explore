// interface Book {
//     title: string;
//     author_name?: string[];
//     first_publish_year?: number;
// }

const BooksCard = ({ data, loading, isFavorite }: { data: any[]; loading: boolean; isFavorite: boolean }) => {

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    console.log("data", data)
    return (
        <>
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
                {data.length > 0 ? (data.map((book: any) => (

                    <div key={book.key} className="card border-2 rounded p-4 shadow-md">
                        <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://dummyimage.com/300x400/cccccc/969696/?text=No+Image"} alt={book.title} className="w-full h-auto" />
                        <div className="card-body">
                            <h2>{book.title}</h2>
                            <p>Author: {book.author_name?.map((name: string) => <span key={name}>{name}</span>)}</p>
                            <p>First Published: {book.first_publish_year}</p>
                        </div>
                        {/* <div> Books</div> */}
                    </div>
                ))) : isFavorite ? "You haven't added any favorite books yet." : "Search for books to see results."}
            </div>

        </>

    )
}



export default BooksCard;