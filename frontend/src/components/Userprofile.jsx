import { useSelector, useDispatch } from "react-redux";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { useEffect, useRef, useState } from "react";
import defaultImg from "../assets/Images/default.jpg";
import { updateUser, updateProfileImage } from '../Redux/Slice.jsx'; // Redux actions

function UserProfile() {
    const [userDetails, setUserDetails] = useState({});
    const pic = useRef();
    const data = useSelector((state) => state.userCart.value);
    const [profileImage, setProfileImage] = useState(defaultImg);
    const [imageKey, setImageKey] = useState(Date.now());
    const [showImageModal, setShowImageModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        loginUserInfo();
    }, []);

    // Fetch user info
    const loginUserInfo = async () => {
        try {
            const response = await WebServise.getAPICall(WebAPI.LoginUserInfo, data.token);
            if (response.data.status) {
                const user = response.data.user;
                setUserDetails(user);
                const userImage = user.user_image;
                if (userImage && /\.(jpg|png|svg)$/.test(userImage)) {
                    setProfileImage(`/userIcon/${userImage}`);
                } else {
                    setProfileImage(defaultImg);
                }
            }
        } catch (error) {
            console.error("Failed to fetch user info", error);
        }
    };

    // Update user image
    const updateUserImage = async (imageFile) => {
        const fdata = new FormData();
        fdata.append("user_image", imageFile);

        try {
            const response = await WebServise.putAPICall(WebAPI.ChangeUserPic, data.token, fdata);
            return response.data;
        } catch (error) {
            console.error("Error uploading image", error);
            return null;
        }
    };

   
    // Handle image preview and submission
    const handleImageChange = () => {
        const userpic = pic.current.files[0];
        if (userpic) {
            const imageUrl = URL.createObjectURL(userpic);
            setProfileImage(imageUrl);
        }
    };

    const handleImageSubmit = async (event) => {
        event.preventDefault();
        const userpic = pic.current.files[0];

        if (userpic) {
            const updatedUser = await updateUserImage(userpic);
            if (updatedUser) {
                const newUserImage = updatedUser.user.user_image;
                dispatch(updateProfileImage(newUserImage)); // Update Redux store
                setProfileImage(`/userIcon/${newUserImage}`);
            }
        } else {
            console.log("No image selected.");
        }
    };

    return (
        <>
            <div className="student-profile py-4">
                <div className="container">
                    <div className="row g-4">
                        {/* Profile Card */}
                        <div className="col-lg-4">
                            <div className="card shadow-lg border-0 rounded-lg">
                                <div className="card-header bg-primary text-center text-white position-relative">
                                    <img
                                        key={imageKey}
                                        src={profileImage}
                                        alt={userDetails.name}
                                        className="rounded-circle border border-3 border-white shadow-sm profile-image"
                                        width={100}
                                        onClick={() => setShowImageModal(true)}
                                    />
                                    <h4 className="mt-2 mb-0">{userDetails.name}</h4>
                                    <small className="text-light">ID: 321000001</small>
                                </div>
                                <div className="card-body">
                                    <p><strong>Class:</strong> 4</p>
                                    <p><strong>Section:</strong> A</p>
                                </div>
                            </div>
                        </div>

                        {/* General Information and Forms */}
                        <div className="col-lg-8">
                            <div className="card shadow-lg border-0 rounded-lg">
                                <div className="card-header bg-transparent border-bottom">
                                    <h4 className="mb-0"><i className="fas fa-info-circle me-2"></i>General Information</h4>
                                </div>
                                <div className="card-body">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <th width="30%">Role</th>
                                                <td>{userDetails.role}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">E-Mail</th>
                                                <td>{userDetails.email}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Mobile</th>
                                                <td>{userDetails.mobile}</td>
                                            </tr>
                                            <tr>
                                                <th width="30%">Address</th>
                                                <td>{userDetails.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                           

                            {/* Update Profile Picture Form */}
                            <div className="mt-4 p-3 rounded bg-light">
                                <form id="form2" onSubmit={handleImageSubmit}>
                                    <input
                                        type="file"
                                        ref={pic}
                                        className="d-none" // Hides the file input
                                        onChange={handleImageChange} // Call preview function on file select
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 shadow"
                                        onClick={() => pic.current.click()} // Triggers file input on button click
                                    >
                                        Select Profile Picture
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 shadow mt-2"
                                        disabled={!pic.current || !pic.current.files[0]} // Disable if no file selected
                                    >
                                        Update Profile Picture
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {showImageModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Profile Picture</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowImageModal(false)}></button>
                                </div>
                                <div className="modal-body text-center">
                                    <img src={profileImage} alt={userDetails.name} className="img-fluid rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserProfile;
