import { createSlice } from "@reduxjs/toolkit"

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        favbooks: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.favbooks.push(action.payload)
            const user = JSON.parse(localStorage.getItem("user")) || null;
            const cusId = user?.id
            const existingFav = JSON.parse(localStorage.getItem(`fav-${cusId}`)) || '{}'

            console.log(existingFav);
            debugger
            // localStorage.setItem(
            //     `fav-${cusId}`,
            //     JSON.stringify({ ...JSON.parse(existingFav), ...action.payload })
            // );
        },
        removeFavorite: (state, action) => {

            const isExist = state.favbooks.some((book) => book.id == action.payload.id)
            state.favbooks = isExist ? state.favbooks.filter((book) => {
                console.log("book", book.id);
                console.log("payload-id", action.payload.id);

                return (
                    book.id !== action.payload.id
                )
            }
            ) : action.payload.book.filter(book => book.key !== action.payload.id)
        }
    }
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer