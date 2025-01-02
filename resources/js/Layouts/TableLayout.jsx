const TableLayout = ({ tableName, children, button, alert }) => {
    return (
        <main className=" ">
            {alert}
            <div className=" relative mt-20">
                <header className="absolute  bg-gradient-to-r from-[#2A2A2A] to-[#474747] h-fit py-5 rounded-xl flex items-center justify-between px-7 inset-10 -top-8 mx-auto z-10">
                    <span className="font-bold text-white md:text-lg">
                        {tableName} Table
                    </span>

                    {button}
                </header>
                {children}
            </div>
        </main>
    );
};

export default TableLayout;
