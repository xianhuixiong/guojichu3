/*
  Antitrust International Cooperation DB (AICDB)
  Seed dataset for the static prototype site.

  All records are based on publicly available sources (official websites, treaty repositories, OECD, etc.).
  This is a curated seed dataset and can be expanded.
*/

window.AICDB = {
  "meta": {
    "projectNameCN": "反垄断国际交流合作数据库（示范站）",
    "projectNameEN": "Antitrust International Cooperation Database (Prototype)",
    "version": "2026.01",
    "lastUpdated": "2026-01-20",
    "note": "本示范站为静态前端原型：用于展示栏目结构、检索逻辑和信息呈现方式；数据为公开权威来源的精选条目，可按项目需要持续扩充。"
  },
  "jurisdictions": [
    {
      "code": "US",
      "nameCN": "美国",
      "nameEN": "United States"
    },
    {
      "code": "EU",
      "nameCN": "欧盟",
      "nameEN": "European Union"
    },
    {
      "code": "UK",
      "nameCN": "英国",
      "nameEN": "United Kingdom"
    },
    {
      "code": "JP",
      "nameCN": "日本",
      "nameEN": "Japan"
    },
    {
      "code": "KR",
      "nameCN": "韩国",
      "nameEN": "Republic of Korea"
    },
    {
      "code": "CA",
      "nameCN": "加拿大",
      "nameEN": "Canada"
    },
    {
      "code": "AU",
      "nameCN": "澳大利亚",
      "nameEN": "Australia"
    },
    {
      "code": "MX",
      "nameCN": "墨西哥",
      "nameEN": "Mexico"
    },
    {
      "code": "NZ",
      "nameCN": "新西兰",
      "nameEN": "New Zealand"
    },
    {
      "code": "SG",
      "nameCN": "新加坡",
      "nameEN": "Singapore"
    },
    {
      "code": "BR",
      "nameCN": "巴西",
      "nameEN": "Brazil"
    },
    {
      "code": "IN",
      "nameCN": "印度",
      "nameEN": "India"
    },
    {
      "code": "ZA",
      "nameCN": "南非",
      "nameEN": "South Africa"
    },
    {
      "code": "DE",
      "nameCN": "德国",
      "nameEN": "Germany"
    }
  ],
  "sources": [
    {
      "id": "oecd_comp_intlcoop",
      "name": "OECD - Competition and international co-operation",
      "url": "https://www.oecd.org/en/topics/competition-and-international-co-operation.html"
    },
    {
      "id": "oecd_inventory_comp_agreements_2025",
      "name": "OECD Inventory (2025) - International cooperation agreements on competition",
      "url": "https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/competition-and-international-co-operation/2025-inventory-of-international-cooperation-agreements-on-competition.pdf/_jcr_content/renditions/original./2025-inventory-of-international-cooperation-agreements-on-competition.pdf"
    },
    {
      "id": "oecd_inventory_mou_2025",
      "name": "OECD Inventory (2025) - MOUs between competition agencies",
      "url": "https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/competition-and-international-co-operation/2025-inventory-of-international-cooperation-agreements-between-competition-agencies-MOUs.pdf/_jcr_content/renditions/original./2025-inventory-of-international-cooperation-agreements-between-competition-agencies-MOUs.pdf"
    },
    {
      "id": "ftc_intl_agreements",
      "name": "FTC - International cooperation agreements",
      "url": "https://www.ftc.gov/policy/international/international-cooperation-agreements"
    },
    {
      "id": "doj_coop_map",
      "name": "U.S. DOJ Antitrust Division - Antitrust Cooperation Agreements Map",
      "url": "https://www.justice.gov/atr/antitrust-cooperation-agreements-map"
    },
    {
      "id": "mou_us_korea_2015",
      "name": "MOU on Antitrust Cooperation (DOJ/FTC - KFTC, 2015) (PDF)",
      "url": "https://www.ftc.gov/system/files/documents/cooperation_agreements/150908kftc-ftc-dojmou.pdf"
    },
    {
      "id": "mou_multilateral_2020",
      "name": "Multilateral Mutual Assistance and Cooperation Framework for Competition Authorities (2020) (PDF)",
      "url": "https://www.ftc.gov/system/files/documents/cooperation_agreements/multilateralcompetitionmou.pdf"
    },
    {
      "id": "euuk_comp_agreement_press",
      "name": "European Commission - EU-UK Competition Cooperation Agreement (IP_25_1273) (PDF)",
      "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_25_1273/IP_25_1273_EN.pdf"
    },
    {
      "id": "euuk_council_decision_2025_2376",
      "name": "EUR-Lex - Council Decision (EU) 2025/2376 (PDF)",
      "url": "https://eur-lex.europa.eu/eli/dec/2025/2376/oj/eng/pdf"
    },
    {
      "id": "rcep_ch13",
      "name": "RCEP Chapter 13 - Competition (DFAT Australia) (PDF)",
      "url": "https://www.dfat.gov.au/sites/default/files/chapter-13-competition.pdf"
    },
    {
      "id": "usmca_text",
      "name": "USTR - USMCA Agreement Text (table of contents)",
      "url": "https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement/agreement-between"
    },
    {
      "id": "cptpp_text_mfat",
      "name": "New Zealand MFAT - CPTPP text and resources",
      "url": "https://www.mfat.govt.nz/en/trade/free-trade-agreements/free-trade-agreements-in-force/cptpp/comprehensive-and-progressive-agreement-for-trans-pacific-partnership-text-and-resources/"
    },
    {
      "id": "eu_google_shopping_case",
      "name": "European Commission Decision - Google Search (Shopping) AT.39740 (PDF)",
      "url": "https://ec.europa.eu/competition/antitrust/cases/dec_docs/39740/39740_14996_3.pdf"
    },
    {
      "id": "eu_google_android_press",
      "name": "European Commission Press Release - Google Android IP_18_4581 (PDF)",
      "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_18_4581/IP_18_4581_EN.pdf"
    },
    {
      "id": "eu_apple_pay_commitments",
      "name": "European Commission Press Release - Apple NFC commitments IP_24_3706 (PDF)",
      "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/fin/ip_24_3706/IP_24_3706_EN.pdf"
    },
    {
      "id": "eu_apple_music_fine",
      "name": "European Commission Press Release - Apple music streaming fine IP_24_1161 (PDF)",
      "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_24_1161/IP_24_1161_EN.pdf"
    },
    {
      "id": "doj_google_search_remedies_2025",
      "name": "U.S. DOJ Press Release (2025-09-02) - Proposed remedies in Google search case",
      "url": "https://www.justice.gov/opa/pr/justice-department-and-state-attorneys-general-file-proposed-final-judgment-require-google"
    },
    {
      "id": "doj_google_adtech_2025",
      "name": "U.S. DOJ Press Release (2025-04-17) - DOJ prevails in Google ad tech case",
      "url": "https://www.justice.gov/opa/pr/justice-department-prevails-antitrust-case-against-google"
    },
    {
      "id": "ftc_amazon_2023",
      "name": "FTC Press Release (2023-09) - FTC sues Amazon for illegally maintaining monopoly power",
      "url": "https://www.ftc.gov/news-events/news/press-releases/2023/09/ftc-sues-amazon-illegally-maintaining-monopoly-power"
    },
    {
      "id": "cma_msft_activision_final_report",
      "name": "CMA Final Report (2023-04-26) - Microsoft/Activision (PDF)",
      "url": "https://assets.publishing.service.gov.uk/media/644939aa529eda000c3b0525/Microsoft_Activision_Final_Report_.pdf"
    },
    {
      "id": "cma_adobe_figma_case",
      "name": "CMA case page - Adobe/Figma merger inquiry",
      "url": "https://www.gov.uk/cma-cases/adobe-slash-figma-merger-inquiry"
    },
    {
      "id": "jftc_hd_2025",
      "name": "JFTC Press Release (2025-09-18) - Harley-Davidson Japan order",
      "url": "https://www.jftc.go.jp/en/pressreleases/yearly-2025/September/250918.html"
    },
    {
      "id": "eu_merger_stats",
      "name": "European Commission - Merger statistics page",
      "url": "https://competition-policy.ec.europa.eu/mergers/statistics_en"
    },
    {
      "id": "cma_annual_report_2023_2024",
      "name": "CMA Annual Report and Accounts 2023 to 2024 (GOV.UK)",
      "url": "https://www.gov.uk/government/publications/cma-annual-report-and-accounts-2023-to-2024"
    },
    {
      "id": "jftc_annual_report_fy2024",
      "name": "JFTC Annual Report FY2024 (Apr 2024-Mar 2025)",
      "url": "https://www.jftc.go.jp/en/about_jftc/annual_reports/2024.html"
    },
    {
      "id": "kftc_stats",
      "name": "KFTC statistics (yearbook list)",
      "url": "https://www.ftc.go.kr/eng/selectBbsNttList.do?bordCd=823&key=565"
    }
  ],
  "datasets": {
    "cooperation": {
      "mou": [
        {
          "id": "mou-us-dojftc-kftc-2015",
          "titleCN": "美国司法部反垄断司/联邦贸易委员会与韩国公平交易委员会《反垄断合作备忘录》",
          "titleEN": "MOU on Antitrust Cooperation (U.S. DOJ Antitrust Division, U.S. FTC and Korea Fair Trade Commission)",
          "parties": [
            "U.S. DOJ Antitrust Division",
            "U.S. Federal Trade Commission",
            "Korea Fair Trade Commission"
          ],
          "jurisdictions": [
            "US",
            "KR"
          ],
          "signedDate": "2015-09-08",
          "status": "In force",
          "summaryCN": "在信息交流、执法协作、经验分享与人员交流等方面建立合作框架，并强调在各方法律允许范围内开展协作。",
          "keyPointsCN": [
            "建立联络点与沟通机制",
            "在并购审查、反垄断调查等领域开展合作",
            "强调保密与信息使用限制",
            "鼓励研讨会、培训与人员交流"
          ],
          "sourceId": "mou_us_korea_2015",
          "attachmentTitle": "PDF（官方）"
        },
        {
          "id": "agreement-eu-uk-competition-cooperation-2025",
          "titleCN": "欧盟—英国《竞争合作协定》（Competition Cooperation Agreement）",
          "titleEN": "EU–UK Competition Cooperation Agreement",
          "parties": [
            "European Union (Commission & Member State NCAs)",
            "United Kingdom (CMA)"
          ],
          "jurisdictions": [
            "EU",
            "UK"
          ],
          "signedDate": "2025-11-04",
          "status": "Adoption / conclusion procedures (see Council Decision)",
          "summaryCN": "为欧盟委员会、成员国竞争主管机关与英国CMA在反垄断与并购执法中建立更系统的通报、协调与合作框架。",
          "keyPointsCN": [
            "相互通报重要调查与并购审查",
            "就救济措施/承诺协调沟通",
            "在法律许可范围内的信息共享",
            "促进执法一致性与效率"
          ],
          "sourceId": "euuk_council_decision_2025_2376",
          "relatedSources": [
            "euuk_comp_agreement_press"
          ]
        },
        {
          "id": "agreement-eu-us-competition-1991",
          "titleCN": "美国—欧盟《关于适用竞争法的协定》（1991）",
          "titleEN": "EU–US Agreement regarding the application of their competition laws (1991)",
          "parties": [
            "United States",
            "European Communities"
          ],
          "jurisdictions": [
            "US",
            "EU"
          ],
          "signedDate": "1991-09-23",
          "status": "In force (historic baseline agreement)",
          "summaryCN": "确立跨大西洋竞争执法合作的基础性框架，包括通知、协调与积极礼让等内容。",
          "keyPointsCN": [
            "调查/程序的相互通知",
            "在执法活动中考虑对方重要利益",
            "鼓励协调与避免冲突"
          ],
          "sourceId": "oecd_inventory_comp_agreements_2025"
        },
        {
          "id": "agreement-eu-us-positive-comity-1998",
          "titleCN": "美国—欧盟《积极礼让协定》（1998）",
          "titleEN": "EU–US Positive Comity Agreement (1998)",
          "parties": [
            "United States",
            "European Communities"
          ],
          "jurisdictions": [
            "US",
            "EU"
          ],
          "signedDate": "1998-06-04",
          "status": "In force",
          "summaryCN": "在一方法域内发生的反竞争行为对另一方产生不利影响时，鼓励请求并由被请求方优先调查处理。",
          "keyPointsCN": [
            "请求调查机制",
            "强调执法资源效率与避免重复",
            "明确礼让原则适用条件"
          ],
          "sourceId": "oecd_inventory_comp_agreements_2025"
        },
        {
          "id": "agreement-eu-korea-competition-2009",
          "titleCN": "欧盟—韩国《关于反竞争活动合作的协定》（2009）",
          "titleEN": "EU–Korea Agreement on cooperation on anti-competitive activities (2009)",
          "parties": [
            "European Union",
            "Republic of Korea"
          ],
          "jurisdictions": [
            "EU",
            "KR"
          ],
          "signedDate": "2009-05-23",
          "status": "In force",
          "summaryCN": "围绕反竞争活动执法合作建立框架，涵盖通报、协调与信息交换等。",
          "keyPointsCN": [
            "反竞争执法通报与协调",
            "保密信息保护",
            "适用范围与限制条款"
          ],
          "sourceId": "oecd_inventory_comp_agreements_2025"
        },
        {
          "id": "agreement-eu-switzerland-competition-2013",
          "titleCN": "欧盟—瑞士《关于竞争法适用合作的协定》（2013）",
          "titleEN": "EU–Switzerland Agreement on cooperation in the application of their competition laws (2013)",
          "parties": [
            "European Union",
            "Swiss Confederation"
          ],
          "jurisdictions": [
            "EU",
            "CH"
          ],
          "signedDate": "2013-05-17",
          "status": "In force",
          "summaryCN": "在并购与反垄断调查中强化合作与信息交换安排。",
          "keyPointsCN": [
            "案件通报与协调",
            "一定条件下的信息传递",
            "程序保障与保密规则"
          ],
          "sourceId": "oecd_inventory_comp_agreements_2025"
        },
        {
          "id": "mou-ftc-cma-2019",
          "titleCN": "美国联邦贸易委员会与英国竞争与市场管理局合作备忘录（2019）",
          "titleEN": "MOU between the U.S. FTC and the UK Competition and Markets Authority (2019)",
          "parties": [
            "U.S. Federal Trade Commission",
            "UK Competition and Markets Authority"
          ],
          "jurisdictions": [
            "US",
            "UK"
          ],
          "signedDate": "2019-03-01",
          "status": "In force",
          "summaryCN": "围绕执法协作、信息沟通与能力建设等开展合作安排（以双方网站列示文本为准）。",
          "keyPointsCN": [
            "建立联络沟通机制",
            "执法政策与经验交流",
            "联合研讨与培训"
          ],
          "sourceId": "ftc_intl_agreements"
        },
        {
          "id": "mou-multilateral-framework-2020",
          "titleCN": "《竞争机构多边互助与合作框架》（2020）",
          "titleEN": "Multilateral Mutual Assistance and Cooperation Framework for Competition Authorities (2020)",
          "parties": [
            "Multiple competition authorities (signatories)"
          ],
          "jurisdictions": [
            "INTL"
          ],
          "signedDate": "2020-09-01",
          "status": "Open for signatories",
          "summaryCN": "为多边范围内的信息交流、协助请求与能力建设提供通用框架（不替代双边/多边条约）。",
          "keyPointsCN": [
            "互助请求与响应机制",
            "保密与信息使用限制",
            "能力建设与经验共享",
            "可与既有协定并行"
          ],
          "sourceId": "mou_multilateral_2020"
        }
      ],
      "fta": [
        {
          "id": "fta-usmca-ch21",
          "titleCN": "《美墨加协定（USMCA）》第21章 竞争政策（Competition Policy）",
          "titleEN": "USMCA Chapter 21 - Competition Policy",
          "parties": [
            "United States",
            "Mexico",
            "Canada"
          ],
          "jurisdictions": [
            "US",
            "MX",
            "CA"
          ],
          "signedDate": "2018-11-30",
          "inForceDate": "2020-07-01",
          "summaryCN": "规定竞争法执行、程序公正、合作与信息交流等基本义务，并对国有企业/指定垄断等相关条款形成配套。",
          "keyPointsCN": [
            "维持与执行竞争法",
            "执法机构的程序公正与透明",
            "鼓励合作与交流",
            "提供磋商机制"
          ],
          "sourceId": "usmca_text"
        },
        {
          "id": "fta-cptpp-ch16",
          "titleCN": "《全面与进步跨太平洋伙伴关系协定（CPTPP）》第16章 竞争政策",
          "titleEN": "CPTPP Chapter 16 - Competition Policy",
          "parties": [
            "CPTPP Parties"
          ],
          "jurisdictions": [
            "INTL"
          ],
          "signedDate": "2018-03-08",
          "summaryCN": "强调各缔约方设立/维持竞争法与执法机构，推动执法透明、公正程序与国际合作。",
          "keyPointsCN": [
            "竞争法与执法机构的基本义务",
            "程序公平与透明",
            "竞争倡导与合作",
            "与消费者保护条款衔接"
          ],
          "sourceId": "cptpp_text_mfat"
        },
        {
          "id": "fta-rcep-ch13",
          "titleCN": "《区域全面经济伙伴关系协定（RCEP）》第13章 竞争",
          "titleEN": "RCEP Chapter 13 - Competition",
          "parties": [
            "RCEP Parties"
          ],
          "jurisdictions": [
            "INTL"
          ],
          "signedDate": "2020-11-15",
          "summaryCN": "围绕竞争法实施与机构合作、信息交流、技术援助等作出原则性安排，并保留成员差异化空间。",
          "keyPointsCN": [
            "竞争法与政策框架",
            "合作与能力建设",
            "信息交流与保密",
            "保留成员自主空间"
          ],
          "sourceId": "rcep_ch13"
        }
      ],
      "multilateral": [
        {
          "id": "oecd-cooperation-recommendation-2014",
          "titleCN": "经合组织理事会《关于竞争调查与程序国际合作的建议》（2014）",
          "titleEN": "OECD Recommendation concerning International Co-operation on Competition Investigations and Proceedings (2014)",
          "org": "OECD",
          "publishedDate": "2014-09-16",
          "summaryCN": "提出在执法协作中加强通报、协调、信息共享与保密保护的政策建议，为跨境案件合作提供共同基准。",
          "keyPointsCN": [
            "合作形式与最低合作标准",
            "保密信息保护与使用限制",
            "鼓励互助与能力建设",
            "降低重复/冲突执法风险"
          ],
          "sourceId": "ftc_intl_agreements"
        },
        {
          "id": "oecd-enforcement-cooperation-db",
          "titleCN": "OECD 竞争执法合作数据库（Competition Enforcement Co-operation Database）",
          "titleEN": "OECD Competition Enforcement Co-operation Database",
          "org": "OECD",
          "publishedDate": "2024-01-01",
          "summaryCN": "汇集竞争执法合作安排、信息与资源入口，便于检索合作机制与实践。",
          "keyPointsCN": [
            "合作机制检索入口",
            "涵盖多边/双边安排",
            "链接到相关政策与数据资源"
          ],
          "sourceId": "oecd_comp_intlcoop"
        },
        {
          "id": "oecd-international-cartels-db",
          "titleCN": "OECD 国际卡特尔数据库（International Cartels Database）",
          "titleEN": "OECD International Cartels Database",
          "org": "OECD",
          "publishedDate": "2024-01-01",
          "summaryCN": "提供国际卡特尔案件的结构化信息入口，支持研究与趋势分析。",
          "keyPointsCN": [
            "案件信息结构化",
            "支持跨司法辖区研究",
            "便于趋势/行业分析"
          ],
          "sourceId": "oecd_comp_intlcoop"
        },
        {
          "id": "icn-recommended-practices-merger",
          "titleCN": "国际竞争网络（ICN）《并购申报与审查程序建议最佳实践》",
          "titleEN": "ICN Recommended Practices for Merger Notification and Review Procedures",
          "org": "ICN",
          "publishedDate": "2017-04-01",
          "summaryCN": "针对并购申报门槛、程序透明、时限管理、救济与协调等提出可操作的国际通行建议。",
          "keyPointsCN": [
            "申报门槛与触发标准",
            "程序透明与沟通",
            "审查时限与阶段管理",
            "救济措施与跨境协调"
          ],
          "sourceId": "oecd_comp_intlcoop"
        },
        {
          "id": "unctad-model-law",
          "titleCN": "贸发会议（UNCTAD）《竞争示范法》（Model Law on Competition）",
          "titleEN": "UNCTAD Model Law on Competition",
          "org": "UNCTAD",
          "publishedDate": "2000-01-01",
          "summaryCN": "为各国建立/完善竞争立法提供条文示例与评注，覆盖垄断协议、滥用支配地位、并购控制与执法制度。",
          "keyPointsCN": [
            "示范条文与评注",
            "覆盖核心反垄断制度",
            "便于立法比较研究"
          ],
          "sourceId": "oecd_comp_intlcoop"
        },
        {
          "id": "multilateral-framework-2020",
          "titleCN": "《竞争机构多边互助与合作框架》（2020）（再次列示）",
          "titleEN": "Multilateral Mutual Assistance and Cooperation Framework for Competition Authorities (2020)",
          "org": "Multiple",
          "publishedDate": "2020-09-01",
          "summaryCN": "多边层面互助与合作的通用框架（可在“备忘录/协定”栏目中查看PDF）。",
          "keyPointsCN": [
            "互助机制",
            "保密保护",
            "能力建设"
          ],
          "sourceId": "mou_multilateral_2020"
        }
      ]
    },
    "laws": [
      {
        "id": "us-sherman-act",
        "jurisdiction": "US",
        "titleCN": "《谢尔曼法》（Sherman Act）",
        "titleEN": "Sherman Antitrust Act (15 U.S.C. §§ 1–7)",
        "type": "Statute",
        "year": "1890",
        "summaryCN": "美国反垄断基本法，禁止垄断协议与企图垄断等行为。",
        "tags": [
          "cartel",
          "monopolization"
        ],
        "sourceUrl": "https://uscode.house.gov/"
      },
      {
        "id": "us-clayton-act-s7",
        "jurisdiction": "US",
        "titleCN": "《克莱顿法》第7条（并购限制）",
        "titleEN": "Clayton Act §7 (15 U.S.C. §18)",
        "type": "Statute",
        "year": "1914",
        "summaryCN": "为美国并购反垄断执法提供核心实体标准。",
        "tags": [
          "merger"
        ],
        "sourceUrl": "https://uscode.house.gov/"
      },
      {
        "id": "us-ftc-act-s5",
        "jurisdiction": "US",
        "titleCN": "《联邦贸易委员会法》第5条",
        "titleEN": "FTC Act §5 (15 U.S.C. §45)",
        "type": "Statute",
        "year": "1914",
        "summaryCN": "授权FTC制止“不公平竞争方法”等行为，为竞争执法提供补充工具。",
        "tags": [
          "unfair",
          "enforcement"
        ],
        "sourceUrl": "https://uscode.house.gov/"
      },
      {
        "id": "eu-tfeu-101",
        "jurisdiction": "EU",
        "titleCN": "《欧盟运行条约》第一百零一条",
        "titleEN": "TFEU Article 101",
        "type": "Treaty provision",
        "year": "1957/2009",
        "summaryCN": "禁止限制竞争的协议、决定与协同行为（卡特尔规则）。",
        "tags": [
          "cartel",
          "agreement"
        ],
        "sourceUrl": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A12012E101"
      },
      {
        "id": "eu-tfeu-102",
        "jurisdiction": "EU",
        "titleCN": "《欧盟运行条约》第一百零二条",
        "titleEN": "TFEU Article 102",
        "type": "Treaty provision",
        "year": "1957/2009",
        "summaryCN": "禁止滥用市场支配地位。",
        "tags": [
          "dominance",
          "abuse"
        ],
        "sourceUrl": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A12012E102"
      },
      {
        "id": "eu-merger-reg-139-2004",
        "jurisdiction": "EU",
        "titleCN": "欧盟并购条例（第139/2004号）",
        "titleEN": "Council Regulation (EC) No 139/2004 (EU Merger Regulation)",
        "type": "Regulation",
        "year": "2004",
        "summaryCN": "确立欧盟层面并购控制制度与审查程序。",
        "tags": [
          "merger",
          "procedure"
        ],
        "sourceUrl": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32004R0139"
      },
      {
        "id": "uk-competition-act-1998",
        "jurisdiction": "UK",
        "titleCN": "《竞争法》1998",
        "titleEN": "Competition Act 1998",
        "type": "Statute",
        "year": "1998",
        "summaryCN": "英国反垄断核心立法，涵盖禁止竞争协议与滥用支配地位（与欧盟规则体系相衔接）。",
        "tags": [
          "cartel",
          "dominance"
        ],
        "sourceUrl": "https://www.legislation.gov.uk/ukpga/1998/41/contents"
      },
      {
        "id": "uk-enterprise-act-2002",
        "jurisdiction": "UK",
        "titleCN": "《企业法》2002",
        "titleEN": "Enterprise Act 2002",
        "type": "Statute",
        "year": "2002",
        "summaryCN": "包含并购控制、市场调查与竞争执法的多项制度性安排。",
        "tags": [
          "merger",
          "market"
        ],
        "sourceUrl": "https://www.legislation.gov.uk/ukpga/2002/40/contents"
      },
      {
        "id": "jp-antimonopoly-act",
        "jurisdiction": "JP",
        "titleCN": "日本《反垄断法》（AMA）",
        "titleEN": "Antimonopoly Act (Japan)",
        "type": "Statute",
        "year": "1947",
        "summaryCN": "日本竞争法基础性法律，涵盖不当交易限制、私有垄断、并购限制等。",
        "tags": [
          "cartel",
          "dominance",
          "merger"
        ],
        "sourceUrl": "https://www.jftc.go.jp/en/legislation_guidelines/ama/"
      },
      {
        "id": "kr-mrfta",
        "jurisdiction": "KR",
        "titleCN": "韩国《垄断规制及公平交易法》（MRFTA）",
        "titleEN": "Monopoly Regulation and Fair Trade Act (Korea)",
        "type": "Statute",
        "year": "1980",
        "summaryCN": "韩国反垄断与公平交易的核心法律体系基础。",
        "tags": [
          "cartel",
          "dominance",
          "merger"
        ],
        "sourceUrl": "https://www.ftc.go.kr/eng/index.do"
      },
      {
        "id": "ca-competition-act",
        "jurisdiction": "CA",
        "titleCN": "加拿大《竞争法》",
        "titleEN": "Competition Act (Canada)",
        "type": "Statute",
        "year": "1985",
        "summaryCN": "加拿大竞争法基础立法，涵盖卡特尔、滥用支配地位与并购审查等。",
        "tags": [
          "cartel",
          "dominance",
          "merger"
        ],
        "sourceUrl": "https://laws-lois.justice.gc.ca/eng/acts/C-34/"
      },
      {
        "id": "au-competition-consumer-act-2010",
        "jurisdiction": "AU",
        "titleCN": "澳大利亚《竞争与消费者法》2010",
        "titleEN": "Competition and Consumer Act 2010 (Australia)",
        "type": "Statute",
        "year": "2010",
        "summaryCN": "澳大利亚竞争法与消费者保护的核心立法框架。",
        "tags": [
          "cartel",
          "merger",
          "consumer"
        ],
        "sourceUrl": "https://www.legislation.gov.au/Series/C2004A00109"
      },
      {
        "id": "sg-competition-act",
        "jurisdiction": "SG",
        "titleCN": "新加坡《竞争法》",
        "titleEN": "Competition Act (Singapore)",
        "type": "Statute",
        "year": "2004",
        "summaryCN": "新加坡竞争法框架，涵盖反竞争协议、滥用支配地位与并购控制。",
        "tags": [
          "cartel",
          "dominance",
          "merger"
        ],
        "sourceUrl": "https://sso.agc.gov.sg/Act/CA2004"
      }
    ],
    "agencies": {
      "jurisdictions": [
        {
          "id": "us-doj-atr",
          "jurisdiction": "US",
          "nameCN": "美国司法部反垄断司",
          "nameEN": "U.S. Department of Justice - Antitrust Division",
          "website": "https://www.justice.gov/atr",
          "mandateCN": "负责执行联邦反垄断法的刑事与民事执法，并参与并购审查与国际合作。",
          "toolsCN": [
            "刑事卡特尔执法",
            "民事垄断/排他行为执法",
            "并购执法与诉讼",
            "国际司法协助与合作"
          ],
          "cooperationLinks": [
            {
              "title": "Antitrust Cooperation Agreements Map",
              "url": "https://www.justice.gov/atr/antitrust-cooperation-agreements-map"
            }
          ]
        },
        {
          "id": "us-ftc",
          "jurisdiction": "US",
          "nameCN": "美国联邦贸易委员会（FTC）",
          "nameEN": "U.S. Federal Trade Commission (FTC)",
          "website": "https://www.ftc.gov/",
          "mandateCN": "负责竞争与消费者保护执法，包括并购审查与不正当竞争执法，并开展国际合作。",
          "toolsCN": [
            "并购审查",
            "民事竞争执法",
            "规则/指南与竞争倡导",
            "消费者保护与市场监管"
          ],
          "cooperationLinks": [
            {
              "title": "International cooperation agreements",
              "url": "https://www.ftc.gov/policy/international/international-cooperation-agreements"
            }
          ]
        },
        {
          "id": "eu-dg-comp",
          "jurisdiction": "EU",
          "nameCN": "欧盟委员会竞争总司（DG COMP）",
          "nameEN": "European Commission - Directorate-General for Competition (DG COMP)",
          "website": "https://competition-policy.ec.europa.eu/",
          "mandateCN": "负责欧盟层面竞争规则（反垄断、并购、国家援助等）执行与政策制定。",
          "toolsCN": [
            "反垄断调查与处罚",
            "并购控制",
            "国家援助审查",
            "政策研究与指南制定"
          ],
          "cooperationLinks": [
            {
              "title": "Merger statistics",
              "url": "https://competition-policy.ec.europa.eu/mergers/statistics_en"
            }
          ]
        },
        {
          "id": "uk-cma",
          "jurisdiction": "UK",
          "nameCN": "英国竞争与市场管理局（CMA）",
          "nameEN": "Competition and Markets Authority (UK)",
          "website": "https://www.gov.uk/government/organisations/competition-and-markets-authority",
          "mandateCN": "负责英国反垄断执法、并购控制、市场研究与消费者保护相关工作。",
          "toolsCN": [
            "并购审查",
            "卡特尔/垄断行为执法",
            "市场调查与研究",
            "指引与倡导"
          ],
          "cooperationLinks": [
            {
              "title": "Annual Report and Accounts 2023-2024",
              "url": "https://www.gov.uk/government/publications/cma-annual-report-and-accounts-2023-to-2024"
            }
          ]
        },
        {
          "id": "jp-jftc",
          "jurisdiction": "JP",
          "nameCN": "日本公正取引委员会（JFTC）",
          "nameEN": "Japan Fair Trade Commission (JFTC)",
          "website": "https://www.jftc.go.jp/en/",
          "mandateCN": "负责执行《反垄断法》等竞争相关法律，开展并购审查、执法与国际合作。",
          "toolsCN": [
            "排除措施命令/课征金制度",
            "并购审查",
            "承诺程序",
            "国际合作与能力建设"
          ],
          "cooperationLinks": [
            {
              "title": "Annual Report FY2024",
              "url": "https://www.jftc.go.jp/en/about_jftc/annual_reports/2024.html"
            }
          ]
        },
        {
          "id": "kr-kftc",
          "jurisdiction": "KR",
          "nameCN": "韩国公平交易委员会（KFTC）",
          "nameEN": "Korea Fair Trade Commission (KFTC)",
          "website": "https://www.ftc.go.kr/eng/index.do",
          "mandateCN": "负责公平交易与竞争执法（含卡特尔、滥用支配地位、并购审查等），并发布统计年鉴。",
          "toolsCN": [
            "反垄断/公平交易执法",
            "并购审查",
            "行业监管与指引",
            "统计与研究"
          ],
          "cooperationLinks": [
            {
              "title": "Statistics / Statistical Yearbook",
              "url": "https://www.ftc.go.kr/eng/selectBbsNttList.do?bordCd=823&key=565"
            }
          ]
        },
        {
          "id": "ca-competition-bureau",
          "jurisdiction": "CA",
          "nameCN": "加拿大竞争局（Competition Bureau）",
          "nameEN": "Competition Bureau Canada",
          "website": "https://competition-bureau.canada.ca/",
          "mandateCN": "负责执行加拿大《竞争法》并开展竞争倡导与执法合作。",
          "toolsCN": [
            "并购审查",
            "卡特尔执法",
            "滥用支配地位执法",
            "倡导与指导"
          ]
        },
        {
          "id": "au-accc",
          "jurisdiction": "AU",
          "nameCN": "澳大利亚竞争与消费者委员会（ACCC）",
          "nameEN": "Australian Competition and Consumer Commission (ACCC)",
          "website": "https://www.accc.gov.au/",
          "mandateCN": "负责竞争与消费者保护执法，并承担部分行业监管职能。",
          "toolsCN": [
            "竞争执法",
            "消费者保护",
            "并购审查（部分机制）",
            "行业监管"
          ]
        },
        {
          "id": "de-bkartA",
          "jurisdiction": "DE",
          "nameCN": "德国联邦卡特尔局（Bundeskartellamt）",
          "nameEN": "Bundeskartellamt",
          "website": "https://www.bundeskartellamt.de/EN/Home/home_node.html",
          "mandateCN": "负责德国竞争执法、并购控制与部分数字平台监管相关机制。",
          "toolsCN": [
            "卡特尔执法",
            "滥用支配地位执法",
            "并购控制",
            "市场研究"
          ]
        }
      ],
      "organizations": [
        {
          "id": "org-oecd",
          "nameCN": "经济合作与发展组织（OECD）竞争委员会/全球竞争论坛",
          "nameEN": "OECD Competition Committee / Global Forum on Competition",
          "website": "https://www.oecd.org/en/topics/competition-and-international-co-operation.html",
          "focusCN": "竞争政策研究、评议与国际合作平台，发布背景文件、同侪评估与数据库。"
        },
        {
          "id": "org-icn",
          "nameCN": "国际竞争网络（ICN）",
          "nameEN": "International Competition Network (ICN)",
          "website": "https://www.internationalcompetitionnetwork.org/",
          "focusCN": "竞争执法机构自愿合作网络，发布最佳实践与工作组成果。"
        },
        {
          "id": "org-unctad",
          "nameCN": "联合国贸发会议（UNCTAD）竞争与消费者保护",
          "nameEN": "UNCTAD Competition and Consumer Protection",
          "website": "https://unctad.org/topic/competition-and-consumer-protection",
          "focusCN": "发展议题与竞争政策能力建设，发布示范法、评估与会议成果。"
        },
        {
          "id": "org-apec-cplg",
          "nameCN": "亚太经合组织（APEC）竞争政策与法律组（CPLG）",
          "nameEN": "APEC Competition Policy and Law Group (CPLG)",
          "website": "https://www.apec.org/groups/committee-on-trade-and-investment/competition-policy-and-law-group",
          "focusCN": "区域竞争政策对话与能力建设平台，推动经验交流与合作项目。"
        }
      ]
    },
    "dynamics": [
      {
        "id": "dyn-eu-uk-cca-2025",
        "date": "2025-05-20",
        "scope": "EU/UK",
        "type": "International cooperation",
        "titleCN": "欧盟委员会通过签署与缔结欧英竞争合作协定提案",
        "titleEN": "Commission adopts proposals to sign and conclude the EU-UK Competition Cooperation Agreement",
        "summaryCN": "欧盟委员会发布提案，拟建立欧盟与英国CMA在反垄断与并购执法中的合作框架。",
        "importance": "High",
        "sourceId": "euuk_comp_agreement_press"
      },
      {
        "id": "dyn-doj-google-search-remedies-2025",
        "date": "2025-09-02",
        "scope": "US",
        "type": "Enforcement / litigation",
        "titleCN": "美国司法部提交针对Google搜索垄断案的拟议救济方案",
        "titleEN": "DOJ and states file proposed final judgment requiring Google to divest Chrome and take other measures",
        "summaryCN": "司法部与州检察长提交拟议终局判决草案，涉及结构性与行为性救济（以法院最终裁定为准）。",
        "importance": "High",
        "sourceId": "doj_google_search_remedies_2025"
      },
      {
        "id": "dyn-doj-google-adtech-2025",
        "date": "2025-04-17",
        "scope": "US",
        "type": "Enforcement / judgment",
        "titleCN": "美国司法部在Google广告技术反垄断案中胜诉（部分）",
        "titleEN": "DOJ prevails in antitrust case against Google (ad tech)",
        "summaryCN": "法院认定Google在部分广告技术市场构成反竞争行为（以判决与后续程序为准）。",
        "importance": "High",
        "sourceId": "doj_google_adtech_2025"
      },
      {
        "id": "dyn-eu-apple-nfc-2024",
        "date": "2024-07-11",
        "scope": "EU",
        "type": "Commitments",
        "titleCN": "欧盟委员会接受Apple关于NFC“tap and go”开放的承诺并使其具有约束力",
        "titleEN": "Commission accepts commitments by Apple opening access to tap and go technology on iPhones",
        "summaryCN": "委员会以承诺决定方式结束调查，要求Apple在EEA范围开放NFC相关能力（以承诺文本为准）。",
        "importance": "High",
        "sourceId": "eu_apple_pay_commitments"
      },
      {
        "id": "dyn-eu-apple-music-fine-2024",
        "date": "2024-03-04",
        "scope": "EU",
        "type": "Decision / fine",
        "titleCN": "欧盟委员会就音乐流媒体“反引导”规则对Apple处以逾18亿欧元罚款",
        "titleEN": "Commission fines Apple over €1.8 billion over abusive App Store rules for music streaming providers",
        "summaryCN": "委员会认定Apple限制开发者告知用户更低价替代方案，构成滥用市场支配地位。",
        "importance": "High",
        "sourceId": "eu_apple_music_fine"
      },
      {
        "id": "dyn-ftc-amazon-2023",
        "date": "2023-09-26",
        "scope": "US",
        "type": "Enforcement / filing",
        "titleCN": "FTC联合17州起诉Amazon涉嫌维持垄断地位",
        "titleEN": "FTC sues Amazon for illegally maintaining monopoly power",
        "summaryCN": "FTC与多州检察长就线上零售与市场平台相关行为提起诉讼（以法院进程为准）。",
        "importance": "High",
        "sourceId": "ftc_amazon_2023"
      },
      {
        "id": "dyn-jftc-hd-2025",
        "date": "2025-09-18",
        "scope": "JP",
        "type": "Enforcement",
        "titleCN": "JFTC对Harley-Davidson Japan作出排除措施命令并课征金命令",
        "titleEN": "JFTC issues a Cease and Desist Order and a Surcharge Payment Order to Harley-Davidson Japan",
        "summaryCN": "JFTC依据《反垄断法》对特定限制行为作出处理决定。",
        "importance": "Medium",
        "sourceId": "jftc_hd_2025"
      },
      {
        "id": "dyn-eu-merger-stats-2026",
        "date": "2026-01-05",
        "scope": "EU",
        "type": "Statistics",
        "titleCN": "欧盟委员会更新并购案件统计（Mergers cases statistics）",
        "titleEN": "Merger cases statistics updated",
        "summaryCN": "DG COMP发布并购统计入口与下载文件，支持年度趋势分析。",
        "importance": "Low",
        "sourceId": "eu_merger_stats"
      }
    ],
    "cases": [
      {
        "id": "case-us-google-search",
        "jurisdiction": "US",
        "authority": "U.S. DOJ + State AGs",
        "type": "Monopolization (Sherman Act §2)",
        "nameCN": "美国诉Google（搜索服务）案",
        "nameEN": "United States et al. v. Google LLC (Search)",
        "sectorCN": "数字平台 / 搜索与广告",
        "statusCN": "诉讼进行中（以法院最终判决为准）",
        "timeline": [
          {
            "date": "2020-10-20",
            "event": "DOJ提起诉讼（起诉阶段）"
          },
          {
            "date": "2024-08-05",
            "event": "法院发布责任判决（详见司法部公开信息）"
          },
          {
            "date": "2025-05-01",
            "event": "救济审理阶段（详见司法部公开信息）"
          },
          {
            "date": "2025-09-02",
            "event": "司法部提交拟议终局判决/救济方案（示例）"
          }
        ],
        "keyIssuesCN": [
          "排他性协议/默认设置安排",
          "搜索分发渠道控制",
          "对竞争与创新的影响",
          "结构性与行为性救济选择"
        ],
        "documents": [
          {
            "title": "DOJ press release (2025-09-02)",
            "url": "https://www.justice.gov/opa/pr/justice-department-and-state-attorneys-general-file-proposed-final-judgment-require-google"
          }
        ],
        "sourceId": "doj_google_search_remedies_2025"
      },
      {
        "id": "case-us-google-adtech",
        "jurisdiction": "US",
        "authority": "U.S. DOJ + States",
        "type": "Monopolization (Sherman Act §2)",
        "nameCN": "美国诉Google（广告技术）案",
        "nameEN": "United States et al. v. Google (Ad Tech)",
        "sectorCN": "数字广告 / 广告技术",
        "statusCN": "已作出部分责任认定，后续程序以法院为准",
        "timeline": [
          {
            "date": "2023-01-24",
            "event": "司法部提起广告技术相关诉讼（参考官方材料）"
          },
          {
            "date": "2024-09-01",
            "event": "开庭审理（参考官方材料）"
          },
          {
            "date": "2025-04-17",
            "event": "法院作出判决（参考官方材料）"
          }
        ],
        "keyIssuesCN": [
          "广告服务器/交易平台市场界定",
          "排他/搭售与排除竞争",
          "纵向一体化与自我优待",
          "救济与结构性分拆可能性"
        ],
        "documents": [
          {
            "title": "DOJ press release (2025-04-17)",
            "url": "https://www.justice.gov/opa/pr/justice-department-prevails-antitrust-case-against-google"
          }
        ],
        "sourceId": "doj_google_adtech_2025"
      },
      {
        "id": "case-us-ftc-amazon",
        "jurisdiction": "US",
        "authority": "FTC + 17 States",
        "type": "Monopolization (Sherman Act §2 + FTC Act §5)",
        "nameCN": "FTC等诉Amazon案",
        "nameEN": "Federal Trade Commission et al. v. Amazon.com, Inc.",
        "sectorCN": "电商平台 / 平台治理",
        "statusCN": "诉讼进行中（以法院进程为准）",
        "timeline": [
          {
            "date": "2023-09-26",
            "event": "FTC与多州检察长提起诉讼（W.D. Washington）"
          }
        ],
        "keyIssuesCN": [
          "平台规则对价格与卖家行为的影响",
          "“互锁”策略维持市场力量",
          "对消费者价格与服务质量影响"
        ],
        "documents": [
          {
            "title": "FTC press release",
            "url": "https://www.ftc.gov/news-events/news/press-releases/2023/09/ftc-sues-amazon-illegally-maintaining-monopoly-power"
          }
        ],
        "sourceId": "ftc_amazon_2023"
      },
      {
        "id": "case-eu-google-shopping",
        "jurisdiction": "EU",
        "authority": "European Commission (DG COMP)",
        "type": "Abuse of dominance (TFEU Art. 102)",
        "nameCN": "欧盟Google购物比价服务案（AT.39740）",
        "nameEN": "Google Search (Shopping) (AT.39740)",
        "sectorCN": "数字平台 / 搜索与比价",
        "statusCN": "委员会禁止决定（2017），后续诉讼以法院裁判为准",
        "timeline": [
          {
            "date": "2010-11-30",
            "event": "立案/启动程序（见案件页）"
          },
          {
            "date": "2017-06-27",
            "event": "作出禁止决定并处罚（见决定文本）"
          },
          {
            "date": "2017-12-18",
            "event": "决定文本公开（英文）"
          }
        ],
        "keyIssuesCN": [
          "自我优待与搜索结果展示",
          "对竞争对手流量与市场进入的影响",
          "救济与合规监督"
        ],
        "documents": [
          {
            "title": "Decision PDF",
            "url": "https://ec.europa.eu/competition/antitrust/cases/dec_docs/39740/39740_14996_3.pdf"
          }
        ],
        "sourceId": "eu_google_shopping_case"
      },
      {
        "id": "case-eu-google-android",
        "jurisdiction": "EU",
        "authority": "European Commission (DG COMP)",
        "type": "Abuse of dominance (TFEU Art. 102)",
        "nameCN": "欧盟Google Android案（AT.40099）",
        "nameEN": "Google Android (AT.40099)",
        "sectorCN": "移动生态 / 操作系统与应用分发",
        "statusCN": "委员会决定（2018），后续诉讼以法院裁判为准",
        "timeline": [
          {
            "date": "2018-07-18",
            "event": "委员会发布决定并处罚（见新闻稿）"
          }
        ],
        "keyIssuesCN": [
          "预装/捆绑与默认设置",
          "反碎片化协议",
          "排除竞争与市场进入",
          "救济措施与行为调整"
        ],
        "documents": [
          {
            "title": "Press release PDF",
            "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_18_4581/IP_18_4581_EN.pdf"
          }
        ],
        "sourceId": "eu_google_android_press"
      },
      {
        "id": "case-eu-apple-music-streaming",
        "jurisdiction": "EU",
        "authority": "European Commission (DG COMP)",
        "type": "Abuse of dominance (TFEU Art. 102)",
        "nameCN": "欧盟Apple音乐流媒体“反引导”案",
        "nameEN": "Apple - Music streaming (anti-steering) case",
        "sectorCN": "数字平台 / 应用商店与音乐流媒体",
        "statusCN": "委员会处罚决定（2024-03-04）",
        "timeline": [
          {
            "date": "2024-03-04",
            "event": "委员会发布罚款决定（见新闻稿）"
          }
        ],
        "keyIssuesCN": [
          "反引导条款限制信息与价格竞争",
          "对竞争与消费者选择的影响",
          "罚款与合规要求"
        ],
        "documents": [
          {
            "title": "Press release PDF",
            "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_24_1161/IP_24_1161_EN.pdf"
          }
        ],
        "sourceId": "eu_apple_music_fine"
      },
      {
        "id": "case-eu-apple-pay-nfc",
        "jurisdiction": "EU",
        "authority": "European Commission (DG COMP)",
        "type": "Commitments decision (antitrust)",
        "nameCN": "欧盟Apple Pay NFC开放承诺案",
        "nameEN": "Apple - NFC / tap-and-go commitments",
        "sectorCN": "移动支付 / NFC生态",
        "statusCN": "承诺决定（2024-07-11）",
        "timeline": [
          {
            "date": "2024-07-11",
            "event": "委员会使承诺具有法律约束力（见新闻稿）"
          }
        ],
        "keyIssuesCN": [
          "拒绝开放关键输入（NFC）",
          "移动钱包竞争与创新",
          "承诺范围与监督机制"
        ],
        "documents": [
          {
            "title": "Press release PDF",
            "url": "https://ec.europa.eu/commission/presscorner/api/files/document/print/fin/ip_24_3706/IP_24_3706_EN.pdf"
          }
        ],
        "sourceId": "eu_apple_pay_commitments"
      },
      {
        "id": "case-uk-msft-activision",
        "jurisdiction": "UK",
        "authority": "UK CMA",
        "type": "Merger control",
        "nameCN": "英国CMA审查Microsoft/Activision并购案",
        "nameEN": "Microsoft / Activision Blizzard merger inquiry",
        "sectorCN": "数字娱乐 / 云游戏",
        "statusCN": "2023年发布最终报告并作出禁止决定（后续变化以官方文件为准）",
        "timeline": [
          {
            "date": "2023-04-26",
            "event": "CMA发布最终报告（Final report）"
          }
        ],
        "keyIssuesCN": [
          "云游戏市场潜在竞争",
          "纵向整合与内容控制",
          "行为/结构性救济可行性"
        ],
        "documents": [
          {
            "title": "CMA Final report (PDF)",
            "url": "https://assets.publishing.service.gov.uk/media/644939aa529eda000c3b0525/Microsoft_Activision_Final_Report_.pdf"
          }
        ],
        "sourceId": "cma_msft_activision_final_report"
      },
      {
        "id": "case-uk-adobe-figma",
        "jurisdiction": "UK",
        "authority": "UK CMA",
        "type": "Merger control",
        "nameCN": "英国CMA审查Adobe/Figma并购案",
        "nameEN": "Adobe / Figma merger inquiry",
        "sectorCN": "设计软件 / 数字创意工具",
        "statusCN": "并购参考被取消（2023-12-18），以官方文件为准",
        "timeline": [
          {
            "date": "2023-07-13",
            "event": "CMA将交易移送深入调查（Phase 2）"
          },
          {
            "date": "2023-12-18",
            "event": "取消并购参考（交易终止后）"
          }
        ],
        "keyIssuesCN": [
          "产品设计工具竞争",
          "潜在竞争与创新影响",
          "跨法域并行审查协调"
        ],
        "documents": [
          {
            "title": "CMA case page",
            "url": "https://www.gov.uk/cma-cases/adobe-slash-figma-merger-inquiry"
          }
        ],
        "sourceId": "cma_adobe_figma_case"
      },
      {
        "id": "case-jp-harley-davidson-2025",
        "jurisdiction": "JP",
        "authority": "JFTC",
        "type": "Unfair trade practices (AMA)",
        "nameCN": "JFTC对Harley-Davidson Japan案",
        "nameEN": "JFTC v. Harley-Davidson Japan (2025)",
        "sectorCN": "制造业 / 分销渠道",
        "statusCN": "排除措施命令与课征金命令（2025-09-18）",
        "timeline": [
          {
            "date": "2025-09-18",
            "event": "JFTC发布处理决定（见新闻稿）"
          }
        ],
        "keyIssuesCN": [
          "对经销商的限制性做法",
          "市场竞争与分销体系影响",
          "课征金与整改要求"
        ],
        "documents": [
          {
            "title": "JFTC press release",
            "url": "https://www.jftc.go.jp/en/pressreleases/yearly-2025/September/250918.html"
          }
        ],
        "sourceId": "jftc_hd_2025"
      }
    ],
    "statistics": {
      "datasetNotesCN": "统计栏目以“数据可扩展”为设计目标。本示范站提供“内部库数据覆盖统计”及部分公开统计入口链接，便于后续接入年报/公开数据。",
      "publicLinks": [
        {
          "title": "欧盟并购案件统计（DG COMP）",
          "url": "https://competition-policy.ec.europa.eu/mergers/statistics_en"
        },
        {
          "title": "英国CMA年度报告（2023-2024）",
          "url": "https://www.gov.uk/government/publications/cma-annual-report-and-accounts-2023-to-2024"
        },
        {
          "title": "日本JFTC年度报告（FY2024）",
          "url": "https://www.jftc.go.jp/en/about_jftc/annual_reports/2024.html"
        },
        {
          "title": "韩国KFTC统计年鉴目录",
          "url": "https://www.ftc.go.kr/eng/selectBbsNttList.do?bordCd=823&key=565"
        }
      ]
    },
    "research": [
      {
        "id": "rep-oecd-intlcoop-hub",
        "titleCN": "OECD：竞争与国际合作专题页面（含数据库/评议/活动）",
        "titleEN": "OECD - Competition and international co-operation (hub)",
        "org": "OECD",
        "year": "2026",
        "topic": "International cooperation",
        "summaryCN": "汇集国际合作协定清单、合作数据库、国际卡特尔数据库及相关会议活动信息。",
        "sourceId": "oecd_comp_intlcoop"
      },
      {
        "id": "rep-cma-annual-2023-2024",
        "titleCN": "英国CMA年度报告与账目（2023-2024财年）",
        "titleEN": "CMA Annual Report and Accounts 2023 to 2024",
        "org": "UK CMA",
        "year": "2024",
        "topic": "Annual report",
        "summaryCN": "概述CMA在并购、反垄断、市场研究与消费者保护方面的年度工作与影响评估入口。",
        "sourceId": "cma_annual_report_2023_2024"
      },
      {
        "id": "rep-jftc-annual-fy2024",
        "titleCN": "日本JFTC年度报告（FY2024：2024.4-2025.3）",
        "titleEN": "Annual Report of the Japan Fair Trade Commission FY2024",
        "org": "JFTC",
        "year": "2025",
        "topic": "Annual report",
        "summaryCN": "包含执法、政策与国际合作等内容，并提供摘要与正文下载入口。",
        "sourceId": "jftc_annual_report_fy2024"
      },
      {
        "id": "rep-eu-merger-stats",
        "titleCN": "欧盟并购审查统计入口（DG COMP）",
        "titleEN": "EU Merger cases statistics",
        "org": "European Commission (DG COMP)",
        "year": "2026",
        "topic": "Statistics",
        "summaryCN": "提供欧盟并购案件统计数据下载与年度趋势查询入口。",
        "sourceId": "eu_merger_stats"
      },
      {
        "id": "rep-kftc-yearbook",
        "titleCN": "韩国KFTC统计年鉴（目录页，含年度PDF下载）",
        "titleEN": "KFTC Statistical Yearbook (download list)",
        "org": "KFTC",
        "year": "2025",
        "topic": "Statistics",
        "summaryCN": "提供KFTC年度统计年鉴的发布列表与下载入口。",
        "sourceId": "kftc_stats"
      },
      {
        "id": "rep-doj-google-search",
        "titleCN": "美国DOJ：Google搜索案救济方案公开材料（2025）",
        "titleEN": "DOJ filing on remedies in Google search case (2025)",
        "org": "U.S. DOJ",
        "year": "2025",
        "topic": "Case materials",
        "summaryCN": "包含拟议终局判决与救济思路摘要，便于研究结构性/行为性救济设计。",
        "sourceId": "doj_google_search_remedies_2025"
      },
      {
        "id": "rep-doj-google-adtech",
        "titleCN": "美国DOJ：Google广告技术案阶段性胜诉材料（2025）",
        "titleEN": "DOJ prevails in Google ad tech case (2025)",
        "org": "U.S. DOJ",
        "year": "2025",
        "topic": "Case materials",
        "summaryCN": "提供案件进程节点与判决要点摘要入口，便于梳理广告技术产业链与市场界定。",
        "sourceId": "doj_google_adtech_2025"
      },
      {
        "id": "rep-eu-apple-commitments",
        "titleCN": "欧盟：Apple NFC承诺决定新闻稿（2024）",
        "titleEN": "EU Apple NFC commitments press release (2024)",
        "org": "European Commission",
        "year": "2024",
        "topic": "Commitments decision",
        "summaryCN": "概述承诺的核心范围与适用条件，是移动支付竞争政策研究的重要材料入口。",
        "sourceId": "eu_apple_pay_commitments"
      },
      {
        "id": "rep-eu-apple-fine",
        "titleCN": "欧盟：Apple音乐流媒体罚款决定新闻稿（2024）",
        "titleEN": "EU Apple music streaming fine press release (2024)",
        "org": "European Commission",
        "year": "2024",
        "topic": "Decision / fine",
        "summaryCN": "概述“反引导”条款的竞争影响分析与处罚决定要点。",
        "sourceId": "eu_apple_music_fine"
      },
      {
        "id": "rep-eu-google-shopping-decision",
        "titleCN": "欧盟：Google购物比价案决定文本（AT.39740）",
        "titleEN": "EU Decision text - Google Search (Shopping) AT.39740",
        "org": "European Commission",
        "year": "2017",
        "topic": "Decision",
        "summaryCN": "决定文本为研究自我优待与平台竞争的典型资料。",
        "sourceId": "eu_google_shopping_case"
      },
      {
        "id": "rep-cma-msft-activision",
        "titleCN": "英国CMA：Microsoft/Activision最终报告（2023）",
        "titleEN": "CMA Final report - Microsoft/Activision (2023)",
        "org": "UK CMA",
        "year": "2023",
        "topic": "Merger control",
        "summaryCN": "展示云游戏新兴市场的竞争评估与救济讨论。",
        "sourceId": "cma_msft_activision_final_report"
      },
      {
        "id": "rep-ftc-amazon",
        "titleCN": "FTC：起诉Amazon垄断案新闻稿（2023）",
        "titleEN": "FTC press release - Amazon case (2023)",
        "org": "FTC",
        "year": "2023",
        "topic": "Case materials",
        "summaryCN": "概述诉讼指控与涉嫌策略组合，为平台治理竞争评估提供材料。",
        "sourceId": "ftc_amazon_2023"
      }
    ],
    "glossary": [
      {
        "termCN": "横向垄断协议",
        "termEN": "Horizontal agreement",
        "defCN": "同一生产/销售层级的竞争者之间达成的限制竞争协议（如价格、产量、市场分割）。"
      },
      {
        "termCN": "纵向限制",
        "termEN": "Vertical restraint",
        "defCN": "处于不同层级经营者之间的限制竞争安排（如转售价格维持、独家供销）。"
      },
      {
        "termCN": "滥用市场支配地位",
        "termEN": "Abuse of dominance",
        "defCN": "具有支配地位的经营者实施排除、限制竞争的行为（如拒绝交易、搭售、自我优待）。"
      },
      {
        "termCN": "并购控制",
        "termEN": "Merger control",
        "defCN": "对可能显著限制竞争的集中交易实施申报审查与救济。"
      },
      {
        "termCN": "结构性救济",
        "termEN": "Structural remedy",
        "defCN": "通过剥离资产/业务等结构调整消除竞争担忧的救济方式。"
      },
      {
        "termCN": "行为性救济",
        "termEN": "Behavioral remedy",
        "defCN": "通过承诺特定行为规则、开放接口、禁止排他条款等方式消除担忧。"
      },
      {
        "termCN": "积极礼让",
        "termEN": "Positive comity",
        "defCN": "一方法域内行为影响另一方利益时，鼓励由最相关法域优先调查处理的合作原则。"
      },
      {
        "termCN": "承诺决定",
        "termEN": "Commitments decision",
        "defCN": "执法机构接受经营者承诺并使其具有约束力，以解决竞争关切而不作出违法认定（视法域制度而定）。"
      },
      {
        "termCN": "NFC",
        "termEN": "Near-Field Communication",
        "defCN": "近场通信技术，常用于移动设备的非接触式支付与身份识别。"
      },
      {
        "termCN": "自我优待",
        "termEN": "Self-preferencing",
        "defCN": "平台在排序、接入或规则上偏向自身业务而不利于第三方竞争者的做法。"
      },
      {
        "termCN": "卡特尔",
        "termEN": "Cartel",
        "defCN": "竞争者之间的秘密合谋安排，通常包括价格固定、投标串通、市场分割等。"
      },
      {
        "termCN": "投标串通",
        "termEN": "Bid rigging",
        "defCN": "投标人通过串通操纵投标结果，破坏公平竞争。"
      },
      {
        "termCN": "相关市场",
        "termEN": "Relevant market",
        "defCN": "反垄断分析中界定竞争约束范围的产品市场与地理市场。"
      },
      {
        "termCN": "市场力量",
        "termEN": "Market power",
        "defCN": "经营者在一定时期内能够在相当程度上控制价格或排除竞争的能力。"
      },
      {
        "termCN": "执法协作",
        "termEN": "Enforcement cooperation",
        "defCN": "不同法域竞争执法机构之间在案件通报、协调、信息共享与互助方面的合作。"
      },
      {
        "termCN": "国际卡特尔",
        "termEN": "International cartel",
        "defCN": "具有跨境影响或成员跨多个司法辖区的卡特尔行为。"
      },
      {
        "termCN": "数字平台",
        "termEN": "Digital platform",
        "defCN": "通过网络提供多边匹配、交易或生态服务的平台型企业。"
      },
      {
        "termCN": "默认设置",
        "termEN": "Default setting",
        "defCN": "在设备或软件中预设的默认选择，可能影响用户行为与竞争格局。"
      },
      {
        "termCN": "预装（预置）",
        "termEN": "Pre-installation",
        "defCN": "在设备出厂或系统更新时预先安装特定应用/服务的做法。"
      },
      {
        "termCN": "反引导条款",
        "termEN": "Anti-steering provision",
        "defCN": "限制开发者引导用户到平台外更优惠选择的条款，可能影响价格竞争。"
      }
    ]
  }
};
