import { motion } from "framer-motion";

export default function SelectPlayerModal() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="bg-black/50 p-4 z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        className="bg-white p-4 rounded-lg"
      >
        <h1 className="font-bold">Choisir un joueur</h1>
        <div className="flex flex-col gap-2">
          <button className="bg-green-600 p-2 rounded-lg">awd</button>
          <button className="bg-green-600 p-2 rounded-lg">awd</button>
          <button className="bg-green-600 p-2 rounded-lg">awd</button>
          <button className="bg-green-600 p-2 rounded-lg">awd</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
