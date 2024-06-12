import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDetailDumpQuery } from '../../../store/services/listDumpApi';
import { formatRupiah } from '../../../helper/functions';
import BarcodePrinted from '../ListProductRepair/BarcodePrinted';
import { DataTable } from 'mantine-datatable';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import BarcodeExport from './BarcodeExport';

const DetailDump = () => {
    const { id }: any = useParams();
    const { data, isSuccess } = useDetailDumpQuery(id);

    const detailDump = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);
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
            <div>
                <h1 className="text-lg font-semibold py-4">Detail QCD</h1>
            </div>
            <div>
                <div className="flex gap-4 items-center mb-4 divide-x divide-gray-500">
                    <form className="w-[400px]">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode QCD :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDump?.barcode_bundle} className=" form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama QCD :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDump?.name_bundle} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Awal :
                            </label>
                            <input id="categoryName" disabled type="text" value={formatRupiah(detailDump?.total_price_bundle ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Display :
                            </label>
                            <input
                                id="categoryName"
                                disabled
                                type="text"
                                value={formatRupiah(detailDump?.total_price_custom_bundle ?? '0')}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                    </form>
                    <div className="px-4">
                        <BarcodeExport
                            id={detailDump?.id ?? 0}
                            barcode={detailDump?.barcode_bundle ?? ''}
                            newPrice={detailDump?.total_price_custom_bundle ?? '0'}
                            oldPrice={detailDump?.total_price_bundle ?? '0'}
                            category={detailDump?.name_bundle ?? ''}
                            isBundle
                        />
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center mb-4">
                        <Link to="/repair_station/list_dump">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={detailDump?.product_qcds}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item, index: number) => <span>{index + 1}</span> },
                                { accessor: 'code_document', title: 'Code Document', sortable: true, render: (item) => <span>{item.code_document}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode', sortable: true, render: (item) => <span>{item.new_barcode_product}</span> },
                                { accessor: 'new_category_product', title: 'Kategori', sortable: true, render: (item) => <span>{item.new_category_product}</span> },
                                { accessor: 'new_name_product', title: 'Nama', sortable: true, render: (item) => <span>{item.new_name_product}</span> },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true, render: (item) => <span>{formatRupiah(item.new_price_product ?? '0')}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item) => <span className="badge whitespace-nowrap bg-primary">{item.new_status_product}</span>,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailDump;
