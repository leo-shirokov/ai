import { useState } from "react";
import GetApiKey from "../GetApiKey/GetApiKey";
import ChatTextarea from "../ChatTextarea/ChatTextarea";

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
    const content = data.data; //[0].url;
    return content;
};

function ChatImage() {
    const [content, setContent] = useState([]);

    const onSubmitForm = async (newValue) => {
        console.log(newValue);
        const body = {
            prompt: newValue,
            n: 2,
            size: "1024x1024",
        };
        const images = await getApiContent(body);
        setContent(images.map((im) => im.url));
    };

    return (
        <>
            <ChatTextarea onSubmit={onSubmitForm} />
            {content.length > 0 &&
                content.map((image) => (
                    <div key={image}>
                        <a href={image} target="blank">
                            <img
                                style={{ width: "300px" }}
                                src={image}
                                alt="AI generated image"
                            />
                        </a>
                    </div>
                ))}
        </>
    );
}

export default ChatImage;
