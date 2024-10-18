// src/components/Navbar.js
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../assets/css/Navbar.css';

const MyNavbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" exact>Task Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={NavLink} to="/new/tasks" activeClassName="active">Add Task</Nav.Link>
                                <Nav.Link as={NavLink} to="/tasks" activeClassName="active">View Tasks</Nav.Link>
                                <Nav.Link as={NavLink} to="/new/categories" activeClassName="active">Add Category</Nav.Link>
                                <Nav.Link as={NavLink} to="/categories" activeClassName="active">View Categories</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" activeClassName="active">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/signup" activeClassName="active">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {isLoggedIn && (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;