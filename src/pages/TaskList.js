import { useEffect, useState } from 'react';
import { Table, Button, Input, FormGroup, Label, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../assets/css/TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

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

    return (
        <div className="task-list-container">
            <h2>Your Tasks</h2>
            <div className="filters">
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

                <FormGroup>
                    <Label for="pageSizeSelect">Per Page:</Label>
                    <Input
                        type="select"
                        id="pageSizeSelect"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </Input>
                </FormGroup>
            </div>

            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Due Date</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No tasks found</td>
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
        </div>
    );
};

export default TaskList;