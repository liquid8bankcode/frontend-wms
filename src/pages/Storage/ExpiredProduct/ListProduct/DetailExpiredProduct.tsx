import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useGetDetailExpiredProductQuery } from '../../../../store/services/productNewApi';
import { formatRupiah, formatTimestamp } from '../../../../helper/functions';

const DetailExpiredProduct = () => {
    const { id }: any = useParams();
    const { data, isSuccess } = useGetDetailExpiredProductQuery(id);

    const detailDataExpired = useMemo(() => {
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
                    <Link to="/storage/expired_product/list_product">
                        <span>Slow Moving</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Product</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Detail Product </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <Link to="/storage/pallet">
                            <button className="btn btn-outline-info">
                                <IconArrowBackward /> Kembali{' '}
                            </button>
                        </Link>
                        {/* <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-black font-bold">Keterangan</th>
                                <th className="py-2 px-4 border-b text-black font-bold">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="py-2 px-4 border-b">Barcode</td>
                                <td className="py-2 px-4 border-b">{detailDataExpired?.new_barcode_product}</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="py-2 px-4 border-b">Nama</td>
                                <td className="py-2 px-4 border-b">{detailDataExpired?.new_name_product}</td>
                            </tr>
                            <tr className="bg-gray-300">
                                <td className="py-2 px-4 border-b">QTY</td>
                                <td className="py-2 px-4 border-b">{detailDataExpired?.new_quantity_product}</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="py-2 px-4 border-b">Harga</td>
                                <td className="py-2 px-4 border-b">{formatRupiah(detailDataExpired?.new_price_product ?? '0')}</td>
                            </tr>
                            <tr className="bg-gray-300">
                                <td className="py-2 px-4 border-b">Expired</td>
                                <td className="py-2 px-4 border-b">{formatTimestamp(detailDataExpired?.created_at ?? '0')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailExpiredProduct;
