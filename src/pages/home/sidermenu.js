import React from 'react'
import { Menu } from 'antd'

export default class Sidermenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: null,
      openKeys: null
    }
  }
  componentDidMount() {
    const selectedKeys = this.getSelectedKey(this.props),
      openKeys = this.onSelect(this.props, selectedKeys)
    // if (!selectedKeys) {
    //   return
    // }
    this.setState({ selectedKeys, openKeys })
  }
  UNSAFE_componentWillReceiveProps(props) {
    const selectedKeys = this.getSelectedKey(props),
      openKeys = this.onSelect(props, selectedKeys)
    // if (!selectedKeys) {
    //   return
    // }
    this.setState({ selectedKeys, openKeys })
  }
  switchRouter = path => {
    this.props.history.push(this.props.match.url + path)
  }
  getSelectedKey = props => {
    const pathname = props.location.pathname,
      toPath = '/' + pathname.split('/')[2],
      selectedItem = props.content.find(item => item.to === toPath)
    return selectedItem ? [selectedItem.id + ''] : null
  }
  onSelect = (props, selectedKeys) => {
    if (!selectedKeys || !selectedKeys[0]) {
      return null
    }
    const openKeys = [],
      content = props.content,
      contentItem = content.find(item => item.id === selectedKeys[0] - 0)
    this.getParent(openKeys, content, contentItem)
    return openKeys.length === 0 ? null : openKeys
  }
  getParent = (openKeys, content, contentItem) => {
    if (contentItem.parentId !== '#') {
      const parentItem = content.find(item => item.id === contentItem.parentId)
      if (parentItem) {
        openKeys.push(contentItem.parentId + '')
        this.getParent(openKeys, content, parentItem)
      }
    }
  }
  onTitleClick = id => {
    if (this.state.openKeys) {
      const curId = this.state.openKeys.indexOf(id + '')
      if (curId > -1) {
        const openKeys = this.state.openKeys.concat(0)
        openKeys.splice(curId, 1)
        this.setState({ openKeys })
        return
      }
    }
    const openKeys = [id + ''],
      content = this.props.content,
      contentItem = content.find(item => item.id === id)
    this.getParent(openKeys, content, contentItem)
    const array = openKeys.concat(this.state.openKeys) 
    this.setState({ openKeys: [...new Set(array)] })
  }
  siderSubmenu = (content, item) => {
    const subContent = content.filter(contentItem => contentItem.parentId === item.id)
    if (subContent.length === 0) {
      return (
        <Menu.Item key={ item.id } onClick={ this.switchRouter.bind(this, item.to) }>
          <i className={ `fa fa-${item.icon}` }></i> <span>{ item.label }</span>
        </Menu.Item>
      )
    }
    return (
      <Menu.SubMenu key={ item.id } title={ <span><i className={ `fa fa-${item.icon}` }></i> { item.label }</span> } onTitleClick={ this.onTitleClick.bind(this, item.id) }>
        { subContent.map(child => (
          this.siderSubmenu(content, child)
          )) }
      </Menu.SubMenu>
    )
  }
  render() {
    const content = this.props.content
    const { selectedKeys, openKeys } = this.state
    return (
      <Menu theme="dark" style={ { background: '#2f4050' } } mode="inline" inlineIndent={ 10 } openKeys={ openKeys } selectedKeys={ selectedKeys }>
        { content.filter(item => item.parentId === '#').map(item => (
          this.siderSubmenu(content.filter(contentItem => contentItem.parentId !== '#'), item)
          )) }
      </Menu>
    )
  }
}