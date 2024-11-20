import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import React from "react";
function AdminHome() {
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedCategoryName, setUpdatedCategoryName] = useState(""); // New state for category name
    const data = useSelector((state) => state.userCart.value);

    useEffect(() => {
        loadPlaylist();
    }, []);

    const loadPlaylist = async () => {
        try {
            const response = await WebServise.getAPICall(
                WebAPI.viewSubCategoryListbyTeacher,
                data.token
            );
            if (response.data.status) {
                setSubCategoryList(response.data.subCategories);
            }
        } catch (error) {
            console.error("Error loading playlist:", error);
        }
    };

    const deleteSubCategory = async (subCategoryId) => {
        try {
            const response = await WebServise.deleteAPICall(
                `${WebAPI.deleteSubCategory}/${subCategoryId}`,
                data.token
            );
            if (response.data.status) {
                setSubCategoryList(
                    subCategoryList.filter((subCat) => subCat._id !== subCategoryId)
                );
                console.log("Subcategory deleted successfully");
            } else {
                console.error("Error deleting subcategory:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    };

    const openUpdateModal = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setUpdatedName(subCategory.subCategory_name);
        setUpdatedCategoryName(subCategory.category_name); // Set category name in modal
        setShowUpdateModal(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await WebServise.putAPICall(
                `${WebAPI.updateSubCategory}/${selectedSubCategory._id}`, // Pass ID in the path
                data.token,
                {
                    subCategory_name: updatedName,
                    category_name: updatedCategoryName, // Add category name to update data
                }
            );
            if (response.data.status) {
                setSubCategoryList(
                    subCategoryList.map((subCat) =>
                        subCat._id === selectedSubCategory._id
                            ? {
                                ...subCat,
                                subCategory_name: updatedName,
                                category_name: updatedCategoryName,
                            }
                            : subCat
                    )
                );
                setShowUpdateModal(false);
                setSelectedSubCategory(null);
                console.log("Subcategory updated successfully");
            } else {
                console.error("Error updating subcategory:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating subcategory:", error);
        }
    };

    return (
        <>
            <div className="content">
                <div className="container-fluid pt-4 px-4">
                    <div className="bg-light text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 className="mb-0">Your Playlist</h3>
                            <a href="">Show All</a>
                        </div>
                        <div className="table-responsive">
                            <table className="table text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                    <tr className="text-dark">
                                        <th scope="col">
                                            <input className="form-check-input" type="checkbox" />
                                        </th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Playlist Name</th>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subCategoryList.length === 0 ? (
                                        <tr>
                                            <td colSpan="5">
                                                <h1>Your playlist is currently empty. Please check with the admin message for further assistance</h1>
                                            </td>
                                        </tr>
                                    ) : (
                                        subCategoryList.map((subCat) => (
                                            <tr key={subCat._id}>
                                                <td>
                                                    <input className="form-check-input" type="checkbox" />
                                                </td>
                                                <td>{subCat._id}</td>
                                                <td>{subCat.subCategory_name}</td>
                                                <td>{subCat.category_name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm m-2"
                                                        onClick={() => openUpdateModal(subCat)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-sm m-2"
                                                        onClick={() => deleteSubCategory(subCat._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showUpdateModal && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Playlist</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUpdateModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Updated Playlist Name"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Updated Course Name"
                                    value={updatedCategoryName}
                                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowUpdateModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdate}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminHome;
