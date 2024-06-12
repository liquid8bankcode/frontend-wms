import React, { useEffect, useMemo } from 'react';
import Dropdown from '../Dropdown';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useGetNotifByRoleQuery, useLazyGetNotifByRoleQuery, useLazySpvApprovalQuery } from '../../store/services/notificationsApi';
import { Spinner } from '../../commons';
import { countPastTime } from '../../helper/functions';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { GetNotifByRoleItem } from '../../store/services/types';

const NotificationHeader = () => {
    const [getNotifByRole, notifResults] = useLazyGetNotifByRoleQuery();
    const { refetch } = useGetNotifByRoleQuery({ page: 1, query: 'all' });
    const [spvApproval, spvResults] = useLazySpvApprovalQuery();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const navigate = useNavigate();

    const handleNavigateNotif = () => {
        navigate('/notification');
    };

    const handleGetNotification = async () => {
        try {
            await getNotifByRole({ page: 1, query: 'all' });
        } catch (err) {
            console.log(err);
        }
    };

    const handleApprove = async (id: number) => {
        await spvApproval(id);
    };

    const notifDataResults = useMemo(() => {
        if (notifResults.isSuccess && notifResults.data.data.status) {
            return notifResults.data.data.resource;
        }
    }, [notifResults]);

    useEffect(() => {
        if (spvResults.isSuccess && spvResults.data.data.status) {
            toast.success(spvResults.data.data.message);
            refetch();
        }
    }, [spvResults]);

    return (
        <div className="dropdown shrink-0">
            <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                    <span onClick={handleGetNotification}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                            <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                            <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                        </span>
                    </span>
                }
            >
                <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10 overflow-y-auto max-h-[600px]">
                    <li>
                        <div className="flex items-center px-4 py-2 justify-between font-semibold">
                            <h4 className="text-lg">Notifikasi</h4>
                            <button onClick={handleNavigateNotif} className="badge bg-primary/80">
                                Open
                            </button>
                        </div>
                    </li>
                    <li className="dark:text-white-light/90 min-h-[200px]" onClick={(e) => e.stopPropagation()}>
                        {notifResults.isLoading && (
                            <div className="w-full h-[190px] flex flex-col items-center justify-center">
                                <Spinner />
                                <p className="mt-2 font-medium">Loading..</p>
                            </div>
                        )}
                        {notifDataResults?.data?.map((item: GetNotifByRoleItem) => (
                            <div className="group flex items-center px-4 py-2" key={item.id}>
                                <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                    <div className="ltr:pr-3 rtl:pl-3">
                                        <h6>{item.notification_name}</h6>
                                        <span className="text-xs block font-normal dark:text-gray-500">{countPastTime(item.created_at)}</span>
                                    </div>
                                    {item.status === 'pending' && item.role_id === 2 && (
                                        <button
                                            type="button"
                                            className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-success opacity-100 border px-2 text-xs hover:border-success rounded-lg"
                                            onClick={() => handleApprove(item.id)}
                                        >
                                            Approve
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </li>
                </ul>
            </Dropdown>
        </div>
    );
};

export default NotificationHeader;
