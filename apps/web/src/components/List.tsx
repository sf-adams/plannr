import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import styles from "@/pages/board.module.css";
import { getCardsByList } from "@/api/cards";
import Card from "@/components/Card";
import { Droppable } from "react-beautiful-dnd";

interface Card {
  _id: string;
  title: string;
  description?: string;
  priority?: string;
  assignee?: string;
}

interface ListProps {
  listId: string;
  title: string;
}

const List: React.FC<ListProps> = ({ listId, title }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        const data = await getCardsByList(listId);
        setCards(data);
        setError(null);
      } catch (err) {
        setError("Failed to load cards");
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, [listId]);

  const handleAddCard = () => {
    alert(`Add Card to list ${listId} feature coming soon!`);
  };

  return (
    <div className={styles.list}>
      <h2 className={styles.listTitle}>{title}</h2>

      {loading && <p>Loading cards...</p>}
      {error && <p>{error}</p>}

      <Droppable
        droppableId={listId}
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            className={styles.cards}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card, index) => (
              <Card key={card._id} card={card} index={index} listId={listId} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button className={styles.addCardButton} onClick={handleAddCard}>
        <Plus size={14} />
        <span style={{ marginLeft: 6 }}>Add Card</span>
      </button>
    </div>
  );
};

export default List;
