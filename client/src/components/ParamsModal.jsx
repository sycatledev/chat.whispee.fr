export default function ParamsModal({showParams, setShowParams}){
    return (
        <div className={`flex items-center justify-center absolute z-50 h-full w-full ${showParams ? "backdrop-blur-sm" : ""} duration-200`}>
            <div className="w-5/6 h-5/6 bg-black rounded-xl backdrop-blur-none">
                <div className="flex items-center">
                    <button
                        className={`active:bg-indigo-200 
                            dark:active:bg-indigo-400 p-2 m-2 rounded-xl text-gray-500 dark:hover:text-gray-300`}
                        id="paramNav"
                        onClick={() => showParams ? setShowParams(false) : setShowParams(true)}
                    >
                        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m13.59 12.002 4.454-4.453a1.126 1.126 0 0 0-1.59-1.594L12 10.408 7.547 5.955A1.127 1.127 0 1 0 5.953 7.55l4.453 4.453-4.453 4.453a1.127 1.127 0 1 0 1.594 1.594L12 13.596l4.453 4.453a1.127 1.127 0 1 0 1.594-1.594l-4.456-4.453Z"></path>
                        </svg>
                    </button>
                    <h2 className="text-3xl font-karla">Paramètre</h2>
                </div>
            </div>
        </div>
    )
}