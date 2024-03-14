import React from "react";
import UserComponent from "./UserComponent";
import Header from "./Header";
import Sidebar from "./SideBar";




const UserScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <UserComponent />
            </main>
        </>
    );
};

export default UserScreen;