import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/TaskForm.css';

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '', status: 'pending', dueDate: '', category: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to create a task.');
            return;
        }

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                navigate('/tasks');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to create task');
            }
        } catch (err) {
            setError('Error creating task. Please try again.');
            console.error('Error creating task:', err);
        }
    };

    return (
        <div className="task-form-container">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="task-form" >
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="text"
                        placeholder="Title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                    />
                    <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={task.category}
                        onChange={(e) => setTask({ ...task, category: e.target.value })}
                        required
                    />
                    <button type="submit" className="task-button">Create Task</button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;