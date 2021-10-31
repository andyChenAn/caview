import classNames from "classnames";
function getNumberArray (num) {
  return num ? num.toString().split('').reverse().map(i => {
    let current = Number(i);
    return isNaN(current) ? i : current
  }) : [];
};
export default {
  props : {
    prefixCls : {
      type : String,
      default : 'ca-scroll-number'
    },
    count : {
      type : [Number , String],
      default : 0
    },
    maxCount : [Number , String]
  },
  data () {
    return {
      scrollCount : this.count,
      startAnimate : true
    }
  },
  watch : {
    count () {
      this.lastCount = this.scrollCount;
      this.startAnimate = true;
      this.$forceUpdate();
    }
  },
  updated () {
    if (this.startAnimate) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.scrollCount = this.count;
        this.startAnimate = false;
      })
    }
  },
  methods : {
    renderNumberElement (prefixCls) {
      // this.scrollCount % 1 === 0这个判断就是用来判断this.scrollCount是否为一个数字，当数字超过maxCount时，this.scrollCount的值为maxCount+，这是一个字符串，所以就不能使用原来的方式进行展示
      if (this.scrollCount && this.scrollCount % 1 === 0) {
        return getNumberArray(this.scrollCount).map((num , index) => {
          return this.renderCurrentNumber(prefixCls , num , index);
        }).reverse()
      };
      return this.scrollCount;
    },
    getNumberPosition (num , index) {
      let currentCount = Math.abs(Number(this.scrollCount));
      let lastCount = Math.abs(Number(this.lastCount));
      let currentDigital = Math.abs(getNumberArray(this.scrollCount)[index]);
      let lastDigital = Math.abs(getNumberArray(this.lastCount)[index]);
      if (currentCount > lastCount) {
        if (currentDigital >= lastDigital) {
          return num + 10;
        };
        return num + 20;
      };
      if (currentDigital <= lastDigital) {
        return num + 10;
      };
      return num;
    },
    renderCurrentNumber (prefixCls , num , index) {
      const h = this.$createElement;
      if (typeof num === 'number') {
        const position = this.getNumberPosition(num , index);
        const removeTransition = this.startAnimate || getNumberArray(this.lastCount)[index] === undefined;
        return h(
          'span',
          {
            class : prefixCls + '-box',
            style : {
              transition : removeTransition ? 'none' : undefined,
              transform : `translateY(${-position * 100 + '%'})`
            },
            key : index
          },
          [this.renderNumberList(prefixCls , position)]
        )
      };
      // 当数量是负数时，这里渲染的是符号"-"
      return h(
        'span',
        {
          class : prefixCls + '-symbol',
          key : 'symbol'
        },
        [num]
      )
    },
    renderNumberList (prefixCls , position) {
      const h = this.$createElement;
      let children = [];
      // 这里渲染30个标签，是因为当从9变到0时，
      for (let i = 0 ; i < 30 ; i++) {
        children.push(h(
          'div',
          {
            class : classNames(prefixCls + '-list' , {current : position === i}),
            key : i
          },
          [i % 10]
        ))
      };
      return children;
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'span',
      {
        class : prefixCls
      },
      [this.renderNumberElement(prefixCls)]
    )
  }
}