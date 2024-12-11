
function ScheduleWorkshopCard({
    name,
    image,
    date,
    time,
    location,
    mentors,
    content
                              }) {
    return (
        <>
            <div className="flex flex-col items-center px-6 py-6 border border-[#DADBDD] rounded-[14px] w-[300px] min-w-[300px] min-h-[500px]">
                <div className="w-[220px] relative grid grid-cols-1 grid-rows-1 border border-[#DADBDD] rounded-[8px] justify-items-center  ">
                    <p className="row-end-1 absolute self-center z-10 text-center text-white font-nasalization text-3xl">{name}</p>
                    <img src={image} className="object-cover row-end-1 w-full h-full"/>
                </div>

                <div
                    className="grid grid-cols-[1fr_2fr] grid-rows-[reapeat(5,auto)] w-[90%] gap-x-6 gap-y-1 mt-6 self-start">
                    <p className="text-sm text-gradient-green font-nasalization row-start-1 col-start-1">Date: </p>
                    <p className="text-sm text-white font-nasalization col-start-2 row-start-1">{date}</p>

                    <p className="text-sm text-gradient-greenfont-nasalization row-start-2 col-start-1">Time: </p>
                    <p className="text-sm text-white font-nasalization col-start-2 row-start-2">{time}</p>

                    <p className="text-sm text-gradient-green font-nasalization row-start-3 col-start-1">Location: </p>
                    <p className="text-sm text-white font-nasalization col-start-2 row-start-3">{location}</p>

                    <p className="text-sm text-gradient-green font-nasalization row-start-4 col-start-1">Mentor: </p>
                    <p className="text-sm text-white font-nasalization col-start-2 row-start-4">{mentors}</p>

                    <p className="text-sm text-gradient-green font-nasalization row-start-5 col-start-1">Content: </p>
                    <div className='flex flex-col '>
                        {
                            content?.map(c => (
                                <div className='flex flex-nowrap items-center gap-x-[8px] mb-[8px]'>
                                    <div className='circle h-[8px] w-[8px] rounded-[50%] bg-white'></div>
                                    <p className="text-sm text-white font-nasalization col-start-2 row-start-5">{c.name}</p>
                                </div>
                            ))
                        }
                    </div>



                </div>
            </div>
        </>
    );
}

export default ScheduleWorkshopCard;