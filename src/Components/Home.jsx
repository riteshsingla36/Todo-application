import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./home.css"

const Home = () => {

  var login = useSelector(store => store.login)
  const user_details = useSelector(store => store.user_details)
  const mode = useSelector(store => store.mode)
  const [data, setData] = useState([])
  const [completedData, setCompletedData] = useState([])
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(0)

  async function get_details() {
    var res = await fetch("https://todo-app36.herokuapp.com/api/users", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    })
    var res1 = await res.json()

    setData(res1.find(ele => ele.email === user_details).todos)
    setCompletedData(res1.find(ele => ele.email === user_details).completed_todos)
    setId(res1.find(ele => ele.email === user_details).id)


  }

  var navigate = useNavigate()

  useEffect(() => {
    if (!login) {
      navigate("/login")
    }
    else {
      setLoading(true)
      get_details()
      setLoading(false)
    }

  }, [login, mode])


  function completed(obj) {
    var update_todo = data.filter(ele => ele !== obj)
    axios.patch(`https://todo-app36.herokuapp.com/api/users/${id}`, { todos: update_todo })
      .then(
        () => {

          axios.patch(`https://todo-app36.herokuapp.com/api/users/${id}`, { completed_todos: [...completedData, obj] })
            .then(() => get_details())
        }
      )
      .catch(err => console.log(err))

  }



  const Details = () => {
    return <div className={mode==="white"? 'main-pending': 'main-pending main-pending-black'}>
      {data.map(ele => {
        return <div key={ele}>
          <h3>{ele}</h3>
          <button className='btn btn-success' onClick={() => completed(ele)}>Completed</button>
        </div>
      })}
    </div>
  }


  function deletes(obj) {
    var update_todo = completedData.filter(ele => ele !== obj)
    axios.patch(`https://todo-app36.herokuapp.com/api/users/${id}`, { completed_todos: update_todo })
      .then(() => get_details())
      .catch((err) => console.log(err))
  }

  const CompletedDetails = () => {
    return <div className={mode==="white"? 'main-completed': 'main-completed main-completed-black'}>
      {completedData.map(ele => {
        return <div key={ele} >
          <h3>{ele}</h3>
          <button className='btn btn-danger' onClick={() => deletes(ele)}>Delete</button>
        </div>
      })}
    </div>
  }


  async function post(todo) {
    var res = await fetch(`https://todo-app36.herokuapp.com/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ todos: [...data, todo] })
    })
    await res.json()
    get_details()
  }


  function submit(e) {
    e.preventDefault()
    var todo = e.target.todo.value;

    post(todo)
  }


  const EveryThing = () => {
    return <div className="main">

      <h2 className={mode==="white"? 'main-h2': 'main-h2 main-h2-black'} >Add Todo</h2>

      <form action="" onSubmit={submit}>
        <input type="text" placeholder='add task here.....' name='todo' />
        <br />
        <br />
        <button type='submit' className={mode==="white"? "btn btn-primary": 'btn btn-warning'} >Add</button>
      </form>

    
      

      <div className={mode==="white"? "main-card": "main-card main-card-black"}>
        <Details />
        <CompletedDetails />

      </div>

    </div>
  }

  return (
    <div>
      {loading ? <h1>Loading</h1> : <EveryThing />}
    </div>
  )
}

export default Home