import ProgramCard from "./ProgramCard.jsx";
import arslene from "../assets/images/image/arslene.png"
import arrow_left from '../assets/images/icons/arrow_left.svg'
import arrow_right from '../assets/images/icons/arrow_right.svg'
import supabase from './supabase.jsx';
import {useEffect, useState} from "react";

function Programs() {

    const [programs, setPrograms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentProgram, setCurrentProgram] = useState(null);
    const [programIndex, setProgramIndex] = useState(0);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('programs') // Fetch data from the 'programs' table
                    .select('*'); // You can select specific columns if needed

                if (error) {
                    setLoading(false);
                    throw error;
                }

                console.log('data :')
                console.log(data);
                setPrograms(data);
                setCurrentProgram(data[programIndex]);
            } catch (err) {
                setError(err.message);
                console.log(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    useEffect(() => {
        if (programs){
            setCurrentProgram(() => programs[(programIndex % programs.length)]);
        }
    }, [programIndex])

    return (
        <>

            <div id='programs' className="flex flex-col justify-center mt-48 mb-36">
                <p className="text-3xl text-white font-nasalization text-center mb-24 md:self-start md:mx-16 md:text-4xl lg:text-5xl">Cells & Programs</p>

                {
                    (() => {
                        if (loading) {
                            console.log(loading);
                            return <p className={`w-full text-center self-center justify-self-center text-xl lg:text-2xl font-nasalization text-white`}>Loading...</p>;
                        }
                        else if(programs === null || programs.length === 0) {
                            return <p className={`w-full text-center self-center justify-self-center text-xl lg:text-2xl font-nasalization text-white`}>Empty programs for now</p>;
                        }
                        else {
                            return (
                                <>
                                    <div className="w-full xl:px-12 grid grid-cols-1 grid-rows-1 items-center relative">
                                        <img src={arrow_left}
                                             className={`lg:w-[40px] w-[30px] row-start-1 col-start-1 z-10 justify-self-start`}
                                             onClick={() => {
                                                 setProgramIndex((prev) => {
                                                     if (prev === 0){
                                                         return programs.length - 1;
                                                     }
                                                     else {
                                                         return prev - 1;
                                                     }
                                                 });
                                             }}
                                        />
                                        <ProgramCard
                                            title={currentProgram?.name}
                                            description={currentProgram?.description}
                                            image={currentProgram?.image}
                                            name={currentProgram?.manager_name}
                                            github_link={currentProgram?.github}
                                            linkedin_link={currentProgram?.linkedin}
                                            discord_link={currentProgram?.discord}
                                            skills={(() => {
                                                let returnable = [];
                                                for (let i = 0; i < currentProgram?.skills.length; i++){
                                                    returnable.push(currentProgram?.skills[i].skill);
                                                }
                                                console.log("skills");
                                                console.log(currentProgram?.skills[0].skill);
                                                return returnable;
                                            }) ()}
                                        />
                                        <img src={arrow_right}
                                             className={`lg:w-[40px] w-[30px] self-center row-start-1 col-start-1 z-10 justify-self-end`}
                                             onClick={() => {
                                                 setProgramIndex((prev) => {
                                                     return ((prev + 1) % programs?.length);
                                                 })
                                             }}
                                        />
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

export default Programs