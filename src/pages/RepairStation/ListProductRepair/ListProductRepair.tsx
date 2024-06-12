import { DataTable } from 'mantine-datatable';
import { useEffect, useState, Fragment, useMemo, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetListProductRepairQuery, useUpdateProductRepairMutation, useUpdateThrowsMutation } from '../../../store/services/listProductAPI';
import { GetListProductRepairItem, ProdcutItem } from '../../../store/services/types';
import { useGetCategoriesQuery } from '../../../store/services/categoriesApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';
import { useLazyGetProductRepairQuery } from '../../../store/services/checkProduct';
import { formatRupiah } from '../../../helper/functions';
import BarcodePrinted from './BarcodePrinted';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

interface OldBarcodeDataProps {
    barcode: string;
    nama: string;
    newPrice: string;
    qty: string;
    header: string;
    setInput: Dispatch<
        SetStateAction<{
            old_barcode_product: string;
            old_price_product: string;
            new_barcode_product: string;
            new_name_product: string;
            new_price_product: string;
            new_quantity_product: string;
            new_category_product: string;
            new_status_product: string;
        }>
    >;
}

const OldBarcodeData: React.FC<OldBarcodeDataProps> = ({ barcode, nama, newPrice, qty, header, setInput }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-lg font-bold">{header}</h1>
            <div>
                <label htmlFor="gridBarcode1">Barcode</label>
                <input id="gridBarcode1" type="text" placeholder="Enter Barcode" name="old_barcode_product" className="form-input" value={barcode} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input id="gridNama1" type="text" placeholder="Enter Nama" name="new_name_product" className="form-input" value={nama} onChange={handleChange} disabled />
            </div>
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <input id="gridNama3" type="number" placeholder="Enter Nama" name="old_price_product" className="form-input" value={newPrice} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" name="new_quantity_product" className="form-input" value={qty} onChange={handleChange} disabled />
            </div>
        </div>
    );
};
interface NewBarcodeDataProps {
    barcode: string;
    nama: string;
    newPrice: string;
    qty: string;
    header: string;
    setInput: Dispatch<
        SetStateAction<{
            old_barcode_product: string;
            old_price_product: string;
            new_barcode_product: string;
            new_name_product: string;
            new_price_product: string;
            new_quantity_product: string;
            new_category_product: string;
            new_status_product: string;
        }>
    >;
}

const NewBarcodeData: React.FC<NewBarcodeDataProps> = ({ barcode, nama, newPrice, qty, header, setInput }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-lg font-bold">{header}</h1>
            <div>
                <label htmlFor="gridBarcode1">Barcode</label>
                <input id="gridBarcode1" type="text" placeholder="Enter Barcode" name="new_barcode_product" className="form-input" value={barcode} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input id="gridNama1" type="text" placeholder="Enter Nama" name="new_name_product" className="form-input" value={nama} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <input id="gridNama3" type="number" placeholder="Enter Nama" name="new_price_product" className="form-input" value={newPrice} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" name="new_quantity_product" className="form-input" value={qty} onChange={handleChange} />
            </div>
        </div>
    );
};

