import { Modal, initTE } from "tw-elements";
initTE({ Modal });

function Footer() {
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
                type="button"
                className="inline-block text-xs font-extralight text-zinc-500 hover:text-zinc-400"
                data-te-toggle="modal"
                data-te-target="#exampleModalCenter"
                data-te-ripple-init
                data-te-ripple-color="light"
            >
                How it works
            </button>

            <div
                data-te-modal-init
                className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalCenter"
                tabIndex="-1"
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog"
            >
                <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative flex h-[calc(100%-1rem)] w-11/12 mx-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                >
                    <div className="pointer-events-auto relative flex overflow-hidden max-h-[80%] w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 md:h-11/12">
                        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                            {/* <!--Modal title--> */}
                            <h5
                                className="text-md font-normal leading-normal text-neutral-800 dark:text-neutral-300"
                                id="exampleModalScrollableLabel"
                            >
                                How it works
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                data-te-modal-dismiss
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* <!--Modal body--> */}
                        <div className="text-zinc-400 font-extralight overflow-y-auto relative p-4">
                            <p>
                                The app uses the ChatGPT Language Model OpenAI
                                API to generate text. The API key for
                                authorization is stored on the server. The
                                language model has limited knowledge about the
                                world and events after 2021. <br />
                                Based on the prompt entered by the user, the
                                model generates a text completion (text
                                completion) that tries to match the context that
                                was given to it by the user. By default, the app
                                is set to use the language model immediately in
                                both single question and chat mode. However, it
                                is recommended that you read the information on
                                fine-tuning the model using the four scale
                                ranges provided by clicking the{" "}
                                <span className="text-md text-red-500">
                                    i
                                </span>{" "}
                                icon on the main page. <br />
                                For the model to work in chat mode, it is
                                recommended to check the checkbox once before
                                starting communication. It is also recommended
                                to use the maximum value of the tokens
                                responsible for the length of the answer
                                (scale-4) in order to get the most complete
                                answer. Scale-2 is the most interesting,
                                allowing you to adjust the
                                &quot;creativity&quot; of the model, the higher
                                the value, the less deterministic the answer
                                will be. Increasing the values in scale-1 asks
                                the model to look for an answer from different
                                domains. <br />
                                It is very important to correctly compose the
                                prompt. It is necessary to clearly describe what
                                you want, give clear instructions. According to
                                the Content Policy and Terms, the user has full
                                ownership of the results they create with
                                ChatGPT.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
