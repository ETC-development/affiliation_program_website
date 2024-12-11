import affiliation_logo from '../assets/images/image/affiliate_logo_white.png';
import etc_logo from '../assets/images/image/etc_logo.svg';
import instagram from '../assets/images/icons/instagram.svg';
import tiktok from '../assets/images/icons/tiktok.svg';
import youtube from '../assets/images/icons/youtube.svg';
import github from '../assets/images/icons/github.svg';
import linkedin from '../assets/images/icons/linkedin.svg';
import gmail from '../assets/images/icons/gmail.svg';
import discord from '../assets/images/icons/discord.svg';
import facebook from '../assets/images/icons/facebook.svg';

function Footer({scrollToSection}){
    return (
        <>
            <div className={`footer flex flex-col items-center py-12 border-t-[3px] border-white w-full`}>
                <div className={`logos w-full flex flex-row justify-center gap-x-14`}>
                    <img src={affiliation_logo} className={`w-[120px]`}/>
                    <img src={etc_logo} className={`w-[120px]`}/>
                </div>

                <div className={`scroll-links w-full flex flex-row mt-[80px] lg:mt-[80px] px-8 gap-x-8 lg:gap-x-[100px] justify-center flex-wrap gap-y-4`}>
                    <p className={`font-nasalization text-white text-[20px] lg:text-[24px] cursor-pointer`}
                       onClick={() => scrollToSection('programs')}>Cells & Programs</p>

                    <p className={`font-nasalization text-white text-[20px] lg:text-[24px] cursor-pointer`}
                       onClick={() => scrollToSection('schedule')}>Schedule</p>

                    <p className={`font-nasalization text-white text-[20px] lg:text-[24px] cursor-pointer`}
                       onClick={() => scrollToSection('resources')}>Resources</p>

                    <p className={`font-nasalization text-white text-[20px] lg:text-[24px] cursor-pointer`}
                       onClick={() => scrollToSection('gallery')}>Gallery</p>

                    <p className={`font-nasalization text-white text-[20px] lg:text-[24px] cursor-pointer`}
                       onClick={() => scrollToSection('feedback')}>Feedback</p>

                </div>

                <div
                    className={`social_links w-full flex flex-row mt-[80px] lg:mt-[100px] px-8 gap-x-8  justify-center flex-wrap gap-y-4`}>

                    <img src={instagram} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://www.instagram.com/etc_.club/?next=%2F', '_blank')
                    }}/>

                    <img src={tiktok} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://instagram.com', '_blank')
                    }}/>

                    <img src={youtube} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://instagram.com', '_blank')
                    }}/>

                    <img src={github} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://github.com/ETC-development', '_blank')
                    }}/>

                    <img src={linkedin} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://www.linkedin.com/company/ensia-tech-community/mycompany/?viewAsMember=true', '_blank')
                    }}/>

                    <img src={gmail} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://instagram.com', '_blank')
                    }}/>

                    <img src={discord} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://discord.gg/5H54RVthTj', '_blank')
                    }}/>

                    <img src={facebook} className={`w-[30px] cursor-pointer`} onClick={() => {
                        window.open('https://web.facebook.com/ensia.tech.community', '_blank')
                    }}/>


                </div>

            </div>
        </>
    );
}

export default Footer;