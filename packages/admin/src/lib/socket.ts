import { SocketMessageType } from "@shared/types/Socket";
import { ScraperType } from "@shared/types";
import { io } from "socket.io-client";

const socket = io(
  `${window.location.protocol}//${window.location.hostname}:8070`,
);

export const startScraper = (scraperType: ScraperType) => {
  socket.emit(SocketMessageType.START_SCRAPER, scraperType);
};
