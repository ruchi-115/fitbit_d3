# Fitbit_D3 - https://fitbit-d3.vercel.app/

A web application built with Next.js and D3.js for visualizing Fitbit data. This project allows users to explore Fitbit data through various types of charts and visualizations.

## Tech Stack

- **Next.js:** React framework for server-side rendering and static site generation.
- **D3.js:** JavaScript library for creating dynamic, interactive data visualizations.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Vercel:** Platform for deploying and hosting the application.

## Features
- **Interactive Charts:** Display data using various chart types including:
  - **Line Charts:** - Average Active Time by Weekdays
  - **Bar Charts:**  - Average Steps by Time of Day
  - **Pie Charts:**  - Activity Status
  - **Scatterplots:** - Total Steps vs. Calories

## Dataset Summary

The dataset used in this project includes Fitbit activity data with the following parameters:

- **Id:** Unique identifier for the user
- **ActivityDate:** Date of the recorded activity
- **TotalSteps:** Total number of steps taken
- **TotalDistance:** Total distance covered (in miles)
- **TrackerDistance:** Distance covered as recorded by the tracker (in miles)
- **LoggedActivitiesDistance:** Distance covered through logged activities (in miles)
- **VeryActiveDistance:** Distance covered during very active periods (in miles)
- **ModeratelyActiveDistance:** Distance covered during moderately active periods (in miles)
- **LightActiveDistance:** Distance covered during light active periods (in miles)
- **SedentaryActiveDistance:** Distance covered during sedentary periods (in miles)
- **VeryActiveMinutes:** Number of minutes spent in very active periods
- **FairlyActiveMinutes:** Number of minutes spent in fairly active periods
- **LightlyActiveMinutes:** Number of minutes spent in lightly active periods
- **SedentaryMinutes:** Number of minutes spent in sedentary periods
- **Calories:** Total calories burned

### Sample Data

Here is a sample of the data:

| Id        | ActivityDate | TotalSteps | TotalDistance | TrackerDistance | LoggedActivitiesDistance | VeryActiveDistance | ModeratelyActiveDistance | LightActiveDistance | SedentaryActiveDistance | VeryActiveMinutes | FairlyActiveMinutes | LightlyActiveMinutes | SedentaryMinutes | Calories |
|-----------|--------------|------------|---------------|-----------------|--------------------------|---------------------|--------------------------|---------------------|-------------------------|-------------------|---------------------|-----------------------|-------------------|----------|
| 1503960366 | 3/25/2016     | 11004      | 7.11          | 7.11            | 0                        | 2.57                | 0.46                     | 4.07                | 0                       | 33                | 12                  | 205                   | 804               | 1819     |
| 1503960366 | 3/26/2016     | 17609      | 11.55         | 11.55           | 0                        | 6.92                | 0.73                     | 3.91                | 0                       | 89                | 17                  | 274                   | 588               | 2154     |
| 1503960366 | 3/27/2016     | 12736      | 8.53          | 8.53            | 0                        | 4.66                | 0.16                     | 3.71                | 0                       | 56                | 5                   | 268                   | 605               | 1944     |
| 1503960366 | 3/28/2016     | 13231      | 8.93          | 8.93            | 0                        | 3.19                | 0.79                     | 4.95                | 0                       | 39                | 20                  | 224                   | 1080              | 1932     |
| 1503960366 | 3/29/2016     | 12041      | 7.85          | 7.85            | 0                        | 2.16                | 1.09                     | 4.61                | 0                       | 28                | 28                  | 243                   | 763               | 1886     |

You can download the dataset from [Kaggle](https://www.kaggle.com/datasets/singhakash/fitbit-dataset).


