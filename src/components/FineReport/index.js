import 'antd-mobile/lib/activity-indicator/style'

import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'antd-mobile'

/*
  帆软组件
*/
export default class FineReport extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      animating: true
    }
  }

  static defaultProps = {
    title: '',
    width: '100%',
    height: document.body.clientHeight
  }

  onload = () => {
    this.setState({
      animating: false
    })
  }

  render() {
    const {title, src, width, height} = this.props
    return (
      <div>
        <ActivityIndicator toast
          text="加载中..."
          animating={ this.state.animating } />
        <iframe title={ title }
          src={ src.indexOf('http') > -1 ? src : (window.ddConfig.reportServer + '?' + src) }
          width={ width }
          height={ height }
          scrolling="no"
          frameBorder="0"
          onLoad={ this.onload } />
      </div>
    )
  }
}

FineReport.propTypes = {
  src: PropTypes.string.isRequired
}