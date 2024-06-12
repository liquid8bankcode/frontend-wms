import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');

            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                const menuElement = ul.closest('li.menu');
                if (menuElement) {
                    const navLinkElements = menuElement.querySelectorAll('.nav-link');
                    if (navLinkElements.length > 0) {
                        const ele: any = navLinkElements[0];
                        setTimeout(() => {
                            ele.click();
                        });
                    } else {
                        console.error('No .nav-link elements found.');
                    }
                }
            } else {
                console.error('No ul.sub-menu element found.');
            }
        } else {
            console.error('No matching selector found.');
        }
    }, []);

    const lightImage = '/assets/images/liquid8.png';
    const darkImage = '/assets/images/liquid8-light.png';

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-40 flex-none" src={themeConfig.theme === 'dark' ? darkImage : lightImage} alt="logo" />
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2.75 8.24992L11 1.83325L19.25 8.24992V18.3333C19.25 18.8195 19.0568 19.2858 18.713 19.6296C18.3692 19.9734 17.9029 20.1666 17.4167 20.1666H4.58333C4.0971 20.1666 3.63079 19.9734 3.28697 19.6296C2.94315 19.2858 2.75 18.8195 2.75 18.3333V8.24992Z"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path d="M8.25 20.1667V11H13.75V20.1667" stroke="#888EA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu === 'dashboard' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/">{t('analytics')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('INBOUND')}</span>
                            </h2>
                            <li className="nav-item">
                                <NavLink to="/inbound/data_process/data_input" className="group">
                                    <div className="flex items-center">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_40_1194)">
                                                <path
                                                    d="M15 0H6.25V7.5H7.125L7.375 8.375L7.5 8.5V1.25H13.75V6.25H18.75V17.5H11.25L11.625 18.125L11 18.75H20V5L15 0ZM15 5V1.25L18.75 5H15ZM6.875 14.375C6.875 14.7065 6.7433 15.0245 6.50888 15.2589C6.27446 15.4933 5.95652 15.625 5.625 15.625C5.29348 15.625 4.97554 15.4933 4.74112 15.2589C4.5067 15.0245 4.375 14.7065 4.375 14.375C4.375 14.0435 4.5067 13.7255 4.74112 13.4911C4.97554 13.2567 5.29348 13.125 5.625 13.125C5.95652 13.125 6.27446 13.2567 6.50888 13.4911C6.7433 13.7255 6.875 14.0435 6.875 14.375Z"
                                                    fill="#888EA8"
                                                />
                                                <path
                                                    d="M9.875 15.5L11.25 15V13.75L9.875 13.25C9.75 12.875 9.625 12.5 9.375 12.125L10 10.875L9.125 10L7.875 10.625C7.5 10.375 7.125 10.25 6.75 10.125L6.25 8.75H5L4.5 10.125C4.125 10.25 3.75 10.375 3.375 10.625L2.125 10L1.25 10.875L1.875 12.25C1.625 12.625 1.5 13 1.375 13.375L0 13.75V15L1.375 15.5C1.5 15.875 1.625 16.25 1.875 16.625L1.25 17.875L2.125 18.75L3.5 18.125C3.875 18.375 4.25 18.5 4.625 18.625L5 20H6.25L6.75 18.625C7.125 18.5 7.5 18.375 7.875 18.125L9.125 18.75L10 17.875L9.375 16.5C9.625 16.25 9.75 15.875 9.875 15.5ZM5.625 16.875C4.25 16.875 3.125 15.75 3.125 14.375C3.125 13 4.25 11.875 5.625 11.875C7 11.875 8.125 13 8.125 14.375C8.125 15.75 7 16.875 5.625 16.875Z"
                                                    fill="#888EA8"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_40_1194">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Inbound Process')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <button type="button" className={`${currentMenu === 'check_product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('check_product')}>
                                            <div className="flex items-center">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.625 16.5107V10.0547L2.75 6.61719V16.0703L8.59375 19.0029L8.26074 20.3672L1.375 16.9297V5.07031L10.3125 0.612305L19.25 5.07031V7.9707C18.7487 8.04948 18.2904 8.21061 17.875 8.4541V6.61719L11 10.0547V15.1357L9.625 16.5107ZM8.09961 3.24414L14.373 6.83203L17.0264 5.5L10.3125 2.1377L8.09961 3.24414ZM10.3125 8.8623L12.8906 7.57324L6.61719 3.98535L3.59863 5.5L10.3125 8.8623ZM19.8516 9.625C20.1523 9.625 20.4316 9.67871 20.6895 9.78613C20.9473 9.89355 21.1764 10.0404 21.377 10.2266C21.5775 10.4128 21.7279 10.6383 21.8281 10.9033C21.9284 11.1683 21.9857 11.4512 22 11.752C22 12.0312 21.9463 12.3034 21.8389 12.5684C21.7314 12.8333 21.5775 13.0661 21.377 13.2666L13.6748 20.9688L9.625 21.9785L10.6348 17.9287L18.3369 10.2373C18.5446 10.0296 18.7773 9.87565 19.0352 9.77539C19.293 9.67513 19.5651 9.625 19.8516 9.625ZM20.3994 12.2998C20.5498 12.1494 20.625 11.9668 20.625 11.752C20.625 11.5299 20.5534 11.3509 20.4102 11.2148C20.2669 11.0788 20.0807 11.0072 19.8516 11C19.7513 11 19.6546 11.0143 19.5615 11.043C19.4684 11.0716 19.3861 11.1253 19.3145 11.2041L11.8809 18.6377L11.5156 20.0879L12.9658 19.7227L20.3994 12.2998Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Check Product')}</span>
                                            </div>
                                            <div className={currentMenu === 'check_product' ? '!rotate-90' : 'rtl:rotate-180'}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'check_product' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/inbound/check_product/list_data">{'Manifest Inbound'}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/inbound/check_product/approvment_product">{'Approvment Product'}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/inbound/check_product/manual_inbound">{'Manual Inbound'}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/inbound/check_history" className="group">
                                            <div className="flex items-center">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11 10.7422V21.0439L10.3125 21.3877L1.375 16.9297V5.75781L10.3125 1.28906L19.25 5.75781V13.75H17.875V7.30469L11 10.7422ZM10.3125 2.83594L7.72363 4.125L14.3945 7.49805L17.0264 6.1875L10.3125 2.83594ZM9.625 19.5078V10.7422L2.75 7.30469V16.0703L9.625 19.5078ZM3.59863 6.1875L10.3125 9.53906L12.8691 8.27148L6.1875 4.89844L3.59863 6.1875ZM15.125 19.25V17.875H22V19.25H15.125ZM15.125 15.125H22V16.5H15.125V15.125ZM12.375 22V20.625H13.75V22H12.375ZM12.375 16.5V15.125H13.75V16.5H12.375ZM12.375 19.25V17.875H13.75V19.25H12.375ZM15.125 22V20.625H22V22H15.125Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Check History')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('Inventory')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('product')}>
                                    <div className="flex items-center">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_40_1201)">
                                                <path
                                                    d="M13.125 0.0195312L20 3.45703V11.123L18.75 10.498V4.85352L13.75 7.35352V9.87305L12.5 10.498V7.35352L7.5 4.85352V7.07031L6.25 6.44531V3.45703L13.125 0.0195312ZM13.125 6.26953L14.8535 5.40039L10.332 2.8125L8.27148 3.84766L13.125 6.26953ZM16.2012 4.73633L17.9785 3.84766L13.125 1.41602L11.6699 2.14844L16.2012 4.73633ZM11.25 11.123L10 11.748V11.7383L6.25 13.6133V18.0566L10 16.1719V17.5781L5.625 19.7656L0 16.9434V10.3418L5.625 7.5293L11.25 10.3418V11.123ZM5 18.0566V13.6133L1.25 11.7383V16.1719L5 18.0566ZM5.625 12.5293L9.22852 10.7324L5.625 8.92578L2.02148 10.7324L5.625 12.5293ZM11.25 12.5195L15.625 10.332L20 12.5195V17.666L15.625 19.8535L11.25 17.666V12.5195ZM15 18.1445V15.166L12.5 13.916V16.8945L15 18.1445ZM18.75 16.8945V13.916L16.25 15.166V18.1445L18.75 16.8945ZM15.625 14.082L17.9785 12.9004L15.625 11.7285L13.2715 12.9004L15.625 14.082Z"
                                                    fill="#888EA8"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_40_1201">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Product')}</span>
                                    </div>

                                    <div className={currentMenu === 'product' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'product' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/storage/product/category">{'By Category'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/product/color">{'By Color'}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'category_setting' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('category_setting')}>
                                    <div className="flex items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14 17H20M17 14V20M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14Z"
                                                stroke="#888EA8"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Kategori Setting')}</span>
                                    </div>

                                    <div className={currentMenu === 'category_setting' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'category_setting' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/storage/categorysetting/sub_kategori">{'Sub Kategori'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/categorysetting/tag_warna">{'Tag Warna'}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'moving_product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('moving_product')}>
                                    <div className="flex items-center">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                            <path
                                                opacity="0.5"
                                                d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            ></path>
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Moving Product')}</span>
                                    </div>

                                    <div className={currentMenu === 'moving_product' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'moving_product' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/storage/moving_product/bundle">{'Bundle'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/moving_product/repair">{'Repair'}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'expired_product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('expired_product')}>
                                    <div className="flex items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 15.75V17.25H19.311C18.4793 18.4123 17.3818 19.359 16.1101 20.0113C14.8384 20.6636 13.4292 21.0026 12 21C7.03725 21 3 16.9627 3 12H1.5C1.5 17.79 6.21 22.5 12 22.5C15.2662 22.5 18.2805 20.9993 20.25 18.4913V19.5H21.75V15.75H18Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M16.8787 8.72772L12.387 6.10272C12.2723 6.03566 12.1419 6.00025 12.0091 6.00012C11.8763 5.99999 11.7458 6.03514 11.631 6.10197L7.12275 8.72697C7.00938 8.79295 6.91529 8.88751 6.84989 9.00122C6.78448 9.11492 6.75004 9.24379 6.75 9.37497V14.625C6.75004 14.7561 6.78448 14.885 6.84989 14.9987C6.91529 15.1124 7.00938 15.207 7.12275 15.273L11.631 17.898C11.7425 17.9646 11.87 17.9999 12 18C12.1305 18 12.27 17.9662 12.387 17.8972L16.8787 15.2722C16.9917 15.2061 17.0854 15.1116 17.1506 14.998C17.2157 14.8845 17.25 14.7559 17.25 14.625V9.37497C17.25 9.24407 17.2157 9.11545 17.1506 9.0019C17.0854 8.88835 16.9917 8.79383 16.8787 8.72772ZM12.0082 7.61772L15.0135 9.37497L12.0082 11.1315L8.991 9.37497L12.0082 7.61772ZM8.25 10.68L11.25 12.4275V15.9412L8.25 14.1937V10.68ZM12.75 15.9487V12.4365L15.75 10.683V14.1952L12.75 15.9487Z"
                                                fill="#888EA8"
                                            />
                                            <path
                                                d="M12 1.50001C10.4107 1.49782 8.84182 1.85768 7.41236 2.55227C5.98289 3.24686 4.73043 4.25793 3.75 5.50876V4.50001H2.25V8.25001H6V6.75001H4.689C5.52073 5.5877 6.61816 4.64097 7.88988 3.98867C9.16159 3.33638 10.5708 2.99741 12 3.00001C16.9628 3.00001 21 7.03726 21 12H22.5C22.5 6.21001 17.79 1.50001 12 1.50001Z"
                                                fill="#888EA8"
                                            />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Slow Moving Product')}</span>
                                    </div>

                                    <div className={currentMenu === 'expired_product' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'expired_product' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/storage/expired_product/list_product">{'List Product'}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/storage/expired_product/promo_product">{'Promo Product'}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <NavLink to="/storage/pallet" className="group">
                                    <div className="flex items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.86379 16.455C3.00579 13.023 2.57679 11.308 3.47779 10.154C4.37779 9 6.14779 9 9.68479 9H14.3148C17.8528 9 19.6208 9 20.5218 10.154C21.4228 11.307 20.9938 13.024 20.1358 16.455C19.5898 18.638 19.3178 19.729 18.5038 20.365C17.6898 21 16.5648 21 14.3148 21H9.68479C7.43479 21 6.30979 21 5.49579 20.365C4.68179 19.729 4.40879 18.638 3.86379 16.455Z"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M19.5 9.5L18.79 6.895C18.516 5.89 18.379 5.388 18.098 5.009C17.8178 4.63246 17.4373 4.3424 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5L5.21 6.895C5.484 5.89 5.621 5.388 5.902 5.009C6.18218 4.63246 6.56269 4.3424 7 4.172C7.44 4 7.96 4 9 4"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M9 4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4C15 4.26522 14.8946 4.51957 14.7071 4.70711C14.5196 4.89464 14.2652 5 14 5H10C9.73478 5 9.48043 4.89464 9.29289 4.70711C9.10536 4.51957 9 4.26522 9 4Z"
                                                stroke="#888EA8"
                                                strokeWidth="1.5"
                                            />
                                        </svg>

                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Pallet')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('REPAIR STATION')}</span>
                            </h2>

                            <ul>
                                <li className="menu nav-item">
                                    <NavLink to="/repair_station/list_product_repair/" className="group">
                                        <div className="flex items-center">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.79167 6.41663H13.2917M10.5417 12.8333V6.87496M9.23221 19.25H3.66667C3.42355 19.25 3.19039 19.1534 3.01849 18.9815C2.84658 18.8096 2.75 18.5764 2.75 18.3333V3.20829C2.75 2.96518 2.84658 2.73202 3.01849 2.56011C3.19039 2.3882 3.42355 2.29163 3.66667 2.29163H18.3333C18.5764 2.29163 18.8096 2.3882 18.9815 2.56011C19.1534 2.73202 19.25 2.96518 19.25 3.20829V7.66192M12.375 17.4166L17.1875 10.7708L19.25 12.375L14.2083 19.25H12.375V17.4166Z"
                                                    stroke="#888EA8"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'List Product R'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/repair_station/list_dump" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'QCD'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('OUTBOUND')}</span>
                            </h2>
                            <ul>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'list_migrate' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('list_migrate')}>
                                        <div className="flex items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18 15.75V17.25H19.311C18.4793 18.4123 17.3818 19.359 16.1101 20.0113C14.8384 20.6636 13.4292 21.0026 12 21C7.03725 21 3 16.9627 3 12H1.5C1.5 17.79 6.21 22.5 12 22.5C15.2662 22.5 18.2805 20.9993 20.25 18.4913V19.5H21.75V15.75H18Z"
                                                    fill="#888EA8"
                                                />
                                                <path
                                                    d="M16.8787 8.72772L12.387 6.10272C12.2723 6.03566 12.1419 6.00025 12.0091 6.00012C11.8763 5.99999 11.7458 6.03514 11.631 6.10197L7.12275 8.72697C7.00938 8.79295 6.91529 8.88751 6.84989 9.00122C6.78448 9.11492 6.75004 9.24379 6.75 9.37497V14.625C6.75004 14.7561 6.78448 14.885 6.84989 14.9987C6.91529 15.1124 7.00938 15.207 7.12275 15.273L11.631 17.898C11.7425 17.9646 11.87 17.9999 12 18C12.1305 18 12.27 17.9662 12.387 17.8972L16.8787 15.2722C16.9917 15.2061 17.0854 15.1116 17.1506 14.998C17.2157 14.8845 17.25 14.7559 17.25 14.625V9.37497C17.25 9.24407 17.2157 9.11545 17.1506 9.0019C17.0854 8.88835 16.9917 8.79383 16.8787 8.72772ZM12.0082 7.61772L15.0135 9.37497L12.0082 11.1315L8.991 9.37497L12.0082 7.61772ZM8.25 10.68L11.25 12.4275V15.9412L8.25 14.1937V10.68ZM12.75 15.9487V12.4365L15.75 10.683V14.1952L12.75 15.9487Z"
                                                    fill="#888EA8"
                                                />
                                                <path
                                                    d="M12 1.50001C10.4107 1.49782 8.84182 1.85768 7.41236 2.55227C5.98289 3.24686 4.73043 4.25793 3.75 5.50876V4.50001H2.25V8.25001H6V6.75001H4.689C5.52073 5.5877 6.61816 4.64097 7.88988 3.98867C9.16159 3.33638 10.5708 2.99741 12 3.00001C16.9628 3.00001 21 7.03726 21 12H22.5C22.5 6.21001 17.79 1.50001 12 1.50001Z"
                                                    fill="#888EA8"
                                                />
                                            </svg>

                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Migrate')}</span>
                                        </div>

                                        <div className={currentMenu === 'expired_product' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'list_migrate' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/outbound/migrate/migrate">{'Migrate'}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/outbound/migrate/list_migrate">{'List Migrate'}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'kasir' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('kasir')}>
                                        <div className="flex items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                                <path
                                                    opacity="0.5"
                                                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                ></path>
                                                <path
                                                    opacity="0.5"
                                                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                ></path>
                                                <path opacity="0.5" d="M11 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path
                                                    d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                ></path>
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Sale')}</span>
                                        </div>
                                        <div className={currentMenu === 'expired_product' ? 'rotate-90' : 'rtl:rotate-180'}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'kasir' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            <li>
                                                <NavLink to="/outbound/sale/kasir">{'Cashier'}</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/outbound/sale/list_kasir">{'List Cashier'}</NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/buyer/buyer/list_buyer" className="group">
                                        <div className="flex items-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"></circle>
                                                <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                                <path
                                                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                ></path>
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'Buyer'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('AKUN')}</span>
                            </h2>

                            <ul>
                                <li className="menu nav-item">
                                    <NavLink to="/akun/akun/list_akun" className="group">
                                        <div className="flex items-center">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                <path
                                                    // opacity={duotone ? '0.5' : '1'}
                                                    d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>

                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'Akun'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="menu nav-item">
                                    <NavLink to="/akun/role/list_role" className="group">
                                        <div className="flex items-center">
                                            <svg className="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                                    fill="currentColor"
                                                />
                                                <path d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z" fill="currentColor" />
                                                <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor" />
                                                <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor" />
                                                <path
                                                    d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C17.8174 10.0089 18.3135 10.022 18.75 10.0546V8C18.75 4.27208 15.7279 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{'Role'}</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
