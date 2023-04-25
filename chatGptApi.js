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

export async function openChatGpt({
    prompt,
    systemMessage,
    variability,
    temperature,
    penalty,
    tokens,
}) {
    const body = {
        model: "gpt-3.5-turbo",
        messages: [
            ...systemMessage,
            { role: "user", content: prompt, name: "AvadakedavraOrg" },
        ],
        temperature: temperature,
        stream: false,
        top_p: 1,
        n: variability,
        stop: null,
        max_tokens: tokens,
        presence_penalty: penalty,
        frequency_penalty: 0,
    };
    // console.log(body);
    return openAI(body);
}
