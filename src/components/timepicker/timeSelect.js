import classNames from "classnames";

export default {
  props : {
    type : String,
    currentDate : Date,
    prefixCls : String
  },
  methods : {
    getSelectList () {
      const h = this.$createElement;
      const { type , prefixCls } = this.$props;
      let len = 0;
      if (type === 'hh') {
        // 小时
        len = 24;
      } else if (type === 'mm') {
        // 分钟
        len = 60;
      } else if (type === 'ss') {
        // 秒
        len = 60;
      };
      let res = [];
      for (let i = 0 ; i < len ; i++) {
        res.push(h(
          'li',
          {
            ref : 'li',
            key : i,
            class : classNames(prefixCls + '-select-list'),
            on : {
              click : this.handleClick
            }
          },
          [i > 10 ? i : '0' + i]
        ));
      };
      return res;
    },
    handleClick () {}
  },
  mounted () {
    console.log(this.$refs)
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-select')
      },
      [
        h(
          'ul',
          {
            ref : 'ul'
          },
          [
            this.getSelectList()
          ]
        )
      ]
    )
  }
}