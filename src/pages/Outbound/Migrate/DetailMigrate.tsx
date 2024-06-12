import React, { useMemo } from 'react';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import IconSend from '../../../components/Icon/IconSend';
import { useGetShowMigrateQuery } from '../../../store/services/migrateApi';
import { formatRupiah } from '../../../helper/functions';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const DetailMigrate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { id } = useParams();
    const { data: ShowMigrateData } = useGetShowMigrateQuery(id);

    const ShowMigrate = useMemo(() => {
        return ShowMigrateData?.data.resource;
    }, [ShowMigrateData]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/outbound/migrate/list_migrate">
                        <span>List Migrate</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Migrate</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Migrate</h1>
            </div>
            <div>
                <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 my-8 relative">
                    <div className="bg-primary absolute mt-2 text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconSend fill className="w-12 h-12" />
                    </div>
                    <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DOC MIGRATE :</div>
                            <div className="whitespace-nowrap">{ShowMigrate?.code_document_migrate}</div>
                        </div>
                        <div className=" items-center text-lg w-full justify-between mb-2">
                            <div className="text-white-dark">QTY :</div>
                            <ul className="space-y-3 list-inside list-disc font-semibold">{ShowMigrate?.total_product_document_migrate}</ul>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DESTINATION :</div>
                            <div className="whitespace-nowrap">{ShowMigrate?.destiny_document_migrate}</div>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/outbound/migrate/list_migrate">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={ShowMigrate?.migrates}
                            columns={[
                                { accessor: 'id', title: 'No', render: (e, index) => index + 1 },
                                { accessor: 'product_color', title: 'Product Color' },
                                { accessor: 'product_total', title: 'QTY' },
                                { accessor: 'status_migrate', title: 'Status' },
                            ]}
                            minHeight={200}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMigrate;
