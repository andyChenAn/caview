import classNames from "classnames";

export default {
  props : {
    // 标题
    title : {
      type : String,
      default : ''
    },
    // 数值
    value : {
      type : [String , Number],
      default : ''
    },
    // 数值的样式
    valueStyle : {
      type : Object,
      default () {
        return {};
      }
    },
    // 数值的前缀
    prefix : {
      type : String,
      default : ''
    },
    // 数值的后缀
    suffix : {
      type : String,
      default : ''
    },
    // 数值的精确度
    precision : {
      type : [Number , String],
      default : ''
    },
    prefixCls : {
      type : String,
      default : 'ca-statistic'
    },
    // 千分位分隔符
    separator : {
      type : String,
      default : ','
    }
  },
  methods : {
    renderTitle (prefixCls) {
      const h = this.$createElement;
      const title = this.$props.title || this.$slots.title;
      return title ? h(
        'div',
        {
          class : classNames(prefixCls + '-title')
        },
        [title]
      ) : null
    },
    renderPrefix (prefixCls) {
      const h = this.$createElement;
      const prefix = this.$props.prefix || this.$slots.prefix;
      return prefix ? h(
        'span',
        {
          class : classNames(prefixCls + '-prefix')
        },
        [prefix]
      ) : null
    },
    getSeparatorValue (value) {
      const { separator } = this.$props;
      value = String(value);
      value = value.split('').reverse().join('');
      const count = Math.ceil(value.length / 3);
      let res = [];
      for (let i = 0 ; i < count ; i++) {
        res.push(value.slice(i * 3 , (i + 1) * 3).split('').reverse().join(''))
      };
      return res.reverse().join(separator);
    },
    renderPrecision (prefixCls) {
      const h = this.$createElement;
      const { precision } = this.$props;
      let res = '.';
      for (let i = 0 ; i < precision ; i++) {
        res += '0';
      };
      return precision ? h(
        'span',
        {
          class : classNames(prefixCls + '-value-precision')
        },
        [res]
      ) : null
    },
    renderValue (prefixCls) {
      const h = this.$createElement;
      let value = this.$props.value;
      value = this.getSeparatorValue(value);
      return value ? h(
        'div',
        {
          class : classNames(prefixCls + '-value')
        },
        [
          this.renderPrefix(prefixCls),
          h(
            'span',
            {
              class : classNames(prefixCls + '-value-content')
            },
            [value , this.renderPrecision(prefixCls)]
          ),
          this.renderSuffix(prefixCls)
        ]
      ) : null
    },
    renderSuffix (prefixCls) {
      const h = this.$createElement;
      const suffix = this.$props.suffix || this.$slots.suffix;
      return suffix ? h(
        'span',
        {
          class : classNames(prefixCls + '-suffix')
        },
        [suffix]
      ) : null
    },
    renderContent (prefixCls) {
      const h = this.$createElement;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-content')
        },
        [this.renderValue(prefixCls)]
      )
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls)
      },
      [
        this.renderTitle(prefixCls),
        this.renderContent(prefixCls)
      ]
    )
  }
}