import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 6; // Change this to 6

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            console.log('Fetching posts for page:', currentPage);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts.php?page=${currentPage}`);
                console.log('Response data:', response.data);
                // Assuming the backend wraps posts in a 'posts' field and provides 'totalPosts'
                setPosts(response.data.posts);
                setTotalPosts(response.data.totalPosts);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load recipes.');
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const totalPages = Math.ceil(totalPosts / postsPerPage);
    console.log('Total pages:', totalPages);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log('Navigating to previous page:', currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log('Navigating to next page:', currentPage + 1);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Recipes</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {isLoading ? (
                    <p>Loading posts...</p>
                ) : posts.length ? (
                    posts.map(post => (
                        <div className="col-md-6" key={post.id}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">By {post.name} on {new Date(post.publish_date).toLocaleDateString()}</p>
                                    <Link to={`/post/${post.id}`} className="btn btn-danger">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Recipes Available.</p>
                )}
            </div>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={goToPreviousPage}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={goToNextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PostList;
