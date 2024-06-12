import React, { useState } from 'react';
import Barcode from 'react-barcode';
import LogoLiquid from '/assets/images/logo-barcode.png';
import { Spinner } from '../../../commons';

interface BarcodePrint {
    oldPrice: string;
    newPrice: string;
    barcode: string;
    category: string;
    isBundle?: boolean;
}

const BarcodePrinted: React.FC<BarcodePrint> = ({ oldPrice, newPrice, barcode, category, isBundle }) => {
    const handlePrint = async () => {
        const containerElement: HTMLElement | null = document.querySelector('.print-container');
        if (containerElement) {
            const printWindow: Window | null = window.open('', '_blank');

            if (printWindow) {
                const printDocument = printWindow.document;
                printDocument.write('<html><head><title>Print</title></head><body>');
                printDocument.write(containerElement.innerHTML);
                printDocument.write('</body></html>');
                printDocument.close();
                window.location.reload();
                printWindow.print();
            } else {
                console.error('Failed to open print window');
            }
        } else {
            console.error('Container not found');
        }
    };
    return (
        <div>
            <div style={{ width: '7cm', height: '4cm', display: 'flex', justifyContent: 'start', alignItems: 'start', fontFamily: 'sans-serif' }} className="print-container">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Barcode value={barcode} width={1} height={46} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <img src={LogoLiquid} alt="barcode" style={{ marginTop: '-10px' }} width={120} />
                            <div style={{ height: 26, border: '2px solid black', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <p style={{ fontWeight: 'bold', fontSize: 10 }}>{category}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table style={{ borderSpacing: 0 }}>
                            <tr>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{!isBundle ? 'Harga Retail' : 'Total Awal'}</td>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textDecoration: 'line-through' }}>: {oldPrice}</td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{!isBundle ? 'Harga Diskon' : 'Custom Display'}</td>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>: {newPrice}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <button onClick={handlePrint} className="py-2 px-8 bg-primary text-white rounded-full mt-6">
                Print
            </button>
        </div>
    );
};

export default BarcodePrinted;
