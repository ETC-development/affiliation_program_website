import ScheduleCellButton from "./ScheduleCellButton.jsx";
import ScheduleWorkshopCard from "./ScheduleWorkshopCard.jsx";
import workshop_image from '../assets/images/image/figma.png';
import './style/ScheduleScroll.css';
import supabase from './supabase.jsx';
import {useEffect, useState} from "react";

function Schedule() {


    const workshops = [
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution',
            ]
        },
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution'
            ]
        },
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution'
            ]
        },
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution'
            ]
        },
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution'
            ]
        },
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution'
            ]
        },
        {
            name : "Intro To Figma",
            time : "18:30 PM",
            image : workshop_image,
            date : '03/11/2024',
            location : 'Lab 3',
            mentor : 'Djellouli Arslene\n' +
                'Lyes Hadjar',
            content : [
                'UI/UX Basics',
                'Program outline',
                'Figma Introdution'
            ]
        },
    ];

    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const [cells, setCells] = useState(null);
    const [displayedWorkshops, setDisplayedWorkshops] = useState(null);
    const [currentCell, setCurrentCell] = useState(null);
    const [emptyWorkshops, setEmptyWorkshops] = useState(true);

    useEffect(() => {
        async function fetchSchedule() {
            setLoading(true);

            // Fetch data from the "feedback" table
            let { data, error } = await supabase
                .from('schedule') // Replace with your table name
                .select('*'); // Select all columns or specify specific columns like 'name, email'

            if (error) {
                console.error('Error fetching schedule:', error);
                setLoading(false);
            } else {
                setSchedule(() => {
                    let currentDate = new Date();
                    let returnable = [];
                    currentDate.setHours(0,0,0,0);
                    for (let i = 0; i < data.length; i++) {
                        let workshopDate = new Date(data[i].date);
                        workshopDate.setHours(0,0,0,0);
                        if (workshopDate >= currentDate) {
                            returnable.push(data[i]);
                        }
                    }
                    data = returnable;
                    return returnable;
                });
                setCells(() => {
                    let returnable = [];
                    for (let i = 0; i < data.length; i++) {
                        if (! returnable.includes(data[i].cell) && i === 0){
                            returnable.push(data[i].cell);
                            setCurrentCell(() => data[i].cell);
                        }
                        else if(! returnable.includes(data[i].cell)){
                            returnable.push(data[i].cell);
                        }

                    }
                    return returnable;
                });
            }

            setEmptyWorkshops(() => {
                if (data === null || data.length === 0)
                    return true;
                return false;
            })
            setLoading(false);
        }

        fetchSchedule();
    }, []);

    useEffect(() => {
        setDisplayedWorkshops(() => {
            let returnable = [];
            for (let i = 0; i < schedule?.length; i++) {
                if (schedule[i].cell === currentCell) {
                    returnable.push(schedule[i]);
                }
            }
            return returnable;
        })
    }, [currentCell]);



    return (
        <>
            <div id='schedule' className="flex flex-col w-full px-8 items-center min-h-[700px]">
                <p className="font-nasalization text-4xl text-white md:self-start xl:ml-12 xl:text-5xl"
                onClick={() => {
                    console.log(schedule);
                }}
                >Schedule</p>

                {
                    (() => {
                        if (loading){
                            return (
                                <div className="w-full h-[600px] flex flex-row items-center justify-center">
                                    <p className='text-xl lg:text-2xl text-center text-white font-nasalization'>Loading...</p>
                                </div>
                            );
                        }
                        else if (emptyWorkshops){
                            return (
                                <div className="w-full h-[600px] flex flex-row items-center justify-center">
                                    <p className='text-xl lg:text-2xl text-center text-white font-nasalization'>No workshops Scheduled for next days yet...</p>
                                </div>
                            );
                        }
                        else{
                            return (
                                <>
                                    <div
                                        className="flex flex-row justify-center flex-wrap w-full mt-8 max-w-5xl mb-[20px] xl:mb-[50px]">
                                        {
                                            // cells?.map((cell) => (
                                            //     <ScheduleCellButton cell={cell} />
                                            // ))

                                            (() => {
                                                let returnable = [];
                                                for (let i = 0; i < cells?.length; i++) {
                                                    // if (i === 0){
                                                    //     returnable.push((<ScheduleCellButton cell={cells[i]} selected={true}/>));
                                                    // }
                                                    // else {
                                                    //     returnable.push((<ScheduleCellButton cell={cells[i]} selected={false}/>));
                                                    // }
                                                    returnable.push((<ScheduleCellButton cell={cells[i]}
                                                                                         selected={cells[i] === currentCell}
                                                                                         onClick={() => {
                                                                                             setCurrentCell(cells[i]);
                                                                                         }}
                                                    />))
                                                }
                                                return returnable;
                                            })()
                                        }
                                    </div>

                                    <div
                                        className="flex flex-row overflow-x-auto justify-center w-[100%] xl:w-[94%] gap-x-8 no-scrollbar">
                                        {displayedWorkshops?.map(workshop => (
                                            <ScheduleWorkshopCard
                                                name={workshop.name}
                                                image={workshop.image}
                                                date={workshop.date}
                                                location={workshop.location}
                                                mentors={workshop.mentor}
                                                content={workshop.content}
                                                time={workshop.time}
                                            />
                                        ))}


                                    </div>
                                </>
                            );
                        }
                    })()
                }


            </div>
        </>
    );
}

export default Schedule;