const ListProductRepair = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data: listProductData, refetch, isError } = useGetListProductRepairQuery({ page, q: search });
    const { data: categoriesData } = useGetCategoriesQuery(undefined);
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const [productData, setProductData] = useState<ProdcutItem | null>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [repair, setRepair] = useState(false);
    const [throws, setThrows] = useState(false);
    const [updateThrows, results] = useUpdateThrowsMutation();
    // tandanibos
    const [getProductRepair, getProductRepairResults] = useLazyGetProductRepairQuery();
    const [countPercentage, setCountPercentage] = useState<number>(0);
    const [isReset, setIsReset] = useState<boolean>(false);
    const [isBarcode, setIsBarcode] = useState<boolean>(false);

    const dataListProductRepair: any = useMemo(() => {
        return listProductData?.data?.resource?.data;
    }, [listProductData]);

    const dataCategories = useMemo(() => {
        return categoriesData?.data.resource;
    }, [categoriesData]);

    const [input, setInput] = useState({
        old_barcode_product: '',
        old_price_product: '0',
        new_barcode_product: '',
        new_name_product: '',
        new_price_product: '',
        new_quantity_product: '0',
        new_category_product: '',
        new_status_product: '',
    });

    const closePopup = () => {
        setRepair(false);
        setIsReset(true);
        setInput({
            old_barcode_product: '',
            old_price_product: '0',
            new_barcode_product: '',
            new_name_product: '',
            new_price_product: '',
            new_quantity_product: '0',
            new_category_product: '',
            new_status_product: '',
        });
    };
    const [updateProductRepair, result] = useUpdateProductRepairMutation();

    // new price
    const handleNewPrice = ({ value, percentage }: any) => {
        setInput((prevState) => ({
            ...prevState,
            new_category_product: value,
        }));
        setCountPercentage(parseInt(percentage));
    };

    // to display
    const handleRepair = async (id: number) => {
        setSelectedItem(id);
        const selectedProduct = dataListProductRepair?.find((product: any) => product.id === id);
        // tandanibos
        await getProductRepair({ code_document: selectedProduct.code_document, old_barcode_product: selectedProduct.old_barcode_product });
        setProductData(selectedProduct || null);
    };

    const colorTags = useMemo(() => {
        if (getProductRepairResults.isSuccess && getProductRepairResults.data.data.resource.color_tags !== undefined) {
            return getProductRepairResults.data.data.resource.color_tags[0];
        }
    }, [getProductRepairResults]);

    const handleRepairSend = async (id: number) => {
        try {
            const body = {
                old_barcode_product: input.old_barcode_product,
                old_price_product: input.old_price_product,
                new_status_product: input.new_status_product,
                new_barcode_product: input.new_barcode_product,
                new_name_product: input?.new_name_product,
                new_price_product: input.new_price_product,
                new_quantity_product: input?.new_quantity_product,
                new_category_product: input?.new_category_product,
            };
            await updateProductRepair({ id, body });
            console.log("DATA SENT", body)
        } catch (err) {
            console.error(err);
        }
    };

    const handleThrows = (id: number) => {
        setSelectedItem(id);
        setThrows(true);
    };

    const handleThrowsConfirmation = async (id: number) => {
        try {
            await updateThrows(id);
            refetch();
        } catch (err) {
            console.error('Error updating QCD:', err);
        } finally {
            setThrows(false);
        }
    };

    const calculateDiscount = (): number => {
        const selectedCategoryItem = dataCategories?.find((category) => category.id === selectedCategory);
        return selectedCategoryItem ? parseFloat(selectedCategoryItem.discount_category) : 0;
    };

    const [calculatedPrice, setCalculatedPrice] = useState<string>('0');

    useEffect(() => {
        const oldPrice = parseFloat(input?.old_price_product ?? '0');
        const calculatedDiscount = calculateDiscount();
        const discountedPrice = oldPrice - oldPrice * (calculatedDiscount / 100);
        setCalculatedPrice(discountedPrice.toFixed(2));
    }, [selectedCategory, productData]);

    useEffect(() => {
        setInput((prev) => ({
            ...prev,
            old_barcode_product: productData?.old_barcode_product ?? '',
            old_price_product: productData?.old_price_product ?? '0',
            new_barcode_product: productData?.new_barcode_product ?? '',
            new_name_product: productData?.new_name_product ?? '',
            new_price_product: productData?.new_price_product ?? '',
            new_quantity_product: productData?.new_quantity_product ?? '0',
            new_category_product: productData?.new_category_product ?? '',
            new_status_product: productData?.new_status_product ?? '',
        }));
    }, [productData]);

    useEffect(() => {
        setInput((prevState) => ({
            ...prevState,
            new_price_product: calculatedPrice,
        }));
    }, [calculatedPrice, productData]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
        if (result.isSuccess) {
            toast.success(result?.data?.data?.message);
            refetch();
        } else if (result.isError) {
            toast.error(result?.data?.data?.message);
        }
    }, [results, result]);

    // tandanibos
    useEffect(() => {
        if (getProductRepairResults.isSuccess) {
            setRepair(true);
        }
    }, [getProductRepairResults]);

    useEffect(() => {
        if (result.isSuccess) {
            if (!colorTags) {
                setRepair(true);
                setIsBarcode(true);
            } else {
                setRepair(false);
                setIsReset(true);
            }
        }
    }, [result]);

    if (isError && !listProductData?.data?.status) {
        return <Alert message={listProductData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Repair Station</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Product Repair</span>
                </li>
            </ul>

            <div className="mb-5">
                <Transition appear show={repair} as={Fragment}>
                    <Dialog as="div" open={repair} onClose={closePopup}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-[2xl] text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Repair</div>
                                        </div>
                                        <div className="space-y-5 col-span-2 panel">
                                            <div className="grid grid-cols-3 gap-4 h-full">
                                                <div className="grid col-span-2 grid-cols-2 panel gap-4">
                                                    <OldBarcodeData
                                                        barcode={input.old_barcode_product}
                                                        nama={productData?.new_name_product ?? ''}
                                                        newPrice={input.old_price_product}
                                                        qty={productData?.new_quantity_product ?? '0'}
                                                        header="Old Data"
                                                        setInput={setInput}
                                                    />
                                                    <NewBarcodeData
                                                        barcode={input.new_barcode_product}
                                                        nama={input.new_name_product}
                                                        newPrice={input.new_price_product}
                                                        qty={input.new_quantity_product}
                                                        header="New Data"
                                                        setInput={setInput}
                                                    />
                                                </div>
                                                <div className="h-full">
                                                    <BarcodePrinted
                                                        barcode={input.new_barcode_product}
                                                        category={input.new_category_product}
                                                        newPrice={formatRupiah(input.new_price_product)}
                                                        oldPrice={formatRupiah(input.old_price_product.toString())}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1  ss:grid-cols-1 sm:grid-cols-1">
                                                {colorTags && parseFloat(input.old_price_product) < 100000 && (
                                                    <div className="flex flex-col panel gap-4">
                                                        <h1 className="flex justify-start text-lg font-bold">Tag Color</h1>
                                                        <div className="flex items-center gap-x-2">
                                                            <div style={{ background: colorTags.hexa_code_color }} className="h-4 w-4 rounded" />
                                                            <div>{colorTags.name_color}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                {parseFloat(input.old_price_product) >= 100000 && productData?.new_category_product && (
                                                    <div className="flex flex-col panel gap-4">
                                                        <h1 className="flex justify-start text-lg font-bold">Category</h1>
                                                        <div className="grid grid-cols-5 gap-4">
                                                            {dataCategories?.map((category, index) => (
                                                                <label key={category.id} className="flex items-center col-span-1 mt-1 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-success peer w-6 h-6"
                                                                        name="radioOption"
                                                                        value={category.name_category}
                                                                        onChange={(e) => {
                                                                            setIsReset(false);
                                                                            handleNewPrice({ value: e.target.value, percentage: category.discount_category });
                                                                            setSelectedCategory(category.id);
                                                                        }}
                                                                    />
                                                                    <span className="text-white-dark">{category.name_category}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {parseFloat(input.old_price_product) >= 100000 && !productData?.new_category_product && (
                                                    <div className="flex flex-col panel gap-4">
                                                        <h1 className="flex justify-start text-lg font-bold">Category</h1>
                                                        <div className="grid grid-cols-5 gap-4">
                                                            {dataCategories?.map((category, index) => (
                                                                <label key={category.id} className="flex items-center col-span-1 mt-1 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-success peer w-6 h-6"
                                                                        name="radioOption"
                                                                        value={category.name_category}
                                                                        onChange={(e) => {
                                                                            setIsReset(false);
                                                                            handleNewPrice({ value: e.target.value, percentage: category.discount_category });
                                                                            setSelectedCategory(category.id);
                                                                        }}
                                                                    />
                                                                    <span className="text-white-dark">{category.name_category}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex justify-end items-center mt-8 gap-x-2">
                                                    <button type="button" className=" px-2 btn btn-outline-danger" onClick={() => setRepair(false)}>
                                                        <IconArrowBackward className="flex mx-2" fill={true} /> Kembali
                                                    </button>
                                                    <Link to="/repair_station/list_product_repair">
                                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleRepairSend(selectedItem || 0)}>
                                                            To Display
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={throws} as={Fragment}>
                    <Dialog as="div" open={throws} onClose={() => setThrows(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">QCD List Product</div>
                                        </div>
                                        <div className="p-5">
                                            <div>
                                                <form className="space-y-5">
                                                    <div>
                                                        <h1>Apakah Anda yakin ingin melakukan QCD?</h1>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setThrows(false)}>
                                                    Kembali
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleThrowsConfirmation(selectedItem || 0)}>
                                                    QCD
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">List Product Repair</h5>
                <div className="relative w-[220px] ms-auto mb-4">
                    <input
                        type="text"
                        className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className="datatables">
                    <DataTable
                        records={dataListProductRepair}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'NO',
                                render: (item: GetListProductRepairItem, index: number) => <span>{(page - 1) * dataListProductRepair?.length + (index + 1)}</span>,
                            },
                            { accessor: 'barcode', title: 'BARCODE', render: (item: GetListProductRepairItem) => <span className="font-semibold">{item.old_barcode_product}</span> },
                            { accessor: 'firstName', title: 'NAMA', render: (item: GetListProductRepairItem) => <span className="font-semibold">{item.new_name_product}</span> },
                            {
                                accessor: 'keterangan',
                                title: 'KETERANGAN',
                                render: (item: GetListProductRepairItem) => {
                                    const newQualityData = JSON.parse(item.new_quality);
                                    const keterangan = newQualityData.damaged || newQualityData.abnormal || newQualityData.lolos;
                                    return <span className="font-semibold">{keterangan}</span>;
                                },
                            },
                            {
                                accessor: 'action',
                                title: 'OPSI',
                                titleClassName: '!text-center',
                                render: (item: GetListProductRepairItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button type="button" className="btn btn-outline-info" onClick={() => handleRepair(item.id)}>
                                            To Display
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleThrows(item.id)}>
                                            QCD
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={listProductData?.data?.resource?.total ?? 0}
                        recordsPerPage={listProductData?.data?.resource?.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListProductRepair;