import { getI18nFromTargetLang } from '@/i18n';

// 行业解决分类
export const getSolutionsLabelMap = (lang) => {
  return {
    // 电商行业
    'e-commerce-industry': getI18nFromTargetLang(
      'layout.Industry_ECommerce',
      lang,
    ),
    // 电商行业 - 细分
    'furniture-and-home-furnishings': getI18nFromTargetLang(
      'layout.Industry_HomeFurnishingsFurniture',
      lang,
    ),
    'consumer-electronics': getI18nFromTargetLang(
      'layout.Industry_ConsumerElectronics',
      lang,
    ),

    // 出行行业
    'mobility-industry': getI18nFromTargetLang(
      'layout.Industry_Mobility',
      lang,
    ),
    // 出行行业 - 细分
    'short-distance-travel': getI18nFromTargetLang(
      'layout.Industry_ShortDistanceTravel',
      lang,
    ),
    'automobile-manufacturing': getI18nFromTargetLang(
      'layout.Industry_AutomotiveManufacturing',
      lang,
    ),
    'auto-parts-and-modification': getI18nFromTargetLang(
      'layout.Industry_AutomotivePartsModifications',
      lang,
    ),

    // 信息技术行业
    'information-technology-industry': getI18nFromTargetLang(
      'layout.Industry_InformationTechnologyIndustry',
      lang,
    ),
    // 信息技术行业 - 细分
    'software-services': getI18nFromTargetLang(
      'layout.Industry_SoftwareServices',
      lang,
    ),

    // 金融
    'financial-services': getI18nFromTargetLang(
      'layout.Industry_FinancialServices',
      lang,
    ),
    // 金融 - 细分
    banking: getI18nFromTargetLang('layout.Industry_BankingSector', lang),
    insurance: getI18nFromTargetLang('layout.Industry_Insurance', lang),

    // 生命健康行业
    'lifeSciences-healthcare': getI18nFromTargetLang(
      'layout.Industry_LifeSciencesHealthcare',
      lang,
    ),
    // 生命健康行业 - 细分
    'equipment-manufacturing': getI18nFromTargetLang(
      'layout.Industry_MedicalEquipmentManufacturing',
      lang,
    ),
    'medical-services': getI18nFromTargetLang(
      'layout.Industry_HealthcareServices',
      lang,
    ),
  };
};

//行业解决图片
export const solutionsImageMap = {
  // 家具
  'furniture-and-home-furnishings':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/2b40d674-bd7f-484f-b38b-63e38c288737.png',
  // 消费电子
  'consumer-electronics':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/d1ed8f14-52b3-4c3d-b6c1-2609c781369f.png',
  // 短途出行
  'short-distance-travel':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/9bde626b-e619-4737-8f5c-9e15b216c91e.png',
  // 汽车制造
  'automobile-manufacturing':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/84e19cc4-e992-4149-bbf0-6a81c10a80bc.png',
  // 汽车零部件
  'auto-parts-and-modification':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/6d147b5c-bf8a-4204-a2f9-f02d9fc79cb9.png',
  // 软件服务
  'software-services':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/3170415e-6e4d-4909-a81b-aede38d91647.png',
  // 银行
  banking:
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/f54c7fed-4a94-403a-b423-ab65b9dc79b5.png',
  // 保险
  insurance:
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/9f025af0-6355-4c98-8c4a-bcd4e9c5da5a.png',
  // 医疗器械
  'equipment-manufacturing':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/e088ef5c-add6-4ab9-bd9d-b5f0e7b940bd.png',
  // 医疗服务
  'medical-services':
    'https://cdn.shulex-voc.com/shulex/upload/2025-04-16/a407a21b-3fa0-4af4-85c4-f8f400c143f7.png',
};

// 行业解决方案数据 - 中文
export const solutionsDataCN = [
  // 电商行业
  {
    // 家具行业
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title: '客服人员招聘和培训周期长',
          desc: '家居行业客服专业性强，琐碎的工作流程多，一般培训一个客服需要3个月左右时间，为了准备大促等高峰期还得提前准备客服人才，客服岗位还存在人员不稳定的情况，人力成本花费大。',
        },
      ],
      [
        {
          title: '德国、法国等小语种欧洲站点服务',
          desc: '欧洲市场是跨境家居行业的重要战场，小语种客服人才的缺乏导致客户服务不能极致，大多数欧洲订单通过英语客服进行回复，客户体验不佳，对话效率较低。',
        },
      ],
      [
        {
          title: '家居行业大件及多件物流客服问题',
          desc: '大件家居产品经常出现包裹分单、拆单、多包裹发货等情况，有时一个订单通过多家物流机构派发，客户咨询物流问题时，客服需要识别客户订单情况并查询多个站点，耗时耗力。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI自动学习复杂产品知识',
          desc: 'Solvea 支持您通过多种形式学习知识，不仅如此，AI 还具备从历史消息中学习知识的能力，无需人工额外整理就可以沉淀企业专属知识资产。',
        },
      ],
      [
        {
          title: '支持小语种回复',
          desc: 'Solvea 可以支持各种小语种工作，法、德、日、西班牙、葡萄牙等不在话下。同时 AI 的能力支持提供更佳回复效果及本土化服务水平，提升客户体验。',
        },
      ],
      [
        {
          title: '全自动查询物流和识别服务',
          desc: 'Solvea深度集成积家ERP等主流物流系统和亚马逊平台，针对家具产品配件多、发货仓库分散的特点，AI 全自动查询 n 变 1，方便客户实时追踪订单进度。',
        },
      ],
    ],
  },
  {
    // 消费电子
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title: '产品迭代快导致知识滞后',
          desc: '客户咨询新型号参数、兼容性问题时回复不准确、咨询量大。人工更新知识库效率低，错误率高。',
        },
      ],
      [
        {
          title: '全球技术咨询响应不足',
          desc: '欧美用户夜间设备故障咨询（如死机、系统崩溃）需等待6-8小时，紧急需求流失率高达30%。',
        },
      ],
      [
        {
          title: '促销期售后压力激增',
          desc: '大促期间退货/换货咨询量成倍增长，物流跟踪与政策解释等基础问题消耗人力时间。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI实时同步产品库',
          desc: '对接品牌数据库自动解析技术参数，支持多语言问答。',
        },
      ],
      [
        {
          title: '智能诊断+主动预警',
          desc: '用户上传故障视频后，AI比对案例库推送解决方案（如“强制重启步骤”）；高频问题自动触发系统弹窗预警（如“Wi-Fi断连补丁下载”）。',
        },
      ],
      [
        {
          title: '全自动化售后流水线',
          desc: 'AI识别退货原因后，自动触发物流单生成并推送进度，政策问题通过合规性AI校验回复。 ',
        },
      ],
    ],
  },
  // 出行行业
  {
    // 短途出行（如电动滑板车/共享单车）
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title: '跨语言与时区服务瓶颈',
          desc: '欧美市场需覆盖英语、西班牙语、法语及北欧小语种，专职翻译成本高；时区差异导致夜间咨询响应延迟（8-12小时），用户体验受损。',
        },
      ],
      [
        {
          title: '复杂技术问题远程支持低效',
          desc: '电池故障、设备连接等问题需多轮沟通（平均4-5轮）才能定位，缺乏本地维修网点时，远程指导难度大。',
        },
      ],
      [
        {
          title: '跨境物流与售后处理繁琐',
          desc: '国际订单物流状态分散（如清关进度、税费查询），售后问题需反复确认损坏细节，人工处理效率低。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI多语言+7×24时区覆盖',
          desc: '自动识别用户语言并生成本土化回复，支持北欧语等长尾语种；AI无缝接管夜间咨询，秒级响应（如“电动滑板车无法充电”），时差问题归零。',
        },
      ],
      [
        {
          title: '智能诊断与AR远程指导',
          desc: '用户提交故障描述/图片后，AI匹配知识库推送解决方案（如蓝牙重置步骤）；复杂问题通过AR标注设备接口，叠加动画演示拆解流程，减少沟通轮次50%。',
        },
      ],
      [
        {
          title: '全链路自动化服务',
          desc: [
            {
              type: 'point',
              text: '物流集成：输入订单号即自动聚合订单和物流数据，实时反馈位置、状态及预计送达时间。',
            },
            {
              type: 'point',
              text: '售后预判：AI通过多轮追问（如“损坏部位照片”“错误代码”）收集信息，自动触发维修工单或配件邮寄流程，降低人工介入。',
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车制造
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: '专业咨询门槛高',
          desc: '自动驾驶设置、车机互联等复杂问题需专家支持，单次通话成本高。',
        },
      ],
      [
        {
          title: '合规风险监控不足',
          desc: '欧盟GDPR、美国柠檬法（Lemon Law）等法规复杂，人工对话监管遗漏率高。',
        },
      ],
      [
        {
          title: '小语种服务缺口大',
          desc: '中东、东欧市场咨询需阿拉伯语、波兰语支持，外包翻译成本高，人难招。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '动态工单路由系统',
          desc: [
            {
              type: 'point',
              text: '专家级问题直通：AI 自动识别问题难度及风险，当用户描述“自动驾驶突然退出”时，AI自动标记为高风险工单，转接至资深工程师并附车辆日志。',
            },
            {
              type: 'point',
              text: '资源智能调度：根据工程师技能标签（如“混动系统专家”）、地理位置、语言能力匹配工单。',
            },
          ],
        },
      ],
      [
        {
          title: '多通道智能触达',
          desc: '通过车机系统弹窗、APP推送、社交媒体私信同步召回信息，AI跟踪用户阅读状态并二次提醒。',
        },
      ],
      [
        {
          title: '全球化合规与文化引擎',
          desc: [
            {
              type: 'point',
              text: '实时合规监控：AI检测对话中敏感词（如“终身保修”“绝对安全”），自动替换为合规表述（如“10年质保”“符合碰撞测试标准”）。',
            },
            {
              type: 'point',
              text: '文化适配库：',
              subList: [
                {
                  type: 'point',
                  text: '中东地区分配男性客服AI头像。',
                },
                {
                  type: 'point',
                  text: '印度用户默认显示印地语+英语双语回复。',
                },
                {
                  type: 'point',
                  text: '拉美市场嵌入本地俚语库',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车零配件及改造
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: '配件适配查询低效',
          desc: '人工核对车型年份、发动机型号耗时20+分钟/单，错误率高。',
        },
      ],
      [
        {
          title: '安装指导依赖人工',
          desc: '零配件安装高度依赖人工，用户自己安装复杂，跨境用户因语言障碍误操作，增加退换货成本。',
        },
      ],
      [
        {
          title: '物流追踪分散',
          desc: '清关进度需手动查询DHL/海关系统，日均耗时3小时/客服。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '智能配件匹配引擎',
          desc: '用户上传VIN码或车型照片，AI自动推荐兼容配件并提示改装风险（如“该刹车片需同步升级卡钳”）。',
        },
      ],
      [
        {
          title: 'AI 实时指导零配件安装',
          desc: '用户实时拍图，AI 提供指引，帮助用户一步一步安装。',
        },
      ],
      [
        {
          title: '跨境物流监控平台',
          desc: 'AI聚合40+物流商数据，输入订单号即显示清关文件状态、税费金额及预计放行时间。',
        },
      ],
    ],
  },
  // 信息技术行业
  {
    // 软件服务
    slug: 'software-services',
    painPoints: [
      [
        {
          title: '高频基础问题占用高级资源',
          desc: '60%工单为密码重置、账单查询等重复问题，导致技术专家被迫处理低价值请求，人力量费严重。',
        },
      ],
      [
        {
          title: '新功能上线引发咨询洪峰',
          desc: '版本更新后咨询量暴增，日常客服配备支撑不足，平均响应延迟，导致用户流失率提升。',
        },
      ],
      [
        {
          title: '跨时区企业客户服务断层',
          desc: '亚太客户在欧美团队非工作时段的紧急需求（如API接口报错）无法即时响应，故障恢复时间延长50%。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '全自动账号管理引擎',
          desc: [
            {
              type: 'point',
              text: '用户语音输入“升级到企业版”，AI自动调取Stripe 等平台支付记录，生成账单对比表并一键完成升级。',
            },
            {
              type: 'point',
              text: '权限变更实时同步至企业管理后台，自动化管理账号权限。',
            },
          ],
        },
      ],
      [
        {
          title: 'AI 知识库自学习',
          desc: [
            {
              type: 'point',
              text: 'AI 在迭代文档发布后即刻自动学习迭代文档，用户提问“新仪表盘如何设置”时，自动关联知识库推送带标注的界面截图。',
            },
            {
              type: 'point',
              text: '高频问题自动学习记录入库，下次再问 AI 自动回复。',
            },
          ],
        },
      ],
      [
        {
          title: 'AI 全时段多语言接管，紧急问题转人工',
          desc: '全球用户可通过 LiveChat、邮件等形式与 AI 客服进行对话，50+全球语言适配用户语言进行回复。当遇到系统报错等无法处理紧急问题，自动转人工并且消息提醒相关人员处理。',
        },
      ],
    ],
  },
  // 金融
  {
    // 银行
    slug: 'banking',
    painPoints: [
      [
        {
          title: '合规监管高压下的操作风险',
          desc: '新员工需记忆2000+条监管话术（如隐私保护调理），培训周期长达6个月，上岗初期违规率超高。',
        },
      ],
      [
        {
          title: '理财咨询专业度不足',
          desc: '理财经理资源稀缺，80%普通客户仅能获得标准化产品推荐，高净值客户个性化需求满足率不足。',
        },
      ],
      [
        {
          title: '跨时区服务断裂',
          desc: '海外紧急需求（盗刷/大额转账）响应延迟4+小时，多时区业务协同低效，重复核验与合规错漏导致体验割裂。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '全链路合规引擎',
          desc: 'AI 学习 GDPR 等银行所需各类规范文件，对于高风险话术自动规避。',
        },
      ],
      [
        {
          title: 'AI驱动的智能财富管家',
          desc: '整合账户数据（现金流、风险偏好）、外部数据（社交媒体投资话题关注），实时更新客户画像。',
        },
      ],
      [
        {
          title: 'AI跨时区引擎',
          desc: 'AI 7×24全球智能路由，秒级响应紧急操作（如自动冻结账户），实时合规适配+多时区业务自动化协同，响应时效缩至90秒。',
        },
      ],
    ],
  },
  {
    // 保险
    slug: 'insurance',
    painPoints: [
      [
        {
          title: '理赔初审效率低下',
          desc: '人工核对医疗单据、事故照片平均耗时72小时，客户投诉率高。',
        },
      ],
      [
        {
          title: '条款解释模糊引发纠纷',
          desc: '“免赔额”“除外责任”等术语理解偏差导致诉讼案居高不下。',
        },
      ],
      [
        {
          title: '欺诈案件识别滞后',
          desc: '人工筛查骗保线索漏检率高导致保险公司造成实际金额损失，时效滞后无法追踪。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI自动化理赔流水线',
          desc: [
            {
              type: 'point',
              text: '用户上传医疗报告后，AI调用OCR提取关键字段（如“骨折部位”），对比保单条款输出结论。',
            },
            {
              type: 'point',
              text: '车险定损中，AI比对事故照片与历史案例库，快速评估初步维修报价。',
            },
          ],
        },
      ],
      [
        {
          title: '条款可视化决策树',
          desc: [
            {
              type: 'point',
              text: '用户提问“宠物医疗险是否涵盖绝育”时，AI生成交互流程图：绝育手术 → 疾病治疗需要？ → 是→涵盖 / 否→不涵盖；',
            },
            {
              type: 'point',
              text: '复杂场景（如台风导致房屋进水）自动关联气象局灾害记录。',
            },
          ],
        },
      ],
      [
        {
          title: '多维度反欺诈引擎',
          desc: '通过对话情绪分析（如过度强调细节）、历史报案频率、地理位置冲突（车辆同一时间出现在两地）标记高风险案件。',
        },
      ],
    ],
  },
  // 生命健康行业
  {
    // 医药/设备制造
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title: '跨国咨询语言与法规隔阂',
          desc: '海外用户线上咨询时面临语言障碍，且各国医疗设备法规差异导致合规解答效率低下。',
        },
      ],
      [
        {
          title: '远程设备故障诊断低效',
          desc: '线上文字描述难以定位复杂设备问题，传统客服无法直观指导客户排查故障。',
        },
      ],
      [
        {
          title: '技术咨询流转断层',
          desc: '客户问题需多部门协同（如技术、法务），线上流程中断导致响应延迟。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI多语言合规引擎',
          desc: '客户通过手机摄像头展示设备，AI标记故障点并叠加维修动画，专家远程标注指导操作步骤。',
        },
      ],
      [
        {
          title: 'AI 实时指导设备调试及故障排查',
          desc: '用户实时拍图，AI 提供指引，提供相关故障排查及解决方案。',
        },
      ],
      [
        {
          title: '智能工单路由中台',
          desc: 'AI自动解析问题类型，跨部门工单实时流转并附历史案例参考，构建线上协同闭环。',
        },
      ],
    ],
  },
  {
    // 医疗服务
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: '高峰期咨询量大，占线率高',
          desc: '高峰期客服占线率高，导致患者平均等待时长高，缺少服务带来的投诉率居高不下。',
        },
      ],
      [
        {
          title: '分诊依赖护士经验',
          desc: '新手护士误判症状概率达30%，导致急诊资源浪费（如将心绞痛误判为胃痛）。',
        },
      ],
      [
        {
          title: '隐私泄露风险高',
          desc: '传统客服系统未脱敏对话，传统客服对话监控能力差，易发生数据泄露事件。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '智能分流与预约优化系统',
          desc: 'AI自动应答高频咨询（如挂号流程、科室介绍），释放人工客服压力；根据科室实时接诊能力动态分配预约时段，降低对话占线率。',
        },
      ],
      [
        {
          title: 'AI辅助分诊决策引擎',
          desc: '患者在线描述症状后，AI通过多轮交互问答（如疼痛部位、持续时间）关联临床指南生成预检分级，辅助护士精准分诊，降低误判率。',
        },
      ],
      [
        {
          title: '全链路隐私防火墙',
          desc: '对话内容实时脱敏（自动屏蔽 ID 号、病历号），加密存储通讯记录，并设置权限分级管理，确保敏感信息仅授权人员可追溯。',
        },
      ],
    ],
  },
];

