export const MAX_ACTION_POINTS = 10;
export const DECK_SIZE = 4;
export const TIME_FOR_ONE_ACTION_POINT = 3000;

export const SHUFFLE_PRICE = 3;

export const WEB_SOCKET_URL =
  process.env.WEB_SOCKET_URL || "wss://server-tw.mael.app";

export const SECONDS_BEFORE_GAME_START = 5;

export const NEUTRALIZE_TIME = 8;

export type CardType = keyof typeof CARDS;

export const CARDS = {
  0: {
    image: "/cards/Reverse_control.png",
    description: "Inverser les touches",
    price: 3,
    targetPlayer: false,
  },
  1: {
    image: "/cards/camera_front.png",
    description: "Inverser la caméra",
    price: 3,
    targetPlayer: false,
  },
  2: {
    image: "/cards/gravity.png",
    description: "Désactiver la gravité",
    price: 7,
    targetPlayer: false,
  },
  3: {
    image: "/cards/noJump.png",
    description: "Désactiver les sauts",
    price: 5,
    targetPlayer: false,
  },
  4: {
    image: "/cards/forcerun.png",
    description: "Force le joueur à se déplacer",
    price: 8,
    targetPlayer: false,
  },
  5: {
    image: "/cards/collisionromove.png",
    description: "Supprimer les collisions",
    price: 5,
    targetPlayer: false,
  },
  6: {
    image: "/cards/inspector.png",
    description: "Rend visible les actions d'un joueur",
    price: 2,
    targetPlayer: true,
  },
  7: {
    image: "/cards/neutralize.png",
    description: `Rend à 0 les actions d'un joueur et le bloque pendant ${NEUTRALIZE_TIME} secondes`,
    price: 5,
    targetPlayer: true,
  },
};
