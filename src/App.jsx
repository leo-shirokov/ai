import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatForm from "./components/ChatForm/ChatForm";

function App() {
    return (
        <div className="w-full h-screen bg-zinc-900 flex flex-col overflow-auto">
            <Header />
            <div className="grow w-3/4 mx-auto bg-zinc-900 px-4 py-6 md:w-11/12">
                <ChatForm />
            </div>
            <Footer />
        </div>
    );
}

export default App;
