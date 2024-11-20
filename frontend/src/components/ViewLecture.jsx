import React, { useState, useEffect } from 'react';
import WebServise from '../service/WebServise';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewLecture = () => {
    const [teachers, setTeachers] = useState([]);
    const data = useSelector(state => state.userCart.value);
    const navigate = useNavigate();

    useEffect(() => {
        loadAllTeacher();
    }, []);

    const loadAllTeacher = async () => {
        try {
            const response = await WebServise.getAPICall('http://localhost:4019/admin/viewActiveTeacher');

            if (response && response.data) {
                const adminTeachers = response.data.teachers.filter(teacher => teacher.role === 'admin');
                setTeachers(adminTeachers);
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const handleViewLectures = (teacherId) => {
        navigate(`/teacher/${teacherId}/subcategories`);
    };

    return (
        <div className="content">
            <div className="team-container">
                <h1>Meet Our Teachers</h1>
                <div className="team-grid">
                    {teachers.length > 0 ? (
                        teachers.map((teacher, index) => (
                            <div key={index} className="team-card">
                                <img 
                                    src={`/userIcon/${teacher.admin_image || ''}`} 
                                    alt={teacher.name} 
                                    className="team-img" 
                                />
                                <h2>{teacher.name}</h2>
                                <button 
                                    type="button" 
                                    className='btn'
                                    onClick={() => handleViewLectures(teacher._id)}
                                >
                                    View Lectures
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No teachers available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewLecture;
