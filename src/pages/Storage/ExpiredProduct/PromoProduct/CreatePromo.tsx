import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../../store';
import IconPlus from '../../../../components/Icon/IconPlus';
import { useGetDisplayExpiredQuery, useGetExpiredProductsQuery } from '../../../../store/services/productNewApi';
import { ProductExpiredItem } from '../../../../store/services/types';
import { formatRupiah } from '../../../../helper/functions';
import { Alert } from '../../../../commons';

const CreatePromo = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, isSuccess, isError } = useGetDisplayExpiredQuery({ page, q: search });

    const expiredProducts = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
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
                    <span>Slow Moving</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create Promo</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Create Promo</h1>
                <div className="relative w-[220px] ms-auto mb-4">
                    <input
                        type="text"
                        className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={expiredProducts}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
                            { accessor: 'nama data', title: 'Nama Data', sortable: true, width: 220, render: (item: ProductExpiredItem) => <p className="truncate">{item.new_name_product}</p> },
                            { accessor: 'category', title: 'Ketegori', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_category_product}</span> },
                            { accessor: 'totalMasuk', title: 'Total Masuk', sortable: true, render: (item: ProductExpiredItem) => <span>{formatRupiah(item.new_price_product)}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item: ProductExpiredItem) => <span className="badge whitespace-nowrap bg-danger capitalize">{item.new_status_product}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Aksi',
                                titleClassName: '!text-center',
                                render: (item: ProductExpiredItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/expired_product/create_promo/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={data?.data.resource.total ?? 0}
                        recordsPerPage={data?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreatePromo;
