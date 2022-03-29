import classNames from "classnames";
import TimeSelect from './timeSelect';
export default {
  props : {
    prefixCls : String,
    currentDate : Date,
    format : String,
    visible : Boolean
  },
  methods : {
    getTimeSelectList () {
      const h = this.$createElement;
      const { format } = this.$props;
      let res = [];
      let arr = format.split(':');
      arr.map((item , index) => {
        res.push(h(
          TimeSelect,
          {
            key : index,
            props : {
              type : item,
              currentDate : this.currentDate,
              prefixCls : this.prefixCls,
              visible : this.visible
            },
            on : {
              click : this.handleClick
            }
          }
        ))
      });
      return res;
    },
    handleClick (date) {
      this.$emit('change' , date);
    }
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