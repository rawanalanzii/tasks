import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { LiaSearchSolid } from "react-icons/lia";
import { IoCloseSharp } from "react-icons/io5";

const SearchButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [finalRounded, setFinalRounded] = useState(false);
    const [finalRoundedd, setFinalRoundedd] = useState(false);

    useEffect(() => {
        let timer: any
        if (isOpen) {
            timer = setTimeout(() => {
                setFinalRounded(true);
            }, 500);
            timer = setTimeout(() => {
                setFinalRoundedd(true);
            }, 500);
        }
        else {
            timer = setTimeout(() => {
                setFinalRounded(false);
            }, 300);
            timer = setTimeout(() => {
                setFinalRoundedd(false);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    const formik = useFormik({
        initialValues: { search: '' },
        onSubmit: (values) => {
            console.log('Form Submitted', values);
        },
    });

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form onSubmit={formik.handleSubmit} className="w-full flex justify-center items-center">
                <div
                    onClick={() => setIsOpen(true)}
                    className={`z-10 transition-all duration-700 ease-in-out flex items-center 
                        ${isOpen ? 'w-[700px] justify-start' : 'w-24 cursor-pointer justify-end'} 
                        ${finalRounded ? 'rounded-[50px] w-[600px]' : ''} h-24 bg-black rounded-[30px] text-center`}
                >
                    <input
                        id="search"
                        name="search"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.search}
                        className={`h-24 bg-black/0 w-full rounded-[30px] focus:outline-none p-6 text-white
                        transition-all duration-500 ease-out ${isOpen ? 'animate-placeholder' : 'hidden'}
                        ${finalRounded ? 'opacity-100 mt-0 rounded-[50px]' : ' mt-32 opacity-0'}
                        `}
                        placeholder="Search"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                formik.handleSubmit();
                            }
                        }}
                    />
                    <div
                        className={`bg-white h-24 w-24 transition-all duration-700 ease-out 
                        ${isOpen ? (finalRounded ? 'rounded-[50px] h-20 m-3' : 'rounded-r-[30px]') : 'rounded-[30px] h-24'}
                        flex justify-center items-center text-orange-600`}
                        onClick={() => formik.handleSubmit()}>
                        <LiaSearchSolid size={50} className={`transition-all duration-500 ease-in-out 
                        ${finalRounded ? '-rotate-90' : 'rotate-0'}`} />
                    </div>
                </div>
                <div
                    onClick={() => {
                        formik.resetForm();
                        setIsOpen(false);
                        setTimeout(() => setFinalRounded(false), 100);
                        setTimeout(() => setFinalRoundedd(false), 700);
                    }}
                    className={`text-red-500 z-0 transition-all text-5xl duration-500 ease-in-out cursor-pointer
                    ${finalRounded ? 'mt-0 ml-6 rotate-0' : 'rotate-90 mt-4'}
                    ${finalRoundedd ? 'ml-5' : '-ml-10 rotate-45'}`}
                >
                    <IoCloseSharp slope={90} />
                </div>
            </form>
        </div>
    );
};

export default SearchButton;
