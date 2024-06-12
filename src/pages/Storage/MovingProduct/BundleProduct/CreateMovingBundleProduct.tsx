import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDisplayExpiredQuery } from '../../../../store/services/productNewApi';
import { ProductExpiredItem } from '../../../../store/services/types';
import { formatRupiah, generateRandomStringFormatBundle, useDebounce } from '../../../../helper/functions';
import {
    useCreateBundleMutation,
    useDeleteFilterProductBundlesMutation,
    useFilterProductBundleMutation,
    useGetBundleProductsQuery,
    useGetFilterProductBundlesQuery,
} from '../../../../store/services/bundleProductApi';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import BarcodePrinted from '../../../Inbound/CheckProduct/BarcodePrinted';

const CreateMovingBundleProduct = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useGetDisplayExpiredQuery({ page: leftTablePage, q: debounceValue });
    const filterBundles = useGetFilterProductBundlesQuery(rightTablePage);
    const [filterProductBundle, results] = useFilterProductBundleMutation();
    const [deleteFilterProductBundles, resultsDeleteBundle] = useDeleteFilterProductBundlesMutation();
    const [createBundle, resultsCreateBundle] = useCreateBundleMutation();
    const navigate = useNavigate();
    const bundleLists = useGetBundleProductsQuery({ page: 1, q: '' });
    const [isCategory, setIsCategory] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [customDisplay, setCustomDisplay] = useState<any>('0');

    const [nameBundle, setNameBundle] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<string | undefined>('');
    const [totalProductBundle, setTotalProductBundle] = useState<string>('');
    const [colorName, setColorName] = useState<string>('');
    const [isBarcodePrint, setIsBarcodePrint] = useState<boolean>(false);
    const [barcode, setBarcode] = useState<string>('');

    const expiredProducts = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const filterBundlesProducts: any = useMemo(() => {
        if (filterBundles.isSuccess) {
            return filterBundles.data.data.resource.data.data;
        }
    }, [filterBundles.data, data]);

    const handleAddFilterBundle = async (id: number) => {
        try {
            await filterProductBundle(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProductBundle = async (id: number) => {
        try {
            await deleteFilterProductBundles(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddLeftTable = (item: ProductExpiredItem) => {
        handleAddFilterBundle(item.id);
        setTotalProductBundle(item.new_quantity_product ?? '');
    };

    const handleCreateBundle = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const barcodeString = generateRandomStringFormatBundle();
            setBarcode(barcodeString);
            const body = {
                name_bundle: nameBundle,
                total_price_bundle: filterBundles?.data?.data.resource.total_new_price ?? '0',
                total_price_custom_bundle: Number(customPrice),
                total_product_bundle: filterBundlesProducts?.length,
                barcode_bundle: barcodeString,
                category: selectedCategory,
                name_color: colorName,
            };

            await createBundle(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);

            refetch();
            filterBundles.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterBundles.isSuccess]);

    useEffect(() => {
        if (resultsDeleteBundle.isSuccess) {
            toast.success(resultsDeleteBundle?.data.data.message);
            refetch();
            filterBundles.refetch();
        } else if (resultsDeleteBundle.isError) {
            toast.error(resultsDeleteBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteBundle]);

    useEffect(() => {
        if (resultsCreateBundle.isSuccess) {
            toast.success(resultsCreateBundle?.data.data.message);
            bundleLists?.refetch();
            if (categories.length !== 0) {
                setIsBarcodePrint(true);
                setCustomDisplay(customPrice);
            } else {
                navigate('/storage/moving_product/bundle');
            }
        } else if (resultsCreateBundle.isError) {
            toast.error(resultsCreateBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsCreateBundle]);

    useEffect(() => {
        if ((filterBundles?.data?.data?.resource?.total_new_price as any) >= 100000 && (filterBundles?.data?.data?.resource?.category as any) !== null) {
            setIsCategory(true);
            setCategories(filterBundles?.data?.data?.resource?.category);
            setColorName('');
            setCustomPrice(JSON.stringify(filterBundles?.data?.data?.resource?.total_new_price));
        } else {
            setIsCategory(false);
            if (filterBundles?.data?.data?.resource.data.data.length !== 0) {
                setCustomPrice(filterBundles?.data?.data?.resource.data.data[0]?.new_tag_product[0]?.fixed_price_color ?? '0');
                setColorName(filterBundles?.data?.data?.resource.data.data[0]?.new_tag_product[0]?.name_color ?? '');
            } else {
                setCustomPrice('0');
                setColorName('');
            }
        }
    }, [filterBundles?.data?.data.resource.total_new_price]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/moving_product/bundle">
                        <span>Moving Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create Bundle</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Create Bundle</h1>
            </div>
            <div>
                <div className="flex items-start">
                    <form className="w-[400px] mb-4 " onSubmit={handleCreateBundle}>
                        <button type="submit" className="btn btn-primary mb-4 px-16">
                            Create Bundle
                        </button>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Bundle :
                            </label>
                            <input id="categoryName" type="text" className=" form-input w-[250px]" required value={nameBundle} onChange={(e) => setNameBundle(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga :
                            </label>
                            <input
                                disabled
                                id="categoryName"
                                type="text"
                                placeholder="Rp"
                                className="form-input w-[250px]"
                                required
                                value={formatRupiah(filterBundles?.data?.data.resource.total_new_price.toString() ?? '0')}
                            />
                        </div>
                        {!isCategory && (
                            <div className="flex items-center justify-between mb-2 mt-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Color Name:
                                </label>
                                <input id="Color Name" disabled type="text" className=" form-input w-[250px]" required value={colorName} />
                            </div>
                        )}
                        {isCategory && (
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="kategori" className="text-[15px] font-semibold whitespace-nowrap">
                                    Kategori :
                                </label>
                                <select
                                    id="gridState"
                                    className="form-input w-[250px]"
                                    onChange={(e) => {
                                        const selectedNameCategory = e.target.selectedOptions[0].getAttribute('data-name-category');
                                        setSelectedCategory(selectedNameCategory);
                                        const totalNewPrice = Number(filterBundles?.data?.data.resource.total_new_price);
                                        const priceDiscount = totalNewPrice - (totalNewPrice * Number(e.target.value)) / 100;
                                        setCustomPrice(JSON.stringify(priceDiscount));
                                    }}
                                >
                                    <option>Choose...</option>
                                    {categories?.map((item: any, index: any) => {
                                        return (
                                            <option key={index} value={item.discount_category} data-name-category={item.name_category}>
                                                {item.name_category} {item.discount_category + '%'}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Harga :
                            </label>
                            <input id="categoryName" type="text" placeholder="Rp" className=" form-input w-[250px]" required value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} />
                        </div>
                        <input
                            type="text"
                            className="mt-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                            value={searchLeftTable}
                            onChange={(e) => setSearchLeftTable(e.target.value)}
                        />
                    </form>
                    {isBarcodePrint && (
                        <div className="ml-12">
                            <BarcodePrinted
                                barcode={barcode}
                                category={selectedCategory}
                                newPrice={formatRupiah(customDisplay)}
                                oldPrice={formatRupiah(filterBundles?.data?.data.resource.total_new_price.toString() ?? '0')}
                                isBundle
                            />
                        </div>
                    )}
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/moving_product/bundle">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <span className="flex justify-end mr-64 text-sm font-semibold">Total Barang : {filterBundles.data?.data.resource.data.total} </span>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={expiredProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProductExpiredItem) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'firstName',
                                        title: 'Nama Produk',
                                        sortable: true,
                                        width: 220,
                                        render: (item: ProductExpiredItem) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    {
                                        accessor: 'category',
                                        title: 'Kategori',
                                        sortable: true,
                                        render: (item: ProductExpiredItem) => <span>{item.new_category_product ? item.new_category_product : item.new_tag_product}</span>,
                                    },
                                    {
                                        accessor: 'harga',
                                        title: 'Harga',
                                        sortable: true,
                                        render: (item: ProductExpiredItem, index: number) => {
                                            let price: string | undefined;
                                            if (item.new_category_product !== null && item.new_category_product !== undefined) {
                                                price = item.new_price_product;
                                            } else if (item.new_tag_product !== null && item.new_tag_product !== undefined) {
                                                price = item.fixed_price;
                                            } else {
                                                price = item.old_price_product;
                                            }

                                            return <span>{price !== undefined ? formatRupiah(price) : '0'}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductExpiredItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                <button type="button" className="btn btn-outline-info" onClick={() => handleAddLeftTable(item)}>
                                                    Add
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={leftTablePage}
                                onPageChange={(prevPage) => setLeftTablePage(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={filterBundlesProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProductExpiredItem) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
                                        },
                                    },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductExpiredItem) => (
                                            <div className="flex items-center space-x-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteProductBundle(item.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={rightTablePage}
                                onPageChange={(prevPage) => setRightTablePage(prevPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMovingBundleProduct;
