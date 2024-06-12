import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { DataTable } from 'mantine-datatable';
import { GetCategoriesItem } from '../../../store/services/types';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../../../store/services/categoriesApi';
import { formatRupiah } from '../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';

const CategorySetting = () => {
    const navigate = useNavigate();
    const { data, refetch, isError } = useGetCategoriesQuery(undefined);
    const [deleteCategory, results] = useDeleteCategoryMutation();

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
                        await deleteCategory(id);
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

    const dataCategories = useMemo(() => {
        return data?.data.resource;
    }, [data]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
        refetch();
    }, [results]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="SubKategori" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Sub Kategori</h5>
                <div className="mb-4 flex justify-between">
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
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
                    <button type="button" className="btn btn-primary uppercase px-6" onClick={() => navigate('/storage/categorysetting/add_category')}>
                        add data
                    </button>
                </div>
                <div className="datatables">
                    <DataTable
                        records={dataCategories}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: GetCategoriesItem, index: number) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'Nama Kategori',
                                title: 'Nama Kategori',
                                render: (item: GetCategoriesItem) => <span>{item.name_category}</span>,
                            },
                            {
                                accessor: 'Discount',
                                title: 'Discount',
                                render: (item: GetCategoriesItem) => <span>{item.discount_category + '%'}</span>,
                            },
                            {
                                accessor: 'Max Harga',
                                title: 'Max Harga',
                                render: (item: GetCategoriesItem) => <span>{formatRupiah(item.max_price_category)}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: GetCategoriesItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/storage/categorysetting/${item.id}`}
                                            state={{ name_category: item.name_category, discount_category: item.discount_category, max_price_category: item.max_price_category }}
                                        >
                                            <button type="button" className="btn btn-outline-info">
                                                Edit
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
                    />
                </div>
            </div>
        </>
    );
};

export default CategorySetting;
