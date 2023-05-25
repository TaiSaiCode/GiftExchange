import React from "react";
import { useEffect } from "react";
import NetworkErrorPage from "./NetworkError";
import { useNavigate } from "react-router-dom";
export default function NetworkErrorRedirect({
  networkCheck,
  setNetworkCheck,
}) {
  const Navigate = useNavigate();
  useEffect(() => {
    setNetworkCheck(!networkCheck);
    Navigate("/");
  }, []);
  return <NetworkErrorPage />;
}
