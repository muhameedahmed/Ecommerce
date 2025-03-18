import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Protectedroute(props) {

    if(localStorage.getItem('usertoken')!==null){
        return props.children
    }
    else{
      return <Navigate to={ "/Login"}/>
    }
}
