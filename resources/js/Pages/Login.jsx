import { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const [statusLogin, setStatusLogin] = useState(null);
    const [message, setMessage] = useState(null);
    const { data, setData, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // mengirimkan data
    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Menangani kesalahan dari server
                // console.error("Error failed login:", errorData);

                // Anda bisa mengatur error di sini jika
                setStatusLogin(errorData);
                setMessage(errorData);
                reset("email", "password"); // Reset
                console.log(errorData);
                return;
            }

            const responseData = await response.json();
            console.log("Login successfully:", responseData.username);

            // redirect ke halaman login
            window.location.href = "/dashboard/home";
            // reset("email", "password");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // untuk menghilangkan message setelah waktu yang diinginkan
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <GuestLayout>
            <Head title="Log in" />

            <form onSubmit={submit}>
                <h2 className="flex justify-center font-semibold text-2xl text-gray-700">
                    Sign in
                </h2>
                <p className="text-center mb-4">
                    enter your email and password to log in
                </p>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-gray-600 "
                        autoComplete="email"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError
                        message={
                            message && message.status == "failed_email"
                                ? message.message
                                : ""
                        }
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-gray-600"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError
                        message={
                            message && message.status == "failed_password"
                                ? message.message
                                : ""
                        }
                        className="mt-2"
                    />
                </div>

                {/* {statusLogin && (
                    <div className="mb-4 text-sm mt-1 font-medium text-red-600">
                        {statusLogin}
                    </div>
                )} */}
                <Link
                    href={route("password.request")}
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                >
                    Forgot your password?
                </Link>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
