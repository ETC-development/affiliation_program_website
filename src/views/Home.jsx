import NavBar from "../components/navBar.jsx";
import {useState} from "react";
import Hero from "../components/Hero.jsx";
import Programs from "../components/Programs.jsx";
import Schedule from "../components/Schedule.jsx";
import Resources from "../components/Resources.jsx";
import Gallery from "../components/Gallery.jsx";
import SubmitFeedback from "../components/SubmitFeedback.jsx";
import Footer from "../components/Footer.jsx";

function Home() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    function toggleSidebar() {
        setSidebarOpen((prevState) => !prevState);
    }

    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <>
            <div className="w-full bg-cover bg-fixed bg-no-repeat"
                 style={{
                     backgroundImage: `
                        
                        radial-gradient(circle, rgba(14,53,33,1) 0%, rgba(3,28,13,1) 50%),
                        url('https://kqejftmlgcoenyzmzsrd.supabase.co/storage/v1/object/public/assets/texture.png?t=2024-12-02T23%3A27%3A54.993Z')
                     `,
                     backgroundBlendMode: 'overlay' // or 'multiply', 'screen', etc.
                 }}
                onClick={() => {
                if (sidebarOpen) {
                    setSidebarOpen(false);
                }
            }}>
                <NavBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} scrollToSection={scrollToSection} />
                <Hero />
                <Programs />
                <Schedule />
                <Resources />
                <Gallery />
                <SubmitFeedback />
                <Footer scrollToSection={scrollToSection}/>

            </div>
        </>
    );
}

export default Home;