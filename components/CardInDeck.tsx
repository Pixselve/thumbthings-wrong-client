import { useMemo } from "react";

export enum CardType {
  INVERTED_CONTROLS,
  INVERTED_CAMERA,
  LOW_GRAVITY,
  NO_JUMP,
  ALWAYS_MOVING,
  NO_COLLISION,
}

interface CardInDeckProps {
    cardType: CardType;
    onClick: (cardType: CardType, price: number) => void;
    progress: number;
}

function getCardImageAndPrice(cardType: CardType): {
    image: string;
    price: number;
} {
    switch (cardType) {
        case CardType.INVERTED_CONTROLS:
            return {image: "cards/noJump.png", price: 1};
        case CardType.INVERTED_CAMERA:
            return {image: "cards/noJump.png", price: 2};
        case CardType.LOW_GRAVITY:
            return {image: "cards/gravity.png", price: 3};
        case CardType.NO_JUMP:
            return {image: "cards/noJump.png", price: 4};
        case CardType.ALWAYS_MOVING:
            return {image: "cards/noJump.png", price: 5};
        case CardType.NO_COLLISION:
            return {image: "cards/noJump.png", price: 6};
    }
}

export function CardInDeck({cardType, onClick, progress}: CardInDeckProps) {
    const {image, price} = useMemo(() => {
        return getCardImageAndPrice(cardType);
    }, [cardType]);

    return (
      <div
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
      </div>
    );
}
