import React, { ChangeEvent, useEffect, useState } from 'react';

interface NewBarcodeDataMulti {
    barcode: string;
    nama: string;
    newPrice: string;
    qty: string;
    header: string;
    handleSetNewPercentagePriceInput: (price: string) => void;
    handleSetCustomQuantityInput: (qty: string) => void;
    handleIsQuantity: () => void;
}

const NewBarcodeDataMulti: React.FC<NewBarcodeDataMulti> = ({ barcode, nama, newPrice, qty, header, handleSetNewPercentagePriceInput, handleSetCustomQuantityInput, handleIsQuantity }) => {
    const [inputQuantity, setInputQuantity] = useState<string>('');
    const [inputPrice, setInputPrice] = useState<string>('');

    useEffect(() => {
        setInputPrice(newPrice);
        setInputQuantity(qty);
    }, [qty, newPrice]);

    const handleInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        handleIsQuantity();
        setInputQuantity(e.target.value);
        handleSetCustomQuantityInput(e.target.value);
    };
    const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setInputPrice(e.target.value);
        handleSetNewPercentagePriceInput(e.target.value);
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-lg font-bold">{header}</h1>
            <div>
                <label htmlFor="gridBarcode1">Barcode</label>
                <input id="gridBarcode1" disabled type="text" placeholder="Enter Barcode" className="form-input" value={barcode} />
            </div>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input id="gridNama1" type="text" disabled placeholder="Enter Nama" className="form-input" value={nama} />
            </div>
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <input id="gridNama3" type="text" placeholder="Enter Nama" className="form-input" value={inputPrice} onChange={handleInputPrice} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" className="form-input" value={inputQuantity} onChange={handleInputQuantity} />
            </div>
        </div>
    );
};

export default NewBarcodeDataMulti;
