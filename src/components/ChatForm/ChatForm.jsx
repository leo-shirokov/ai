import { useState, useRef, useEffect } from "react";
import { openChatGpt } from "../../../chatGptApi";
import { BiSend } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import ChatResponse from "../ChatResponse/ChatResponse";
import "./loader.css";

const systemMessage = {
    role: "system",
    content: "You are a helpful assistant",
};

const CreateChat = () => {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [checked, setChecked] = useState(false);
    const [variability, setVariability] = useState(1);
    const [temperature, setTemperature] = useState(0.7);
    const [penalty, setPenalty] = useState(0);
    const [tokens, setTokens] = useState(2048);
    const [chatResponses, setChatResponses] = useState([]);

    const focus = useRef(null);
    const scrolled = useRef(null);

    const onInsertNode = (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        focus.current.blur();
    };

    const handleKeyDown = (e) => {
        if (e.code !== "Enter") return;
        sendMessage(e);
    };

    useEffect(() => {
        // if (scrolled)
        scrolled.current.addEventListener("DOMNodeInserted", onInsertNode);
        focus.current.focus();
    }, []);

    const setDefaultValues = () => {
        setVariability(variability);
        setTemperature(temperature);
        setPenalty(penalty);
        setChecked(false);
        setTokens(tokens);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setPrompt("");

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
            setDefaultValues();
            setChatResponses((prev) => [
                ...prev,
                {
                    key: uuidv4(),
                    message: response,
                },
            ]);
            setLoading(false);
        } catch (error) {
            console.log("error sending message: ", error.message);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <form
                className="w-full"
                onKeyDown={handleKeyDown}
                onSubmit={sendMessage}
            >
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
                    />
                    <button
                        className="absolute p-1 text-zinc-400 bottom-1.5 right-1 
                        hover:text-zinc-900 transition-all md:right-2 md:bottom-2.5"
                        type="submit"
                    >
                        <BiSend />
                    </button>
                </div>

                <div className="flex justify-center gap-x-10 items-center md:flex-col md:gap-y-5">
                    <div className="flex justify-center items-center md:self-start">
                        <input
                            className="uk-checkbox shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <p className="hidden text-sm pl-2 md:block">
                            Mark once to start a chat conversation
                        </p>
                    </div>
                    <div className="w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6">
                        <div className="w-full flex flex-col justify-center items-center gap-y-2">
                            <div className="w-full flex justify-between items-center text-xs">
                                <p>1</p>
                                <p>2</p>
                                <p>3</p>
                                <p>4</p>
                                <p>5</p>
                            </div>
                            <input
                                className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                                type="range"
                                min="1"
                                max="5"
                                value={variability}
                                placeholder="0"
                                onChange={(e) =>
                                    setVariability(+e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center gap-y-2">
                            <div className="w-full flex justify-between items-center text-xs">
                                <p>0.2</p>
                                <p>0.4</p>
                                <p>0.6</p>
                                <p>0.8</p>
                                <p>1</p>
                                <p>1.2</p>
                                <p>1.4</p>
                                <p>1.6</p>
                                <p>1.8</p>
                                <p>2</p>
                            </div>
                            <input
                                className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                                type="range"
                                step="0.1"
                                min="0.2"
                                max="2"
                                value={temperature}
                                placeholder="0"
                                onChange={(e) =>
                                    setTemperature(+e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6">
                        <div className="w-full flex flex-col justify-center items-center gap-y-2">
                            <div className="w-full flex justify-between items-center text-xs">
                                <p>0</p>
                                <p>0.2</p>
                                <p>0.4</p>
                                <p>0.6</p>
                                <p>0.8</p>
                                <p>1</p>
                            </div>
                            <input
                                className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                                type="range"
                                step="0.1"
                                min="0"
                                max="1"
                                value={penalty}
                                placeholder="0"
                                onChange={(e) => setPenalty(+e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center gap-y-2">
                            <div className="w-full flex justify-between items-center text-xs">
                                <p>148</p>
                                <p>528</p>
                                <p>908</p>
                                <p>1288</p>
                                <p>1668</p>
                                <p>2048</p>
                            </div>
                            <input
                                className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
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
                </div>
                <div className="invisible">Open settings</div>
                <div className="relative">
                    <a
                        href="#toggle-animation"
                        uk-icon="icon: info; ratio: 1"
                        className="stroke-zinc-600"
                        uk-toggle="target: #toggle-animation; animation: uk-animation-fade"
                    ></a>
                    <div
                        id="toggle-animation"
                        uk-drop="mode: click"
                        className="uk-card uk-card-default uk-card-body uk-width-large uk-margin-small
                    bg-zinc-700 rounded-md text-zinc-400 p-5"
                    >
                        <p className="md:hidden">
                            <span className="text-zinc-900 font-bold">
                                Checkbox:
                            </span>
                            &nbsp; check once to start chat mode conversation
                        </p>
                        <p>
                            <span className="text-zinc-900 font-bold">
                                Scale-1.
                            </span>
                            &nbsp;Variability: number of answer options (from 1
                            to 5)
                        </p>
                        <p>
                            <span className="text-zinc-900 font-bold">
                                Scale-2.
                            </span>
                            &nbsp; Variety: higher is more creative, lower is
                            more deterministic (from 0.2 to 2)
                        </p>
                        <p>
                            <span className="text-zinc-900 font-bold">
                                Scale-3.
                            </span>
                            &nbsp; Penalty: decreased likelihood of repeated
                            responses in chat mode (from 0 to 1)
                        </p>
                        <p>
                            <span className="text-zinc-900 font-bold">
                                Scale-4.
                            </span>
                            &nbsp; Response length: the higher, the more
                            complete the answer is (from 148 to 2048 tokens)
                        </p>
                    </div>
                    <button
                        className="absolute right-3 text-zinc-500 hover:text-zinc-600 transition-all"
                        type="button"
                        onClick={() => {
                            setChatResponses([]);
                        }}
                    >
                        New Chat
                    </button>
                </div>
            </form>
            <div ref={scrolled} className="overflow-auto">
                {loading && <span className="loader"></span>}
                {chatResponses.length > 0 &&
                    chatResponses.map((answer) => (
                        <ChatResponse key={answer.key} response={answer} />
                    ))}
            </div>
        </div>
    );
};

export default CreateChat;
