import Navbar from "./Navbar";
import React from "react";

export default function Empty() {
    return (
        <>
            <Navbar />
            <div className="empty">
                <h1>This is empty page</h1>
            </div>
        </>
    );
}