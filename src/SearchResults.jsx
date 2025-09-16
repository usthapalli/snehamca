import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { launchBalloonBlast, floatBalloons } from "./animation";
import "react-toastify/dist/ReactToastify.css";

const SearchResults = () => {
  const { term } = useParams();
  const query = term?.toLowerCase() || "";
  const dispatch = useDispatch();

  // ✅ Use selectors safely
  const milkProducts = useSelector((state) => state.products?.Milk) || [];
  const vegProducts = useSelector((state) => state.products?.Veg) || [];
  const nonVegProducts = useSelector((state) => state.products?.NonVeg) || [];
  const chocolateProducts = useSelector((state) => state.products?.Chacolate) || [];

  // ✅ Combine & filter with useMemo (prevents recalculating every render)
  const filteredProducts = useMemo(() => {
    const allProducts = [
      ...milkProducts,
      ...vegProducts,
      ...nonVegProducts,
      ...chocolateProducts,
    ];
    return allProducts.filter((product) => {
      const name = product?.name?.toLowerCase() || "";
      const brand = product?.brand?.toLowerCase() || "";
      return name.includes(query) || brand.includes(query);
    });
  }, [milkProducts, vegProducts, nonVegProducts, chocolateProducts, query]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "top-left",
      autoClose: 2000,
    });
    floatBalloons();
    Swal.fire({
      icon: "success",
      title: "Product Added!",
      text: `${product.name} has been added to your cart.`,
      confirmButtonText: "Great!",
      timer: 2500,
    }).then(() => launchBalloonBlast());
  };

  return (
    <div className="search-results">
      <h2>Search Results for "{term}"</h2>
      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-sm-6 col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                {/* Product image */}
                <img
                  src={product.imageurl}
                  alt={`Image of ${product.name}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                {/* Card body with avatar + details */}
                <div className="card-body text-center">
                  {/* 👤 Avatar above the product */}
                  <img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&clotheType=BlazerSweater&eyeType=Happy&mouthType=Smile"
                    alt="avatar"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginBottom: "10px",
                    }}
                  />

                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ₹{product.price}</p>

                  {/* Message */}
                  <p className="text-success fw-bold">
                    🎉 This product is yours!
                  </p>

                  <button
                    className="btn btn-info"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found matching your search.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default SearchResults;
