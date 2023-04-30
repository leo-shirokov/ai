// Beta version API
import { useState } from "react";
import GetApiKey from "../Api/GetApiKey";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import Modal from "../Modal/Modal";

const aiUrl = "https://api.openai.com/v1/images/generations";

const getApiContent = async (body = null) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await GetApiKey()}`,
    };
    const res = await fetch(aiUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    });
    if (!res.ok) throw new Error("No response from OPEN AI");

    const data = await res.json();
    const content = data.data;
    return content;
};

function ImageForm() {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeImage, setActiveImage] = useState("");

    const onSubmitForm = async (newValue) => {
        try {
            setLoading(true);
            const body = {
                prompt: newValue,
                n: 4,
                size: "1024x1024",
                user: "AvadakedavraOrg",
            };
            const images = await getApiContent(body);
            setContent(images.map((im) => im.url));
            setLoading(false);
        } catch (error) {
            console.log("error sending message: ", error.message);
        }
    };

    return (
        <div className="w-full h-full">
            <ChatTextarea onSubmit={onSubmitForm} />
            <details className="pb-5">
                <summary className="text-sm text-zinc-600 hover:text-zinc-500">
                    Loading problems
                </summary>
                <p className="text-sm pt-2">
                    During peak hours on the OPEN AI server, the image
                    generation time may increase, however, if the download does
                    not occur after more than 40 seconds, click on the logo to
                    reload the page and enter the prompt again.
                </p>
            </details>
            <div className="flex flex-start gap-x-16">
                <button
                    className="px-3 py-1 bg-zinc-700 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.30)] text-md text-zinc-500
                hover:text-zinc-600 transition-all mb-5 ml-4 md:ml-0"
                    onClick={() => setContent([])}
                >
                    Clear results
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

            <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full overflow-y-auto md:grid-cols-none md:grid-rows-2 pb-20">
                {content.length > 0 &&
                    content.map((image) => (
                        <div key={image} className="w-80 mx-auto">
                            <div
                                onClick={() => setActiveImage(image)}
                                className="cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt={"AI generated image"}
                                    className="border border-zinc-900 shadow-xl rounded-md transition duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                        </div>
                    ))}
                <Modal open={!!activeImage} onClose={() => setActiveImage("")}>
                    <a href={activeImage} target="blank">
                        <img
                            src={activeImage}
                            alt={"AI generated image"}
                            className="w-[40rem] border border-zinc-900 rounded-md transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
                        />
                    </a>
                </Modal>
            </div>
        </div>
    );
}

export default ImageForm;
