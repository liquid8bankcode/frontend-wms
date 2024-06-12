import { DataTable } from 'mantine-datatable';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductApprovesQuery } from '../../../../store/services/categoriesApi';
import { CheckProductDocumentItem, ProductApprovmentItem } from '../../../../store/services/types';
import { formatDate, formatRupiah } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import { useDeleteApproveMutation } from '../../../../store/services/checkProduct';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const ApprovementProduct = () => {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const { data, refetch, isError, isSuccess } = useGetProductApprovesQuery(page);
    const [deleteApprove, results] = useDeleteApproveMutation();

    const listApproveProduct: any = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results]);

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
                    title: 'Yakin ingin menhapus item ini?',
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
                        await deleteApprove(id);
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

    if (isError && !data?.data?.status) {
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
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Approvment Product</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">LIST APPROVE PRODUCT</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={listApproveProduct}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: ProductApprovmentItem, index: number) => <span>{(page - 1) * listApproveProduct?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'Kode Dokumen',
                                title: 'Kode Dokumen',
                                render: (item: ProductApprovmentItem) => <span className="font-semibold">{item.code_document}</span>,
                            },
                            {
                                accessor: 'Old Barcode',
                                title: 'Old Barcode',
                                render: (item: ProductApprovmentItem) => <span className="font-semibold">{item.old_barcode_product}</span>,
                            },
                            {
                                accessor: 'New Barcode',
                                title: 'New Barcode',
                                render: (item: ProductApprovmentItem) => <span className="font-semibold">{item.new_barcode_product}</span>,
                            },
                            {
                                accessor: 'Name',
                                title: 'Name',
                                render: (item: ProductApprovmentItem) => <span className="font-semibold">{item.new_name_product}</span>,
                            },
                            {
                                accessor: 'QTY',
                                title: 'QTY',
                                render: (item: ProductApprovmentItem) => <span className="font-semibold">{item.new_quantity_product}</span>,
                            },
                            {
                                accessor: 'Price',
                                title: 'Price',
                                render: (item: ProductApprovmentItem) => <span className="font-semibold">{formatRupiah(item.new_price_product)}</span>,
                            },
                            {
                                accessor: 'Status',
                                title: 'Status',
                                render: (item: ProductApprovmentItem) => <span className="badge whitespace-nowrap bg-primary ">{item.new_status_product}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: ProductApprovmentItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/inbound/check_product/approvment_product/detail/${item.id}`} state={{ code_document: item.code_document }}>
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ApprovementProduct;
