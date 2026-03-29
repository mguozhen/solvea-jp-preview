export default function getList(type) {
  if (type === 'extension') {
    return [
      {
        name: '评论分析',
        free: { choose: true, text: '部分结论' },
        pro: { choose: true, text: '全部数据' },
        team: { choose: true, text: '全部数据' },
        ent: { choose: true, text: '全部数据' },
      },
      {
        name: 'Listing 优化',
        free: { choose: true },
        pro: { choose: true },
        team: { choose: true },
        ent: { choose: true },
      },
      {
        name: 'QA 分析',
        free: { choose: true },
        pro: { choose: true },
        team: { choose: true },
        ent: { choose: true },
      },
      {
        name: '评论下载',
        free: { choose: true },
        pro: { choose: true },
        team: { choose: true },
        ent: { choose: true },
      },
      {
        name: 'AI助手提问',
        free: { text: '40次/日' },
        pro: { text: '120次/日' },
        team: { text: '1000次/天' },
        ent: { text: '可定制' },
      },
    ];
  } else {
    return [
      {
        name: '评论分析',
        free: { choose: true, text: '部分数据' },
        pro: { choose: true, text: '全部数据' },
        team: { choose: true, text: '全部数据' },
        ent: { choose: true, text: '全部数据' },
      },
      {
        name: '品类评论分析',
        pro: { choose: true },
        team: { choose: true },
        ent: { choose: true },
      },
      {
        name: '自定义商品集分析',
        pro: { text: '20次/天' },
        team: { text: '100次/天' },
        ent: { text: '可定制' },
      },
      {
        name: '竞品对比',
        pro: { choose: true },
        team: { choose: true },
        ent: { choose: true },
      },
      {
        name: '自定义话题分析',
        team: { choose: true },
        ent: { choose: true },
      },
      {
        name: '定制品类标签',
        ent: { choose: true },
      },
      {
        name: '细分市场洞察',
        ent: { choose: true },
      },
      {
        name: '账号数量',
        free: { text: '单账号' },
        pro: { text: '单账号' },
        team: { text: '1主账号+3子账号' },
        ent: { text: '多账号管理' },
      },
      {
        name: '客户服务',
        free: { text: '免费资料' },
        pro: { text: '资料+线上社群+直播' },
        team: { text: '资料+线上社群+直播' },
        ent: { text: '1V1专业顾问' },
      },
    ];
  }
}
