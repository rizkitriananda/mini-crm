import React, { useState, useEffect } from "react";

const Alert = ({ action, message }) => {
    const [isVisible, setIsVisible] = useState(false);
    console.log(action);
    useEffect(() => {
        setIsVisible(action);
        console.log(action);
    }, [action]);

    const setAction = () => {};

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            id="alert-success"
            className="flex items-center p-4 mb-10  rounded-lg  bg-green-500 text-slate-50"
            role="alert"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">{message}</div>
            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5  text-gray-600 rounded-lg hover:text-gray-600  p-1.5 inline-flex items-center justify-center h-8 w-8  "
                onClick={handleDismiss}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill=""
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Alert;
