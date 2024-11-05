import menu_icon from '../assets/images/icons/Filter.svg'

// eslint-disable-next-line react/prop-types
function NavBar({toggleSidebar, sidebarOpen}) {
    return (
        <>

            <div className="flex justify-between w-screen pl-8 pr-8 pt-10 lg:pr-20 lg:pl-20 lg:pt-14">

                <img src= {menu_icon} className='size-10 lg:hidden ' onClick={toggleSidebar}/>

                <p className="font-nasalization text-4xl  font-normal text-white lg:mx-0 mx-auto -translate-x-4">Logo</p>

                <div className="lg:w-8/12 lg:justify-between hidden lg:flex">
                    <p className="font-nasalization xl:text-2xl font-normal text-white lg:text-xl">Cells & Programs</p>
                    <p className="font-nasalization xl:text-2xl font-normal text-white lg:text-xl">Schedule</p>
                    <p className="font-nasalization xl:text-2xl font-normal text-white lg:text-xl">Resources</p>
                    <p className="font-nasalization xl:text-2xl font-normal text-white lg:text-xl">Gallery</p>
                    <p className="font-nasalization xl:text-2xl font-normal text-white lg:text-xl">Feedback</p>
                </div>
            </div>

            <div className={`lg:hidden fixed h-screen w-8/12 max-w-md bg-green-300 ${sidebarOpen? 'fixed' : 'hidden'}`}></div>
        </>
    );
}

export default NavBar;