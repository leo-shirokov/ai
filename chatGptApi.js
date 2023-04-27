import getApiKey from "./src/components/GetApiKey/GetApiKey";

const aiUrl = "https://api.openai.com/v1/chat/completions";

export async function openAI(body = null) {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getApiKey()}`,
    };
    const res = await fetch(aiUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
    });
    if (!res.ok) throw new Error("No response from OPEN AI");

    const data = await res.json();
    const { content } = data.choices[0].message;
    if (!content) throw new Error("No response from Chat GPT");
    return content;
}

// Reasonable use of a class that forms an object based on the parameters received from the user
export class RequestBody {
    model = "gpt-3.5-turbo";
    stream = false;
    constructor(prompt, sysMsg, variability, temp, penalty, tokens) {
        this.messages = [
            ...sysMsg,
            { role: "user", content: prompt, name: "AvadakedavraOrg" },
        ];
        this.n = variability;
        this.temperature = temp;
        this.presence_penalty = penalty;
        this.max_tokens = tokens;
    }
}
