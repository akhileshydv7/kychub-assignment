/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Empty, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./compareProduct.css";
import { removeProduct } from "../assets/redux/productSlice.js";
import { DeleteOutlined } from '@ant-design/icons';


const CompareProducts = () => {
  const productData = useSelector((store: any) => store.products.products);
  console.log(productData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{
      padding: 20, height: "100%",
      width: "100%",
    }} >

      {productData.length < 4 && productData.length >= 2 && (
        <div style={{display:"flex", alignItems:"center", justifyContent:"end"}}>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ marginBottom: "12px" }}
          >
            Add Product
          </Button>
        </div>
      )}
      <ProductModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",

          gap: "8px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <div className="product-item product-header" style={{ minHeight: "107px" }}></div>
          <Divider style={{ margin: 0 }} />
          <div className="product-item product-header" style={{ minHeight: "35px" }} > Product Name </div>
          <Divider style={{ margin: 0 }} />
          <div className="product-item product-header">Brand</div>
          <Divider style={{ margin: 0 }} />
          <div className="product-item product-header">Category</div>
          <Divider style={{ margin: 0 }} />
          <div className="product-item product-header">Price</div>
          <Divider style={{ margin: 0 }} />
          <div className="product-item product-header">Discount</div>
          <Divider style={{ margin: 0 }} />
          <div className="product-item product-header">Stock</div>
          <Divider style={{ margin: 0 }} />
        </div>
        <ProductList setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default CompareProducts;

const ProductList = ({ setIsModalOpen }: any) => {
  const productData = useSelector((store: any) => store.products.products);
  const dispatch = useDispatch();
  const handleRemoveProduct = (id: any) => {
    dispatch(removeProduct(id));
  };
  return (
    <>
      {productData.length >= 2 ? (
        productData?.map((product: any) => (
          <div
            key={product?.id}
            style={{
              flex: 1,
              border: "1px solid black",
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <div>
              <div className="product-item" style={{ minHeight: "80px" }}>
                <img height={75} src={product?.images?.[0]} alt="_" style={{ objectFit: "cover" }} />
              </div>
              <Divider style={{ margin: 0 }} />
              <div className="product-item" style={{ minHeight: "35px" }}>{product?.title}</div>
              <Divider style={{ margin: 0 }} />
              <div className="product-item">{product?.brand}</div>
              <Divider style={{ margin: 0 }} />
              <div className="product-item">{product?.category}</div>
              <Divider style={{ margin: 0 }} />
              <div className="product-item">${product?.price}</div>
              <Divider style={{ margin: 0 }} />
              <div className="product-item">{product?.discountPercentage}%</div>
              <Divider style={{ margin: 0 }} />
              <div className="product-item">{product?.availabilityStatus}</div>
              <Divider style={{ margin: 0 }} />
            </div>
            <div
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveProduct(product?.id)}
            >
              <DeleteOutlined />
            </div>
          </div>
        ))
      ) : (
        <Empty
          description="You have selected less than 2 products."
          style={{ flex: 3 }}
        >
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ marginBottom: "12px" }}
          >
            Add Product
          </Button>
        </Empty>
      )}
    </>
  );
};

import { Button } from "antd";
import { useState } from "react";
import ProductTable from "../components/ProductTable";
const ProductModal = ({ setIsModalOpen, isModalOpen }: any) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        footer={false}
        centered
        width="80vw"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ height: "80vh", overflowY: "auto" }}>
          <ProductTable setIsModalOpen={setIsModalOpen} isModal={true} />
        </div>
      </Modal>
    </>
  );
};
