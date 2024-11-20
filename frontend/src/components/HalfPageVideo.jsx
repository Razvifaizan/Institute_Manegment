import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // Import the function from date-fns
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import defaultimg from "../../public/lecture/default.jpg";


function HalfPageVideo() {
    const data = useSelector(state => state.userCart.value);
    const location = useLocation();
    const com = useRef();

    const initialVideo = {
        videoUrl: location.state?.videoUrl || "",
        videoName: location.state?.videoName || "",
        adminImg: location.state?.adminImg || "",
        adminName: location.state?.adminName || "",
        productId: location.state?.productId || "",
        likes: location.state?.videoLike || 0,
        videoDescription: location.state?.videoDescription || "",
    };

    const [currentVideo, setCurrentVideo] = useState(initialVideo);
    const [subsequentVideos, setSubsequentVideos] = useState(location.state?.subsequentVideos || []);
    const [likeError, setLikeError] = useState("");
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false); // State for comment visibility

    useEffect(() => {
        viewComment();
    }, [currentVideo]);

    const viewComment = async () => {
        try {
            var obj = {
                productId: currentVideo.productId
            };
            var response = await WebServise.postAPICall(WebAPI.viewCumment, data.token, obj);
            console.log(response.data.comments);
            setComments(response.data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const addComment = async (event) => {
        event.preventDefault();

        try {
            var obj = {
                productId: currentVideo.productId,
                user: data.name,
                text: com.current.value,
                user_Img: data.User_Icon // Match this with backend key name
            };
            console.log(data.User_Icon);

            var response = await WebServise.postAPICall(WebAPI.addCumment, data.token, obj);
            console.log("Response comments:", response.data.comments);

            setComments(response.data.comments);
            com.current.value = ""; // Clear the input after submission
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const likeProduct = async (productId, token) => {
        try {
            const response = await WebServise.putAPIs(`${WebAPI.likeProduct}/${productId}/like`, data.token);
            console.log("Product liked successfully", response.data);
            return response.data.likes;
        } catch (error) {
            console.error("Error liking product:", error);
            setLikeError(error.response?.data?.message || "Error liking product");
            throw error;
        }
    };

    const handleLikeClick = async () => {
        try {
            setLikeError(""); // Clear any previous error message
            const updatedLikes = await likeProduct(currentVideo.productId, data.token);
            setCurrentVideo(prevVideo => ({ ...prevVideo, likes: updatedLikes }));
        } catch (error) {
            console.error("Error liking product:", error);
        }
    };

    const handleVideoClick = (video) => {
        const updatedSubsequentVideos = [
            ...subsequentVideos,
            { 
                _id: currentVideo.productId,
                product_image: currentVideo.videoUrl.split('/lecture/')[1], 
                product_name: currentVideo.videoName, 
                product_description: currentVideo.videoDescription,
                likes: currentVideo.likes // Add likes to the subsequent videos
            }
        ];

        const filteredVideos = updatedSubsequentVideos.filter(v => v._id !== video._id);

        setCurrentVideo({
            videoUrl: `/lecture/${video.product_image}`,
            videoName: video.product_name,
            adminImg: currentVideo.adminImg,
            adminName: currentVideo.adminName,
            productId: video._id,
            likes: video.likes, // Set the likes from the clicked video
            videoDescription: video.product_description
        });

        setSubsequentVideos(filteredVideos);
    };

    const toggleCommentsVisibility = () => {
        setShowComments(prev => !prev); // Toggle comment visibility
    };

    console.log(currentVideo.videoDescription);

    return (
        <div className="half-page-video">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 p-0">
                        <div className="video-section">
                            <div className="video-holder">
                                <video src={currentVideo.videoUrl} controls style={{ width: '90%' }} />
                            </div>
                            <div className="dis-box">
                                <h2 className="m-0">{currentVideo.videoName}</h2>
                                <div className="d-flex tec-box mt-2">
                                    <div className="d-flex align-items-center">
                                        <img src={currentVideo.adminImg} width={"60px"} height={"60px"} alt="" />
                                        <h4 className="m-0">{currentVideo.adminName}</h4>
                                    </div>
                                    <p className="">{currentVideo.videoDescription}</p>
                                    <div className="like d-flex" onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                                        <div className="like-section d-flex">
                                            <i className="far fa-thumbs-up" style={{ color: "black", fontSize: "24px" }} aria-hidden="true"></i>
                                            <div className="like-nu ps-2">{currentVideo.likes}</div>
                                        </div>
                                        <div className="dis-like-section">
                                            <i className="far fa-thumbs-down" style={{ color: "black", fontSize: "24px" }}></i>
                                        </div>
                                    </div>
                                </div>
                                {likeError && <p className="error-message text-danger">{likeError}</p>}
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="comments-section mt-4">
                            <h3>Comments</h3>
                            <button onClick={toggleCommentsVisibility} className="btn">
                                {showComments ? "Hide Comments" : "Show Comments"}
                            </button>
                            {showComments && (
                                <>
                                    <form onSubmit={addComment}>
                                        <input type="text" ref={com} placeholder="Add a comment..." />
                                        <button className="btn" type="submit">Send Comment</button>
                                    </form>
                                    {comments.length > 0 ? (
                                        comments.map((comment, index) => (
                                            <div key={index} className="comment mb-4">
                                                <p className="m-0">
                                                    <i>{formatDistanceToNow(new Date(comment.date))} ago</i>
                                                </p> {/* Display relative time */}
                                                <div className="d-flex">
                                                    <img 
                                                        src={comment.user_Img ? `/userIcon/${comment.user_Img}` : defaultimg} // Use defaultimg if user_Img is not available
                                                        width={"30px"} 
                                                        height={"30px"} 
                                                        alt={comment.user} 
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                    <p className="m-0 d-flex">
                                                        <strong>{comment.user}:</strong>
                                                        <h4 className="m-0">{comment.text}</h4>
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments available</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="col-md-5 p-0 m-0">
                        <div className="subsequent-videos">
                            {subsequentVideos.length > 0 ? (
                                subsequentVideos.map(video => (
                                    <div key={video._id} className="single-topic text-center mb-30" onClick={() => handleVideoClick(video)} style={{ cursor: 'pointer' }}>
                                        <div className="row">
                                            <div className="v-holder col-md-6">
                                                <video src={`/lecture/${video.product_image}`} style={{ width: '100%' }} />
                                            </div>
                                            <div className="col-md-6">
                                                <h5>{video.product_name}</h5>
                                                <p>{video.product_description}</p>
                                                <p>Likes: {video.likes}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No subsequent videos available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HalfPageVideo;
