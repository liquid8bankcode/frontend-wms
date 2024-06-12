import { useEffect, useState } from 'react';

function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate;
}

function formatRupiah(amount: string) {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
        console.error('Invalid numeric value');
        return '';
    }

    const formattedAmount = numericAmount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedAmount;
}

function formatDate(tanggalString: string) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const options: any = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' };
    const tanggal = new Date(tanggalString);

    const hari = days[tanggal.getDay()];
    const tanggalFormat = tanggal.toLocaleDateString('id-ID', options);

    const [tanggalPart, bulanPart, tahunPart] = tanggalFormat.split('/');
    const formattedTanggal = `${tanggalPart}-${bulanPart.padStart(2, '0')}-${tahunPart}`;

    return formattedTanggal;
}

function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function formatYearToDay(timestamp: string) {
    // Ubah string timestamp ke objek Date
    const tanggal = new Date(timestamp);

    // Ambil tahun, bulan, dan tanggal dari objek Date
    const tahun = tanggal.getFullYear();
    const bulan = (tanggal.getMonth() + 1).toString().padStart(2, '0'); // Tambah '0' di depan jika bulan kurang dari 10
    const tanggalStr = tanggal.getDate().toString().padStart(2, '0'); // Tambah '0' di depan jika tanggal kurang dari 10

    // Bentuk kembali string dengan format yang diinginkan
    const tanggalHasil = `${tahun}-${bulan}-${tanggalStr}`;

    return tanggalHasil;
}

function convertPercentage(angka: string): string {
    // Ubah string angka ke bentuk desimal
    const nilaiDesimal: number = parseFloat(angka);

    // Pastikan nilaiDesimal adalah angka
    if (isNaN(nilaiDesimal)) {
        return 'Format input tidak valid';
    }

    // Ubah nilaiDesimal menjadi persentase tanpa angka desimal
    const nilaiPersentase: number = parseInt(nilaiDesimal.toString());

    // Bentuk kembali string dengan format persentase
    const hasil: string = `${nilaiPersentase}%`;

    return hasil;
}

function formatCurrency(value: number) {
    const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);

    return formattedValue;
}

function countPastTime(timestamp: string) {
    // Mengonversi timestamp ke objek Date
    const waktuSekarang: any = new Date();
    const waktuInput: any = new Date(timestamp);

    // Menghitung selisih waktu dalam milidetik
    const selisihMilidetik = waktuSekarang - waktuInput;

    // Menghitung selisih dalam detik, menit, jam, hari, minggu, bulan, dan tahun
    const selisihDetik = Math.floor(selisihMilidetik / 1000);
    const selisihMenit = Math.floor(selisihDetik / 60);
    const selisihJam = Math.floor(selisihMenit / 60);
    const selisihHari = Math.floor(selisihJam / 24);
    const selisihMinggu = Math.floor(selisihHari / 7);
    const selisihBulan = Math.floor(selisihHari / 30);
    const selisihTahun = Math.floor(selisihHari / 365);

    // Logika untuk menentukan format waktu yang sesuai
    if (selisihTahun > 0) {
        return selisihTahun === 1 ? '1 tahun yang lalu' : `${selisihTahun} tahun yang lalu`;
    } else if (selisihBulan > 0) {
        return selisihBulan === 1 ? '1 bulan yang lalu' : `${selisihBulan} bulan yang lalu`;
    } else if (selisihMinggu > 0) {
        return selisihMinggu === 1 ? '1 minggu yang lalu' : `${selisihMinggu} minggu yang lalu`;
    } else if (selisihHari > 0) {
        return selisihHari === 1 ? '1 hari yang lalu' : `${selisihHari} hari yang lalu`;
    } else if (selisihJam > 0) {
        return selisihJam === 1 ? '1 jam yang lalu' : `${selisihJam} jam yang lalu`;
    } else if (selisihMenit > 0) {
        return selisihMenit === 1 ? '1 menit yang lalu' : `${selisihMenit} menit yang lalu`;
    } else {
        return 'Baru saja';
    }
}

const characters = '0123456789';
function generateRandomStringFormatBundle() {
    let randomString = 'LQB';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}
function generateRandomStringFormatQCD() {
    let randomString = 'QCD';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay ?? 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export {
    formatTimestamp,
    formatRupiah,
    formatDate,
    generateRandomString,
    formatYearToDay,
    convertPercentage,
    formatCurrency,
    countPastTime,
    generateRandomStringFormatBundle,
    generateRandomStringFormatQCD,
    useDebounce,
};
