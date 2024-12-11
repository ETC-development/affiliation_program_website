import {useState} from "react";
import supabase from './supabase.jsx';



function SubmitFeedback() {

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [submitResponse, setSubmitResponse] = useState(null);

    const submit_input = async () =>  {
        valid_name();
        valid_email();
        valid_description();
        valid_feedback();
        if (valid_name() && valid_email() && valid_description() && valid_feedback()){

            setSubmitResponse(() => 1);
            const { data, error } = await supabase
                .from('feedback') // Replace 'feedback' with your actual table name
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        description: formData.description,
                        feedback: formData.feedback,
                    }
                ]);

            if (error) {
                console.error("Error inserting feedback:", error);
                setSubmitResponse(() => -1);
                return;// Return false on failure
            }

            console.log("Feedback inserted successfully:", data);
            setSubmitResponse(() => 0);

            setFormData((prevState) => ({
                ...prevState,
                name: '',
                email: '',
                description: '',
                feedback: '',
            }));
        }
    }

    const valid_name = () => {
        const unsafePatterns = /[<>`'"();{}]/g;
        if (! formData.name || ! formData.name.length > 2) {
            setFormError((prev) => ({...prev, name : 'Please enter your full name'}));
            return false;
        }

        if (formData.name.length > 2 && ! unsafePatterns.test(formData.name)) {
            setFormError((prev) => ({...prev, name : ''}));
            return true;
        }
        return false;
    }

    const valid_email = () => {
        const unsafePatterns = /[<>`'"();{}]/g;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (! formData.email || unsafePatterns.test(formData.email) || ! emailRegex.test(formData.email)) {
            setFormError((prev) => ({...prev, email : 'Please enter your email'}));
            console.log(formData);
            console.log(formError);
            return false;
        }

        if (formData.email.length > 2 && ! unsafePatterns.test(formData.email) && emailRegex.test(formData.email)) {
            setFormError((prev) => ({...prev, email : ''}));
            return true;
        }
        return false;
    }

    const valid_description = () => {
        const unsafePatterns = /[<>`'"();{}]/g;
        if (! formData.description) {
            setFormError((prev) => ({...prev, description : 'Please enter a short description about the feedback'}));
            return false;
        }

        if (formData.description.length > 5 && ! unsafePatterns.test(formData.description)) {
            setFormError((prev) => ({...prev, description : ''}));
            return true;
        }
        return false;
    }

    const valid_feedback = () => {
        const unsafePatterns = /[<>`'"();{}]/g;
        if (! formData.feedback) {
            setFormError((prev) => ({...prev, feedback : 'Please enter your feedback content'}));
            return false;
        }

        if (formData.feedback.length > 5 && ! unsafePatterns.test(formData.feedback)) {
            setFormError((prev) => ({...prev, feedback : ''}));
            return true;
        }
        return false;
    }




    return (
        <>
            <div id='feedback' className="mt-16 flex flex-col w-full items-center">
                <p className="text-white text-4xl  font-nasalization lg:self-start text-center lg:mx-24 lg:text-5xl ">Submit
                    your feedback</p>

                <div
                    className="feedbackForm w-full flex flex-col items-center mt-24 mb-[100px] lg:flex-row lg:justify-center lg:gap-x-12 2xl:gap-x-[400px] xl:gap-x-[100px] xl:items-start">

                    <div className="flex flex-col items-center">
                        <input
                            type='text'
                            placeholder='Full Name'
                            className='w-[300px] bg-[#041109] rounded-[12px] py-3 px-6 text-[#6F6C90] font-nasalization border-[#DADBDD] border lg:w-[400px] xl:w-[600px]'
                            name='name'
                            value={formData.name}
                            onChange={(e) => {
                                const {name, value} = e.target;
                                setFormData((prev) => ({...prev, [name]: value}));
                            }}
                        ></input>
                        <p className='text-[13px] font-nasalization -translate-x-[50px] px-12 text-red-600 mt-[10px] xl:self-start'>{formError?.name}</p>

                        <input
                            type='text'
                            placeholder='Email'
                            className='w-[300px] mt-[24px] bg-[#041109] rounded-[12px] py-3 px-6 text-[#6F6C90] font-nasalization border-[#DADBDD] border lg:w-[400px] xl:w-[600px]'
                            name='email'
                            value={formData.email}
                            onChange={(e) => {
                                const {name, value} = e.target;
                                setFormData((prev) => ({...prev, [name]: value}));
                            }}
                        ></input>
                        <p className='text-[13px] font-nasalization -translate-x-[50px] px-12 text-red-600 mt-[10px] xl:self-start'>{formError?.email}</p>

                        <input
                            type='text'
                            placeholder='Short Description'
                            className='w-[300px] mt-[24px] bg-[#041109] rounded-[12px] py-3 px-6 text-[#6F6C90] font-nasalization border-[#DADBDD] border lg:w-[400px] xl:w-[600px]'
                            name='description'
                            value={formData.description}
                            onChange={(e) => {
                                const {name, value} = e.target;
                                setFormData((prev) => ({...prev, [name]: value}));
                            }}
                        ></input>
                        <p className='text-[13px] font-nasalization -translate-x-[50px] px-12 text-red-600 mt-[10px] xl:self-start'>{formError?.description}</p>
                    </div>


                    <div className="flex flex-col items-center">
                      <textarea
                          type='text'
                          placeholder='Your Feedback'
                          className='w-[300px] h-[250px] mt-[24px] xl:mt-[0px] xl:py-[25px] xl:text-xl bg-[#041109] rounded-[12px] py-3 px-6 text-[#6F6C90] font-nasalization border-[#DADBDD] border lg:w-[400px] xl:w-[600px]'
                          name='feedback'
                          value={formData.feedback}
                          onChange={(e) => {
                              const {name, value} = e.target;
                              setFormData((prev) => ({...prev, [name]: value}));
                          }}
                      ></textarea>
                        <p className='text-[13px] font-nasalization -translate-x-[30px] px-12 text-red-600 mt-[10px] xl:self-start'>{formError?.feedback}</p>

                        <p className="text-xl mt-12 xl:mt-[30px] cursor-pointer text-white font-nasalization flex justify-center items-center bg-gradient-green px-8 py-2 rounded-[12px] xl:px-12 xl:py-3"
                           onClick={() => {
                               submit_input();
                           }}
                        >Submit</p>

                        <p
                            className={`mt-10 text-center text-[14px] font-nasalization ${
                                submitResponse != null
                                    ? submitResponse === -1
                                        ? 'text-red-500'
                                        : submitResponse === 0
                                            ? 'text-green-500'
                                            : submitResponse === 1
                                                ? 'text-white'
                                                : ''
                                    : ''
                            }`}
                        >
                            {submitResponse != null
                                ? submitResponse === -1
                                    ? 'Error inserting feedback'
                                    : submitResponse === 0
                                        ? 'Successfully added feedback'
                                        : submitResponse === 1
                                            ? 'Loading...'
                                            : ''
                                : ''}
                        </p>
                    </div>
                </div>


            </div>
        </>
    );
}

export default SubmitFeedback;