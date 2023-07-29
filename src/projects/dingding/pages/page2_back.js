// import 'antd-mobile/lib/action-sheet/style';
import 'antd-mobile/lib/modal/style';
import 'antd-mobile/lib/list/style';
import 'antd-mobile/lib/button/style';
// import 'antd-mobile/lib/wing-blank/style';
// import 'antd-mobile/lib/white-space/style';

import React from 'react'

// import { ActionSheet } from 'antd-mobile';
import { Modal, List, Button } from 'antd-mobile';

import { changeTitle } from '@utils/dom'

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

export default class Page2 extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

	componentDidMount() {
		changeTitle(this.props.title)
		window.dd.biz.navigation.setRight({
	    show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
	    control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
	    text: '搜索', //控制显示文本，空字符串表示显示默认文本
	    onSuccess: result => {
	    	// this.showActionSheet()
	    	this.showModal('modal')
	    },
	    onFail: function(err) {
	    	alert('Fail')
	    }
		});
	}

	// showActionSheet = () => {
	//   const BUTTONS = ['开始时间', '结束时间', '搜索', '取消'];
	//   ActionSheet.showActionSheetWithOptions({
	//     options: BUTTONS,
	//     cancelButtonIndex: BUTTONS.length - 1,
	//     message: '输入条件进行搜索',
	//     maskClosable: false,
	//     wrapProps
	//   },
	//   (buttonIndex) => {
	//     this.setState({ clicked: BUTTONS[buttonIndex] });
	//   });
	// }

	showModal = key => { //  e =>
    // e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    return (
    	<div>
    		<Modal
          popup
          visible={this.state.modal}
          onClose={this.onClose('modal')}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (
              <List.Item key={index}>{i}</List.Item>
            ))}
            <List.Item>
              <Button type="primary" onClick={this.onClose('modal')}>买入</Button>
            </List.Item>
          </List>
        </Modal>
    	</div>
    )
  }
}