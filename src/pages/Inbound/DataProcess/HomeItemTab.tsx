import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { GeneratesData } from '../../../helper/types';

interface HomeItemTab {
    showAlert: (type: number) => void;
    getGeneratesData: (data: GeneratesData) => void;
    dataGenerates: GeneratesData | undefined;
    handleRole: (roleActive: boolean) => void;
    handleMessage: (message: string) => void;
}

const HomeItemTab: React.FC<HomeItemTab> = ({ showAlert, getGeneratesData, dataGenerates, handleRole, handleMessage }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const fetchData = async () => {

        if (file) {
            const formdata = new FormData();
            const token = localStorage.getItem('token');
            const header = new Headers();
            formdata.append('file', file, file.name);

            header.append('Authorization', `Bearer ${token}`);
            const requestOptions = {
                method: 'POST',
                headers: header,
                body: formdata,
                redirect: 'follow' as RequestRedirect,
            };

            fetch('https://server.wms-liquid8.online/api/generate', requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    handleMessage(result.data.message);
                    handleRole(result.data.status);
                    if (result.data.status) {
                        getGeneratesData(result);
                        toast.success(result.data.message);
                    } else {
                        toast.error(result.data.message);
                    }
                })
                .catch((error) => toast.error('Error!'));
        }

    };

    useEffect(() => {
        if (file) {
            fetchData();
        }
    }, [file]);

    const documentCode = useMemo(() => {
        if (dataGenerates) {
            return dataGenerates?.data?.resource?.code_document;
        }
    }, [dataGenerates]);

    return (
        <div className="flex gap-4 mt-6">
            <div className="w-1/2">
                <input
                    onChange={handleFileChange}
                    id="ctnFile"
                    type="file"
                    accept=".xlsx, .xls"
                    className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                    required
                />
            </div>
            <div className="table-responsive mb-5 w-full">
                {dataGenerates && (
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Data</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="whitespace-nowrap">1</div>
                                </td>
                                <td>{documentCode}</td>
                                <td className="text-center">
                                    <button onClick={() => showAlert(11)} type="button" className="btn btn-outline-danger">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default HomeItemTab;
