import logo from "./logo.jpg";

function Header() {
    return (
        <div className="w-full h-14 bg-zinc-950 px-5 shrink-0">
            <div className="h-full flex justify-between items-center">
                <h1 className="text-zinc-200">
                    <a
                        className="hover:no-underline hover:text-zinc-500 transition-all"
                        href="/"
                    >
                        Avadakedavra Chat
                    </a>
                </h1>
                <img className="h-10 rounded-full" src={logo} />
            </div>
        </div>
    );
}

export default Header;
