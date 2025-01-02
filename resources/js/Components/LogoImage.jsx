import React from "react";

const LogoImage = ({ logoPath }) => {
    const logoUrl = `/storage/app/public/${logoPath}`; // Membentuk URL full dari path storage

    return (
        <div className="logo-container">
            <img
                src={logoUrl}
                alt="Company Logo"
                className="logo-image w-12 h-12 rounded-full object-cover"
            />
        </div>
    );
};

export default LogoImage;
