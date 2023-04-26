import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatForm from "./components/ChatForm/ChatForm";
import { useState } from "react";

function App() {
    const [settings, setSettings] = useState(true);

    return (
        <div className="w-full h-screen bg-zinc-800 flex flex-col">
            <Header setSettings={setSettings} />
            <div className="grow w-3/4 mx-auto bg-zinc-800 px-4 py-10 md:w-11/12 overflow-auto">
                <ChatForm settings={settings} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
