import React from 'react'
import logo from '../assets/react.svg';
import { useNavigate } from 'react-router-dom';
// import { FaRegHeart } from "react-icons/fa6";
const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleChange = () => {
        navigate(`/product/${product._id}`);
    }
    return (
        <div className='bg-white w-full place-items-center aspect-[3/4] p-4 rounded-xl shadow-md cursor-pointer' onClick={handleChange}>
            {/* <FaRegHeart className='top-0 ' /> */}
            <img src={product.images[0]?.url} alt="/-original-imahbgpzbumfzkbh.webp" className='object-cover w-40 sm:52 md:60' />
            <h2>{product.name}</h2>
            <p className='font-bold text-green-500'> ₹{product.price}</p>
            <p className='text-gray-600 text-smmt-2 text-left line-clamp-2'> <span className='font-bold'>description:</span>{product.description}</p>
        </div>

    )
}

export default ProductCard;
