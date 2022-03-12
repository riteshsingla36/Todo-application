import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {change_login} from "../Redux/actions"
import "./login.css"

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = useSelector(store => store.login)
    const mode = useSelector(store => store.mode)

    useEffect(() => {
        if(login) {
            navigate("/")
        }
    }, [login])

    async function user(obj) {
        var res = await fetch("http://localhost:3001/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        var res1 = await res.json()
        var data = res1.filter(ele => ele.email === obj.email && ele.password === obj.password)

        if (data.length === 1) {
            alert("login successful")
            dispatch(change_login(obj.email))
            navigate("/")            
        }
        else {
            alert("wrong details")
        }
        
    }


    function submit(e) {
        e.preventDefault()
        var email =e.target.email.value;
        var password =e.target.password.value;

        var obj = {
            email, 
            password
        }
        
        user(obj)
    }

  return (
    <div>
        <h2 className={mode==="white"? 'login-h2': 'login-h2 login-h2-black'} >Login</h2>
        <form action="" onSubmit={submit}>
            <input type="email" placeholder='Enter Email here.....' name='email' />
            <br />
            <br />
            <input type="password" placeholder='Enter Password....' name='password' />
            <br />
            <br />

            <button type='submit' className={mode==="white"? "btn btn-outline-success": 'btn btn-outline-warning'} >Login</button>
        </form>
    </div>
  )
}

export default Login