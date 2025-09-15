import React, { useEffect, useRef, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [logoutConfirmation, setLogoutConfirmation] = useState(false);
    const handleNavigate = () => {
        if (location.pathname !== "/products") {
            navigate("/products");
        }
    }
    const handleLogout = () => {
        setLogoutConfirmation(!logoutConfirmation);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])
    return (
        <div className='flex justify-evenly fixed top-0 left-0 w-full z-50 bg-blue-500 py-4 text-white font-semibold items-center '>
            <h3 className='font-bold hidden sm:block cursor-pointer' onClick={handleNavigate} >Ecommerce</h3>
            <div className='flex relative h-10 items-center'>
                <GoSearch className='cursor-pointer text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
                <input type="text" placeholder='Search for Products' className='border border-gray-400 w-52 text-black font-normal bg-gray-100 sm:w-80 md:w-116  rounded-3xl h-full  pl-12 outline-none' />
            </div>
            <div className=' hidden sm:flex sm:gap-2 sm:items-center cursor-pointer  '>
                <FaShoppingCart />
                <p>Cart</p>
            </div>
            <div className='sm:flex items-center gap-2 cursor-pointer hidden'>
                <FaRegHeart />
                <p>Wishlist</p>
            </div>
            <div className='relative' ref={menuRef}>
                <div className='flex items-center gap-2 cursor-pointer hover:text-gray-200 hover:bg-blue-60' onClick={() => setOpen(!open)}>
                    <p className='hidden sm:block'>Profile</p>
                    <CgProfile size="18" />
                </div>
                {/* Dropdown menu*/}
                {open && (
                    <div className='flex flex-col absolute right-0 mt-2 w-48 bg-white text-gray-800  shadow-lg rounded-lg py-2'>
                        <button className='hover:cursor-pointer hover:bg-gray-100 py-1'>Your Profile</button>
                        <button className='hover:cursor-pointer hover:bg-gray-100 py-1' onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            {logoutConfirmation && (
                <div className='fixed inset-0 flex bg-black/40  items-center justify-center z-50'>
                    <div className='bg-white  mx-2 rounded-lg p-6 shadow-lg w-80 text-center'>
                        <p className='mb-5 text-black'>Do you want to Logout?</p>
                        <div className='flex justify-evenly'>
                            <button className='border px-3 py-1 hover:cursor-pointer rounded-lg bg-red-500 hover:bg-red-600' onClick={() => navigate('/Login')}>
                                Logout
                            </button>
                            <button className='border px-3 py-2 hover:cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600' onClick={() => setLogoutConfirmation(!logoutConfirmation)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Navbar
