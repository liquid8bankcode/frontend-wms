import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Tab } from '@headlessui/react';
import Barcode from 'react-barcode';

import { useGetCategoriesQuery, useNewProductMutation } from '../../../store/services/categoriesApi';
import { formatRupiah, formatYearToDay, generateRandomString } from '../../../helper/functions';
import BarcodePrinted from './BarcodePrinted';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ProductCheck {
    oldData: {
        code_document: string;
        created_at: string;
        id: number;
        old_barcode_product: string;
        old_name_product: string;
        old_price_product: string;
        old_quantity_product: string;
        updated_at: string;
    };
    tagColor: {
        created_at: string;
        fixed_price_color: string;
        hexa_code_color: string;
        id: 2;
        max_price_color: string;
        min_price_color: string;
        name_color: string;
        updated_at: string;
    };
    resetValueMultiCheck: () => void;
    resetProductCheckShow: () => void;
    countPercentage: (percentage: string) => void;
    newPricePercentage: string;
    showBarcode: () => void;
    hideBarcode: () => void;
    handleSetNewPriceProduct: (newPrice: string) => void;
    customQuantity: string;
    codeBarcode: string;
    isQuantity: boolean;
    getSelectedCategory: (selected: string) => void;
}

const ProductCheck: React.FC<ProductCheck> = ({
    oldData,
    tagColor,
    resetValueMultiCheck,
    resetProductCheckShow,
    countPercentage,
    newPricePercentage,
    showBarcode,
    hideBarcode,
    handleSetNewPriceProduct,
    customQuantity,
    codeBarcode,
    isQuantity,
    getSelectedCategory,
}) => {
    const { data, isSuccess, refetch } = useGetCategoriesQuery(undefined);
    const [newProduct, results] = useNewProductMutation();

    const [selectedOption, setSelectedOption] = useState<string>('');
    const [descriptionDamaged, setDescriptionDamaged] = useState<string>('');
    const [descriptionAbnormal, setDescriptionAbnormal] = useState<string>('');
    const [barcodeStatus, setBarcodeStatus] = useState<'LOLOS' | 'TIDAK LOLOS'>('LOLOS');

    // hideBarcode();

    const productCheckData = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource;
        }
    }, [data]);

    const newPrice = useMemo(() => {
        if (tagColor) {
            return tagColor.fixed_price_color;
        } else {
            return newPricePercentage;
        }
    }, [tagColor, newPricePercentage]);

    const newDateProduct = useMemo(() => {
        if (!tagColor) {
            return formatYearToDay(oldData.created_at);
        } else {
            return formatYearToDay(tagColor.created_at);
        }
    }, [tagColor]);

    const productQuantity = useMemo(() => {
        if (isQuantity) {
            return customQuantity;
        } else {
            return oldData.old_quantity_product;
        }
    }, [isQuantity]);

    const handleSendLolos = async () => {
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: codeBarcode,
                new_name_product: oldData.old_name_product,
                old_name_product: oldData.old_name_product,
                new_quantity_product: productQuantity,
                new_price_product: newPrice,
                old_price_product: oldData.old_price_product,
                new_date_in_product: newDateProduct,
                new_status_product: 'display',
                condition: 'lolos',
                new_category_product: selectedOption,
                new_tag_product: tagColor?.name_color ?? '',
                deskripsi: '',
            };
            setBarcodeStatus('LOLOS');
            handleSetNewPriceProduct(formatRupiah(newPrice));
            await newProduct(body);
        } catch (err) {
            console.log(err);
        }
    };
    const handleDamaged = async () => {
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: codeBarcode,
                new_name_product: oldData.old_name_product,
                old_name_product: oldData.old_name_product,
                new_quantity_product: productQuantity,
                new_price_product: newPrice,
                old_price_product: oldData.old_price_product,
                new_date_in_product: newDateProduct,
                new_status_product: 'display',
                condition: 'damaged',
                new_category_product: '',
                new_tag_product: tagColor?.name_color ?? '',
                deskripsi: descriptionDamaged,
            };
            await newProduct(body);
            setBarcodeStatus('TIDAK LOLOS');
            resetProductCheckShow();
            hideBarcode();
        } catch (err) {
            console.log(err);
        }
    };
    const handleAbnormal = async () => {
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: codeBarcode,
                new_name_product: oldData.old_name_product,
                old_name_product: oldData.old_name_product,
                new_quantity_product: productQuantity,
                new_price_product: newPrice,
                old_price_product: oldData.old_price_product,
                new_date_in_product: newDateProduct,
                new_status_product: 'display',
                condition: 'abnormal',
                new_category_product: '',
                new_tag_product: tagColor?.name_color ?? '',
                deskripsi: descriptionAbnormal,
            };
            await newProduct(body);
            setBarcodeStatus('TIDAK LOLOS');
            resetProductCheckShow();
            hideBarcode();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectedLolosOption = ({ value, percentage }: { value: string; percentage: string }) => {
        setSelectedOption(value);
        countPercentage(percentage);
        getSelectedCategory(value);
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            resetValueMultiCheck();
            if (Math.ceil(Number(oldData?.old_price_product)) >= 100000) {
                showBarcode();
                resetProductCheckShow();
            } else {
                hideBarcode();
                resetProductCheckShow();
            }
        } else if (results.isError) {
            const fetchError = results.error as FetchBaseQueryError;
            toast.error((fetchError.data as any)?.old_barcode_product ?? 'error');
        }
    }, [results]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className="xl:w-1/2 ss:w-full gap-4">
            <h1 className="text-lg font-bold my-4">PRODUK CHECK</h1>
            <div className="mb-5 panel">
                <Tab.Group>
                    <div className="mx-10 mb-5 sm:mb-0">
                        <Tab.List className="mt-3 mb-6 flex border-b border-white-light gap-4 dark:border-[#191e3a]">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-info text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                    >
                                        Lolos
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-info text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                    >
                                        Damaged
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-info text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                    >
                                        Abnormal
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="grid grid-cols-3 gap-4">
                                {productCheckData?.length !== 0 &&
                                    productCheckData?.map((option: any) => (
                                        <label key={option.id} className="flex items-center mt-1 cursor-pointer">
                                            <input
                                                disabled={tagColor && true}
                                                type="radio"
                                                className="form-radio text-success peer w-6 h-6"
                                                name="radioOption"
                                                value={option.name_category}
                                                onChange={(e) => handleSelectedLolosOption({ value: e.target.value, percentage: option.discount_category })}
                                            />
                                            <span className="text-white-dark">{option.name_category}</span>
                                        </label>
                                    ))}

                                <button disabled={false} className="btn btn-info mt-4 col-span-3" onClick={handleSendLolos}>
                                    SEND
                                </button>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <div className="flex items-start pt-5">
                                    <div className="flex-auto">
                                        <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                        <textarea
                                            value={descriptionDamaged}
                                            onChange={(e) => setDescriptionDamaged(e.target.value)}
                                            rows={4}
                                            className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        ></textarea>
                                        <div className="flex justify-end">
                                            <button disabled={descriptionDamaged.length === 0} type="submit" className="w-full btn btn-info mt-4" onClick={handleDamaged}>
                                                SEND
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <div className="flex items-start pt-5">
                                    <div className="flex-auto">
                                        <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                        <textarea
                                            rows={4}
                                            value={descriptionAbnormal}
                                            onChange={(e) => setDescriptionAbnormal(e.target.value)}
                                            className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        ></textarea>
                                        <div className="flex justify-end">
                                            <button disabled={descriptionAbnormal.length === 0} type="submit" className="w-full btn btn-info mt-4" onClick={handleAbnormal}>
                                                SEND
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ProductCheck;
