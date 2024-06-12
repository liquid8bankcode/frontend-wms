import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import { GetListRoleItem } from '../../../store/services/types';
import { Alert } from '../../../commons';

const ListRole = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Role'));
    });
    const { data, isError } = useGetListRoleQuery(undefined);
    const [search, setSearch] = useState('');

    const dataListRole: GetListRoleItem[] = useMemo(() => {
        return (data?.data?.resource || []) as GetListRoleItem[];
    }, [data]);

    if (isError && !data?.data?.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">List Role</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={dataListRole}
                        columns={[
                            { accessor: 'id', title: 'No', render: (item: GetListRoleItem, index: number) => <span>{index + 1}</span> },

                            { accessor: 'role_name', title: 'Role Name', render: (item: GetListRoleItem) => <span>{item.role_name}</span> },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListRole;
