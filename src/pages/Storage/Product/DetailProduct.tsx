import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import BarcodeData from './BarcodeData';
import { useDetailProductNewQuery, useEditDetailProductMutation, useGetAllProductNewQuery, useLazyUpdatePriceByProductOldQuery } from '../../../store/services/productNewApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NewBarcodeData from './NewBarcodeData';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { Alert } from '../../../commons';
import BarcodePrinted from './BarcodePrinted';
import { debounce } from 'lodash';
import { ChevronIcon } from '@mantine/core';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isSuccess, refetch, isError } = useDetailProductNewQuery(id);
    const productNew = useGetAllProductNewQuery({ page: 1, q: '' });
    const [editDetailProduct, results] = useEditDetailProductMutation();
    const [showPrintButton, setShowPrintButton] = useState(false);
    const [updatePriceByProductOld, resultsUpdate] = useLazyUpdatePriceByProductOldQuery();
    const [categories, setCategories] = useState<{ id: number; name_category: string; discount_category: number; max_price_category: number }[]>([]);
    const [category, setCategory] = useState('');
    const [diskon, setDiskon] = useState<number>(0);
    const [isRedirect, setIsRedirect] = useState<boolean>(false);

    const dataDetailProduct = useMemo(() => {
        return data?.data.resource;
    }, [data]);

    const condition = useMemo(() => {
        const quality: any = data?.data.resource?.new_quality;

        if (quality !== undefined) {
            if (JSON.parse(quality).lolos !== null) {
                return JSON.parse(quality).lolos;
            } else if (JSON.parse(quality).damaged !== null) {
                return JSON.parse(quality).damaged;
            } else if (JSON.parse(quality).abnormal !== null) {
                return JSON.parse(quality).abnormal;
            }
        }
    }, [data?.data.resource?.new_quality]);

    const [input, setInput] = useState({
        old_barcode_product: '',
        old_name_product: '',
        old_price_product: '',
        new_barcode_product: '',
        new_name_product: '',
        new_quantity_product: '',
        new_price_product: '',
    });

    const hideRedirect = () => {
        setIsRedirect(false);
    };

    useEffect(() => {
        if (isSuccess) {
            setInput((prevState) => ({
                ...prevState,
                old_barcode_product: dataDetailProduct?.old_barcode_product ?? '',
                old_name_product: dataDetailProduct?.new_name_product ?? '',
                old_price_product: dataDetailProduct?.old_price_product ?? '',
                new_barcode_product: dataDetailProduct?.new_barcode_product ?? '',
                new_name_product: dataDetailProduct?.new_name_product ?? '',
                new_quantity_product: dataDetailProduct?.new_quantity_product ?? '',
                new_price_product: dataDetailProduct?.new_price_product ?? '',
            }));
        }
    }, [dataDetailProduct]);

    const handleLiveSearch = debounce(async (value: string) => {
        await updatePriceByProductOld(value)
            .unwrap()
            .then((res: any) => {
                setCategories(res.data.resource.category !== null ? res.data.resource.category : []);
            })
            .catch((err: any) => console.log(err));
    }, 1000);

    const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'old_price_product') {
            setInput((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
            const price = parseFloat(e.target.value);
            if (price >= 100000) {
                const randomBarcode = Math.floor(Math.random() * 90000) + 10000;
                setInput((prevState) => ({
                    ...prevState,
                    new_barcode_product: `LQD${randomBarcode}`,
                }));
            } else if (price < 100000) {
                setInput((prevState) => ({
                    ...prevState,
                    new_barcode_product: dataDetailProduct?.new_barcode_product ?? '',
                }));
                setCategory('');
            }
            handleLiveSearch(e.target.value !== '' ? e.target.value : '0');
        } else {
            setInput((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const hanldeEditProduct = async () => {
        try {
            const body = {
                code_document: dataDetailProduct?.code_document,
                old_barcode_product: input?.old_barcode_product,
                new_barcode_product: input?.new_barcode_product,
                new_name_product: input.new_name_product,
                old_name_product: input?.new_name_product,
                new_quantity_product: input.new_quantity_product,
                new_price_product: input.new_price_product,
                old_price_product: input.old_price_product,
                new_date_in_product: dataDetailProduct?.new_date_in_product,
                new_status_product: dataDetailProduct?.new_status_product,
                condition: condition,
                new_category_product: category ?? dataDetailProduct?.new_category_product,
                new_tag_product: dataDetailProduct?.new_tag_product,
                deskripsi: dataDetailProduct?.deskripsi,
                _method: 'PUT',
            };
            await editDetailProduct({ id, body });
            refetch();
            setShowPrintButton(true);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleLiveSearch(dataDetailProduct?.old_price_product ?? '0');
        setCategory(dataDetailProduct?.new_category_product ?? '');
    }, [dataDetailProduct]);

    useEffect(() => {
        if (diskon && input.new_price_product) {
            setDiskon(categories.find((item: any) => item.name_category === category)?.discount_category ?? 0);
            setInput((prev) => ({ ...prev, new_price_product: (parseFloat(input.old_price_product) - parseFloat(input.old_price_product) * (diskon / 100)).toString() }));
        }
    }, [diskon, input.new_price_product]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message ?? 'Product updated');
            if (isRedirect) {
                if (dataDetailProduct?.new_tag_product !== null) {
                    navigate('/storage/product/color');
                } else {
                    navigate('/storage/product/category');
                }
            }
            productNew.refetch();
        } else if (results.isError) {
            toast.error('Product updated failed');
        }
    }, [results]);

    useEffect(() => {
        refetch();
    }, []);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Produk" subPath="/storage/product" current="Detail Produk" />
            <div className="mt-10 p-6 panel">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Detail Product</h1>
                    <Link to={dataDetailProduct?.new_tag_product !== null ? '/storage/product/color' : '/storage/product/category'}>
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <div className="flex w-full gap-4">
                    <div className="flex w-2/3 flex-col gap-4">
                        <div className="flex w-full gap-4">
                            <NewBarcodeData
                                header="New Data"
                                barcode={input.new_barcode_product ?? ''}
                                harga={input.new_price_product ?? ''}
                                qty={input.new_quantity_product ?? ''}
                                nama={input.new_name_product ?? ''}
                                handleChangeInput={handleChangeInput}
                                newPrice={input.new_price_product ?? ''}
                            />
                            <BarcodeData
                                header="Old Data"
                                barcode={input.old_barcode_product}
                                harga={input.old_price_product}
                                qty={input.new_quantity_product}
                                nama={input.old_name_product}
                                oldPrice={input.old_price_product}
                                hideRedirect={hideRedirect}
                                hanldeEditProduct={handleChangeInput}
                            />
                        </div>
                        {parseFloat(input.old_price_product) >= 100000 && (
                            <div className="w-full relative">
                                <label htmlFor="kategori">Kategori Produk</label>
                                <select
                                    id="kategori"
                                    value={category}
                                    className="w-full py-1.5 rounded px-3 appearance-none border z-10"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCategory(e.target.value);
                                        setDiskon(categories.find((item: any) => item.name_category === e.target.value)?.discount_category ?? 0);
                                    }}
                                >
                                    {categories.map((item: any) => (
                                        <option key={item.id} value={item.name_category}>
                                            {item.name_category}
                                        </option>
                                    ))}
                                </select>
                                <ChevronIcon className="absolute right-3 top-[34px]" />
                            </div>
                        )}
                    </div>
                    <div className="w-1/3 flex justify-center">
                        <BarcodePrinted
                            barcode={dataDetailProduct?.new_barcode_product ?? ''}
                            category={category}
                            newPrice={input.new_price_product ?? ''}
                            oldPrice={input.old_price_product ?? ''}
                            showPrintButton={showPrintButton}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary px-16 uppercase mt-6"
                    onClick={() => {
                        hanldeEditProduct();
                        // setIsRedirect(true);
                    }}
                >
                    Edit Product
                </button>
            </div>
        </>
    );
};

export default DetailProduct;
