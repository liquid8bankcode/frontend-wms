import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../../../components';
import { DataTable } from 'mantine-datatable';
import { useDeleteColorTagMutation, useGetAllColorTagQuery, useUpdateColorTagMutation } from '../../../../store/services/colorTagApi';
import { ColorTagItem } from '../../../../store/services/types';
import IconPlus from '../../../../components/Icon/IconPlus';
import { formatRupiah } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const TagWarna = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, refetch, isError } = useGetAllColorTagQuery({ page, q: search });
    const [deleteColorTag, deleteResults] = useDeleteColorTagMutation();

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
                        await deleteColorTag(id);
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

    const dataColorTag: any = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

    useEffect(() => {
        refetch();
    }, [data, refetch]);

    useEffect(() => {
        if (deleteResults.isSuccess) {
            toast.success(deleteResults.data.data.message);
            refetch();
        } else if (deleteResults.isError) {
            toast.error(deleteResults.data.data.message);
        }
    }, [deleteResults]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="Tag Warna" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Tag Warna</h5>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <Link to="/storage/categorysetting/tag_warna/add">
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
                        records={dataColorTag}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: ColorTagItem, index: number) => <span>{(page - 1) * dataColorTag?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'Tag Warna',
                                title: 'Tag Warna',
                                render: (item: ColorTagItem) => <div className="w-[19px] h-[21px]" style={{ backgroundColor: item.hexa_code_color }}></div>,
                            },
                            {
                                accessor: 'Min Price',
                                title: 'Min Price',
                                render: (item: ColorTagItem) => <span>{formatRupiah(item.min_price_color)}</span>,
                            },
                            {
                                accessor: 'Fixed Price',
                                title: 'Fixed Price',
                                render: (item: ColorTagItem) => <span>{formatRupiah(item.fixed_price_color)}</span>,
                            },
                            {
                                accessor: 'Max Price',
                                title: 'Max Price',
                                render: (item: ColorTagItem) => <span>{formatRupiah(item.max_price_color)}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: ColorTagItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/storage/categorysetting/tag_warna/${item.id}`}
                                            state={{
                                                hexa_code_color: item.hexa_code_color,
                                                name_color: item.name_color,
                                                min_price_color: item.min_price_color,
                                                max_price_color: item.max_price_color,
                                                fixed_price_color: item.fixed_price_color,
                                            }}
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
                        totalRecords={data?.data.resource.total ?? 0}
                        recordsPerPage={data?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </>
    );
};

export default TagWarna;
