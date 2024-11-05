
function Hero() {
    return (
        <>
            <div className="hero flex flex-col gap-y-16 w-screen items-center mt-48 lg:gap-y-24">
                <div className="title font-nasalization text-white text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl">
                    <p>Join the Journey to</p>
                    <p>Mastery with ETC</p>
                </div>

                <div className="description font-nasalization text-stone-400 text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl">
                    <p>Discover the ENSIA Tech Community</p>
                    <p>Affiliation Program, 2024/2025</p>
                </div>

                <div className="buttons flex flex-row gap-x-8 mx-auto mt-10">
                    <div className="text-white bg-amber-700 rounded-lg flex justify-center items-center font-nasalization px-9 py-3 text-sm md-text-lg xl:text-xl xl:px-11 xl:py-4 xl:rounded-xl">
                        <p>Discover ETC</p>
                    </div>
                    <div className="text-white bg-amber-700 rounded-lg flex justify-center items-center font-nasalization px-9 py-3 text-sm md-text-lg xl:text-xl xl:px-11 xl:py-4 xl:rounded-xl">
                        <p>Follow Us</p>
                    </div>
                </div>

            </div>
        </>
    );
}
export default Hero;