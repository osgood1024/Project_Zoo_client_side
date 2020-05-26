import React from 'react'
import { Transition, animated } from 'react-spring/renderprops'


export class Toggle extends React.Component {
  state = { show: true }
  toggle = (e) => this.setState(state => ({ show: !this.state.show }))
  render() {
    return (
      <div className="reveals-main" onClick={this.toggle}>
        <Transition
          native
          items={this.state.show}
          from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
          enter={[{ height: 'auto' }]}
          leave={{ height: 0 }}>
          {show =>
            show && (props => <animated.div style={props}>hello</animated.div>)
          }
        </Transition>
      </div>
    )
  }
}
