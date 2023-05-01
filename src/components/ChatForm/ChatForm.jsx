import { useState, useRef, useEffect } from "react";
import { openAI, RequestBody } from "../Api/chatGptApi";
import { v4 as uuidv4 } from "uuid";
import { GiSettingsKnobs } from "react-icons/gi";
import ChatResponse from "../ChatResponse/ChatResponse";
import ChatTextarea from "../ChatTextarea/ChatTextarea";

const systemMessage = {
    role: "system",
    content: "You are a helpful assistant",
};

const CreateChat = () => {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [variability, setVariability] = useState(1);
    const [temperature, setTemperature] = useState(0.7);
    const [penalty, setPenalty] = useState(0);
    const [tokens, setTokens] = useState(2048);
    const [chatResponses, setChatResponses] = useState([]);
    const [chatSettings, setChatSettings] = useState(true);

    const scrolled = useRef(null);

    const onResponse = (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    };

    const setDefaultValues = () => {
        setChecked(false);
        setVariability(variability);
        setTemperature(temperature);
        setPenalty(penalty);
        setTokens(tokens);
    };

    const clearChat = () => {
        setChatResponses([]);
        setChecked(false);
        setVariability(1);
        setTemperature(0.7);
        setPenalty(0);
        setTokens(2048);
    };

    const sendMessage = async (prompt) => {
        try {
            setLoading(true);

            const newQuestion = [
                ...chatResponses.map((el) => el.message),
                prompt,
            ].join("\n");

            const response = await openAI(
                new RequestBody(
                    newQuestion,
                    checked ? [systemMessage] : [],
                    variability,
                    temperature,
                    penalty,
                    tokens
                )
            );

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

    useEffect(() => {
        scrolled.current.addEventListener("DOMNodeInserted", onResponse);
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <form className="w-full">
                <ChatTextarea onSubmit={sendMessage} />

                {chatSettings && (
                    <div className="flex justify-center gap-x-10 items-center px-3 md:flex-col md:gap-y-5 md:px-0">
                        <div className="flex justify-center items-center md:self-start">
                            <input
                                className="relative float-left h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] 
                                border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none 
                                before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full 
                                before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] 
                                before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] 
                                checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block 
                                checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 
                                checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 
                                checked:after:border-solid checked:after:border-white checked:after:bg-transparent 
                                checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] 
                                hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none 
                                focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] 
                                focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
                                focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] 
                                focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] 
                                checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] 
                                checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px 
                                checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] 
                                checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] 
                                checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid 
                                checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 
                                dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] 
                                dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                title="Check once for chat mode"
                            />
                            <p className="hidden text-xs text-zinc-400 pl-4 md:block">
                                Mark once to start a chat conversation
                            </p>
                        </div>
                        <div className="w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6">
                            <div className="w-full flex flex-col justify-center items-center gap-y-2">
                                <div className="w-full flex justify-between items-center text-xs text-zinc-400">
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
                                    onChange={(e) =>
                                        setVariability(+e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-y-2">
                                <div className="w-full flex justify-between items-center text-xs text-zinc-400">
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
                                    onChange={(e) =>
                                        setTemperature(+e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6">
                            <div className="w-full flex flex-col justify-center items-center gap-y-2">
                                <div className="w-full flex justify-between items-center text-xs text-zinc-400">
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
                                    onChange={(e) =>
                                        setPenalty(+e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-y-2">
                                <div className="w-full flex justify-between items-center text-xs text-zinc-400">
                                    <p>100</p>
                                    <p>500</p>
                                    <p>900</p>
                                    <p>1300</p>
                                    <p>1700</p>
                                    <p>2100</p>
                                </div>
                                <input
                                    className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                                    type="range"
                                    step="400"
                                    min="100"
                                    max="2100"
                                    value={tokens}
                                    onChange={(e) => setTokens(+e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="invisible">Open settings</div>
                <div className="h-8 flex justify-start items-center gap-x-10">
                    <a
                        href="#toggle-animation"
                        uk-icon="icon: info; ratio: 1"
                        uk-toggle="target: #toggle-animation; animation: uk-animation-fade"
                        className="stroke-zinc-600 pt-1"
                    ></a>
                    <div
                        id="toggle-animation"
                        uk-drop="mode: click"
                        className="uk-card uk-card-default uk-card-body uk-width-large uk-margin-small
                    bg-zinc-700 rounded-md text-zinc-400 text-sm font-extralight p-4 border border-zinc-900"
                    >
                        <p className="italic">
                            The <span className="font-bold">prompt</span> can be
                            entered in any language.&nbsp;
                            <span className="font-bold">Clear chat</span> every
                            time when you change conversation topic.
                        </p>
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
                            more deterministic (from 0.2 to 2, step 0.1)
                        </p>
                        <p>
                            <span className="text-zinc-900 font-bold">
                                Scale-3.
                            </span>
                            &nbsp; Penalty: decreased likelihood of repeated
                            responses in chat mode (from 0 to 1, step 0.1)
                        </p>
                        <p>
                            <span className="text-zinc-900 font-bold">
                                Scale-4.
                            </span>
                            &nbsp; Answer length: the higher, the more complete
                            the answer (from 100 tokens to 2100, step 400
                            tokens)
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setChatSettings((prev) => !prev);
                        }}
                        className="2xl:hidden xl:hidden lg:hidden md:block sm:block"
                    >
                        <GiSettingsKnobs className="text-2xl text-zinc-300 focus:text-zinc-500" />
                    </button>
                    <button
                        className="text-md text-zinc-500 shadow-[0_0_15px_rgba(0,0,0,0.50)]
                        bg-zinc-700 rounded-md px-2 py-0.5 hover:text-zinc-400 hover:ring-1 transition-all"
                        title="Clear chat history and reset settings"
                        type="button"
                        onClick={() => {
                            clearChat();
                        }}
                    >
                        Clear chat
                    </button>
                    {loading && (
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                        >
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                    )}
                </div>
            </form>

            <div ref={scrolled} className="w-full overflow-y-auto mt-4">
                {chatResponses.length > 0 &&
                    chatResponses.map((answer) => (
                        <ChatResponse key={answer.key} response={answer} />
                    ))}
            </div>
        </div>
    );
};

export default CreateChat;
