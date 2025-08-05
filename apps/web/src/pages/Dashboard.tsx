import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { fetchUserBoards } from "@/api/boards";
import { Button } from "@/components/Button";
import { Plus, Folder, Calendar, Users, LogOut } from "lucide-react";
import { Link } from "react-router";
import type { Board } from "@/types/board";

const Dashboard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const data = await fetchUserBoards();
        setBoards(data);
      } catch (err) {
        console.error("Error loading boards:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

  const handleCreateBoard = () => {
    console.log("Board creation feature coming soon!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <div className={styles.logoCircle}>
              <Folder className={styles.logoIcon} />
            </div>
            <div>
              <h1 className={styles.title}>Plannr</h1>
              <p className={styles.subtitle}>Welcome back!</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.boardHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Your Boards</h2>
            <p className={styles.sectionSubtitle}>
              Organize your projects and collaborate with your team
            </p>
          </div>
          <Button onClick={handleCreateBoard} variant="hero" size="md">
            <Plus className="w-5 h-5 mr-2" />
            Create Board
          </Button>
        </div>

        {loading ? (
          <p>Loading boards...</p>
        ) : (
          <div className={styles.boardGrid}>
            {boards.map((board) => (
              <Link
                key={board._id}
                to={`/board/${board._id}`}
                className={styles.cardLink}
              >
                <div className={styles.boardCard}>
                  <div className={styles.cardBanner} />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{board.title}</h3>
                    <p className={styles.cardDescription}>
                      {board.description}
                    </p>
                    <div className={styles.cardMeta}>
                      <div className={styles.metaItem}>
                        <Users className="w-4 h-4 mr-1" />{" "}
                        {board.members?.length ?? 1}
                      </div>
                      <div className={styles.metaItem}>
                        <Calendar className="w-4 h-4 mr-1" /> Last updated:{" "}
                        {new Date(board.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <div onClick={handleCreateBoard} className={styles.createCard}>
              <div className={styles.createCardContent}>
                <div className={styles.createIcon}>
                  <Plus />
                </div>
                <h3>Create New Board</h3>
                <p>Start a new project and invite your team</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
