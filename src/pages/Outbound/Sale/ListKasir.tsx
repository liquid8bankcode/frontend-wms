import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { useGetListSaleDocumentQuery } from '../../../store/services/saleApi';
import { GetListSaleDocumentItem } from '../../../store/services/types';
import { DataTable } from 'mantine-datatable';
import { formatRupiah } from '../../../helper/functions';
import { Alert } from '../../../commons';

const ListKasir = () => {
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: listSaleDocumentData, isError, isLoading } = useGetListSaleDocumentQuery({ page, q: search });

    const listSaleDocument: any = useMemo(() => {
        return listSaleDocumentData?.data.resource.data;
    }, [listSaleDocumentData]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError && !listSaleDocumentData?.data.status) {
        return <Alert message={listSaleDocumentData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Outbound" basePath="outbound/sales" sub="Sales" subPath="/outbound/sale/kasir" current="List Cashier" />
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Sale Cashier</h5>
                </div>
                <div className="relative w-[220px]">
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
                        className="whitespace-nowrap table-hover"
                        records={listSaleDocument}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListSaleDocumentItem, index: number) => (
                                    <span>
                                        <span>{(page - 1) * listSaleDocument?.length + (index + 1)}</span>
                                    </span>
                                ),
                            },
                            {
                                accessor: 'Barcode',
                                title: 'Barcode',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{item.code_document_sale}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'Name',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{item.buyer_name_document_sale}</span>,
                            },
                            {
                                accessor: 'qty',
                                title: 'Qty',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{item.total_product_document_sale}</span>,
                            },
                            {
                                accessor: 'price',
                                title: 'Price',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{formatRupiah(item.total_price_document_sale)}</span>,
                            },
                            {
                                accessor: 'Opsi',
                                title: 'Opsi',
                                render: (item: GetListSaleDocumentItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/outbound/sale/list_kasir/detail_kasir/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                        totalRecords={listSaleDocumentData?.data.resource.total ?? 0}
                        recordsPerPage={listSaleDocumentData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </>
    );
};

export default ListKasir;
