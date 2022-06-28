import React, { ReactNode } from 'react'

type Props = {
    index: number
    onClick(event:any): void
    player?: string
}

export default function Square({index, onClick, player}: Props) {
    const scale = player ? "scale-100" : "scale-0"
    const textColor = player === "X" ? "text-yellow-200" : "text-fuchsia-300"
    const hoverStyle = "transition duration-500 hover:scale-105 transform"
    return (
        <div   
            data-cell-index = {index}
            {...{onClick}}     
            className= {`h-36 border-solid border-4 border-slate-200 font-display text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
        >
            <span 
            className={`transform transition-all dration-150 ease-out ${scale} ${textColor}`}>{player}</span>
        </div>
    )
}
