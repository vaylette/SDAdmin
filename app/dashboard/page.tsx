"use client"
import { useState, useEffect } from 'react';
import OverviewCard from "../_components/overview/overviewCard"
import { useRetrieveData } from '../constants/hooks';
import { apiUrls } from '../constants/apiUrls';

export default function Dashboard() {
  const retrieveData = useRetrieveData()
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [overViewResults] = await Promise.all([
        retrieveData(`${apiUrls.getOverview}`),
      ]);
      setData(overViewResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className='grid grid-cols-5 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-4'>
      {data.map((item: any, index) => (
          <OverviewCard key={index} title={item.title} count={item.quantity} growth={item.growth} />
        ))}
        {data.length === 0 && <div>No data available</div>}
      </div>
    </div>
  );
}
