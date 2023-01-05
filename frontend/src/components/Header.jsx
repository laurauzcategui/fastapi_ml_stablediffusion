import React from "react";

const Header = ({title}) => {

    return (
        <div className="has-text-centered m-6">
            <h1 className="title">{title}</h1>
        </div>
    );
};

export default Header