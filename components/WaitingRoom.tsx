interface WaitingRoomProps {
    players: string[];
}

export default function ({players}: WaitingRoomProps) {

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
