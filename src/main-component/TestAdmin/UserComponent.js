import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import Loading from "../../LoadingError/Loading";
// import Message from "../../LoadingError/Error";
// import { banUser, deleteUser, listUser, unbanUser, } from "../../../pages/redux/Actions/userActions";
import logo from './account-circle-line.png'
// import moment from "moment";


const UserComponent = () => {
    // const dispatch = useDispatch();

    // const userList = useSelector((state) => state.userList);
    // const { loading, error, users } = userList;

    // // const userDelete = useSelector((state) => state.userDelete);
    // // const { error: errorDelete, success: successDelete } = userDelete;
    // const banList = useSelector((state) => state.banUser);
    // const { loading: loadingBaned, success: successBaned } = banList;
    // const unbanUserList = useSelector((state) => state.unbanUser);
    // const { loading: loadingunBaned, success: successunBaned } = unbanUserList;
    // useEffect(() => {
    //     dispatch(listUser());
    // }, [dispatch, successBaned, successunBaned]);

    // const deleteHandler = (userId) => {
    //     // if (window.confirm("Are you sure?")) {
    //     dispatch(banUser(userId));
    //     // }
    // };

    // const UnBanHandler = (userId) => {
    //     // if (window.confirm("Are you sure?")) {
    //     dispatch(unbanUser(userId));

    //     // }
    // };

    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Khách Hàng</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        {/* 
                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : ( */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Hình ảnh</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Giới Tính</th>
                                    <th scope="col">Ngày Sinh</th>
                                    <th scope="col">Địa Chỉ</th>
                                    <th scope="col">Số Điện Thoại</th>
                                    {/* <th scope="col" className="text-end">
                                            Action
                                        </th> */}
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserComponent;
