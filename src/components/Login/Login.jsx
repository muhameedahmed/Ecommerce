import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { Usercontext } from '../../Context/Usercontext';
export default function Login() {
    const [spinnerLoaded, setSpinnerLoaded] = useState(false);
    const [loginerrormessage, setLoginerrormessage] = useState(null);
    let Navigate =useNavigate();
    
    let {usertoken,Setusertoken,setid}=useContext(Usercontext);

    let validationSchema =yup.object().shape({
        email:yup.string().email("INVALID EMAIL ADDRESS").required("EMIAL IS REQUIRED"),
        password:yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"NOT MATCHED PASSWORD FORMAT ").required("PASSWORD IS REQUIRED"),    
    })
    async function handleSubmit(values, { setSubmitting, resetForm }){
        setSpinnerLoaded(true);
        // let {auth}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
        try {
         const response = await axios.post(
           "https://ecommerce.routemisr.com/api/v1/auth/signin",
           values
         );
   
         console.log("API Response login: ", response); 
         console.log(values);
         if(response.data.message === 'success'){
             setSpinnerLoaded(false); 
             resetForm();
             setSubmitting(false);
             Setusertoken(response.data.token);
             localStorage.setItem('email',response.data.user.email);
             setid(localStorage.getItem('email'));
             localStorage.setItem('usertoken',response.data.token);
             Navigate('/');
            
         }
     }catch (error) {
         console.error("Axios Error:", error.response?.data || error.message);
         const errorMessage = error.response.data.message || error.response.data.statusMsg;
         setLoginerrormessage(errorMessage);
       } finally {
         setSpinnerLoaded(false);
         setSubmitting(false);
       }
     
    }
    let formik =useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema,
        onSubmit:handleSubmit
        
    })
  return (
    <>
       <div className="container flex flex-col justify-start items-center p-10 ">
        
        {loginerrormessage!=null? <div className=" rounded p-2 mx-1 bg-red-300"><p className="text-red-900 text-2xs p-2 ">{loginerrormessage}</p></div>:null}
       <h1 className="p-10 font-bold text-2xl text-blue-900"> L O G I N</h1>
       <form onSubmit={formik.handleSubmit}   action="" className="flex flex-col gap-4 bg-blue-200 p-5 w-full lg:w-1/3 rounded border-2 border-blue-300  ">
               <div className="formsection ">
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email"   className=" rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Enter your  Email" />
                    {formik.errors.email&&formik.touched.email && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.email}</p></div>} 
                </div>
                <div className="formsection ">
                    <input  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password"   className=" rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Enter your Password"/>
                    {formik.errors.password&&formik.touched.password && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.password}</p></div>} 
                </div>
                
                <div className="formsection text-center ">
                    <button type="submit" className=" bg-blue-700 text-white p-4 w-30 rounded">{spinnerLoaded ? (<i className="fa-solid fa-spinner animate-spin"></i>) : ('LOGIN')}</button>
                </div>
        </form>
       </div>
    </>
  )
}
