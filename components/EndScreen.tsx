import Image from "next/image";

export function EndScreen({
  isPlayerEnemy,
  winnerRole,
  onQuit,
}: {
  isPlayerEnemy: boolean;
  winnerRole: string;
  onQuit: () => void;
}) {
  return (
    <div className="relative h-full">
      <div className="z-10 absolute h-full w-full flex items-center justify-center p-4">
        <div className="m-auto bg-white shadow rounded-xl p-10 space-y-10">
          <h1 className="text-center text-5xl">
            {(isPlayerEnemy && winnerRole === "enemy") ||
            (!isPlayerEnemy && winnerRole === "ally")
              ? "🏆"
              : "😭"}
          </h1>
          <h2 className="text-center font-bold text-2xl">
            {(isPlayerEnemy && winnerRole === "enemy") ||
            (!isPlayerEnemy && winnerRole === "ally")
              ? "Félications"
              : "Dommage"}{" "}
            ! Les {winnerRole === "ally" ? "gentils" : "méchants"} ont gagnés !
          </h2>
          <button
            onClick={onQuit}
            className="bg-green-600 p-2 rounded-md text-white w-full"
          >
            Quitter
          </button>
        </div>
      </div>
      <Image
        className="object-cover"
        fill
        src="/end-screen.gif"
        alt="end screen"
      ></Image>
    </div>
  );
}
