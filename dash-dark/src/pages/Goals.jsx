import React, { useEffect, useState } from "react";
import axios from "axios";
import MultiActionAreaCard from "../components/MultiActionAreaCard.jsx";

const Goals = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/financial/plans");
            console.log(response.data);
            setPlans(response.data); // Store the data in state
            setLoading(false);
        } catch (e) {
            console.error("❌ Error fetching plans:", e.message);
            setError(e.message);
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id));
    };

    useEffect(() => {
        fetchData(); // Call the function when the component mounts
    }, []); // Empty dependency array to run only once

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={'!p-[24px]'}>
            <h2 className={'text-[24px] font-bold mb-3'}>Financial Plans</h2>
            <ul className={'flex flex-col sm:grid sm:grid-cols-3 gap-6'}>
                {plans.map((plan) => (
                    <MultiActionAreaCard id={plan._id} title={plan.subject} level={plan.target_level} time={plan.hours_per_week} end={plan.end_date} onDelete={handleDelete}/>
                ))}
            </ul>
        </div>
    );
};

export default Goals;
