import React, { useState } from 'react';

interface Alert {
    message: string;
}

const Alert: React.FC<Alert> = ({ message }) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    return (
        <>
            {!isDelete && (
                <div className="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
                    <span className="ltr:pr-2 rtl:pl-2">
                        <strong className="ltr:mr-1 rtl:ml-1">{message}</strong>
                    </span>
                    <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80" onClick={() => setIsDelete(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default Alert;
