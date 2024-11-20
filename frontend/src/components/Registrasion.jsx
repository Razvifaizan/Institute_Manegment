import React, { useState } from 'react';
import webservise from '../service/WebServise';
import WebAPI from '../service/WebAPI';
import "../assets/style/reg.css";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fname: '',
        lname: '',
        mobile: '',
        address: '',
        user_image: null,  // Default value is null
        role: 'student',  // Default role set as 'student'
    });

    const [msg, setMsg] = useState('');
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // Reset file input key

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' && files.length > 0 ? files[0] : value  // Handle file inputs separately
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", `${formData.fname} ${formData.lname}`);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("mobile", formData.mobile);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("role", formData.role);

        // If no user image is provided, append a default image URL
        if (formData.user_image) {
            formDataToSend.append("user_image", formData.user_image);
        } else {
            formDataToSend.append("user_image", "https://via.placeholder.com/150");  // Fallback default image
        }

        try {
            const response = await webservise.postAPI(WebAPI.registerAPI, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status) {
                navigate("/login");
            } else {
                const message = response.data.message;
                setMsg(message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMsg("An error occurred during registration.");
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const resetFileInput = () => {
        setFileInputKey(Date.now());  // Reset the file input field by changing its key
    };

    return (
        <div className="container-fluid re-form">
            <div className="row justify-content-center g-back">
                <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                    <div className="card px-3 pt-4 pb-2 mt-3 mb-3">
                        <h2 id="heading">Sign Up Your Student Account</h2>

                        <form id="msform" onSubmit={handleSubmit}>
                            <ul id="progressbar">
                                <li className={step >= 1 ? "active" : ""} id="account"><strong>Account</strong></li>
                                <li className={step >= 2 ? "active" : ""} id="personal"><strong>Personal</strong></li>
                                <li className={step >= 3 ? "active" : ""} id="image"><strong>Image</strong></li>
                                <li className={step >= 4 ? "active" : ""} id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width: `${(step / 4) * 100}%` }}></div>
                            </div>
                            <br />

                            {step === 1 && (
                                <fieldset>
                                    <div className="form-card">
                                        <label className="fieldlabels">Email: *</label>
                                        <input className="regform" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id" required />
                                        <label className="fieldlabels">Password: *</label>
                                        <input className="regform" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                                        <label className="fieldlabels">Confirm Password: *</label>
                                        <input className="regform" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                                    </div>
                                    <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />
                                </fieldset>
                            )}
                            {step === 2 && (
                                <fieldset>
                                    <div className="form-card">
                                        <label className="fieldlabels">First Name: *</label>
                                        <input className="regform" type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required />
                                        <label className="fieldlabels">Last Name: *</label>
                                        <input className="regform" type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required />
                                        <label className="fieldlabels">Contact No.: *</label>
                                        <input className="regform" type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Contact No." required />
                                    </div>
                                    <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />
                                    <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                            {step === 3 && (
                                <fieldset>
                                    <div className="form-card">
                                        <label className="fieldlabels">Upload Your Photo:</label>
                                        <input 
                                            className="regform" 
                                            type="file" 
                                            name="user_image" 
                                            key={fileInputKey}  // Reset file input field if needed
                                            onChange={handleChange} 
                                        />
                                        <label className="fieldlabels">Address: *</label>
                                        <input 
                                            className="regform" 
                                            type="text" 
                                            name="address" 
                                            value={formData.address} 
                                            onChange={handleChange} 
                                            placeholder="Address" 
                                            required 
                                        />
                                    </div>
                                    <input type="button" name="next" className="next action-button" value="Next" onClick={nextStep} />
                                    <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                            {step === 4 && (
                                <fieldset>
                                    <div className="form-card">
                                        <h2 className="fs-title text-center">Success!</h2>
                                        <p className="text-center">You are ready to go!</p>
                                    </div>
                                    <input type="submit" name="next" className="next action-button" value="Finish" />
                                    <input type="button" name="previous" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                            {msg && <p className="error-message">{msg}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
