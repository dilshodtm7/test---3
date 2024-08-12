import React, { useState } from "react";
import "./style.css";
import Special from "./special.jsx";
import Content from "./content.jsx";

const Task = ({ data,myId, fetchTasks, loading }) => {
  const [activeSection, setActiveSection] = useState("Special");

  return (
    <div className="task-container">
      <div className="task-name-info">
        <div className="task-name">New Missions</div>
        <div className="task-information">Complete Tasks to get rewards</div>
      </div>
      <div className="task-change-buttons">
        <button
          className={`task-change-button ${
            activeSection === "Special" ? "active" : ""
          }`}
          onClick={() => setActiveSection("Special")}
        >
          Special
        </button>
        <button
          className={`task-change-button ${
            activeSection === "Content" ? "active" : ""
          }`}
          onClick={() => setActiveSection("Content")}
        >
          Content
        </button>
      </div>

      {activeSection === "Special" && (
        <Special data={data} myId={myId} fetchTasks={fetchTasks} loading={loading} />
      )}
      {activeSection === "Content" && <Content />}
    </div>
  );
};

export default Task;
