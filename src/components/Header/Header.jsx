import { IoMdImages } from "react-icons/io";
import logo from "./logo.png";

function Header() {
    return (
        <div className="w-full h-14 bg-zinc-950 px-5 shrink-0">
            <div className="h-full flex justify-between items-center">
                <h1 className="text-zinc-400">
                    <a
                        className="hover:no-underline hover:text-zinc-300 transition-all"
                        href="/"
                    >
                        Avadakedavra chat
                    </a>
                </h1>
                <div></div>
                <div></div>
                <button
                    // onClick={() => setImage((prev) => !prev)}
                    className=""
                >
                    <IoMdImages className="text-2xl text-zinc-400 hover:text-zinc-100" />
                </button>
                <img className="h-8" src={logo} />
            </div>
        </div>
    );
}

export default Header;
