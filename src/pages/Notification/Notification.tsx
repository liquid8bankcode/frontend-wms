import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { useGetNotifByRoleQuery, useLazySpvApprovalQuery } from '../../store/services/notificationsApi';
import { countPastTime } from '../../helper/functions';
import toast from 'react-hot-toast';
import { Spinner } from '../../commons';

const Notification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notification'));
    });

    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<'all' | 'done' | 'pending'>('all');

    const { data, refetch, isLoading, isFetching } = useGetNotifByRoleQuery({ page: page, query: query });
    const [spvApproval, results] = useLazySpvApprovalQuery();

    const handleApprove = async (id: number) => {
        await spvApproval(id);
    };

    useEffect(() => {
        if (results.isSuccess && results.data.data.status) {
            setQuery('all');
            refetch();
            toast.success(results.data.data.message);
        }
    }, [results]);

    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className="overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden"></div>
                <div className="panel xl:block p-4 dark:gray-50 w-[250px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden">
                    <div className="flex flex-col h-full pb-16">
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                >
                                    <div className="flex items-center">
                                        <IconMail className="w-5 h-5 shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Inbox</div>
                                    </div>
                                    <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">{data?.data.resource.data.length}</div>
                                </button>
                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className="flex flex-wrap flex-col md:flex-row xl:w-auto justify-between items-center px-4 pb-4">
                            <div className="flex items-center justify-between w-full mt-4">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => {
                                            refetch();
                                            setQuery('all');
                                        }}
                                        type="button"
                                        className="ltr:ml-auto rtl:mr-auto text-success border px-2 py-2 text-xs border-success rounded-lg bg-opacity-0 bg-success hover:bg-opacity-10"
                                    >
                                        Refresh
                                    </button>
                                    <button
                                        onClick={() => setQuery('pending')}
                                        type="button"
                                        className="ltr:ml-auto rtl:mr-auto text-warning border px-2 py-2 text-xs border-warning rounded-lg bg-opacity-0 bg-warning hover:bg-opacity-10"
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => setQuery('done')}
                                        type="button"
                                        className="ltr:ml-auto rtl:mr-auto text-primary border px-2 py-2 text-xs border-primary rounded-lg bg-opacity-0 bg-primary hover:bg-opacity-10"
                                    >
                                        Done
                                    </button>
                                </div>
                                <div className="flex items-center md:justify-end justify-center">
                                    <div className="ltr:mr-3 rtl:ml-3">{data?.data.resource.current_page}</div>
                                    <button
                                        onClick={() => {
                                            if (page <= 0) return;
                                            setPage((prevPage) => prevPage - 1);
                                        }}
                                        type="button"
                                        className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setPage((prevPage) => prevPage + 1);
                                        }}
                                        type="button"
                                        className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                        <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                            <table className="table-hover">
                                <tbody>
                                    {data?.data.resource.data.map((item) => (
                                        <tr className="cursor-pointer" key={item.id}>
                                            <td>
                                                <div className="flex items-center whitespace-nowrap">
                                                    <div
                                                        className={`${
                                                            item.status === 'pending' ? 'bg-warning text-warning' : 'bg-primary text-primary'
                                                        } text-xs font-medium py-1 px-4 rounded-full bg-opacity-20`}
                                                    >
                                                        {item.status}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-medium text-white-dark overflow-hidden min-w-[600px] line-clamp-1 flex items-center space-x-4">
                                                    <h6 className="text-black">{item.notification_name}</h6>
                                                    <span className="text-xs block font-normal dark:text-gray-500">{countPastTime(item.created_at)}</span>
                                                </div>
                                            </td>
                                            {item.status === 'pending' && item.role_id === 2 && (
                                                <td className="whitespace-nowrap font-medium ltr:text-right rtl:text-left">
                                                    <button
                                                        onClick={() => handleApprove(item.id)}
                                                        type="button"
                                                        className="ltr:ml-auto rtl:mr-auto text-success border px-2 py-2 text-xs border-success rounded-lg bg-opacity-0 bg-success hover:bg-opacity-10"
                                                    >
                                                        Approve
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data?.data.resource.data.length === 0 && <div className="font-semibold text-lg flex items-center justify-center min-h-[300px]">No data available</div>}
                            {isLoading ||
                                (isFetching && (
                                    <div className="font-semibold flex items-center justify-center min-h-[300px] flex-col">
                                        <Spinner />
                                        <p className="mt-2">Loading...</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
