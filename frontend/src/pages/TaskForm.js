import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css';

export default function TaskForm(){
  const [form, setForm] = useState({ title:'', description:'', status:'pending' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/tasks/${id}`).then(res => {
        setForm({ 
          title: res.data.title, 
          description: res.data.description, 
          status: res.data.status 
        });
      }).catch(e => setErr(e.response?.data?.message || 'Could not load'));
    }
  }, [id]);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/tasks/${id}`, form);
      } else {
        await api.post('/tasks', form);
      }
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="taskform-page">
      <div className="taskform-card">
        <h2 className="taskform-title">
          {id ? 'Edit Task' : 'Create Task'}
        </h2>

        {err && <div className="error-box">{err}</div>}

        <form className="taskform" onSubmit={submit}>

          <div className="input-group">
            <label>Title</label>
            <input 
              name="title" 
              placeholder="Task title"
              value={form.title} 
              onChange={handle} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea 
              name="description" 
              placeholder="Task description"
              value={form.description} 
              onChange={handle}
            />
          </div>

          <div className="input-group">
            <label>Status</label>
            <select 
              name="status" 
              value={form.status} 
              onChange={handle}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button className="btn submit-btn" type="submit">
            {id ? 'Update Task' : 'Create Task'}
          </button>

        </form>
      </div>
    </div>
  );
}
