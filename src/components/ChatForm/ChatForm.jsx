import { useState } from "react";
import { openChatGpt } from "../../../chatGptApi";
import { BiSend } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import ChatResponse from "../ChatResponse/ChatResponse";

window.onload = function () {
    document.getElementById("prompt-input").focus();
};

const systemMessage = {
    role: "system",
    content: "You are a helpful assistant",
};

const CreateChat = () => {
    const [prompt, setPrompt] = useState("");
    const [checked, setChecked] = useState(false);
    const [variability, setVariability] = useState(1);
    const [temperature, setTemperature] = useState(0.7);
    const [penalty, setPenalty] = useState(0);
    const [tokens, setTokens] = useState(Infinity);

    const [chatResponses, setChatResponses] = useState([]);

    const handleKeyDown = (e) => {
        if (e.code !== "Enter") return;
        sendMessage(e);
    };
    const sendMessage = async (e) => {
        e.preventDefault();

        const newQuestion = [
            ...chatResponses.map((el) => el.message),
            prompt,
        ].join("\n");

        const response = await openChatGpt({
            prompt: newQuestion,
            systemMessage: checked ? [systemMessage] : [],
            variability,
            temperature,
            penalty,
            tokens,
        });
        setPrompt("");
        setVariability(1);
        setTemperature(0.7);
        setPenalty(0);
        setChecked(false);
        setChatResponses((prev) => [
            ...prev,
            {
                key: uuidv4(),
                message: response,
            },
        ]);
    };

    return (
        <>
            <form
                className="w-full"
                onKeyDown={handleKeyDown}
                onSubmit={sendMessage}
            >
                <div
                    className="flex flex-col w-full relative border-transparent bg-zinc-700 text-md font-normal 
                    rounded-md shadow-[0_0_15px_rgba(0,0,0,0.50)] ring-1 ring-zinc-900 text-zinc-300 mb-8"
                >
                    <TextareaAutosize
                        className="w-full resize-none border-0 bg-transparent py-2 pl-5 pr-14 
                        caret-zinc-400 placeholder-zinc-500 focus:outline-none"
                        id="prompt-input"
                        type="text"
                        minRows="1"
                        maxRows="10"
                        value={prompt}
                        placeholder="Enter the text"
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        className="absolute p-1 text-zinc-400 bottom-1.5 right-1 
                        hover:text-zinc-900 transition-all md:right-2 md:bottom-2.5"
                        type="submit"
                    >
                        <BiSend />
                    </button>
                </div>

                <div className="flex justify-center gap-x-10 items-center md:gap-x-5 md:flex-col">
                    <div className="flex justify-center items-center gap-x-10 shrink-0">
                        <div>
                            <input
                                className="uk-checkbox shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                            />
                        </div>
                        <input
                            className="uk-input h-7 bg-zinc-700 rounded-md border-transparent shadow-[0_0_15px_rgba(0,0,0,0.50)] focus:bg-zinc-700"
                            type="number"
                            inputMode="decimal"
                            pattern="\d*"
                            min="1"
                            max="5"
                            value={variability}
                            placeholder="0"
                            onChange={(e) => setVariability(+e.target.value)}
                        />
                        <input
                            className="uk-input h-7 bg-zinc-700 rounded-md border-transparent shadow-[0_0_15px_rgba(0,0,0,0.50)] focus:bg-zinc-700"
                            type="number"
                            inputMode="decimal"
                            pattern="\d*"
                            step="0.1"
                            min="0.1"
                            max="1.9"
                            value={temperature}
                            placeholder="0"
                            onChange={(e) => setTemperature(+e.target.value)}
                        />
                        <input
                            className="uk-input h-7 bg-zinc-700 rounded-md border-transparent shadow-[0_0_15px_rgba(0,0,0,0.50)] focus:bg-zinc-700"
                            type="number"
                            inputMode="decimal"
                            pattern="\d*"
                            step="0.1"
                            min="0"
                            max="1"
                            value={penalty}
                            placeholder="0"
                            onChange={(e) => setPenalty(+e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="uk-range w-72 shadow-[0_0_15px_rgba(0,0,0,0.50)] md:w-60 md:mt-8"
                            type="range"
                            step="380"
                            min="148"
                            max="2048"
                            value={tokens}
                            placeholder="0"
                            onChange={(e) => setTokens(+e.target.value)}
                        />
                    </div>
                </div>
                <a
                    href="#toggle-animation"
                    uk-icon="icon: info; ratio: 1"
                    className="stroke-zinc-700"
                    uk-toggle="target: #toggle-animation; animation: uk-animation-fade"
                ></a>
                <div
                    id="toggle-animation"
                    uk-drop="mode: click"
                    className="uk-card uk-card-default uk-card-body uk-width-large uk-margin-small
                    bg-zinc-700 rounded-md text-zinc-400"
                >
                    - Checkbox: enable for chat mode
                    <br />
                    - Number of answer options: variability, from 1 to 5<br />
                    - Variety: higher is more creative, lower is more
                    deterministic (from 0.1 to 1.9)
                    <br />
                    - Decreased likelihood of repeated responses in chat mode,
                    from 0 to 1<br />- Response length scale of six positions,
                    the higher, the more complete the answer
                </div>
            </form>
            {chatResponses.length > 0 &&
                chatResponses.map((answer) => (
                    <ChatResponse key={answer.key} response={answer} />
                ))}
        </>
    );
};

export default CreateChat;
