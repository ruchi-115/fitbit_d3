import { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import BarChart from "../components/Barchart";
import PieChart from '../components/PieChart';
import ScatterPlot from '@/components/ScatterChart';
import * as d3 from 'd3';

// Define a date parser (adjust the format to match your date format)
const parseDate = d3.timeParse('%m/%d/%Y');

export default function Home() {
  const [data, setData] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const [avgSteps, setAvgSteps] = useState(0);
  const [avgDistance, setAvgDistance] = useState(0);
  const [avgActiveMins, setAvgActiveMins] = useState(0);
  const [avgSedentaryMins, setAvgSedentaryMins] = useState(0);
  const [avgCalories, setAvgCalories] = useState(0);

  useEffect(() => {
    d3.csv('/fitbit_data.csv')
      .then(rawData => {
        const parsedData = rawData.map(d => ({
          ...d,
          Id: +d.Id,
          ActivityDate: parseDate(d.ActivityDate),
          TotalSteps: +d.TotalSteps,
          Calories: +d.Calories,
          TotalDistance: +d.TotalDistance,
          VeryActiveMinutes: +d.VeryActiveMinutes,
          FairlyActiveMinutes: +d.FairlyActiveMinutes,
          LightlyActiveMinutes: +d.LightlyActiveMinutes,
          SedentaryMinutes: +d.SedentaryMinutes,
        }));

        console.log(parsedData)

        setData(parsedData);

        // Calculate number of users
        const uniqueUsers = new Set(parsedData.map(d => d.Id)).size;
        setNumUsers(uniqueUsers);

        // Calculate averages
        const totalSteps = d3.mean(parsedData, d => d.TotalSteps);
        const totalDistance = d3.mean(parsedData, d => d.TotalDistance);
        const totalActiveMins = d3.mean(parsedData, d => d.VeryActiveMinutes + d.FairlyActiveMinutes + d.LightlyActiveMinutes);
        const totalSedentaryMins = d3.mean(parsedData, d => d.SedentaryMinutes);
        const totalCalories = d3.mean(parsedData, d => d.Calories);

        setAvgSteps(totalSteps);
        setAvgDistance(totalDistance);
        setAvgActiveMins(totalActiveMins);
        setAvgSedentaryMins(totalSedentaryMins);
        setAvgCalories(totalCalories);
      })
      .catch(error => {
        console.error('Error loading or parsing the CSV file:', error);
      });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fitbit</span>
          </a>
        </div>
      </nav>
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">FitBit Activity Explorer</h1>
        {data.length > 0 && (
          <>
            <div className="mb-6">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 space-x-2">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                  <img src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" alt="User Icon" className="w-12 h-12 mr-4" />
                  <div>
                    <p><strong>No. of Users:</strong> <strong className='font-bold text-2xl'>{numUsers}</strong></p>
                  </div>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                  <img src="https://w7.pngwing.com/pngs/339/367/png-transparent-infant-footprint-child-footprints-blue-text-baby-thumbnail.png" alt="Steps Icon" className="w-12 h-12 mr-4" />
                  <div>
                    <p><strong>Avg Steps:</strong> <strong className='font-bold text-2xl'>{Math.round(avgSteps)}</strong> </p>
                  </div>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                  <img src="https://e7.pngegg.com/pngimages/599/258/png-clipart-computer-icons-location-symbol-blue-symbol-miscellaneous-blue-thumbnail.png" alt="Distance Icon" className="w-12 h-12 mr-4" />
                  <div>
                    <p><strong>Avg Distance (km):</strong> <strong className='font-bold text-2xl'> {avgDistance.toFixed(2)}</strong></p>
                  </div>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                  <img src="https://toppng.com/uploads/preview/blue-clock-11549802542klg23e2exc.png" alt="Active Minutes Icon" className="w-12 h-12 mr-4" />
                  <div>
                    <p><strong>Avg Active Minutes:</strong> <strong className='font-bold text-2xl'>{Math.round(avgActiveMins)}</strong> </p>
                  </div>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                  <img src="https://icons.veryicon.com/png/o/application/yuefit-icon/sedentary-reminder.png" alt="Sedentary Minutes Icon" className="w-12 h-12 mr-4" />
                  <div>
                    <p><strong>Avg Sedentary Minutes:</strong> <strong className='font-bold text-2xl'> {Math.round(avgSedentaryMins)}</strong></p>
                  </div>
                </div>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 flex items-center">
                  <img src="https://cdn-icons-png.freepik.com/256/13786/13786486.png?semt=ais_hybrid" alt="Calories Icon" className="w-12 h-12 mr-4" />
                  <div>
                    <p><strong>Avg Calories:</strong> <strong className='font-bold text-2xl'>{Math.round(avgCalories)}</strong> </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Charts */}
            <div className="mb-6">
              <div className="grid grid-cols-1 space-x-2 md:grid-cols-2 gap-2">
                <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h2 className="text-2xl font-bold m-3">Activity Status</h2>
                  <PieChart data={data} />
                </div>
                <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h2 className="text-2xl font-bold m-3">Average Steps by Time of Day</h2>
                  <BarChart data={data} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-x-2">
              <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100">
                <h2 className="text-2xl font-bold m-3">Average Active Time by Weekdays</h2>
                <LineChart data={data} />
              </div>
              <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <h1 className="text-2xl font-bold m-3">Scatter Plot: Total Steps vs. Calories</h1>
                <ScatterPlot data={data} />
              </div>
            </div>



          </>
        )}
      </div>

    </div >
  );
}