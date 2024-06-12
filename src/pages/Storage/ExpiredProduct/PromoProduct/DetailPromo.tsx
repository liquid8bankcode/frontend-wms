import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../../store';
import IconPlus from '../../../../components/Icon/IconPlus';
import { useDetailPromoQuery, useEditPromoMutation, useGetPromotListsQuery } from '../../../../store/services/promoApi';
import { formatRupiah } from '../../../../helper/functions';
import toast from 'react-hot-toast';

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

const DetailPromo = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const { data, isSuccess } = useDetailPromoQuery(id);
    const [promoName, setPromoName] = useState<string>('');
    const [discount, setDiscount] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [editPromo, results] = useEditPromoMutation();
    const { refetch } = useGetPromotListsQuery({ page: 1, q: '' });

    const detailPromo = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);
    const handleEditPromo = async () => {
        try {
            const body = {
                name_promo: promoName,
                discount_promo: discount,
                price_promo: JSON.stringify(price),
            };
            await editPromo({ id, body });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            navigate('/storage/expired_product/promo_product');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
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
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/expired_product/promo_product">
                        <span>Slow Moving</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Promo</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Detail Promo</h1>
                <div className="w-[400px] mb-4">
                    <div className="flex items-center  justify-between ">
                        <label htmlFor="barcode" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode :
                        </label>
                        <input disabled name="barcode" id="barcode" value={detailPromo?.new_product?.new_barcode_product ?? 'data kosong'} type="text" className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2 mt-2">
                        <label htmlFor="category" className="text-[15px] font-semibold whitespace-nowrap">
                            Kategori :
                        </label>
                        <input disabled name="category" id="category" value={detailPromo?.new_product?.new_category_product ?? 'data kosong'} type="text" className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="qty" className="text-[15px] font-semibold whitespace-nowrap">
                            QTY :
                        </label>
                        <input disabled name="qty" id="qty" value={detailPromo?.new_product?.new_quantity_product ?? '0'} type="text" className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="harga" className="text-[15px] font-semibold whitespace-nowrap">
                            Harga :
                        </label>
                        <input
                            disabled
                            name="harga"
                            id="harga"
                            value={formatRupiah(detailPromo?.new_product?.new_price_product ?? '0')}
                            type="text"
                            placeholder="Rp"
                            className=" form-input w-[250px]"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Promo :
                            </label>
                            <input
                                onChange={(e) => setPromoName(e.target.value)}
                                name="promoName"
                                id="dataBaru"
                                value={promoName}
                                type="text"
                                className=" form-input w-[250px]"
                                placeholder="Nama promo"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Discount Promo :
                            </label>
                            <input
                                onChange={(e) => {
                                    const remainDiscount = 100 - Number(e.target.value);
                                    const pricePercentage = (Number(detailPromo?.new_product?.new_price_product) * remainDiscount) / 100;
                                    setPrice(pricePercentage);
                                    setDiscount(e.target.value);
                                }}
                                name="discount"
                                id="discount"
                                value={discount}
                                type="text"
                                placeholder="%"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Harga Promo :
                            </label>
                            <input
                                disabled
                                name="hargaPromo"
                                id="HargaPromo"
                                value={discount.length !== 0 ? formatRupiah(JSON.stringify(price)) : formatRupiah(detailPromo?.new_product?.new_price_product ?? '0')}
                                type="text"
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                    </div>
                    <button onClick={handleEditPromo} type="submit" className="btn btn-primary mt-4 px-16">
                        Edit Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailPromo;
