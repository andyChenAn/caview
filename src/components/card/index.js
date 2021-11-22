import classNames from "classnames";
import Loading from '../loading';
import CardMeta from './meta';
export default {
  props : {
    title : {
      type : String,
      default : ''
    },
    border : {
      type : Boolean,
      default : true
    },
    // 可以是default，small
    size : {
      type : String,
      default : 'default'
    },
    prefixCls : {
      type : String,
      default : 'ca-card'
    },
    loading : {
      type : Boolean,
      default : false
    },
    // 鼠标悬停的hover效果
    hoverable : {
      type : Boolean,
      default : false
    }
  },
  methods : {
    renderHeader (prefixCls) {
      const title = this.$props.title || this.$slots.title;
      const h = this.$createElement;
      const { extra } = this.$slots;
      return title ? h(
        'div',
        {
          class : classNames(prefixCls + '-head')
        },
        [
          h(
            'div',
            {
              class : classNames(prefixCls + '-head-box')
            },
            [
              h(
                'div',
                {
                  class : classNames(prefixCls + '-head-title')
                },
                [title]
              ),
              extra && h(
                'div',
                {
                  class : classNames(prefixCls + '-extra')
                },
                [extra]
              )
            ]
          )
        ]
      ) : null
    },
    renderContent (prefixCls) {
      const h = this.$createElement;
      const { loading } = this.$props;
      return h(
        'div',
        {
          class : classNames(prefixCls + '-body')
        },
        [
          loading ? h(
            'div',
            {
              class : classNames(prefixCls + '-loading')
            },
            [
              h(
                Loading,
                {
                  loading : loading
                }
              )
            ]
          ) : this.$slots.default
        ]
      )
    },
    renderCover (prefixCls) {
      const h = this.$createElement;
      const { cover } = this.$slots;
      return cover ? h(
        'div',
        {
          class : classNames(prefixCls + '-cover')
        },
        [cover]
      ) : null
    },
    renderActions (prefixCls) {
      const h = this.$createElement;
      const { actions } = this.$slots;
      let res = [];
      if (actions) {
        const children = actions.filter(c => c.tag || c.text.trim() !== '');
        children.map(child => {
          res.push(h(
            'li',
            [child]
          ))
        });
        return h(
          'ul',
          {
            class : classNames(prefixCls + '-actions')
          },
          [res]
        )
      }
    }
  },
  render () {
    const h = this.$createElement;
    const { prefixCls , border , size , hoverable } = this.$props;
    return h(
      'div',
      {
        class : classNames(prefixCls , border ? prefixCls + '-border' : null , size === 'small' ? prefixCls + '-small' : null , hoverable ? prefixCls + '-hover' : null)
      },
      [
        this.renderHeader(prefixCls),
        this.renderCover(prefixCls),
        this.renderContent(prefixCls),
        this.renderActions(prefixCls)
      ]
    )
  }
}