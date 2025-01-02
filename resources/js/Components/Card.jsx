import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function Card({ link, icon, tableName, dataCount }) {
    const [count, setCount] = useState(1); // State untuk menyimpan nilai yang ditampilkan

    useEffect(() => {
        // Jika dataCount adalah 0, tidak perlu animasi
        if (dataCount === 0) {
            setCount(0);
            return;
        }

        // Mengatur interval untuk animasi
        const interval = setInterval(() => {
            setCount((prevCount) => {
                // Jika prevCount sudah mencapai dataCount, hentikan interval
                if (prevCount < dataCount) {
                    return prevCount + 1; // Tambahkan 1 ke prevCount
                } else {
                    clearInterval(interval); // Hentikan interval
                    return prevCount; // Kembalikan prevCount
                }
            });
        }, 70); // Ubah angka ini untuk mempercepat atau memperlambat animasi

        // Bersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, [dataCount]); // Jalankan efek ini setiap kali dataCount berubah

    return (
        <Link href={link} className="">
            <div
                id="card"
                className={`p-10 pr-10 bg-white rounded-lg shadow flex items-center gap-5`}
            >
                <div className="icon border w-fit h-fit p-5 rounded-2xl bg-gradient-to-b from-[#2A2A2A] to-[#474747]">
                    {icon}
                </div>

                <div className="text">
                    <div className="name-table text-gray-500">{tableName}</div>
                    <div className="data text-3xl font-bold text-black transition-all ease-in duration-200">
                        {count} {/* Tampilkan nilai yang sedang dihitung */}
                    </div>
                </div>
            </div>
        </Link>
    );
}
