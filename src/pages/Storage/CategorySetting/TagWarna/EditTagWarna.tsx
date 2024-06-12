import React, { ChangeEvent, useEffect, useState } from 'react';
import { BreadCrumbs } from '../../../../components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateColorTagMutation } from '../../../../store/services/colorTagApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const EditTagWarna = () => {
    const { state } = useLocation();
    const [input, setInput] = useState({
        hexa_code_color: state.hexa_code_color,
        name_color: state.name_color,
        min_price_color: state.min_price_color,
        max_price_color: state.max_price_color,
        fixed_price_color: state.fixed_price_color,
    });
    const navigate = useNavigate();
    const params = useParams();
    const [updateColorTag, results] = useUpdateColorTagMutation();

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditTagColor = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const body = {
                hexa_code_color: input.hexa_code_color,
                name_color: input.name_color,
                min_price_color: input.min_price_color,
                max_price_color: input.max_price_color,
                fixed_price_color: input.fixed_price_color,
            };
            await updateColorTag({ id: params.id, body });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            navigate('/storage/categorysetting/tag_warna');
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results]);

    if (results.isError) {
        return <Alert message={'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Edit Tag Warna" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Tag Warna</h5>
                <form className="w-[400px]" onSubmit={handleEditTagColor}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="tagColor" className="text-[15px] font-semibold whitespace-nowrap">
                            Tag Warna :
                        </label>
                        <input id="tagColor" type="color" className="ml-4 h-[35px] w-[35px]" required name="hexa_code_color" value={input.hexa_code_color} onChange={handleChangeInput} />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="colorName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Warna :
                        </label>
                        <input id="colorName" type="text" className="form-input w-[250px]" required name="name_color" value={input.name_color} onChange={handleChangeInput} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="price" className="text-[15px] font-semibold whitespace-nowrap">
                            Range Harga:
                        </label>
                        <div className="flex items-center ms-14">
                            <input id="price" type="text" className="form-input w-[250px]" required name="min_price_color" value={input.min_price_color} onChange={handleChangeInput} />
                            <span className="px-6">-</span>
                            <input type="text" className="form-input w-[250px]" required name="max_price_color" value={input.max_price_color} onChange={handleChangeInput} />
                        </div>
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="fixedPrice" className="text-[15px] font-semibold whitespace-nowrap">
                            Fixed Price :
                        </label>
                        <input id="fixedPrice" type="text" className="form-input w-[250px]" required name="fixed_price_color" value={input.fixed_price_color} onChange={handleChangeInput} />
                    </div>
                    <span className="text-[10px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Edit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditTagWarna;
