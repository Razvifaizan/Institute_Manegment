import { useEffect, useState, useRef } from "react";
import React from "react";
import io from 'socket.io-client';
import WebAPI from "../service/WebAPI";
import WebServise from "../service/WebServise";
import { useSelector } from "react-redux";
import sendSound from '../assets/livechat.mp3'; // Adjust the path according to your structure
import receiveSound from '../assets/livechat.mp3'; // Use a different sound for receiving messages if available

const socket = io('http://localhost:4019'); // Connect to the Socket.IO server

function ActiveTeacher() {
    const data = useSelector((state) => state.userCart.value);
    const [teachers, setTeachers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentTeacherId, setCurrentTeacherId] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [currentTeacherName, setCurrentTeacherName] = useState(""); // Store teacher name for message display

    const messageEndRef = useRef(null); // Ref for scrolling

    // Create audio instances
    const sendAudio = new Audio(sendSound);
    const receiveAudio = new Audio(receiveSound);

    useEffect(() => {
        if (data._id) {
            socket.emit('joinRoom', data._id); // Join the room with user's ID
        }
    }, [data._id]);

    useEffect(() => {
        const fetchActiveTeachers = async () => {
            try {
                if (data.token) {
                    const response = await WebServise.getAPICall(WebAPI.viewActiveTeacher, data.token);
                    if (response && response.data && response.data.teachers) {
                        setTeachers(response.data.teachers);
                        console.log("techer+++="+JSON.stringify(teachers))
                    } else {
                        console.error("Error: Invalid response format from API.");
                    }
                } else {
                    console.error("Error: No token available for API call.");
                }
            } catch (error) {
                console.error("Error fetching active teachers:", error);
            }
        };
        fetchActiveTeachers();
    }, [data.token]);

   const fetchMessages = async (teacherId, teacherName) => {
    try {
        const url = `${WebAPI.getMessages}/${data._id}/${teacherId}`;
        const response = await WebServise.getAPICall(url, data.token);
        
        // Set the current teacher ID and name
        setCurrentTeacherId(teacherId);
        setCurrentTeacherName(teacherName);
        
        // Check if messages are available
        if (response && response.data && Array.isArray(response.data.messages)) {
            setMessages(response.data.messages);
        } else {
            // No messages found, set an empty array
            setMessages([]);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Error: Messages not found (404).");
            // Still set current teacher info even if no messages are found
            setCurrentTeacherId(teacherId);
            setCurrentTeacherName(teacherName);
            setMessages([]); // Set messages to an empty array
        } else {
            console.error("Error fetching messages:", error);
        }
    }
};


    // Send a new message
   const sendMessage = async () => {
    if (!newMessage.trim()) return; // Avoid sending empty messages

    if (!currentTeacherId) {
        console.error("No teacher selected to send a message to.");
        return;
    }

    // Emit the message to the server
    const messageToSend = {
        senderId: data._id,
        receiverId: currentTeacherId,
        message: newMessage,
    };

    socket.emit('sendMessage', messageToSend);

    // Optimistically update the message list
    setMessages((prevMessages) => [...prevMessages, messageToSend]); // Add message locally

    // Play send sound
    sendAudio.play();

    // Save the message to the database
    try {
        const saveResponse = await WebServise.postAPICall(WebAPI.sendMessage, data.token,messageToSend);
        console.log("Message saved to database:", saveResponse);
        
        // Optionally, you might want to check if the response indicates success
        // if (!saveResponse.success) {
        //     console.error("Failed to save message to database:", saveResponse.message);
        //     // Rollback optimistic update if necessary
        //     setMessages((prevMessages) => prevMessages.filter(msg => msg.message !== newMessage));
        // }
    } catch (error) {
        console.error("Error saving message to database:", error.response ? error.response.data : error);
        // Optionally rollback the optimistic update here as well
        setMessages((prevMessages) => prevMessages.filter(msg => msg.message !== newMessage));
    }

    setNewMessage(""); // Clear input after sending
};


    useEffect(() => {
        socket.on('receiveMessage', (messageData) => {
            if (messageData && messageData.senderId && messageData.message) {
                setMessages((prevMessages) => [...prevMessages, messageData]);
                
                // Play receive sound
                receiveAudio.play();
            } else {
                console.error("Error: Invalid message format received.");
            }
        });

        return () => {
            socket.off('receiveMessage'); // Cleanup listener on component unmount
        };
    }, []);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };


   const deteateAdmin = async (adminID) => {
    try {
        // Construct the API endpoint with the teacher/admin ID
        const response = await WebServise.deleteAPICall(`${WebAPI.deletTecher}/${adminID}`, data.token);
        
        if (response.data.status) {
            console.log("Admin deleted successfully");
            // Update the teachers' list to remove the deleted admin
            setTeachers((prevTeachers) => prevTeachers.filter(teacher => teacher._id !== adminID));
        } else {
            console.error("Failed to delete admin:", response.data.message);
        }
    } catch (error) {
        console.error("Error deleting admin:", error);
    }
};


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Active Teachers</h1>
                        {teachers.map((teacher) => (
                            <div key={teacher._id} className="teacher-card">
                                <img width={"60px"} src={`/userIcon/${teacher.admin_image}`} alt="" />
                                <h5>{teacher.name}</h5>
                                {/* admin_image */}
                                <button className="btn-message" onClick={() => fetchMessages(teacher._id, teacher.name)}>Message</button>
                    
<button className="remove-btn" onClick={() => deteateAdmin(teacher._id)}>Remove</button>

                            </div>
                        ))}
                    </div>
                    <div className="col-md-6">
    {currentTeacherId && (
        <div className="chat-box">
            <h4 className="p-0 m-0">Chat with {currentTeacherName}</h4>
            <div className="message-list">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={msg.senderId === data._id ? "my-message" : "their-message"}>
                            <p>{msg.message}</p>
                        </div>
                    ))
                ) : (
                    <p>No messages yet. Start the conversation!</p>
                )}
                <div ref={messageEndRef} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )}
</div>
                </div>
            </div>
        </div>
    );
}

export default ActiveTeacher;
