import styles from './Loading.less'
import React from 'react'
import { addClass, removeClass, toggleClass } from '../../utils/dom'

export default class Loading extends React.Component {
  componentDidMount() {
    const domLoading = this.refs.loading
    window.Loading = {
      show() {
        removeClass(domLoading, 'hide')
      },
      hide() {
        addClass(domLoading, 'hide')
      },
      toggle() {
        toggleClass(domLoading, 'hide')
      }
    }
  }
  render() {
    return (
      <div className="dom-loading hide" ref="loading">
        <div className={ styles.loadingLayer }></div>
        <div className={ styles.reactLoading }>
        </div>
      </div>
    )
  }
}