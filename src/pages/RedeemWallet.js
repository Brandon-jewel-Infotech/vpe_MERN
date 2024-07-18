import React from "react";
import PrimaryLayout from "../Layout/PrimaryLayout";
import FallbackText from "../components/FallbackText";
import { MdOutlineUpcoming } from "react-icons/md";

const RedeemWallet = () => {
  return (
    <PrimaryLayout>
      <div className="flex flex-col mb-6 text-start">
        <h2 className="text-xl font-bold">Redeem Wallet</h2>
        <h4 className="text-md text-start">Wallet &gt; Redeem Wallet</h4>
      </div>
      <div className="card bg-white max-w-full">
        <div className="card-body p-0 2xl:mx-auto">
          <FallbackText IconRef={MdOutlineUpcoming} message={"Coming Soon."} />
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default RedeemWallet;
