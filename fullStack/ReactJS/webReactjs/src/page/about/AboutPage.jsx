

import React from 'react'
import { PI, lists } from '../../share/Helper'


const AboutPage = () => {
  return (
    <>
      <div>
          <h1>About Page</h1>

          <p>{PI}</p>
          <p>{lists[0].name}</p>
      </div>
    </>

  )
}

export default AboutPage