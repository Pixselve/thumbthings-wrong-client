"use client";
import InGame from "@/components/InGame";
import {useEffect, useState} from "react";
import MainMenu from "@/components/MainMenu";
import useWebSocket from "react-use-websocket";
import WaitingRoom from "@/components/WaitingRoom";

export default function Home() {

    const {sendMessage, lastMessage, readyState} = useWebSocket("ws://yami2200box.ddns.net:8080", {share: true});

    const [isGameStarted, setIsGameStarted] = useState(false);
    const [inWaitingRoom, setInWaitingRoom] = useState(false);

    useEffect(() => {
        if (lastMessage !== null) {
            const message = lastMessage.data;
            if (message.startsWith("PlayerRegistered;")) {
                setInWaitingRoom(true);
            }
            if (message.startsWith("RoomStart;")) {
                setIsGameStarted(true);
                setInWaitingRoom(false);
            }
        }
    }, [lastMessage]);


    if (isGameStarted) {
        return <InGame/>
    }
    if (inWaitingRoom) {
        return <WaitingRoom></WaitingRoom>
    }


    return <MainMenu></MainMenu>;


}
