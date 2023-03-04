import { motion } from "framer-motion";
import { useMemo } from "react";
import { CARDS, CardType } from "@/lib/config";

interface CardInDeckProps {
  cardType: CardType;
  onClick: (cardType: CardType, price: number) => void;
  progress: number;
}

function getCardImageAndPrice(cardType: CardType): {
  image: string;
  price: number;
} {
    return CARDS[cardType];
}

export function CardInDeck({ cardType, onClick, progress }: CardInDeckProps) {
  const { image, price } = useMemo(() => {
    return getCardImageAndPrice(cardType);
  }, [cardType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => progress >= price && onClick(cardType, price)}
      className={`relative transition-all ${
        progress >= price ? "opacity-100 cursor-pointer " : "grayscale"
      }`}
    >
      <img
        className="bg-white overflow-hidden aspect-[6/8] w-full object-contain rounded-md border-black border-4"
        src={image}
        alt="Card image"
      />
      <div className="absolute -bottom-2 w-full flex justify-center">
        <span className="bg-green-600 h-8 aspect-square rounded-full flex items-center justify-center text-white border-black border-4">
          {price}
        </span>
      </div>
    </motion.div>
  );
}
