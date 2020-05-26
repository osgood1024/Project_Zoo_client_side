import React, { useState } from 'react'
import { render } from 'react-dom'
import { useTrail, animated } from 'react-spring'

// var Spinner = require('react-spinkit');


// let image=<img src={'./animation.gif'} alt={'animation'} style={{width:400, height:400}} /> 
const items = [ "Hi Osgood! "]

// items[1]= image
// items[2]=<Spinner name="folding-cube" />

const config = { mass: 5, tension: 2000, friction: 200 }

export function Trails() {
  const [toggle, set] = useState(false)
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 40 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div className="trails-main" onClick={() => set(state => !state)}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

render(<Trails />, document.getElementById('root'))