import {useEffect, useState} from "react";
import supabase from "./supabase.jsx";
import arrow_left from "../assets/images/icons/arrow_left.svg";
import arrow_right from "../assets/images/icons/arrow_right.svg";

function Gallery(){

    const [pics, setPics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const fetchPics = async () => {
        try {
            setLoading(true);  // Set loading state to true when fetching data

            // Fetch data from Supabase and sort by 'added_date'
            const { data, error } = await supabase
                .from('gallery_pics')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            setPics(data);
        } catch (error) {
            setError(error);  // Set error state if something goes wrong
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);  // Set loading state to false after the request completes
        }
    };

    useEffect(() => {
        fetchPics();
    }, []);

    return (
        <>
            <div id='gallery' className="flex flex-col items-center w-full mt-[120px]">
                <p className="mx-16 text-white font-nasalization text-4xl mb-16 lg:text-5xl lg:self-start lg:mx-24">
                    Gallery
                </p>

                <div className="images w-full grid grid-cols-1 grid-rows-1 h-[800px] relative md:h-[500px] lg:h-[700px]">
                    <div className="w-full z-20 flex justify-between self-center row-start-1 absolute">


                        <img src={arrow_left} className="z-10 inline w-[30px] ml-4 fill-amber-700"
                        onClick={() => {
                            if (currentImageIndex === 0){
                                setCurrentImageIndex(pics?.length - 2);
                            }
                            else {
                                setCurrentImageIndex((index) => index - 1);
                            }
                        }}
                        />
                        <img src={arrow_right} className="z-10 inline w-[30px] mr-4"
                        onClick={() => {
                            setCurrentImageIndex((index) => (index + 1) % pics?.length);
                        }}
                        />
                    </div>
                    {
                        pics? (
                            <>
                                <div
                                    className="w-full h-full row-start-1 self-start z-10 absolute px-6 grid grid-rows-[160px_160px_160px_160px] grid-cols-[1fr_1fr] gap-x-4 gap-y-4 md:hidden">
                                    <img src={pics[currentImageIndex % pics?.length].pic_url}
                                         className="row-start-1 row-end-3 col-start-1 col-end-3 object-cover w-[90%] h-[320px] mx-auto transition-all duration-500 ease-in-out"/>
                                    <img src={pics[(currentImageIndex + 1) % pics?.length].pic_url}
                                         className="row-start-3 row-end-4 col-start-1 col-end-2 object-cover w-[100%] h-[160px] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 2) % pics?.length].pic_url}
                                         className="row-start-3 row-end-4 col-start-2 col-end-3 object-cover w-[100%] h-[160px] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 3) % pics?.length].pic_url}
                                         className="row-start-4 row-end-5 col-start-1 col-end-2 object-cover w-[100%] h-[160px] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 4) % pics?.length].pic_url}
                                         className="row-start-4 row-end-5 col-start-2 col-end-3 object-cover w-[100%] h-[160px] mx-auto"/>

                                </div>


                                <div
                                    className="w-[90%] h-full row-start-1 self-start z-10 absolute px-6 grid-rows-[200px_200px] grid-cols-[1fr_1fr_1fr_1fr] gap-x-4 gap-y-4 md:grid hidden lg:grid-rows-[300px_300px] xl:w-[90%] justify-self-center">
                                    <img src={pics[currentImageIndex % pics?.length].pic_url}
                                         className="row-start-1 row-end-3 col-start-1 col-end-3 object-cover w-[100%] h-[100%] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 1) % pics?.length].pic_url}
                                         className="row-start-1 row-end-2 col-start-3 col-end-4 object-cover w-[100%] h-[100%] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 2) % pics?.length].pic_url}
                                         className="row-start-2 row-end-3 col-start-3 col-end-4 object-cover w-[100%] h-[100%] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 3) % pics?.length].pic_url}
                                         className="row-start-1 row-end-2 col-start-4 col-end-5 object-cover w-[100%] h-[100%] mx-auto"/>
                                    <img src={pics[(currentImageIndex + 4) % pics?.length].pic_url}
                                         className="row-start-2 row-end-3 col-start-4 col-end-5 object-cover w-[100%] h-[100%] mx-auto"/>

                                </div>
                            </>

                        ) : (
                            <p className="text-white text-md font-nasalization mx-auto row-start-1 row-end-3 self-center">Loading...</p>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Gallery;