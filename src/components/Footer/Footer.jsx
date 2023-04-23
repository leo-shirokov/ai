function Footer() {
    return (
        <div className="w-full h-20 flex justify-start items-center shrink-0 bg-zinc-950 px-5">
            <p className="text-zinc-600 text-xs">© L.Shirokov</p>&nbsp;
            <span className="text-zinc-600 text-xs">
                {new Date().getFullYear()}
            </span>
        </div>
    );
}

export default Footer;
