const netlifyUrl = "https://ai-backend.netlify.app/.netlify/functions/api";
const aiUrl = "https://api.openai.com/v1/chat/completions";

async function getApiKey() {
    const res = await fetch(netlifyUrl);
    if (!res.ok) throw new Error("Cannot get API key from Netlify server");
    const { api_key } = await res.json();
    return api_key;
}

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
