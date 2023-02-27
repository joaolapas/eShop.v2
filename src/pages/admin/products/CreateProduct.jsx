import React, { useState } from "react";
import useProducts from "../../../zustand/store";
import AdminSass from "../Admin.module.sass";
import { toast, ToastContainer } from "react-toastify";

const CreateProduct = () => {
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const { createProducts, fetchProducts } = useProducts();

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = () => {
    createProducts({
      name,
      brand,
      description,
      price,
      image: productImg,
    });
    toast.success("Product created successfully");
    setTimeout(() => fetchProducts(), 3000);
    //toast("createProduct chamada");
  };

  return (
    <div className={AdminSass.createProduct_container}>
      <ToastContainer />
      <h3>Add a new product</h3>
      <div className={AdminSass.createProduct_addProductContainer}>
        <form className={AdminSass.createProduct_form}>
          <input
            className={AdminSass.createProductInput}
            type="text"
            placeholder="Product name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={AdminSass.createProductInput}
            type="number"
            placeholder="Product price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            className={AdminSass.createProductInput}
            type="text"
            placeholder="Product brand"
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <input
            className={AdminSass.createProductInput}
            type="text"
            placeholder="Product description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <p>Upload an image</p>
          <input
            className={AdminSass.createProductFileInput}
            name="productImage"
            type="file"
            accept="image/"
            onChange={handleImgUpload}
          />
        </form>
        <div className={AdminSass.createProduct_preview}>
          <h4>preview</h4>
          <div className={AdminSass.createProduct_preview_content}>
            <div className={AdminSass.createProduct_preview_image}>
              {productImg && <img src={productImg} alt="product preview" />}
            </div>
            <div className={AdminSass.createProduct_preview_text}>
              <h2>{name ? name : "Name"}</h2>
              <h3>€{price ? price : "Price"}</h3>
              <h4>{brand ? brand : " Brand"}</h4>
            </div>
          </div>
          <div className={AdminSass.createProduct_preview_description}>
            {description ? description : "Description"}
          </div>
        </div>
      </div>
      <button className={AdminSass.createProduct_button} onClick={handleSubmit}>
        Add product
      </button>
    </div>
  );
};

export default CreateProduct;
