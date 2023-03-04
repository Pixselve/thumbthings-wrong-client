"use client";

import ProgressBar from "@/components/ProgressBar";
import {useEffect, useState} from "react";
import {CardInDeck, CardType} from "@/components/CardInDeck";


interface CardsBarProps {
    progress: number;
    onCardClick?: (index:number, cardType: CardType, price: number) => void;
    deck: CardType[];
}


export default function CardsBar({progress, deck, onCardClick}: CardsBarProps) {
    return (
        <div className="relative">
            <div className="bg-blue-600 h-16"></div>
            <div className="absolute w-full bottom-0 flex justify-center">
                <div className="bg-blue-500 w-3/4 shadow-5xl p-2 space-y-4 rounded-t-lg">

                    <div className="flex justify-between items-end">
                        <div className="grid grid-cols-3 gap-2">
                            {deck.map((cardType, index) => (
                                <CardInDeck progress={progress} onClick={(cardType1, price) => onCardClick && onCardClick(index, cardType1, price)} key={index} cardType={cardType}/>
                            ))}
                        </div>
                        <div className="text-white font-bold bg-blue-800 p-2">🗡️ Romano</div>
                    </div>

                    <ProgressBar progress={progress}></ProgressBar>
                </div>
            </div>
        </div>
    );
}
