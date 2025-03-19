import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { cartcontext } from '../../Context/Cartcontext';

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { cartid, Cartcheckout } = useContext(cartcontext);

    const validationSchema = yup.object().shape({
        addressdetails: yup
            .string()
            .trim()
            .matches(/^[a-zA-Z0-9\s,.'-]{5,100}$/, 'Invalid address format')
            .min(5, 'Address must be at least 5 characters')
            .max(100, 'Address is too long')
            .required('Address is required'),
    
        phone: yup
            .string()
            .trim()
            .matches(/^0(10|11|12|15)[0-9]{8}$/, 'Must be a valid phone number')
            .required('Phone is required'),
    
        city: yup
            .string()
            .trim()
            .matches(/^[a-zA-Z\s'-]{2,50}$/, 'City must contain only letters, spaces, hyphens, or apostrophes')
            .min(2, 'City must be at least 2 characters')
            .max(50, 'City is too long')
            .required('City is required'),
    });
    

    async function handleSubmit(cartid, body, url) {
        setLoading(true);
        setErrorMessage(null);
        try {
            const baseUrl = window.location.origin + "/Ecommerce/#/allorders";
            const response = await Cartcheckout(cartid, body, baseUrl);
            if (response?.data?.status === 'success') {
                window.location.href = response.data.session.url;
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            console.error('Error in Checkout:', error.response?.data || error.message);
            setErrorMessage(error.response?.data?.message || 'An error occurred during checkout.');
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            addressdetails: '',
            phone: '',
            city: '',
        },
        validationSchema,
        onSubmit: () => handleSubmit(cartid, formik.values, window.location.origin),
    });
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [ useParams()]);

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            {errorMessage && (
                <div className="bg-red-300 text-red-900 p-2 rounded-md text-sm mb-4">
                    {errorMessage}
                </div>
            )}

            <h1 className="text-2xl font-bold text-blue-900 mb-6">CHECK OUT</h1>

            <form onSubmit={formik.handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                {/* Address Input */}
                <div className="mb-4">
                    <input
                        value={formik.values.addressdetails}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        name="addressdetails"
                        id="addressdetails"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your address details"
                    />
                    {formik.errors.addressdetails && formik.touched.addressdetails && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.addressdetails}</p>
                    )}
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                    <input
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="tel"
                        name="phone"
                        id="phone"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your phone"
                    />
                    {formik.errors.phone && formik.touched.phone && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                    )}
                </div>

                {/* City Input */}
                <div className="mb-4">
                    <input
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        name="city"
                        id="city"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your city"
                    />
                    {formik.errors.city && formik.touched.city && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
                    )}
                </div>

                {/* Pay Now Button */}
                <div className="mt-4">
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-md text-white font-semibold transition-all ${
                            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
                                <span className="ml-2">Processing...</span>
                            </div>
                        ) : (
                            "PAY NOW"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
