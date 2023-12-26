import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.css";
import Cat from '../assets/cat.jpg'
import Swal  from 'sweetalert2'
const Product = () => {
  const [ListProduct, SetListProduct] = useState([]);
  const [Listcategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
 

  const handleOrderClick = () =>{
    

    Swal.fire({
      title: "Hello!",
      text: "អត់ទាន់បានធ្វើAdd Cartទេ!",
      imageUrl: Cat,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "image"
    });
  };
  
  const getAllProduct = async (category = "") => {
    try {
      const url =
        category === ""
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${category}`;
      const res = await axios.get(url);
      SetListProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllCagtegory = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setListCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCagtegory();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getAllProduct(category);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterProduct = ListProduct.filter((item) => {
    const search = searchQuery.toLowerCase();
    const category = item.category.toLowerCase();
    return (
      String(item.id).toLowerCase().includes(search) ||
      item.title.toLowerCase().includes(search) ||
      category.includes(search)
    );
  });
  return (
    <main className="container">
      <div className="row">
        <div className="col-lg-12">
          <form className="search-product">
            <input
              className=" form-control mb-2 shadow-none"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
            />
          </form>
          <button
            className="btn btn-primary me-2 mb-md-2 mb-sm-2"
            onClick={() => handleCategoryClick("")}
          >
            All Categories
          </button>
          {Listcategory.map((category) => (
            <button
              key={category}
              className={`btn btn-primary me-2 mb-md-2 mb-sm-2  ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="row mt-3">
        {filterProduct.map((item) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body" key={item.id}>
                  <img className="product-img" src={item.image} alt="img" />
                  <p className="title">{item.title}</p>
                  <p className="price">Price: {item.price}$</p>
                  <button className="btn btn-dark" onClick={handleOrderClick}>Order Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Product;
