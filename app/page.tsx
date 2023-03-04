"use client";
import InGame from "@/components/InGame";
import { useEffect, useState } from "react";
import MainMenu from "@/components/MainMenu";
import useWebSocket from "react-use-websocket";
import WaitingRoom from "@/components/WaitingRoom";
import { WEB_SOCKET_URL } from "@/lib/config";

export default function Home() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEB_SOCKET_URL,
    { share: true }
  );

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [inWaitingRoom, setInWaitingRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [isPlayerEnemy, setIsPlayerEnemy] = useState(false);

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (readyState === 3) {
      setIsGameStarted(false);
      setInWaitingRoom(false);
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = lastMessage.data;
      if (message.startsWith("PlayerRegistered;")) {
        // PlayerRegistration;{nickname}
        const nickname = message.split(";")[1];
        setUsername(nickname);
        setInWaitingRoom(true);
      }
      if (message.startsWith("RoomStart;")) {
        // RoomStart;{otherplayer1}-{role};{otherplayer2}-{role};{otherplayer3}-{role};{otherplayer4}-{role}
        const playersWithRoles = message.split(";");
        playersWithRoles.shift();
        playersWithRoles.forEach((playerWithRole: string) => {
          const [player, role] = playerWithRole.split("-");
          if (player === username) {
            setIsPlayerEnemy(role === "enemy");
          }
        });

        setIsGameStarted(true);
        setInWaitingRoom(false);
      }
      if (message.startsWith("PlayerList;")) {
        const players = message.split(";");
        players.shift();
        setPlayers(players);
      }
    }
  }, [lastMessage]);

  if (isGameStarted) {
    return (
      <InGame
        players={players}
        isPlayerEnemy={isPlayerEnemy}
        username={username}
      />
    );
  }
  if (inWaitingRoom) {
    return <WaitingRoom players={players}></WaitingRoom>;
  }

  return <MainMenu></MainMenu>;
}
