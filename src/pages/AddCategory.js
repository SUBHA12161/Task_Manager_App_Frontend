import { useState } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../assets/css/CategoryList.css';

const AddCategory = () => {
    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState('');

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://task-manager-app-backend-neon.vercel.app/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newCategory }),
            });

            if (response.ok) {
                setNewCategory('');
                toast.success('Category Added Successfully.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate('/categories');
                }, 2000);
            } else {
                console.error('Failed to create category');
            }
        } catch (err) {
            console.error('Error creating category:', err);
        }
    };
    return (
        <div className="category-list-container mt-5 mb-5">
            <h2>Add Categories</h2>
            <Form onSubmit={handleCreateCategory} className="create-category-form">
                <FormGroup>
                    <Label for="newCategory">Add New Category</Label>
                    <Input
                        type="text"
                        id="newCategory"
                        value={newCategory}
                        placeholder="Enter category name"
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Add
                </Button>
            </Form>
        </div>
    )
}

export default AddCategory