import { useEffect, useRef, useState } from "react";
import React from "react";
import "../assets/style/admin.css";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";

function AddCourse() {
    const [categoryList, setCategoryList] = useState([]);
    const [msg, setMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const cat_name = useRef();
    const data = useSelector(state => state.userCart.value);

    useEffect(() => {
        loadCatList();
    }, []);

    const loadCatList = async () => {
        try {
            const response = await WebServise.getAPICall(WebAPI.viewAllCategory, data.token);
            setCategoryList(response.data.subCatList);
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    };

    const saveCategory = async (event) => {
        event.preventDefault();
        const c_name = cat_name.current.value;
        const obj = { category_name: c_name };

        try {
            const response = await WebServise.postAPICall(WebAPI.saveCategory, data.token, obj);
            if (response.data.status) {
                setMsg(response.data.message + " ✔");
                loadCatList();
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            console.error("Error during Add Category:", error);
            setMsg("An error occurred during Add Category.");
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await WebServise.deleteAPICall(`${WebAPI.deleteCategory}/${categoryId}`, data.token);
            if (response.data.status) {
                setMsg(response.data.message + " ✔");
                loadCatList();
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            setMsg("An error occurred while deleting the category.");
        }
    };

    const handleOpenModal = (categoryId, categoryName) => {
        setSelectedCategoryId(categoryId);
        setNewCategoryName(categoryName);
        setIsModalOpen(true);
        console.log(selectedCategoryId)
    };

    const handleUpdateCategory = async () => {
        try {
            const response = await WebServise.putAPICall(`${WebAPI.updateCategory}/${selectedCategoryId}`, data.token, {
                _id: selectedCategoryId,
                category_name: newCategoryName
            });
            if (response.data.status) {
                setMsg(response.data.message + " ✔");
                loadCatList();
                setIsModalOpen(false);
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            console.error("Error updating category:", error);
            setMsg("An error occurred while updating the category.");
        }
    };

    return (
        <>
            <div className="content">
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-6">
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4 add-heading">Add Course</h6>
                                <form onSubmit={saveCategory}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Enter Course Name:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={cat_name}
                                            id="exampleInputEmail1"
                                        />
                                    </div>

                                    {msg && <div className="alert alert-success">{msg}</div>}

                                    <button type="submit" className="btn">Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <h3>Course List</h3>
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-dark">
                                <th scope="col">Course Id</th>
                                <th scope="col">Course Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.map((obj) => (
                                <tr key={obj._id}>
                                    <td>{obj._id}</td>
                                    <td>{obj.category_name}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm ms-2"
                                            onClick={() => deleteCategory(obj._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-sm ms-2"
                                            onClick={() => handleOpenModal(obj._id, obj.category_name)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h5>Update Category</h5>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="Enter new category name"
                                />
                                <button onClick={handleUpdateCategory}>Update</button>
                                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AddCourse;
