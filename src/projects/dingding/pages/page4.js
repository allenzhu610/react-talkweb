import React from 'react'
import BasePage from './basePage'
import FineReport from '@components/FineReport'

@BasePage
export default class Page extends React.Component {

  render() {
    return (
      <FineReport src="reportlet=mobile%2Ftest_mobile_3.cpt&op=h5" />
    )
  }

}