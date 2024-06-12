import React from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbs {
    base: string;
    basePath: string;
    sub?: string;
    subPath?: string;
    current: string;
}

const BreadCrumbs: React.FC<BreadCrumbs> = ({ base, sub, current, basePath, subPath }) => {
    return (
        <ul className="flex space-x-2 rtl:space-x-reverse">
            <li>
                <Link to={basePath} className="text-primary hover:underline">
                    {base}
                </Link>
            </li>
            {sub && (
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to={subPath ?? '/'} className="text-primary hover:underline">
                        {sub}
                    </Link>
                </li>
            )}
            <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{current}</span>
            </li>
        </ul>
    );
};

export default BreadCrumbs;
