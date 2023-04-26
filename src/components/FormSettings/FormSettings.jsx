import React from "react";

function FormSettings() {
    return (
        <div className="flex justify-center gap-x-10 items-center md:flex-col md:gap-y-5">
            {/* <div className="relative">
                        <span className="loader"></span>
                    </div> */}
            <div className="flex justify-center items-center md:self-start">
                <input
                    className="uk-checkbox shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                <p className="hidden text-sm pl-2 md:block">
                    Mark once to start a chat conversation
                </p>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6">
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                    <div className="w-full flex justify-between items-center text-xs">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </div>
                    <input
                        className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                        type="range"
                        min="1"
                        max="5"
                        value={variability}
                        placeholder="0"
                        onChange={(e) => setVariability(+e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                    <div className="w-full flex justify-between items-center text-xs">
                        <p>0.2</p>
                        <p>0.4</p>
                        <p>0.6</p>
                        <p>0.8</p>
                        <p>1</p>
                        <p>1.2</p>
                        <p>1.4</p>
                        <p>1.6</p>
                        <p>1.8</p>
                        <p>2</p>
                    </div>
                    <input
                        className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                        type="range"
                        step="0.1"
                        min="0.2"
                        max="2"
                        value={temperature}
                        placeholder="0"
                        onChange={(e) => setTemperature(+e.target.value)}
                    />
                </div>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center gap-y-5 xl:w-1/3 lg:w-4/5 md:w-11/12 md:gap-y-6">
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                    <div className="w-full flex justify-between items-center text-xs">
                        <p>0</p>
                        <p>0.2</p>
                        <p>0.4</p>
                        <p>0.6</p>
                        <p>0.8</p>
                        <p>1</p>
                    </div>
                    <input
                        className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                        type="range"
                        step="0.1"
                        min="0"
                        max="1"
                        value={penalty}
                        placeholder="0"
                        onChange={(e) => setPenalty(+e.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                    <div className="w-full flex justify-between items-center text-xs">
                        <p>148</p>
                        <p>528</p>
                        <p>908</p>
                        <p>1288</p>
                        <p>1668</p>
                        <p>2048</p>
                    </div>
                    <input
                        className="uk-range w-full shadow-[0_0_15px_rgba(0,0,0,0.50)]"
                        type="range"
                        step="380"
                        min="148"
                        max="2048"
                        value={tokens}
                        placeholder="0"
                        onChange={(e) => setTokens(+e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default FormSettings;
