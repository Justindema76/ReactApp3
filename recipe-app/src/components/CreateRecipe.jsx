import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateRecipe() {
    const [title, setTitle] = useState('');
    const [recipe, setContent] = useState('');
    const [name, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); // State for storing the error message

    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        if (!title.trim() || !recipe.trim() || !name.trim()) {
            setError("Please fill in all fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // reset error message on new submission

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-recipe.php`, {
                title,
                recipe,
                name
            });
            console.log(response.data);

            // Reset form fields after successful submission
            setTitle('');
            setContent('');
            setAuthor('');

            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Failed to create recipe. Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create a New Recipe</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Your Recipe Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipe" className="form-label">Recipe</label>
                    <textarea
                        className="form-control"
                        id="recipe"
                        value={recipe}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                        <span>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Creating post...
                        </span>
                    ) : 'Create Recipe'}
                </button>
            </form>
        </div>
    );
}

export default CreateRecipe;
