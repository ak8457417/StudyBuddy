import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import {BrowserRouter} from "react-router-dom";
import FinContextProvider from "./context/FinContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <FinContextProvider>
            <App />
        </FinContextProvider>
    </BrowserRouter>,
)

