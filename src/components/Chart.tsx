import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinDailyPrice } from "../api/api";

import React, { Component } from "react";
import ApexChart from "react-apexcharts";


function Chart(){

interface IdailyPrice {
    time_open:number ;
    time_close:number ;
    open:string ;
    high:string ;
    low: string ;
    close: string ;
    volume: string ;
    market_cap:number ;
}
const coinId = useOutletContext<string>()

const { data } = useQuery<IdailyPrice[]>([coinId,'dailyPrice'], ()=>fetchCoinDailyPrice(coinId))

    const options = {
        chart: {
          id: "coin-price"
        },
      }

    const series = [
        {
          name: "series-1",
          data: data?.map((price) => Number(price.close)) as number[]
        }
      ]
    
  
    return (
      <div>
            <ApexChart
              options={options}
              series={series}
              type="area"
              width="500"
            />
          </div>
    );
  }


export default Chart;

