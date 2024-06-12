import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useShowPalletQuery } from '../../../store/services/palletApi';
import { formatRupiah } from '../../../helper/functions';
import BarcodePalet from './BarcodePalet';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { SubPaletItem } from '../../../store/services/types';

const PalletDetail = () => {
    const { id }: any = useParams();
    const { data, isSuccess } = useShowPalletQuery(id);

    console.log('data', data);

    const detailDataPallet = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

    console.log('detailDataPallet', detailDataPallet);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/pallet">
                        <span>Pallet</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Pallet</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Pallet</h1>
            </div>
            <div>
                <div className="flex gap-4 items-center mb-4 divide-x divide-gray-500">
                    <form className="w-[400px]">
                        {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.palet_barcode} className=" form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.name_palet} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between  mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.category_palet} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga :
                            </label>
                            <input
                                id="categoryName"
                                disabled
                                type="text"
                                value={formatRupiah(detailDataPallet?.total_price_palet ?? '0')}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                    </form>
                    <div className="px-4">
                        <BarcodePalet
                            barcode={detailDataPallet?.palet_barcode ?? ''}
                            category={detailDataPallet?.category_palet ?? ''}
                            price={detailDataPallet?.total_price_palet ?? '0'}
                            namePalet={detailDataPallet?.name_palet ?? ''}
                        />
                    </div>
                </div>
                {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div> */}
                <div className="panel">
                    <div className="flex items-center mb-4">
                        <Link to="/storage/pallet">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={detailDataPallet?.palet_products}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: SubPaletItem, index: number) => <span>{index + 1}</span> },
                                { accessor: 'code_document', title: 'Code Document', sortable: true, render: (item: SubPaletItem) => <span>{item.code_document}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode', sortable: true, render: (item: SubPaletItem) => <span>{item.new_barcode_product}</span> },
                                { accessor: 'new_category_product', title: 'Kategori', sortable: true, render: (item: SubPaletItem) => <span>{item.new_category_product}</span> },
                                { accessor: 'new_name_product', title: 'Nama', sortable: true, render: (item: SubPaletItem) => <span>{item.new_name_product}</span> },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true, render: (item: SubPaletItem) => <span>{formatRupiah(item.new_price_product ?? '0')}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item: SubPaletItem) => <span className="badge whitespace-nowrap bg-primary">{item.new_status_product}</span>,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PalletDetail;
