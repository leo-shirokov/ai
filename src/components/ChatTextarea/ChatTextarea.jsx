import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { BiSend } from "react-icons/bi";

function ChatTextarea({ onSubmit }) {
    const [prompt, setPrompt] = useState("");
    const focus = useRef(null);

    useEffect(() => {
        focus.current.focus();
    }, []);

    const onClick = () => {
        focus.current.blur();
        setPrompt("");
        onSubmit(prompt);
    };

    const handleKeyDown = (e) => {
        if (e.code !== "Enter") return;
        e.preventDefault();
        onSubmit(prompt);
    };

    return (
        <div
            className="flex flex-col w-full relative border-transparent bg-zinc-700 text-md font-normal 
                    rounded-md shadow-[0_0_15px_rgba(0,0,0,0.50)] ring-1 ring-zinc-900 text-zinc-300 mt-px mb-6 md:mt-0"
        >
            <TextareaAutosize
                className="w-full resize-none border-0 bg-transparent py-2 pl-5 pr-14 
                        caret-zinc-400 placeholder-zinc-500 focus:outline-none"
                ref={focus}
                type="text"
                minRows="1"
                maxRows="10"
                value={prompt}
                placeholder="Enter the text"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="absolute p-1 text-zinc-400 bottom-1.5 right-1 
                        hover:text-zinc-900 transition-all md:right-2 md:bottom-2.5"
                type="button"
                onClick={onClick}
            >
                <BiSend />
            </button>
        </div>
    );
}

export default ChatTextarea;
