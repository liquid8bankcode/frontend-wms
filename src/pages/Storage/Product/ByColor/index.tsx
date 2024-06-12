import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../../../components';
import { DataTable } from 'mantine-datatable';
import { useDeleteProductNewMutation, useGetAllProductNewQuery, useProductByColorQuery } from '../../../../store/services/productNewApi';
import { NewProductItem } from '../../../../store/services/types';
import { formatDate, formatRupiah, useDebounce } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const ProductByColor = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const debounceValue = useDebounce(search);
    const { data, isError, refetch, isSuccess } = useProductByColorQuery({ page, q: debounceValue });
    const [deleteProductNew, results] = useDeleteProductNewMutation();

    const showAlert = async ({ type, id }: any) => {
        if (type === 11) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary',
                    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                    popup: 'sweet-alerts',
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: 'Yakin ingin menghapus item ini?',
                    text: 'Data tidak bisa di kembalikan setelah di hapus',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.value) {
                        await deleteProductNew(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
        if (type === 15) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Berhasil Dikirim',
                padding: '10px 20px',
            });
        }
        if (type == 20) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Data Berhasil Ditambah',
                padding: '10px 20px',
            });
        }
    };

    const productNewData = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

    useEffect(() => {
        refetch();
    }, [data, refetch]);

    // const [dataImport, setDataImport] = useState<ImportProduct | undefined>();
    // const getImportData = (data: ImportProduct) => {
    //     setDataImport(data);
    // };

    // const message = useMemo(() => {
    //     if (dataImport) {
    //         return dataImport?.data?.resource;
    //     }
    // }, [dataImport]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" current="Produk" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Product by Color</h5>
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
                        records={productNewData}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: NewProductItem, index: number) => <span>{(page - 1) * productNewData?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'new barcode product',
                                title: 'OLD BARCODE',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.old_barcode_product}</span>,
                            },
                            {
                                accessor: 'old barcode product',
                                title: 'PRODUCT NAME',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.new_name_product}</span>,
                            },
                            {
                                accessor: 'New Category Product',
                                title: 'NEW CATEGORY',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.new_category_product}</span>,
                            },
                            {
                                accessor: 'New Price Product',
                                title: 'NEW PRICE',
                                render: (item: NewProductItem) => <span className="font-semibold">{formatRupiah(item.new_price_product ?? '0')}</span>,
                            },
                            {
                                accessor: 'new date in product',
                                title: 'NEW DATE',
                                render: (item: NewProductItem) => <span className="font-semibold">{formatDate(item.new_date_in_product)}</span>,
                            },
                            {
                                accessor: 'status_document',
                                title: 'Status',
                                render: (item) => (
                                    <button type="button" className="rounded-xl btn-sm px-4 bg-green-500 uppercase text-white">
                                        {item.new_status_product}
                                    </button>
                                ),
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: NewProductItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/product/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                        totalRecords={data?.data.resource.total ?? 0}
                        recordsPerPage={data?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                        minHeight={200}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductByColor;
