import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";

export default function () {

  const {sendMessage, lastMessage, readyState} = useWebSocket("ws://yami2200box.ddns.net:8080", {share: true});

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = lastMessage.data;
      if (message.startsWith("PlayerList;")) {
        const players = message.split(";");
        players.shift();
        setPlayers(players);
      }
    }
  }, [lastMessage]);


  return (
      <div className="h-full p-4 bg-slate-200">
        <div className="m-auto bg-white shadow rounded-xl p-4 space-y-10">
          <img className="w-24 m-auto" src="logo.png" alt="logo"/>
          <h1 className="font-bold text-3xl text-center">Thumbthing's wrong</h1>
          <h1 className="font-bold text-2xl text-center">Salle d'attente</h1>
          <div>
            {players.map((player) => {
              return <ul key={player}>{player}</ul>;
            })
            }
          </div>

          <div className="text-center bg-slate-600 p-2 w-full rounded-md text-white">
            Vous allez rentrer dans la partie dans quelques instants...
          </div>
        </div>
      </div>
  );
}
