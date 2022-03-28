import classNames from "classnames";
import TimeSelect from './timeSelect';
export default {
  props : {
    prefixCls : String,
    currentDate : Date,
    format : String
  },
  methods : {
    getTimeSelectList () {
      const h = this.$createElement;
      const { format } = this.$props;
      let res = [];
      let arr = format.split(':');
      arr.map(item => {
        res.push(h(
          TimeSelect,
          {
            props : {
              type : item,
              currentDate : this.currentDate,
              prefixCls : this.prefixCls
            },
            on : {
              click : this.handleClick
            }
          }
        ))
      });
      return res;
    },
    handleClick () {}
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-panel')
      },
      [
        this.getTimeSelectList()
      ]
    )
  }
};