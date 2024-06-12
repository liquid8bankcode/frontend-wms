import React, { useMemo, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetShowSaleQuery } from '../../../store/services/saleApi';
import { GetShowSaleDocumentItem } from '../../../store/services/types';
import IconArchive from '../../../components/Icon/IconArchive';
import { formatRupiah } from '../../../helper/functions';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { Alert } from '../../../commons';

const DetailCashier = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { id } = useParams();
    const { data: ShowSaleData, isError, isLoading } = useGetShowSaleQuery(id);

    const ShowSale = useMemo(() => {
        return ShowSaleData?.data.resource;
    }, [ShowSaleData]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError && !ShowSaleData?.data.status) {
        return <Alert message={ShowSaleData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
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
                    <Link to="/outbound/sale/kasir">
                        <span>Sale</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Sale</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Sale</h1>
            </div>
            <div>
                <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                    <div className="bg-primary absolute mt-2 text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconArchive fill className="w-12 h-12" />
                    </div>
                    <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DOC SALE :</div>
                            <div className="whitespace-nowrap">{ShowSale?.code_document_sale}</div>
                        </div>
                        <div className=" items-center text-lg w-full justify-between mb-2">
                            <div className="text-white-dark">QTY :</div>
                            <ul className="space-y-3 list-inside list-disc font-semibold">{ShowSale?.total_product_document_sale}</ul>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">PRICE TOTAL :</div>
                            <div className="whitespace-nowrap"> {ShowSale && typeof ShowSale.total_price_document_sale === 'string' ? formatRupiah(ShowSale.total_price_document_sale) : ''}</div>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">BUYER :</div>
                            <div className="whitespace-nowrap">{ShowSale?.buyer_name_document_sale}</div>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-end my-8">
                    <Link to={`/outbound/sale/kasir/print/${ShowSale?.code_document_sale}`} type="button" className="btn btn-lg lg:btn btn-primary uppercase">
                        Export data
                    </Link>
                </div>
                <div className="mt-8 panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/outbound/sale/list_kasir">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={ShowSale?.sales}
                            columns={[
                                {
                                    accessor: 'No',
                                    title: 'No',
                                    render: (item: GetShowSaleDocumentItem, index: number) => <span>{index + 1}</span>,
                                },
                                {
                                    accessor: 'product_barcode_sale',
                                    title: 'Barcode',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_barcode_sale}</span>,
                                },
                                {
                                    accessor: 'product_name_sale',
                                    title: 'Nama Produk',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_name_sale}</span>,
                                },
                                {
                                    accessor: 'product_qty_sale',
                                    title: 'Qty',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_qty_sale}</span>,
                                },
                                {
                                    accessor: 'product_price_sale',
                                    title: 'Harga',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{formatRupiah(item.product_price_sale)}</span>,
                                },
                                {
                                    accessor: 'status_sale',
                                    title: 'Status',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.status_sale}</span>,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCashier;
