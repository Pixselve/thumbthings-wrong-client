"use client";

import ProgressBar from "@/components/ProgressBar";
import { CardInDeck, CardType } from "@/components/CardInDeck";
import { SHUFFLE_PRICE } from "@/lib/config";
import { motion } from "framer-motion";

interface CardsBarProps {
  progress: number;
  onCardClick: (index: number, cardType: CardType, price: number) => void;
  deck: CardType[];
  onShuffle: () => void;
}

export default function CardsBar({
  progress,
  deck,
  onCardClick,
  onShuffle,
}: CardsBarProps) {
  return (
    <div className="relative">
      <div className="bg-blue-600 h-16"></div>
      <div className="absolute w-full bottom-0 flex justify-between">
        <div className="px-2">
          <button
            onClick={onShuffle}
            disabled={progress < SHUFFLE_PRICE}
            className={`bg-green-600 text-white rounded-md p-2 flex space-x-3 ${
              progress >= SHUFFLE_PRICE ? "" : "grayscale"
            }`}
          >
            <svg
              className="h-6 w-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
            </svg>
          </button>
        </div>

        <div className="bg-blue-500 w-[85%] shadow-5xl p-2 space-y-4">
          <div className="flex justify-between items-end">
            <motion.div className="grid grid-cols-4 gap-1">
              {deck.map((cardType, index) => (
                <CardInDeck
                  key={index * cardType}
                  progress={progress}
                  onClick={(cardType1, price) =>
                    onCardClick(index, cardType1, price)
                  }
                  cardType={cardType}
                />
              ))}
            </motion.div>
          </div>
          <ProgressBar progress={progress}></ProgressBar>
        </div>
      </div>
    </div>
  );
}
