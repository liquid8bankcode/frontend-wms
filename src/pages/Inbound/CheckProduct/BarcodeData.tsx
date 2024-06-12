import React from 'react';
import { formatRupiah } from '../../../helper/functions';

interface BarcodeData {
    barcode: string | undefined;
    nama: string | undefined;
    harga: string | undefined;
    qty: string | undefined;
    header: string | undefined;
}

const BarcodeData: React.FC<BarcodeData> = ({ header, barcode, nama, harga, qty }) => {
    return (
        <div className="flex flex-col gap-4 panel">
            <h2 className="text-lg font-medium">{header}</h2>
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
                <input id="gridNama3" disabled type="text" placeholder="Enter Nama" className="form-input" value={formatRupiah(harga ?? '0')} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" value={qty} />
            </div>
        </div>
    );
};

export default BarcodeData;
