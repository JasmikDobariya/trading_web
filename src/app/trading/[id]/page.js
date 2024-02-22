"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const ItemPage = ({ params }) => {
  const [itemData, setItemData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const id = params.id;
  const days = 1;

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!response?.ok) {
          throw new Error("Failed to fetch item data");
        }
        const itemData = await response.json();
        setItemData(itemData);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    if (id) {
      fetchItemData();
    }
  }, [id]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=INR&days=${days}`
        );
        if (!response?.ok) {
          throw new Error("Failed to fetch item data");
        }
        const chartData = await response.json();
        setChartData(chartData.prices);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    if (id) {
      fetchChartData();
    }
  }, [id]);

  console.log("chartData", chartData);

  return (
    <section className="bg-black ">
      <div className="flex justify-between p-8 sticky items-center container m-auto ">
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
      <div className="lg:grid lg:grid-cols-4 flex flex-col">
        <div className="border p-5 flex flex-col gap-5  text-white ">
          <div className="items-center flex justify-center">
            <Image
              src={itemData?.image.large}
              width={200}
              height={200}
              alt={itemData?.image.large}
            />
          </div>
          <h1 className="text-[50px] font-bold text-center capitalize">
            {itemData?.id}
          </h1>

          <div className="w-full">
            {itemData?.description?.en.split(". ")[0]}
          </div>
          <div className=" text-[25px] font-bold">
            Rank :{" "}
            <span className="font-medium"> {itemData?.market_cap_rank}</span>
          </div>
          <div className=" text-[25px] font-bold">
            Current Price :
            <span className="font-medium">
              {" "}
              {itemData?.market_data.current_price?.inr}₹
            </span>
          </div>
          <div className=" text-[25px] font-bold">
            Current Price :
            <span className="font-medium">
              {itemData?.market_data.market_cap?.inr.toString().slice(0, -7)}M
            </span>
          </div>
        </div>
        <div className="col-span-3 border flex justify-center items-center  ">
          <div className="w-full  ">
            <Line
              data={{
                labels: chartData?.map((el) => {
                  let date = new Date(el[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                      : `${date.getHours()} : ${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: chartData?.map((el) => el[1]),
                    label: `price ( Past ${days} Days)`,
                    borderColor: "#99B080",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemPage;
