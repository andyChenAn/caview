import classNames from "classnames";

export const statisticProps = {
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
    default : 0
  },
  prefixCls : {
    type : String,
    default : 'ca-statistic'
  },
  // 千分位分隔符
  separator : {
    type : String,
    default : ','
  },
  // 格式化数据，主要用于countdown组件
  formatter : Function
};

export default {
  props : statisticProps,
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
      if (value.indexOf('.') > -1) {
        let arr = value.split('.');
        value = arr[0];
        value = value.split('').reverse().join('');
      } else {
        value = value.split('').reverse().join('');
      }
      const count = value.length < 3 ? 0 : Math.ceil(value.length / 3);
      let res = [];
      for (let i = 0 ; i < count ; i++) {
        res.push(value.slice(i * 3 , (i + 1) * 3).split('').reverse().join(''))
      };
      if (res.length > 0) {
        return res.reverse().join(separator);
      } else {
        return value;
      }
    },
    renderPrecision (prefixCls) {
      const h = this.$createElement;
      const { precision , value } = this.$props;
      let hasDecimalPoint = String(value).indexOf('.') > -1;
      let pointStr = '';
      if (hasDecimalPoint) {
        pointStr = String(value).split('.')[1];
        let count = pointStr.length;
        if (precision && count > precision) {
          pointStr = pointStr.slice(0 , -(count - precision));
        } else if (precision && count < precision) {
          for (let i = 0 ; i < precision - count ; i++) {
            pointStr += '0';
          }
        };
        pointStr = '.' + pointStr;
      } else {
        pointStr = '.';
        for (let i = 0 ; i < precision ; i++) {
          pointStr += '0';
        }
      };
      return precision ? h(
        'span',
        {
          class : classNames(prefixCls + '-value-precision')
        },
        [pointStr]
      ) : null
    },
    renderValue (prefixCls) {
      const h = this.$createElement;
      let value = this.$props.value;
      const { formatter } = this.$props;
      if (formatter && typeof formatter === 'function') {
        value = formatter({value , h})
      } else {
        value = this.getSeparatorValue(value);
      }
      return value ? h(
        'div',
        {
          class : classNames(prefixCls + '-value'),
          style : this.$props.valueStyle
        },
        [
          this.renderPrefix(prefixCls),
          h(
            'span',
            {
              class : classNames(prefixCls + '-value-content')
            },
            [h(
              'span',
              {
                class : classNames(prefixCls + '-value-int')
              },
              [value]
            ) , this.renderPrecision(prefixCls)]
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