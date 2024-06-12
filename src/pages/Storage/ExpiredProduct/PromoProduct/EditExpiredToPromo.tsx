import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDetailProductNewQuery } from '../../../../store/services/productNewApi';
import { formatRupiah } from '../../../../helper/functions';
import { useCreatePromoMutation, useGetPromotListsQuery } from '../../../../store/services/promoApi';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';

const EditExpiredToPromo = () => {
    const params = useParams();
    const { data, isSuccess } = useDetailProductNewQuery(params.id);
    const { refetch } = useGetPromotListsQuery({ page: 1, q: '' });
    const [createPromo, results] = useCreatePromoMutation();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name_promo: '',
        price_promo: '0',
    });
    const [discountPromo, setDiscountPromo] = useState<number>(0);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleCreatePromo = async () => {
        try {
            const body = {
                new_product_id: params.id,
                name_promo: input.name_promo,
                discount_promo: discountPromo,
                price_promo: input.price_promo,
            };
            await createPromo(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setInput((prevState) => ({
                ...prevState,
                price_promo: data?.data.resource.new_price_product,
            }));
        }
    }, [data]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data.data.message);
            navigate('/storage/expired_product/promo_product');
            refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results]);

    return (
        <div className="panel mt-6 dark:text-white-light mb-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-bold flex justify-start py-4">Edit Product Expired</h1>
                <Link to="/storage/expired_product/promo_product">
                    <button type="button" className=" px-2 btn btn-outline-danger">
                        <IconArrowBackward className="flex mx-2" fill={true} /> Back
                    </button>
                </Link>
            </div>

            <div className="w-[400px] mb-4">
                <div className="flex items-center justify-between mb-4.5">
                    <label htmlFor="barcode" className="text-[15px] font-semibold whitespace-nowrap">
                        Nama Promo :
                    </label>
                    <input onChange={handleChangeInput} value={input.name_promo} name="name_promo" id="barcode" type="text" className=" form-input w-[250px]" required />
                </div>
                <div className="flex items-center justify-between mb-4.5">
                    <label htmlFor="barcode" className="text-[15px] font-semibold whitespace-nowrap">
                        Diskon Promo :
                    </label>
                    <input
                        onChange={(e) => {
                            const remainDiscount = 100 - Number(e.target.value);
                            const pricePercentage = (Number(data?.data.resource.new_price_product) * remainDiscount) / 100;
                            setDiscountPromo(Number(e.target.value));
                            setInput((prevState) => ({
                                ...prevState,
                                price_promo: JSON.stringify(pricePercentage),
                            }));
                        }}
                        value={discountPromo}
                        name="discount_promo"
                        id="barcode"
                        type="text"
                        className=" form-input w-[250px]"
                        required
                    />
                </div>
                <div className="flex items-center justify-between mb-4.5">
                    <label htmlFor="barcode" className="text-[15px] font-semibold whitespace-nowrap">
                        Harga Promo :
                    </label>
                    <input
                        disabled
                        onChange={handleChangeInput}
                        value={formatRupiah(input.price_promo ?? '0')}
                        name="price_promo"
                        id="barcode"
                        type="text"
                        className=" form-input w-[250px]"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-4 px-16" onClick={handleCreatePromo}>
                    Buat Promo
                </button>
            </div>
        </div>
    );
};

export default EditExpiredToPromo;
