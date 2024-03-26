"use client"
import { useState, useEffect, useLayoutEffect } from 'react';
import OverviewCard from "../_components/overview/overviewCard"
import { useRetrieveData } from '../constants/hooks';
import { apiUrls } from '../constants/apiUrls';
import { redirect, useRouter } from 'next/navigation';
import { useAccessControl, useAccessControlRedirect } from '../constants/control';

// export default function Dashboard() {
//   const retrieveData = useRetrieveData()
//   const [data, setData] = useState([]);
//   useAccessControlRedirect()

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [overViewResults] = await Promise.all([
//         retrieveData(`${apiUrls.getOverview}`),
//       ]);
//       setData(overViewResults);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <div className='grid grid-cols-5 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-4'>
//         {data.map((item: any, index) => (
//           <OverviewCard key={index} title={item.title} count={item.quantity} growth={item.growth} />
//         ))}
//         {data.length === 0 && <div className='text-center'>No data available</div>}
//       </div>
//     </div>
//   );
// }

export default function Dashboard() {
  const retrieveData = useRetrieveData();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useAccessControlRedirect();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [overViewResults] = await Promise.all([retrieveData(apiUrls.getOverview)]);
      setData(overViewResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-orange-500 mr-2">Fetching data...</p>
          <svg height="40" width="40">
            <circle className="dot text-orange-500" cx="10" cy="20" r="3" />
            <circle className="dot text-orange-500" cx="20" cy="20" r="3" />
            <circle className="dot text-orange-500" cx="30" cy="20" r="3" />
          </svg>
        </div>

      ) : (
        <div className="grid grid-cols-5 2xl:flex 2xl:flex-row 2xl:flex-wrap gap-4">
          {data.map((item: any, index) => (
            <OverviewCard key={index} title={item.title} count={item.quantity} growth={item.growth} />
          ))}
          {data.length === 0 && <div className="text-center">No data available</div>}
        </div>
      )}
    </div>
  );
}