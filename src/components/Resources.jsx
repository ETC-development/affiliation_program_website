import folder_icon from '../assets/images/icons/folder.svg';
import file_icon from '../assets/images/icons/file.svg';
import {useEffect, useState} from "react";
import ResourceCellButton from "./ResourceCellButton.jsx";
import arrow_left from "../assets/images/icons/arrow_left.svg";
import supabase from "./supabase.jsx";

function Resources() {

    // const cells = [
    //     'Design',
    //     'UI/UX',
    //     'Web Dev',
    //     'Mob Dev',
    //     '3D Modeling',
    //     'AI & DS',
    //     'Robotics',
    //     'Cybersecurity',
    //     'Production',
    //     'Finance',
    //     'Event'
    // ];
    // const files_data = [
    //     {
    //         name: 'Assets',
    //         type: 'folder',
    //     },
    //     {
    //         name: 'tasks',
    //         type: 'folder',
    //     },
    //     {
    //         name: 'figma files',
    //         type: 'folder',
    //     },
    //     {
    //         name: 'intro-to-figma',
    //         type: 'file',
    //     },
    //     {
    //         name: 'UX Principles',
    //         type: 'file'
    //     },
    //     {
    //         name: 'Design Principles',
    //         type: 'file',
    //     },
    //     {
    //         name: 'Prototyping',
    //         type: 'file',
    //     },
    //
    //
    // ];


    const api_url = import.meta.env.VITE_DRIVE_API_URL;
    const [folders, setFolders] = useState(null);
    const [error, setError] = useState(null);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [dep, setDep] = useState(null);
    const [path, setPath] = useState([]);
    const [departements, setDepartements] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Define the API URL
        const apiUrl = api_url;
        const params = new URLSearchParams({});

        const urlWithParams = `${apiUrl}?${params.toString()}`;

        setLoading(true);
        fetch(urlWithParams, {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((dep_folders) => {
                //setFolders(dep_folders);
                setDep(dep_folders.files[0].id);
                setDepartements(dep_folders);
                setCurrentFolder(dep_folders.files[0]);
                setLoading(false);

                setPath((prev) => [...prev, dep_folders.files[0]]);

            })
            .catch((error) => {
                setError(error);
                console.log('error' + error.toString());
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (currentFolder) {
            setLoading(true);
            const urlWithFolderId = `${api_url}/${currentFolder.id}`;
            fetch(urlWithFolderId, {
                method: 'GET',
                mode: 'cors',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((folderDetails) => {
                    setFolders(folderDetails);
                    setPath((prev) => add_to_file_path(currentFolder, prev));
                    setLoading(false);

                })
                .catch((error) => {
                    setError(error);
                    console.log('error fetching folder details: ' + error.toString());
                    setLoading(false);
                });
        }
    }, [currentFolder]);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if(error){
                console.error(error);
            }
            else if (session) {
                const { data, error } = await supabase
                    .from('participants')
                    .select('email');
                if (error){
                    console.error(error);
                    return;
                }
                const emailExists = data.some(user => user?.email === session.user.email);
                if (emailExists) {
                    setAuthenticated(true);
                }
            } else {
                console.log('No session found');
            }
        };

        checkSession();
    }, []);

    const google_login = async () => {
        const { _, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (error) {
            console.error(error);
            return;
        }
    }

    const google_logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
            return;
        }
        setAuthenticated(false);
        console.log('Logged out');
    };


    const add_to_file_path = (newFile, oldPath) => {
        const isInRoot = departements?.files.some((file) => file.id === newFile.id);

        if (isInRoot) {
            return [newFile]; // Reset the path to just this root file
        }

        if (oldPath.length > 0 && oldPath[oldPath.length - 1].id === newFile.id) {

            return oldPath;
        }

        return [...oldPath, newFile];
    };

    const files_navigate_back = () => {
        setPath((prev) => {
            if (prev.length > 1) {
                const updatedPath = prev.slice(0, -1); // Remove the last element
                click_folder(updatedPath[updatedPath.length - 1]); // Set the new current folder
                return updatedPath; // Update the state
            }
            return prev; // If there's no folder to navigate back to, return the same path
        });
    };

    const retrieve_shorter_file_name = (filename, maxLength) => {
        // Split the filename into the name and extension
        const extIndex = filename.lastIndexOf('.');
        const baseName = extIndex === -1 ? filename : filename.slice(0, extIndex);
        const extension = extIndex === -1 ? '' : filename.slice(extIndex);

        // Calculate the space available for the base name (subtract space for extension and ellipsis)
        const availableLength = maxLength - extension.length - 3;

        // If the base name is too long, truncate it and add ellipsis
        const truncatedBaseName = baseName.length > availableLength ? baseName.slice(0, availableLength) + '...' : baseName;

        // Return the final truncated filename
        return truncatedBaseName + extension;
    }

    const click_folder = (folder) => {
        setCurrentFolder(folder);
    }

    const click_file = (file) => {
        const url = file.webViewLink;  // Replace with your desired URL
        window.open(url, "_blank");
    }

    return (
        <>
            <div id='resources' className="flex flex-col items-center mt-32 w-full px-4 xl:mt-48">
                <div className={`flex flex-col gap-y-10 w-full items-center mb-[50px] lg:flex-row justify-between`}>
                    <p className="text-4xl text-white font-nasalization lg:self-start lg:ml-20 lg:text-5xl xl:mb-8">Resources</p>
                    {
                        authenticated === false ? null :
                            <div
                                className={`cursor-pointer border-fontGreen border-[2px] lg:px-8 lg:py-2 lg:border-[3px] rounded-[12px] lg:rounded-[15px] px-6 py-1 lg:mr-20`}
                                onClick={() => {
                                    google_logout();
                                }}
                            >
                                <p className={`text-lg text-white font-nasalization lg:text-xl`}>Logout</p>
                            </div>
                    }
                </div>

                {
                    authenticated ?
                        <>
                            <div
                                className="flex flex-row justify-center flex-wrap w-full mt-8 max-w-5xl mb-[20px] xl:mb-[50px] lg:hidden">
                                {
                                    departements?.files.map((f) => (
                                        <ResourceCellButton cell={f} selected={dep === f.id}
                                                            onClick={() => {
                                                                setDep(f.id);
                                                                setCurrentFolder(f);
                                                            }
                                                            }
                                        />
                                    ))
                                }
                            </div>

                            <div
                                className='w-[90%] max-w-[1200px] min-h-[700px] border border-[#DADBDD] rounded-[15px] grid grid-cols-[25%_auto] grid-rows-1 gap-x-[50px] mt-[30px] items-start'>

                                <div
                                    className="row-start-1 col-start-1 h-full border-r border-[#DADBDD] flex-col items-center hidden lg:flex">
                                    {departements?.files.map((f) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <div
                                            className={`w-full py-2 flex justify-center rounded-tl-[15px] items-center border-b border-[#DADBDD] ${dep === f.id ? 'bg-gradient-green' : ''} `}
                                            onClick={() => {
                                                setDep(f.id);
                                                setCurrentFolder(f);
                                            }}>
                                            <p className="font-nasalization text-white text-sm xl:text-lg">{f.name}</p>
                                        </div>
                                    ))}
                                </div>

                                {
                                    loading ? (
                                        <div className="w-full h-full flex justify-center items-center mx-[120px] lg:mx-0">
                                            <p className='text-white text-xl font-nasalization'>Loading...</p>
                                        </div>
                                    ) : (

                                        folders?.files && folders.files.length > 0 ? (
                                            <div
                                                className="w-full h-auto px-[20px] py-[20px] flex flex-row flex-wrap gap-x-[15px] gap-y-[10px] row-start-1 col-start-1 col-span-2 lg:col-span-1 items-start justify-start">
                                                <div className="w-full flex mb-10">
                                                    <img src={arrow_left}
                                                         className={`w-[20px] ${path.length === 1 ? 'hidden' : ''}`}
                                                         onClick={() => {
                                                             files_navigate_back();
                                                         }}
                                                    />

                                                </div>

                                                {
                                                    folders.files.map(file => (

                                                        file.mimeType === "application/vnd.google-apps.folder" ? (
                                                            <div key={file.name}
                                                                 className="cursor-pointer flex flex-col gap-y-[5px] flex-nowrap items-center max-h-[150px]"
                                                                 onClick={() => click_folder(file)}
                                                            >
                                                                <img src={folder_icon}
                                                                     className="w-[90px] lg:w-[120px]"/>

                                                                <p className="font-nasalization lg:text-[12px] text-[10px] lg:text-xs text-white">
                                                                    {retrieve_shorter_file_name(file.name, 25)}
                                                                </p>

                                                            </div>
                                                        ) : (
                                                            <div key={file.name}
                                                                 className="cursor-pointer flex flex-col gap-y-[5px] flex-nowrap items-center max-h-[150px]"
                                                                 onClick={() => click_file(file)}
                                                            >
                                                                <img
                                                                    src={file_icon}
                                                                    className="w-[60px] lg:w-[80px]"/>
                                                                <p className="font-nasalization lg:text-[12px] text-[10px] lg:text-xs text-white">
                                                                    {retrieve_shorter_file_name(file.name, 25)}
                                                                </p>
                                                            </div>

                                                        )


                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex justify-center items-center mx-[120px] lg:mx-0">
                                                <p className="text-white text-xl font-nasalization text-center">The folder is
                                                    currently empty :(</p>
                                            </div>
                                        )


                                        // folders?.files && folders.files.length > 0 ? (
                                        //
                                        //     folders.files.map(file => (
                                        //         <div key={file.name} className="flex flex-col gap-y-[5px] flex-nowrap items-center max-h-[150px]">
                                        //             <img src={file_icon} className="w-[60px] lg:w-[80px]" />
                                        //             <p className="font-nasalization text-[12px] lg:text-xs text-white">
                                        //                 {retrieve_shorter_file_name(file.name, 25)}
                                        //             </p>
                                        //         </div>
                                        //     ))
                                        // ) : (
                                        //     // If folders.files is empty or undefined, return the "empty" message
                                        //
                                        // )
                                    )
                                }
                            </div>
                        </>
                        :
                        <div className={`w-full h-[500px] flex justify-center items-center`}>
                            <div className={`cursor-pointer px-6 py-2 lg:px-8 border-[2px] lg:border-[3px] xl:border-[4px] rounded-[12px] border-fontGreen`}
                                 onClick={() => {
                                     if (authenticated) google_logout();
                                     else if (!authenticated) google_login();
                                 }}
                            >
                                <p className={'text-md lg:text-xl xl:text-2xl text-white font-nasalization font-medium text-center'}>Login To see Resources</p>
                            </div>
                        </div>

                }


            </div>
        </>
    );
}

export default Resources;