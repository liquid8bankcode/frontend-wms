import React, { ChangeEvent, useEffect, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateCategoryMutation } from '../../../store/services/categoriesApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';

const EditCategory = () => {
    const { state } = useLocation();

    const [input, setInput] = useState({
        name_category: state?.name_category,
        discount_category: state?.discount_category,
        max_price_category: state?.max_price_category,
    });
    const navigate = useNavigate();
    const params = useParams();
    const [updateCategory, results] = useUpdateCategoryMutation();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditCategory = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                name_category: input.name_category,
                discount_category: input.discount_category,
                max_price_category: input.max_price_category,
            };
            await updateCategory({ id, body });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            navigate('/storage/categorysetting/sub_kategori');
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results]);

    if (results.isError) {
        return <Alert message={'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Edit Category" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Sub Category</h5>
                <form className="w-[400px]" onSubmit={handleEditCategory}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Kategori :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required onChange={handleInputChange} name="name_category" value={input.name_category} />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Discount :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required onChange={handleInputChange} name="discount_category" value={input.discount_category} />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Max Price :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" onChange={handleInputChange} name="max_price_category" value={input.max_price_category} />
                    </div>
                    <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Edit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
