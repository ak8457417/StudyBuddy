import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import MetricCard from "../components/MetricCard.jsx";
import RevenueChart from "../components/RevenueChart.jsx";
import ProfitChart from "../components/ProfitChart.jsx";
import SessionsChart from "../components/SessionsChart.jsx";
import ReportsOverview from "../components/ReportsOverview.jsx";
import RecentOrders from "../components/RecentOrders.jsx";
import axios from "axios";

const Dashboard = () => {

    const [totalLearnings, setTotalLearnings] = useState(0);
    const [plans, setPlans] = useState([]);
    const [quizzes, setQuizzes] = useState([])
    const [scores, setScores] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/financial/plans");
            console.log(response.data);
            setPlans(response.data); // This triggers a re-render
        } catch (e) {
            console.error("Error fetching financial plans:", e.message);
        }
    };

    const [countTopics, setCountTopics] = useState(0);
    const [doneTopics, setDoneTopics] = useState(0);

    // Function to calculate the topics and completed topics
    const calculateTopics = (plans) => {
        let totalTopics = 0;
        let totalDoneTopics = 0;

        plans.forEach((plan) => {
            // Count all the topics in the 'topics' arrays across all weeks
            plan.weeks.forEach((week) => {
                totalTopics += week.topics.length; // Add the number of topics in each week
            });

            // Count the number of completed topics from 'progress'
            totalDoneTopics += Object.keys(plan.progress).filter(topic => plan.progress[topic] === true).length;
        });

        return { totalTopics, totalDoneTopics };
    };

    useEffect(() => {
        const { totalTopics, totalDoneTopics } = calculateTopics(plans);
        setCountTopics(totalTopics);
        setDoneTopics(totalDoneTopics);
    }, [plans]); // Recalculate when the plans change

    // Recalculate totalAmount when plans change
    useEffect(() => {
        const amt = plans.length;
        setTotalLearnings(amt);
    }, [plans]); // This runs every time `plans` updates

    useEffect(() => {
        fetchData();
    }, []); // Fetch data once when the component mounts

    return (
        <div>
            <div className="app">
                <main className="main-content">
                    <DashboardHeader />

                    <div className="metrics-grid">
                        <MetricCard icon="eye" title="Your Learnings" value={totalLearnings+" Courses"} change="+6.4%" isPositive={true} />
                        <MetricCard icon="users" title="Total Topics" value={countTopics} change="-12.5%" isPositive={false} />
                        <MetricCard icon="user-plus" title="Topics Completed" value={doneTopics} change="+21.3%" isPositive={true} />
                        <MetricCard icon="star" title="Pending Topics" value={countTopics-doneTopics} change="+13.9%" isPositive={true} />
                    </div>

                    <div className="charts-grid">
                        <div className="revenue-chart-container">
                            <RevenueChart />
                        </div>
                        <div className="side-charts">
                            <ProfitChart />
                            <SessionsChart />
                        </div>
                    </div>

                    <div className="reports-section">
                        <ReportsOverview />
                    </div>

                    <div className="orders-section">
                        <RecentOrders />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
