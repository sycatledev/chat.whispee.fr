import React from 'react';
import BackButton from '../buttons/BackButton';

export default function Modal(props){
    console.log(props.children)
    return (
        <>
            <div className={`absolute z-50 h-full w-full duration-200 bg-gradient-to-br from-slate-400 to-slate-50 px-56 py-10`}>
                <header className="bg-white w-full">
                    <nav>
                        <ul className='flex items-center justify-between text-black'>
                            <div className='flex space-x-5'>
                                <li>Profil</li>
                                <li>Azones</li>
                            </div>
                            <li className='flex-end'><BackButton back={props.back} color1={"bg-slate-800"} color2={"bg-slate-400"} hoverBg={"hover:bg-white"} /></li>
                        </ul>
                    </nav>
                </header>
                {props.children}
            </div>
        </>
    );
}
