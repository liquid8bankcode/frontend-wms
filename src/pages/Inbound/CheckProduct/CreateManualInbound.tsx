import React, { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckPriceMutation } from '../../../store/services/checkProduct';
import toast from 'react-hot-toast';
import { Tab } from '@headlessui/react';
import { useGetCategoriesQuery } from '../../../store/services/categoriesApi';
import { useAddProductMutation, useLatestPriceQuery } from '../../../store/services/productOldsApi';
import BarcodePrinted from './BarcodePrinted';
import { Alert } from '../../../commons';

const CreateManualInbound = () => {
    const [addProduct, results] = useAddProductMutation();
    const [isBarcode, setIsBarcode] = useState(false);
    const [diskon, setDiskon] = useState('0');
    const [response, setResponse] = useState<{
        new_barcode_product: string;
        new_name_product: string;
        new_quantity_product: string;
        new_price_product: string;
        new_status_product: string;
        new_category_product: string;
        new_tag_product: string | null;
        new_date_in_product: string;
        new_quality: string;
        old_price_product: string;
    }>({
        new_barcode_product: '',
        new_name_product: '',
        new_quantity_product: '',
        new_price_product: '0',
        new_status_product: '',
        new_category_product: '',
        new_tag_product: '',
        new_date_in_product: '',
        new_quality: '',
        old_price_product: '0',
    });

    const generateBarcode = () => {
        const prefix = 'LQD';
        const numbers = '0123456789';
        const length = 5;
        let randomNumber = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            randomNumber += numbers[randomIndex];
        }

        return prefix + randomNumber;
    };

    const [input, setInput] = useState({
        new_barcode_product: generateBarcode() ?? '',
        new_name_product: '',
        new_quantity_product: '1',
        new_price_product: '0',
        new_status_product: '',
        new_category_product: '',
        condition: '',
        description: '',
        old_price_product: '0',
        new_tag_product: '',
    });

    const { data: latestPrices, isSuccess: isSuccessLatestPrice } = useLatestPriceQuery(input.old_price_product !== '' ? input.old_price_product : '0');

    const dataLatestPrices: any = useMemo(() => {
        if (isSuccessLatestPrice) {
            return latestPrices.data.resource;
        }
    }, [isSuccessLatestPrice, latestPrices]);
    console.log(input);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                new_barcode_product: input.new_barcode_product,
                new_name_product: input.new_name_product,
                new_quantity_product: input.new_quantity_product,
                old_price_product: input.old_price_product,
                new_status_product: 'display',
                new_category_product: input.new_category_product,
                new_price_product: input.new_price_product,
                new_tag_product: input.new_tag_product,
                condition: input.condition,
                description: input.description,
            };
            await addProduct(body)
                .unwrap()
                .then((res) => {
                    if (parseFloat(input.old_price_product) >= 100000 && input.condition === 'lolos') {
                        setIsBarcode(true);
                    }
                    toast.success('Product berhasil ditambah');
                    setResponse(res);
                    setInput({
                        new_barcode_product: generateBarcode() ?? '',
                        new_name_product: '',
                        new_quantity_product: '1',
                        new_price_product: '0',
                        new_status_product: '',
                        new_category_product: '',
                        condition: '',
                        description: '',
                        old_price_product: '',
                        new_tag_product: '',
                    });
                    setDiskon('0');
                })
                .catch((err: any) => toast.error(err.message));
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        const pricedDiscount = (parseFloat(input.old_price_product) - parseFloat(input.old_price_product) * (parseFloat(diskon) / 100)).toString();
        setInput((prev) => ({ ...prev, new_price_product: pricedDiscount }));
    }, [input.old_price_product, diskon]);

    useEffect(() => {
        setInput((prev) => ({ ...prev, new_tag_product: dataLatestPrices?.warna?.name_color ?? '' }));
        if (dataLatestPrices?.warna?.name_color) {
            setInput((prev) => ({ ...prev, new_category_product: '' }));
            setDiskon('0');
        }
    }, [dataLatestPrices]);

    if (results?.isError) {
        return <Alert message="Anda tidak berhak mengakses halaman ini" />;
    }

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Manual Inbound</span>
                </li>
            </ul>

            <div className="flex gap-4">
                <div className="w-full gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold my-4">ADD DATA NEW</h1>
                    </div>
                    {isBarcode ? (
                        <div className="panel">
                            <button type="button" onClick={() => setIsBarcode(false)} className="btn btn-primary mb-4">
                                New Product
                            </button>
                            <BarcodePrinted
                                barcode={response.new_barcode_product}
                                newPrice={response.new_price_product}
                                oldPrice={response.old_price_product}
                                category={response.new_category_product}
                            />
                        </div>
                    ) : (
                        <form className="w-full flex gap-x-2" onSubmit={handleSubmit}>
                            <div className="w-2/5">
                                <div className="space-y-5 col-span-2 panel w-full">
                                    <div className="flex items-center  justify-between mb-2">
                                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                            Barcode:
                                        </label>
                                        <input
                                            id="barcode"
                                            type="text"
                                            className="form-input w-[300px]"
                                            value={input.new_barcode_product}
                                            onChange={(e) => setInput((prev) => ({ ...prev, new_barcode_product: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center  justify-between mb-2">
                                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                            Nama Barang:
                                        </label>
                                        <input
                                            id="categoryName"
                                            type="text"
                                            className="form-input w-[300px]"
                                            value={input.new_name_product}
                                            onChange={(e) => setInput((prev) => ({ ...prev, new_name_product: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center  justify-between mb-2">
                                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                            Harga :
                                        </label>
                                        <input
                                            id="categoryName"
                                            type="number"
                                            className="form-input w-[300px]"
                                            value={input.old_price_product}
                                            onChange={(e) => setInput((prev) => ({ ...prev, old_price_product: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                                            QTY :
                                        </label>
                                        <input
                                            id="qty"
                                            type="number"
                                            className="form-input w-[300px]"
                                            value={input.new_quantity_product}
                                            onChange={(e) => setInput((prev) => ({ ...prev, new_quantity_product: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center  justify-between mb-2">
                                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                            Harga Diskon :
                                        </label>
                                        <input
                                            id="categoryName"
                                            type="number"
                                            className="form-input w-[300px]"
                                            value={input.new_price_product}
                                            onChange={(e) => setInput((prev) => ({ ...prev, new_price_product: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-3/5 gap-4">
                                <div className="mb-5 panel">
                                    <Tab.Group>
                                        <div className="mx-10 mb-5 sm:mb-0">
                                            <Tab.List className="mt-3 mb-6 flex border-b border-white-light gap-4 dark:border-[#191e3a]">
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${
                                                                selected ? 'bg-info text-white !outline-none' : ''
                                                            } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                                            onClick={() => {
                                                                setInput((prev) => ({ ...prev, description: '', new_category_product: '' }));
                                                                setDiskon('0');
                                                            }}
                                                        >
                                                            Lolos
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${
                                                                selected ? 'bg-info text-white !outline-none' : ''
                                                            } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                                            onClick={() => {
                                                                setInput((prev) => ({ ...prev, description: '', new_category_product: '' }));
                                                                setDiskon('0');
                                                            }}
                                                        >
                                                            Damaged
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${
                                                                selected ? 'bg-info text-white !outline-none' : ''
                                                            } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                                            onClick={() => {
                                                                setInput((prev) => ({ ...prev, description: '', new_category_product: '' }));
                                                                setDiskon('0');
                                                            }}
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
                                                    {dataLatestPrices?.warna?.name_color ? (
                                                        <div className="h-10">
                                                            Tag Warna: <span className="font-bold">{dataLatestPrices?.warna?.name_color}</span>
                                                        </div>
                                                    ) : (
                                                        dataLatestPrices?.category.map((option: any) => (
                                                            <label key={option.id} className="flex items-center mt-1 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    disabled={parseFloat(input.old_price_product) < 100000 || !parseFloat(input.old_price_product)}
                                                                    className="form-radio text-success peer w-6 h-6"
                                                                    name="radioOption"
                                                                    value={option.name_category}
                                                                    checked={option.name_category === input.new_category_product}
                                                                    onChange={() => {
                                                                        setInput((prev) => ({ ...prev, condition: 'lolos', description: '', new_category_product: option.name_category }));
                                                                        setDiskon(option.discount_category);
                                                                    }}
                                                                />
                                                                <span className="text-white-dark">{option.name_category}</span>
                                                            </label>
                                                        ))
                                                    )}
                                                </div>
                                            </Tab.Panel>
                                            <Tab.Panel>
                                                <div>
                                                    <div className="flex items-start pt-5">
                                                        <div className="flex-auto">
                                                            <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                                            <textarea
                                                                value={input.description}
                                                                onChange={(e) => setInput((prev) => ({ ...prev, condition: 'damaged', description: e.target.value }))}
                                                                rows={4}
                                                                className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                                            ></textarea>
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
                                                                value={input.description}
                                                                onChange={(e) => setInput((prev) => ({ ...prev, condition: 'damaged', description: e.target.value }))}
                                                                className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                        </Tab.Panels>
                                    </Tab.Group>
                                    <div className="flex justify-end">
                                        <button type="submit" className="w-full btn btn-info mt-4">
                                            SEND
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateManualInbound;
