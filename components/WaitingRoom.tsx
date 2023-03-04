import { motion } from "framer-motion";

interface WaitingRoomProps {
  players: string[];
}

function PlayerListElement({ name }: { name: string }) {
  const firstLetter = name[0].toUpperCase();

  const animation = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.li {...animation} className="flex gap-2 items-center">
      <div className="bg-green-600 h-10 aspect-square flex items-center justify-center rounded-full text-white">
        {firstLetter}
      </div>
      <div>{name}</div>
    </motion.li>
  );
}

export default function ({ players }: WaitingRoomProps) {
  return (
    <div className="h-full p-10 bg-slate-200">
      <div className="m-auto bg-white shadow rounded-xl p-10 space-y-10">
        <img className="w-40 m-auto" src="logo.png" alt="logo" />
        <h1 className="font-bold text-3xl text-center">Thumbthing's wrong</h1>
        <h1 className="font-bold text-2xl text-center">Salle d'attente</h1>
        <motion.ul className="space-y-4">
          {players.map((player) => {
            return (
              <PlayerListElement name={player} key={player}></PlayerListElement>
            );
          })}
        </motion.ul>

        <div className="text-center bg-slate-600 p-2 w-full rounded-md text-white">
          Vous allez rentrer dans la partie dans quelques instants...
        </div>
      </div>
    </div>
  );
}
