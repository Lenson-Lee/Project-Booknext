/** 서비스의 전체적인 구조 담당 */

import Head from "next/head";
import Navbar from "./Navbar/navbar";

interface Props {
  children: React.ReactNode;
}
const ServiceLayout = function ({ children }: Props) {
  return (
    <>
      <Head>
        <title>Book Project</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default ServiceLayout;
