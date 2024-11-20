import React, { useState, useEffect } from 'react';
import WebServise from '../service/WebServise';  // Make sure WebService is correctly implemented for API calls
import WebAPI from '../service/WebAPI';          // Import API utilities if needed
import { useSelector } from 'react-redux';
// import React from "react";
// import '../assets/style/team.css';

const Team = () => {
    const [teachers, setTeachers] = useState([]);
    const data = useSelector(state => state.userCart.value); // Assuming you use this data elsewhere

    useEffect(() => {
        loadAllTeacher();
    }, []);

    // Function to load all active teachers from the API
    const loadAllTeacher = async () => {
        try {
            const response = await WebServise.getAPICall('http://localhost:4019/admin/viewActiveTeacher');

            console.log(response.data.teachers)
            if (response && response.data) {
                setTeachers(response.data.teachers);  // Assuming the response data is an array of teacher objects
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    return (
        <div className="team-container">
            <h1>Meet Our Teachers</h1>
            <div className="team-grid">
                {teachers.length > 0 ? (
                    teachers.map((teacher, index) => (
                        <div key={index} className="team-card">
                            <img 
                                src={`/userIcon/${teacher.admin_image}` || ''} 
                                alt={teacher.name} 
                                className="team-img" 
                            />
                            <h2>{teacher.name}</h2>
                        </div>
                    ))
                ) : (
                    <p>No teachers available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Team;
