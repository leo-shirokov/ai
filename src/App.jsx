import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatForm from "./components/ChatForm/ChatForm";
import ChatImage from "./components/ChatImage/ChatImage";

function App() {
    return (
        <div className="w-full h-screen bg-zinc-800 flex flex-col">
            <Header />
            <div className="grow w-3/4 mx-auto bg-zinc-800 px-4 py-10 md:w-11/12 overflow-auto">
                <ChatForm />
                {/* <ChatImage /> */}
            </div>
            <Footer />
        </div>
    );
}

export default App;
