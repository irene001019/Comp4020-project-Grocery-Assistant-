import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const NoPage = () => {
  return (
    
      <div className="row justify-content-center">
        <Card className="card text-center border-danger" to='/' text = "click to go back to home page" icon = "Sorry current page is not avaiable"/>
     </div>
  )
}

export default NoPage