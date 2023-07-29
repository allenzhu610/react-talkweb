import React from 'react'

import { Table } from 'antd';

import { changeTitle } from '@utils/dom'

const columns = [
  { title: '项目', dataIndex: 'xm', fixed: 'left', width: 150 },
  { title: '整体', dataIndex: 'zt', width: 110 },
  { title: '还贷性', dataIndex: 'hdx', width: 110 },
  { title: '经营性', dataIndex: 'jyx' }
];

const data = [
	{ key: 0, xm: '2018年实收额（万元）', zt: 1092184.69, hdx: 697586.14, jyx: 394598.55 },
	{ key: 1, xm: '2018年实收较上年增长（万元）', zt: 124514.12, hdx: 72878.11, jyx: 51636.01 },
	{ key: 2, xm: '2018年实收较上年同比增长', zt: '12.87%', hdx: '11.67%', jyx: '15.06%' },
	{ key: 3, xm: '2018年实收占比', zt: '100.00%', hdx: '63.87%', jyx: '36.13%' },
	{ key: 4, xm: '每公里实收额（万元）', zt: '11.58%', hdx: '9.75%', jyx: '15.06%' },

	{ key: 5, xm: '2018实得额（万元）', zt: 1092184.69, hdx: 647452.57, jyx: 444732.12 },
	{ key: 6, xm: '2018年实得较上年增长（万元）', zt: 124514.12, hdx: 78907.46, jyx: 45606.66 },
	{ key: 7, xm: '2018年实得较上年同比增长', zt: '12.87%', hdx: '13.88%', jyx: '11.43%' },
	{ key: 8, xm: '2018年实得占比', zt: '100.00%', hdx: '59.28%', jyx: '40.72%' },
	{ key: 9, xm: '2018年每公里实得额（万元）', zt:	253.29, hdx: 150.15, jyx: 203.82 },
	{ key: 10, xm: '2018年较2017年每公里实得同比增长额（万元）', zt: 24.96, hdx: 16.00, jyx: 20.90 },
	{ key: 11, xm: '2018年较2017年每公里实得同比增长', zt: '10.93%', hdx: '11.92%', jyx: '11.43%' },

	{ key: 12, xm: '2018年总流量（万辆）', zt: 32900.90, hdx: 16971.10, jyx: 15929.80 },
	{ key: 13, xm: '2018年总流量流量较上年增长（万辆）', zt: 3161.36, hdx: 1927.25, jyx: 1234.11 },
	{ key: 14, xm: '2018年总流量较上年同比增长', zt: '9.61%', hdx: '11.36%', jyx: '7.75%' },
	{ key: 15, xm: '2018年总流量占比', zt: '100.00%', hdx: '51.58%', jyx: '48.42%' },

	{ key: 16, xm: '2018年出口流量（万辆）', zt: 16522.61, hdx: 8531.06, jyx: 7991.55 },
	{ key: 17, xm: '2018年出口流量较上年增长（万辆）', zt: 1523.86, hdx: 955.93, jyx: 567.93 },
	{ key: 18, xm: '2018年出口流量较上年同比增长', zt: '10.16%', hdx: '12.62%', jyx: '7.65%' },
	{ key: 19, xm: '2018年出口流量占比', zt: '100.00%', hdx: '51.63%', jyx: '48.37%' },

	{ key: 20, xm: '2018年入口流量（万辆）', zt: 16378.29, hdx: 8440.04, jyx: 7938.25 },
	{ key: 21, xm: '2018年入口流量较上年增长（万辆）', zt: 1637.50, hdx: 971.32, jyx: 666.18 },
	{ key: 22, xm: '2018年入口流量较上年同比增长', zt: '10.00%', hdx: '11.51%', jyx: '8.39%' },
	{ key: 23, xm: '2018年入口流量占比', zt: '100.00%', hdx: '51.53%', jyx: '48.47%' },

	{ key: 24, xm: '2017年12月底实际通车里程（公里）', zt: 6420.00, hdx: 4238.00, jyx: 2182.00 },
	{ key: 25, xm: '2017年12月底通车里程占比', zt: '100.00%', hdx: '66.01%', jyx: '33.99%' },
	{ key: 26, xm: '2018年6月底实际通车里程（公里）', zt: 6494.00, hdx: 4312.00, jyx: 2182.00 },
	{ key: 27, xm: '2018年6月底通车里程占比', zt: '100.00%', hdx: '66.40%', jyx: '33.60%' },
	{ key: 28, xm: '2018年6月底较2017年12月底新增里程（公里）', zt: 74, hdx: 74, jyx: 0 },
	{ key: 29, xm: '2018年6月底通车里程较上年同比增长', zt: '1.16%', hdx: '1.75%', jyx: '0.00%' }
]

export default class Page1 extends React.Component {

	constructor(props) {
    super(props)
    this.state = {
      height: document.body.clientHeight - 118
    }
  }

	componentDidMount() {
		changeTitle(this.props.title)
	}

  render() {
    return (
    	<Table columns={columns} dataSource={data} scroll={{ x: 480, y: this.state.height }} />
    )
  }
}