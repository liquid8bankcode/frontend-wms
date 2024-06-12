import React from 'react';
import { HistorySubProductItem } from '../../../store/services/types';
import { DataTable } from 'mantine-datatable';
import { formatRupiah } from '../../../helper/functions';

interface TableSubProduct {
    productTypeActive: HistorySubProductItem[];
    totalRecord: number;
    perPage: number;
    page: number;
    changePage: (prevPage: number) => void;
}

const TableSubProduct: React.FC<TableSubProduct> = ({ productTypeActive, totalRecord, perPage, page, changePage }) => {
    return (
        <>
            <DataTable
                records={productTypeActive}
                columns={[
                    {
                        accessor: 'No',
                        title: 'No',
                        render: (item: HistorySubProductItem, index: number) => <span>{(page - 1) * productTypeActive?.length + (index + 1)}</span>,
                    },
                    {
                        accessor: 'Kode Dokumen',
                        title: 'Kode Dokumen',
                        render: (item: HistorySubProductItem) => <span className="font-semibold">{item.code_document}</span>,
                    },

                    {
                        accessor: 'Old Barcode Product',
                        title: 'Old Barcode',
                        render: (item: HistorySubProductItem) => <span className="font-semibold">{item.old_barcode_product}</span>,
                    },
                    {
                        accessor: 'New Barcode Product',
                        title: 'New Barcode',
                        render: (item: HistorySubProductItem) => <span className="font-semibold">{item.new_barcode_product}</span>,
                    },
                    {
                        accessor: 'New Name Product',
                        title: 'Name',
                        render: (item: HistorySubProductItem) => (
                            <div>
                                <span className="font-semibold">{item.new_name_product ?? item.old_name_product}</span>
                            </div>
                        ),
                    },
                    {
                        accessor: 'Quantity',
                        title: 'Quantity',
                        render: (item: HistorySubProductItem) => <span className="font-semibold truncate">{item.new_quantity_product ?? item.old_quantity_product}</span>,
                    },
                    {
                        accessor: 'Price',
                        title: 'Price',
                        render: (item: HistorySubProductItem) => <span className="font-semibold truncate">{formatRupiah(item.old_price_product)}</span>,
                    },
                ]}
                totalRecords={totalRecord ?? 0}
                recordsPerPage={perPage ?? 10}
                page={page}
                onPageChange={changePage}
            />
        </>
    );
};

export default TableSubProduct;
