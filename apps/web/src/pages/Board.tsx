import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Settings, MoreHorizontal, Plus } from "lucide-react";
import styles from "./board.module.css";
import List from "@/components/List";
import { fetchBoardById } from "@/api/boards";
import { moveCard } from "@/api/cards";
import { getListsByBoard } from "@/api/lists";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface Board {
  id: string;
  title: string;
  description?: string;
  color?: string;
}

interface ListType {
  _id: string;
  title: string;
}

const Board: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const fromListId = source.droppableId;
    const toListId = destination.droppableId;
    const toIndex = destination.index;

    if (fromListId === toListId && source.index === toIndex) return;

    try {
      await moveCard(draggableId, toListId, toIndex);
      const listsData = await getListsByBoard(id!);
      setLists(listsData);
    } catch (err) {
      console.error("Card move failed", err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const boardData = await fetchBoardById(id!);
        const listsData = await getListsByBoard(id!);
        setBoard(boardData);
        setLists(listsData);
        setError(null);
      } catch (err) {
        setError("Failed to load board or lists");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleAddList = () => {
    alert("Add List feature coming soon!");
  };

  if (loading) return <p>Loading board...</p>;
  if (error) return <p>{error}</p>;
  if (!board) return <p>Board not found</p>;

  return (
    <div className={styles.boardPage}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backButton}>
            <ArrowLeft size={16} />
            <span style={{ marginLeft: 6 }}>Back to Dashboard</span>
          </Link>
          <div
            className={styles.boardColor}
            style={{ backgroundColor: board.color || "#5A67D8" }}
          />
          <div>
            <h1 className={styles.boardTitle}>{board.title}</h1>
            <p className={styles.boardDescription}>{board.description}</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.button}>
            <Settings size={16} />
          </button>
          <button className={styles.button}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </header>

      <main className={styles.boardContent}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.listsContainer}>
            {lists.map((list) => (
              <List key={list._id} listId={list._id} title={list.title} />
            ))}

            <div className={styles.addList}>
              <button onClick={handleAddList} className={styles.addListButton}>
                <Plus size={16} />
                <span style={{ marginLeft: 6 }}>Add a list</span>
              </button>
            </div>
          </div>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Board;
