import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { IoMdStarOutline } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState();
  // Generate random rating between 3.5 and 4.5
  async function handleClick() {

    if (!user) {
      alert("Please login first!");
      navigate("/Login");
      return;
    }
    try {
      const res = await api.post(
        '/api/user/add-to-cart',
        {
          productId: productId,
          userId: user.id,
        }
      );
      alert(res.data.message || "Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }


  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/id/${productId}`);
        const data = res.data.data[0];
        setProduct(data);
        setSelectedImage(data.images[0]?.url || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, []);
  useEffect(() => {
    setRating((Math.random() * (4.5 - 3.5)) + 3.5);
  }, []);

  if (!product) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="mt-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 ">

          {/* Left Side Wrapper */}
          <div className="md:top-20 ">
            <div className="flex flex-col gap-8">
              {/* Images */}
              <div className="flex gap-4 bg-white shadow-md rounded-2xl p-4 h-100">
                {/* Thumbnails */}
                <div className="flex flex-col gap-3 ">
                  {product.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`thumbnail-${idx}`}
                      className={`rounded-xl w-20 h-20 object-cover p-1 cursor-pointer transition
                  ${selectedImage === img.url ? "border-2 border-green-500 shadow-md" : "border border-gray-300"}`}
                      onClick={() => setSelectedImage(img.url)}
                    />
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 flex justify-center items-start">
                  <img
                    src={selectedImage}
                    alt="product"
                    className="max-h-[400px] object-contain"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-10">
                <button onClick={handleClick} className="uppercase px-5 py-2 bg-amber-400 rounded-xl w-40 h-12 font-semibold 
            hover:bg-amber-300 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                  Add to Cart
                </button>
                <button className="uppercase px-5 py-2 bg-amber-500 rounded-xl w-40 h-12 font-semibold 
            hover:bg-amber-600 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable only if content overflows after left side ends */}
          <div className="p-6 flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-green-600 font-semibold text-2xl">₹{product.price}</p>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <span className="font-medium">Ratings:</span>
              <span className="flex items-center bg-green-600 px-2 py-1 rounded text-white text-sm">
                {rating.toFixed(1)} <IoMdStarOutline className="ml-1" />
              </span>
            </div>

            {/* Description */}
            <div>
              <span className="font-semibold text-xl block mb-1">Description:</span>
              <div className="space-y-1">
                {product.description.split("•").map((line, idx) =>
                  line.trim() && (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {idx === 0 ? line.trim() : `• ${line.trim()}`}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default ProductDetail;
