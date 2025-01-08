import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [ipAddress, setIpAddress] = useState("");

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/post.php?id=${id}`);
            const post = response.data.data;
            setPost(post);
            setLikeCount(post.likes);
            setDislikeCount(post.dislikes);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchIpAddress = async () => {
        try {
            const response = await axios.get("https://api.ipify.org/?format=json");
            setIpAddress(response.data.ip);
        } catch (error) {
            console.error(error);
        }
    };

    const handleVote = async (type) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/post.php/${id}/${type}`, { ip: ipAddress });
            if (type === "like") {
                setLikeCount(likeCount + 1);
            } else {
                setDislikeCount(dislikeCount + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchIpAddress();
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    // Split the recipe into an array if it’s a string
    const recipeSteps = Array.isArray(post.recipe)
        ? post.recipe
        : post.recipe.split("\n").filter(step => step.trim() !== "");

    return (
        <div className="container my-4">
            <h1 className="mb-4">{post.title}</h1>
            <h2 className="text-uppercase">Ingredients</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {recipeSteps.map((step, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>{step}</li>
                ))}
            </ul>
            <hr />
            <div className="d-flex justify-content-between">
                <div>
                  
                </div>
                <div>
                    <small className="text-muted">
                        Posted by {post.name} on {post.date}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Post;
