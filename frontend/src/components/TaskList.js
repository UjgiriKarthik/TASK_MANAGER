import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './TaskList.css';

export default function TaskList({ tasks, onDeleted }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const del = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    onDeleted();
  };

  return (
    <div className="tasklist-container">
      {tasks.length === 0 && (
        <div className="no-task">No tasks found</div>
      )}

      <ul className="tasklist">
        {tasks.map(t => (
          <li key={t._id} className="task-card">
            <div className="task-header">
              <h3 className="task-title">{t.title}</h3>
              <span className={`task-status ${t.status}`}>
                {t.status}
              </span>
            </div>

            <p className="task-desc">{t.description || 'No description provided'}</p>

            <div className="task-by">
              Created by: <b>{t.createdBy?.name || t.createdBy?.email}</b>
            </div>

            <div className="task-actions">
              {(t.createdBy && t.createdBy._id === user.id) || user.role === 'admin' ? (
                <>
                  <Link to={`/tasks/edit/${t._id}`} className="btn small-btn edit-btn">
                    Edit
                  </Link>

                  <button className="btn small-btn delete-btn" onClick={() => del(t._id)}>
                    Delete
                  </button>
                </>
              ) : (
                <div className="no-actions"></div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
