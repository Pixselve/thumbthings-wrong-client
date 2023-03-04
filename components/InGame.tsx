"use client";
import CardsBar from "@/components/CardsBar";
import {useEffect, useState} from "react";
import {CardType} from "@/components/CardInDeck";
import { DECK_SIZE } from "@/lib/config";

/**
 * @returns a random card type
 */
function getRandomCard(): CardType {
    return Math.floor(Math.random() * 6);
}

export default function InGame() {
    const [progress, setProgress] = useState(0);
    const [cardDeck, setCardDeck] = useState<CardType[]>([]);

    // every 1 seconds, give 1 new progress (react syntax)
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevCount) => Math.min(10, prevCount + 1)); // update count based on previous count
        }, 1000); // every 1000 milliseconds
        return () => clearInterval(timer); // clear interval when component unmounts
    }, []); // empty dependency array means run only once

    useEffect(() => {
        // fill the deck with random cards when the game starts
        setCardDeck((prevDeck) => {
            const newDeck = [];
            for (let i = 0; i < DECK_SIZE; i++) {
                newDeck.push(getRandomCard());
            }
            return newDeck;
        });
    }, [])

    function selectACard(index: number, cardType: CardType, price: number) {
        setCardDeck((prevDeck) => {
            const newDeck = [...prevDeck];
            newDeck.splice(index, 1, getRandomCard());
            return newDeck;
        });
        setProgress((prevProgress) => Math.max(0, prevProgress - price));
    }


    return (
        <div className="flex flex-col justify-end h-full">
            <CardsBar onCardClick={selectACard} deck={cardDeck} progress={progress}></CardsBar>
        </div>
    )
}
