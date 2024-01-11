'use client'

import {useLogin} from "@/app/login/useLogin";



export default function Login() {
    const { form, handleChange, handleLogin } = useLogin()

    return (
        <div className={"grid h-screen place-content-center"}>
            <h1 className={"font-bold text-red-600 text-5xl"}>Login</h1>

            <div className={"grid grid-cols-1 gap-x-3 my-3"}>
                <div className={"grid grid-cols-1 w-full gap-x-3 mb-3"}>
                    <label
                        htmlFor={"name"}
                        className={"text-lg font-medium text-gray-200"}
                    >Name</label>
                    <input
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        value={form.name}
                        onChange={handleChange}
                        className={"w-52 rounded-md text-gray-900 bg-gray-200 px-1.5 text-lg"}
                    />
                </div>
                <div className={"grid grid-cols-1 w-full gap-x-3 mb-3"}>
                    <label
                        htmlFor={"password"}
                        className={"text-lg font-medium text-gray-200"}
                    >Password</label>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        value={form.password}
                        onChange={handleChange}
                        className={"w-52 rounded-md text-gray-900 bg-gray-200 px-1.5 text-lg"}
                    />
                </div>
                <div className={"flex justify-end my-3"}>
                    <button
                        type={"submit"}
                        onClick={handleLogin}
                        className={"rounded-3xl bg-red-500 text-gray-900 font-bold px-3 py-1"}
                    >Submit</button>
                </div>
            </div>

        </div>

    )
}