import { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import '../assets/css/CategoryList.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://task-manager-app-backend-neon.vercel.app/api/categories', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://task-manager-app-backend-neon.vercel.app/api/categories/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setCategories(categories.filter((category) => category._id !== id));
                toast.success('Category removed Successfully.', {
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
                alert('Failed to delete category');
            }
        } catch (err) {
            alert('Error deleting category:', err);
        }
    };

    return (
        <div className="category-list-container mt-5 mb-5">
            <h2>Your Categories</h2>

            {categories.length > 0 ? (
                <ListGroup className="category-list">
                    {categories.map((category) => (
                        <ListGroupItem key={category._id} className="category-item d-flex justify-content-between align-items-center">
                            <span>{category.name}</span>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDeleteCategory(category._id)}
                            >
                                Delete
                            </Button>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default CategoryList;