import { IoMdImages } from "react-icons/io";
import { HiChatAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function Header() {
    return (
        <div className="w-full h-14 bg-zinc-950 px-5 shrink-0">
            <div className="h-full flex justify-between items-center">
                <div className="flex justify-center items-center gap-5">
                    <img className="h-8" src={logo} />
                    <h1 className="text-zinc-300">
                        <Link
                            to="/ai"
                            className="hover:no-underline hover:text-zinc-400 transition-all"
                        >
                            Avadakedavra chat
                        </Link>
                    </h1>
                </div>
                <div className="flex justify-center gap-x-7">
                    <Link to="/ai">
                        <HiChatAlt2 className="text-2xl text-zinc-400 hover:text-zinc-100" />
                    </Link>
                    <Link to="/image">
                        <IoMdImages className="text-2xl text-zinc-400 hover:text-zinc-100" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
