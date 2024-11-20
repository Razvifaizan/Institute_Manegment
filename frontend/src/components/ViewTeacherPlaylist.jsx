import React, { useEffect, useState } from 'react';
import WebServise from '../service/WebServise';
import { useParams } from 'react-router-dom';

const ViewTeacherPlaylist = () => {
    const { teacherId } = useParams();
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        loadSubCategories();
    }, []);

    const loadSubCategories = async () => {
        try {
            const response = await WebServise.getAPICall(`http://localhost:4019/subCategory/viewSubCategoryListbyAdmin/${teacherId}`);
console.log(response.data.subCategories)
            if (response && response.data.status) {
                setSubCategories(response.data.subCategories);
                console.log(subCategories)
            } else {
                console.error("Subcategories not found");
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error,teacherId);
        }
    };

    return (
        <div className='content'>
            <h1>Subcategories</h1>
            {subCategories.length > 0 ? (
                <ul>
                    {subCategories.map((subcategory, index) => (
                        <>
                        <h2>{subcategory.subCategory_name}</h2>
                        <p>Playlist</p>
                        </>
                        
                        
                    ))}
                </ul>
            ) : (
                <p>No subcategories found for this teacher.</p>
            )}
        </div>
    );
};

export default ViewTeacherPlaylist;
