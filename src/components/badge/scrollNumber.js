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
      type : Number,
      default : 0
    },
    maxCount : Number
  },
  data () {
    return {
      sCount : this.count
    }
  },
  methods : {
    renderNumberElement (prefixCls) {
      const h = this.$createElement;
      if (this.sCount) {
        return getNumberArray(this.sCount).map((num , i) => {
          return this.renderNumber(num , i , prefixCls);
        })
      }
    },
    renderNumber (num , i , prefixCls) {
      
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