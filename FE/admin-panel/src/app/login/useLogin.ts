import React from "react";
import Admin from "@/models/admin";
import {API, setAuthToken} from "@/libs/axios";
import {useRouter} from "next/navigation";

export function useLogin() {
    const [form , setform] = React.useState<Admin>({
        name: "",
        password: ""
    })
    const router = useRouter()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleLogin() {
        try {
            const response = await API.post("/auth/adminLogin", form)

            localStorage.setItem('token', response.data)
            setAuthToken(response.data)
            setform({
                name: "",
                password: ""
            })

            router.push("/dashboard")
        } catch (error) {
            console.log(error)
        }

    }

    return {
        form,
        handleChange,
        handleLogin
    }
}