function ChatResponse({ response }) {
    return (
        <div className="text-zinc-400 font-light leading-7 mt-5">
            {response.message}
        </div>
    );
}

export default ChatResponse;
