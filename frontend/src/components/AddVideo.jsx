import { useEffect, useRef, useState } from "react";
import React from "react";
import WebServise from "../service/WebServise";
import WebAPI from "../service/WebAPI";
import { useSelector } from "react-redux";

function AddVideo (){

    useEffect(() => {
     loadCatList(),
        loadSubCatlist()
    }, [])

    const data = useSelector(state => state.userCart.value);

    const [msg3, setMsg3] = useState('');
    const [userPostList, setUserPostList] = useState([]);
    const [subCatList, setSubCatList] = useState([]);
    const sub_cat_name = useRef();
    // const catSelect = useRef();
    const subCatSelect = useRef();  // Ref for the select element
    const pName = useRef();
    const pDis = useRef();
    const pPrice = useRef()
    const pFile = useRef()

    const loadSubCatlist = async () =>{
        try {
            // const obj = {"admin_Id":data._id}
            var response = await WebServise.getAPICall(WebAPI.viewSubCategoryListbyTeacher,data.token)
            setSubCatList(response.data.subCategories);
            console.log(response.data.subCategories+"<><>")
            
        } catch (error) {
            console.log(error)
        }
    }

    const loadCatList = async () => {
        try {
            const response = await WebServise.getAPICall(WebAPI.viewAllCategory,data.token);
            console.log("cate gory list is"+JSON.stringify(response));
            setUserPostList(response.data.subCatList); // Properly setting state
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    };

     const saveProduct = async (event) => {
    event.preventDefault();

    // const cName = catSelect.current.value;
    const cs_name = subCatSelect.current.value;
    const proName = pName.current.value;
    const proDis = pDis.current.value;

    // Handling file input separately
    const file = pFile.current.files[0];
    const formData = new FormData();

    formData.append('product_name', proName);
    // formData.append('product_category', cName);
    formData.append('product_sub_category', cs_name);
    formData.append('product_description', proDis);
    formData.append('product_image', file);
    
    formData.append('admin_Id', data._id);
    formData.append('admin_Img', data.User_Icon);
    formData.append('admin_name', data.name);

    try {
        const response = await WebServise.postAPICall(WebAPI.saveProduct,data.token ,formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status) {
            setMsg3(response.data.message + "✔");
            alert(response.data.message + "✔");
        } else {
            setMsg3(response.data.message);
            alert(response.data.message);
        }
    } catch (error) {
        console.error("Error during Add product:", error);
        setMsg3("An error occurred during Add Product.");
        // alert("An error occurred during Add Product.");
    }
};

    return<>

<div className="content">
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                       
                      
                         <div className="col-sm-12 col-xl-6">
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4 add-heading">Add Video </h6>
                                <form onSubmit={saveProduct}>
                                    <div className="row mb-3">
                                       
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Select Your Playlist
                                        </label>
                                        <div className="form-group">
                                            <select className="form-control" ref={subCatSelect}>
                                                <option selected disabled>Please Select Playlist</option>
                                                {subCatList.map((obj) => (
                                                    <option key={obj._id} value={obj.subCategory_name}>
                                                        {obj.subCategory_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Enter Video Title:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={pName}
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                        />
                                    </div>
                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                            Enter Video file:
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            ref={pFile}
                                            id="exampleInputEmail1"
                                            height={"100%"}
                                            width={"100%"}
                                            aria-describedby="emailHelp"
                                        />
                                        <p>
                                            Enter Video discripcion:
                                        </p>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={pDis}
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                        />
                                        

                                    <button type="submit" className="btn mt-2">
                                        Add
                                    </button>

                                    
                                </form>

                                {msg3 && <div className="alert alert-danger">{msg3}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
}

 export default AddVideo