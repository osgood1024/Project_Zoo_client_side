import React, { useState } from 'react'
import { render } from 'react-dom'
import { useTrail, animated } from 'react-spring'

let image=<img src={'./og.png'} alt={'osgood'} style={{width:50, height:40}} /> 
const items = [ 'WΞLCO-M3 T-0 PRΦJΞCT Z-00']
items[1]=image

const config = { mass: 5, tension: 2000, friction: 200 }

export function Trails() {
  const [toggle, set] = useState(true)
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