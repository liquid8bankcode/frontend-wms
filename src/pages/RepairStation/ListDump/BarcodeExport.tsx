import React, { useState } from 'react';
import Barcode from 'react-barcode';
import LogoLiquid from '/assets/images/logo-barcode.png';
import { Spinner } from '../../../commons';
import { useDeleteListDumpMutation, useExportDumpQuery } from '../../../store/services/listDumpApi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface BarcodePrint {
    id: number;
    oldPrice: string;
    newPrice: string;
    barcode: string;
    category: string;
    isBundle?: boolean;
}

const BarcodeExport: React.FC<BarcodePrint> = ({ id, oldPrice, newPrice, barcode, category, isBundle }) => {
    const { data } = useExportDumpQuery(id);
    const [deleteListDump] = useDeleteListDumpMutation();
    const navigate = useNavigate();

    const showAlertDelete = async ({ type, id }: { type: number; id: number | undefined }) => {
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
                .then(async (result) => {
                    if (result.value) {
                        await deleteListDump(id)
                            .unwrap()
                            .then((res) => {
                                toast.success(res.data.message);
                                navigate('/repair_station/list_dump');
                            })
                            .catch((err) => {
                                toast.error(err.data.message);
                            });
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
        if (type === 15) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Berhasil Dikirim',
                padding: '10px 20px',
            });
        }
        if (type == 20) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Data Berhasil Ditambah',
                padding: '10px 20px',
            });
        }
    };

    const handlePrint = async () => {
        window.open(await data.data.resource);
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
            <div className="flex gap-x-2">
                <button onClick={handlePrint} className="py-2 px-8 bg-primary text-white rounded-full mt-6">
                    Export Data
                </button>
                <button onClick={() => showAlertDelete({ type: 11, id: id })} className="py-2 px-8 bg-danger text-white rounded-full mt-6">
                    Hapus
                </button>
            </div>
        </div>
    );
};

export default BarcodeExport;
