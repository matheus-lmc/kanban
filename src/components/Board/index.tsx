import { DragEvent, ReactNode } from "react";

import "./styles.css";
import { useCards, CardType } from "../../contexts/cards";

interface IBoardProps {
  children?: ReactNode;
  header: string;
  color: "purple" | "blue" | "green";
  type: CardType;
}

const Board = ({ header, children, color, type }: IBoardProps) => {
  const { updateType, createCard } = useCards();

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const cardId = e.dataTransfer.getData("card_id");
    updateType(cardId, type);
  }

  function handleCreateNew() {
    createCard(type);
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="board-container"
    >
      <h2 id={color}>{header}</h2>
      {children}
      <div className="button-container">
        <button className="new-card" onClick={handleCreateNew}>
          +
        </button>
      </div>
    </div>
  );
};

export default Board;
