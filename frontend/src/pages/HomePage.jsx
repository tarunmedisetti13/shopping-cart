import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
const HomePage = ({ products }) => {

    return (
        <div className='m-5 p-3 bg-amber-50'>
            <Navbar />
            <ProductGrid products={products} />
        </div>
    )
}

export default HomePage
