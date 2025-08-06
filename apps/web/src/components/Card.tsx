import React from "react";
import styles from "./card.module.css";
import { Draggable } from "react-beautiful-dnd";

interface CardProps {
  _id: string;
  title: string;
  description?: string;
  assignee?: string;
}

interface Props {
  card: CardProps;
  index: number;
  listId: string;
}

const Card: React.FC<Props> = ({ card, index }) => {
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            backgroundColor: snapshot.isDragging ? "#e0e0e0" : "transparent",
            ...provided.draggableProps.style,
          }}
        >
          <h3 className={styles.cardTitle}>{card.title}</h3>
          {card.description && (
            <p className={styles.cardDescription}>{card.description}</p>
          )}
          <small className={styles.cardAssignee}>
            {card.assignee ? `Assignee: ${card.assignee}` : "Unassigned"}
          </small>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
