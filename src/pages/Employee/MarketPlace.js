import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import MarketPlaceItem from "../../components/MarketPlaceItem";
import axios from "axios";
import FallbackText from "../../components/FallbackText";
import Loading from "../../components/Loading";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const MarketPlace = () => {
  const { tok } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const getProducts = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/products`,
        { headers: { Authorization: tok } }
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <PrimaryLayout>
      <div className="card bg-white ">
        <div className="card-body p-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-start mb-3">MarketPlace</h2>
            </div>
          </div>

          {loadingData && (
            <div className="w-40 h-40 mx-auto">
              <Loading />
            </div>
          )}
          {!loadingData &&
            (products?.length ? (
              <div className="flex flex-wrap gap-6 mt-4 justify-center lg:justify-start max-md:pb-20">
                {products?.map((product, ind) => (
                  <MarketPlaceItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <FallbackText
                IconRef={IoBagHandleOutline}
                message={"No Products Available in MarketPlace."}
              />
            ))}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default MarketPlace;
