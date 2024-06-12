import { DataTable } from 'mantine-datatable';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUnbundleListDumpMutation, useGetListDumpQuery, useDeleteListDumpMutation } from '../../../store/services/listDumpApi';
import { GetListDumpItem } from '../../../store/services/types';
import { Alert } from '../../../commons';
import { Dialog, Transition } from '@headlessui/react';
import { formatRupiah } from '../../../helper/functions';
import toast from 'react-hot-toast';
import IconPlus from '../../../components/Icon/IconPlus';
import Swal from 'sweetalert2';

const ListDump = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [unBundleListDump] = useUnbundleListDumpMutation();
    const [deleteListDump] = useDeleteListDumpMutation();

    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { data, isSuccess, refetch, isError } = useGetListDumpQuery({ page, q: search });
    const dataListDump = useMemo(() => {
        if (isSuccess) {
            return data?.data?.resource?.data;
        }
    }, [isSuccess, data]);

    const showAlertUnbundle = async ({ type, id }: { type: number; id: number | undefined }) => {
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
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.value) {
                        await unBundleListDump(id)
                            .unwrap()
                            .then((res) => {
                                toast.success(res.data.message);
                                refetch();
                            })
                            .catch((err) => {
                                toast.error(err.data.message);
                            });
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
    const showAlertDelete = async ({ type, id }: { type: number; id: number | undefined }) => {
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
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.value) {
                        await deleteListDump(id)
                            .unwrap()
                            .then((res) => {
                                toast.success(res.data.message);
                                refetch();
                            })
                            .catch((err) => {
                                toast.error(err.data.message);
                            });
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

    useEffect(() => {
        refetch();
    }, []);

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
                    <span>Repair Station</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>QCD</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">QCD</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <Link to="/repair_station/create_dump">
                            <button className="btn btn-outline-info">
                                <IconPlus />
                                Create
                            </button>
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={dataListDump}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode QCD', sortable: true, render: (item) => <span>{item.barcode_bundle}</span> },
                            { accessor: 'firstName', title: 'Nama Bundle', sortable: true, render: (item) => <span>{item?.name_bundle}</span> },
                            { accessor: 'Total Barang', title: 'Total Barang', sortable: true, render: (item) => <span>{item?.total_product_bundle}</span> },
                            { accessor: 'Total Price', title: 'Total Harga', sortable: true, render: (item) => <span>{formatRupiah(item?.total_price_custom_bundle)}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item) => <span className="badge whitespace-nowrap bg-primary">{item?.product_qcds[0]?.new_status_product ?? ''}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/repair_station/detail_dump/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                DETAIL
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlertUnbundle({ type: 11, id: item.id })}>
                                            UNBUNDLE
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlertDelete({ type: 11, id: item.id })}>
                                            TO SCRAP BUNDLE
                                        </button>
                                    </div>
                                ),
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

export default ListDump;
