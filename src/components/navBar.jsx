import menu_icon from '../assets/images/icons/Filter.svg'
import affiliation_logo from '../assets/images/image/affiliate_logo_green.png';

// eslint-disable-next-line react/prop-types
function NavBar({toggleSidebar, sidebarOpen, scrollToSection}) {
    return (
        <>

            <div className="flex justify-between  w-screen pl-8 pr-8 pt-10 lg:pr-20 lg:pl-20 lg:pt-8">

                {/*<img src= {menu_icon} className='size-10 lg:hidden ' onClick={toggleSidebar}/>*/}

                {/*<p className="font-nasalization text-4xl  font-normal text-white lg:mx-0 mx-auto -translate-x-4">Logo</p>*/}

                <img src={affiliation_logo} className={`w-[150px] lg:mx-0 mx-auto`}/>

                <div className="lg:w-8/12 lg:justify-between hidden lg:flex pt-4">
                    <p className="cursor-pointer font-nasalization xl:text-2xl font-normal text-white lg:text-xl"
                    onClick={() => {
                        scrollToSection("programs");
                    }}
                    >Cells & Programs</p>
                    <p className="cursor-pointer font-nasalization xl:text-2xl font-normal text-white lg:text-xl"
                       onClick={() => {
                           scrollToSection("schedule");
                       }}
                    >Schedule</p>
                    <p className="cursor-pointer font-nasalization xl:text-2xl font-normal text-white lg:text-xl"
                       onClick={() => {
                           scrollToSection("resources");
                       }}
                    >Resources</p>
                    <p className="cursor-pointer font-nasalization xl:text-2xl font-normal text-white lg:text-xl"
                       onClick={() => {
                           scrollToSection("gallery");
                       }}
                    >Gallery</p>
                    <p className="cursor-pointer font-nasalization xl:text-2xl font-normal text-white lg:text-xl"
                       onClick={() => {
                           scrollToSection("feedback");
                       }}
                    >Feedback</p>
                </div>
            </div>

            <div className={`lg:hidden fixed h-screen w-8/12 max-w-md bg-green-300 ${sidebarOpen? 'fixed' : 'hidden'}`}></div>
        </>
    );
}

export default NavBar;