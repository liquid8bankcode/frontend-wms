import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconArrowForward from '../../../components/Icon/IconArrowForward';
import { useDeleteProductOldMutation, useDetailProductOldQuery } from '../../../store/services/productOldsApi';
import { formatRupiah } from '../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const DetailListData = () => {
    const { state } = useLocation();

    const [page, setPage] = useState<number>(1);
    const { data, refetch } = useDetailProductOldQuery({ codeDocument: state.codeDocument, page });
    const [deleteProductOld, results] = useDeleteProductOldMutation();

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
                        await deleteProductOld(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail List'));
    });

    const detailProductOlds: any = useMemo(() => {
        if (data?.data.resource !== null) {
            if (data?.data?.resource?.data.length !== 0) {
                return data?.data.resource.data;
            }
        }
    }, [data]);
    console.log("DATA", data)

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

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Detail List Data </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <div className="flex flex-wrap w-full justify-start mb-5">
                    <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                        <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                            <IconNotesEdit fill className="w-12 h-12" />
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                <div className="text-white-dark mr-2">Data Merged :</div>
                                <div className="whitespace-nowrap">{state?.codeDocument}</div>
                            </div>
                            <div className=" items-center text-lg w-full justify-between mb-2">
                                <div className="text-white-dark">BASE DATA : </div>
                                <ul className="space-y-3 list-inside list-disc font-semibold">
                                    <li>{state?.baseDocument}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 mx-6 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto flex gap-6">
                        <Link to="/inbound/check_product/list_data">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <Link to="/inbound/check_product/multi_check" state={{ codeDocument: state.codeDocument }}>
                            <button type="button" className=" px-2 btn btn-outline-info">
                                <IconArrowForward className="flex mx-2" fill={true} /> Continue
                            </button>
                        </Link>
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Data Proses</h5>
                <div className="datatables">
                    {data?.data.resource !== null && (
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={detailProductOlds}
                            columns={[
                                {
                                    accessor: 'id',
                                    title: 'No',
                                    render: (item: any, index: number) => <span>{(page - 1) * detailProductOlds?.length + (index + 1)}</span>,
                                },
                                {
                                    accessor: 'code_document',
                                    title: 'Nama Data',
                                    render: (item: any) => <span>{item.code_document}</span>,
                                },
                                {
                                    accessor: 'old_barcode_product',
                                    title: 'Nomor Resi',
                                    render: (item: any) => <span>{item.old_barcode_product}</span>,
                                },
                                {
                                    accessor: 'old_name_product',
                                    title: 'Nama Produk',
                                    render: (item: any) => <span className="whitespace-pre-wrap">{item.old_name_product}</span>,
                                },
                                {
                                    accessor: 'old_quantity_product',
                                    title: 'QTY',
                                    render: (item: any) => <span>{item.old_quantity_product}</span>,
                                },
                                {
                                    accessor: 'old_price_product',
                                    title: 'Harga',
                                    render: (item: any) => <span>{formatRupiah(item.old_price_product)}</span>,
                                },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (item: any) => (
                                        <div className="flex items-center w-max mx-auto gap-6">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                                Delete
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailListData;
