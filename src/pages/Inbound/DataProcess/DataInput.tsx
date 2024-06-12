import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconHome from '../../../components/Icon/IconHome';
import IconUser from '../../../components/Icon/IconUser';
import IconThumbUp from '../../../components/Icon/IconThumbUp';
import Swal from 'sweetalert2';
import HomeItemTab from './HomeItemTab';
import { GeneratesData } from '../../../helper/types';
import { useLazyDetailProductOldQuery } from '../../../store/services/productOldsApi';
import { formatRupiah } from '../../../helper/functions';
import { useMergedHeaderMutation } from '../../../store/services/inboundDataProcessApi';
import { DataTable } from 'mantine-datatable';
import { ProductOldsItem } from '../../../store/services/types';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';

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
};

const DataInput = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Data Input'));
    });

    const [dataGenerates, setDataGenerates] = useState<GeneratesData | undefined>();

    const [page, setPage] = useState<number>(1);
    const [isRole, setIsRole] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    const [detailProductOld, results] = useLazyDetailProductOldQuery();

    const [barcode, setBarcode] = useState<string[]>();
    const [productName, setProductName] = useState<string[]>();
    const [productQty, setProductQty] = useState<string[]>();
    const [productPrice, setProductPrice] = useState<string[]>();

    const [mergedHeader, mergeResults] = useMergedHeaderMutation();

    const getGeneratesData = (data: GeneratesData) => {
        setDataGenerates(data);
    };

    const [activeTab3, setActiveTab3] = useState<any>(1);

    const documentCode = useMemo(() => {
        if (dataGenerates) {
            return dataGenerates?.data?.resource?.code_document;
        }
    }, [dataGenerates]);

    const handleRole = (roleActive: boolean) => {
        setIsRole(roleActive);
    };
    const handleMessage = (message: string) => {
        setMessage(message);
    };

    const dataHeaders: any = useMemo(() => {
        if (dataGenerates) {
            return dataGenerates?.data?.resource.headers;
        }
    }, [dataGenerates]);

    const handlePickHeader = async () => {
        try {
            const body = {
                code_document: documentCode,
                headerMappings: {
                    old_barcode_product: barcode,
                    old_name_product: productName,
                    old_quantity_product: productQty,
                    old_price_product: productPrice,
                },
            };

            await mergedHeader(body);
        } catch (err) {
            console.log(err);
        }
    };

    const handleNextButton = async () => {
        try {
            if (activeTab3 === 1) {
                setActiveTab3(2);
            } else if (activeTab3 === 3) {
                setActiveTab3(1);
            } else {
                handlePickHeader();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchProductOlds = async () => {
        await detailProductOld({ codeDocument: documentCode, page });
    };

    useEffect(() => {
        if (mergeResults.isSuccess) {
            toast.success(mergeResults.data.data.message);
            setActiveTab3(3);
            fetchProductOlds();
        } else if (mergeResults.isError) {
            toast.error(mergeResults?.data?.data?.message ?? 'Error');
        }
    }, [mergeResults]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results]);

    if (isRole === false || mergeResults.isError || results.isError) {
        return <Alert message={message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            {/* breadcrumbs */}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Inbound
                    </Link>
                </li>
                <li>
                    <Link to="#" className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        Data Process
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Input</span>
                </li>
            </ul>
            {/* end breadcrumbs */}

            <div className="pt-5 space-y-8">
                <div className="mb-5">
                    <div className="inline-block w-full">
                        <div className="relative z-[1]">
                            <div
                                className={`${activeTab3 === 1 ? 'w-[15%]' : activeTab3 === 2 ? 'w-[48%]' : activeTab3 === 3 ? 'w-[81%]' : ''}
                                            bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                            ></div>
                            <ul className="mb-5 grid grid-cols-3">
                                <li className="mx-auto">
                                    <button
                                        type="button"
                                        className={`${activeTab3 === 1 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                        onClick={() => setActiveTab3(1)}
                                    >
                                        <IconHome />
                                    </button>
                                </li>
                                <li className="mx-auto">
                                    <button
                                        disabled={dataGenerates === undefined}
                                        type="button"
                                        className={`${activeTab3 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                        onClick={() => setActiveTab3(2)}
                                    >
                                        <IconUser className="w-5 h-5" />
                                    </button>
                                </li>
                                <li className="mx-auto">
                                    <button
                                        disabled={dataGenerates === undefined}
                                        type="button"
                                        className={`${activeTab3 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                        onClick={() => setActiveTab3(3)}
                                    >
                                        <IconThumbUp className="w-5 h-5" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <button type="button" className={`btn btn-primary ${activeTab3 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab3(activeTab3 === 3 ? 2 : 1)}>
                                    Back
                                </button>
                                <button disabled={dataGenerates === undefined} type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={handleNextButton}>
                                    {activeTab3 === 3 ? (
                                        <Link to="/inbound/check_product/list_data">
                                            <button>Done</button>
                                        </Link>
                                    ) : (
                                        'Next'
                                    )}
                                </button>
                            </div>
                            <p className="mb-5">
                                {activeTab3 === 1 && (
                                    <HomeItemTab
                                        showAlert={showAlert}
                                        getGeneratesData={(data) => getGeneratesData(data)}
                                        dataGenerates={dataGenerates}
                                        handleRole={handleRole}
                                        handleMessage={handleMessage}
                                    />
                                )}
                            </p>
                            <p className="mb-5">
                                {activeTab3 === 2 && (
                                    <div>
                                        <h1 className="text-lg font-semibold mb-4">PICK HEADER</h1>
                                        <div className="table-responsive mb-5">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Data</th>
                                                        <th>Nomor Resi</th>
                                                        <th>Nama Produk</th>
                                                        <th>QTY</th>
                                                        <th>Harga</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="whitespace-nowrap">1</div>
                                                        </td>
                                                        <td>{documentCode}</td>
                                                        <td className="text-center">
                                                            <div>
                                                                <select id="gridState" className="form-select text-white-dark" onChange={(e) => setBarcode(Array(e.target.value))}>
                                                                    <option>Choose...</option>
                                                                    {dataHeaders?.map((item: string, index: number) => {
                                                                        return <option key={index}>{item}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div>
                                                                <select id="gridState" className="form-select text-white-dark" onChange={(e) => setProductName(Array(e.target.value))}>
                                                                    <option>Choose...</option>
                                                                    {dataHeaders?.map((item: string, index: number) => {
                                                                        return <option key={index}>{item}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div>
                                                                <select id="gridState" className="form-select text-white-dark" onChange={(e) => setProductQty(Array(e.target.value))}>
                                                                    <option>Choose...</option>
                                                                    {dataHeaders?.map((item: string, index: number) => {
                                                                        return <option key={index}>{item}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div>
                                                                <select id="gridState" className="form-select text-white-dark" onChange={(e) => setProductPrice(Array(e.target.value))}>
                                                                    <option>Choose...</option>
                                                                    {dataHeaders?.map((item: string, index: number) => {
                                                                        return <option key={index}>{item}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </p>
                            {results?.data?.data.resource.data !== null && (
                                <div className="mb-5">
                                    {activeTab3 === 3 && (
                                        <DataTable
                                            highlightOnHover
                                            className="whitespace-nowrap table-hover"
                                            records={results?.data?.data.resource.data}
                                            columns={[
                                                {
                                                    accessor: 'id',
                                                    title: 'No',
                                                    render: (item: ProductOldsItem, index: number) => <span>{index + 1}</span>,
                                                },
                                                {
                                                    accessor: 'code_document',
                                                    title: 'Nama Data',
                                                    render: (item: ProductOldsItem) => <span>{item.code_document}</span>,
                                                },
                                                {
                                                    accessor: 'old_barcode_product',
                                                    title: 'Nomor Resi',
                                                    render: (item: ProductOldsItem) => <span>{item.old_barcode_product}</span>,
                                                },
                                                {
                                                    accessor: 'old_name_product',
                                                    title: 'Nama Produk',
                                                    render: (item: ProductOldsItem) => <span>{item.old_name_product}</span>,
                                                },
                                                {
                                                    accessor: 'old_quantity_product',
                                                    title: 'QTY',
                                                    render: (item: ProductOldsItem) => <span>{item.old_quantity_product}</span>,
                                                },
                                                {
                                                    accessor: 'old_price_product',
                                                    title: 'Harga',
                                                    render: (item: ProductOldsItem) => <span>{formatRupiah(item.old_price_product)}</span>,
                                                },
                                            ]}
                                            totalRecords={results.data?.data.resource.total ?? 0}
                                            recordsPerPage={results.data?.data.resource.per_page ?? 0}
                                            page={page}
                                            onPageChange={(prevPage) => setPage(prevPage)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataInput;
