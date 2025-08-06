import { useState } from "react";
import styles from "./create-board.module.css";
import { createBoard } from "@/api/boards";
import { Button } from "@/components/Button";

interface CreateBoardModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const CreateBoardModal = ({ onClose, onCreated }: CreateBoardModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      await createBoard({ title, description });
      onCreated();
      onClose();
    } catch (err) {
      console.error("Failed to create board", err);
      setError("Failed to create board. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title*
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className={styles.cancelButton}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
