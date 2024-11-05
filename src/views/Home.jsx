import NavBar from "../components/navBar.jsx";
import {useState} from "react";
import Hero from "../components/Hero.jsx";

function Home() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    function toggleSidebar() {
        setSidebarOpen((prevState) => !prevState);
    }


    return (
        <>
            <div className='bg-black h-screen' onClick={() => {
                if (sidebarOpen) {
                    setSidebarOpen(false);
                    console.log(sidebarOpen);
                }
            }}>
                <NavBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
                <Hero />
            </div>
        </>
    );
}

export default Home;