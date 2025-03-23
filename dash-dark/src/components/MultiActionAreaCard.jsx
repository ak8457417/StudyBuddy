import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import axios from "axios";

export default function MultiActionAreaCard({ title, level, time, end, id, onDelete }) {

    const formattedDate = new Date(end).toLocaleDateString("en-US", {
        weekday: 'long',   // Day of the week (e.g., Monday)
        year: 'numeric',   // Full year (e.g., 2025)
        month: 'long',     // Full month name (e.g., April)
        day: 'numeric'     // Day of the month (e.g., 19)
    });

    const delPlans = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/financial/plans/${id}`, { id });
            if (response.status === 200) {
                onDelete(id); // Notify parent to remove the plan from the list
            }
        } catch (e) {
            console.error("❌ Error deleting plan:", e);
        }
    };

    return (
        <div className="bg-[#101936] border-[0.5px] border-gray-600 rounded-md shadow-sm hover:scale-105 transition duration-200 !mt-4 !p-3 hover:bg-[#1e293b]">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                    <div className="border-b border-gray-600 !pb-2">
                        <div>{title ? title.charAt(0).toUpperCase() + title.slice(1) : 'No Title'}</div>
                    </div>
                </Typography>
                <Typography variant="body2">
                    <div className="!flex !items-center !justify-between !mt-3">
                        Targeted Level:
                        <div className="!ml-1 !mb-2  !py-0.5 !px-1 rounded-md bg-[rgba(52,211,153,0.1)]  text-[#34d399] font-semibold">
                            {level}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        Desired Time:
                        <div className="!ml-1 !mb-2 !py-0.5 !px-1 rounded-md bg-[rgba(52,211,153,0.1)]  text-[yellow] font-semibold">
                            {time} hrs/week
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        End Date:
                        <div className="!ml-1 !mb-2  !py-0.5 !px-1 rounded-md bg-[rgba(52,211,153,0.1)]  text-[#34d399] font-semibold">

                            {formattedDate}
                        </div>
                    </div>
                    {/*<div className="flex items-center justify-between">*/}
                    {/*    Remaining Time:*/}
                    {/*    <div className="!ml-1 !mb-2  !py-0.5 !px-1 rounded-md bg-[rgba(52,211,153,0.1)]  text-[yellow] font-semibold">*/}
                    {/*        {time} yrs*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Typography>
            </CardContent>
            <CardActions className="flex justify-between">
                <button
                    type="button"
                    className="relative inline-block w-[6em] h-[2.6em] leading-[2.5em] overflow-hidden cursor-pointer m-[20px] text-[17px] z-10 text-[#0077ff] border-2 border-[#0077ff] hover:text-white rounded-[6px] transition-colors duration-300 group">
                    Done
                    <span className="absolute bg-[#0077ff] w-[150px] h-[200px] rounded-full z-[-1] top-full left-full transition-all duration-300 group-hover:top-[-30px] group-hover:left-[-30px]"></span>
                </button>
                <button
                    type="button"
                    onClick={() => delPlans(id)}
                    className="w-[50px] h-[50px] rounded-full bg-[#141414] border-none font-semibold flex items-center justify-center shadow-[0px_0px_20px_rgba(0,0,0,0.164)] cursor-pointer transition-[width,border-radius,background-color] duration-300 relative overflow-hidden group hover:w-[140px] hover:rounded-[50px] hover:bg-red-500">
                    <svg viewBox="0 0 448 512"
                         className="w-[12px] transition-[width,transform] duration-300 group-hover:w-[50px] group-hover:translate-y-[60%]">
                        <path fill="white"
                              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                    <span className="absolute top-[-20px] text-white text-[2px] transition-[font-size,opacity,transform] duration-300 opacity-100 hover:opacity-0 group-hover:text-[13px] group-hover:opacity-100 group-hover:translate-y-[30px]">Delete</span>
                </button>
            </CardActions>
        </div>
    );
}
