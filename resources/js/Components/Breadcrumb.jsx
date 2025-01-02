export default function Breadcrumb({ locationPage }) {
    return (
        <nav className="flex flex-col leading-5" aria-label="Breadcrumb">
            <ul className="text-sm flex gap-2 font-light">
                <li className="font-light">Dashboard</li>
                <li>/</li>
                <li className="text-black">{locationPage}</li>
            </ul>
            <span className="text-[18px] text-black">{locationPage}</span>
        </nav>
    );
}
