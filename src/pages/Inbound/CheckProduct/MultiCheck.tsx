import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import IconSearch from '../../../components/Icon/IconSearch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLazyGetBarcodeQuery } from '../../../store/services/checkProduct';
import BarcodeData from './BarcodeData';
import TagColorData from './TagColorData';
import ProductCheck from './ProductCheck';
import { useCheckAllDocumentMutation } from '../../../store/services/riwayatApi';
import NewBarcodeData from './NewBarcodeData';
import BarcodePrinted from './BarcodePrinted';
import { formatRupiah } from '../../../helper/functions';
import { Alert } from '../../../commons';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import NewBarcodeDataMulti from './NewBarcodeDataMulti';

const MultiCheck = () => {
    const { state } = useLocation();
    const [inputBarcode, setInputBarcode] = useState<string>('');
    const [isProductCheck, setIsProductCheck] = useState<boolean>(false);
    const [isResetValue, setIsResetValue] = useState<boolean>(true);
    const [checkAllDocument, checkResults] = useCheckAllDocumentMutation();
    const navigate = useNavigate();
    const [newPricePercentage, setNewPricePercentage] = useState<string>('0');
    const [customQuantity, setCustomQuantity] = useState<string>('0');
    const [percentageState, setPercentageState] = useState<string>('0');
    const [isBarcode, setIsBarcode] = useState<boolean>(false);
    const [newPriceBarcode, setNewPriceBarcode] = useState('');
    const [oldPriceBarcode, setOldPriceBarcode] = useState('');
    const [codeBarcode, setCodeBarcode] = useState<string>('');
    const [isQuantity, setIsQuantity] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [getBarcode, results] = useLazyGetBarcodeQuery();

    const [keterangan, setKeterangan] = useState<string>('');

    const getSelectedCategory = (selected: string) => {
        setSelectedCategory(selected);
    };
    const showBarcode = () => {
        setIsBarcode(true);
    };
    const hideBarcode = () => {
        setIsBarcode(false);
    };
    const handleIsQuantity = () => {
        setIsQuantity(true);
    };

    const handleInputBarcode = async () => {
        if (inputBarcode.length === 0 || inputBarcode === '') {
            return;
        }
        try {
            await getBarcode({ code_document: state?.codeDocument, old_barcode_product: inputBarcode });
            setIsResetValue(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetNewPercentagePriceInput = (price: string) => {
        setNewPricePercentage(price);
    };
    const handleSetCustomQuantityInput = (qty: string) => {
        setCustomQuantity(qty);
    };

    const resetValueMultiCheck = () => {
        setNewPricePercentage('0');
        setPercentageState('0');
        setIsResetValue(true);
    };
    const resetProductCheckShow = () => {
        setIsProductCheck(false);
    };

    const tagColor = useMemo(() => {
        if (results?.data?.data?.resource?.color_tags !== undefined) {
            return results.data?.data.resource.color_tags[0];
        }
    }, [results]);

    const oldData = useMemo(() => {
        if (results.isSuccess && results.data.data.status) {
            return results.data?.data.resource.product;
        }
    }, [results]);

    const newPrice = useMemo(() => {
        if (results.isSuccess && results.data.data.status) {
            return results.data?.data.resource.product.old_price_product;
        }
    }, [results]);
    const newBarcode = useMemo(() => {
        if (results.isSuccess && results.data.data.status) {
            return results.data?.data.resource.new_barcode;
        }
    }, [results]);

    const handleCheckDoneAll = async () => {
        const resAlert = await Swal.fire({
            title: 'Yakin akan melakukan pengecekan semuanya?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yakin',
            denyButtonText: `Tidak`,
        });
        if (resAlert.isConfirmed) {
            const body = {
                code_document: state?.codeDocument,
            };
            await checkAllDocument(body)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    navigate('/inbound/check_history');
                })
                .catch((err) => {
                    toast.success(err.data.errors.code_document[0]);
                });
        }
    };

    const countPercentage = (percentage: string) => {
        setPercentageState(percentage);
    };

    const handleSetNewPriceProduct = (newPrice: string) => {
        setNewPriceBarcode(newPrice);
    };

    useEffect(() => {
        const percentageInt = 100 - parseInt(percentageState);
        const newPriceInt = Math.floor(parseInt(newPrice ?? '0'));

        const result = (newPriceInt * percentageInt) / 100;

        setNewPricePercentage(JSON.stringify(result));
    }, [percentageState]);

    useEffect(() => {
        if (results.isSuccess && results.data.data.status) {
            toast.success(results?.data?.data?.message ?? '');
            setIsProductCheck(true);
            hideBarcode();
            if (Math.ceil(Number(results.data.data.resource.product.old_price_product)) >= 100000) {
                setKeterangan('>100K');
            } else {
                setKeterangan('<=100K');
            }
            setInputBarcode('');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? '');
        }
    }, [results]);

    useEffect(() => {
        if (results.isSuccess && results.data?.data.status === false) {
            setInputBarcode('');
            toast.error(results?.data?.data.message ?? '');
        }
    }, [results?.data?.data.message]);

    useEffect(() => {
        setOldPriceBarcode(formatRupiah(oldData?.old_price_product ?? ''));
        setCodeBarcode(newBarcode);
    }, [oldData?.old_price_product, oldData?.old_barcode_product]);

    if (results.isError && !results.data?.data.status) {
        return <Alert message={results.data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-8">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Check Product</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Multi Check </span>
                </li>
            </ul>
            <div className="flex gap-4">
                <div className=" xl:w-1/2 ss:w-full gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold my-4">CHECK : {state?.codeDocument}</h1>
                        <Link to="/inbound/check_product/detail_data" state={{ codeDocument: state?.codeDocument }}>
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <form className="w-full panel mb-5 col-span-2 gap-4 flex items-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search Attendees..."
                                onChange={(e) => setInputBarcode(e.target.value)}
                                value={inputBarcode}
                                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                            />
                            <button
                                onClick={handleInputBarcode}
                                type="button"
                                className="btn btn-info absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center"
                            >
                                <IconSearch />
                            </button>
                        </div>
                        <div className="flex gap-4 items-center w-full">
                            <label htmlFor="gridKeterangan">Keterangan</label>
                            <input id="gridKeterangan" type="text" disabled className="form-input w-full" value={!isResetValue ? keterangan : ''} />
                        </div>
                    </form>
                    <div className="space-y-5 col-span-2">
                        <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                            <BarcodeData
                                header="OLD DATA"
                                barcode={!isResetValue ? oldData?.old_barcode_product : ''}
                                nama={!isResetValue ? oldData?.old_name_product : ''}
                                harga={!isResetValue ? oldData?.old_price_product : ''}
                                qty={!isResetValue ? oldData?.old_quantity_product : ''}
                            />
                            {!tagColor || tagColor === undefined ? (
                                <NewBarcodeDataMulti
                                    header="NEW DATA"
                                    barcode={!isResetValue ? newBarcode : ''}
                                    nama={!isResetValue ? oldData?.old_name_product : ''}
                                    newPrice={!isResetValue ? newPricePercentage : ''}
                                    qty={!isResetValue ? oldData?.old_quantity_product : ''}
                                    handleSetNewPercentagePriceInput={handleSetNewPercentagePriceInput}
                                    handleSetCustomQuantityInput={handleSetCustomQuantityInput}
                                    handleIsQuantity={handleIsQuantity}
                                />
                            ) : (
                                <TagColorData
                                    tag={!isResetValue ? tagColor.hexa_code_color : ''}
                                    nama={!isResetValue ? tagColor.name_color : ''}
                                    harga={!isResetValue ? tagColor.fixed_price_color : ''}
                                    qty={!isResetValue ? oldData.old_quantity_product : ''}
                                />
                            )}
                        </div>
                        <button className="btn btn-warning !mt-6" onClick={handleCheckDoneAll}>
                            DONE CHECK ALL
                        </button>
                    </div>
                </div>
                {isProductCheck && (
                    <ProductCheck
                        oldData={oldData}
                        tagColor={tagColor}
                        resetValueMultiCheck={resetValueMultiCheck}
                        resetProductCheckShow={resetProductCheckShow}
                        countPercentage={countPercentage}
                        newPricePercentage={newPricePercentage}
                        showBarcode={showBarcode}
                        hideBarcode={hideBarcode}
                        handleSetNewPriceProduct={handleSetNewPriceProduct}
                        customQuantity={customQuantity}
                        codeBarcode={codeBarcode}
                        isQuantity={isQuantity}
                        getSelectedCategory={getSelectedCategory}
                    />
                )}
                {isBarcode && <BarcodePrinted barcode={codeBarcode} newPrice={newPriceBarcode} oldPrice={oldPriceBarcode} category={selectedCategory} />}
            </div>
        </div>
    );
};

export default MultiCheck;
