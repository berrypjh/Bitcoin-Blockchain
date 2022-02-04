import React, { useEffect, useState } from "react";
import Axios from "axios";
import MainCard from "../../ui-component/MainCard";

const WalletDefault = () => {
  const [AAAA, setAAAA] = useState("");

  const onTxWalletChange = (e) => {
    setAAAA(e.target.value);
  };

  return (
    <>
      <MainCard>
        내 거래내역 예정
        + DB 안의 목록 예정
      </MainCard>
    </>
  );
};

export default WalletDefault;
