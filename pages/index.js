import router from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function LevelUp() {
  const accessToken = useSelector((state) => state.auth.access_token);
  useEffect(() => {
    accessToken && router.push("/explore");
  }, [accessToken]);
  return (
    <div style={{ backgroundColor: "#191c21" }} className="h-screen"></div>
  );
}

export default LevelUp;
