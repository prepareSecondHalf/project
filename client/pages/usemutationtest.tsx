import Footer from "components/Footer";
import Header from "components/Header";
import { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "react-query";
import { Apis } from "utils/api";

const ReactQueryTest: NextPage = () => {
  const [data, setData] = useState("");

  // post, put, delete
  const { error, status, isLoading } = useMutation(
    () => Apis.post("/post", "Yun"),
    {
      onSuccess: (res) => {
        console.log("res:::", res);
      },
    }
  );

  console.log("error:::", error);
  console.log("isLoading:::", isLoading);
  console.log("status:::", status);

  return (
    <div className="w-full min-w-[1200px]">
      <Header />
      <div className="w-full">{data}</div>
      <Footer />
    </div>
  );
};

export default ReactQueryTest;
