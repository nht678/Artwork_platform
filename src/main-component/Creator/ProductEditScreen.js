import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const EditProductMain = (props) => {
    const { productId } = props;


    const [ProductName, setProductName] = useState("");
    const [Price, setPrice] = useState("");

    const [DiscountPercent, setDiscountPercent] = useState("");
    const [Decription, setDescription] = useState("");
    const [CateId, setCateId] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [ImageFile, setImageFile] = useState([]);
    const handleFileChange = (event) => {
        // const file = event.target.files[0];
        setImageFile(event.target.files[0]);
        const newImages = [...ImageFile]; // Create a copy of the current images array
        for (let i = 0; i < event.target.files.length; i++) {
            newImages.push(event.target.files[i]);
        }

        setImageFile(newImages);
    };



    const submitHandler = (e) => {
        e.preventDefault();


    };
    const handleDeleteImage = (index) => {
        const updatedImages = [...ImageFile];
        updatedImages.splice(index, 1);
        setImageFile(updatedImages);
    };

    return (
        <>

            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Quay Về
                        </Link>
                        <h2 className="content-title">Chỉnh Sửa Sản Phẩm</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Thêm Sản Phẩm
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <>
                                        <div className="mb-4">
                                            <label htmlFor="product_title" className="form-label">
                                                Tên Sản Phẩm
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_title"
                                                required
                                                value={ProductName}
                                                onChange={(e) => setProductName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Giá Tiền
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_price"
                                                required
                                                value={Price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_title" className="form-label">
                                                Phân Loại
                                            </label>
                                            <select
                                                className="form-control"
                                                id="product_title"
                                                required
                                                value={CateId}
                                                onChange={(e) => setCateId(e.target.value)}
                                            >
                                                <option value="">Chọn Loại</option>
                                                <option value="chim">Chim</option>
                                                <option value="do-an">Đồ Ăn</option>
                                                <option value="long-chim">Lồng Chim</option>
                                                <option value="phu-kien">Phụ Kiện</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label">Chi Tiết</label>
                                            <textarea
                                                placeholder="Type here"
                                                className="form-control"
                                                rows="7"
                                                required
                                                value={Decription}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>

                                        <div className="addImage-feedback" style={{ borderRadius: "5px" }}>

                                            {ImageFile.map((img, index) =>
                                                <div key={index} className="image-container-feedback">
                                                    <img src={URL.createObjectURL(img)} alt="" style={{ width: "80px", height: "80px", margin: "5px" }} />
                                                    <button className="delete-button-imgFeedback" onClick={() => handleDeleteImage(index)}>X</button>
                                                </div>
                                            )}
                                            {
                                                (
                                                    <label className="custom-file-upload" style={{ width: "80px", height: "80px", margin: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                        <input type="file" multiple onChange={handleFileChange} style={{ display: "none" }} />
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-addImage-feedback">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                    </label>
                                                )
                                            }

                                        </div>
                                    </>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditProductMain;