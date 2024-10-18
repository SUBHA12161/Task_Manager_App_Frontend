import { useEffect, useState } from 'react';
import { Table, Button, Input, FormGroup, Label, Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import '../assets/css/TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [modal, setModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    const fetchTasks = async (page = 1, limit = pageSize, status = statusFilter, category = categoryFilter) => {
        const token = localStorage.getItem('token');
        try {
            const queryParams = new URLSearchParams({
                page,
                limit,
                ...(status && { status }),
                ...(category && { category }),
            }).toString();

            const response = await fetch(`/api/tasks?${queryParams}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks);
                setTotalPages(data.pagination.totalPages);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    useEffect(() => {
        fetchTasks(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
        fetchTasks(1, pageSize, e.target.value, categoryFilter);
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
        fetchTasks(1, pageSize, statusFilter, e.target.value);
    };

    const toggleModal = () => setModal(!modal);

    const handleUpdateClick = (task) => {
        setCurrentTask(task);
        toggleModal();
    };

    const handleDeleteClick = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchTasks(currentPage, pageSize);
                toast.success('Task removed Successfully.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                console.error('Failed to delete task');
            }
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const handleUpdateTask = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/tasks/${currentTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(currentTask),
            });

            if (response.ok) {
                fetchTasks(currentPage, pageSize);
                toggleModal();
                toast.success('Task updated Successfully.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                console.error('Failed to update task');
            }
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    return (
        <div className="task-list-container mt-3">
            <h2>Your Tasks</h2>
            <div className="filters row mt-2">
                <div className='col-sm-4'>
                    <FormGroup>
                        <Label for="pageSizeSelect">Per Page:</Label>
                        <Input
                            type="select"
                            id="pageSizeSelect"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </Input>
                    </FormGroup>
                </div>
                <div className='col-sm-4'>
                    <FormGroup>
                        <Label for="categoryFilter">Filter by Category</Label>
                        <Input
                            type="text"
                            id="categoryFilter"
                            placeholder="Filter by category"
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                        />
                    </FormGroup>
                </div>

                <div className='col-sm-4'>
                    <FormGroup>
                        <Label for="statusFilter">Filter by Status</Label>
                        <Input
                            type="select"
                            id="statusFilter"
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </Input>
                    </FormGroup>
                </div>
            </div>

            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.category?.name}</td>
                                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <Button color="warning" onClick={() => handleUpdateClick(task)}>Edit</Button>&nbsp;&nbsp;
                                    <Button color="danger" onClick={() => handleDeleteClick(task._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No tasks found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center">
                <div className="pagination-controls">
                    <Pagination>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={handlePreviousPage} />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage >= totalPages}>
                            <PaginationLink next onClick={handleNextPage} />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Update Task</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="taskTitle">Title</Label>
                        <Input
                            type="text"
                            id="taskTitle"
                            value={currentTask.title || ''}
                            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDescription">Description</Label>
                        <Input
                            type="text"
                            id="taskDescription"
                            value={currentTask.description || ''}
                            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskStatus">Status</Label>
                        <Input
                            type="select"
                            id="taskStatus"
                            value={currentTask.status || ''}
                            onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskCategory">Category</Label>
                        <Input
                            type="text"
                            id="taskCategory"
                            value={currentTask.category?.name || ''}
                            onChange={(e) => setCurrentTask({ ...currentTask, category: { name: e.target.value } })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDueDate">Due Date</Label>
                        <Input
                            type="date"
                            id="taskDueDate"
                            value={currentTask.dueDate?.split('T')[0] || ''}
                            onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateTask}>Update Task</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TaskList;