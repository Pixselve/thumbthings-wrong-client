"use client";
import CardsBar from "@/components/CardsBar";
import {useEffect, useState} from "react";
import {CardType} from "@/components/CardInDeck";
import {
  DECK_SIZE,
  SECONDS_BEFORE_GAME_START,
  SHUFFLE_PRICE,
  TIME_FOR_ONE_ACTION_POINT,
  WEB_SOCKET_URL,
} from "@/lib/config";
import useWebSocket from "react-use-websocket";
import {motion} from "framer-motion";

/**
 * @returns a random card type
 */
function getRandomCard(): CardType {
  return Math.floor(Math.random() * 6);
}

interface InGameProps {
  isPlayerEnemy: boolean;
  username: string;
}

export default function InGame({ isPlayerEnemy, username }: InGameProps) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEB_SOCKET_URL,
    { share: true }
  );

  const [progress, setProgress] = useState(0);
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [roleDisplay, setRoleDisplay] = useState(true);

  const [secondsLeft, setSecondsLeft] = useState(SECONDS_BEFORE_GAME_START);

  useEffect(() => {
    if (secondsLeft === 0) {
      setRoleDisplay(false);
      return;
    }
    // set the role display to false after 3 seconds
    const timer = setTimeout(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // every 1 seconds, give 1 new progress (react syntax)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevCount) => Math.min(10, prevCount + 1)); // update count based on previous count
    }, TIME_FOR_ONE_ACTION_POINT); // every 1000 milliseconds
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
  }, []);

  function selectACard(index: number, cardType: CardType, price: number) {
    setCardDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      newDeck.splice(index, 1, getRandomCard());
      return newDeck;
    });
    sendMessage(`UseCard;${username};${cardType}`);
    setProgress((prevProgress) => Math.max(0, prevProgress - price));
  }

  function shuffleDeck() {
    // get a new deck
    const newDeck = [];
    for (let i = 0; i < DECK_SIZE; i++) {
      newDeck.push(getRandomCard());
    }
    setCardDeck(newDeck);
    setProgress((prevProgress) => Math.max(0, prevProgress - SHUFFLE_PRICE));
  }

  if (roleDisplay) {
    return (
      <RoleDisplay
        isEnemy={isPlayerEnemy}
        secondsLeft={secondsLeft}
      ></RoleDisplay>
    );
  }

  return (
    <div className="flex flex-col justify-end h-full relative">
      {/*<SelectPlayerModal></SelectPlayerModal>*/}
      <img className="h-full object-cover" src="image.png" alt="cover" />
      <CardsBar
        onShuffle={shuffleDeck}
        onCardClick={selectACard}
        deck={cardDeck}
        progress={progress}
      ></CardsBar>
    </div>
  );
}

function RoleDisplay({
  isEnemy,
  secondsLeft,
}: {
  isEnemy: boolean;
  secondsLeft: number;
}) {
  const animation = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-center h-full space-y-4"
    >
      <h1 className="text-5xl text-center">{isEnemy ? "😡" : "😇"}</h1>
      <h2 className="font-bold text-2xl">
        Vous êtes un {isEnemy ? "méchant" : "gentil"}
      </h2>
      <div className="p-2 bg-slate-500 rounded-lg text-white">
        La partie commence dans {secondsLeft} secondes...
      </div>
    </motion.div>
  );
}
