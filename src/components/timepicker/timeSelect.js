import classNames from "classnames";
function scrollTo (element , to , duration) {
  if (duration <= 0) {
    requestAnimationFrame(() => {
      element.scrollTop = to;
    });
    return;
  };
  const diff = to - element.scrollTop;
  const tick = diff / duration * 10;
  requestAnimationFrame(() => {
    element.scrollTop += tick;
    if (element.scrollTop >= to) {
      return;
    }
    scrollTo(element , to , duration - 10)
  })
};
export default {
  props : {
    type : String,
    currentDate : Date,
    prefixCls : String,
    visible : Boolean
  },
  data () {
    return {
      selectedIndex : 0,
      liHeight : 0
    }
  },
  watch : {
    visible (newVal) {
      if (newVal) {
        this.setScrollTop(this.liHeight);
      }
    }
  },
  methods : {
    setScrollTop (liHeight) {
      if (this.type === 'hh') {
        const hours = this.currentDate.getHours();
        scrollTo(this.$refs.select , hours * liHeight , 0);
        this.selectedIndex = hours;
      } else if (this.type === 'mm') {
        const minutes = this.currentDate.getMinutes();
        scrollTo(this.$refs.select , minutes * liHeight , 0);
        this.selectedIndex = minutes;
      } else if (this.type === 'ss') {
        const seconds = this.currentDate.getSeconds();
        scrollTo(this.$refs.select , seconds * liHeight , 0);
        this.selectedIndex = seconds;
      }
    },
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
            key : i,
            class : classNames(prefixCls + '-select-list' , this.selectedIndex === i ? 'selected' : ''),
            on : {
              click : evt => this.handleClick(evt , i)
            }
          },
          [i > 9 ? i : '0' + i]
        ));
      };
      return res;
    },
    handleClick (evt , i) {
      this.selectedIndex = i;
      scrollTo(this.$refs.select , i * this.liHeight , 150);
      const now = new Date(this.currentDate);
      if (this.type === 'hh') {
        now.setHours(i);
      } else if (this.type === 'mm') {
        now.setMinutes(i);
      } else if (this.type === 'ss') {
        now.setSeconds(i);
      };
      this.$emit('click' , now);
    },
  },
  mounted () {
    const ul = this.$refs.ul;
    const liBounding = ul.querySelector('li').getBoundingClientRect();
    const liHeight = (liBounding.height / 0.8).toFixed(0);
    this.liHeight = liHeight;
    this.setScrollTop(this.liHeight);
  },
  render () {
    const h = this.$createElement;
    const { prefixCls } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls + '-select'),
        ref : 'select'
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