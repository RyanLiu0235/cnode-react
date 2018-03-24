import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
const topics = [{
  "id": "5ab34443e7b166bb7b9ecd06",
  "author_id": "596a2b5edb0b6aec18a28569",
  "tab": "share",
  "content": "<div class=\"markdown-text\"><p>加入cnodejs社区也快1年了，没对社区做过什么贡献，看到社区要公测，刚好自己在公司使用node.js做自动化测试。\n这次我要对社区贡献一套UI自动化代码，别人如果想自己搭建一套社区的话，可以直接运行这套UI自动化代码来检查UI功能。\n平时工作时间比较忙，所以本周日我计划要做如下的事情，\n为了让大家都能看懂我的代码，我会使用行为驱动测试的方式来写代码，完成之后的代码大致如下：\n<img src=\"//dn-cnode.qbox.me/FpAr57XACJfit4rzN4sa2BBulYUj\" alt=\"image.png\">\n可以通过查阅文字描述了解测试的功能点。</p>\n<p>现在我想拉个微信群，如果各位有兴趣，我们可以一起来做。不会写代码也没有关系，可以帮助我们来写测试用例，或者给我们写的测试用例提建议。\n<img src=\"//dn-cnode.qbox.me/FlVUhc1vFM8HAnb0jH1hRHfT6Nu5\" alt=\"微信图片_20180322133956.png\"></p>\n</div>",
  "title": "为社区做贡献，帮社区写自动化测试代码",
  "last_reply_at": "2018-03-24T07:43:12.071Z",
  "good": false,
  "top": true,
  "reply_count": 12,
  "visit_count": 939,
  "create_at": "2018-03-22T05:50:59.209Z",
  "author": {
    "loginname": "imzengyang",
    "avatar_url": "https://avatars1.githubusercontent.com/u/22312483?v=4&s=120"
  }
}, {
  "id": "5aae1cc8f5dfc27d7ad98909",
  "author_id": "4efc278525fa69ac69000013",
  "tab": "share",
  "content": "<div class=\"markdown-text\"><blockquote>\n<p>更新：公测版本已经上线，请访问 <a href=\"http://egg.cnodejs.org/\">http://egg.cnodejs.org/</a> ，如遇到任何问题，请提交issue <a href=\"https://github.com/cnodejs/egg-cnode/issues\">https://github.com/cnodejs/egg-cnode/issues</a> ，谢谢各位。</p>\n</blockquote>\n<p>在近期，经过社区的小伙伴们的一起努力下，我们基于 Egg.js 将 nodeclub 进行了重写，重写后的代码仓库位于 <a href=\"https://github.com/cnodejs/egg-cnode\">https://github.com/cnodejs/egg-cnode</a> 。</p>\n<p>原版的 nodeclub 是 2012 年左右，在淘宝实习的某个同学实现的，当时的情况下，几乎没有多少人有过 Node.js 开发真实项目的经验，因此，该项目也存在诸多稚嫩之处，曾经也被 ITeye 的大佬批判过。</p>\n<p>后来在 alsotang、题叶等人的维护下，CNode 经历过一次较大的重构，但那次重构没有对原来的项目进行根本性的改动，重点是用户体验层面的改动。因此 nodeclub 依然保持着比较古老的方式，express + ejs + mongoose 等。原项目缺乏一些工程性的问题：</p>\n<ol>\n<li>基于 Callback 回调的风格，在维护上较为困难。</li>\n<li>没有健壮的进程守护机制，纯粹依靠 PM2 。</li>\n<li>目前该项目运行时也是单机模式，没有更好的可用性。</li>\n</ol>\n<p>本次我们基于 ES 8、Egg 框架，在不改写业务逻辑，不改写 UI 、交互的前提下，对该项目完成了重写。重写之后的 egg-cnode 具有更好的特性，尤其是在可维护性上，有极大程度上的改进，在测试覆盖率方面，以更少的代码量实现了更高的覆盖率。重写过程历时 3 个礼拜，贡献人数 10 人，以社区协作的形式完成。</p>\n<p>我们将在稍后的一个时间将新的版本进行上线测试，也欢迎大家关注我们新的代码仓库。最后感谢：<a href=\"/user/sinchang\">@sinchang</a>、<a href=\"/user/thonatos\">@thonatos</a>、<a href=\"/user/lqs469\">@lqs469</a> 等人参与的贡献。欢迎大家继续关注我们的项目。</p>\n</div>",
  "title": "【公测中】基于 Egg 的 CNode 社区",
  "last_reply_at": "2018-03-24T07:37:32.391Z",
  "good": false,
  "top": true,
  "reply_count": 62,
  "visit_count": 3426,
  "create_at": "2018-03-18T08:01:12.833Z",
  "author": {
    "loginname": "JacksonTian",
    "avatar_url": "https://avatars3.githubusercontent.com/u/327019?v=4&s=120"
  }
}]

class TopicList extends Component {
  render() {
    const _list = topics.map(item => {
      const topicLink = '/topic/' + item.id;
      return (
        <div className="topic_item" key={ item.id }>
          <div className="user_avatar">
            <img src={ item.author.avatar_url } alt={item.title} /> 
          </div> 
          <Link to={ topicLink } className="topic_title">
          	<h4>{ item.title }</h4> 
          </Link> 
          <div className="reply_view">
            <span className="reply_number">{ item.reply_count }</span> 
            <span className="seperate">/</span>
            <span className="view_number">{ item.visit_count}</span> 
          </div> 
        </div>
      )
    })
    return (
      <div>
	      <div className="topic_list">
	      	{ _list } 
	      	<span onClick={ this.props.checkMore } className="check_more">查看更多</span>
	      </div>
	    </div>
    )
  }
}

export default TopicList