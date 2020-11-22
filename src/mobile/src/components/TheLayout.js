import React from 'react'
import {TheContent,TheFooter} from './index'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
