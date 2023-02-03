import React, { useEffect, useState } from 'react'
import style from './CrudApp.module.css'

const URL = "https://users-api-pxuc.onrender.com/users"
const CrudApp = () => {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // get user
  const getAllUsers =  ()=>{
    fetch(URL)
    .then((res)=>{
      if(!res.ok){
        throw Error('could not fetch')
      }
      return res.json()
    })
    .then((data)=>{
      setUsers(data.users)
    })
    .catch((err)=>{
      setError(err.message)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }

  // Delete user
  const handleDelete = (id) =>{
    fetch(URL + `/${id}`, {
      method:'DELETE'
    })
    .then((res)=>{
      if(!res.ok){
        throw Error('could not delete')
      }
      getAllUsers()
      })
    .catch((err)=>{
      setError(err.message)
    })
  }
 
  useEffect(()=>{
    getAllUsers()
  },[])
  return (
    <div>
      <h1>User Management App </h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <section>
        {users && users.map((user)=>{
          const {id, userName, email} = user
          return <article key={id} className={style.card}>
            <p>{userName}</p>
            <p>{email}</p>
            <button className={style.btn}>Edit</button>
            <button className={style.btn} onClick={()=>{handleDelete(id)}}>Delete</button>
          </article>
        })}
      </section>
      
    </div>
  )
}

export default CrudApp
