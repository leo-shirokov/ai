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

    const surprises = [
        "ship at sea",
        "orange kitten",
        "milky way",
        "purple flower",
        "white piano",
        "quantum computer",
        "spaceship",
        "bright red heart",
        "scrambled eggs in a frying pan",
        "gold coins",
        "sunset over the sea",
        "sunset in the desert",
        "sunset on Mars",
        "jungi",
        "ant",
        "books",
        "barometer",
        "bitcoin",
        "puppy",
        "moon landscape",
        "doomsday clock",
        "coral reef",
        "ocean floor",
    ];
    const randomSurprise = Math.floor(Math.random() * (surprises.length - 1));
    const surprise = surprises[randomSurprise];

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
                <summary className="text-sm text-zinc-600 hover:text-zinc-500 cursor-pointer">
                    Resolve problems
                </summary>
                <p className="text-sm pt-2">
                    During peak hours on the OPEN AI server, the image
                    generation time may increase, however, if the loading does
                    not occur after more than 40 seconds, click on website name
                    to reload the page, click on image icon and enter the prompt
                    again. <br />
                    The DALL·E - image generator API is in beta mode, so there
                    may sometimes be problems with its operation.
                </p>
            </details>
            <div className="flex flex-start h-8  gap-x-6 mb-10">
                <button
                    className="whitespace-nowrap text-md text-zinc-500 shadow-[0_0_15px_rgba(0,0,0,0.50)]
                    bg-zinc-700 rounded-md px-2 py-0.5 hover:text-zinc-400 hover:ring-1 transition-all"
                    onClick={() => setContent([])}
                >
                    Clear results
                </button>
                <button
                    className="whitespace-nowrap text-md text-zinc-500 shadow-[0_0_15px_rgba(0,0,0,0.50)]
                    bg-zinc-700 rounded-md px-2 py-0.5 hover:text-zinc-400 hover:ring-1 transition-all"
                    onClick={() => onSubmitForm(surprise)}
                >
                    Surprise me
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
