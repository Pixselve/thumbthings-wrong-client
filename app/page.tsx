"use client";
import InGame from "@/components/InGame";
import { useEffect, useState } from "react";
import MainMenu from "@/components/MainMenu";
import useWebSocket from "react-use-websocket";
import WaitingRoom from "@/components/WaitingRoom";
import { WEB_SOCKET_URL } from "@/lib/config";
import { EndScreen } from "@/components/EndScreen";

enum GameStatus {
  Menu,
  WaitingRoom,
  InGame,
  EndScreen,
}

export default function Home() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEB_SOCKET_URL,
    { share: true }
  );

  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Menu);
  const [username, setUsername] = useState("");
  const [isPlayerEnemy, setIsPlayerEnemy] = useState(false);
  const [winnerRole, setWinnerRole] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (readyState === 3) {
      setGameStatus(GameStatus.Menu);
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = lastMessage.data;
      if (message.startsWith("PlayerRegistered;")) {
        // PlayerRegistration;{nickname}
        const nickname = message.split(";")[1];
        setUsername(nickname);
        setGameStatus(GameStatus.WaitingRoom);
      } else if (message.startsWith("RoomStart;")) {
        // RoomStart;{otherplayer1}-{role};{otherplayer2}-{role};{otherplayer3}-{role};{otherplayer4}-{role}
        const playersWithRoles = message.split(";");
        playersWithRoles.shift();
        playersWithRoles.forEach((playerWithRole: string) => {
          const [player, role] = playerWithRole.split("-");
          if (player === username) {
            setIsPlayerEnemy(role === "enemy");
          }
        });
        setGameStatus(GameStatus.InGame);
      } else if (message.startsWith("PlayerList;")) {
        const players = message.split(";");
        players.shift();
        setPlayers(players);
      } else if (message.startsWith("end;")) {
        const winnerRole = message.split(";")[1];
        setWinnerRole(winnerRole);
        setGameStatus(GameStatus.EndScreen);
      }
    }
  }, [lastMessage]);

  function reset() {
    // refresh page to reset state and clear websocket
    window.location.reload();
  }

  switch (gameStatus) {
    case GameStatus.Menu:
      return <MainMenu></MainMenu>;
    case GameStatus.WaitingRoom:
      return <WaitingRoom players={players}></WaitingRoom>;
    case GameStatus.InGame:
      return (
        <InGame
          players={players}
          isPlayerEnemy={isPlayerEnemy}
          username={username}
        />
      );
    case GameStatus.EndScreen:
      return (
        <EndScreen
          onQuit={reset}
          winnerRole={winnerRole}
          isPlayerEnemy={isPlayerEnemy}
        ></EndScreen>
      );
  }
}
