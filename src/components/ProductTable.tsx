/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Pagination, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../assets/redux/productSlice.js";


const ProductTable = ({
  isModal = false,
  setIsModalOpen,
}: {
  isModal?: boolean;
  setIsModalOpen?: any;
}) => {
  const productData = useSelector((store:any) => store.products.products);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsPerPage = 10;
  
  const [messageApi, contextHolder] = message.useMessage();
  message.config({
    maxCount:2
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
          (currentPage - 1) * itemsPerPage
        }`
      );
      const data = await response.json();

      setProducts(data.products);
      setTotalProducts(data.total);
      setLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
  ];

  const rowSelection = {
    selectedRowKeys: productData?.map((e:any) => e?.id),
    onChange: (_newSelectedRowKeys:any, selectedRows:any) => {
      if(selectedRows?.length === 1){
        message.warning("Please select 1 more item to compare.");
      }
      if(selectedRows?.length > 4){
        message.warning("You can only select up to 4 products for comparison.");
      }
      if (selectedRows.length <= 4) {
        dispatch(addProduct(selectedRows));
      }
    },
  };

  const hasSelected = productData.length > 1 && productData.length <= 4;

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
  };

  const handleCompare = () => {
    if (isModal) {
      setIsModalOpen(false);
    } else {
      navigate("/compare");
    }
  };

  return (
    <>
    <Flex gap="20px" vertical>
      <Flex align="center" justify="space-between" gap="15px">
        {hasSelected ? `${productData.length} products selected` : <div/>}
        <Button
          onClick={handleCompare}
          type="primary"
          disabled={!hasSelected}
          loading={loading}
        >
          Compare
        </Button>
      </Flex>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={false}
        rowKey="id"
        size="small"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          current={currentPage}
          total={totalProducts}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </Flex>
    {contextHolder}
    </>
  );
};

export default ProductTable;
