"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingSection from "@/components/HomeLandingSection/LandingSection";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TradingPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://trading-web-server-backend.vercel.app/user/api`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-black">
      <div className="container mx-auto">
        <div className="flex justify-between p-8 sticky top-0 bg-black z-10">
          <div>
            <Image src="/homePageImages/logo.svg" width={200} height={200} alt="logo" />
          </div>
          <select
            name=""
            id=""
            className="py-2 px-10 bg-green-500 rounded-lg flex justify-between"
          >
            <option value="INR" className="bg-white">
              INR
            </option>
            <option value="US" className="bg-white">
              US
            </option>
          </select>
        </div>
        <div className="text-white">
          <LandingSection />
        </div>
        <div className="py-10">
          <Slider
            dots={false}
            arrows={false}
            infinite={true}
            slidesToShow={5}
            slidesToScroll={2}
            autoplay={true}
            speed={2500}
            autoplaySpeed={2500}
            cssEase="linear"
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {data &&
              data.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center items-center  text-black p-5"
                >
                  <div className=" rounded-full bg-green-500 p-2">
                    <div className="flex justify-center items-center ">
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.name}
                        className="rounded-full"
                      />
                    </div>
                    <div className=" flex flex-col gap-1 justify-center items-center pt-5 text-lg font-bold ">
                      <h1>
                        {item.symbol}{" "}
                        {item.market_cap_change_percentage_24h >= 0 && "+"}
                        <span
                          style={{
                            color:
                              item.market_cap_change_percentage_24h >= 0
                                ? "green"
                                : "red",
                          }}
                        >
                          {item.market_cap_change_percentage_24h.toFixed(2)}%
                        </span>
                      </h1>
                      <h1 className="pb-3">{item.current_price} ₹ </h1>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        <div className="py-10 overflow-x-auto">
          {data && (
            <table className="table-auto w-full cursor-pointer ">
              <thead className="border bg-yellow-500  ">
                <tr className="lg:p-8 p-4">
                  <th className="px-4 py-4">
                    <div className="text-start  lg:pl-14">Coin</div>
                  </th>
                  <th className="px-4 py-4">Symbol</th>
                  <th className="px-4 py-4">Price (₹)</th>
                  <th className="px-4 py-4">Rank</th>
                  <th className="px-4 py-4">Market Cap Change (24h)</th>
                </tr>
              </thead>
              <tbody className=" text-white">
                {currentItems.map((el) => (
                  <tr
                    key={el.id}
                    className="text-center border table-row border-gray-600 rounded-full "
                  >
                    <td className="px-8 py-2 text-[18px] font-semibold flex   gap-10 items-center">
                      <div className="flex justify-start items-center gap-5">
                        <Image
                          src={el.image}
                          width={30}
                          height={30}
                          alt={el.name}
                        />
                      </div>
                      <Link href={`/trading/${el.id}`}>
                        <div className="text-center">{el.name}</div>
                      </Link>
                    </td>
                    <td>{el.symbol}</td>
                    <td className="px-4 py-2 font-semibold">
                      {el.current_price} ₹
                    </td>
                    <td className="px-4 py-2">{el.market_cap_rank}</td>
                    <td className="px-4 py-2 text-[18px] font-semibold">
                      {el.market_cap_change_percentage_24h >= 0 && "+"}
                      <span
                        style={{
                          color:
                            el.market_cap_change_percentage_24h >= 0
                              ? "green"
                              : "red",
                        }}
                      >
                        {el.market_cap_change_percentage_24h.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center mt-4 ">
            {data && (
              <div>
                <button
                  className="bg-green-500 hover:bg-red-600 text-white px-4 py-2 mr-2"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="bg-red-500 hover:bg-green-600 text-white text-center px-4 py-2"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastItem >= data.length}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        {error && <p className="text-white">Error: {error}</p>}
      </div>
    </section>
  );
};

export default TradingPage;
