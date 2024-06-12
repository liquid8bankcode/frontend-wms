import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAddBuyerMutation } from '../../../store/services/buyerApi';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const AddBuyer = () => {
    const navigate = useNavigate();
    const [createBuyer, results] = useAddBuyerMutation();

    const [input, setInput] = useState({
        name_buyer: '',
        phone_buyer: '',
        address_buyer: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateBuyer = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                name_buyer: input.name_buyer,
                phone_buyer: input.phone_buyer,
                address_buyer: input.address_buyer,
            };
            await createBuyer(body);
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/buyer/buyer/list_buyer');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Buyer" basePath="/buyer/buyer/list_buyer" sub="List Buyer" subPath="/buyer/buyer/list_buyer" current="Add Buyer" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Buyer</h5>
                    <Link to="/buyer/buyer/list_buyer">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleCreateBuyer}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" name="name_buyer" onChange={handleInputChange} value={input.name_buyer} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                            No. Hp :
                        </label>
                        <input id="username" type="text" className="form-input w-[250px]" name="phone_buyer" onChange={handleInputChange} value={input.phone_buyer} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Alamat :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" name="address_buyer" onChange={handleInputChange} value={input.address_buyer} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBuyer;
