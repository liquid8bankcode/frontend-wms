import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetDetailProductApprovesByDocQuery } from '../../../../store/services/categoriesApi';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import IconNotesEdit from '../../../../components/Icon/IconNotesEdit';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import IconArrowForward from '../../../../components/Icon/IconArrowForward';
import { formatDate, formatRupiah } from '../../../../helper/functions';
import { NewProductItem } from '../../../../store/services/types';

const DetailApproveProduct = () => {
    const { state } = useLocation();

    const [page, setPage] = useState<number>(1);
    const { data, refetch, isSuccess } = useGetDetailProductApprovesByDocQuery(state.code_document);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail List'));
    });

    const detailProductOlds: any = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [data]);

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
                    <span> Detail Product Approve</span>
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
                                <div className="whitespace-nowrap">{state.code_document}</div>
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
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Data Proses</h5>
                <div className="datatables">
                    {data?.data.resource !== null && (
                        <DataTable
                            records={detailProductOlds}
                            columns={[
                                {
                                    accessor: 'No',
                                    title: 'No',
                                    render: (item: NewProductItem, index: number) => <span>{(page - 1) * detailProductOlds?.length + (index + 1)}</span>,
                                },
                                {
                                    accessor: 'new barcode product',
                                    title: 'NEW BARCODE',
                                    render: (item: NewProductItem) => <span className="font-semibold">{item.new_barcode_product}</span>,
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
                                            <Link to={`/inbound/check_product/approvment_product/detail/${item.id}`}>
                                                <button type="button" className="btn btn-outline-info">
                                                    Detail
                                                </button>
                                            </Link>
                                            {/* onClick={() => showAlert({ type: 11, id: item.id })} */}
                                            <button type="button" className="btn btn-outline-danger">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailApproveProduct;
