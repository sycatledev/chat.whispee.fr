import { useState } from "react";

export default function ProfilModal({
    showProfil,
    setShowProfil
}){
    const [viewProfil, setViewProfil] = useState(false)
    const [editedProfil, setEditedProfil] = useState(false)
    const [statistique, setStatistique] = useState(false)

    const handleCategory = (e) => {
        let parent = e.target;
        for (let i = 0; i < 5; i++) {
          if (parent.id === "messageNav") {
            setMessageNav(true);
            setParamNav(false);
            setFriendNav(false);
            break;
          } else if (parent.id === "friendNav") {
            setMessageNav(false);
            setParamNav(false);
            setFriendNav(true);
            break;
          } else {
            parent = parent.parentNode;
          }
        }
      };
return (
    <div className={`flex absolute z-50 h-full w-full duration-200 bg-gradient-to-br from-slate-400 to-slate-50 px-56 py-10`}>
        <aside className="m-5 p-5 flex flex-col bg-white w-60 rounded-xl">
            <div className="flex items-center">
                <button
                    className={`active:bg-indigo-200 
                                    dark:active:bg-indigo-400 rounded-xl text-black dark:hover:text-gray-300`}
                    id="profilNav"
                    onClick={() => showProfil ? setShowProfil(true) : setShowProfil(false)}
                >
                    <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m13.59 12.002 4.454-4.453a1.126 1.126 0 0 0-1.59-1.594L12 10.408 7.547 5.955A1.127 1.127 0 1 0 5.953 7.55l4.453 4.453-4.453 4.453a1.127 1.127 0 1 0 1.594 1.594L12 13.596l4.453 4.453a1.127 1.127 0 1 0 1.594-1.594l-4.456-4.453Z"></path>
                    </svg>
                </button>
                <h1 className="text-black text-2xl ml-5">Azones</h1>
            </div>
            <div className="h-[1px] bg-black mt-5"></div>
            <div onClick={handleCategory}>
                <div id="viewProfil">
                    
                </div>
                <div id="editedProfil">

                </div>
                <div id="statistique">

                </div>
            </div>
        </aside>
    </div>
    )
}