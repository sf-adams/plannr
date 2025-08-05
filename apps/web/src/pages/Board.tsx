import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchBoardById } from "@/api/boards";
import styles from "./board.module.css";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import type { Board } from "@/types/board";

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadBoard = async () => {
      try {
        const data = await fetchBoardById(id);
        setBoard(data);
      } catch (err) {
        console.error("Failed to load board", err);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    loadBoard();
  }, [id, navigate]);

  if (loading) return <p>Loading board...</p>;
  if (!board) return <p>Board not found</p>;

  return (
    <div className={styles.boardPage}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft /> Back to Dashboard
      </Button>
      <h1>{board.title}</h1>
      <p>{board.description}</p>
    </div>
  );
};

export default BoardPage;
