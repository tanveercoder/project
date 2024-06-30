import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch('/list.json') // Fetching data from the public folder
      .then(response => response.json())
      .then(data => {
        const product = data.find(p => p.id === parseInt(id));
        setItem(product);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!item) {
    return <div>Under Construction...</div>;
  }

  return (
    <div className="p-4">
      <button 
        className="mb-4 p-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={handleBackClick}
      >
        Back
      </button>
      <div className="card w-full bg-base-100 shadow-xl dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img className="w-full h-auto object-cover" src={item.image} alt={item.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
          <div className="badge badge-secondary bg-brown-400">{item.category}</div>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
          </div>
          <div className="mt-4 cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-brown-500 hover:text-white duration-200">
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
