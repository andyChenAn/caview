import Statistic , { statisticProps } from './index';
import _extends from '@babel/runtime/helpers/extends';
import { formatCountdown } from './utils';
export default {
  props : _extends({} , statisticProps , {
    format : {
      type : String,
      default : 'HH:mm:ss'
    }
  }),
  data () {
    this.timerId = null;
    return {};
  },
  mounted () {
    this.countdown();
  },
  updated () {
    this.countdown();
  },
  beforeDestroy () {
    this.stopTimer();
  },
  methods : {
    formatCountdown (ref) {
      return formatCountdown(ref.value , this.$props.format);
    },
    countdown () {
      let { value } = this.$props;
      if (value >= Date.now()) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },
    startTimer () {
      if (this.timerId) {
        return;
      }
      this.timerId = setInterval(() => {
        this.$refs.statistic.$forceUpdate();
        this.countdown();
      } , 1000 / 30)
    },
    stopTimer () {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
        // 加这个判断的前提是，当组件销毁的时候也是会调用stopTimer方法的，所以还需要再判断一下，不然也会触发finish事件
        if (this.$props.value < Date.now()) {
          this.$emit('finish');
        }
      }
    }
  },
  render () {
    const h = this.$createElement;
    return h(
      Statistic,
      {
        ref : 'statistic',
        props : _extends({} , this.$props , {
          formatter : this.formatCountdown
        })
      }
    )
  }
}