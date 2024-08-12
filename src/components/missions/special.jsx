import React, { useEffect, useState } from "react";
import { FaTelegram } from "react-icons/fa";
import withIcon from "../../assets/loader5.gif";

const special = ({ data,myId, fetchTasks, loading }) => {
  const Complate = "https://myname-6g8f.onrender.com/auth/complate";

  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [clickedMe, setClickedMe] = useState(localStorage.getItem("task"));
  const [buttonState, setButtonState] = useState("CLAIM");

  useEffect(() => {
    if (loading) {
      setTasks(data.uncomplated);
      setCompletedTasks(data.complated);
    }
  });

  const ComplateTasks = async () => {
    try {
      const response = await fetch(Complate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_tg: myId.toString(),
          task_id: newPost,
        }),
      });

      if (response.ok) {
        console.log("Account data updated successfully");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  useEffect(() => {
    if (newPost !== null) {
      const timer = setTimeout(() => {
        localStorage.setItem("task", newPost);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newPost]);

  const handleStartClick = () => {
    setButtonState("Wait");
    setTimeout(() => {
      // window.location.href = "https://t.me/aviabot_store";
    }, 1000);
    setTimeout(() => {
      setButtonState("Claim");
    }, 3000);
  };

  useEffect(() => {
    setInterval(() => {
      setClickedMe(localStorage.getItem("task"));
    }, 1000);
  });

  const checkTask = () => {
    console.log("hello");
    ComplateTasks();
    fetchTasks();
  };

  return (
    <>
      {loading === false ? (
        <>
          <img src={withIcon} className="loader-img" alt="" />
          <div class="loader"></div>
        </>
      ) : (
        <>
          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-list-item" id="task" key={task.id}>
                <div className="task-list-image">
                  <FaTelegram className="task-list-image-icon" />
                </div>
                <div className="task-info">
                  <div className="task-list-name">
                    <div className="task-list-name-title">{task.title}</div>
                    <div className="task-list-name-subtitle">
                      {task.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, "  ") || 0}{" "}
                      Winnie
                    </div>
                  </div>
                  <div className="task-list-status">
                    {clickedMe == task.id ? (
                      <button
                        className="task-list-status-button"
                        id="start"
                        onClick={checkTask}
                      >
                        {buttonState || "Wait"}
                      </button>
                    ) : (
                      <>
                        <button
                          className="task-list-status-button active-btn"
                          id="start"
                          onClick={() => {
                            localStorage.setItem("task", task.id);
                            setNewPost(task.id);
                            localStorage.setItem("amount", task.amount);
                            handleStartClick();
                          }}
                        >
                          START
                        </button>
                        <button
                          className="task-list-status-button completed"
                          id="claimed"
                          hidden
                        >
                          Wait
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
           {
            completedTasks? 
           <> <hr className="task-hr" />
            {completedTasks.map((task) => (
              <div className="task-list-item " key={task.id}>
                <div className="task-list-image">
                  <FaTelegram className="task-list-image-icon" />
                </div>
                <div className="task-info">
                  <div className="task-list-name">
                    <div className="task-list-name-title title-complated ">
                      {task.title}
                    </div>
                    <div className="task-list-name-subtitle title-complated">
                      {task.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, "  ") || 0}{" "}
                      Winnie
                    </div>
                  </div>
                  <div className="task-list-status">
                    <button className="task-list-status-button completed">
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </> : null
           }
          </div>
        </>
      )}
    </>
  );
};

export default special;