// 行业解决方案数据 - 英文
export const solutionsDataEN = [
  // 电商行业
  {
    // 家具行业
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title:
            'Recruitment & training for customer service employees is time-costing',
          desc: [
            {
              type: 'point',
              text: 'As customer service in the home furnishing industry is highly specialized, requiring extensive product knowledge, the training process shall take about 3 months.',
            },
            {
              type: 'point',
              text: 'Labor instability and pre-peak season staffing challenges increase costs.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Lack of multilingual support for European markets (e.g., German, French)',
          desc: 'Reliance on English CS degrades customer experience and efficiency.',
        },
      ],
      [
        {
          title: 'Logistics complexities for bulky/multi-piece items',
          desc: 'Bulky furniture items often involve split shipments, manual order partitioning, or multi-parcel dispatch. In some cases, a single order may be fulfilled by multiple logistics carriers. When customers inquire about shipping status, support must manually identify the order status and track parcels across different platforms—a time-consuming and labor-intensive process.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Automated product knowledge self-learning',
          desc: 'AI absorbs historical data and documentation to build proprietary knowledge.',
        },
      ],
      [
        {
          title: 'Multilingual support',
          desc: "Solvea's AI overcomes these barriers by delivering native-level proficiency in all major European and Asian languages ((covering French, German, Japanese, Spanish, Portuguese, etc), and automating culturally-adapted responses that outperform human agents.",
        },
      ],
      [
        {
          title: 'Fully automatic logistics query and identification service',
          desc: 'Solvea is deeply integrated with mainstream logistics systems. Automatically aggregates tracking data of dispersed warehouses and multi-accessory shipments, making it convenient for customers to track order progress in real time. ',
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22539&token=680B41FCE4B02D077740A4C4',
    recommendQuestions: [
      'Home_Furnishings_Q1',
      'Home_Furnishings_Q2',
      'Home_Furnishings_Q3',
    ],
  },
  {
    // 消费电子
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title: 'Fast product iteration leads to knowledge lag',
          desc: "When customers inquire about new model's parameters and compatibility issues, the responses are inaccurate and the number of inquiries is large. Manual updating of the knowledge base is inefficient and has a high error rate.",
        },
      ],
      [
        {
          title: 'Insufficient response to global technical consultation',
          desc: 'European and American users need to wait 6-8 hours for equipment failure consultation (such as freezing and system crash) at night, and the loss rate of emergency demand is as high as 30%.',
        },
      ],
      [
        {
          title: 'After-sales pressure surges during promotions',
          desc: 'The number of return/exchange inquiries during promotions shall double, and basic issues such as logistics tracking and policy clarification consume lots of time.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Real-time AI Product Database Synchronization',
          desc: 'AI syncs with product databases in real time to auto-process specs and handle multilingual queries.',
        },
      ],
      [
        {
          title: 'Intelligent diagnosis & Proactive Alerts',
          desc: 'After the user uploads the troubleshooting video, AI cross-references the case library and deliver solutions (such as "forced restart steps"); Automatically triggers system pop-up alerts for high-frequency issues (e.g., "Wi-Fi disconnection patch download")',
        },
      ],
      [
        {
          title: 'Fully automated after-sales assembly line',
          desc: 'AI identifies return reasons and automatically generates shipping labels and pushes real-time tracking updates. Policy-related inquiries are processed through compliance AI verification for accurate responses',
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22540&token=680B50BCE4B0DAF871C17A4C',
    recommendQuestions: [
      'Consumer_Electronics_Q1',
      'Consumer_Electronics_Q2',
      'Consumer_Electronics_Q3',
    ],
  },
  // 出行行业
  {
    // 短途出行（如电动滑板车/共享单车）
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title: 'Cross-language & timezone service bottlenecks',
          desc: [
            {
              type: 'point',
              text: 'Requires coverage of English, Spanish, French, and Nordic languages in European and the US markets, with high costs for dedicated translators.',
            },
            {
              type: 'point',
              text: 'Timezone differences cause 8-12 hour delays for nighttime inquiries, degrading user experience.',
            },
          ],
        },
      ],
      [
        {
          title: 'Inefficient remote support for technical issues',
          desc: [
            {
              type: 'point',
              text: 'Battery failures and device connection problems require 4-5 communication rounds on average to diagnose.',
            },
            {
              type: 'point',
              text: 'Remote guidance becomes particularly challenging without local repair networks.',
            },
          ],
        },
      ],
      [
        {
          title: 'Cumbersome cross-border logistics & after-sales processing',
          desc: [
            {
              type: 'point',
              text: 'International order logistics are fragmented (e.g. customs clearance progress, tax queries).',
            },
            {
              type: 'point',
              text: 'After-sales issues require repeated confirmation of damage details, resulting in low manual processing efficiency.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI multilingual + 24/7 timezone coverage',
          desc: [
            {
              type: 'point',
              text: 'Auto-detects user language and generates localized responses, supporting long-tail languages like Nordic dialects.',
            },
            {
              type: 'point',
              text: `AI seamlessly handles nighttime inquiries with second-level response (e.g. "E-scooter won't charge"), eliminating timezone issues.`,
            },
          ],
        },
      ],
      [
        {
          title: 'Smart diagnostics & AR remote guidance',
          desc: [
            {
              type: 'point',
              text: 'After users submit fault descriptions/photos, AI matches knowledge base to deliver solutions (e.g. Bluetooth reset steps).',
            },
            {
              type: 'point',
              text: 'For complex issues: AR annotations highlight device interfaces with animated disassembly guides, reducing communication rounds by 50%.',
            },
          ],
        },
      ],
      [
        {
          title: 'End-to-end automated service',
          desc: [
            {
              type: 'point',
              text: 'Logistics integration: Input order number to auto-consolidate order & shipping data, with real-time updates on location/status/ETA.',
            },
            {
              type: 'point',
              text: 'After-sales pre-judgment: AI collects info via multi-step queries (e.g. "Damage photos", "error codes"), then auto-triggers repair tickets or spare parts dispatch, minimizing human intervention.',
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22536&token=680B5052E4B0DAF871C17A42',
    recommendQuestions: [
      'Short_Distance_Travel_Q1',
      'Short_Distance_Travel_Q2',
      'Short_Distance_Travel_Q3',
    ],
  },
  {
    // 汽车制造
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: 'Requires expert-level support',
          desc: 'Complex issues like autonomous driving settings and vehicle connectivity require specialist support, resulting in high per-call costs.',
        },
      ],
      [
        {
          title: 'Inadequate compliance risk monitoring',
          desc: 'Regulations like EU GDPR and the U.S. Lemon Law are intricate, leading to high oversight rates in manual dialogue reviews.',
        },
      ],
      [
        {
          title: 'Shortage of multilingual support',
          desc: 'Middle Eastern and Eastern European markets demand Arabic and Polish language capabilities, but outsourcing translations is costly, and hiring qualified personnel is challenging.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Dynamic Ticketing Routing System',
          desc: [
            {
              type: 'point',
              text: 'Priority escalation for expert-level issues: AI automatically assesses problem complexity and risk. For example, when a user reports "autonomous driving suddenly disengaged," the system flags it as a high-priority ticket, routes it to senior engineers, and attaches vehicle logs.',
            },
            {
              type: 'point',
              text: 'Intelligent resource allocation: Assigns tickets based on engineer expertise (e.g., "hybrid systems specialist"), location, and language proficiency.',
            },
          ],
        },
      ],
      [
        {
          title: 'Multi-Channel Smart Notifications',
          desc: 'Delivers recall alerts via in-vehicle pop-ups, app notifications, and social media DMs. AI tracks user read status and sends follow-up reminders.',
        },
      ],
      [
        {
          title: 'Global Compliance & Cultural Adaptation Engine',
          desc: [
            {
              type: 'point',
              text: 'Real-time compliance monitoring: AI detects sensitive terms (e.g., "lifetime warranty," "100% safe") and replaces them with compliant phrasing (e.g., "10-year warranty," "meets crash-test standards").',
            },
            {
              type: 'point',
              text: 'Cultural adaptation database:',
              subList: [
                {
                  type: 'point',
                  text: "Middle East: AI agent's avatars set to male-presenting figures by default.",
                },
                {
                  type: 'point',
                  text: 'India: Displays bilingual Hindi-English replies by default.',
                },
                {
                  type: 'point',
                  text: 'Latin America: Incorporates localized slang libraries.',
                },
              ],
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22537&token=680B498FE4B02D077740A5B0',
    recommendQuestions: ['Automobile_Manufacturing_Q1'],
  },
  {
    // 汽车零配件及改造
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: 'Inefficient checks on parts compatibility',
          desc: 'Manual verification of vehicle year/engine model consumes 20+ minutes per order with high error rates.',
        },
      ],
      [
        {
          title: 'Over-reliance on human support for installation guidance',
          desc: 'Complex self-installation processes and language barriers for international users lead to operational errors and increased return costs.',
        },
      ],
      [
        {
          title: 'Fragmented logistics tracking',
          desc: 'Customs clearance status requires manual checks across DHL/customs systems, wasting 3 daily hours per support.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Smart Engine for Parts Matching',
          desc: [
            {
              type: 'point',
              text: 'AI recommends compatible parts via VIN/vehicle photo uploads',
            },
            {
              type: 'point',
              text: 'Flags modification risks (e.g., "These brake pads require caliper upgrades")',
            },
          ],
        },
      ],
      [
        {
          title: 'AI-powered Real-Time Installation Guide',
          desc: 'Provides step-by-step visual instructions via live photo analysis',
        },
      ],
      [
        {
          title: 'Cross-Border Logistics Dashboard',
          desc: [
            {
              type: 'point',
              text: 'Consolidates data from 40+ carriers',
            },
            {
              type: 'point',
              text: 'Displays real-time:',
              subList: [
                {
                  type: 'point',
                  text: 'Customs document status',
                },
                {
                  type: 'point',
                  text: 'Duty/tax estimates',
                },
                {
                  type: 'point',
                  text: 'Expected clearance time',
                },
              ],
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22538&token=680B508CE4B02D077740A698',
    recommendQuestions: [
      'Auto_Parts_and_Modification_Q1',
      'Auto_Parts_and_Modification_Q2',
      'Auto_Parts_and_Modification_Q3',
    ],
  },
  // 信息技术行业
  {
    // 软件服务
    slug: 'software-services',
    painPoints: [
      [
        {
          title: 'High-volume basic queries drain senior resources',
          desc: '60% of tickets are repetitive (e.g., password resets, billing inquiries), forcing technical experts to handle low-value requests—a severe resource waste.',
        },
      ],
      [
        {
          title: 'New Feature launches trigger support surges',
          desc: 'Post-update inquries spikes overwhelm daily support capacity, causing delayed responses and increased user churn.',
        },
      ],
      [
        {
          title: 'Time-zone gaps fracture enterprise service',
          desc: 'APAC clients face 50% longer downtime for urgent issues (e.g., API failures) during European/US team off-hours.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Fully Automated Account Management Engine',
          desc: [
            {
              type: 'point',
              text: 'Voice command (e.g., "Upgrade to Enterprise") triggers AI to:',
              subList: [
                {
                  type: 'point',
                  text: 'Pull payment records (Stripe, PayPal, etc)',
                },
                {
                  type: 'point',
                  text: 'Generate comparative billing reports',
                },
                {
                  type: 'point',
                  text: 'Execute one-click upgrades',
                },
              ],
            },
            {
              type: 'point',
              text: 'Permission changes sync instantly to admin consoles',
            },
          ],
        },
      ],
      [
        {
          title: 'Self-Learning AI Knowledge Base',
          desc: [
            {
              type: 'point',
              text: `Auto-ingests release docs to answer new feature-related queries (e.g., annotated screenshots for "new dashboard setup")`,
            },
            {
              type: 'point',
              text: `Logs high-frequency issues for instant future replies`,
            },
          ],
        },
      ],
      [
        {
          title: '24/7 Multilingual AI with Human Escalation',
          desc: [
            {
              type: 'point',
              text: 'Processes global requests via LiveChat/email in 50+ languages',
            },
            {
              type: 'point',
              text: `Routes critical issues (e.g., system crashes) to humans with priority alerts`,
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22512&token=6808C13BE4B0F52D311212FE',
    recommendQuestions: [
      'Software_Services_Q1',
      'Software_Services_Q2',
      'Software_Services_Q3',
    ],
  },
  // 金融
  {
    // 银行
    slug: 'banking',
    painPoints: [
      [
        {
          title: 'Operational risks under stringent compliance',
          desc: 'New hires must memorize 2,000+ regulatory scripts (e.g., privacy protection clauses), requiring 6-month training with high initial violation rates.',
        },
      ],
      [
        {
          title: 'Inadequate wealth management expertise',
          desc: 'Limited financial advisors force 80% of retail clients to receive standardized recommendations, while high-net-worth individuals lack personalized solutions.',
        },
      ],
      [
        {
          title: 'Time-zone fragmented service',
          desc: '4+ hour delays for overseas emergencies (e.g., credit card fraud/large transfers), inefficient cross-time-zone coordination, and duplicate compliance checks degrade service continuity.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'End-to-End Compliance Engine',
          desc: [
            {
              type: 'point',
              text: 'AI ingests GDPR and other regulatory frameworks',
            },
            {
              type: 'point',
              text: 'Auto-blocks non-compliant phrasing in real-time',
            },
          ],
        },
      ],
      [
        {
          title: 'AI-Powered Wealth Advisor',
          desc: [
            {
              type: 'point',
              text: 'Integrates:',
              subList: [
                {
                  type: 'point',
                  text: 'Account data (cash flow/risk appetite)',
                },
                {
                  type: 'point',
                  text: 'External signals (e.g., social media investment trends)',
                },
              ],
            },
            {
              type: 'point',
              text: 'Dynamically updates client profiles',
            },
          ],
        },
      ],
      [
        {
          title: 'Global Time-Zone AI Router',
          desc: [
            {
              type: 'point',
              text: '24/7 intelligent routing for:',
              subList: [
                {
                  type: 'point',
                  text: 'Emergency actions (e.g., instant account freezes)',
                },
                {
                  type: 'point',
                  text: 'Automated multi-region compliance adaptation',
                },
              ],
            },
            {
              type: 'point',
              text: 'Cuts response time to 90 seconds',
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22541&token=680B50CDE4B0DAF871C17A4E',
    recommendQuestions: ['Banking_Q1', 'Banking_Q2', 'Banking_Q3'],
  },
  {
    // 保险
    slug: 'insurance',
    painPoints: [
      [
        {
          title: 'Low efficiency in claims initial review',
          desc: 'Manual review of medical bills/accident photos averages 72 hours, driving high complaint rates.',
        },
      ],
      [
        {
          title: 'Ambiguous policy terms spark disputes',
          desc: 'Misinterpretations of "deductibles" and "exclusions" fuel excessive litigation.',
        },
      ],
      [
        {
          title: 'Delayed fraud detection',
          desc: 'Manual screening of insurance fraud clues suffers from high missed-detection rates, causing substantial financial losses for insurers, while delayed identification prevents effective tracking.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI-Powered Claims Processing Automation',
          desc: [
            {
              type: 'point',
              text: `Medical claims: OCR extracts key fields (e.g., "fracture location"), cross-checks policy terms`,
            },
            {
              type: 'point',
              text: `Auto claims: AI compares damage photos with historical cases to generate repair estimates`,
            },
          ],
        },
      ],
      [
        {
          title: 'Interactive Policy Clause Visualizer',
          desc: [
            {
              type: 'point',
              text: `Interactive flowcharts for queries like "Does pet insurance cover neutering?":Neutering → Medically required? → Yes/Covered | No/Excluded`,
            },
            {
              type: 'point',
              text: `Complex scenarios (e.g., typhoon flooding) auto-link to official disaster records`,
            },
          ],
        },
      ],
      [
        {
          title: 'Multi-Dimensional Fraud Detection System',
          desc: [
            {
              type: 'point',
              text: `Flags suspicious cases via:`,
              subList: [
                {
                  type: 'point',
                  text: `Conversational tone analysis (e.g., over-detailed narratives)`,
                },
                {
                  type: 'point',
                  text: `Claim frequency patterns`,
                },
                {
                  type: 'point',
                  text: `Geo-conflicts (e.g., same vehicle in two locations)`,
                },
              ],
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22542&token=680B50DAE4B0DAF871C17A52',
    recommendQuestions: ['Insurance_Q1', 'Insurance_Q2', 'Insurance_Q3'],
  },
  // 生命健康行业
  {
    // 医药/设备制造
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title:
            'Language and regulatory barriers in cross-border consultations',
          desc: [
            {
              type: 'point',
              text: 'Overseas users face language difficulties during online inquiries',
            },
            {
              type: 'point',
              text: 'Diverging medical device regulations across markets slow down compliance responses',
            },
          ],
        },
      ],
      [
        {
          title: 'Ineffective remote equipment troubleshooting',
          desc: [
            {
              type: 'point',
              text: 'Online text-based problem descriptions often fail to capture complex technical issues',
            },
            {
              type: 'point',
              text: 'Conventional customer support lacks visual guidance tools',
            },
          ],
        },
      ],
      [
        {
          title: 'Disconnected cross-department workflows',
          desc: [
            {
              type: 'point',
              text: `Technical/Legal teams can't seamlessly collaborate online`,
            },
            {
              type: 'point',
              text: 'Broken handoff processes delay issue resolution',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI-powered Multilingual compliance engine',
          desc: [
            {
              type: 'point',
              text: `AI annotates device faults via smartphone camera feed`,
            },
            {
              type: 'point',
              text: 'Overlays interactive repair animations',
            },
            {
              type: 'point',
              text: 'Allows experts to add real-time markup',
            },
          ],
        },
      ],
      [
        {
          title: 'AI-powered visual troubleshooting assistant',
          desc: [
            {
              type: 'point',
              text: `Provides step-by-step guidance through live image analysis`,
            },
            {
              type: 'point',
              text: 'Delivers context-aware diagnostic solutions',
            },
          ],
        },
      ],
      [
        {
          title: 'Smart ticket routing with knowledge integration',
          desc: [
            {
              type: 'point',
              text: `Automatically categorizes and routes tickets to relevant departments`,
            },
            {
              type: 'point',
              text: 'Attaches similar historical cases for reference',
            },
            {
              type: 'point',
              text: 'Establishes a closed-loop online collaboration system',
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22535&token=680B5032E4B02D077740A691',
    recommendQuestions: [
      'Equipment_Manufacturing_Q1',
      'Equipment_Manufacturing_Q2',
      'Equipment_Manufacturing_Q3',
    ],
  },
  {
    // 医疗服务
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: 'Peak-hour service overload',
          desc: [
            {
              type: 'point',
              text: `High call center occupancy rates during peak hours`,
            },
            {
              type: 'point',
              text: 'Leads to prolonged patient wait times',
            },
            {
              type: 'point',
              text: 'Results in persistent complaint rates due to service gapsAllows experts to add real-time markup',
            },
          ],
        },
      ],
      [
        {
          title: 'Experience-dependent triage accuracy',
          desc: [
            {
              type: 'point',
              text: `Novice nurses show 30% symptom misjudgment rate`,
            },
            {
              type: 'point',
              text: 'Causes ER resource misallocation (e.g., mistaking angina for gastritis)',
            },
          ],
        },
      ],
      [
        {
          title: 'Data privacy vulnerabilities',
          desc: [
            {
              type: 'point',
              text: `Conventional systems store unredacted conversation logs`,
            },
            {
              type: 'point',
              text: 'Inadequate monitoring enables leakage risks',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Intelligent Triage & Scheduling Optimization',
          desc: [
            {
              type: 'point',
              text: `AI handles high-frequency queries (registration, department info)`,
            },
            {
              type: 'point',
              text: 'Dynamically allocates appointments based on real-time department capacity',
            },
            {
              type: 'point',
              text: 'Reduces call center congestion',
            },
          ],
        },
      ],
      [
        {
          title: 'AI-Enhanced Clinical Triage',
          desc: [
            {
              type: 'point',
              text: `Multi-step symptom Q&A (pain location/duration)`,
            },
            {
              type: 'point',
              text: 'Generates evidence-based triage levels per clinical guidelines',
            },
            {
              type: 'point',
              text: 'Cuts misdiagnosis rates',
            },
          ],
        },
      ],
      [
        {
          title: 'End-to-end privacy firewall',
          desc: [
            {
              type: 'point',
              text: `Real-time desensitization of chat content (automatically masks ID numbers/medical record numbers)`,
            },
            {
              type: 'point',
              text: 'Encrypted storage of communication records',
            },
            {
              type: 'point',
              text: 'Hierarchical permission management',
            },
            {
              type: 'point',
              text: 'Ensures only authorized personnel can access sensitive information',
            },
          ],
        },
      ],
    ],
    livechatUrl:
      'https://apps.voc.ai/live-chat#/preview/chat?id=22534&token=680B41AEE4B0DAF871C17848',
    recommendQuestions: [
      'Medical_Services_Q1',
      'Medical_Services_Q2',
      'Medical_Services_Q3',
    ],
  },
];

// 行业解决方案数据 - 日文
export const solutionsDataJP = [
  // 电商行业
  {
    // 家具行业
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title: 'カスタマーサービス担当者の採用と研修期間が長い',
          desc: '家具業界のカスタマーサービス業務は高度な専門性を必要とし、作業フローも煩雑です。一般的にカスタマーサービス担当者1 人の研修期間は約 3 か月かかります。ビッグセールなどのピーク時期に備えるため、事前にカスタマーサービス人材を確保する必要があります。また、カスタマーサービスの人員は不安定で、人件費が大きくかかります。',
        },
      ],
      [
        {
          title:
            'ドイツ語、フランス語などの非英語圏言語をサポートするヨーロッパサイトへのサービス',
          desc: 'ヨーロッパ市場はクロスボーダーでの家具販売業界にとって重要な戦場です。非英語圏言語のカスタマーサービス人材不足により、カスタマーサービスが十分に行えず、多くのヨーロッパの注文に対して英語のカスタマーサービスで対応しています。このため、顧客体験が良くなく、対話効率も低いです。',
        },
      ],
      [
        {
          title:
            '家具業界の大型商品及び複数配送に伴う物流のカスタマーサービス問題',
          desc: '大型家具製品は、パッケージ分割、注文分割、複数パッケージでの発送などのケースが多くあります。時には 1 つの注文が複数の物流会社で運送されます。顧客が物流に関する問い合わせをした場合、カスタマーサービス担当者は顧客の注文状況を判定し、複数のサイトを検索する必要があり、時間と労力がかかります。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI による複雑な製品知識の自動機械学習',
          desc: 'Solvea は様々な形式で知識を学習することをサポートします。また、AI は過去のメッセージから知識を学習する能力を備えています。増員せずに企業独自の知識資産を蓄積することができます。',
        },
      ],
      [
        {
          title: '非英語圏言語での返信をサポートする',
          desc: '家具業界において、あなたの製品は世界各地に販売される可能性があります。中国の家具ブランドの中には、ヨーロッパ向けに輸出するものが少なくありません。このため、複数の非英語圏言語に対応できるカスタマーサービス担当者を採用する必要があるかもしれません。しかし、人材不足であるため、採用コストが高く、最終的に英語のカスタマーサービスのみを提供することになる場合もあります。Solvea はフランス語、ドイツ語、日本語、スペイン語、ポルトガル語などに対応するのはもちろん、様々な非英語圏言語に対応した作業が可能です。また、AI の能力により、より良い返信とローカライズサービスを提供し、顧客体験を向上させます。',
        },
      ],
      [
        {
          title: '物流の完全自動検索と追跡サービス',
          desc: 'Solvea は「G+ ERP」 などの主流の物流システムやアマゾンプラットフォームとシームレスなしシステム連携されています。家具製品の部品が多く、出荷倉庫が分散している特徴に対応して、AI による完全自動検索機能が「n→1」に連携され、顧客は注文の進行状況をリアルタイムで追跡することができます。物流が遅れる場合、Solvea は事前にアラームで通知し、顧客にタイムリーに通知し、物流の遅延による不満やクレームを防ぎます。',
        },
      ],
    ],
  },
  {
    // 消费电子
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title: '製品の高速アップデートに伴う知識の遅れ',
          desc: '顧客が新型機種の仕様や互換性に関する質問をした際、返信が正確でないことが多く、問い合わせ量も多いです。人工で知識ベースを更新する場合、効率が低く、誤り率も高いです。',
        },
      ],
      [
        {
          title: '国を跨いで技術サポートに対す流回答の遅延',
          desc: '欧米のユーザーが夜間に機器の故障（例：「フリーズ」、「システムクラッシュ」）に関する問い合わせをした場合、6 - 8 時間も待たなければならず、緊急対応できないことによってのユーザー流失率は 30% にも達します。',
        },
      ],
      [
        {
          title:
            '促销期セール期間中のアフターサービスのプレッシャーが急増售后压力激增',
          desc: 'ビッグセール期間中、返品・交換に関する問い合わせ量が倍増し、物流追跡やポリシーの説明などの基本的な問題に人手と時間が費やされます。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI による製品データベースのリアルタイム同期',
          desc: 'ブランドのデータベースと接続し、自動的に技術仕様を解析し、多言語に対応した質問回答をサポートします。',
        },
      ],
      [
        {
          title: 'インテリジェント診断 + 能動的な警告機能',
          desc: 'ユーザーが故障ビデオをアップロードすると、AI がケースベースと照合して解決策を案内します（例：「強制再起動の手順」）。頻出する問題に対しては、自動的にシステムのポップアップで警告を表示します（例：「Wi-Fi 接続切断のパッチダウンロード」）。',
        },
      ],
      [
        {
          title: '完全自動化されたアフターサービスの流れ',
          desc: 'AI が返品の理由を識別した後、自動的に物流ラベルを生成して進行状況を通知します。ポリシーに関する問題には、AI によるコンプライアンスチェックを通じた返信を行います。',
        },
      ],
    ],
  },
  // 出行行业
  {
    // 短途出行（如电动滑板车/共享单车）
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title: '言語とタイムゾーンによるサービスの制約',
          desc: '欧米市場では英語、スペイン語、フランス語、北欧の非英語圏言語などを対応する必要があり、専門の翻訳サービスを利用するとコストが高くなります。タイムゾーンの違いにより、夜間の問い合わせに対する回答が遅れ（8 - 12 時間）、ユーザー体験が損なわれます。',
        },
      ],
      [
        {
          title: '複雑な技術問題に対するリモートサポートの非効率性',
          desc: '電池の故障、機器の接続などの問題を特定するために、平均 4 - 5 回のやり取りが必要です。現地の修理拠点がない場合、リモートでのサポートは難しいです。',
        },
      ],
      [
        {
          title: 'クロスボーダーでの物流とアフターサービス処理の煩雑さ',
          desc: '国際注文の物流状況は分散しており（例：「通関進行状況」、「税金の査詢」）、アフターサービスの問題に関してはお荷物の破損状況を繰り返し確認する必要があり、人工処理の効率が低いです。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI による多言語対応 + 24時間年中無休のタイムゾーン対応',
          desc: 'ユーザーの言語を自動識別し、ローカライズされた返信を生成します。北欧各言語などのロングテール言語にも対応しています。AI が夜間の問い合わせをスムーズに受け付け、秒単位で回答します（例：「電動スクーターが充電できない場合」）、タイムゾーンの問題を解消します。',
        },
      ],
      [
        {
          title: 'インテリジェント診断と AR によるリモートガイダンス',
          desc: 'ユーザーが故障の説明や画像を送信すると、AI が知識ベースと照合して解決策を案内します（例：「ブルートゥースのリセット手順」）。複雑な問題に対しては、AR 技術を使って機器のインターフェイスをマーキングし、アニメーションで分解手順を表示し、コミュニケーションの回数を 50% 減らします。',
        },
      ],
      [
        {
          title: 'エンドツーエンド自動化サービス',
          desc: [
            {
              type: 'point',
              text: '物流統合：注文番号を入力すると、自動的に注文と物流データを収集し、位置、状態、予想配達時間をリアルタイムで提供します。',
            },
            {
              type: 'point',
              text: 'アフターサービスの予測：AI が複数回の質問（例：損傷部位の写真、エラーコード）を通じて情報を収集し、自動的に修理依頼書や部品の配送手順を開始し、人工の介入を減らします。',
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车制造
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: '専門的な諮問のしきい値が高い',
          desc: '自動運転の設定、車両コネクティビティなどの複雑な問題に対して、専門家のサポートが必要で、1 回の通話コストが高いです。',
        },
      ],
      [
        {
          title: 'コンプライアンスリスクの監視不足',
          desc: 'EU の GDPR、米国のレモン法などの規制は複雑で、人工による会話監視では見落としの可能性が高いです。',
        },
      ],
      [
        {
          title: '非英語圏言語に対応したサービスの不足',
          desc: '中東、東欧市場での問い合わせにはアラビア語、ポーランド語などのサポートが必要ですが、外注する翻訳コストが高く、人を雇い入れにくいです。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '動的な発注書',
          desc: [
            {
              type: 'point',
              text: '質問を専門家レベルでの直接対応：AI が問題の難易度とリスクを自動識別し、ユーザーが「自動運転が突然停止した」と説明した場合、AI が高リスクの仕事注文としてマーキングし、ベテランに転送して、車両のログも添付します。',
            },
            {
              type: 'point',
              text: ' 資源のインテリジェントな割り当て：エンジニアのスキルタグ（例：「ハイブリッドシステムの専門家」）、所在地、言語能力に基づいて仕事注文をマッチングさせます。',
            },
          ],
        },
      ],
      [
        {
          title: 'マルチチャネルを通じたインテリジェントな連絡',
          desc: '車載インフォテインメントシステムのにポップアップウィンドウ、アプリの通知、SNSのプライベートメッセージを通じてリコール情報を同時に検索して取り出すし、AI がユーザーの閲覧状況を追跡して、再通知を行います。',
        },
      ],
      [
        {
          title: 'グローバルなコンプライアンスと文化エンジン',
          desc: [
            {
              type: 'point',
              text: 'リアルタイムのコンプライアンスモニタリング：AI が会話中のセンシティブな言葉（例：「終身保証」、「絶対安全」）を検出し、コンプライアンスに則った表現（例：「10 年間の保証」、「衝突試験基準に適合」）に自動的に置き換えます。',
            },
            {
              type: 'point',
              text: '文化適応データベース：',
              subList: [
                {
                  type: 'point',
                  text: '中東地域には男性のAI カスタマーサービス担当者のアイコンを割り当てます。',
                },
                {
                  type: 'point',
                  text: 'インドのユーザーにはデフォルトでヒンディ語と英語のバイリンガルの返信を表示します。',
                },
                {
                  type: 'point',
                  text: 'ラテンアメリカ市場には現地のスラングを組み込みます。',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车零配件及改造
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: '部品の適合性査詢の非効率性',
          desc: '人工で車種の年式、エンジンの型番を照合する場合、1 件あたり 20 分以上かかり、誤り率も高いです。',
        },
      ],
      [
        {
          title: '取り付け指導が人工に依存する',
          desc: '自動車部品の取り付けは大きく人工に依存しており、ユーザーが自分で取り付けるのは難しいです。クロスボーダーユーザーは言語の障害により誤操作をしやすく、返品・交換のコストが増加します。',
        },
      ],
      [
        {
          title: '物流追跡が分散している',
          desc: '通関の進行状況を DHL や税関システムでクエリをマニュアルで作成する必要があり、1 日あたり 1 人のカスタマーサービス担当者が 3 時間程度を費やしています。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'インテリジェントな部品マッチングエンジン：',
          desc: 'ユーザーが VIN コードか車種の写真をアップロードすると、AI が互換性のある部品を自動的に案内し、改造のリスクを表示します（例：「このブレーキパッドを使用する場合は、カリパーも同時にアップグレードする必要があります」）。',
        },
      ],
      [
        {
          title: 'AI はリアルタイムで部品の取り付けを指導しする：',
          desc: 'ユーザーがリアルタイムで写真を撮影すると、AI が指示を提供し、ユーザーがステップバイステップで取り付け作業を行えるよう支援します。',
        },
      ],
      [
        {
          title: 'クロスボーダー物流モニタリングプラットフォーム：',
          desc: 'AI が 40 以上の物流会社のデータを収集し、注文番号を入力すると、通関書類の状況、税金の金額、および見積もりの通関許可時間を表示します。',
        },
      ],
    ],
  },
  // 信息技术行业
  {
    // 软件服务
    slug: 'software-services',
    painPoints: [
      [
        {
          title: '高頻度の基礎的な問題が高級な資源を占める：',
          desc: '60% の作業依頼がパスワードのリセット、請求書の査詢などの重複問題で、技術専門家が低価値の依頼に追われ、人材資源が無駄に費やされています。',
        },
      ],
      [
        {
          title: '新機能のリリースによる問い合わせの急増：',
          desc: 'バージョンアップ後、問い合わせ量が急増し、通常のカスタマーサービス体制では対応ができず、平均的な回答が遅れ、ユーザーの流失率が上昇しています。',
        },
      ],
      [
        {
          title: 'タイムゾーンをまたぐ企業向けのサービス中断：',
          desc: 'アジア太平洋地域の顧客が欧米のチームの非勤務時間に緊急なニーズ（例：API インターフェイスのエラー報告）を持っている場合、即時の対応ができず、故障回復にかかる時間が 50% 延びています。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: '完全自動化されたアカウント管理エンジン：',
          desc: [
            {
              type: 'point',
              text: 'ユーザーが「企業版にアップグレードしたい」と音声入力すると、AI が 「Stripe」 などのプラットフォームの支払い記録を自動的に取得し、請求書の対比表を生成して、1 クリックでアップグレードを完了させます。',
            },
            {
              type: 'point',
              text: '権限の変更を企業管理バックエンドに即時同期し、アカウント権限を自動化して管理します。',
            },
          ],
        },
      ],
      [
        {
          title: 'AI による知識ベースの自動機械学習：',
          desc: [
            {
              type: 'point',
              text: 'AI はアップデートドキュメントが公開されると直ちに学習し、ユーザーが「新しいダッシュボードをどのように設定するか」と質問した場合、知識ベースと自動的に関連付けて、マーキングの付いた画面キャプチャを案内します。',
            },
            {
              type: 'point',
              text: '高頻度の問題を自動的に学習して記録し、知識ベースに登録し、次回同じ質問があった時、AI が自動的に回答します。',
            },
          ],
        },
      ],
      [
        {
          title:
            'AI は24時間・多言語対応で、緊急問題は人間のエージェント転送：',
          desc: '世界中のユーザーは LiveChat やメールなどの形式で AI カスタマーサービスと対話できます。50 以上の言語に対応しており、ユーザーの言語に合わせて返信します。システムエラーなどの対応できない緊急問題が発生した場合、自動的に人工カスタマーサービスに転送し、関係者にメッセージ通知を送信して対応を促します。',
        },
      ],
    ],
  },
  // 金融
  {
    // 银行
    slug: 'banking',
    painPoints: [
      [
        {
          title: 'コンプライアンス規制の高圧における操作リスク',
          desc: '新入社員は 2000 以上の規制用のフレーズ（例：プライバシー保護の条項）を暗記する必要があり、研修期間は 6 か月にも及び、就職初期の違反率が非常に高いです。',
        },
      ],
      [
        {
          title: 'フィナンシャルコンサルティングの専門性不足',
          desc: '理財マネージャーの人材が不足しており、80% の一般顧客は標準化された製品の案内しか受けられず、高資産層の顧客の個別化されたニーズの満足度が低いです。',
        },
      ],
      [
        {
          title: 'タイムゾーンをまたぐサービスの中断',
          desc: '海外での緊急なニーズ（不正利用・高額送金）に対する回答が 4 時間以上遅れ、多国タイムゾーンでの業務の連携が非効率的で、重複する照会とコンプライアンス上のミスにより、顧客体験が損なわれています。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'エンドツーエンドのコンプライアンスエンジン',
          desc: 'AI が銀行に必要な 「GDPR」 などの各種専門性の高い文書を学習し、高リスクなフレーズを自動的に回避します。',
        },
      ],
      [
        {
          title: 'AI によるインテリジェントな資産運用サービス',
          desc: 'アカウントデータ（キャッシュフロー、リスク許容度）と外部データ（ソーシャルメディアでの投資トピックの関心度）を統合し、顧客のプロファイルをリアルタイムで更新します。',
        },
      ],
      [
        {
          title: 'AI によるタイムゾーンをまたぐエンジン',
          desc: 'AI が24時間年中無休のグローバルインテリジェントなルーティングを行い、緊急操作（例：アカウントの自動凍結）に対して秒単位で回答します。リアルタイムのコンプライアンス対応と多タイムゾーンでの業務の自動化された連携を行い、回答時間を 90 秒に短縮します。',
        },
      ],
    ],
  },
  {
    // 保险
    slug: 'insurance',
    painPoints: [
      [
        {
          title: '保険金支払いの一次審査効率が低い：',
          desc: '人工で医療請求書や事故の写真を照合する場合、平均 72 時間かかり、顧客のクレーム率が高いです。',
        },
      ],
      [
        {
          title: '保険条項の曖昧な説明によりトラブルが生じた：',
          desc: '「ディダクティブル」「除外責任」などの用語に対する理解の違いにより、訴訟案件が多く、解決が難しいです。',
        },
      ],
      [
        {
          title: '詐欺事件の識別が遅れる：',
          desc: '人工による保険詐欺の手がかりのスクリーニングでは見落とし率が高く、保険会社に実際の金額損失をもたらしており、時効の問題で追跡も困難です。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI による自動化された保険金支払いの流れ：',
          desc: [
            {
              type: 'point',
              text: 'ユーザーが医療報告をアップロードすると、AI が OCR 技術を使ってキーワードを抽出し（例：「骨折部位」）、保険契約条項と照合して結果を出力します。',
            },
            {
              type: 'point',
              text: '自動車保険の損害査定では、AI が事故の写真と過去のケースベースを照合し、迅速に初期の修理見積もりを行います。',
            },
          ],
        },
      ],
      [
        {
          title: '保険条項の可視化されたディシジョンツリー：',
          desc: [
            {
              type: 'point',
              text: 'ユーザーが「ペット保険には不妊手術が含まれるか」と質問した場合、AI が対話型のフローチャートを生成します：不妊手術→疾病治療に必要？→はい→含まれる / いいえ→含まれない；',
            },
            {
              type: 'point',
              text: '複雑なシチュエーション（例：台風による家屋浸水）では、自動的に気象庁の災害記録と関連付けます。',
            },
          ],
        },
      ],
      [
        {
          title: '多次元の保険詐欺防止エンジン：',
          desc: '対話の感情分析（例：細かいことを過度に強調する）、過去の保険申請の頻度、地理的な矛盾（車両が同じ時間に二つの場所に出現する）などを通じて、高リスクな案件を特定します。',
        },
      ],
    ],
  },
  // 生命健康行业
  {
    // 医药/设备制造
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title: '国境を越えた相談における言語と法規制の壁：',
          desc: '海外のユーザーがオンラインで相談する際、言語の障害があり、各国の医療機器に関する法規の違いにより、コンプライアンスに則った回答をする効率が低いです。',
        },
      ],
      [
        {
          title: 'リモートでの機器故障診断の非効率性：',
          desc: 'オンラインでの文字による説明では、複雑な機器の問題を特定するのが難しく、伝統的なカスタマーサービスでは顧客に故障の原因特定を直感的にガイドすることができません。',
        },
      ],
      [
        {
          title: '技術的な相談の流れの中断：',
          desc: '顧客の問題には多くの部門（例：技術部門、法務部門）の協力が必要ですが、オンラインでのプロセスが中断されることで回答が遅れています。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'AI による多言語とコンプライアンス対応エンジン：',
          desc: '顧客がスマートフォンのカメラで機器を撮影すると、AI が故障箇所をマーキングし、修理のアニメーションを表示し、専門家がリモートで操作手順を指示します。',
        },
      ],
      [
        {
          title:
            'AI による機器調整とトラブルシュートのリアルタイムガイダンス：',
          desc: 'ユーザーがリアルタイムで写真を撮影すると、AI が指示を提供し、関連するトラブルシュートと解決策を提供します。',
        },
      ],
      [
        {
          title:
            'インテリジェントな作業指令ルーティングミドルプラットフォーム：',
          desc: 'AI が問題の種類を自動的に解析し、部門横断の作業依頼をリアルタイムで転送し、過去のケースを参考資料として添付し、オンラインでの協力のループを構築します。',
        },
      ],
    ],
  },
  {
    // 医疗服务
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: 'ピーク時期における相談量の多さと回線混雑率の高さ：',
          desc: 'ピーク時期にはコールセンターの回線混雑率が高く、患者の平均待ち時間が長くなり、サービス不足によるクレーム率も高いです。',
        },
      ],
      [
        {
          title: '検診が看護師の経験に依存する：',
          desc: '新人看護師は症状を誤診する確率が 30% にも達し、救急資源の浪費（例：狭心症を胃痛と誤診する）を引き起こしています。',
        },
      ],
      [
        {
          title: 'プライバシー漏洩のリスクが高い：',
          desc: '伝統的なコールセンターシステムでは対話内容が匿名化されておらず、コールセンター担当者の対話モニタリング能力も低く、データ漏洩の事故が起こりやすいです。',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'インテリジェントな分流と予約最適化システム：',
          desc: 'AI が高頻度の相談（例：予約手順、診療科の紹介）に自動的に回答し、人工コールセンターの負担を軽減します。診療科の実時の診察能力に基づいて予約時間帯を動的に割り当て、通話の占線率を下げます。',
        },
      ],
      [
        {
          title: 'AI によるトリアージ決定エンジン：',
          desc: '患者がオンラインで症状を記述すると、AI が複数回のインタラクティブな質問（例：痛みの部位、持続時間）を通じて臨床ガイドラインと関連付け、予備診断のレベル分けを生成します。看護師の正確な診療区分を支援して誤診率を下げます。',
        },
      ],
      [
        {
          title: 'エンドツーエンドにわたるプライバシー保護ファイアウォール：',
          desc: '対話内容をリアルタイムで匿名化し（ID 番号、カルテ番号を自動的にマスク）、通信記録を暗号化して保存し、アクセス権限を階層化して管理し、機密情報が承認を受けた者のみが追跡できるように確保します。',
        },
      ],
    ],
  },
];

// 行业解决方案数据 - 德文
export const solutionsDataDE = [
  // 电商行业
  {
    // 家具行业
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title:
            'Zeitaufwändige Rekrutierung und Schulung von Kundendienstmitarbeitern',
          desc: [
            {
              type: 'point',
              text: 'Da der Kundendienst in der Möbelbranche hoch spezialisiert ist und umfassende Produktenkenntnisse erfordert, dauert der Schulungsprozess etwa 3 Monate.',
            },
            {
              type: 'point',
              text: 'Arbeitsplatzunsicherheit und Personalprobleme vor der Hauptsaison erhöhen die Kosten.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Mangel an mehrsprachiger Unterstützung für europäische Märkte (z. B. Deutsch, Französisch)',
          desc: 'Das Vertrauen auf englischsprachigen Kundendienst verschlechtert die Kundenerfahrung und die Effizienz.',
        },
      ],
      [
        {
          title:
            'Logistische Komplexitäten bei sperrigen/multi-teiligen Artikeln',
          desc: 'Sperrige Möbelartikel erfordern oft aufgespaltene Versandteile, manuelle Auftragsaufteilung oder Versand in mehreren Paketen. In einigen Fällen wird ein einzelner Auftrag durch mehrere Logistik-Anbieter ausgeführt. Wenn Kunden nach dem Versandstatus fragen, muss der Support den Auftragsstatus manuell identifizieren und Pakete across different platforms verfolgen – ein zeitaufwändiger und arbeitsintensiver Prozess.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Automatisiertes Eigenlernen von Produktenkenntnissen',
          desc: 'Künstliche Intelligenz verarbeitet historische Daten und Dokumentation, um eigenständige Kenntnisse aufzubauen.',
        },
      ],
      [
        {
          title: 'Mehrsprachige Unterstützung',
          desc: "Solvea's KI überwindet diese Barrieren, indem sie muttersprachliche Sprachkenntnisse in allen wichtigen europäischen und asiatischen Sprachen (einschließlich Französisch, Deutsch, Japanisch, Spanisch, Portugiesisch usw.) liefert und kulturspezifische Antworten automatisiert, die humanen Agenten übertreffen.",
        },
      ],
      [
        {
          title:
            'Vollautomatisierter Logistikabfrage- und Identifizierungsdienst',
          desc: 'Solvea ist tief in gängige Logistiksysteme integriert. Sie aggriegiert automatisch Verfolgungsdaten von verteilten Lagern und multi-teiligen Versandteilen, damit Kunden den Auftragsfortschritt in Echtzeit verfolgen können.',
        },
      ],
    ],
  },
  {
    // 消费电子
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title: 'Schnelle Produktiteration führt zu Wissensverzögerung',
          desc: 'Wenn Kunden nach Parametern neuer Modelle und Kompatibilitätsproblemen fragen, sind die Antworten ungenau, und die Anzahl der Anfragen ist hoch. Manuelle Aktualisierung der Wissensbasis ist ineffizient und hat eine hohe Fehlerrate.',
        },
      ],
      [
        {
          title: 'Unzureichende Reaktion auf globale technische Beratung',
          desc: 'Europäische und amerikanische Benutzer warten nachts 6–8 Stunden auf technische Beratung bei Geräteausfällen (z. B. Einfrierprobleme, System Abstürze), und die Verlustrate bei Notfällen beträgt bis zu 30%.',
        },
      ],
      [
        {
          title: 'After-sales-Druck steigt während Promotionen',
          desc: 'Die Anzahl der Rückgabee- und Umtauschanfragen während Promotionen verdoppelt sich, und grundlegende Fragen zur Logistikverfolgung und Richtlinienklärung kosten viel Zeit.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Reale Zeit-Synchronisation der KI-Produkt-Datenbank',
          desc: 'KI synchronisiert sich in realer Zeit mit Produktdatenbanken, um Spezifikationen automatisch zu verarbeiten und mehrsprachige Anfragen zu behandeln.',
        },
      ],
      [
        {
          title: 'Intelligente Diagnose & Proaktive Alarme',
          desc: 'Nachdem der Benutzer ein Problembehandlungsvideo hochgeladen hat, vergleicht die KI mit der Fallbibliothek und liefert Lösungen (z. B. "Erzwungene Neustartschritte"); Die KI触发 automatisch System-Pop-Up-Alarme für häufige Probleme (z. B. "Wi-Fi-Trennungs-Patch herunterladen")',
        },
      ],
      [
        {
          title: 'Vollautomatisierte After-Sales-Assembly Line',
          desc: 'KI identifiziert Rückgabegründe und generiert automatisch Versandlabels und pushing Echtzeit-Verfolgungsupdates. Richtlinienbezogene Anfragen werden durch Compliance-KI-Prüfung verarbeitet, um genaue Antworten zu liefern.',
        },
      ],
    ],
  },
  // 出行行业
  {
    // 短途出行（如电动滑板车/共享单车）
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title: 'Cross-language & timezone service bottlenecks', // 保留英文原术语，因无合适德语对应词
          desc: [
            {
              type: 'point',
              text: 'Erfordert Abdeckung von Englisch, Spanisch, Französisch und nordischen Sprachen in europäischen und amerikanischen Märkten, mit hohen Kosten für dedizierte Übersetzer.',
            },
            {
              type: 'point',
              text: 'Zeitzonendifferenzen führen zu 8–12-stündigen Verzögerungen bei nächtlichen Anfragen und verschlechtern die Benutzererfahrung.',
            },
          ],
        },
      ],
      [
        {
          title: 'Ineffiziente ferne Unterstützung bei technischen Problemen',
          desc: [
            {
              type: 'point',
              text: 'Batterieausfälle und Geräteverbindungsprobleme erfordern durchschnittlich 4–5 Kommunikationsrunden zur Diagnose.',
            },
            {
              type: 'point',
              text: 'Ferne Anleitung wird ohne lokale Reparaturnetzwerke besonders schwierig.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Umständliche grenzüberschreitende Logistik- und After-Sales-Verarbeitung',
          desc: [
            {
              type: 'point',
              text: 'Internationale Auftragslogistiken sind fragmentiert (z. B. Zollstatus, Steuereinfragen).',
            },
            {
              type: 'point',
              text: 'After-Sales-Probleme erfordern wiederholte Bestätigung von Schadendetails, was zu niedriger manueller VerarbeitungsEffizienz führt.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'KI-mehrsprachig + 24/7 Zeitzonenabdeckung',
          desc: [
            {
              type: 'point',
              text: 'Erkennt die Benutzersprache automatisch und generiert lokalisierte Antworten, einschließlich长尾的 nordischer Dialekte.', // "长尾" 保留，因属技术术语
            },
            {
              type: 'point',
              text: `KI behandelt nahtlos nächtliche Anfragen mit Sekundenreaktion (z. B. "E-Scooter lädt nicht"), eliminating Zeitzonenprobleme.`, // eliminating 保留，因属技术动作描述
            },
          ],
        },
      ],
      [
        {
          title: 'Smart-Diagnose & AR-ferne Anleitung',
          desc: [
            {
              type: 'point',
              text: 'Nachdem Benutzer Fehlerbeschreibungen/Fotos einreicht, passt die KI die Wissensbasis an, um Lösungen zu liefern (z. B. Bluetooth-Reset-Schritte).',
            },
            {
              type: 'point',
              text: 'Bei komplexen Problemen: AR-Annotationen markieren Geräteoberflächen mit animierten Demontageanleitungen, was die Kommunikationsrunden um 50% reduziert.',
            },
          ],
        },
      ],
      [
        {
          title: 'End-to-End-automatisierter Service',
          desc: [
            {
              type: 'point',
              text: 'Logistikintegration: Mit der Eingabe der Auftragsnummer werden Auftrags- und Versanddaten automatisch aggregiert, mit Echtzeit-Updates über Position/Status/ETA.',
            },
            {
              type: 'point',
              text: 'After-Sales-Vorurteil: KI sammelt Informationen durch mehrstufige Abfragen (z. B. "Schadenfotos", "Fehlercodes"), then auto-triggers repair tickets or spare parts dispatch, minimizing human intervention.', // 部分英文技术术语保留，因无合适德语对应词
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车制造
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: 'Erfordert Expertensupport',
          desc: 'Komplexe Probleme wie Einstellungen für autonomes Fahren und Fahrzeugverbindungen erfordern Spezialistensupport, was zu hohen Anrufkosten führt.',
        },
      ],
      [
        {
          title: 'Unzureichende Compliance-Risiko-Beobachtung',
          desc: 'Regulierungen wie die EU-GDPR und das US-Lemon Law sind komplex, was zu hohen Übersehenraten bei manuellen Dialogprüfungen führt.',
        },
      ],
      [
        {
          title: 'Mangel an mehrsprachiger Unterstützung',
          desc: 'Mittlerer Ost und Osteuropa Märkte verlangen nach Arabisch- und Polnisch-Sprachkenntnissen, aber das Outsourcing von Übersetzungen ist kostspielig, und die Einstellung qualifizierten Personals ist schwierig.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Dynamisches Ticketing-Routingsystem',
          desc: [
            {
              type: 'point',
              text: 'Prioritätserhöhung für Expertensupport-Probleme: KI bewertet automatisch die Problemkomplexität und das Risiko. Zum Beispiel, wenn ein Benutzer "Autonomes Fahren wurde plötzlich beendet" meldet, markiert das System es als High-Priority-Ticket, leitet es an Senior-Engineer weiter und fügt Fahrzeugprotokolle an.',
            },
            {
              type: 'point',
              text: 'Intelligente Ressourcenverteilung: Weist Tickets basierend auf der Expertise der Ingenieure (z. B. "Hybridsystem-Spezialist"), Standort und Sprachkenntnissen zu.',
            },
          ],
        },
      ],
      [
        {
          title: 'Multi-Channel Smart Benachrichtigungen',
          desc: 'Liefert Rückrufanahmen via Fahrzeug-Pop-ups, App-Benachrichtigungen und Social-Media-DMs. KI verfolgt den Lesestatus der Benutzer und sendet Follow-up-Erinnerungen.',
        },
      ],
      [
        {
          title: 'Globaler Compliance- und Kulturadaption-Engine',
          desc: [
            {
              type: 'point',
              text: 'Realtime-Compliance-Beobachtung: KI erkennt sensible Begriffe (z. B. "Lebenszeitgarantie", "100% sicher") und ersetzt sie mit compliantem Sprachgebrauch (z. B. "10-Jahres-Garantie", "erfüllt Crash-Test-Standards").',
            },
            {
              type: 'point',
              text: 'Kulturadaption-Datenbank:',
              subList: [
                {
                  type: 'point',
                  text: 'Middle East: KI-Agenten-Avatare standardmäßig als männlich dargestellt.',
                },
                {
                  type: 'point',
                  text: 'Indien: Zeigt standardmäßig bilingual Hindi-Englische Repliken.',
                },
                {
                  type: 'point',
                  text: 'Lateinamerika: Integriert lokale Slang-Bibliotheken.',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车零配件及改造
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: 'Ineffiziente Überprüfung der Teilekompatibilität',
          desc: 'Manuelle Überprüfung von Fahrzeugjahr/Enginemodell kostet pro Auftrag über 20 Minuten mit hoher Fehlerrate.',
        },
      ],
      [
        {
          title: 'Zu hoher Verzicht auf humanen Support für Montageanleitung',
          desc: 'Komplexe Eigenmontageprozesse und Sprachbarrieren für internationale Benutzer führen zu Betriebsfehlern und erhöhten Rückgabekosten.',
        },
      ],
      [
        {
          title: 'Fragmentierte Logistikverfolgung',
          desc: 'Zollstatus erfordert manuelle Überprüfungen across DHL/Zollsysteme, verschwendet 3 Stunden pro Support pro Tag.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Smart-Engine for Parts Matching', // 保留英文标题，因属产品名称
          desc: [
            {
              type: 'point',
              text: 'KI empfiehlt kompatible Teile via VIN/Fahrzeugfoto-Upload',
            },
            {
              type: 'point',
              text: 'Markiert Modifikationsrisiken (z. B. "Diese Bremsbacken erfordern Caliper-Upgrades")',
            },
          ],
        },
      ],
      [
        {
          title: 'KI-gestützte Echtzeit-Montageanleitung',
          desc: 'Bietet schrittweise visuelle Anweisungen via Live-Foto-Analyse',
        },
      ],
      [
        {
          title: 'Cross-Border-Logistik-Dashboard',
          desc: [
            {
              type: 'point',
              text: 'Aggregiert Daten von 40+ Trägern',
            },
            {
              type: 'point',
              text: 'Zeigt in Echtzeit:',
              subList: [
                {
                  type: 'point',
                  text: 'Zoll-dokumentenstatus',
                },
                {
                  type: 'point',
                  text: 'Zoll-/Steuer-Schätzungen',
                },
                {
                  type: 'point',
                  text: 'Erwartete Freigabzeit',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  // 信息技术行业
  {
    // 软件服务
    slug: 'software-services',
    painPoints: [
      [
        {
          title:
            'Hohe Menge an grundlegenden Anfragen drainiert Senior-Ressourcen',
          desc: '60% der Tickets sind repetitiv (z. B. Passwortwiederherstellung, Abrechnungsanfragen),迫使技术专家低价值请求 zu bearbeiten – eine schwere Ressourcenverschwendung.',
        },
      ],
      [
        {
          title: 'Neue Funktionsstart trigger Support-Schubsen',
          desc: 'Post-Update-Anfragen spikes überfordern die tägliche Support-Kapazität, causing verspätete Antworten und erhöhte Nutzerverlustrate.',
        },
      ],
      [
        {
          title: 'Zeitzonenlücken brechen Unternehmensservice',
          desc: 'APAC-Kunden haben bei Notfällen (z. B. API-Ausfällen) in Eurol/US-Abenden 50% längere Downtime.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Vollautomatisiertes Account-Management-Engine',
          desc: [
            {
              type: 'point',
              text: 'Stimmbefehl (z. B. "Upgrade to Enterprise") trigger KI zur:',
              subList: [
                {
                  type: 'point',
                  text: 'Ziehen von Zahlungsnachweisen (Stripe, PayPal, etc)',
                },
                {
                  type: 'point',
                  text: 'Generieren vergleichender Abrechnungsberichte',
                },
                {
                  type: 'point',
                  text: 'Ausführen von One-Click-Upgrades',
                },
              ],
            },
            {
              type: 'point',
              text: 'Berechtigungsänderungen synchronisieren sofort in Admin-Konsolen',
            },
          ],
        },
      ],
      [
        {
          title: 'Selbstlernende KI-Wissensbasis',
          desc: [
            {
              type: 'point',
              text: `Auto-ingests Release-Dokumente, um auf neue Funktionsanfragen zu antworten (z. B. annotierte Screenshots für "new dashboard setup")`,
            },
            {
              type: 'point',
              text: `Protokolliert häufige Probleme für instandige zukünftige Repliken`,
            },
          ],
        },
      ],
      [
        {
          title: '24/7 Mehrsprachige KI mit Humanen Escalation',
          desc: [
            {
              type: 'point',
              text: 'Behandelt globale Anfragen via LiveChat/E-Mail in 50+ Sprachen',
            },
            {
              type: 'point',
              text: `Leitet kritische Probleme (z. B. Systemabstürze) mit Prioritätsalarmen an Menschen weiter`,
            },
          ],
        },
      ],
    ],
  },
  // 金融
  {
    // 银行
    slug: 'banking',
    painPoints: [
      [
        {
          title: 'Operative Risiken unter stringenter Compliance',
          desc: 'Neu eingestellte Mitarbeitende müssen mehr als 2.000 regulatorische Skripte (z. B. Datenschutzklauseln) auswendig lernen, was eine 6-monatige Schulung mit hoher anfänglicher Verstöße rate erfordert.',
        },
      ],
      [
        {
          title: 'Unzureichende Expertise in Vermögensverwaltung',
          desc: 'Begrenzte Finanzberater zwingen 80% der Einzelkunden, standardisierte Empfehlungen zu erhalten, während High-Net-Worth-Individuen an personalisierten Lösungen mangeln.',
        },
      ],
      [
        {
          title: 'Zeitzonen-fragmentierter Service',
          desc: '4+ stündige Verzögerungen bei ausländischen Notfällen (z. B. Kreditkartendiebstahl/große Transfers), ineffiziente Querzeitzonen-Koordination und doppelte Compliance-Prüfungen verschlechtern die Servicekontinuität.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'End-to-End-Compliance-Engine',
          desc: [
            {
              type: 'point',
              text: 'KI ingests GDPR und andere regulatorische Rahmenwerke',
            },
            {
              type: 'point',
              text: 'Blockt nicht complianten Sprachgebrauch in Echtzeit',
            },
          ],
        },
      ],
      [
        {
          title: 'KI-gestützter Vermögensberater',
          desc: [
            {
              type: 'point',
              text: 'Integriert:',
              subList: [
                {
                  type: 'point',
                  text: 'Kontodaten (Cashflow/Risikoappetit)',
                },
                {
                  type: 'point',
                  text: 'Externe Signale (z. B. Social-Media-Investment-Trends)',
                },
              ],
            },
            {
              type: 'point',
              text: 'Aktualisiert dynamisch Clientprofile',
            },
          ],
        },
      ],
      [
        {
          title: 'Globaler Zeitzonen-KI-Router',
          desc: [
            {
              type: 'point',
              text: '24/7 intelligentes Routing für:',
              subList: [
                {
                  type: 'point',
                  text: 'Notfallaktionen (z. B. sofortige Kontoblockade)',
                },
                {
                  type: 'point',
                  text: 'Automatisierte mehrregionale Compliance-Adaption',
                },
              ],
            },
            {
              type: 'point',
              text: 'Reduziert die Reaktionszeit auf 90 Sekunden',
            },
          ],
        },
      ],
    ],
  },
  {
    // 保险
    slug: 'insurance',
    painPoints: [
      [
        {
          title: 'Niedrige Effizienz bei der Erstüberprüfung von Ansprüchen',
          desc: 'Manuelle Überprüfung von Medikationsrechnungen/Unfallfotos dauert durchschnittlich 72 Stunden und führt zu hohen Reklamationsraten.',
        },
      ],
      [
        {
          title: 'Unklare Politikbestimmungen provozieren Streitigkeiten',
          desc: 'Missverständnisse von "Selbstbehalt" und "Ausschlüsse" führen zu übermäßigen Rechtsstreitigkeiten.',
        },
      ],
      [
        {
          title: 'Verzögerte Betrugserkennung',
          desc: 'Manuelle Screening von Indizien für Versicherungsbetrug leidet unter hoher Verpasstrate, was erhebliche finanzielle Verluste für Versicherer verursacht, während die verzögerte Identifizierung eine effektive Verfolgung verhindert.',
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'Automatisierung der Ansprüchebearbeitung mit Künstlicher Intelligenz',
          desc: [
            {
              type: 'point',
              text: `Medizinische Ansprüche: OCR extrahiert Schlüssel Felder (z. B. "Frakturort"), vergleicht Policy-Bedingungen`,
            },
            {
              type: 'point',
              text: `Auto-Ansprüche: KI vergleicht Schadenfotos mit historischen Fällen, um Reparaturabschätzungen zu generieren`,
            },
          ],
        },
      ],
      [
        {
          title: 'Interaktiver Policy-Clause-Visualizer',
          desc: [
            {
              type: 'point',
              text: `Interaktive Flussdiagramme für Anfragen wie "Ist Tierschutz für Kastration gedeckt?": Kastration → Medizinhilfe nötig? → Ja/Gedeckt | Nein/Ausschließlich`,
            },
            {
              type: 'point',
              text: `Komplexe Szenarien (z. B. Taifunüberschwemmung) auto-link zu offiziellen Katastrophenprotokollen`,
            },
          ],
        },
      ],
      [
        {
          title: 'Mehrdimensionales Betrugs-Erkennungssystem',
          desc: [
            {
              type: 'point',
              text: `Markiert verdächtige Fälle via:`,
              subList: [
                {
                  type: 'point',
                  text: `Konversations-Tonanalyse (z. B. überaus detaillierte Erzählungen)`,
                },
                {
                  type: 'point',
                  text: `Anspruchshäufigkeitsmuster`,
                },
                {
                  type: 'point',
                  text: `Geo-Konflikte (z. B. dasselbe Fahrzeug an zwei Orten)`,
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  // 生命健康行业
  {
    // 医药/设备制造
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title:
            'Sprach- und regulatorische Barrieren bei grenzüberschreitenden Konsultationen',
          desc: [
            {
              type: 'point',
              text: 'Auslandische Benutzer haben during Onlineanfragen sprachliche Schwierigkeiten',
            },
            {
              type: 'point',
              text: 'Abweichende Medizintechnik-Vorschriften in different Märkten verlangsamen Compliance-Antworten',
            },
          ],
        },
      ],
      [
        {
          title: 'Ineffektive ferne Gerätebehebung',
          desc: [
            {
              type: 'point',
              text: 'Online-textbasierte Problembeschreibungen erfassen oft nicht komplexe technische Probleme',
            },
            {
              type: 'point',
              text: 'Konventioneller Kundensupport fehlt visuelle Anleitungswerkzeuge',
            },
          ],
        },
      ],
      [
        {
          title: 'Trennende Querabteilungs-Arbeitsflüsse',
          desc: [
            {
              type: 'point',
              text: `Technische/Juristische Teams können nicht nahtlos online kollaborieren`,
            },
            {
              type: 'point',
              text: 'Unterbrochene Handover-Prozesse verlangsamen Problembehebung',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'KI-gestarteter mehrsprachiger Compliance-Engine',
          desc: [
            {
              type: 'point',
              text: `KI annotiert Gerätefehler via Smartphone-Kamerafeed`,
            },
            {
              type: 'point',
              text: 'Overlays interaktive Reparatur-Animationen',
            },
            {
              type: 'point',
              text: 'Ermöglicht Experten, Echtzeit-Markups hinzuzufügen',
            },
          ],
        },
      ],
      [
        {
          title: 'KI-gestützter visueller Problemlöser-Assistent',
          desc: [
            {
              type: 'point',
              text: `Bietet schrittweise Anleitung durch Live-Bild-Analyse`,
            },
            {
              type: 'point',
              text: 'Liefert kontextbewusste diagnostische Lösungen',
            },
          ],
        },
      ],
      [
        {
          title: 'Smartes Ticket-Routing mit Wissensintegration',
          desc: [
            {
              type: 'point',
              text: `Automatisch Kategorie und leitet Tickets an relevante Abteilungen weiter`,
            },
            {
              type: 'point',
              text: 'Fügt ähnliche historische Fälle als Referenz an',
            },
            {
              type: 'point',
              text: 'Etablishes einen geschlossenen Online-Kollaborationskreis',
            },
          ],
        },
      ],
    ],
  },
  {
    // 医疗服务
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: 'Spitzenzeiten-Service-Überlastung',
          desc: [
            {
              type: 'point',
              text: `Hohe Wartewartungsraten in Spitzenzeiten`,
            },
            {
              type: 'point',
              text: 'Führt zu verlängerten Wartezeiten für Patienten',
            },
            {
              type: 'point',
              text: 'Resultiert in anhaltenden Reklamationsraten aufgrund von Service-Lücken',
            },
          ],
        },
      ],
      [
        {
          title: 'Erfahrungsabhängige Triage-Genauigkeit',
          desc: [
            {
              type: 'point',
              text: `Neuartige Krankenschwestern zeigen 30% Symptom-Urteilsverzerrung`,
            },
            {
              type: 'point',
              text: 'Verursacht Notfall-Ressourcen-Missallokation (z. B. Angina für Magenentzündung verwechseln)',
            },
          ],
        },
      ],
      [
        {
          title: 'Datenschutz-Schwachstellen',
          desc: [
            {
              type: 'point',
              text: `Konventionelle Systeme speichern ungekürzte Gesprächsprotokolle`,
            },
            {
              type: 'point',
              text: 'Unzureichende Überwachung ermöglicht Leckage-Risiken',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Intelligente Triage und Terminoptimierung',
          desc: [
            {
              type: 'point',
              text: `KI behandelt häufige Anfragen (Anmeldung, Abteilungsinfo)`,
            },
            {
              type: 'point',
              text: 'Zuteilt dynamisch Termine basierend auf realer Zeit-Kapazität der Abteilungen',
            },
            {
              type: 'point',
              text: 'Reduziert Wartewartung in Call-Centern',
            },
          ],
        },
      ],
      [
        {
          title: 'KI-unterstützte klinische Triage',
          desc: [
            {
              type: 'point',
              text: `Mehrstufige Symptom-Fragebogen (Schmerzlager/Dauer)`,
            },
            {
              type: 'point',
              text: 'Generiert evidenzbasierte Triage-Niveaus pro klinische Richtlinien',
            },
            {
              type: 'point',
              text: 'Reduziert Missdiagnosenraten',
            },
          ],
        },
      ],
      [
        {
          title: 'End-to-End-Privatsphäre-Firewall',
          desc: [
            {
              type: 'point',
              text: `Realtime-Desensitisierung von Chat-Inhalten (maskiert automatisch ID-Nummern/Medikationsnummern)`,
            },
            {
              type: 'point',
              text: 'Verschlüsselte Speicherung von Kommunikationsprotokollen',
            },
            {
              type: 'point',
              text: 'Hierarchische Berechtigungsverwaltung',
            },
            {
              type: 'point',
              text: 'Stellt sicher, dass nur autorisierte Personalien sensible Informationen zugreifen können',
            },
          ],
        },
      ],
    ],
  },
];

// 行业解决方案数据 - 葡萄牙
export const solutionsDataPT = [
  // 电商行业
  {
    // 家具行业
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title:
            'Recrutamento e treinamento de funcionários de atendimento ao cliente são demorados e custosos',
          desc: [
            {
              type: 'point',
              text: 'Como o atendimento ao cliente no setor de móveis é altamente especializado, exigindo amplo conhecimento do produto, o processo de treinamento pode levar cerca de 3 meses.',
            },
            {
              type: 'point',
              text: 'A instabilidade do trabalho e os desafios de contratação antes da temporada alta aumentam os custos.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Falta de suporte multilingue para os mercados europeus (por exemplo, alemão, francês)',
          desc: 'A dependência do atendimento em inglês prejudica a experiência e a eficiência do cliente.',
        },
      ],
      [
        {
          title:
            'Complexidades logísticas para itens volumosos ou multi - peças',
          desc: 'Itens de móveis volumosos geralmente envolvem envios divididos, particionamento manual de pedidos ou envio de múltiplos pacotes. Em alguns casos, um único pedido pode ser atendido por vários transportadores logísticos. Quando os clientes perguntam sobre o status do envio, o suporte deve identificar manualmente o status do pedido e acompanhar os pacotes em diferentes plataformas - um processo demorado e trabalhoso.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Aprendizado automático de conhecimento de produtos',
          desc: 'A IA absorve dados históricos e documentação para construir conhecimento proprietário.',
        },
      ],
      [
        {
          title: 'Suporte multilingue',
          desc: 'A IA da Solvea supera essas barreiras fornecendo proficiência nativa em todos os principais idiomas europeus e asiáticos (incluindo francês, alemão, japonês, espanhol, português etc.) e automatizando respostas culturalmente adaptadas que superam os agentes humanos.',
        },
      ],
      [
        {
          title:
            'Serviço de consulta e identificação logística totalmente automático',
          desc: 'A Solvea está profundamente integrada aos principais sistemas logísticos. Agrega automaticamente dados de rastreamento de armazéns dispersos e envios com múltiplos acessórios, tornando conveniente para os clientes acompanhar o progresso do pedido em tempo real.',
        },
      ],
    ],
  },
  {
    // 消费电子
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title: 'A rápida iteração do produto leva ao atraso do conhecimento',
          desc: 'Quando os clientes perguntam sobre os parâmetros e problemas de compatibilidade de novos modelos, as respostas são imprecisas e o número de perguntas é grande. A atualização manual da base de conhecimento é ineficiente e tem alta taxa de erro.',
        },
      ],
      [
        {
          title: 'Resposta insuficiente para consultas técnicas globais',
          desc: 'Usuários europeus e americanos precisam esperar de 6 a 8 horas para consultas sobre falhas no equipamento (como congelamento e queda do sistema) à noite, e a taxa de perda de demandas urgentes é de até 30%.',
        },
      ],
      [
        {
          title: 'A pressão pós - venda aumenta durante as promoções',
          desc: 'O número de perguntas sobre devolução/troca durante as promoções dobra, e questões básicas como rastreamento da logística e esclarecimento de políticas consomem muito tempo.',
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'Sincronização em tempo real do banco de dados de produtos da IA',
          desc: 'A IA sincroniza com os bancos de dados de produtos em tempo real para processar automaticamente as especificações e lidar com consultas multilingues.',
        },
      ],
      [
        {
          title: 'Diagnóstico inteligente e alertas proativos',
          desc: 'Depois que o usuário envia o vídeo de solução de problemas, a IA cruza com a biblioteca de casos e fornece soluções (como "etapas de reinicialização forçada"); Dispara automaticamente alertas pop - up do sistema para problemas de alta frequência (por exemplo, "download do patch de desconexão do Wi - Fi").',
        },
      ],
      [
        {
          title: 'Linha de produção pós - venda totalmente automatizada',
          desc: 'A IA identifica os motivos da devolução e gera automaticamente rótulos de envio e envia atualizações de rastreamento em tempo real. As perguntas relacionadas a políticas são processadas por verificação de conformidade da IA para respostas precisas.',
        },
      ],
    ],
  },
  // 出行行业
  {
    // 短途出行（如电动滑板车/共享单车）
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title: 'Gargalos de serviço em diferentes idiomas e fusos horários',
          desc: [
            {
              type: 'point',
              text: 'Exige cobertura em inglês, espanhol, francês e idiomas nórdicos nos mercados europeus e americanos, com altos custos para tradutores dedicados.',
            },
            {
              type: 'point',
              text: 'As diferenças de fuso horário causam atrasos de 8 a 12 horas para perguntas noturnas, prejudicando a experiência do usuário.',
            },
          ],
        },
      ],
      [
        {
          title: 'Suporte remoto ineficiente para problemas técnicos',
          desc: [
            {
              type: 'point',
              text: 'Falhas na bateria e problemas de conexão do dispositivo exigem em média de 4 a 5 rodadas de comunicação para diagnóstico.',
            },
            {
              type: 'point',
              text: 'A orientação remota se torna particularmente desafiadora sem redes de reparo locais.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Logística transfronteiriça e processamento pós - venda complicados',
          desc: [
            {
              type: 'point',
              text: 'A logística de pedidos internacionais é fragmentada (por exemplo, progresso da despacho aduaneiro, consultas sobre impostos).',
            },
            {
              type: 'point',
              text: 'Problemas pós - venda exigem confirmação repetida dos detalhes do dano, resultando em baixa eficiência de processamento manual.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'IA multilingue + cobertura de 24 horas em diferentes fusos horários',
          desc: [
            {
              type: 'point',
              text: 'Detecta automaticamente o idioma do usuário e gera respostas localizadas, suportando idiomas menos comuns como dialetos nórdicos.',
            },
            {
              type: 'point',
              text: 'A IA lida perfeitamente com perguntas noturnas com resposta em segundos (por exemplo, "O patinete elétrico não carrega"), eliminando problemas de fuso horário.',
            },
          ],
        },
      ],
      [
        {
          title: 'Diagnóstico inteligente e orientação remota com AR',
          desc: [
            {
              type: 'point',
              text: 'Depois que os usuários enviam descrições/fotos de falhas, a IA combina com a base de conhecimento para fornecer soluções (por exemplo, etapas de redefinição do Bluetooth).',
            },
            {
              type: 'point',
              text: 'Para problemas complexos: anotações AR destacam interfaces do dispositivo com guias de desmontagem animadas, reduzindo em 50% o número de rodadas de comunicação.',
            },
          ],
        },
      ],
      [
        {
          title: 'Serviço automatizado de ponta a ponta',
          desc: [
            {
              type: 'point',
              text: 'Integração logística: insira o número do pedido para consolidar automaticamente os dados do pedido e do envio, com atualizações em tempo real sobre localização/status/ETA.',
            },
            {
              type: 'point',
              text: 'Pré - julgamento pós - venda: a IA coleta informações por meio de consultas em várias etapas (por exemplo, "Fotos do dano", "códigos de erro"), e depois dispara automaticamente tickets de reparo ou envio de peças de reposição, minimizando a intervenção humana.',
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车制造
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: 'Requer suporte de nível especialista',
          desc: 'Problemas complexos como configurações de direção autônoma e conectividade do veículo exigem suporte de especialistas, resultando em altos custos por chamada.',
        },
      ],
      [
        {
          title: 'Monitoramento insuficiente de riscos de conformidade',
          desc: 'Regulamentações como o GDPR da UE e a Lei Lemon dos Estados Unidos são complexas, levando a altas taxas de supervisão em revisões manuais de diálogos.',
        },
      ],
      [
        {
          title: 'Falta de suporte multilingue',
          desc: 'Os mercados do Oriente Médio e da Europa Oriental exigem capacidade em árabe e polonês, mas a terceirização de traduções é cara e a contratação de pessoal qualificado é difícil.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Sistema de roteamento dinâmico de tickets',
          desc: [
            {
              type: 'point',
              text: 'Escalada de prioridade para problemas de nível especialista: a IA avalia automaticamente a complexidade e o risco do problema. Por exemplo, quando um usuário relata "A direção autônoma foi desligada abruptamente", o sistema marca o ticket como de alta prioridade, encaminha - o para engenheiros sêniores e anexa logs do veículo.',
            },
            {
              type: 'point',
              text: 'Alocação inteligente de recursos: atribui tickets com base na especialidade do engenheiro (por exemplo, "especialista em sistemas híbridos"), localização e proficiência linguística.',
            },
          ],
        },
      ],
      [
        {
          title: 'Notificações inteligentes multi - canal',
          desc: 'Envia alertas de recall por meio de pop - ups no veículo, notificações no aplicativo e mensagens diretas nas redes sociais. A IA acompanha o status de leitura do usuário e envia lembretes de acompanhamento.',
        },
      ],
      [
        {
          title: 'Motor de conformidade global e adaptação cultural',
          desc: [
            {
              type: 'point',
              text: 'Monitoramento de conformidade em tempo real: a IA detecta termos sensíveis (por exemplo, "garantia vitalícia", "100% seguro") e os substitui por termos conformes (por exemplo, "garantia de 10 anos", "atende aos padrões de testes de colisão").',
            },
            {
              type: 'point',
              text: 'Banco de dados de adaptação cultural:',
              subList: [
                {
                  type: 'point',
                  text: 'Oriente Médio: os avatares dos agentes da IA são configurados como figuras masculinas por padrão.',
                },
                {
                  type: 'point',
                  text: 'Índia: exibe respostas bilíngues em hindi e inglês por padrão.',
                },
                {
                  type: 'point',
                  text: 'América Latina: incorpora bibliotecas de gírias locais.',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车零配件及改造
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: 'Verificação ineficiente da compatibilidade de peças',
          desc: 'A verificação manual do ano do veículo/modelo do motor consome mais de 20 minutos por pedido e tem alta taxa de erro.',
        },
      ],
      [
        {
          title:
            'Excesso de dependência do suporte humano para orientação de instalação',
          desc: 'Processos complexos de instalação própria e barreiras linguísticas para usuários internacionais levam a erros operacionais e aumento dos custos de devolução.',
        },
      ],
      [
        {
          title: 'Rastreamento logístico fragmentado',
          desc: 'O status do despacho aduaneiro requer verificações manuais em sistemas de DHL/aduaneiras, desperdiçando 3 horas diárias por suporte.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor inteligente de combinação de peças',
          desc: [
            {
              type: 'point',
              text: 'A IA recomenda peças compatíveis por meio do upload do VIN/foto do veículo.',
            },
            {
              type: 'point',
              text: 'Marca riscos de modificação (por exemplo, "Essas pastilhas de freio exigem atualizações do cilindro".)',
            },
          ],
        },
      ],
      [
        {
          title: 'Guia de instalação em tempo real alimentado por IA',
          desc: 'Fornece instruções visuais passo a passo por meio da análise de fotos ao vivo.',
        },
      ],
      [
        {
          title: 'Painel de controle de logística transfronteiriça',
          desc: [
            {
              type: 'point',
              text: 'Consolida dados de mais de 40 transportadores.',
            },
            {
              type: 'point',
              text: 'Exibe em tempo real:',
              subList: [
                {
                  type: 'point',
                  text: 'Status dos documentos aduaneiros',
                },
                {
                  type: 'point',
                  text: 'Estimativas de impostos e taxas',
                },
                {
                  type: 'point',
                  text: 'Tempo previsto de liberação',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  // 信息技术行业
  {
    // 软件服务
    slug: 'software-services',
    painPoints: [
      [
        {
          title:
            'Consultas básicas em grande volume drenam recursos de especialistas',
          desc: '60% dos tickets são repetidos (por exemplo, redefinição de senha, consultas de cobrança), forçando especialistas técnicos a lidar com solicitações de baixo valor - um desperdício grave de recursos.',
        },
      ],
      [
        {
          title: 'Lançamentos de novos recursos desencadeiam picos de suporte',
          desc: 'O aumento repentino de consultas após atualizações supera a capacidade diária de suporte, causando respostas atrasadas e aumento da rotatividade de usuários.',
        },
      ],
      [
        {
          title: 'Gaps de fuso horário fragmentam o serviço empresarial',
          desc: 'Clientes da Ásia - Pacífico enfrentam 50% mais tempo de inatividade para problemas urgentes (por exemplo, falhas na API) durante o período fora do horário de trabalho da equipe europeia/americana.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor de gerenciamento de conta totalmente automatizado',
          desc: [
            {
              type: 'point',
              text: 'Comando de voz (por exemplo, "Atualizar para a versão Enterprise") faz a IA:',
              subList: [
                {
                  type: 'point',
                  text: 'Puxar registros de pagamento (Stripe, PayPal, etc.)',
                },
                {
                  type: 'point',
                  text: 'Gerar relatórios de cobrança comparativos',
                },
                {
                  type: 'point',
                  text: 'Executar atualizações com um clique',
                },
              ],
            },
            {
              type: 'point',
              text: 'Alterações de permissão são sincronizadas instantaneamente com os consoles de administração.',
            },
          ],
        },
      ],
      [
        {
          title: 'Base de conhecimento de IA auto - aprendiz',
          desc: [
            {
              type: 'point',
              text: 'Ingere automaticamente documentos de lançamento para responder a consultas relacionadas a novos recursos (por exemplo, capturas de tela anotadas para "configuração do novo painel").',
            },
            {
              type: 'point',
              text: 'Registra problemas de alta frequência para respostas instantâneas no futuro.',
            },
          ],
        },
      ],
      [
        {
          title: 'IA multilingue 24/7 com escalonamento para humanos',
          desc: [
            {
              type: 'point',
              text: 'Processa solicitações globais via LiveChat/email em mais de 50 idiomas.',
            },
            {
              type: 'point',
              text: 'Encaminha problemas críticos (por exemplo, quedas do sistema) para humanos com alertas prioritários.',
            },
          ],
        },
      ],
    ],
  },
  // 金融
  {
    // 银行
    slug: 'banking',
    painPoints: [
      [
        {
          title: 'Riscos operacionais sob conformidade rigorosa',
          desc: 'Novos funcionários devem memorizar mais de 2.000 roteiros regulatórios (por exemplo, cláusulas de proteção de privacidade), exigindo treinamento de 6 meses com altas taxas de violação inicial.',
        },
      ],
      [
        {
          title: 'Expertise insuficiente em gerenciamento de patrimônio',
          desc: 'O limite de assessores financeiros força 80% dos clientes varejistas a receber recomendações padronizadas, enquanto indivíduos de alto patrimônio líquido carecem de soluções personalizadas.',
        },
      ],
      [
        {
          title: 'Serviço fragmentado por fuso horário',
          desc: 'Atrasos de mais de 4 horas para emergências no exterior (por exemplo, fraude em cartão de crédito/transferências grandes), coordenação ineficiente entre fusos horários e verificações duplicadas de conformidade degradam a continuidade do serviço.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor de conformidade de ponta a ponta',
          desc: [
            {
              type: 'point',
              text: 'A IA incorpora o GDPR e outros marcos regulatórios.',
            },
            {
              type: 'point',
              text: 'Bloqueia automaticamente termos não conformes em tempo real.',
            },
          ],
        },
      ],
      [
        {
          title: 'Consultor de patrimônio alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'Integra:',
              subList: [
                {
                  type: 'point',
                  text: 'Dados da conta (fluxo de caixa/apetite ao risco)',
                },
                {
                  type: 'point',
                  text: 'Sinais externos (por exemplo, tendências de investimento nas redes sociais)',
                },
              ],
            },
            {
              type: 'point',
              text: 'Atualiza dinamicamente os perfis dos clientes.',
            },
          ],
        },
      ],
      [
        {
          title: 'Roteador de IA global de fusos horários',
          desc: [
            {
              type: 'point',
              text: 'Roteamento inteligente 24/7 para:',
              subList: [
                {
                  type: 'point',
                  text: 'Ações de emergência (por exemplo, congelamento imediato da conta)',
                },
                {
                  type: 'point',
                  text: 'Adaptação automática de conformidade em várias regiões',
                },
              ],
            },
            {
              type: 'point',
              text: 'Reduz o tempo de resposta para 90 segundos.',
            },
          ],
        },
      ],
    ],
  },
  {
    // 保险
    slug: 'insurance',
    painPoints: [
      [
        {
          title: 'Baixa eficiência na revisão inicial de sinistros',
          desc: 'A revisão manual de contas médicas/fotos de acidentes leva em média 72 horas, gerando altas taxas de reclamação.',
        },
      ],
      [
        {
          title: 'Termos ambíguos nas políticas geram disputas',
          desc: 'Interpretações equivocadas de "franquias" e "exclusões" alimentam litígios excessivos.',
        },
      ],
      [
        {
          title: 'Detecção tardia de fraude',
          desc: 'A triagem manual de pistas de fraude no seguro sofre de altas taxas de omissão, causando perdas financeiras substanciais para os seguradores, enquanto a identificação tardia impede o rastreamento eficaz.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Automação do processamento de sinistros alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'Sinistros médicos: OCR extrai campos chave (por exemplo, "localização da fratura"), verifica as condições da apólice.',
            },
            {
              type: 'point',
              text: 'Sinistros automotivos: A IA compara fotos de danos com casos históricos para gerar estimativas de reparo.',
            },
          ],
        },
      ],
      [
        {
          title: 'Visualizador interativo de cláusulas de política',
          desc: [
            {
              type: 'point',
              text: 'Fluxogramas interativos para perguntas como "O seguro de animais de estimação cobre a castração?": Castração → É necessária assistência médica? → Sim/Coberto | Não/Excluído.',
            },
            {
              type: 'point',
              text: 'Cenários complexos (por exemplo, inundações causadas por tufões) se ligam automaticamente a registros oficiais de desastres.',
            },
          ],
        },
      ],
      [
        {
          title: 'Sistema de detecção de fraude multidimensional',
          desc: [
            {
              type: 'point',
              text: 'Marca casos suspeitos por meio de:',
              subList: [
                {
                  type: 'point',
                  text: 'Análise do tom da conversa (por exemplo, narrativas excessivamente detalhadas)',
                },
                {
                  type: 'point',
                  text: 'Padrões de frequência de sinistros',
                },
                {
                  type: 'point',
                  text: 'Conflitos geográficos (por exemplo, mesmo veículo em dois locais)',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  // 生命健康行业
  {
    // 医药/设备制造
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title:
            'Barreiras linguísticas e regulatórias em consultas transfronteiriças',
          desc: [
            {
              type: 'point',
              text: 'Usuários do exterior enfrentam dificuldades linguísticas durante as consultas online.',
            },
            {
              type: 'point',
              text: 'Regulamentações divergentes de dispositivos médicos em diferentes mercados retardam as respostas de conformidade.',
            },
          ],
        },
      ],
      [
        {
          title: 'Solução remota de problemas de equipamento ineficaz',
          desc: [
            {
              type: 'point',
              text: 'Descrições de problemas baseadas em texto online geralmente não capturam problemas técnicos complexos.',
            },
            {
              type: 'point',
              text: 'O suporte ao cliente convencional carece de ferramentas de orientação visual.',
            },
          ],
        },
      ],
      [
        {
          title: 'Fluxos de trabalho interdepartamentais desconectados',
          desc: [
            {
              type: 'point',
              text: 'As equipes técnicas/jurídicas não podem colaborar perfeitamente online.',
            },
            {
              type: 'point',
              text: 'Processos de transferência interrompidos atrasam a resolução de problemas.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor de conformidade multilingue alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'A IA anota falhas do dispositivo por meio do feed da câmera do smartphone.',
            },
            {
              type: 'point',
              text: 'Sobrepoe animações interativas de reparo.',
            },
            {
              type: 'point',
              text: 'Permite que especialistas adicionem marcações em tempo real.',
            },
          ],
        },
      ],
      [
        {
          title: 'Assistente de solução de problemas visuais alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'Fornece orientação passo a passo por meio da análise de imagens ao vivo.',
            },
            {
              type: 'point',
              text: 'Fornece soluções de diagnóstico contextualizadas.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Roteamento inteligente de tickets com integração de conhecimento',
          desc: [
            {
              type: 'point',
              text: 'Categoriza e encaminha automaticamente os tickets para os departamentos relevantes.',
            },
            {
              type: 'point',
              text: 'Anexa casos históricos semelhantes para referência.',
            },
            {
              type: 'point',
              text: 'Estabelece um sistema de colaboração online em loop fechado.',
            },
          ],
        },
      ],
    ],
  },
  {
    // 医疗服务
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: 'Sobrecarga de serviço durante horas de pico',
          desc: [
            {
              type: 'point',
              text: 'Altas taxas de ocupação do centro de atendimento durante horas de pico.',
            },
            {
              type: 'point',
              text: 'Levam a tempos de espera prolongados para os pacientes.',
            },
            {
              type: 'point',
              text: 'Resultam em taxas de reclamação persistentes devido a lacunas no serviço.',
            },
          ],
        },
      ],
      [
        {
          title: 'Precisão da triagem dependente da experiência',
          desc: [
            {
              type: 'point',
              text: 'Enfermeiras iniciantes apresentam taxa de erro de julgamento de sintomas de 30%.',
            },
            {
              type: 'point',
              text: 'Causam alocação indevida de recursos de emergência (por exemplo, confundir angina com gastrite).',
            },
          ],
        },
      ],
      [
        {
          title: 'Vulnerabilidades de privacidade de dados',
          desc: [
            {
              type: 'point',
              text: 'Sistemas convencionais armazenam registros de conversas não editados.',
            },
            {
              type: 'point',
              text: 'Monitoramento insuficiente permite riscos de vazamento.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Otimização da triagem e agendamento inteligente',
          desc: [
            {
              type: 'point',
              text: 'A IA lida com consultas de alta frequência (registro, informações sobre departamentos).',
            },
            {
              type: 'point',
              text: 'Aloca dinamicamente consultas com base na capacidade real - time dos departamentos.',
            },
            {
              type: 'point',
              text: 'Reduz a congestão no centro de atendimento.',
            },
          ],
        },
      ],
      [
        {
          title: 'Triagem clínica aprimorada por IA',
          desc: [
            {
              type: 'point',
              text: 'Perguntas e respostas sobre sintomas em várias etapas (localização/duração da dor).',
            },
            {
              type: 'point',
              text: 'Gera níveis de triagem baseados em evidências de acordo com as diretrizes clínicas.',
            },
            {
              type: 'point',
              text: 'Reduz as taxas de diagnóstico errado.',
            },
          ],
        },
      ],
      [
        {
          title: 'Firewall de privacidade de ponta a ponta',
          desc: [
            {
              type: 'point',
              text: 'Desensibilização em tempo real do conteúdo do chat (mascara automaticamente números de ID/números de prontuário).',
            },
            {
              type: 'point',
              text: 'Armazenamento criptografado de registros de comunicação.',
            },
            {
              type: 'point',
              text: 'Gerenciamento hierárquico de permissões.',
            },
            {
              type: 'point',
              text: 'Garante que apenas pessoal autorizado possa acessar informações sensíveis.',
            },
          ],
        },
      ],
    ],
  },
];

// 行业解决方案数据 - 西班牙
export const solutionsDataES = [
  // 电商行业
  {
    // 家具行业
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title:
            'El reclutamiento y entrenamiento de empleados de atención al cliente son lentos y costosos',
          desc: [
            {
              type: 'point',
              text: 'Dado que el servicio al cliente en el sector de muebles es altamente especializado y requiere un amplio conocimiento del producto, el proceso de entrenamiento puede durar alrededor de 3 meses.',
            },
            {
              type: 'point',
              text: 'La inestabilidad laboral y los desafíos de contratación antes de la temporada alta incrementan los costos.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Falta de soporte multilingüe para los mercados europeos (por ejemplo, alemán, francés)',
          desc: 'La dependencia del servicio en inglés perjudica la experiencia y la eficiencia del cliente.',
        },
      ],
      [
        {
          title:
            'Complejidades logísticas para artículos voluminosos o de múltiples piezas',
          desc: 'Los artículos de muebles voluminosos suelen implicar envíos divididos, particionamiento manual de pedidos o envío de múltiples paquetes. En algunos casos, un solo pedido puede ser atendido por varios transportistas logísticos. Cuando los clientes preguntan sobre el estado del envío, el soporte debe identificar manualmente el estado del pedido y seguir los paquetes en diferentes plataformas, lo cual es un proceso largo y laborioso.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Aprendizaje automático de conocimientos de producto',
          desc: 'La IA absorbe datos históricos y documentación para construir conocimientos propios.',
        },
      ],
      [
        {
          title: 'Soporte multilingüe',
          desc: 'La IA de Solvea supera estas barreras al ofrecer un dominio nativo de todos los principales idiomas europeos y asiáticos (incluyendo francés, alemán, japonés, español, portugués, etc.) y automatizar respuestas culturalmente adaptadas que superan a los agentes humanos.',
        },
      ],
      [
        {
          title:
            'Servicio de consulta e identificación logística totalmente automático',
          desc: 'Solvea está profundamente integrada en los principales sistemas logísticos. Agrega automáticamente los datos de seguimiento de almacenes dispersos y envíos con múltiples accesorios, lo que facilita a los clientes seguir el progreso del pedido en tiempo real.',
        },
      ],
    ],
  },
  {
    // 消费电子
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title:
            'La rápida iteración del producto provoca un retraso en el conocimiento',
          desc: 'Cuando los clientes preguntan sobre los parámetros y problemas de compatibilidad de nuevos modelos, las respuestas son imprecisas y el número de preguntas es grande. La actualización manual de la base de conocimientos es ineficiente y tiene una alta tasa de error.',
        },
      ],
      [
        {
          title: 'Respuesta insuficiente para consultas técnicas globales',
          desc: 'Los usuarios europeos y estadounidenses deben esperar de 6 a 8 horas para consultas sobre fallas en el equipo (como congelación y caída del sistema) durante la noche, y la tasa de pérdida de demandas urgentes es de hasta 30%.',
        },
      ],
      [
        {
          title: 'La presión posventa aumenta durante las promociones',
          desc: 'El número de preguntas sobre devolución/troca durante las promociones se duplica, y cuestiones básicas como el seguimiento de la logística y el esclarecimiento de políticas consumen mucho tiempo.',
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'Sincronización en tiempo real de la base de datos de productos de la IA',
          desc: 'La IA se sincroniza con las bases de datos de productos en tiempo real para procesar automáticamente las especificaciones y manejar consultas multilingües.',
        },
      ],
      [
        {
          title: 'Diagnóstico inteligente y alertas proactivas',
          desc: 'Después de que el usuario envía el vídeo de solución de problemas, la IA lo compara con la biblioteca de casos y proporciona soluciones (como "etapas de reinicialización forzada"); Dispara automáticamente alertas pop - up del sistema para problemas de alta frecuencia (por ejemplo, "descarga del parche de desconexión del Wi - Fi").',
        },
      ],
      [
        {
          title: 'Línea de producción posventa totalmente automatizada',
          desc: 'La IA identifica los motivos de la devolución y genera automáticamente etiquetas de envío y envía actualizaciones de seguimiento en tiempo real. Las preguntas relacionadas con políticas son procesadas por verificación de conformidad de la IA para respuestas precisas.',
        },
      ],
    ],
  },
  // 出行行业
  {
    // 短途出行（如电动滑板车/共享单车）
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title: 'Bloqueos de servicio en diferentes idiomas y husos horarios',
          desc: [
            {
              type: 'point',
              text: 'Requiere cobertura en inglés, español, francés e idiomas nórdicos en los mercados europeos y estadounidenses, con altos costos para traductores dedicados.',
            },
            {
              type: 'point',
              text: 'Las diferencias de huso horario causan retrasos de 8 a 12 horas para preguntas nocturnas, perjudicando la experiencia del usuario.',
            },
          ],
        },
      ],
      [
        {
          title: 'Soporte remoto ineficiente para problemas técnicos',
          desc: [
            {
              type: 'point',
              text: 'Las fallas de la batería y los problemas de conexión del dispositivo requieren en promedio de 4 a 5 rondas de comunicación para el diagnóstico.',
            },
            {
              type: 'point',
              text: 'La orientación remota se vuelve particularmente difícil sin redes de reparación locales.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Logística transfronteriza y procesamiento posventa complicados',
          desc: [
            {
              type: 'point',
              text: 'La logística de pedidos internacionales es fragmentada (por ejemplo, progreso de la despacho aduanero, consultas sobre impuestos).',
            },
            {
              type: 'point',
              text: 'Los problemas posventa requieren confirmación repetida de los detalles del daño, lo que resulta en una baja eficiencia de procesamiento manual.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'IA multilingüe + cobertura de 24 horas en diferentes husos horarios',
          desc: [
            {
              type: 'point',
              text: 'Detecta automáticamente el idioma del usuario y genera respuestas localizadas, admitiendo idiomas menos comunes como dialectos nórdicos.',
            },
            {
              type: 'point',
              text: 'La IA gestiona perfectamente las preguntas nocturnas con respuesta en segundos (por ejemplo, "El monopatín eléctrico no se carga"), eliminando los problemas de huso horario.',
            },
          ],
        },
      ],
      [
        {
          title: 'Diagnóstico inteligente y orientación remota con AR',
          desc: [
            {
              type: 'point',
              text: 'Después de que los usuarios envían descripciones/fotos de fallas, la IA se combina con la base de conocimientos para proporcionar soluciones (por ejemplo, etapas de reinicio del Bluetooth).',
            },
            {
              type: 'point',
              text: 'Para problemas complejos: anotaciones AR destacan interfaces del dispositivo con guías de desmontaje animadas, reduciendo en un 50% el número de rondas de comunicación.',
            },
          ],
        },
      ],
      [
        {
          title: 'Servicio automatizado de extremo a extremo',
          desc: [
            {
              type: 'point',
              text: 'Integración logística: introduce el número de pedido para consolidar automáticamente los datos del pedido y del envío, con actualizaciones en tiempo real sobre la ubicación/estado/ETA.',
            },
            {
              type: 'point',
              text: 'Pre - juicio posventa: la IA recopila información a través de consultas en varias etapas (por ejemplo, "Fotos del daño", "códigos de error"), y luego dispara automáticamente tickets de reparación o envío de piezas de repuesto, minimizando la intervención humana.',
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车制造
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: 'Requiere soporte de nivel especialista',
          desc: 'Problemas complejos como configuraciones de conducción autónoma y conectividad del vehículo requieren soporte de especialistas, lo que resulta en altos costos por llamada.',
        },
      ],
      [
        {
          title: 'Monitoreo insuficiente de riesgos de conformidad',
          desc: 'Regulaciones como el GDPR de la UE y la Ley Lemon de Estados Unidos son complejas, lo que lleva a altas tasas de supervisión en revisiones manuales de diálogos.',
        },
      ],
      [
        {
          title: 'Falta de soporte multilingüe',
          desc: 'Los mercados del Oriente Medio y Europa del Este requieren capacidad en árabe y polaco, pero la subcontratación de traducciones es cara y la contratación de personal calificado es difícil.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Sistema de enrutamiento dinámico de tickets',
          desc: [
            {
              type: 'point',
              text: 'Escalada de prioridad para problemas de nivel especialista: la IA evalúa automáticamente la complejidad y el riesgo del problema. Por ejemplo, cuando un usuario informa "La conducción autónoma se apagó abruptamente", el sistema marca el ticket como de alta prioridad, lo envía a ingenieros senior y adjunta registros del vehículo.',
            },
            {
              type: 'point',
              text: 'Asignación inteligente de recursos: asigna tickets en función de la especialidad del ingeniero (por ejemplo, "especialista en sistemas híbridos"), ubicación y dominio lingüístico.',
            },
          ],
        },
      ],
      [
        {
          title: 'Notificaciones inteligentes multi - canal',
          desc: 'Envía alertas de recall a través de pop - ups en el vehículo, notificaciones en la aplicación y mensajes directos en las redes sociales. La IA sigue el estado de lectura del usuario y envía recordatorios de seguimiento.',
        },
      ],
      [
        {
          title: 'Motor de conformidad global y adaptación cultural',
          desc: [
            {
              type: 'point',
              text: 'Monitoreo de conformidad en tiempo real: la IA detecta términos sensibles (por ejemplo, "garantía vitalicia", "100% seguro") y los reemplaza por términos conformes (por ejemplo, "garantía de 10 años", "cumple con los estándares de pruebas de colisión").',
            },
            {
              type: 'point',
              text: 'Base de datos de adaptación cultural:',
              subList: [
                {
                  type: 'point',
                  text: 'Oriente Medio: los avatares de los agentes de la IA se configuran como figuras masculinas por defecto.',
                },
                {
                  type: 'point',
                  text: 'India: muestra respuestas bilingües en hindi e inglés por defecto.',
                },
                {
                  type: 'point',
                  text: 'América Latina: incorpora bibliotecas de jerga local.',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    // 汽车零配件及改造
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: 'Verificación ineficiente de la compatibilidad de piezas',
          desc: 'La verificación manual del año del vehículo/modelo del motor consume más de 20 minutos por pedido y tiene una alta tasa de error.',
        },
      ],
      [
        {
          title:
            'Exceso de dependencia del soporte humano para la orientación de instalación',
          desc: 'Los procesos complejos de instalación propia y las barreras lingüísticas para usuarios internacionales llevan a errores operativos y aumento de los costos de devolución.',
        },
      ],
      [
        {
          title: 'Seguimiento logístico fragmentado',
          desc: 'El estado del despacho aduanero requiere verificaciones manuales en sistemas de DHL/aduana, desperdiciando 3 horas diarias por soporte.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor inteligente de combinación de piezas',
          desc: [
            {
              type: 'point',
              text: 'La IA recomienda piezas compatibles a través de la carga del VIN/foto del vehículo.',
            },
            {
              type: 'point',
              text: 'Marca riesgos de modificación (por ejemplo, "Estas pastillas de freno requieren actualizaciones del cilindro").',
            },
          ],
        },
      ],
      [
        {
          title: 'Guía de instalación en tiempo real alimentada por IA',
          desc: 'Proporciona instrucciones visuales paso a paso a través del análisis de fotos en vivo.',
        },
      ],
      [
        {
          title: 'Panel de control de logística transfronteriza',
          desc: [
            {
              type: 'point',
              text: 'Consolida datos de más de 40 transportistas.',
            },
            {
              type: 'point',
              text: 'Muestra en tiempo real:',
              subList: [
                {
                  type: 'point',
                  text: 'Estado de los documentos aduaneros',
                },
                {
                  type: 'point',
                  text: 'Estimaciones de impuestos y tasas',
                },
                {
                  type: 'point',
                  text: 'Tiempo previsto de liberación',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  // 信息技术行业
  {
    // 软件服务
    slug: 'software-services',
    painPoints: [
      [
        {
          title:
            'Consultas básicas en gran volumen agotan los recursos de especialistas',
          desc: 'El 60% de los tickets son repetidos (por ejemplo, restablecimiento de contraseña, consultas de facturación), lo que obliga a los especialistas técnicos a manejar solicitudes de bajo valor, lo que es una gran pérdida de recursos.',
        },
      ],
      [
        {
          title:
            'El lanzamiento de nuevos recursos desencadena picos de soporte',
          desc: 'El aumento repentino de consultas después de las actualizaciones supera la capacidad diaria de soporte, lo que causa respuestas retrasadas y aumento de la rotación de usuarios.',
        },
      ],
      [
        {
          title:
            'Las brechas de huso horario fragmentan el servicio empresarial',
          desc: 'Los clientes del Asia - Pacífico enfrentan un 50% más de tiempo de inactividad para problemas urgentes (por ejemplo, fallas en la API) durante el período fuera de horas de trabajo de la equipo europeo/estadounidense.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor de gestión de cuenta totalmente automatizado',
          desc: [
            {
              type: 'point',
              text: 'Comando de voz (por ejemplo, "Actualizar a la versión Enterprise") hace que la IA:',
              subList: [
                {
                  type: 'point',
                  text: 'Extraiga registros de pago (Stripe, PayPal, etc.)',
                },
                {
                  type: 'point',
                  text: 'Genere informes de facturación comparativos',
                },
                {
                  type: 'point',
                  text: 'Ejecute actualizaciones con un solo clic',
                },
              ],
            },
            {
              type: 'point',
              text: 'Los cambios de permisos se sincronizan instantáneamente con las consolas de administración.',
            },
          ],
        },
      ],
      [
        {
          title: 'Base de conocimientos de IA auto - aprendiz',
          desc: [
            {
              type: 'point',
              text: 'Absorbe automáticamente documentos de lanzamiento para responder a consultas relacionadas con nuevos recursos (por ejemplo, capturas de pantalla anotadas para "configuración del nuevo panel").',
            },
            {
              type: 'point',
              text: 'Registra problemas de alta frecuencia para respuestas instantáneas en el futuro.',
            },
          ],
        },
      ],
      [
        {
          title: 'IA multilingüe 24/7 con escalado a humanos',
          desc: [
            {
              type: 'point',
              text: 'Procesa solicitudes globales a través de LiveChat/email en más de 50 idiomas.',
            },
            {
              type: 'point',
              text: 'Enruta problemas críticos (por ejemplo, caídas del sistema) a humanos con alertas prioritarias.',
            },
          ],
        },
      ],
    ],
  },
  // 金融
  {
    // 银行
    slug: 'banking',
    painPoints: [
      [
        {
          title: 'Riesgos operativos bajo una conformidad rigurosa',
          desc: 'Los nuevos empleados deben memorizar más de 2.000 guiones regulatorios (por ejemplo, cláusulas de protección de privacidad), lo que requiere un entrenamiento de 6 meses con altas tasas de violación inicial.',
        },
      ],
      [
        {
          title: 'Experticia insuficiente en gestión de patrimonio',
          desc: 'El límite de asesores financieros obliga al 80% de los clientes minoristas a recibir recomendaciones estandarizadas, mientras que los individuos de alto patrimonio neto carecen de soluciones personalizadas.',
        },
      ],
      [
        {
          title: 'Servicio fragmentado por huso horario',
          desc: 'Retrasos de más de 4 horas para emergencias en el extranjero (por ejemplo, fraude en tarjeta de crédito/transferencias grandes), coordinación ineficiente entre husos horarios y verificaciones duplicadas de conformidad degradan la continuidad del servicio.',
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor de conformidad de extremo a extremo',
          desc: [
            {
              type: 'point',
              text: 'La IA incorpora el GDPR y otros hitos regulatorios.',
            },
            {
              type: 'point',
              text: 'Bloquea automáticamente términos no conformes en tiempo real.',
            },
          ],
        },
      ],
      [
        {
          title: 'Consultor de patrimonio alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'Integra:',
              subList: [
                {
                  type: 'point',
                  text: 'Datos de la cuenta (flujo de efectivo/apetito al riesgo)',
                },
                {
                  type: 'point',
                  text: 'Señales externas (por ejemplo, tendencias de inversión en las redes sociales)',
                },
              ],
            },
            {
              type: 'point',
              text: 'Actualiza dinámicamente los perfiles de los clientes.',
            },
          ],
        },
      ],
      [
        {
          title: 'Enrutador de IA global de husos horarios',
          desc: [
            {
              type: 'point',
              text: 'Enrutamiento inteligente 24/7 para:',
              subList: [
                {
                  type: 'point',
                  text: 'Acciones de emergencia (por ejemplo, congelación inmediata de la cuenta)',
                },
                {
                  type: 'point',
                  text: 'Adaptación automática de conformidad en varias regiones',
                },
              ],
            },
            {
              type: 'point',
              text: 'Reduce el tiempo de respuesta a 90 segundos.',
            },
          ],
        },
      ],
    ],
  },
  {
    // 保险
    slug: 'insurance',
    painPoints: [
      [
        {
          title: 'Baja eficiencia en la revisión inicial de siniestros',
          desc: 'La revisión manual de cuentas médicas/fotos de accidentes lleva en promedio 72 horas, generando altas tasas de queja.',
        },
      ],
      [
        {
          title: 'Términos ambiguos en las políticas generan disputas',
          desc: 'Interpretaciones equivocadas de "franquicias" y "exclusiones" alimentan litigios excesivos.',
        },
      ],
      [
        {
          title: 'Detección tardía de fraude',
          desc: 'La triaje manual de pistas de fraude en el seguro sufre de altas tasas de omisión, lo que causa pérdidas financieras sustanciales para los aseguradores, mientras que la identificación tardía impide el seguimiento eficaz.',
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'Automatización del procesamiento de siniestros alimentada por IA',
          desc: [
            {
              type: 'point',
              text: 'Siniestros médicos: OCR extrae campos clave (por ejemplo, "ubicación de la fractura"), verifica las condiciones de la póliza.',
            },
            {
              type: 'point',
              text: 'Siniestros automotores: La IA compara fotos de daños con casos históricos para generar estimaciones de reparación.',
            },
          ],
        },
      ],
      [
        {
          title: 'Visualizador interactivo de cláusulas de política',
          desc: [
            {
              type: 'point',
              text: 'Flujogramas interactivos para preguntas como "¿El seguro de mascotas cubre la castración?": Castración → ¿Se necesita asistencia médica? → Sí/Cubierto | No/Excluído.',
            },
            {
              type: 'point',
              text: 'Escenarios complejos (por ejemplo, inundaciones causadas por tifones) se conectan automáticamente a registros oficiales de desastres.',
            },
          ],
        },
      ],
      [
        {
          title: 'Sistema de detección de fraude multidimensional',
          desc: [
            {
              type: 'point',
              text: 'Marca casos sospechosos a través de:',
              subList: [
                {
                  type: 'point',
                  text: 'Análisis del tono de la conversación (por ejemplo, narrativas excesivamente detalladas)',
                },
                {
                  type: 'point',
                  text: 'Patrones de frecuencia de siniestros',
                },
                {
                  type: 'point',
                  text: 'Conflictos geográficos (por ejemplo, el mismo vehículo en dos ubicaciones)',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  // 生命健康行业
  {
    // 医药/设备制造
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title:
            'Barreras lingüísticas y regulatorias en consultas transfronterizas',
          desc: [
            {
              type: 'point',
              text: 'Los usuarios del extranjero enfrentan dificultades lingüísticas durante las consultas en línea.',
            },
            {
              type: 'point',
              text: 'Regulaciones divergentes de dispositivos médicos en diferentes mercados retrasan las respuestas de conformidad.',
            },
          ],
        },
      ],
      [
        {
          title: 'Solución remota de problemas de equipo ineficaz',
          desc: [
            {
              type: 'point',
              text: 'Las descripciones de problemas basadas en texto en línea generalmente no capturan problemas técnicos complejos.',
            },
            {
              type: 'point',
              text: 'El servicio al cliente convencional carece de herramientas de orientación visual.',
            },
          ],
        },
      ],
      [
        {
          title: 'Flujos de trabajo interdepartamentales desconectados',
          desc: [
            {
              type: 'point',
              text: 'Los equipos técnicos/jurídicos no pueden colaborar perfectamente en línea.',
            },
            {
              type: 'point',
              text: 'Procesos de transferencia interrumpidos retrasan la resolución de problemas.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Motor de conformidad multilingüe alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'La IA anota fallas del dispositivo a través del feed de la cámara del smartphone.',
            },
            {
              type: 'point',
              text: 'Superpone animaciones interactivas de reparación.',
            },
            {
              type: 'point',
              text: 'Permite que los especialistas agreguen marcaciones en tiempo real.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Asistente de solución de problemas visuales alimentado por IA',
          desc: [
            {
              type: 'point',
              text: 'Proporciona orientación paso a paso a través del análisis de imágenes en vivo.',
            },
            {
              type: 'point',
              text: 'Proporciona soluciones de diagnóstico contextualizadas.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Enrutamiento inteligente de tickets con integración de conocimiento',
          desc: [
            {
              type: 'point',
              text: 'Categoriza y enruta automáticamente los tickets a los departamentos relevantes.',
            },
            {
              type: 'point',
              text: 'Adjunta casos históricos similares para referencia.',
            },
            {
              type: 'point',
              text: 'Establece un sistema de colaboración en línea en bucle cerrado.',
            },
          ],
        },
      ],
    ],
  },
  {
    // 医疗服务
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: 'Sobrecarga de servicio durante horas pico',
          desc: [
            {
              type: 'point',
              text: 'Altas tasas de ocupación del centro de atención durante horas pico.',
            },
            {
              type: 'point',
              text: 'Llevan a tiempos de espera prolongados para los pacientes.',
            },
            {
              type: 'point',
              text: 'Resultan en tasas de queja persistentes debido a lagunas en el servicio.',
            },
          ],
        },
      ],
      [
        {
          title: 'Precisión de la triaje dependiente de la experiencia',
          desc: [
            {
              type: 'point',
              text: 'Las enfermeras principiantes presentan una tasa de error de juicio de síntomas del 30%.',
            },
            {
              type: 'point',
              text: 'Causan una asignación inadecuada de recursos de emergencia (por ejemplo, confundir angina con gastritis).',
            },
          ],
        },
      ],
      [
        {
          title: 'Vulnerabilidades de privacidad de datos',
          desc: [
            {
              type: 'point',
              text: 'Los sistemas convencionales almacenan registros de conversaciones sin editar.',
            },
            {
              type: 'point',
              text: 'Un monitoreo insuficiente permite riesgos de filtración.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Optimización de la triaje y programación inteligente',
          desc: [
            {
              type: 'point',
              text: 'La IA gestiona consultas de alta frecuencia (registro, información sobre departamentos).',
            },
            {
              type: 'point',
              text: 'Asigna dinámicamente consultas en función de la capacidad real - time de los departamentos.',
            },
            {
              type: 'point',
              text: 'Reduce la congestión en el centro de atención.',
            },
          ],
        },
      ],
      [
        {
          title: 'Triaje clínico mejorado por IA',
          desc: [
            {
              type: 'point',
              text: 'Preguntas y respuestas sobre síntomas en varias etapas (ubicación/duración del dolor).',
            },
            {
              type: 'point',
              text: 'Genera niveles de triaje basados en evidencia de acuerdo con las directrices clínicas.',
            },
            {
              type: 'point',
              text: 'Reduce las tasas de diagnóstico errado.',
            },
          ],
        },
      ],
      [
        {
          title: 'Firewall de privacidad de extremo a extremo',
          desc: [
            {
              type: 'point',
              text: 'Desensibilización en tiempo real del contenido del chat (enmascara automáticamente números de ID/números de expediente).',
            },
            {
              type: 'point',
              text: 'Almacenamiento cifrado de registros de comunicación.',
            },
            {
              type: 'point',
              text: 'Gestión jerárquica de permisos.',
            },
            {
              type: 'point',
              text: 'Garantiza que solo el personal autorizado pueda acceder a información sensible.',
            },
          ],
        },
      ],
    ],
  },
];

// 行业解决方案数据 - 法语
export const solutionsDataFR = [
  {
    slug: 'furniture-and-home-furnishings',
    painPoints: [
      [
        {
          title:
            'Le recrutement et la formation des employés de service client sont longs et coûteux',
          desc: [
            {
              type: 'point',
              text: 'Étant donné que le service client dans le secteur des meubles est hautement spécialisé et demande de solides connaissances du produit, le processus de formation peut prendre environ trois mois.',
            },
            {
              type: 'point',
              text: "L'instabilité de l'emploi et les difficultés de recrutement avant la saison haute augmentent les coûts.",
            },
          ],
        },
      ],
      [
        {
          title:
            'Manque de support multilingue pour les marchés européens (par exemple, allemand, français)',
          desc: "La dépendance du service client en anglais nuit à l'expérience et à l'efficacité des clients.",
        },
      ],
      [
        {
          title:
            'Complexités logistiques pour les articles volumineux ou multi - pièces',
          desc: "Les articles de meubles volumineux nécessitent souvent des expéditions divisées, un partitionnement manuel des commandes ou l'envoi de plusieurs colis. Dans certains cas, une seule commande peut être traitée par plusieurs transporteurs logistiques. Lorsque les clients demandent des informations sur l'état de l'expédition, le support doit identifier manuellement l'état de la commande et suivre les colis sur différentes plateformes, ce qui est un processus long et fastidieux.",
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Apprentissage automatique des connaissances produit',
          desc: "L'IA absorbe les données historiques et la documentation pour construire des connaissances propriétaires.",
        },
      ],
      [
        {
          title: 'Support multilingue',
          desc: "L'IA de Solvea surmonte ces barrières en offrant une maîtrise native de toutes les principales langues européennes et asiatiques (y compris le français, l'allemand, le japonais, l'espagnol, le portugais, etc.) et en automatisant des réponses adaptées culturellement qui surpassent celles des agents humains.",
        },
      ],
      [
        {
          title:
            "Service de consultation et d'identification logistique totalement automatisé",
          desc: "Solvea est profondément intégrée aux principaux systèmes logistiques. Elle agrège automatiquement les données de suivi des entrepôts dispersés et des expéditions avec de multiples accessoires, ce qui permet aux clients de suivre en temps réel l'avancement de leur commande.",
        },
      ],
    ],
  },
  {
    slug: 'consumer-electronics',
    painPoints: [
      [
        {
          title:
            'La rapide itération des produits entraîne un retard dans les connaissances',
          desc: "Lorsque les clients posent des questions sur les paramètres et les problèmes de compatibilité des nouveaux modèles, les réponses sont imprécises et le nombre de questions est élevé. La mise à jour manuelle de la base de connaissances est inefficace et présente un taux d'erreur élevé.",
        },
      ],
      [
        {
          title: 'Réponse insuffisante aux demandes techniques internationales',
          desc: "Les utilisateurs européens et américains doivent attendre de six à huit heures pour obtenir des réponses à leurs questions sur les pannes d'équipement (telles que le blocage et la défaillance du système) pendant la nuit, et le taux de perte des demandes urgentes peut atteindre 30 %.",
        },
      ],
      [
        {
          title: 'La pression après - vente augmente lors des promotions',
          desc: 'Le nombre de questions sur les retours/échanges double lors des promotions, et des questions de base telles que le suivi de la logistique et la clarification des politiques consomment beaucoup de temps.',
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            "Synchronisation en temps réel de la base de données produit de l'IA",
          desc: "L'IA se synchronise en temps réel avec les bases de données produits pour traiter automatiquement les spécifications et gérer les demandes multilingues.",
        },
      ],
      [
        {
          title: 'Diagnostic intelligent et alertes proactives',
          desc: "Après que l'utilisateur a envoyé la vidéo de résolution de problème, l'IA la croise avec la bibliothèque de cas et propose des solutions (telles que 'les étapes de redémarrage forcé'); Elle déclenche automatiquement des alertes pop - up du système pour les problèmes fréquents (par exemple, 'téléchargement du correctif de déconnexion Wi - Fi').",
        },
      ],
      [
        {
          title: 'Chaîne de production après - vente totalement automatisée',
          desc: "L'IA identifie les raisons du retour, génère automatiquement des étiquettes d'expédition et envoie des mises à jour de suivi en temps réel. Les questions liées aux politiques sont traitées par la vérification de conformité de l'IA pour des réponses précises.",
        },
      ],
    ],
  },
  {
    slug: 'short-distance-travel',
    painPoints: [
      [
        {
          title:
            'Bottlenecks de service dans différentes langues et fuseaux horaires',
          desc: [
            {
              type: 'point',
              text: "Il est nécessaire de couvrir l'anglais, l'espagnol, le français et les langues nordiques sur les marchés européens et américains, ce qui entraîne des coûts élevés pour les traducteurs dédiés.",
            },
            {
              type: 'point',
              text: "Les différences de fuseau horaire entraînent des délais de huit à douze heures pour les questions posées la nuit, ce qui nuit à l'expérience utilisateur.",
            },
          ],
        },
      ],
      [
        {
          title: 'Support à distance inefficace pour les problèmes techniques',
          desc: [
            {
              type: 'point',
              text: 'Les pannes de batterie et les problèmes de connexion du dispositif nécessitent en moyenne de quatre à cinq cycles de communication pour le diagnostic.',
            },
            {
              type: 'point',
              text: "L'assistance à distance devient particulièrement difficile en l'absence de réseaux de réparation locaux.",
            },
          ],
        },
      ],
      [
        {
          title:
            'Logistique transfrontalière et traitement après - vente compliqués',
          desc: [
            {
              type: 'point',
              text: 'La logistique des commandes internationales est fragmentée (par exemple, le suivi de la dédouanement, les questions sur les taxes).',
            },
            {
              type: 'point',
              text: 'Les problèmes après - vente nécessitent des confirmations répétées des détails des dommages, ce qui entraîne une faible efficacité du traitement manuel.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Ai multilingue + couverture de fuseau horaire 24/7',
          desc: [
            {
              type: 'point',
              text: "Elle détecte automatiquement la langue de l'utilisateur et génère des réponses localisées, prenant en charge les langues moins courantes telles que les dialectes nordiques.",
            },
            {
              type: 'point',
              text: "L'IA gère parfaitement les questions posées la nuit avec une réponse en quelques secondes (par exemple, 'Le trottinette électrique ne se charge pas'), éliminant les problèmes liés aux fuseaux horaires.",
            },
          ],
        },
      ],
      [
        {
          title:
            'Diagnostic intelligent et assistance à distance avec réalité augmentée',
          desc: [
            {
              type: 'point',
              text: "Après que les utilisateurs ont envoyé des descriptions/photos de pannes, l'IA les croise avec la base de connaissances pour proposer des solutions (par exemple, les étapes de réinitialisation du Bluetooth).",
            },
            {
              type: 'point',
              text: 'Pour les problèmes complexes : les annotations en réalité augmentée mettent en évidence les interfaces du dispositif avec des guides de démontage animés, réduisant de 50 % le nombre de cycles de communication.',
            },
          ],
        },
      ],
      [
        {
          title: 'Service automatisé de bout en bout',
          desc: [
            {
              type: 'point',
              text: "Intégration logistique : saisissez le numéro de commande pour consolider automatiquement les données de commande et d'expédition, avec des mises à jour en temps réel sur la localisation/état/ETA.",
            },
            {
              type: 'point',
              text: "Pré - jugement après - vente : l'IA collecte des informations grâce à des questions en plusieurs étapes (par exemple, 'Photos des dommages', 'codes d'erreur'), puis déclenche automatiquement des tickets de réparation ou d'envoi de pièces de rechange, minimisant l'intervention humaine.",
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'automobile-manufacturing',
    painPoints: [
      [
        {
          title: 'Nécessite un support de niveau spécialiste',
          desc: "Des problèmes complexes tels que les paramétrages de la conduite autonome et la connectivité du véhicule nécessitent un support d'experts, ce qui entraîne des coûts élevés par appel.",
        },
      ],
      [
        {
          title: 'Surveillance insuffisante des risques de conformité',
          desc: "Des réglementations telles que le RGPD de l'UE et la loi Lemon des États - Unis sont complexes, ce qui entraîne des taux élevés de supervision lors des révisions manuelles des dialogues.",
        },
      ],
      [
        {
          title: 'Manque de support multilingue',
          desc: "Les marchés du Moyen - Orient et d'Europe de l'Est nécessitent des compétences en arabe et en polonais, mais la sous - traitance des traductions est coûteuse et le recrutement de personnel qualifié est difficile.",
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Système de routage dynamique des tickets',
          desc: [
            {
              type: 'point',
              text: "Échelonnement de priorité pour les problèmes de niveau spécialiste : l'IA évalue automatiquement la complexité et le risque du problème. Par exemple, lorsque l'utilisateur signale 'La conduite autonome s'est arrêtée brusquement', le système marque le ticket comme étant de haute priorité, l'envoie aux ingénieurs seniors et joint les journaux du véhicule.",
            },
            {
              type: 'point',
              text: "Affectation intelligente des ressources : elle attribue les tickets en fonction de la spécialité de l'ingénieur (par exemple, 'spécialiste des systèmes hybrides'), de sa localisation et de sa maîtrise linguistique.",
            },
          ],
        },
      ],
      [
        {
          title: 'Notifications intelligentes multi - canal',
          desc: "Elle envoie des alertes de rappel via des pop - ups dans le véhicule, des notifications dans l'application et des messages directs sur les réseaux sociaux. L'IA suit l'état de lecture de l'utilisateur et envoie des rappels de suivi.",
        },
      ],
      [
        {
          title: 'Moteur de conformité global et adaptation culturelle',
          desc: [
            {
              type: 'point',
              text: "Surveillance en temps réel de la conformité : l'IA détecte les termes sensibles (par exemple, 'garantie à vie', '100 % sûr') et les remplace par des termes conformes (par exemple, 'garantie de dix ans', 'conforme aux normes de tests de collision').",
            },
            {
              type: 'point',
              text: "Base de données d'adaptation culturelle :",
              subList: [
                {
                  type: 'point',
                  text: "Moyen - Orient : les avatars des agents de l'IA sont configurés par défaut comme des figures masculines.",
                },
                {
                  type: 'point',
                  text: 'Inde : elle affiche par défaut des réponses bilingues en hindi et en anglais.',
                },
                {
                  type: 'point',
                  text: 'Amérique Latine : elle intègre des bibliothèques de jargons locaux.',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'auto-parts-and-modification',
    painPoints: [
      [
        {
          title: 'Vérification inefficace de la compatibilité des pièces',
          desc: "La vérification manuelle de l'année du véhicule/du modèle du moteur prend plus de vingt minutes par commande et présente un taux d'erreur élevé.",
        },
      ],
      [
        {
          title:
            "Dépendance excessive au support humain pour l'assistance à l'installation",
          desc: "Les processus complexes d'installation par les utilisateurs et les barrières linguistiques pour les utilisateurs internationaux entraînent des erreurs opérationnelles et une augmentation des coûts de retour.",
        },
      ],
      [
        {
          title: 'Suivi logistique fragmenté',
          desc: "L'état de la dédouanement nécessite des vérifications manuelles dans les systèmes de DHL/des douanes, ce qui fait perdre trois heures par jour au support.",
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Moteur intelligent de combinaison de pièces',
          desc: [
            {
              type: 'point',
              text: "L'IA recommande des pièces compatibles via le téléchargement du VIN/photo du véhicule.",
            },
            {
              type: 'point',
              text: 'Elle marque les risques de modification (par exemple, "Ces plaquettes de frein nécessitent des mises à jour du cylindre").',
            },
          ],
        },
      ],
      [
        {
          title: "Guide d'installation en temps réel alimenté par l'IA",
          desc: "Il fournit des instructions visuelles étape par étape grâce à l'analyse de photos en direct.",
        },
      ],
      [
        {
          title: 'Tableau de bord de la logistique transfrontalière',
          desc: [
            {
              type: 'point',
              text: 'Il consolide les données de plus de quarante transporteurs.',
            },
            {
              type: 'point',
              text: 'Il affiche en temps réel :',
              subList: [
                {
                  type: 'point',
                  text: "L'état des documents douaniers",
                },
                {
                  type: 'point',
                  text: 'Les estimations de taxes et de droits',
                },
                {
                  type: 'point',
                  text: 'Le temps prévu de libération',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'software-services',
    painPoints: [
      [
        {
          title:
            'Les demandes de base en grand volume épuisent les ressources des spécialistes',
          desc: '60 % des tickets sont répétés (par exemple, la réinitialisation du mot de passe, les demandes de facturation), ce qui oblige les spécialistes techniques à traiter des demandes de faible valeur, ce qui est un gaspillage considérable de ressources.',
        },
      ],
      [
        {
          title:
            'Le lancement de nouvelles fonctionnalités déclenche des pics de support',
          desc: "L'augmentation soudaine de demandes après les mises à jour dépasse la capacité journalière de support, ce qui entraîne des retards dans les réponses et une augmentation du taux de rotation des utilisateurs.",
        },
      ],
      [
        {
          title:
            "Les écarts de fuseau horaire fragmentent le service d'entreprise",
          desc: "Les clients de la région Asie - Pacifique subissent 50 % plus de temps d'inactivité pour les problèmes urgents (par exemple, les pannes de l'API) en dehors des heures de travail de l'équipe européenne/américaine.",
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Moteur de gestion de compte totalement automatisé',
          desc: [
            {
              type: 'point',
              text: "Une commande vocale (par exemple, 'Mettre à jour vers la version Entreprise') amène l'IA à :",
              subList: [
                {
                  type: 'point',
                  text: 'Extraire les enregistrements de paiement (Stripe, PayPal, etc.)',
                },
                {
                  type: 'point',
                  text: 'Générer des rapports de facturation comparatifs',
                },
                {
                  type: 'point',
                  text: 'Effectuer les mises à jour avec un seul clic',
                },
              ],
            },
            {
              type: 'point',
              text: "Les modifications des autorisations sont synchronisées instantanément avec les consoles d'administration.",
            },
          ],
        },
      ],
      [
        {
          title: "Base de connaissances d'IA auto - apprenante",
          desc: [
            {
              type: 'point',
              text: "Elle ingère automatiquement les documents de lancement pour répondre aux demandes liées aux nouvelles fonctionnalités (par exemple, des captures d'écran annotées pour 'la configuration du nouveau tableau de bord').",
            },
            {
              type: 'point',
              text: "Elle enregistre les problèmes fréquents pour fournir des réponses instantanées à l'avenir.",
            },
          ],
        },
      ],
      [
        {
          title: 'IA multilingue 24/7 avec escalade vers les humains',
          desc: [
            {
              type: 'point',
              text: 'Elle traite les demandes internationales via LiveChat/email dans plus de cinquante langues.',
            },
            {
              type: 'point',
              text: 'Elle transfère les problèmes critiques (par exemple, les pannes du système) aux humains avec des alertes prioritaires.',
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'banking',
    painPoints: [
      [
        {
          title: 'Risques opérationnels sous une conformité stricte',
          desc: 'Les nouveaux employés doivent mémoriser plus de 2 000 scénarios réglementaires (par exemple, les clauses de protection de la vie privée), ce qui nécessite une formation de six mois avec de hauts taux de violation initiale.',
        },
      ],
      [
        {
          title: 'Expertise insuffisante en gestion de patrimoine',
          desc: "La limite d'assesseurs financiers oblige 80 % des clients de détail à recevoir des recommandations standardisées, tandis que les particuliers à haut patrimoine n'ont pas accès à des solutions personnalisées.",
        },
      ],
      [
        {
          title: 'Service fragmenté par les fuseaux horaires',
          desc: "Des retards de plus de quatre heures pour les urgences à l'étranger (par exemple, la fraude sur carte de crédit/les transferts importants), une coordination inefficace entre les fuseaux horaires et des vérifications de conformité redondantes dégradent la continuité du service.",
        },
      ],
    ],
    solutions: [
      [
        {
          title: 'Moteur de conformité de bout en bout',
          desc: [
            {
              type: 'point',
              text: "L'IA intègre le RGPD et d'autres repères réglementaires.",
            },
            {
              type: 'point',
              text: 'Elle bloque automatiquement les termes non conformes en temps réel.',
            },
          ],
        },
      ],
      [
        {
          title: "Conseiller en patrimoine alimenté par l'IA",
          desc: [
            {
              type: 'point',
              text: 'Il intègre :',
              subList: [
                {
                  type: 'point',
                  text: 'Les données du compte (flux de trésorerie/appétit au risque)',
                },
                {
                  type: 'point',
                  text: "Les signaux externes (par exemple, les tendances d'investissement sur les réseaux sociaux)",
                },
              ],
            },
            {
              type: 'point',
              text: 'Il met à jour dynamiquement les profils des clients.',
            },
          ],
        },
      ],
      [
        {
          title: "Routeur d'IA global des fuseaux horaires",
          desc: [
            {
              type: 'point',
              text: 'Routage intelligent 24h/24 pour :',
              subList: [
                {
                  type: 'point',
                  text: "Les actions d'urgence (par exemple, la mise en quarantaine immédiate du compte)",
                },
                {
                  type: 'point',
                  text: "L'adaptation automatique de la conformité dans plusieurs régions",
                },
              ],
            },
            {
              type: 'point',
              text: 'Il réduit le temps de réponse à 90 secondes.',
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'insurance',
    painPoints: [
      [
        {
          title:
            'Faible efficacité dans la vérification initiale des sinistres',
          desc: "La vérification manuelle des dossiers médicaux/photos d'accidents prend en moyenne 72 heures, ce qui génère de hauts taux de réclamation.",
        },
      ],
      [
        {
          title: 'Termes ambigus dans les politiques entraînent des litiges',
          desc: 'Des interprétations erronées de "franchises" et "exclusions" alimentent des litiges excessifs.',
        },
      ],
      [
        {
          title: 'Détection tardive de fraude',
          desc: "Le tri manuel des indices de fraude dans l'assurance souffre de hauts taux d'omission, ce qui entraîne des pertes financières importantes pour les assureurs, tandis que la détection tardive empêche un suivi efficace.",
        },
      ],
    ],
    solutions: [
      [
        {
          title: "Automation du traitement des sinistres alimentée par l'IA",
          desc: [
            {
              type: 'point',
              text: "Sinistres médicaux : l'OCR extrait les champs clés (par exemple, 'l'emplacement de la fracture'), vérifie les conditions de la police.",
            },
            {
              type: 'point',
              text: "Sinistres automobiles : l'IA compare les photos des dommages avec les cas historiques pour générer des estimations de réparation.",
            },
          ],
        },
      ],
      [
        {
          title: 'Visualiseur interactif des clauses de police',
          desc: [
            {
              type: 'point',
              text: "Des diagrammes interactifs pour des questions telles que 'L'assurance animaux couvre - t - elle la castration?' : Castration → Est - ce qu'une assistance médicale est nécessaire? → Oui/Couvert | Non/Exclu.",
            },
            {
              type: 'point',
              text: 'Des scénarios complexes (par exemple, les inondations causées par des ouragans) sont automatiquement liés aux registres officiels de désastres.',
            },
          ],
        },
      ],
      [
        {
          title: 'Système de détection de fraude multidimensionnel',
          desc: [
            {
              type: 'point',
              text: 'Il marque les cas suspects grâce à :',
              subList: [
                {
                  type: 'point',
                  text: "L'analyse du ton de la conversation (par exemple, des récits excessivement détaillés)",
                },
                {
                  type: 'point',
                  text: 'Les modèles de fréquence des sinistres',
                },
                {
                  type: 'point',
                  text: 'Les conflits géographiques (par exemple, le même véhicule en deux endroits)',
                },
              ],
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'equipment-manufacturing',
    painPoints: [
      [
        {
          title:
            'Barrières linguistiques et réglementaires dans les consultations transfrontalières',
          desc: [
            {
              type: 'point',
              text: 'Les utilisateurs étrangers rencontrent des difficultés linguistiques lors des consultations en ligne.',
            },
            {
              type: 'point',
              text: 'Des réglementations divergentes concernant les dispositifs médicaux dans différents marchés retardent les réponses en matière de conformité.',
            },
          ],
        },
      ],
      [
        {
          title: "Résolution à distance des problèmes d'équipement inefficace",
          desc: [
            {
              type: 'point',
              text: 'Les descriptions de problèmes basées sur du texte en ligne ne capturent généralement pas les problèmes techniques complexes.',
            },
            {
              type: 'point',
              text: "Le service client classique manque d'outils d'orientation visuelle.",
            },
          ],
        },
      ],
      [
        {
          title: 'Flux de travail inter - départements déconnectés',
          desc: [
            {
              type: 'point',
              text: 'Les équipes techniques/juridiques ne peuvent pas collaborer parfaitement en ligne.',
            },
            {
              type: 'point',
              text: 'Des processus de transfert interrompus retardent la résolution des problèmes.',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title: "Moteur de conformité multilingue alimenté par l'IA",
          desc: [
            {
              type: 'point',
              text: "L'IA repère les pannes du dispositif via le flux vidéo du smartphone.",
            },
            {
              type: 'point',
              text: 'Elle superpose des animations interactives de réparation.',
            },
            {
              type: 'point',
              text: "Elle permet aux experts d'ajouter des annotations en temps réel.",
            },
          ],
        },
      ],
      [
        {
          title:
            "Assistant de résolution de problèmes visuels alimenté par l'IA",
          desc: [
            {
              type: 'point',
              text: "Il fournit des instructions étape par étape grâce à l'analyse d'images en direct.",
            },
            {
              type: 'point',
              text: 'Il propose des solutions de diagnostic contextualisées.',
            },
          ],
        },
      ],
      [
        {
          title:
            'Routage intelligent des tickets avec intégration des connaissances',
          desc: [
            {
              type: 'point',
              text: 'Il catégorise et route automatiquement les tickets vers les départements concernés.',
            },
            {
              type: 'point',
              text: 'Il joint des cas historiques similaires pour référence.',
            },
            {
              type: 'point',
              text: 'Il établit un système de collaboration en ligne en boucle fermée.',
            },
          ],
        },
      ],
    ],
  },
  {
    slug: 'medical-services',
    painPoints: [
      [
        {
          title: 'Surcharge de service pendant les heures de pointe',
          desc: [
            {
              type: 'point',
              text: "Taux d'occupation élevé du centre d'appels pendant les heures de pointe",
            },
            {
              type: 'point',
              text: "Entraîne des délais d'attente prolongés pour les patients",
            },
            {
              type: 'point',
              text: 'Résulte en des taux de réclamation persistants en raison de lacunes dans le service',
            },
          ],
        },
      ],
      [
        {
          title: "Précision de la triage dépendante de l'expérience",
          desc: [
            {
              type: 'point',
              text: "Les infirmières débutantes ont un taux d'erreur de jugement des symptômes de 30 %",
            },
            {
              type: 'point',
              text: "Entraîne une mauvaise affectation des ressources d'urgence (par exemple, confondre une angine de poitrine avec une gastrite)",
            },
          ],
        },
      ],
      [
        {
          title: 'Vulnérabilités en matière de confidentialité des données',
          desc: [
            {
              type: 'point',
              text: 'Les systèmes classiques stockent des enregistrements de conversations non édités',
            },
            {
              type: 'point',
              text: 'Une surveillance insuffisante permet des risques de fuite',
            },
          ],
        },
      ],
    ],
    solutions: [
      [
        {
          title:
            'Optimisation de la triage et de la planification intelligente',
          desc: [
            {
              type: 'point',
              text: "L'IA gère les demandes fréquentes (enregistrement, informations sur les départements)",
            },
            {
              type: 'point',
              text: 'Attribue dynamiquement les rendez - vous en fonction de la capacité en temps réel des départements',
            },
            {
              type: 'point',
              text: "Réduit la congestion au centre d'appels",
            },
          ],
        },
      ],
      [
        {
          title: "Triage clinique amélioré par l'IA",
          desc: [
            {
              type: 'point',
              text: 'Questions - réponses sur les symptômes en plusieurs étapes (emplacement/durée de la douleur)',
            },
            {
              type: 'point',
              text: 'Génère des niveaux de triage basés sur des preuves conformément aux directives cliniques',
            },
            {
              type: 'point',
              text: 'Réduit les taux de diagnostic erroné',
            },
          ],
        },
      ],
      [
        {
          title: 'Firewall de confidentialité de bout en bout',
          desc: [
            {
              type: 'point',
              text: "Désensibilisation en temps réel du contenu du chat (masque automatiquement les numéros d'identification/numéros de dossiers médicaux)",
            },
            {
              type: 'point',
              text: 'Stockage chiffré des enregistrements de communication',
            },
            {
              type: 'point',
              text: 'Gestion des autorisations hiérarchiques',
            },
            {
              type: 'point',
              text: 'Garantit que seuls les personnels autorisés peuvent accéder aux informations sensibles',
            },
          ],
        },
      ],
    ],
  },
];

// 行业解决方案数据 - 汇总
export const solutionsData = {
  'en-US': solutionsDataEN,
  'zh-CN': solutionsDataCN,
  'ja-JP': solutionsDataJP,
  'de-DE': solutionsDataDE,
  'pt-PT': solutionsDataPT,
  'es-ES': solutionsDataES,
  'fr-FR': solutionsDataFR,
};
