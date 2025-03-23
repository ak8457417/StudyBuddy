import React, {useEffect, useState} from 'react';
import tempadvisor from '../assets/temp-advisor.webp'
import {Link} from 'react-router-dom'

const Template = () => {

    const text = "Advisor";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = 100; // Typing speed (in ms)
        const deletingSpeed = 50; // Deleting speed (in ms)
        const pauseTime = 1000; // Pause before deleting (in ms)

        let timeout;

        if (!isDeleting && index < text.length) {
            // Typing effect
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, typingSpeed);
        } else if (isDeleting && index > 0) {
            // Deleting effect
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev.slice(0, -1));
                setIndex(index - 1);
            }, deletingSpeed);
        } else if (!isDeleting && index === text.length) {
            // Pause before deleting
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && index === 0) {
            // Restart typing
            setIsDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting]);

    return (
        <div className={'!p-[54px]'}>
            <div className={'!flex justify-around'}>
                <div>

                    <div className="text-6xl font-bold mt-3">
                        Enhancing Self-Study: Overcoming Challenges in Guidance, Planning, and Engagement
                    {/*    <div className="text-8xl font-bold">*/}
                    {/*    {displayedText}*/}
                    {/*    <span className="animate-blink">|</span> /!* Blinking Cursor *!/*/}
                    {/*</div>*/}
                    </div>
                    <div className={'!mt-10 font-medium text-xl'}>Students who plan on doing self study usually face problems regarding proper guidance and a proper study path leading to improper management and fear of missing out on a few things. Moreover students fail to update the plans on regular intervals which makes the entire strategy feel monotonic and slowly they lose interest in following the plan. Usually parents also provide some insights on a regular basis but those are left unnoticed in their plans. This lack of engagement and adaptability makes it challenging for students to stay motivated and effectively manage their learning process. Come up with a solution for the given issues.</div>
                </div>
                <div>
                    <img className={'w-550 !mt-10'} src={tempadvisor} alt={'Tempadvisor'}/>
                </div>
            </div>
            <div className="flex justify-center !gap-10 !space-x-4 !p-4 !mt-10">
                <Link to={'/login'}>
                    <button className="!flex !items-center !gap-2 !px-6 !py-3 !text-white !font-bold !bg-indigo-600 !rounded-full">
                        Sign in
                        <div className="!flex !justify-center !items-center">
                            <div className="!relative !w-2.5 !h-0.5 !bg-indigo-600 !transition !duration-200 group-hover:!bg-white">
                                <span className="!absolute !top-[-4px] !right-0 !border-r-2 !border-b-2 !border-white !w-2.5 !h-2.5 !rotate-[-45deg] !transition !duration-200"></span>
                            </div>
                        </div>
                    </button>
                </Link>
                <Link to={'/signup'}>
                    <button className="!flex !items-center !gap-2 !px-6 !py-3 !text-white !font-bold !bg-indigo-600 !rounded-full">
                        Sign up
                        <div className="!flex !justify-center !items-center">
                            <div className="!relative !w-2.5 !h-0.5 !bg-indigo-600 !transition !duration-200 group-hover:!bg-white">
                                <span className="!absolute !top-[-4px] !right-0 !border-r-2 !border-b-2 !border-white !w-2.5 !h-2.5 !rotate-[-45deg] !transition !duration-200"></span>
                            </div>
                        </div>
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Template;
