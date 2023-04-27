const netlifyUrl = "https://ai-backend.netlify.app/.netlify/functions/api";

async function GetApiKey() {
    const res = await fetch(netlifyUrl);
    if (!res.ok) throw new Error("Cannot get API key from Netlify server");
    const { api_key } = await res.json();
    return api_key;
}

export default GetApiKey;
