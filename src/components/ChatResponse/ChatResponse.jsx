import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function ChatResponse({ response }) {
    return (
        <div className="text-zinc-400 font-light leading-7 border border-transparent rounded bg-transparent mt-5">
            <ReactMarkdown>{response.message}</ReactMarkdown>
        </div>
    );
}

export default ChatResponse;
