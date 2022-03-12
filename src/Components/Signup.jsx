import React, { useEffect } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux'
import "./signup.css"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const mode = useSelector(store => store.mode)
    const navigate = useNavigate()
    const login = useSelector(store => store.login) 

    useEffect(() => {
        if(login) {
            navigate("/")
        }
    }, [login])

    function post(obj) {
        console.log(obj)
        axios.post(`https://todo-app36.herokuapp.com/api/users`, obj)
        .then(
            () => navigate("/login")
        )
            .catch(err => alert(err))
    }

    function submit(e) {
        e.preventDefault()
        var email = e.target.email.value;
        var password = e.target.password.value;
        var password1 = e.target.password1.value;
        var obj = {
            email: email,
            password: password,
            todos: [],
            completed_todos: []
        }
        if (password === password1) {
            axios.get(`https://todo-app36.herokuapp.com/api/users`)
                .then(
                    (res) => {
                        var data = res.data.filter(ele => ele.email === email)
                        if (data.length > 0) {
                            alert("User already exist with same id")
                        }
                        else {
                            post(obj)
                        }
                    }
                )
        }
        else {
            alert("passwords doesn't match")
        }
    }

    return (
        <div className='signup'>
            <h2 className={mode==="white"? "signup-h2": "signup-h2 signup-h2-black"} >Signup</h2>
            <form action="" onSubmit={submit}>
                <input type="email" placeholder='Enter Email Here....' name='email' />
                <br />
                <br />
                <input type="password" placeholder='Enter password here....' name='password' />
                <br />
                <br />
                <input type="password" placeholder='ReEnter password....' name='password1' />
                <br />
                <br />
                <button type='submit' className={mode==="white"? "btn btn-outline-success": 'btn btn-outline-warning'} >Signup</button>
            </form>
        </div>
    )
}

export default Signup