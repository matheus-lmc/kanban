import { ChangeEvent, useMemo } from "react";
import { MdOutlineDeleteForever, MdCalendarMonth } from "react-icons/md";

import TextArea from "../Textarea";

import "./styles.css";
import { ICard, useCards } from "../../contexts/cards";

function Card({ card }: { card: ICard }) {
  const { removeCard, updateCard } = useCards();

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    updateCard({
      ...card,
      text: e.target.value,
    });
  }

  const formattedDate = useMemo(
    () =>
      new Date(card.createdAt).toLocaleDateString("pt-BR", {
        weekday: undefined,
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [card]
  );

  return (
    <div
      className="card-container"
      onDragStart={(e) => e.dataTransfer.setData("card_id", card.id)}
      onDragOver={(e) => e.stopPropagation()}
      draggable
    >
      <div className="card-content">
        <TextArea
          className="card-text"
          stateValue={card.text}
          onChange={handleInputChange}
          defaultValue={card.text}
        />
        <MdOutlineDeleteForever size={24} onClick={() => removeCard(card.id)} />
      </div>
      <div className="card-footer" style={{ backgroundColor: card.color }}>
        <MdCalendarMonth />
        {formattedDate}
      </div>
    </div>
  );
}

export default Card;
