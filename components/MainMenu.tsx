import {FormEvent, useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {WEB_SOCKET_URL} from "@/lib/config";

/**
 * Generate a username in the format : "Pseudocool" + random number
 * between 1000 and 9999
 */
function generateUsername() {
    return "Pseudo" + Math.floor(Math.random() * 9000 + 1000);
}

interface Props {
}

export default function ({}: Props) {
  const [username, setUsername] = useState(generateUsername());

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEB_SOCKET_URL,
    { share: true }
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const message = lastMessage.data;
      if (message.startsWith("NameAlreadyTaken")) {
        setLoading(false);
        setError("😡 Ce nom est déjà pris.");
      }
    }
  }, [lastMessage]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    sendMessage(`PlayerRegistration;${username}`);
  }

  return (
    <div className="h-full p-10 bg-slate-200">
      <form
        onSubmit={submit}
        className="m-auto bg-white shadow rounded-xl p-10 space-y-10"
      >
        <img className="w-40 m-auto" src="logo.png" alt="logo" />
        <h1 className="font-bold text-3xl text-center">Thumbthing's wrong</h1>

        <div className="flex flex-col">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            required={true}
            minLength={4}
            maxLength={12}
            onInput={(event) =>
              setUsername((event.target as HTMLTextAreaElement).value)
            }
            value={username}
            className={`bg-slate-200 rounded-full p-2 px-4 ${
              error.length > 0 ? "border-red-500 border-2" : ""
            }`}
            id="username"
            type="text"
          />
          {error && <span className="text-red-600">{error}</span>}
        </div>

        <button
          disabled={username.length < 4 || loading}
          type="submit"
          className="bg-green-600 p-2 w-full rounded-md text-white disabled:grayscale"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
