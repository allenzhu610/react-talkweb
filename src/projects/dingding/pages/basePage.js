// 反向继承的方式，钉钉页面的基础页面
// 高阶组件

// import { FineReport } from '@components/FineReport'
import { changeTitle } from '@utils/dom'

export default function BasePage(Component) {

  return class BasePage extends Component {

    componentDidMount() {
      changeTitle(this.props.title)
      super.componentDidMount && super.componentDidMount()
    }

    render() {
      return super.render()
    }

  }

}