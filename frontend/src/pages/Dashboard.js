// frontend/src/pages/Dashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [meta, setMeta] = useState({});

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // ✔ FIX: UseCallback prevents re-creation of fetchTasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get('/tasks', {
        params: { page, limit, search, status }
      });

      setTasks(res.data.data);
      setMeta({
        total: res.data.total,
        totalPages: res.data.totalPages
      });
    } catch (err) {
      setTasks([]);
      setMeta({});
    }
  }, [page, limit, search, status]);

  // ✔ FIX: ESLint warning gone
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header card">
        <div className="welcome">
          <div className="welcome-title">Welcome</div>
          <div className="welcome-user">
            {user.name || user.email}
            <span className="role-chip">{user.role}</span>
          </div>
        </div>

        <div className="header-actions">
          <Link to="/tasks/new" className="btn create-btn">Create Task</Link>
          <button className="btn ghost-btn logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="controls card">
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search title..."
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); }}
          />

          <select
            className="status-select"
            value={status}
            onChange={(e) => { setPage(1); setStatus(e.target.value); }}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </section>

      <main className="tasks-section">
        <TaskList tasks={tasks} onDeleted={fetchTasks} />
      </main>

      <footer className="pagination card">
        <div className="pager">
          <button
            className="btn ghost-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="page-info">
            Page {page} / {meta.totalPages || 1}
          </span>

          <button
            className="btn ghost-btn"
            disabled={page >= (meta.totalPages || 1)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

        {user.role === 'admin' && (
          <div className="admin-note">(Admin can view & delete all tasks)</div>
        )}
      </footer>
    </div>
  );
}
