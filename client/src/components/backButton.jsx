
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate()
    return (
        <>
            <button className='flex items-center justify-center bg-gradient-to-tl from-neutral-200 
                            to-neutral-300 rounded-xl h-10 w-10 hover:scale-95 duration-200'
                    onClick={() => { // ! Attendre d'implémenter le store pour communiquer l'état à la page register
                    }}
            >
                <FontAwesomeIcon 
                icon={faArrowLeft} 
                />
            </button>
        </>
    )
}