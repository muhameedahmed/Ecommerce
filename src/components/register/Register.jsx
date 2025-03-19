import React,{ Component, useContext, useState }  from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { Formik, useFormik } from "formik"
import *as yup  from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../../Context/Usercontext";
export default function Register() {
      const [spinnerLoaded, setSpinnerLoaded] = useState(false);
      let {usertoken,Setusertoken,setid}=useContext(Usercontext);
       const [Registererrormessage, setRegistererrormessage] = useState(null);
      let Navigate =useNavigate();
    const validationSchema=yup.object().shape({
        name:yup.string().matches(/^[A-Z][A-Za-z\s]{2,7}$/,"MUST START WITH UPERCASE CHARACTER").min(3,"MINMIM 3 CHARS").max(8 ,"MAX 8 CHARS").required("NAME IS REQUIRED"),
        email:yup.string().email("INVALID EMAIL ADDRESS").required("EMIAL IS REQUIRED"),
        phone: yup.string().trim().matches(/^0(10|11|12|15)[0-9]{8}$/, "must be valid phone number").required("PHONE IS REQUIRED"),
        password:yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"NOT MATCHED PASSWORD FORMAT ").required("PASSWORD IS REQUIRED"),
        rePassword:yup.string().oneOf([yup.ref('password')],"NOT MATCHED").required("REQUIRED"),
    })
    async function handleSubmit(values, { setSubmitting, resetForm }) {
        setSpinnerLoaded(true);
       // let {auth}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
       try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
  
        console.log("API Response:", response.data); 
        console.log(values);
        if(response.data.message === 'success'){
            setSpinnerLoaded(false); 
            resetForm();
            setSubmitting(false);
            Setusertoken(response?.data?.token);
            localStorage.setItem('email',response?.data?.user?.email);
            setid(localStorage.getItem('email'));
            localStorage.setItem('usertoken',response?.data?.token);
            Navigate('/');
           
        }
    }catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
     const errorMessage = error.response.data.message || error.response.data.statusMsg;
     setRegistererrormessage(errorMessage);
      } finally {
        setSpinnerLoaded(false);
        setSubmitting(false);
      }
    
    }
    
let formik= useFormik({
    initialValues :{
        name:'',
        email:'',
        phone:'',
        password:'',
        rePassword:'',
    },
    validationSchema,
    onSubmit:handleSubmit
})

return (
    <>
    <div className="container flex flex-col justify-center items-center p-10 ">
    {Registererrormessage!=null? <div className=" rounded p-2 mx-1 bg-red-300"><p className="text-red-900 text-2xs p-2 ">{Registererrormessage}</p></div>:null}
        <h1 className="p-10 font-bold text-2xl text-blue-900"> R E G I S T E R </h1>
        <form onSubmit={formik.handleSubmit}   action="" className="flex flex-col gap-4 bg-blue-200 p-5 w-full lg:w-1/3 rounded border-2 border-blue-300  ">
            <div className="formsection  ">
                <input  value={formik.values.name}onChange={formik.handleChange} onBlur={formik.handleBlur} type="text"  name="name" id="name"   className="rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Enter your  Name"/>
                {formik.errors.name&&formik.touched.name && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.name}</p></div>} 
            </div>
            <div className="formsection ">
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email"   className=" rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Enter your  Email" />
                {formik.errors.email&&formik.touched.email && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.email}</p></div>} 

            </div>
            <div className="formsection ">
                <input  value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone"   className=" rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Enter your  phone"/>
                {formik.errors.phone&&formik.touched.phone && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.phone}</p></div>} 
            </div>
            <div className="formsection ">
                <input  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password"   className=" rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Enter your Password"/>
                {formik.errors.password&&formik.touched.password && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.password}</p></div>} 
            </div>
            <div className="formsection ">
                <input  value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword"  className=" rounded p-3 mb-3 border-0 w-full  focus:outline-none focus:ring-0 " placeholder="Re-enter password"/>
                {formik.errors.rePassword&&formik.touched.rePassword && <div className=" rounded p-1 mx-1 bg-red-200"><p className="text-red-700 text-2xs ">{formik.errors.rePassword}</p></div>} 
            </div>
            <div className="formsection text-center ">
                <button type="submit" className=" bg-blue-700 text-white p-4 w-30 rounded">{spinnerLoaded ? (<i className="fa-solid fa-spinner animate-spin"></i>) : ('REGISTER')}</button>
            </div>
        </form>
    </div>
    </>
)
}
