import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { addToCart } from './store';
import './nonveg.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2';
import { launchBalloonBlast, floatBalloons } from './animation';

function NonVeg() {
  const nonVegProducts = useSelector((state) => state.products.NonVeg);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(nonVegProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonVegProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    toast.success(`${product.name} added to cart successfully!`, {
      position: 'top-left',
      autoClose: 2000,
    });

    floatBalloons();

    Swal.fire({
      icon: 'success',
      title: 'Product Added!',
      text: `${product.name} has been added to your cart.`,
      showConfirmButton: true,
      confirmButtonText: 'Great!',
      timer: 2500,
    }).then(() => {
      launchBalloonBlast();
    });
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">
        🍗 Premium Non-Veg Delights: Chicken, Mutton, Seafood & More
      </h2>

      <Carousel interval={2500} pause="hover" className="mb-5">
        {nonVegProducts.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block mx-auto img-fluid"
              src={product.imageurl}
              alt={`Image of ${product.name}`}
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
            <div className="text-center mt-2">
              <h5>{product.name}</h5>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="row">
        {currentItems.map((product) => (
          <div className="col-sm-6 col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.imageurl}
                alt={`Image of ${product.name}`}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination d-flex justify-content-center mb-5">
        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${
              currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary mx-1"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default NonVeg;