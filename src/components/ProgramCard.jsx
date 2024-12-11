import './style/manager_card.css'
import background from'../assets/images/background/card-background.png'
import linkedIn from '../assets/images/icons/linkedin.svg'
import github from '../assets/images/icons/github.svg'
import discord from '../assets/images/icons/discord.svg'

// eslint-disable-next-line react/prop-types
function ProgramCard({title, description, image, name, skills, linkedin_link, github_link, discord_link}) {


    return (
        <>
            <div className="mx-12 px-6 2xl:self-center row-start-1 col-start-1 justify-self-center max-w-[1000px] md:px-12 py-10 border border-gray-200 rounded-3xl md:flex md:gap-x-16 md:py-14 lg:py-24 lg:pb-16 lg:mx-32 xl:mx-64 xl:gap-x-[50px] xl:justify-between xl:px-24">
                <div className="lhs-text flex flex-col gap-y-10 md:w-7/12 lg:gap-y-14">
                    <p className="font-nasalization text-white text-2xl md:text-3xl lg:text-4xl">{title}</p>
                    <p className="text-stone-400 text-md font-nasalization md:text-lg xl:mt-[50px]">{description}</p>

                    {/*<div className='md:flex justify-center items-center*/}
                    {/* px-4 py-3 text-white text-center*/}
                    {/* font-nasalization text-lg border-2*/}
                    {/* border-amber-700 rounded-2xl*/}
                    {/* w-56 self-center hidden xl:self-start xl:my-14*/}
                    {/* '>*/}
                    {/*    <p className='text-white font-nasalization text-lg lg:text-xl'>Learn More</p>*/}
                    {/*</div>*/}
                </div>




                <div className="rhs mt-20 manager-card max-w-lg min-w-64 md:mt-0">
                    <img src={image} className="rounded-xl self-center manager-image max-h-[250px] w-full object-cover"/>
                    <img className="card-background object-cover" src={background}/>

                    <div className="card-infos text-white flex flex-col ">
                        <p className="text-white font-nasalization text-md self-center mt-4 mb-3 sm:text-xl ">{name}</p>

                        {/* eslint-disable-next-line react/prop-types */}
                        {skills.map((skill, index) => (
                            <p key={index} className="text-gradient-green font-nasalization text-sm ml-4 mt-2 sm:text-lg">
                                {skill}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-row gap-x-4 ml-8 social sm:justify-center sm:m-0 -translate-x-4 ">
                        <div className="bg-gradient-green p-3 rounded-full size-12 flex justify-center items-center self-end">
                            <a href={linkedin_link} target={`_blank`}>
                                <img src={linkedIn} className='size-6'/>
                            </a>
                        </div>

                        <div className="bg-gradient-green p-3 rounded-full size-12 flex justify-center items-center self-end">
                            <a href={github_link} target={`_blank`}>
                                <img src={github} className='size-6'/>
                            </a>

                        </div>

                        <div className="bg-gradient-green p-3 rounded-full size-12 flex justify-center items-center self-end">
                            <a href={discord_link} target={`_blank`}>
                                <img src={discord} className='size-6'/>
                            </a>
                        </div>
                    </div>


                    {/*<div className='flex justify-center items-center*/}
                    {/* px-4 py-3 text-white text-center*/}
                    {/* font-nasalization text-lg border-2*/}
                    {/* border-amber-700 rounded-2xl*/}
                    {/* w-56 self-center mx-auto mt-10 md:hidden*/}
                    {/* '>*/}
                    {/*    <p className='text-white font-nasalization text-lg'>Learn More</p>*/}
                    {/*</div>*/}

                </div>
            </div>
        </>
    );
}

export default ProgramCard;