import React from 'react'
import ProductCard from './ProductCard'
const ProductGrid = ({ products }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4  pt-16 min-h-screen bg-pink-50'>
            {
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductGrid
