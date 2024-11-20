import React, { useEffect, useState } from 'react';
import WebServise from '../service/WebServise';
import WebAPI from '../service/WebAPI';

const PendingTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [msg, setMsg] = useState("");

    // <=========(|::|=|🌼|=|::|)=========>
    // <=========(|::|=|🌼|=|::|)=========>

    useEffect(() => {
        const fetchPendingTeachers = async () => {
            try {
                const response = await WebServise.getAPICall(WebAPI.viewPandingTeacher);
                setTeachers(response.data.teachers);
                console.log(response.data.teachers)
            } catch (error) {
                console.error("Error fetching pending teachers:", error);
            }
        };

        fetchPendingTeachers();
    }, []);

    const approveTeacher = async (id) => {
        try {
          var resp =  await WebServise.putAPIs(`${WebAPI.aprovedTeachers}/${id}`);
            setTeachers(teachers.filter(teacher => teacher._id !== id));
            setMsg(resp.data.message)
        } catch (error) {
            console.error("Error approving teacher:", error);
        }
    };

    return (
        <div className="content">
            <div className="container">
                <h2>Pending Teacher Approvals</h2>
                <div className="row">
                   
                    {teachers.map(teacher => (
                        <div className="col-md-4" key={teacher._id}>
                            <div className="card mb-4 shadow-sm">
                                <img 
                                    src={`/userIcon/${teacher.admin_image}`} // ===> image URL
                                    className="" 
                                    alt={`${teacher.name}'s profile`} 
                                    width={"60px"}
                                />
                                <div className="card-body ">
                                    <h5 className="card-title">{teacher.name}</h5>
                                    <p className="card-text">{teacher.email}</p>
                                    <div className="d-flex apvove-btn">
<button 
                                        onClick={() => approveTeacher(teacher._id)} 
                                        className="btn me-2"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => approveTeacher(teacher._id)} 
                                        className="btn ms-2"
                                    >
                                        Reaject
                                    </button>
                                     <p>{msg}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PendingTeachers;
