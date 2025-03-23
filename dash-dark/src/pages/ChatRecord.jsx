// import React, { useState, useEffect } from "react";
// import axios from "axios";
//
// // Function to format the financial plan text and make it bold
// const formatText = (inputText) => {
//     const boldTextPattern = /\*\*(.*?)\*\*/g;
//     const formattedText = inputText.replace(boldTextPattern, (match, p1) => {
//         return `<strong>${p1}</strong>`;
//     });
//     return formattedText.replace(/\*/g, ''); // Remove remaining stars
// };
//
// const ChatRecord = () => {
//     const [plans, setPlans] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//
//     // Fetch the financial plans
//     useEffect(() => {
//         const fetchPlans = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/financial/plans");
//                 setPlans(response.data);
//             } catch (err) {
//                 setError("Error fetching financial plans.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchPlans();
//     }, []);
//
//     if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//     if (error) return <p className="text-center text-red-500">{error}</p>;
//
//     return (
//         <div className="!p-[24px] !space-y-6 !mb-50">
//             <h2 className={'text-[24px] font-bold mb-3'}>Chat Records</h2>
//             {plans.map((plan) => (
//                 <div key={plan._id} className="bg-[#101936] hover:bg-[#1e293b] border-[0.5px] border-gray-600 !p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
//                     <h3 className="text-xl font-semibold text-white mb-3">Financial Plan for {plan.name}</h3>
//                     <p><strong className="text-gray-400">Name:</strong> {plan.name}</p>
//                     <p><strong className="text-gray-400">Income:</strong> ₹{plan.income}</p>
//                     <p><strong className="text-gray-400">Expenses:</strong> ₹{plan.expenses}</p>
//                     <p><strong className="text-gray-400">Goal Description:</strong> {plan.goalDescription}</p>
//                     <p><strong className="text-gray-400">Goal Amount:</strong> ₹{plan.goalAmount}</p>
//                     <p><strong className="text-gray-400">Timeframe:</strong> {plan.timeframe} years</p>
//                     <p><strong className="text-gray-400">Monthly Saving Amount:</strong> ₹{plan.monthlySavingAmount}</p>
//
//                     {/* Show 'See More' button */}
//                     <div className="mt-4">
//                         <SeeMoreContent content={plan.financialPlan} />
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// // Component to handle 'See More' functionality
// const SeeMoreContent = ({ content }) => {
//     const [isVisible, setIsVisible] = useState(false);
//
//     const toggleVisibility = () => {
//         setIsVisible(!isVisible);
//     };
//
//     return (
//         <div>
//             <button
//                 onClick={toggleVisibility}
//                 className="text-sm text-blue-600 hover:text-blue-800 mt-2"
//             >
//                 {isVisible ? "See Less" : "See More"}
//             </button>
//             {isVisible && (
//                 <div
//                     className="mt-4"
//                     dangerouslySetInnerHTML={{
//                         __html: formatText(content),
//                     }}
//                 />
//             )}
//         </div>
//     );
// };
//
// export default ChatRecord;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatRecord = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/financial/plans");
                setPlans(response.data);
            } catch (err) {
                setError("Error fetching study plans.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="!p-6 !space-y-8">
            <h2 className="!text-3xl !font-bold !text-white !mb-6">Study Plans</h2>

            {plans.map((plan) => (
                <div key={plan._id} className="bg-[#101936] rounded-xl !p-6 shadow-lg border !border-[#343b4f]">
                    {/* Plan Header */}
                    <div className="!mb-8 ">
                        <h3 className="text-2xl font-bold text-white !mb-2 ">
                            {plan.subject} ({plan.current_level} → {plan.target_level})
                        </h3>
                        <div className="flex gap-4 text-gray-400">
                            <p>📅 Start: {formatDate(plan.start_date)}</p>
                            <p>🎯 End: {formatDate(plan.end_date)}</p>
                            <p>⏳ {plan.hours_per_week} hrs/week</p>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="!mb-8 !p-4 bg-[#1c2540] rounded-lg border !border-[#343b4f]">
                        <h4 className="text-xl font-semibold text-white !mb-4">Progress</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 !gap-4">
                            {Object.entries(plan.progress).map(([topic, completed]) => (
                                <div key={topic} className="flex items-center">
                                    <span className={`!w-3 !h-3 rounded-full !mr-2 ${completed ? 'bg-green-500' : 'bg-gray-600'}`}></span>
                                    <span className="text-gray-300">{topic}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Plan */}
                    <div className="!space-y-6 ">
                        {plan.weeks.map((week) => (
                            <div key={week.week_number} className="bg-[#1c2540] !p-4 rounded-lg border !border-[#343b4f]">
                                <div className="!mb-4">
                                    <h3 className="text-xl font-semibold text-white">
                                        Week {week.week_number}: {week.focus_area}
                                    </h3>
                                    <p className="text-gray-400 !mt-1">
                                        🕒 Recommended: {week.recommended_hours} hours
                                    </p>
                                </div>

                                <div className="!mb-4">
                                    <h4 className="text-lg font-medium text-white !mb-2">Objectives</h4>
                                    <ul className="list-disc list-inside text-gray-300 !space-y-1">
                                        {week.objectives.map((obj, index) => (
                                            <li key={index}>{obj}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="!space-y-4">
                                    <h4 className="text-lg font-medium text-white">Topics</h4>
                                    {week.topics.map((topic) => (
                                        <div key={topic.name} className="bg-[#080f26] !p-4 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="text-white font-medium">{topic.name}</h5>
                                                    <p className="text-gray-400 text-sm !mt-1">
                                                        ⏳ {topic.hours} hours
                                                    </p>
                                                    <p className="text-gray-300 !mt-2">{topic.description}</p>
                                                </div>
                                                {topic.video && (
                                                    <a
                                                        href={topic.video.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-shrink-0 !ml-4"
                                                    >
                                                        <img
                                                            src={topic.video.thumbnail}
                                                            alt={topic.video.title}
                                                            className="!w-32 h-18 rounded-lg object-cover hover:opacity-80 transition-opacity"
                                                        />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatRecord;
