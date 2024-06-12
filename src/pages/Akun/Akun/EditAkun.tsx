import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateAccountMutation } from '../../../store/services/listAkunApi';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import { GetListRoleItem } from '../../../store/services/types';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const EditAkun = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateAccount, results] = useUpdateAccountMutation();
    const { data } = useGetListRoleQuery(undefined);
    const dataListRole: GetListRoleItem[] = useMemo(() => {
        return (data?.data?.resource || []) as GetListRoleItem[];
    }, [data]);

    const [input, setInput] = useState({
        name: state?.name,
        username: state?.username,
        email: state?.email,
        password: state?.password,
        role_id: state?.role_id,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateAccount = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                name: input.name,
                username: input.username,
                email: input.email,
                password: input.password,
                role_id: input.role_id,
            };
            await updateAccount({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/akun/akun/list_akun');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Akun" basePath="/akun/akun/list_akun" sub="List Akun" subPath="/akun/akun/list_akun" current="Add Akun" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Edit Akun</h5>
                    <Link to="/akun/akun/list_akun">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateAccount}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="name" onChange={handleInputChange} value={input.name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="roleSelect" className="text-[15px] font-semibold whitespace-nowrap">
                            Role :
                        </label>
                        <select id="roleSelect" className="form-select w-[250px]" required name="role_id" onChange={handleInputChange} value={input.role_id}>
                            <option value="" disabled>
                                Pilih Role
                            </option>
                            {dataListRole.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                            Username :
                        </label>
                        <input id="username" type="text" className="form-input w-[250px]" required name="username" onChange={handleInputChange} value={input.username} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Email :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" required name="email" onChange={handleInputChange} value={input.email} />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-[15px] font-semibold whitespace-nowrap">
                            Password :
                        </label>
                        <input id="password" type="text" className="form-input w-[250px]" required name="password" onChange={handleInputChange} value={input.password} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditAkun;
