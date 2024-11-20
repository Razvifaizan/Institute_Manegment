import React, { useState } from 'react';
import webservise from '../service/WebServise';
import WebAPI from '../service/WebAPI';
import "../assets/style/reg.css";
import { useNavigate } from 'react-router-dom';
import defaulttiming from '../assets/Images/default.jpg'; // Import the default image

const TeacherRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        role: "",
        email: '',
        password: '',
        confirmPassword: '',
        fname: '',
        lname: '',
        mobile: '',
        address: '',
        user_icon: null,
    });
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("role", formData.role);
        formDataToSend.append("name", `${formData.fname} ${formData.lname}`);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("mobile", formData.mobile);
        formDataToSend.append("user_icon", formData.user_icon || defaulttiming); // Ensures proper image handling // Use default image if none is uploaded
        formDataToSend.append("address", formData.address);

        try {
            const response = await webservise.postAPI(WebAPI.TeacherRegister, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.status) {
                navigate("/login");
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMsg("An error occurred during registration.");
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="container-fluid re-form">
            <div className="row justify-content-center g-back">
                <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                    <div className="card px-3 pt-4 pb-2 mt-3 mb-3">
                        <h2 id="heading">Sign Up Your Teacher Account</h2>

                        <form id="msform" onSubmit={handleSubmit}>
                            <ul id="progressbar">
                                <li className={step >= 1 ? "active" : ""} id="account"><strong>Role</strong></li>
                                <li className={step >= 2 ? "active" : ""} id="account"><strong>Account</strong></li>
                                <li className={step >= 3 ? "active" : ""} id="personal"><strong>Personal</strong></li>
                                <li className={step >= 4 ? "active" : ""} id="payment"><strong>Image</strong></li>
                                <li className={step >= 5 ? "active" : ""} id="confirm"><strong>Finish</strong></li>
                            </ul>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width: `${(step / 5) * 100}%` }}></div>
                            </div> 
                            <br />
                            {step === 1 && (
                                <fieldset>
                                    <div className="form-card">
                                        <h2 className="fs-title">Account Information:</h2>
                                        <label className="fieldlabels">Email: *</label>
                                        <input className="regform" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Id" required />
                                        <label className="fieldlabels">Password: *</label>
                                        <input className="regform" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                                        <label className="fieldlabels">Confirm Password: *</label>
                                        <input className="regform" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                                    </div>
                                    <input type="button" className="next action-button" value="Next" onClick={nextStep} />
                                    <input type="button" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                            {step === 2 && (
                                <fieldset>
                                    <div className="form-card">
                                        <h2 className="fs-title">Personal Information:</h2>
                                        <label className="fieldlabels">First Name: *</label>
                                        <input className="regform" type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required />
                                        <label className="fieldlabels">Last Name: *</label>
                                        <input className="regform" type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required />
                                        <label className="fieldlabels">Contact No.: *</label>
                                        <input className="regform" type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Contact No." required />
                                    </div>
                                    <input type="button" className="next action-button" value="Next" onClick={nextStep} />
                                    <input type="button" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                            {step === 3 && (
                                <fieldset>
                                    <div className="form-card">
                                        <h2 className="fs-title">Image Upload:</h2>
                                        <label className="fieldlabels">Upload Your Photo:</label>
                                        <input 
                                            className="regform" 
                                            type="file" 
                                            name="user_icon" 
                                            onChange={handleChange} 
                                        />
                                        <img 
                                            src={formData.user_icon ? URL.createObjectURL(formData.user_icon) : defaulttiming} 
                                            alt="Preview" 
                                            style={{ width: '100px', height: '100px', marginTop: '10px' }} 
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
                                    <input type="button" className="next action-button" value="Next" onClick={nextStep} />
                                    <input type="button" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                            {step === 4 && (
                                <fieldset>
                                    <div className="form-card">
                                        <h2 className="fs-title text-center">Success!</h2>
                                        <p className="text-center">Click the Submit button to complete your registration</p>
                                        {msg && <p className="text-center text-danger">{msg}</p>}
                                    </div>
                                    <input type="submit" className="action-button" value="Submit" />
                                    <input type="button" className="previous action-button-previous" value="Previous" onClick={prevStep} />
                                </fieldset>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherRegistration;
