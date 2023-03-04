"use client";
import CardsBar from "@/components/CardsBar";
import {useEffect, useState} from "react";

import {
  CARDS,
  CardType,
  DECK_SIZE,
  NEUTRALIZE_TIME,
  SECONDS_BEFORE_GAME_START,
  SHUFFLE_PRICE,
  TIME_FOR_ONE_ACTION_POINT,
  WEB_SOCKET_URL,
} from "@/lib/config";
import useWebSocket from "react-use-websocket";
import {motion} from "framer-motion";
import Image from "next/image";
import SelectPlayerModal from "./SelectPlayerModal";

/**
 * @returns a random card type
 */
function getRandomCard(): CardType {
  const keys = Object.keys(CARDS) as unknown as CardType[];
  return keys[Math.floor(Math.random() * keys.length)];
}

interface InGameProps {
  isPlayerEnemy: boolean;
  username: string;
  players: string[];
}

export default function InGame({
  isPlayerEnemy,
  username,
  players,
}: InGameProps) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEB_SOCKET_URL,
    { share: true }
  );

  const [progress, setProgress] = useState(0);
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [roleDisplay, setRoleDisplay] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardWaitingToBeSent, setCardWaitingToBeSent] = useState(-1);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_BEFORE_GAME_START);

  const [secondsLeftNeutralized, setSecondsLeftNeutralized] = useState(0);

  useEffect(() => {
    if (secondsLeftNeutralized <= 0) {
      return;
    }
    // set the role display to false after 3 seconds
    const timer = setTimeout(() => {
      setSecondsLeftNeutralized((prevSeconds) => prevSeconds - 1);
      setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeftNeutralized]);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = lastMessage.data;
      if (message.startsWith("NeutralizePlayer;")) {
        const player = message.split(";")[1];
        if (player === username) {
          setSecondsLeftNeutralized(NEUTRALIZE_TIME);
          setProgress(0);
        }
      }
    }
  }, [lastMessage]);

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
    setCardDeck(() => {
      const newDeck: CardType[] = [];
      for (let i = 0; i < DECK_SIZE; i++) {
        let card = getRandomCard();
        // do not give a new card that is already in the deck
        while (newDeck.includes(card)) {
          card = getRandomCard();
        }
        newDeck.push(card);
      }
      return newDeck;
    });
  }, []);

  function selectACard(index: number, cardType: CardType, price: number) {
    setCardDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      let card = getRandomCard();
      // do not give a new card that is already in the deck
      while (newDeck.includes(card)) {
        card = getRandomCard();
      }
      newDeck.splice(index, 1, card);
      return newDeck;
    });

    const card = CARDS[cardType];
    if (card.targetPlayer) {
      setCardWaitingToBeSent(cardType);
      setIsModalVisible(true);
    } else {
      sendMessage(`UseCard;${username};${cardType}`);
    }

    setProgress((prevProgress) => Math.max(0, prevProgress - price));
  }

  function sendCardToPlayer(player: string) {
    sendMessage(`TargetPlayer;${username};${player};${cardWaitingToBeSent}`);
    setCardWaitingToBeSent(-1);
    setIsModalVisible(false);
  }

  function shuffleDeck() {
    // get a new deck composed of random cards. Only unique cards are allowed
    const newDeck: CardType[] = [];
    for (let i = 0; i < DECK_SIZE; i++) {
      let card = getRandomCard();
      // do not give a new card that is already in the deck
      while (newDeck.includes(card)) {
        card = getRandomCard();
      }
      newDeck.push(card);
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
    <div className="flex flex-col justify-between h-full relative bg-map bg-cover">
      {isModalVisible && (
        <SelectPlayerModal
          players={players.filter((player) => player !== username)}
          onPlayerSelected={sendCardToPlayer}
        ></SelectPlayerModal>
      )}
      {secondsLeftNeutralized !== 0 && (
        <NeutralizedScreen
          timeLeft={secondsLeftNeutralized}
        ></NeutralizedScreen>
      )}
      <div className="p-4 space-y-4">
        <Image
          className="m-auto"
          src="/logo.png"
          alt="logo"
          height={50}
          width={150}
        ></Image>
        <div className="bg-white p-4 rounded-lg space-y-2 shadow-2xl">
          <h1 className="text-2xl font-bold text-center">Cartes</h1>

          <div className="grid grid-cols-2 gap-4">
            {Object.values(CARDS).map((card, index) => (
              <div className="flex gap-2 items-center">
                <Image
                  src={card.image}
                  alt={card.description}
                  height={50}
                  width={50}
                ></Image>
                <div>{card.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardsBar
        onShuffle={shuffleDeck}
        onCardClick={selectACard}
        deck={cardDeck}
        progress={progress}
      ></CardsBar>
    </div>
  );
}

function NeutralizedScreen({ timeLeft }: { timeLeft: number }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="bg-black/50 p-4 z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="bg-red-600 p-4 rounded-lg space-y-4 text-white"
      >
        <h1 className="font-bold">⚡️ Vous êtes neutralisé !</h1>
        <h2 className="text-center">
          Vous ne pouvez plus jouer pendant {timeLeft} secondes
        </h2>
      </motion.div>
    </motion.div>
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
