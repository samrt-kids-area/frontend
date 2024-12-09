import { configureStore } from "@reduxjs/toolkit";


import { apiSlice } from "./services/apiSlice";
import userSlice from "./feature/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

