import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetListMigrateQuery } from '../../../store/services/migrateApi';
import { GetListMigrateItem } from '../../../store/services/types';
import { Alert } from '../../../commons';

const ListMigrate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState('');
    const { data: ListMigrateData, refetch, isError } = useGetListMigrateQuery({ page, q: search });

    const listMigrate: any = useMemo(() => {
        return ListMigrateData?.data.resource.data;
    }, [ListMigrateData]);

    useEffect(() => {
        refetch();
    }, [listMigrate]);

    if (isError && !ListMigrateData?.data?.status) {
        return <Alert message={ListMigrateData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Migrate</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">List Migrate </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:mr-auto rtl:ml-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={listMigrate}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListMigrateItem, index: number) => <span><span>{(page - 1) * listMigrate?.length + (index + 1)}</span></span>,
                            },
                            {
                                accessor: 'code_document_migrate',
                                title: 'Document Migrate',
                                render: (item: GetListMigrateItem) => <span className="font-semibold">{item.code_document_migrate}</span>,
                            },
                            {
                                accessor: 'created_at',
                                title: 'Date',
                                render: (item: GetListMigrateItem) => {
                                    const date = new Date(item.created_at);
                                    const formattedDate = date.toISOString().slice(0, 10); // Ambil bagian tanggalnya saja (yyyy-mm-dd)
                                    return <span className="font-semibold">{formattedDate}</span>;
                                },
                            },
                            {
                                accessor: 'total_product_document_migrate',
                                title: 'Qty',
                                render: (item: GetListMigrateItem) => <span className="font-semibold">{item.total_product_document_migrate}</span>,
                            },
                            {
                                accessor: 'destiny_document_migrate',
                                title: 'Destiny',
                            },
                            {
                                accessor: 'Detail',
                                title: 'Detail',
                                titleClassName: '!text-center',
                                render: (item: GetListMigrateItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/outbound/migrate/list_migrate/detail_migrate/${item.id}`}
                                            state={{
                                                code_document_migrate: item.code_document_migrate,
                                                updated_at: item.updated_at,
                                                total_product_document_migrate: item.total_product_document_migrate,
                                                total_price_document_migrate: item.total_price_document_migrate,
                                            }}
                                        >
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={ListMigrateData?.data.resource.total ?? 0}
                        recordsPerPage={ListMigrateData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                        minHeight={200}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListMigrate;
