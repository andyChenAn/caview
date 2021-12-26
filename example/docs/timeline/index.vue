<template>
  <div class="box">
    <div class="doc-title mb15">Timeline 时间轴</div>
    <div class="doc-desc mb15">展示时间流信息</div>
    <br />
    <br />
    <div class="title2 mb15">代码演示</div>
    <div class="inner">
      <div style="margin-bottom:20px">基础使用</div>
      <Timeline>
        <TimelineItem>1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem>1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事</TimelineItem>
        <TimelineItem>1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem>1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">自定义时间轴点颜色</div>
      <Timeline>
        <TimelineItem color="green">1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem color="red">1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事</TimelineItem>
        <TimelineItem color="blue">1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem color="gray">1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">最后一个节点</div>
      <Timeline pending="敬请期待...">
        <TimelineItem color="green">1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem color="red">1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事</TimelineItem>
        <TimelineItem color="blue">1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem color="gray">1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">倒序</div>
      <Timeline :reverse="reverse" pending="敬请期待...">
        <TimelineItem color="green">1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem color="red">1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事</TimelineItem>
        <TimelineItem color="blue">1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem color="gray">1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
      <button @click="toggle">Toggle</button>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px;">自定义时间轴</div>
      <Timeline>
        <TimelineItem>1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem color="#f60">
          <i class="iconfont icon-remove" slot="dot"></i>
          1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事
        </TimelineItem>
        <TimelineItem>1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem>1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">交替展示</div>
      <Timeline mode="alternate">
        <TimelineItem>1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem>
          1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事
        </TimelineItem>
        <TimelineItem>1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem>1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
    </div>
    <div class="inner">
      <div style="margin-bottom:20px">右边展示</div>
      <Timeline mode="right">
        <TimelineItem>1981年，刘德华出演电影处女作《彩云曲》，在片中扮演一个音乐班的学员 [35]  。1982年，在剧情片《投奔怒海》中饰演美军翻译官祖名，并凭借该片获得第2届香港电影金像奖最佳新演员提名</TimelineItem>
        <TimelineItem>
          1983年，与朱海玲 [36]  搭档主演剧情片《家在香港》，在片中饰演急功近利的青年人亚伦 [37]  。同年，主演动作片《毁灭号地车》，在片中与一个越南少女演绎了一段爱情故事
        </TimelineItem>
        <TimelineItem>1984年，在爱情片《停不了的爱》中饰演富家公子Eric [39]  。1985年，在与叶德娴共同主演的剧情片《法外情》中饰演少年得志的青年律师刘志鹏</TimelineItem>
        <TimelineItem>1986年，主演科幻冒险片《魔翡翠》，在片中饰演冒险专家猎鹰一号，这也是他首度出演科幻题材的电影 [41]  。同年，出演喜剧片《最佳福星》，在片中饰演身手矫健的特警组警员蓝保 [42]  。1987年，主演警匪片《肝胆相照》，在片中饰演亦正亦邪的犯罪集团成员阿定</TimelineItem>
      </Timeline>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reverse : false
    }
  },
  methods : {
    toggle () {
      this.reverse = !this.reverse;
    }
  }
}
</script>
<style lang="less" scoped>

</style>