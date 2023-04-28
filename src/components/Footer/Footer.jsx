import { useState } from "react";
import Modal from "../Modal/Modal";

function Footer() {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-20 flex justify-between items-center shrink-0 bg-zinc-950 px-5">
            <div>
                <span className="text-zinc-600 text-xs">© L.Shirokov</span>
                &nbsp;
                <span className="text-zinc-600 text-xs">
                    {new Date().getFullYear()}
                </span>
            </div>
            <button
                onClick={() => setOpen(true)}
                className="text-sm text-zinc-500 hover:text-zinc-400 transition-all"
            >
                How it works
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <p>
                    The app uses the ChatGPT Language Model OpenAI API to
                    generate text. The API key for authorization is stored on
                    the server. The language model has limited knowledge about
                    the world and events after 2021. <br />
                    Based on the prompt entered by the user, the model generates
                    a text completion (text completion) that tries to match the
                    context that was given to it by the user. By default, the
                    app is set to use the language model immediately in both
                    single question and chat mode. However, it is recommended
                    that you read the information on fine-tuning the model using
                    the four scale ranges provided by clicking the{" "}
                    <span className="text-md text-red-500">i</span> icon on the
                    main page. <br />
                    For the model to work in chat mode, it is recommended to
                    check the checkbox once before starting communication. It is
                    also recommended to use the maximum value of the tokens
                    responsible for the length of the answer (scale-4) in order
                    to get the most complete answer. Scale-2 is the most
                    interesting, allowing you to adjust the
                    &quot;creativity&quot; of the model, the higher the value,
                    the less deterministic the answer will be. Increasing the
                    values in scale-1 asks the model to look for an answer from
                    different domains. <br />
                    It is very important to correctly compose the prompt. It is
                    necessary to clearly describe what you want, give clear
                    instructions. According to the Content Policy and Terms, the
                    user has full ownership of the results they create with
                    ChatGPT.
                </p>
            </Modal>
        </div>
    );
}

export default Footer;
