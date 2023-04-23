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
        // Higher values like 0.8 will make the output more random; 0-2
        temperature: temperature,
        stream: false,
        // An alternative to sampling with temperature
        top_p: 1,
        // How many chat completion choices to generate for each input message
        n: variability,
        // Up to 4 sequences where the API will stop generating further tokens
        stop: null,
        // The maximum number of tokens to generate in the chat completion
        max_tokens: tokens,
        // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        presence_penalty: penalty,
        // ... decreasing the model's likelihood to repeat the same line verbatim
        frequency_penalty: 0,
    };
    // console.log(body);
    return openAI(body);
}
