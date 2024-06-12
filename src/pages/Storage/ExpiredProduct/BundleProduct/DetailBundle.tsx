import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDetailBundleProductQuery } from '../../../../store/services/bundleProductApi';
import { useMemo } from 'react';
import { formatRupiah } from '../../../../helper/functions';

const showAlert = async (type: number) => {
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
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then((result) => {
                if (result.value) {
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
const DetailBundle = () => {
    const { id }: any = useParams();
    const { data, isSuccess } = useDetailBundleProductQuery(id);

    const detailDataBundle = useMemo(() => {
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
                    <Link to="/storage/expired_product/bundle_product">
                        <span>Slow Moving</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Bundle</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Bundle</h1>
            </div>
            <div>
                <form className="w-[400px] mb-4 ">
                    {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                    <div className="flex items-center justify-between ">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode Bundle :
                        </label>
                        <input id="categoryName" disabled type="text" value={detailDataBundle?.barcode_bundle} className=" form-input w-[250px]" required />
                    </div>
                    <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <div className="flex items-center justify-between mb-2 mt-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Bundle :
                        </label>
                        <input id="categoryName" disabled type="text" value={detailDataBundle?.name_bundle} className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Total Awal :
                        </label>
                        <input id="categoryName" disabled type="text" value={formatRupiah(detailDataBundle?.total_price_bundle ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Custom Display :
                        </label>
                        <input
                            id="categoryName"
                            disabled
                            type="text"
                            value={formatRupiah(detailDataBundle?.total_price_custom_bundle ?? '0')}
                            placeholder="Rp"
                            className=" form-input w-[250px]"
                            required
                        />
                    </div>
                </form>
                {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div> */}
                <div>
                    <div className="datatables panel xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={[1]}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: () => <span>1</span> },
                                { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: () => <span>{detailDataBundle?.barcode_bundle}</span> },
                                { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: () => <span>{detailDataBundle?.name_bundle}</span> },
                                { accessor: 'QTY', title: 'QTY', sortable: true, render: () => <span>{detailDataBundle?.total_product_bundle}</span> },
                                { accessor: 'totalMasuk', title: 'Harga', sortable: true, render: () => <span>{formatRupiah(detailDataBundle?.total_price_bundle ?? '0')}</span> },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBundle;
