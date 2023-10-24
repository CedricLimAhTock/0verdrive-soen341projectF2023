import React from 'react'
import "./styles/Page404.css"

const Page404 = () => {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>404</h1>
      <p className='not-found-text'>Looks like you've gone off track!</p>
      {/*<p className='not-found-text'>Oops! The page you're looking for doesn't exist.</p> */}
      <a href='/' className='not-found-link'>Go back to homepage</a>
    </div>
  )
}

export default Page404