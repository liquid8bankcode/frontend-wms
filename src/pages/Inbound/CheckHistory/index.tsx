import { Link } from 'react-router-dom';
import { useDeleteRiwayatCheckMutation, useGetRiwayatChecksQuery } from '../../../store/services/riwayatApi';
import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { GetRiwayatcheckItem } from '../../../store/services/types';
import { formatDate } from '../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';

const CheckHistory = () => {
    const [page, setPage] = useState<number>(1);
    const { data, refetch, isSuccess, isError } = useGetRiwayatChecksQuery(page);
    const [deleteRiwayatCheck, results] = useDeleteRiwayatCheckMutation();

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
                        await deleteRiwayatCheck(id);
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

    const riwayatCheckData: any = useMemo(() => {
        if (data?.data.status && isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [data]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results]);

    if (isError && !data?.data?.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div className="panel mt-6 min-h-[450px]">
            <h5 className="font-semibold text-lg dark:text-white-light mb-5">Riwayat Check</h5>
            <DataTable
                records={riwayatCheckData}
                columns={[
                    {
                        accessor: 'id',
                        title: 'No',
                        render: (item: GetRiwayatcheckItem, index: number) => <span>{(page - 1) * riwayatCheckData?.length + (index + 1)}</span>,
                    },
                    {
                        accessor: 'date_document',
                        title: 'Nama Data',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.code_document}</span>,
                    },
                    {
                        accessor: 'tanggal',
                        title: 'Tanggal',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{formatDate(item.created_at)}</span>,
                    },
                    {
                        accessor: 'total_data',
                        title: 'Total Data',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.total_data}</span>,
                    },
                    {
                        accessor: 'total masuk',
                        title: 'Total Masuk',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.total_data_in}</span>,
                    },
                    {
                        accessor: 'status_document',
                        title: 'Status Check',
                        render: () => (
                            <button type="button" className="rounded-xl btn-sm px-4 bg-[#2EFF43] uppercase text-white">
                                Done
                            </button>
                        ),
                    },
                    {
                        accessor: 'status_approve',
                        title: 'Status Approve',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.status_approve}</span>,
                    },
                    {
                        accessor: 'Aksi',
                        title: 'Aksi',
                        render: (item: GetRiwayatcheckItem) => (
                            <div className="flex items-center w-max mx-auto gap-6">
                                <Link to={`/inbound/check_history/${item.id}`}>
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
    );
};

export default CheckHistory;
