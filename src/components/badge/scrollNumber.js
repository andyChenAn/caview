import classNames from "classnames";

function getNumberArray (num) {
  return num ? num.toString().split('').map(i => {
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
      sCount : this.count,
      startAnimate : true
    }
  },
  updated () {
    this.timeout = setTimeout(() => {
      this.sCount = this.count;
      this.startAnimate = false;
    })
  },
  watch : {
    count (newVal) {
      this.lastCount = this.sCount;
      this.startAnimate = true
    }
  },
  methods : {
    renderNumberElement (prefixCls) {
      if (this.sCount) {
        return getNumberArray(this.sCount).map((num , index) => {
          return this.renderCurrentNumber(prefixCls , num , index);
        })
      };
      return this.sCount;
    },
    getNumberPosition (num , index) {
      let currentCount = Math.abs(Number(this.sCount));
      let lastCount = Math.abs(Number(this.lastCount));
      let currentDigital = Math.abs(getNumberArray(this.sCount)[index]);
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
        const removeTransition = this.startAnimate || getNumberArray(this.lastCount)[index] == undefined;
        return h(
          'span',
          {
            class : prefixCls + '-box',
            style : {
              transition : removeTransition ? 'none' : undefined,
              transform : `translateY(${-position * 100 + '%'})`
            },
          },
          [this.renderNumberList(prefixCls , position)]
        )
      }
    },
    renderNumberList (prefixCls , position) {
      const h = this.$createElement;
      let children = [];
      for (let i = 0 ; i < 30 ; i++) {
        children.push(h(
          'div',
          {
            class : classNames(prefixCls + '-list' , {current : position === i})
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