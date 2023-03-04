import { motion } from "framer-motion";

interface SelectPlayerModalProps {
  players: string[];
  onPlayerSelected: (player: string) => void;
}

export default function SelectPlayerModal({
  players,
  onPlayerSelected,
}: SelectPlayerModalProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="bg-black/50 p-4 z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="bg-white p-4 rounded-lg space-y-4"
      >
        <h1 className="font-bold">Choisir un joueur</h1>
        <div className="flex flex-col gap-2">
          {players.map((player) => (
            <button
              onClick={() => onPlayerSelected(player)}
              className="bg-green-600 p-2 rounded-lg"
            >
              {player}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
