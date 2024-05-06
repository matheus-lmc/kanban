import Header from "./components/Header";
import Board from "./components/Board";
import Card from "./components/Card";
import { useCards } from "./contexts/cards";

import "./App.css";
import { useMemo } from "react";

function App() {
  const { cards } = useCards();

  const [todoCards, progressCards, doneCards] = useMemo(() => {
    const todoCards = cards.filter((e) => e.type == "TODO");
    const progressCards = cards.filter((e) => e.type == "PROGRESS");
    const doneCards = cards.filter((e) => e.type == "DONE");

    return [todoCards, progressCards, doneCards];
  }, [cards]);

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="grid">
          <Board color="purple" header="Todo" type="TODO">
            {todoCards.map((e) => (
              <Card key={e.id} card={e} />
            ))}
          </Board>
          <Board color="blue" header="In Progress" type="PROGRESS">
            {progressCards.map((e) => (
              <Card key={e.id} card={e} />
            ))}
          </Board>
          <Board color="green" header="Done" type="DONE">
            {doneCards.map((e) => (
              <Card key={e.id} card={e} />
            ))}
          </Board>
        </div>
      </div>
    </div>
  );
}

export default App;
