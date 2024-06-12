import { useGetSaleReportQuery } from '../../../store/services/saleApi';
import { useParams } from 'react-router-dom';
import LogoLiquid from '/assets/images/logo-barcode.png';
import { formatCurrency, formatDate, formatTimestamp } from '../../../helper/functions';

const ReportTable = () => {
    const { code_document_sale } = useParams();
    const { data } = useGetSaleReportQuery(code_document_sale);

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

    function terbilang(n: number): string {
        var bilangan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

        if (n < 12) {
            return bilangan[n];
        } else if (n < 20) {
            return bilangan[n - 10] + ' belas';
        } else if (n < 100) {
            return bilangan[Math.floor(n / 10)] + ' puluh ' + bilangan[n % 10];
        } else if (n < 200) {
            return 'seratus ' + terbilang(n - 100);
        } else if (n < 1000) {
            return bilangan[Math.floor(n / 100)] + ' ratus ' + terbilang(n % 100);
        } else if (n < 2000) {
            return 'seribu ' + terbilang(n - 1000);
        } else if (n < 1000000) {
            return terbilang(Math.floor(n / 1000)) + ' ribu ' + terbilang(n % 1000);
        } else if (n < 1000000000) {
            return terbilang(Math.floor(n / 1000000)) + ' juta ' + terbilang(n % 1000000);
        } else if (n < 1000000000000) {
            return terbilang(Math.floor(n / 1000000000)) + ' milyar ' + terbilang(n % 1000000000);
        } else {
            return 'Angka terlalu besar';
        }
    }

    function formatRupiah(angka: number): string {
        var formatted = terbilang(angka) + ' rupiah';
        return formatted;
    }

    const totalHarga: number | undefined = data?.data?.category_report.total_harga ?? 0;
    const totalHargaFormatted: string = totalHarga.toLocaleString('id-ID');
    const totalHargaTerbilang: string = formatRupiah(totalHarga).toUpperCase();

    return (
        <>
            <div className="print-container" style={{ fontFamily: 'sans-serif' }}>
                {/* header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <table border={1} style={{ marginBottom: 2 }}>
                            <tr>
                                <td>FORM VALIDASI</td>
                            </tr>
                            <tr>
                                <td>{data?.buyer.code_document_sale}/LMS/I/2024</td>
                            </tr>
                        </table>
                        <table border={1}>
                            <tr>
                                <td>Sales Reference</td>
                            </tr>
                            <tr>
                                <td style={{ height: 18 }}></td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table border={1}>
                            <tr>
                                <td>BUYER ID</td>
                            </tr>
                            <tr>
                                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 46 }}>
                                    <h1 style={{ fontSize: 36 }}>{data?.buyer.id}</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <img src={LogoLiquid} alt="barcode" style={{ marginTop: '-10px' }} width={120} />
                </div>
                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <h3 style={{ fontSize: 12 }}>A. Identitas Buyer</h3>
                    <table border={1}>
                        <tr>
                            <td style={{ width: '50%' }}>
                                <h5>Nama : {data?.buyer.buyer_name_document_sale}</h5>
                                <h5>Alamat : {data?.buyer.buyer_address_document_sale}</h5>
                                <h5>HP : {data?.buyer.buyer_phone_document_sale}</h5>
                                <h5>NPWP : -</h5>
                                <h5>Tanggal : {formatTimestamp(data?.buyer.created_at ?? '')}</h5>
                            </td>
                            <td style={{ width: '50%' }}>
                                <h5 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Catatan Pembelian</h5>
                                <p style={{ fontSize: 12 }}>
                                    Masing-masing pihak tidak bertanggung jawab atas, perbuatan melawan hukum, kelalaian, pelanggaran atau segala kerugian, kerusakan, ongkos atau biaya dalam bentuk
                                    apapun yang harus dibayar atau diderita oleh pihak yang lain (a) baik yang bersifat tidak langsung atau konsekuensial atau (b) yang terkait dengan kerugian ekonomi,
                                    keuntungan atau reputasi bisnis.
                                </p>
                            </td>
                        </tr>
                    </table>
                    <p style={{ marginTop: 12, fontSize: 12 }}>
                        Bahwa yang bersangkutan di atas telah melakukan pemilihan dan pemilahan atas barang yang berada di area Liquid8 Wholesale dan sepakat untuk melakukan pembelian sebagaimana
                        detail barang & harga berlaku di bawah:
                    </p>
                </div>
                {/* tables */}
                {/* footer */}
                <div>
                    <h3 style={{ fontSize: 12 }}>B. Informasi Harga Jual & Diskon berlaku</h3>
                    <table style={{ marginBottom: 24 }} border={1}>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Total Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.category_report.category_list &&
                                data?.data.category_report.category_list.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.category}</td>
                                        <td>{item.total_quantity}</td>
                                        <td>{formatCurrency(item.total_price)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <p style={{ marginTop: 12, fontSize: 12 }}>
                        Bahwa Buyer telah SETUJU dengan diskon atau harga jual yang telah ditentukan di atas dan SETUJU untuk melakukan transfer sebagaimana total "FINAL PRICE" tertera sebesar
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 200, borderBottom: '2 solid black' }}>
                            <h3 style={{ fontWeight: 'bold' }}>Rp. {totalHargaFormatted}</h3>
                        </div>
                        <p style={{ fontWeight: 'bold', fontSize: 12 }}>({totalHargaTerbilang})</p>
                    </div>
                    <div>
                        <p> ke rekening di bawah ini :</p>
                    </div>
                    <div style={{ width: '100%' }}>
                        <table border={1} style={{ width: '100%' }}>
                            <tr>
                                <td style={{ width: '100%' }}>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <p>NOMOR REKENING :</p>
                                        <p>178-499-8811</p>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <p>NAMA PEMILIK:</p>
                                        <p>178-499-8811</p>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <p>BANK REKENING:</p>
                                        <p>BCA</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <h3 style={{ fontSize: 12 }}>C. Informasi status pembelian</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <ul style={{ listStyle: 'none' }}>
                                <li>(1) Pembayaran telah dilakukan oleh buyer bersangkutan</li>
                                <li>(2) Pembayaran telah terkonfirmasi masuk ke rekening yang ditunjuk</li>
                                <li>(3) Segala label, dan informasi pihak diluar penjual dan pembeli telah di tiadakan</li>
                                <li>(4) Schedule pickup barang telah di tentukan</li>
                                <li>(5) Buyer sudah di info barang keluar gudang tidak bisa di kembalikan/refund</li>
                            </ul>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -40 }}>
                                    <h5>Sudah</h5>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2, marginTop: -4 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -40, marginLeft: 6 }}>
                                    <h5>Belum</h5>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2, marginTop: -4 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                    <div style={{ border: 2, borderStyle: 'solid', borderColor: 'black', width: 30, height: 20, marginBottom: 2 }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 16 }}>
                        <div style={{ height: 150, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <h5>Buyer</h5>
                        </div>
                        <div style={{ height: 150, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h5>Dibuat:</h5>
                            <h5>Admin Kasir:</h5>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handlePrint} className="py-2 px-8 bg-primary text-white rounded-full mt-6">
                Print
            </button>
        </>
    );
};

export default ReportTable;
