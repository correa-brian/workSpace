import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores/store'
import { Provider } from 'react-redux'
import { LandingLayout } from './Landing/components'

const app =(
  <Provider store={store.initialize()}>
    <LandingLayout />
  </Provider>
)

ReactDOM.render(app, document.getElementById('app'))
