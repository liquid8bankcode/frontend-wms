import React, { ChangeEvent } from 'react';

interface NewBarcodeData {
    barcode: string;
    nama: string;
    harga: string;
    qty: string;
    header: string;
    handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NewBarcodeData: React.FC<NewBarcodeData> = ({ header, barcode, nama, harga, qty, handleChangeInput }) => {
    return (
        <div className="flex flex-col gap-4 panel">
            <h2 className="text-lg font-medium">{header}</h2>
            <div>
                <label htmlFor="gridBarcode1">Barcode</label>
                <input id="gridBarcode1" disabled type="text" placeholder="Enter Barcode" className="form-input" value={barcode} />
            </div>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input id="gridNama1" type="text" placeholder="Enter Nama" className="form-input" name="new_name_product" value={nama} onChange={handleChangeInput} />
            </div>
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <input id="gridNama3" type="text" placeholder="Enter Harga" className="form-input" name="new_price_product" value={harga} onChange={handleChangeInput} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" className="form-input" name="new_quantity_product" value={qty} onChange={handleChangeInput} />
            </div>
        </div>
    );
};

export default NewBarcodeData;
