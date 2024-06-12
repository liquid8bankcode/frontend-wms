import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { useGetDisplayExpiredQuery, useGetExpiredProductsQuery } from '../../../../store/services/productNewApi';
import { ProductExpiredItem } from '../../../../store/services/types';
import { formatRupiah, generateRandomString } from '../../../../helper/functions';
import {
    useCreateBundleMutation,
    useDeleteFilterProductBundlesMutation,
    useFilterProductBundleMutation,
    useGetBundleProductsQuery,
    useGetFilterProductBundlesQuery,
} from '../../../../store/services/bundleProductApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const CreateBundle = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const { data, isSuccess, refetch, isError } = useGetDisplayExpiredQuery({ page: leftTablePage, q: searchLeftTable });
    const filterBundles = useGetFilterProductBundlesQuery(rightTablePage);
    const [filterProductBundle, results] = useFilterProductBundleMutation();
    const [deleteFilterProductBundles, resultsDeleteBundle] = useDeleteFilterProductBundlesMutation();
    const [createBundle, resultsCreateBundle] = useCreateBundleMutation();
    const navigate = useNavigate();
    const bundleLists = useGetBundleProductsQuery({ page: 1, q: '' });

    const [nameBundle, setNameBundle] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<string>('');
    const [totalProductBundle, setTotalProductBundle] = useState<string>('');

    const expiredProducts: any = useMemo(() => {
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
            const body = {
                name_bundle: nameBundle,
                total_price_bundle: Number(totalPrice),
                total_price_custom_bundle: Number(customPrice),
                total_product_bundle: filterBundlesProducts?.length,
                barcode_bundle: generateRandomString(10),
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
            navigate('/storage/expired_product/bundle_product');
        } else if (resultsCreateBundle.isError) {
            toast.error(resultsCreateBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsCreateBundle]);

    useEffect(() => {
        const totalAmount = filterBundles?.data?.data.resource.data.data.reduce((accumulator: any, currentItem: any) => {
            return accumulator + parseFloat(currentItem.new_price_product);
        }, 0);
        setTotalPrice(JSON.stringify(totalAmount));
        setCustomPrice(JSON.stringify(totalAmount));
    }, [filterBundlesProducts]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
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
                    <Link to="/storage/expired_product/bundle_product">
                        <span>Slow Moving</span>
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
                        <input disabled id="categoryName" type="text" placeholder="Rp" className=" form-input w-[250px]" required value={formatRupiah(totalPrice ?? '0')} />
                    </div>
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
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div>
                    <span className="flex justify-end mr-64 text-sm font-semibold">Total Barang : {filterBundles.data?.data.resource.data.data.length} </span>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={expiredProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{(leftTablePage - 1) * expiredProducts?.length + (index + 1)}</span> },
                                    { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
                                    {
                                        accessor: 'firstName',
                                        title: 'Nama Produk',
                                        sortable: true,
                                        width: 220,
                                        render: (item: ProductExpiredItem) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    { accessor: 'category', title: 'Kategori', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_category_product}</span> },
                                    {
                                        accessor: 'totalMasuk',
                                        title: 'Total Masuk',
                                        sortable: true,
                                        render: (item: ProductExpiredItem, index: number) => <span>{formatRupiah(item.new_price_product)}</span>,
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
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{(rightTablePage - 1) * filterBundlesProducts?.length + (index + 1)}</span> },
                                    { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
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

export default CreateBundle;
