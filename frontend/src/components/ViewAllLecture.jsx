import { useEffect, useState } from "react";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
// import poster from "../assets/Images/hero-img.png"
// import "../../public/lecture"

const viewAllLecture = () => {
    const [lectureList, setLectureList] = useState([]);

    useEffect(() => {
        viewAllLectures();
    }, []);

    const viewAllLectures = async () => {
        try {
            const response = await WebServise.getAPI(WebAPI.viewAllLecture);
            console.log(response.data.product_list);
            setLectureList(response.data.product_list);
        } catch (error) {
            console.error("Error fetching lectures:", error);
        }
    };

    // const getFullImageUrl = (filename) => {
    //     const baseUrl = "C:\\Users\\ss\\OneDrive\Desktop\project\shoping\ui\public\assets\upload\product_images"; // Replace with your actual base URL
    //     return `${baseUrl}${filename}`;
    // };

    return (
        <>
        <div className="content">
            <h1>All Lecture is here</h1>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-light text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">Recent Sales</h6>
                        <a href="">Show All</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-dark">
                                     <th scope="col">Vedio</th>
                                    <th scope="col">Topic</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Sub-Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Likes</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lectureList.map((obj) => (
                                    <tr key={obj._id}>
                                        <td>
                                          <video
    src={`/lecture/${obj.product_image}`}
     
    style={{ width: '200px', height: '200px' }} 
    controls
/>
                                        </td>
                                        <td>{obj.product_name}</td>
                                        <td>{obj.product_category}</td>
                                        <td>{obj.product_sub_category}</td>
                                        <td>{obj.product_description}</td>
                                        <td>{obj.likes}</td>
                                        <td>000</td>
                                        
                                        <td><a className="btn btn-sm btn-primary" href="">Detail</a></td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default viewAllLecture;
