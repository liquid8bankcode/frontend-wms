import { DataTable } from 'mantine-datatable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formatRupiah } from '../../../../helper/functions';
import { useGetShowRepairMovingProductsQuery, useUpdateThrowsDetailMutation } from '../../../../store/services/repairMovingApi';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import BarcodePrinted from '../../../Inbound/CheckProduct/BarcodePrinted';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

const DetailRepair = () => {
    const { id }: any = useParams();
    const { data, isSuccess, refetch, isError } = useGetShowRepairMovingProductsQuery(id);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [throws, setThrows] = useState(false);
    const [updateThrows, results] = useUpdateThrowsDetailMutation();
    const navigate = useNavigate();

    const detailDataBundle = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

    const handleThrowsConfirmation = async (id: number) => {
        try {
            console.log('ID:', id); // Cetak nilai ID untuk memeriksa apakah ID diterima dengan benar
            await updateThrows(id);
            refetch();
        } catch (err) {
            console.error('Error updating QCD:', err);
        } finally {
            setThrows(false);
        }
    };

    const handleThrows = (id: number) => {
        setSelectedItem(id);
        setThrows(true);
    };
    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    useEffect(() => {
        if (isError) {
            navigate('/storage/moving_product/repair');
        }
    }, [isError]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/moving_product/repair">
                        <span>Moving Repair Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Repair</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Repair</h1>
            </div>
            <div>
                <div className="flex divide-x mb-4 items-center">
                    <form className="w-[400px] pr-4">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Repair :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataBundle?.barcode} className=" form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Repair :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataBundle?.repair_name} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Awal :
                            </label>
                            <input id="categoryName" disabled type="text" value={formatRupiah(detailDataBundle?.total_price ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Display :
                            </label>
                            <input
                                id="categoryName"
                                disabled
                                type="text"
                                value={formatRupiah(detailDataBundle?.total_custom_price ?? '0')}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                    </form>
                    <div className="px-4">
                        <BarcodePrinted
                            barcode={detailDataBundle?.barcode ?? ''}
                            newPrice={detailDataBundle?.total_custom_price ?? '0'}
                            oldPrice={detailDataBundle?.total_price ?? '0'}
                            category={detailDataBundle?.repair_name ?? ''}
                            isBundle
                        />
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/moving_product/repair">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={detailDataBundle?.repair_products}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item, index: number) => <span>{index + 1}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode LQD', sortable: true },
                                { accessor: 'new_name_product', title: 'Nama Produk', sortable: true },
                                { accessor: 'new_quantity_product', title: 'QTY', sortable: true },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (item) => (
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleThrows(item.id)}>
                                            QCD
                                        </button>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <Transition appear show={throws} as={Fragment}>
                <Dialog as="div" open={throws} onClose={() => setThrows(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">QCD List Product</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form className="space-y-5">
                                                <div>
                                                    <h1>Apakah Anda yakin ingin melakukan QCD?</h1>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setThrows(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleThrowsConfirmation(selectedItem || 0)}>
                                                QCD
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default DetailRepair;
