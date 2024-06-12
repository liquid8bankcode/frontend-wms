import React, { ChangeEvent } from 'react';

interface BarcodeData {
    barcode: string | undefined;
    nama: string | undefined;
    harga: string | undefined;
    qty: string | undefined;
    header: string | undefined;
    oldPrice: string | undefined;
    hanldeEditProduct: (e: ChangeEvent<HTMLInputElement>) => void;
    hideRedirect: () => void;
}

const BarcodeData: React.FC<BarcodeData> = ({ header, barcode, nama, harga, qty, oldPrice, hanldeEditProduct }) => {
    return (
        <div className="flex flex-col gap-4 w-full panel">
            <h2 className="text-lg font-medium">{header}</h2>
            <div>
                <label htmlFor="gridBarcode1">Barcode</label>
                <input id="gridBarcode1" type="text" placeholder="Enter Barcode" className="form-input" name="old_barcode_product" value={barcode} onChange={hanldeEditProduct} />
            </div>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input id="gridNama1" type="text" placeholder="Enter Nama" className="form-input" value={nama} name="old_name_product" onChange={hanldeEditProduct} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input cursor-not-allowed" value={qty} />
            </div>
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <div className="flex space-x-2">
                    <input id="gridNama3" type="number" placeholder="Enter Nama" className="form-input" value={oldPrice} name="old_price_product" onChange={hanldeEditProduct} />
                </div>
            </div>
        </div>
    );
};

export default BarcodeData;
