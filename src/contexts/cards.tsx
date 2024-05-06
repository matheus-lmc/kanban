import { createId } from "@paralleldrive/cuid2";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CardType = "TODO" | "PROGRESS" | "DONE";
const COLORS = ["#00ABA9", "#F0A30A", "#AA00FF", "#E51400"] as const;

export interface ICard {
  id: string;
  type: CardType;
  text: string;
  createdAt: Date;
  color: (typeof COLORS)[number];
}

interface ICardsContext {
  createCard(type: CardType): ICard;
  removeCard(id: string): void;
  updateCard(updatedCard: ICard): void;
  updateType(id: string, type: CardType): void;
  cards: ICard[];
}

const CardsContext = createContext<ICardsContext | null>(null);

interface ICardsContextProps {
  children?: ReactNode;
}

const CardsProvider = ({ children }: ICardsContextProps) => {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    const savedCards = localStorage.getItem("@cards");

    if (savedCards) setCards(JSON.parse(savedCards) as ICard[]);
  }, []);

  const save = (items: ICard[]) =>
    localStorage.setItem("@cards", JSON.stringify(items));

  function createCard(type: CardType) {
    const newCard = {
      id: createId(),
      type,
      text: "New card",
      createdAt: new Date(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setCards([...cards, newCard]);

    save([...cards, newCard]);

    return newCard;
  }

  function removeCard(id: string) {
    const updatedCards = cards.filter((e) => e.id !== id);

    setCards(updatedCards);

    save(updatedCards);
  }

  function updateCard(updatedCard: ICard) {
    const newCards = cards.map((e) => {
      if (e.id === updatedCard.id) return updatedCard;
      return e;
    });

    setCards(newCards);

    save(newCards);
  }

  function updateType(id: string, type: CardType) {
    const newCards = cards.map((e) => {
      if (e.id === id)
        return {
          ...e,
          type: type,
        };
      return e;
    });

    setCards(newCards);
    save(newCards);
  }

  return (
    <CardsContext.Provider
      value={{ createCard, cards, removeCard, updateCard, updateType }}
    >
      {children}
    </CardsContext.Provider>
  );
};

const useCards = (): ICardsContext => {
  const context = useContext(CardsContext);

  if (!context) throw new Error("Context not initialized");

  return context;
};

export { CardsProvider, useCards };
