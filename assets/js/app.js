/*
  Antitrust International Cooperation DB (AICDB)
  Front-end logic for the static prototype site.

  Design goals:
  - Clean gov-style UI, predictable navigation.
  - No external dependencies.
  - Works when served via HTTP, and mostly works via file:// (no fetch needed).
*/

(function () {
  'use strict';

  if (!window.AICDB) {
    console.error('AICDB dataset not found. Ensure data.js is loaded before app.js.');
    return;
  }

  // ------------------------------
  // Basic utilities
  // ------------------------------

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const escapeHtml = (s) => {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const getRoot = () => {
    const v = document.body.getAttribute('data-root');
    return v || './';
  };

  const withRoot = (p) => {
    const root = getRoot();
    if (!p) return root;
    // Avoid double prefix when p already looks absolute (http) or root-relative.
    if (/^https?:\/\//i.test(p)) return p;
    if (p.startsWith(root)) return p;
    return root + p.replace(/^\//, '');
  };

  const getParam = (name) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  };

  const setTitle = (title) => {
    document.title = title + ' | ' + (AICDB?.meta?.projectNameCN || 'AICDB');
  };

  const fmtDate = (d) => {
    if (!d) return '';
    // Expect YYYY-MM-DD
    return d;
  };

  const uniq = (arr) => {
    const seen = new Set();
    const out = [];
    (arr || []).forEach((x) => {
      const k = String(x);
      if (!seen.has(k)) {
        seen.add(k);
        out.push(x);
      }
    });
    return out;
  };

  const byDateDesc = (a, b) => {
    const da = (a.date || a.signedDate || a.decisionDate || a.updatedDate || '').replace(/-/g, '');
    const db = (b.date || b.signedDate || b.decisionDate || b.updatedDate || '').replace(/-/g, '');
    return (db || '').localeCompare(da || '');
  };

  const getJurName = (code) => {
    const j = (AICDB.jurisdictions || []).find((x) => x.code === code);
    return j ? j.nameCN : code;
  };

  const getSource = (sourceId) => {
    return (AICDB.sources || []).find((s) => s.id === sourceId) || null;
  };

  const badge = (text, kind) => {
    const cls = kind ? `badge ${kind}` : 'badge';
    return `<span class="${cls}">${escapeHtml(text)}</span>`;
  };

  const tagsToBadges = (tags) => {
    if (!tags || !tags.length) return '';
    return tags.map((t) => badge(t, 'soft')).join(' ');
  };

  // ------------------------------
  // Favorites (localStorage)
  // ------------------------------

  const FAV_KEY = 'aicdb_favs_v1';

  const loadFavs = () => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const saveFavs = (ids) => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(ids));
    } catch (e) {
      // ignore
    }
  };

  const isFav = (id) => loadFavs().includes(id);

  const toggleFav = (id) => {
    const favs = loadFavs();
    const idx = favs.indexOf(id);
    if (idx >= 0) {
      favs.splice(idx, 1);
    } else {
      favs.push(id);
    }
    saveFavs(favs);
  };

  // ------------------------------
  // Layout
  // ------------------------------

  const renderHeader = () => {
    const root = getRoot();
    const header = $('#siteHeader');
    if (!header) return;

    header.innerHTML = `
      <div class="topbar">
        <div class="container topbar-inner">
          <div class="brand">
            <img class="brand-logo" src="${withRoot('assets/img/logo.svg')}" alt="Logo" />
            <div>
              <div class="brand-title">${escapeHtml(AICDB.meta.projectNameCN)}</div>
              <div class="brand-sub">反垄断国际交流合作 · 文件/法规/机构/动态/案例/数据/研究</div>
            </div>
          </div>
          <form class="top-search" action="${withRoot('pages/search/index.html')}" method="GET" role="search">
            <label class="sr-only" for="q">全库检索</label>
            <input id="q" name="q" type="search" placeholder="全库检索：关键词/机构/法域/案号…" autocomplete="off" />
            <button type="submit" class="btn btn-primary">检索</button>
          </form>
        </div>
      </div>
      <div class="navwrap">
        <div class="container">
          <nav class="nav" aria-label="主导航">
            <a class="nav-link" href="${root}index.html">首页</a>
            <a class="nav-link" href="${root}pages/cooperation/index.html">合作文件库</a>
            <a class="nav-link" href="${root}pages/laws/index.html">域外法规库</a>
            <a class="nav-link" href="${root}pages/agencies/index.html">机构与组织</a>
            <a class="nav-link" href="${root}pages/dynamics/index.html">政策动态</a>
            <a class="nav-link" href="${root}pages/cases/index.html">重大案例</a>
            <a class="nav-link" href="${root}pages/analysis/index.html">数据统计</a>
            <a class="nav-link" href="${root}pages/research/index.html">专题研究</a>
            <a class="nav-link" href="${root}pages/about/index.html">关于</a>
          </nav>
        </div>
      </div>
    `;
  };

  const renderFooter = () => {
    const footer = $('#siteFooter');
    if (!footer) return;

    const sources = (AICDB.sources || []).slice(0, 6)
      .map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)}</a>`)
      .join(' · ');

    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-title">数据来源（节选）</div>
            <div class="footer-links">${sources}</div>
            <div class="footer-note">提示：本示范站不存储外部网站受版权保护的正文文件，仅提供公开来源的链接与摘要/要点信息。</div>
          </div>
          <div>
            <div class="footer-title">版本信息</div>
            <div class="footer-note">版本：${escapeHtml(AICDB.meta.version)} · 数据更新时间：${escapeHtml(AICDB.meta.lastUpdated)}</div>
            <div class="footer-note">建议部署：任意静态Web服务器（Nginx/Apache/Node静态服务均可）。</div>
          </div>
        </div>
        <div class="footer-bottom">© 2026 AICDB Prototype · UI/信息架构示范</div>
      </div>
    `;
  };

  const setBreadcrumbs = (items) => {
    const bc = $('#breadcrumbs');
    if (!bc) return;
    const root = getRoot();
    const parts = (items || []).map((it, idx) => {
      if (!it) return '';
      const last = idx === items.length - 1;
      if (last || !it.href) {
        return `<span class="bc-item">${escapeHtml(it.text)}</span>`;
      }
      const href = it.href.startsWith('http') ? it.href : root + it.href.replace(/^\//, '');
      return `<a class="bc-item" href="${href}">${escapeHtml(it.text)}</a>`;
    });
    bc.innerHTML = `<div class="breadcrumbs">${parts.join('<span class="bc-sep">/</span>')}</div>`;
  };

  // ------------------------------
  // Shared components
  // ------------------------------

  const card = (title, desc, href, metaHtml) => {
    const a = href ? `<a class="card-link" href="${escapeHtml(href)}">查看</a>` : '';
    return `
      <div class="card">
        <div class="card-body">
          <div class="card-title">${escapeHtml(title)}</div>
          ${desc ? `<div class="card-desc">${escapeHtml(desc)}</div>` : ''}
          ${metaHtml ? `<div class="card-meta">${metaHtml}</div>` : ''}
        </div>
        ${href ? `<div class="card-footer">${a}</div>` : ''}
      </div>
    `;
  };

  const renderBarChart = (rows) => {
    // rows: [{label, value}]
    const max = Math.max(...rows.map(r => r.value), 1);
    const items = rows.map(r => {
      const pct = Math.round((r.value / max) * 100);
      return `
        <div class="bar-row">
          <div class="k">${escapeHtml(r.label)}</div>
          <div class="v"><span style="width:${pct}%"></span></div>
          <div class="n">${escapeHtml(r.value)}</div>
        </div>
      `;
    }).join('');
    return `<div class="barchart">${items}</div>`;
  };

  const renderEmpty = (msg) => {
    return `<div class="empty">${escapeHtml(msg || '暂无数据')}</div>`;
  };

  const renderTable = (columns, rowsHtml) => {
    const thead = columns.map(c => `<th>${escapeHtml(c)}</th>`).join('');
    return `
      <div class="table-wrap">
        <table class="table">
          <thead><tr>${thead}</tr></thead>
          <tbody>
            ${rowsHtml || ''}
          </tbody>
        </table>
      </div>
    `;
  };

  const renderFavBtn = (id) => {
    const fav = isFav(id);
    return `
      <button class="btn btn-sm ${fav ? 'btn-primary' : 'btn-outline'}" data-action="fav" data-id="${escapeHtml(id)}" type="button">
        ${fav ? '已收藏' : '收藏'}
      </button>
    `;
  };

  const attachFavHandler = (rootEl) => {
    (rootEl || document).addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action="fav"]');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      toggleFav(id);
      // Update label without full rerender
      const fav = isFav(id);
      btn.classList.toggle('btn-primary', fav);
      btn.classList.toggle('btn-outline', !fav);
      btn.textContent = fav ? '已收藏' : '收藏';
    });
  };

  // CSV export
  const toCSV = (rows, columns) => {
    const esc = (v) => {
      const s = v === null || v === undefined ? '' : String(v);
      if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
      return s;
    };
    const header = columns.map(c => esc(c)).join(',');
    const body = rows.map(r => columns.map(c => esc(r[c])).join(',')).join('\n');
    return header + '\n' + body;
  };

  const downloadText = (filename, text) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // ------------------------------
  // Data access helpers
  // ------------------------------

  const allRecords = () => {
    const d = AICDB.datasets;
    const out = [];
    // cooperation
    ['mou','fta','multilateral'].forEach(k => (d.cooperation[k] || []).forEach(x => out.push({ ...x, _module: 'cooperation', _type: k })));
    // laws
    (d.laws || []).forEach(x => out.push({ ...x, _module: 'laws', _type: x.type || 'law' }));
    // agencies
    (d.agencies.authorities || []).forEach(x => out.push({ ...x, _module: 'agencies', _type: 'authority' }));
    (d.agencies.organizations || []).forEach(x => out.push({ ...x, _module: 'agencies', _type: 'organization' }));
    // dynamics
    (d.dynamics || []).forEach(x => out.push({ ...x, _module: 'dynamics', _type: x.type || 'update' }));
    // cases
    (d.cases || []).forEach(x => out.push({ ...x, _module: 'cases', _type: x.type || 'case' }));
    // research
    (d.research || []).forEach(x => out.push({ ...x, _module: 'research', _type: x.type || 'report' }));
    return out;
  };

  const findRecordById = (id) => {
    if (!id) return null;
    return allRecords().find(r => r.id === id) || null;
  };

  const moduleNameCN = (m) => {
    switch (m) {
      case 'cooperation': return '合作文件库';
      case 'laws': return '域外法规库';
      case 'agencies': return '机构与组织';
      case 'dynamics': return '政策动态';
      case 'cases': return '重大案例';
      case 'analysis': return '数据统计';
      case 'research': return '专题研究';
      default: return m;
    }
  };

  const moduleHome = (m) => {
    switch (m) {
      case 'cooperation': return 'pages/cooperation/index.html';
      case 'laws': return 'pages/laws/index.html';
      case 'agencies': return 'pages/agencies/index.html';
      case 'dynamics': return 'pages/dynamics/index.html';
      case 'cases': return 'pages/cases/index.html';
      case 'analysis': return 'pages/analysis/index.html';
      case 'research': return 'pages/research/index.html';
      default: return 'index.html';
    }
  };

  const recordLink = (r) => {
    const root = getRoot();
    if (!r) return '#';
    switch (r._module) {
      case 'cooperation': return root + 'pages/cooperation/detail.html?id=' + encodeURIComponent(r.id);
      case 'laws': return root + 'pages/laws/detail.html?id=' + encodeURIComponent(r.id);
      case 'agencies': return root + 'pages/agencies/detail.html?id=' + encodeURIComponent(r.id);
      case 'dynamics': return root + 'pages/dynamics/detail.html?id=' + encodeURIComponent(r.id);
      case 'cases': return root + 'pages/cases/detail.html?id=' + encodeURIComponent(r.id);
      case 'research': return root + 'pages/research/detail.html?id=' + encodeURIComponent(r.id);
      default: return '#';
    }
  };

  // ------------------------------
  // Page renderers
  // ------------------------------

  const setPageHead = ({ title, desc, actionsHtml }) => {
    const t = $('#pageTitle');
    const d = $('#pageDesc');
    const a = $('#pageActions');
    if (t) t.textContent = title || '';
    if (d) d.textContent = desc || '';
    if (a) a.innerHTML = actionsHtml || '';
    if (title) setTitle(title);
  };

  const renderHome = () => {
    setBreadcrumbs([{ text: '首页' }]);
    setPageHead({
      title: '数据库模块总览',
      desc: '围绕“合作文件—域外法规—机构信息—政策动态—重大案例—数据统计—专题研究”形成一体化信息服务与多维检索。'
    });

    const d = AICDB.datasets;
    const counts = {
      mou: d.cooperation.mou.length,
      fta: d.cooperation.fta.length,
      multi: d.cooperation.multilateral.length,
      laws: d.laws.length,
      authorities: d.agencies.authorities.length,
      orgs: d.agencies.organizations.length,
      dynamics: d.dynamics.length,
      cases: d.cases.length,
      research: d.research.length
    };

    const cards = [
      { title:'合作文件库', desc:'双边MOU/合作协定、自贸协定竞争章节、多边合作机制文件', href: withRoot('pages/cooperation/index.html'), meta:`${badge('MOU', 'primary')} ${counts.mou} · ${badge('FTA章节','primary')} ${counts.fta} · ${badge('多边机制','primary')} ${counts.multi}` },
      { title:'域外法规库', desc:'域外主要司法辖区反垄断法律法规、指南与制度摘要（中英文对照）', href: withRoot('pages/laws/index.html'), meta:`${badge('法规条目','primary')} ${counts.laws}` },
      { title:'机构与组织', desc:'主要执法机构信息库 + OECD/APEC/UNCTAD等合作情况', href: withRoot('pages/agencies/index.html'), meta:`${badge('执法机构','primary')} ${counts.authorities} · ${badge('国际组织','primary')} ${counts.orgs}` },
      { title:'政策动态', desc:'重要动态、政策文件、会议活动与研究发布（可按主题/法域筛选）', href: withRoot('pages/dynamics/index.html'), meta:`${badge('动态条目','primary')} ${counts.dynamics}` },
      { title:'重大案例', desc:'国际重大反垄断案件：事实要点、程序节点、裁判/决定、分析报告', href: withRoot('pages/cases/index.html'), meta:`${badge('案例条目','primary')} ${counts.cases}` },
      { title:'数据统计', desc:'基于数据库条目与公开统计口径的可视化、对比、导出', href: withRoot('pages/analysis/index.html'), meta:`${badge('指标样例','primary')} ${(d.analysis.indicators || []).length}` },
      { title:'专题研究', desc:'主题研究、经验汇编、工具指南、术语表与参考文献', href: withRoot('pages/research/index.html'), meta:`${badge('研究条目','primary')} ${counts.research}` },
    ];

    const latestDynamics = [...(d.dynamics || [])].sort(byDateDesc).slice(0, 6);
    const latestCases = [...(d.cases || [])].sort(byDateDesc).slice(0, 6);

    const dynList = latestDynamics.map(item => {
      const src = getSource(item.sourceId);
      return `
        <div class="list-item">
          <div class="li-main">
            <div class="li-title"><a href="${withRoot('pages/dynamics/detail.html?id=' + encodeURIComponent(item.id))}">${escapeHtml(item.titleCN)}</a></div>
            <div class="li-sub">${fmtDate(item.date)} · ${escapeHtml(getJurName(item.jurisdiction))} · ${escapeHtml(item.categoryCN || '')}</div>
          </div>
          <div class="li-side">
            ${item.importance ? badge('重点', 'warning') : ''}
            ${src ? `<a class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">来源</a>` : ''}
          </div>
        </div>
      `;
    }).join('');

    const caseList = latestCases.map(item => {
      return `
        <div class="list-item">
          <div class="li-main">
            <div class="li-title"><a href="${withRoot('pages/cases/detail.html?id=' + encodeURIComponent(item.id))}">${escapeHtml(item.titleCN)}</a></div>
            <div class="li-sub">${escapeHtml(getJurName(item.jurisdiction))} · ${escapeHtml(item.procedureCN || '')} · ${fmtDate(item.decisionDate || item.filedDate || '')}</div>
          </div>
          <div class="li-side">${renderFavBtn(item.id)}</div>
        </div>
      `;
    }).join('');

    const content = `
      <section class="grid grid-3">
        ${cards.map(c => card(c.title, c.desc, c.href, c.meta)).join('')}
      </section>

      <section class="grid grid-2 mt20">
        <div class="card">
          <div class="card-body">
            <div class="card-title">最新政策动态</div>
            <div class="list">${dynList || renderEmpty('暂无动态')}</div>
          </div>
          <div class="card-footer"><a class="card-link" href="${withRoot('pages/dynamics/index.html')}">进入动态库</a></div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">最新收录案例</div>
            <div class="list">${caseList || renderEmpty('暂无案例')}</div>
          </div>
          <div class="card-footer"><a class="card-link" href="${withRoot('pages/cases/index.html')}">进入案例库</a></div>
        </div>
      </section>

      <section class="card mt20">
        <div class="card-body">
          <div class="card-title">快速使用</div>
          <div class="grid grid-3">
            ${card('全库检索', '按关键词跨库检索，支持标题/摘要/标签匹配。', withRoot('pages/search/index.html?q='), `${badge('检索', 'primary')} 全库`)}
            ${card('收藏夹', '对重点条目进行本地收藏（浏览器本地存储）。', withRoot('pages/search/index.html?tab=fav'), `${badge('收藏', 'primary')} 本地`)}
            ${card('数据来源说明', '了解口径、更新方式与版权提示。', withRoot('pages/about/index.html'), `${badge('说明', 'primary')}`)}
          </div>
        </div>
      </section>
    `;

    $('#pageContent').innerHTML = content;
    attachFavHandler($('#pageContent'));
  };

  const renderCooperationIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '合作文件库' }]);
    setPageHead({
      title: '合作文件库',
      desc: '集中管理双边合作文件（MOU/合作协定）、自贸协定竞争政策章节、多边合作机制文件，并提供要点提炼与外部来源链接。'
    });

    const d = AICDB.datasets.cooperation;
    const cards = [
      card('双边合作备忘录/协定', '执法机构间MOU、政府间竞争合作协定等。', withRoot('pages/cooperation/mou.html'), `${badge('条目','primary')} ${d.mou.length}`),
      card('自贸协定竞争政策章节', 'USMCA、CPTPP、RCEP等协定的竞争章节条款。', withRoot('pages/cooperation/fta.html'), `${badge('条目','primary')} ${d.fta.length}`),
      card('多边合作机制文件', 'OECD、ICN、UNCTAD等竞争领域合作框架、建议、数据库。', withRoot('pages/cooperation/multilateral.html'), `${badge('条目','primary')} ${d.multilateral.length}`),
      card('合作关系网络（可视化）', '基于已收录合作文件的“机构—机构”关系示意。', withRoot('pages/analysis/network.html'), `${badge('图示','primary')}`)
    ];

    // simple breakdown by jurisdiction
    const counts = {};
    [...d.mou, ...d.fta, ...d.multilateral].forEach(x => {
      (x.jurisdictions || []).forEach(j => {
        counts[j] = (counts[j] || 0) + 1;
      });
    });
    const chartRows = Object.keys(counts).sort().map(j => ({ label: getJurName(j), value: counts[j] }));

    $('#pageContent').innerHTML = `
      <section class="grid grid-2">
        <div>
          <div class="grid grid-2">${cards.join('')}</div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">覆盖法域（示例统计）</div>
            ${chartRows.length ? renderBarChart(chartRows) : renderEmpty('暂无统计')}
          </div>
        </div>
      </section>

      <section class="card mt20">
        <div class="card-body">
          <div class="card-title">常用筛选维度</div>
          <div class="grid grid-3">
            ${card('按法域', '按参与方/适用法域筛选合作文件。', withRoot('pages/cooperation/mou.html?jur=EU'), badge('维度','soft') + ' Jurisdiction')}
            ${card('按类型', 'MOU / FTA章节 / 多边机制。', withRoot('pages/cooperation/mou.html'), badge('维度','soft') + ' Type')}
            ${card('按年度', '按签署/生效年份浏览与追踪更新。', withRoot('pages/cooperation/mou.html?year=2025'), badge('维度','soft') + ' Year')}
          </div>
        </div>
      </section>
    `;
  };

  const renderCooperationList = (kind) => {
    const map = {
      mou: { title: '双边合作备忘录/协定', desc: '面向执法协作与信息交流的双边文件（MOU/协定）清单。' },
      fta: { title: '自贸协定竞争政策章节', desc: '自贸协定中竞争政策章节/条款的清单与要点。' },
      multilateral: { title: '多边合作机制文件', desc: 'OECD、ICN、UNCTAD等多边机制文件与合作框架。' }
    };
    const conf = map[kind] || map.mou;

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '合作文件库', href: 'pages/cooperation/index.html' },
      { text: conf.title }
    ]);

    setPageHead({
      title: conf.title,
      desc: conf.desc,
      actionsHtml: `<button class="btn btn-outline" id="btnExport" type="button">导出CSV</button>`
    });

    const data = AICDB.datasets.cooperation[kind] || [];

    const jur = getParam('jur');
    const year = getParam('year');
    const q = getParam('q');

    const jurOptions = [''].concat(uniq(data.flatMap(x => x.jurisdictions || [])))
      .map(code => `<option value="${escapeHtml(code)}" ${jur===code?'selected':''}>${code?escapeHtml(getJurName(code)):'全部法域'}</option>`)
      .join('');

    const years = uniq(data.map(x => (x.signedDate || x.updatedDate || '').slice(0,4)).filter(Boolean)).sort().reverse();
    const yearOptions = [''].concat(years)
      .map(y => `<option value="${escapeHtml(y)}" ${year===y?'selected':''}>${y?y:'全部年份'}</option>`)
      .join('');

    const filterBar = `
      <div class="filters">
        <div class="filter">
          <label for="fJur">法域</label>
          <select id="fJur">${jurOptions}</select>
        </div>
        <div class="filter">
          <label for="fYear">年份</label>
          <select id="fYear">${yearOptions}</select>
        </div>
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="标题/摘要/参与方" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fj = $('#fJur').value;
      const fy = $('#fYear').value;
      const fq = $('#fQ').value.trim();

      let rows = data.slice();
      if (fj) rows = rows.filter(x => (x.jurisdictions || []).includes(fj));
      if (fy) rows = rows.filter(x => ((x.signedDate || x.updatedDate || '').slice(0,4) === fy));
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.titleCN || '').toLowerCase().includes(fql) ||
          (x.titleEN || '').toLowerCase().includes(fql) ||
          (x.summaryCN || '').toLowerCase().includes(fql) ||
          (x.parties || []).join(' ').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => {
        const src = getSource(x.sourceId);
        const jurText = (x.jurisdictions || []).map(getJurName).join(' / ');
        const when = x.signedDate || x.updatedDate || '';
        return `
          <tr>
            <td>
              <a href="${withRoot('pages/cooperation/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.titleCN)}</a>
              <div class="sub">${escapeHtml(x.titleEN || '')}</div>
            </td>
            <td>${escapeHtml(jurText)}</td>
            <td>${escapeHtml(when ? when : '-')}</td>
            <td>${escapeHtml((x.parties || []).slice(0,3).join('；'))}${(x.parties||[]).length>3?'…':''}</td>
            <td>
              ${renderFavBtn(x.id)}
              ${src ? `<a class="btn btn-sm btn-outline" href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">来源</a>` : ''}
            </td>
          </tr>
        `;
      }).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable(['标题','法域','时间','参与方','操作'], rowsHtml) : renderEmpty('未检索到符合条件的条目');
      attachFavHandler($('#listArea'));

      // export binds to current rows
      const btn = $('#btnExport');
      if (btn) {
        btn.onclick = () => {
          const exportRows = rows.map(r => ({
            id: r.id,
            titleCN: r.titleCN,
            titleEN: r.titleEN,
            jurisdictions: (r.jurisdictions||[]).join('|'),
            signedDate: r.signedDate || r.updatedDate || '',
            parties: (r.parties||[]).join(' ; '),
            source: (getSource(r.sourceId)?.url || '')
          }));
          const csv = toCSV(exportRows, ['id','titleCN','titleEN','jurisdictions','signedDate','parties','source']);
          downloadText(`cooperation_${kind}_export.csv`, csv);
        };
      }
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;

    // initial render
    applyFilters();

    $('#btnApply').addEventListener('click', () => {
      applyFilters();
    });

    // enter to apply
    $('#fQ').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyFilters();
      }
    });
  };

  const renderCooperationDetail = () => {
    const id = getParam('id');
    const record = findRecordById(id);

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '合作文件库', href: 'pages/cooperation/index.html' },
      { text: '条目详情' }
    ]);

    if (!record) {
      setPageHead({ title: '条目不存在', desc: '未找到对应记录，请从列表页重新进入。' });
      $('#pageContent').innerHTML = renderEmpty('未找到该条目');
      return;
    }

    setPageHead({
      title: record.titleCN,
      desc: record.titleEN || '',
      actionsHtml: `${renderFavBtn(record.id)} ${getSource(record.sourceId) ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(getSource(record.sourceId).url)}">打开来源</a>` : ''}`
    });

    const src = getSource(record.sourceId);
    const jurText = (record.jurisdictions || []).map(getJurName).join(' / ');
    const keyPoints = (record.keyPointsCN || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');

    const kv = `
      <div class="kv">
        <div class="k">条目类型</div><div class="v">${record._type === 'mou' ? '双边合作文件' : (record._type === 'fta' ? '自贸协定章节' : '多边机制文件')}</div>
        <div class="k">适用/参与法域</div><div class="v">${escapeHtml(jurText || '-')}</div>
        <div class="k">签署/发布日期</div><div class="v">${escapeHtml(record.signedDate || record.updatedDate || '-')}</div>
        <div class="k">状态</div><div class="v">${escapeHtml(record.status || '-')}</div>
        <div class="k">参与方</div><div class="v">${escapeHtml((record.parties || []).join('；') || '-')}</div>
        <div class="k">来源</div><div class="v source-link">${src ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.name)}</a>` : '-'}</div>
      </div>
    `;

    const related = (AICDB.datasets.cooperation.mou || []).filter(x => x.id !== record.id)
      .slice(0, 4)
      .map(x => `<li><a href="${withRoot('pages/cooperation/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.titleCN)}</a></li>`)
      .join('');

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="card-title">基本信息</div>
          ${kv}
          <div class="hr"></div>
          <div class="card-title">中文摘要</div>
          <p class="m0">${escapeHtml(record.summaryCN || '—')}</p>
          ${keyPoints ? `<div class="mt12"><div class="card-title">要点归纳</div><ul class="ul">${keyPoints}</ul></div>` : ''}
          ${record.attachmentTitle && src ? `<div class="mt12"><a class="btn btn-primary" href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(record.attachmentTitle)}</a></div>` : ''}
        </div>
      </section>

      <section class="card mt20">
        <div class="card-body">
          <div class="card-title">相关条目（示例）</div>
          ${related ? `<ul class="ul">${related}</ul>` : renderEmpty('暂无')}
        </div>
      </section>
    `;

    attachFavHandler($('#pageContent'));
  };

  const renderLawsIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '域外法规库' }]);
    setPageHead({
      title: '域外法规库',
      desc: '汇集域外主要司法辖区反垄断/竞争法律法规与指南，并提供摘要、关键词、链接与可检索元数据。'
    });

    const laws = AICDB.datasets.laws || [];
    const byJur = {};
    laws.forEach(l => { byJur[l.jurisdiction] = (byJur[l.jurisdiction] || 0) + 1; });
    const chartRows = Object.keys(byJur).sort().map(j => ({ label: getJurName(j), value: byJur[j] }));

    $('#pageContent').innerHTML = `
      <section class="grid grid-2">
        <div class="card">
          <div class="card-body">
            <div class="card-title">入口</div>
            <div class="grid grid-2">
              ${card('法规清单', '按法域/类型/年份筛选，支持关键词检索与导出。', withRoot('pages/laws/list.html'), badge('清单','primary'))}
              ${card('术语表', '并购、卡特尔、市场支配等常用概念释义。', withRoot('pages/about/glossary.html'), badge('术语','primary'))}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">覆盖法域（条目数）</div>
            ${chartRows.length ? renderBarChart(chartRows) : renderEmpty('暂无')}
          </div>
        </div>
      </section>

      <section class="card mt20">
        <div class="card-body">
          <div class="card-title">检索建议</div>
          <div class="notice">
            <ul class="ul">
              <li>可用关键词：<b>merger</b> / <b>cartel</b> / <b>abuse of dominance</b> / <b>market definition</b> 等。</li>
              <li>中英文对照字段：标题（CN/EN）、摘要（CN）、关键词标签（tags）。</li>
              <li>条目详情页提供：原文链接、更新日期、适用条款范围、备注。</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  };

  const renderLawsList = () => {
    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '域外法规库', href: 'pages/laws/index.html' },
      { text: '法规清单' }
    ]);

    setPageHead({
      title: '法规清单',
      desc: '支持按法域、类型与关键词检索；详情页提供摘要与原文链接。',
      actionsHtml: `<button class="btn btn-outline" id="btnExport" type="button">导出CSV</button>`
    });

    const data = AICDB.datasets.laws || [];

    const jur = getParam('jur');
    const type = getParam('type');
    const q = getParam('q');

    const jurOptions = [''].concat(uniq(data.map(x => x.jurisdiction)))
      .map(code => `<option value="${escapeHtml(code)}" ${jur===code?'selected':''}>${code?escapeHtml(getJurName(code)):'全部法域'}</option>`)
      .join('');

    const types = uniq(data.map(x => x.type)).filter(Boolean);
    const typeOptions = [''].concat(types)
      .map(t => `<option value="${escapeHtml(t)}" ${type===t?'selected':''}>${t?escapeHtml(t):'全部类型'}</option>`)
      .join('');

    const filterBar = `
      <div class="filters">
        <div class="filter">
          <label for="fJur">法域</label>
          <select id="fJur">${jurOptions}</select>
        </div>
        <div class="filter">
          <label for="fType">类型</label>
          <select id="fType">${typeOptions}</select>
        </div>
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="标题/摘要/标签" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fj = $('#fJur').value;
      const ft = $('#fType').value;
      const fq = $('#fQ').value.trim();

      let rows = data.slice();
      if (fj) rows = rows.filter(x => x.jurisdiction === fj);
      if (ft) rows = rows.filter(x => x.type === ft);
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.titleCN || '').toLowerCase().includes(fql) ||
          (x.titleEN || '').toLowerCase().includes(fql) ||
          (x.summaryCN || '').toLowerCase().includes(fql) ||
          (x.tags || []).join(' ').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => {
        const src = getSource(x.sourceId);
        return `
          <tr>
            <td>
              <a href="${withRoot('pages/laws/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.titleCN)}</a>
              <div class="sub">${escapeHtml(x.titleEN || '')}</div>
            </td>
            <td>${escapeHtml(getJurName(x.jurisdiction))}</td>
            <td>${escapeHtml(x.type || '-')}</td>
            <td>${escapeHtml(x.updatedDate || x.effectiveDate || '-')}</td>
            <td>${tagsToBadges(x.tags)}</td>
            <td>
              ${renderFavBtn(x.id)}
              ${src ? `<a class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">原文</a>` : ''}
            </td>
          </tr>
        `;
      }).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable(['标题','法域','类型','更新/生效','标签','操作'], rowsHtml) : renderEmpty('未检索到符合条件的条目');
      attachFavHandler($('#listArea'));

      const btn = $('#btnExport');
      if (btn) {
        btn.onclick = () => {
          const exportRows = rows.map(r => ({
            id: r.id,
            titleCN: r.titleCN,
            titleEN: r.titleEN,
            jurisdiction: r.jurisdiction,
            type: r.type,
            updatedDate: r.updatedDate || '',
            source: (getSource(r.sourceId)?.url || '')
          }));
          const csv = toCSV(exportRows, ['id','titleCN','titleEN','jurisdiction','type','updatedDate','source']);
          downloadText('laws_export.csv', csv);
        };
      }
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;
    applyFilters();
    $('#btnApply').addEventListener('click', applyFilters);
    $('#fQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  };

  const renderLawsDetail = () => {
    const id = getParam('id');
    const record = findRecordById(id);

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '域外法规库', href: 'pages/laws/index.html' },
      { text: '条目详情' }
    ]);

    if (!record) {
      setPageHead({ title: '条目不存在', desc: '未找到对应记录。' });
      $('#pageContent').innerHTML = renderEmpty('未找到该条目');
      return;
    }

    const src = getSource(record.sourceId);

    setPageHead({
      title: record.titleCN,
      desc: record.titleEN || '',
      actionsHtml: `${renderFavBtn(record.id)} ${src ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">打开原文</a>` : ''}`
    });

    const kv = `
      <div class="kv">
        <div class="k">法域</div><div class="v">${escapeHtml(getJurName(record.jurisdiction))}</div>
        <div class="k">类型</div><div class="v">${escapeHtml(record.type || '-')}</div>
        <div class="k">生效/更新时间</div><div class="v">${escapeHtml(record.updatedDate || record.effectiveDate || '-')}</div>
        <div class="k">关键词</div><div class="v">${tagsToBadges(record.tags)}</div>
        <div class="k">来源</div><div class="v source-link">${src ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.name)}</a>` : '-'}</div>
      </div>
    `;

    const pts = (record.keyPointsCN || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="card-title">基本信息</div>
          ${kv}
          <div class="hr"></div>
          <div class="card-title">中文摘要</div>
          <p class="m0">${escapeHtml(record.summaryCN || '—')}</p>
          ${pts ? `<div class="mt12"><div class="card-title">要点</div><ul class="ul">${pts}</ul></div>` : ''}
        </div>
      </section>
    `;

    attachFavHandler($('#pageContent'));
  };

  const renderAgenciesIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '机构与组织' }]);
    setPageHead({
      title: '机构与组织',
      desc: '收录域外主要竞争执法机构信息，并汇总OECD、APEC、UNCTAD等国际组织竞争领域合作情况。'
    });

    const a = AICDB.datasets.agencies;

    $('#pageContent').innerHTML = `
      <section class="grid grid-2">
        ${card('域外执法机构信息库', '机构职责、权力工具、联系方式、年度报告入口等。', withRoot('pages/agencies/authorities.html'), `${badge('机构','primary')} ${(a.authorities||[]).length}`)}
        ${card('国际组织与合作机制', 'OECD/ICN/UNCTAD/APEC等组织机制、会议与文件入口。', withRoot('pages/agencies/organizations.html'), `${badge('组织','primary')} ${(a.organizations||[]).length}`)}
      </section>

      <section class="card mt20">
        <div class="card-body">
          <div class="card-title">推荐入口</div>
          <div class="grid grid-3">
            ${card('OECD竞争与国际合作专题页', '合作框架、数据、资料库与会议动态。', (getSource('oecd_comp_intlcoop')?.url || '#'), badge('外部','soft') + ' OECD')}
            ${card('DOJ合作协定地图', '美国反垄断司合作协定地图与链接。', (getSource('doj_coop_map')?.url || '#'), badge('外部','soft') + ' DOJ')}
            ${card('FTC国际合作文件', 'FTC对外合作协定与建议清单。', (getSource('ftc_intl_agreements')?.url || '#'), badge('外部','soft') + ' FTC')}
          </div>
        </div>
      </section>
    `;
  };

  const renderAgenciesList = (kind) => {
    const conf = kind === 'organizations'
      ? { title: '国际组织与合作机制', desc: '竞争政策相关国际组织信息与合作机制入口。', data: AICDB.datasets.agencies.organizations, typeLabel: '组织' }
      : { title: '域外执法机构信息库', desc: '域外主要竞争执法机构信息清单。', data: AICDB.datasets.agencies.authorities, typeLabel: '机构' };

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '机构与组织', href: 'pages/agencies/index.html' },
      { text: conf.title }
    ]);

    setPageHead({
      title: conf.title,
      desc: conf.desc,
      actionsHtml: `<button class="btn btn-outline" id="btnExport" type="button">导出CSV</button>`
    });

    const data = conf.data || [];

    const jur = getParam('jur');
    const q = getParam('q');

    const jurOptions = [''].concat(uniq(data.map(x => x.jurisdiction).filter(Boolean)))
      .map(code => `<option value="${escapeHtml(code)}" ${jur===code?'selected':''}>${code?escapeHtml(getJurName(code)):'全部法域/组织'}</option>`)
      .join('');

    const filterBar = `
      <div class="filters">
        <div class="filter">
          <label for="fJur">法域/范围</label>
          <select id="fJur">${jurOptions}</select>
        </div>
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="名称/职责/关键词" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fj = $('#fJur').value;
      const fq = $('#fQ').value.trim();

      let rows = data.slice();
      if (fj) rows = rows.filter(x => (x.jurisdiction || '') === fj);
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.nameCN || '').toLowerCase().includes(fql) ||
          (x.nameEN || '').toLowerCase().includes(fql) ||
          (x.summaryCN || '').toLowerCase().includes(fql) ||
          (x.functionsCN || '').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => {
        const src = getSource(x.sourceId);
        return `
          <tr>
            <td>
              <a href="${withRoot('pages/agencies/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.nameCN)}</a>
              <div class="sub">${escapeHtml(x.nameEN || '')}</div>
            </td>
            <td>${escapeHtml(x.jurisdiction ? getJurName(x.jurisdiction) : (x.scopeCN || '-'))}</td>
            <td>${escapeHtml(x.website || (src?.url || ''))}</td>
            <td>${renderFavBtn(x.id)} ${x.website ? `<a class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(x.website)}">官网</a>` : ''}</td>
          </tr>
        `;
      }).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable([conf.typeLabel,'法域/范围','网址','操作'], rowsHtml) : renderEmpty('未检索到符合条件的条目');
      attachFavHandler($('#listArea'));

      const btn = $('#btnExport');
      if (btn) {
        btn.onclick = () => {
          const exportRows = rows.map(r => ({
            id: r.id,
            nameCN: r.nameCN,
            nameEN: r.nameEN,
            jurisdiction: r.jurisdiction || '',
            website: r.website || '',
            source: (getSource(r.sourceId)?.url || '')
          }));
          const csv = toCSV(exportRows, ['id','nameCN','nameEN','jurisdiction','website','source']);
          downloadText(`agencies_${kind}_export.csv`, csv);
        };
      }
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;
    applyFilters();
    $('#btnApply').addEventListener('click', applyFilters);
    $('#fQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  };

  const renderAgenciesDetail = () => {
    const id = getParam('id');
    const record = findRecordById(id);

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '机构与组织', href: 'pages/agencies/index.html' },
      { text: '条目详情' }
    ]);

    if (!record) {
      setPageHead({ title: '条目不存在', desc: '未找到对应记录。' });
      $('#pageContent').innerHTML = renderEmpty('未找到该条目');
      return;
    }

    const src = getSource(record.sourceId);

    setPageHead({
      title: record.nameCN || record.titleCN,
      desc: record.nameEN || record.titleEN || '',
      actionsHtml: `${renderFavBtn(record.id)} ${record.website ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(record.website)}">打开官网</a>` : (src ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">打开来源</a>` : '')}`
    });

    const kv = `
      <div class="kv">
        <div class="k">类别</div><div class="v">${record._type === 'organization' ? '国际组织/机制' : '竞争执法机构'}</div>
        <div class="k">法域/范围</div><div class="v">${escapeHtml(record.jurisdiction ? getJurName(record.jurisdiction) : (record.scopeCN || '-'))}</div>
        <div class="k">官网</div><div class="v source-link">${record.website ? `<a href="${escapeHtml(record.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(record.website)}</a>` : '-'}</div>
        <div class="k">来源</div><div class="v source-link">${src ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.name)}</a>` : '-'}</div>
      </div>
    `;

    const funcs = (record.functionsCNList || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="card-title">基本信息</div>
          ${kv}
          <div class="hr"></div>
          <div class="card-title">中文简介</div>
          <p class="m0">${escapeHtml(record.summaryCN || '—')}</p>
          ${funcs ? `<div class="mt12"><div class="card-title">主要职责/工作重点</div><ul class="ul">${funcs}</ul></div>` : ''}
          ${record.reports && record.reports.length ? `
            <div class="mt12">
              <div class="card-title">相关报告/资源（示例）</div>
              <ul class="ul">
                ${record.reports.map(r => `<li><a target="_blank" rel="noopener noreferrer" href="${escapeHtml(r.url)}">${escapeHtml(r.title)}</a></li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </section>
    `;

    attachFavHandler($('#pageContent'));
  };

  const renderDynamicsIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '政策动态' }]);
    setPageHead({
      title: '政策动态',
      desc: '收集域外主要司法辖区与国际组织竞争政策重要动态、研究报告发布与会议活动信息。'
    });

    const data = [...(AICDB.datasets.dynamics || [])].sort(byDateDesc);

    const jur = getParam('jur');
    const cat = getParam('cat');
    const q = getParam('q');

    const jurOptions = [''].concat(uniq(data.map(x => x.jurisdiction)))
      .map(code => `<option value="${escapeHtml(code)}" ${jur===code?'selected':''}>${code?escapeHtml(getJurName(code)):'全部法域'}</option>`)
      .join('');

    const cats = uniq(data.map(x => x.categoryCN).filter(Boolean));
    const catOptions = [''].concat(cats)
      .map(c => `<option value="${escapeHtml(c)}" ${cat===c?'selected':''}>${c?escapeHtml(c):'全部类别'}</option>`)
      .join('');

    const filterBar = `
      <div class="filters">
        <div class="filter">
          <label for="fJur">法域</label>
          <select id="fJur">${jurOptions}</select>
        </div>
        <div class="filter">
          <label for="fCat">类别</label>
          <select id="fCat">${catOptions}</select>
        </div>
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="标题/摘要/标签" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fj = $('#fJur').value;
      const fc = $('#fCat').value;
      const fq = $('#fQ').value.trim();

      let rows = data.slice();
      if (fj) rows = rows.filter(x => x.jurisdiction === fj);
      if (fc) rows = rows.filter(x => x.categoryCN === fc);
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.titleCN || '').toLowerCase().includes(fql) ||
          (x.titleEN || '').toLowerCase().includes(fql) ||
          (x.summaryCN || '').toLowerCase().includes(fql) ||
          (x.tags || []).join(' ').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => {
        const src = getSource(x.sourceId);
        return `
          <tr>
            <td>
              <a href="${withRoot('pages/dynamics/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.titleCN)}</a>
              <div class="sub">${escapeHtml(x.titleEN || '')}</div>
            </td>
            <td>${escapeHtml(getJurName(x.jurisdiction))}</td>
            <td>${escapeHtml(x.categoryCN || '-')}</td>
            <td>${escapeHtml(x.date || '-')}</td>
            <td>${x.importance ? badge('重点','warning') : ''} ${tagsToBadges(x.tags)}</td>
            <td>
              ${renderFavBtn(x.id)}
              ${src ? `<a class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">来源</a>` : ''}
            </td>
          </tr>
        `;
      }).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable(['标题','法域','类别','日期','标签','操作'], rowsHtml) : renderEmpty('未检索到符合条件的条目');
      attachFavHandler($('#listArea'));
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;
    applyFilters();
    $('#btnApply').addEventListener('click', applyFilters);
    $('#fQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  };

  const renderDynamicsDetail = () => {
    const id = getParam('id');
    const record = findRecordById(id);

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '政策动态', href: 'pages/dynamics/index.html' },
      { text: '条目详情' }
    ]);

    if (!record) {
      setPageHead({ title: '条目不存在', desc: '未找到对应记录。' });
      $('#pageContent').innerHTML = renderEmpty('未找到该条目');
      return;
    }

    const src = getSource(record.sourceId);

    setPageHead({
      title: record.titleCN,
      desc: record.titleEN || '',
      actionsHtml: `${renderFavBtn(record.id)} ${src ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">打开来源</a>` : ''}`
    });

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="kv">
            <div class="k">法域</div><div class="v">${escapeHtml(getJurName(record.jurisdiction))}</div>
            <div class="k">类别</div><div class="v">${escapeHtml(record.categoryCN || '-')}</div>
            <div class="k">日期</div><div class="v">${escapeHtml(record.date || '-')}</div>
            <div class="k">标签</div><div class="v">${tagsToBadges(record.tags)}</div>
            <div class="k">来源</div><div class="v source-link">${src ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.name)}</a>` : '-'}</div>
          </div>
          <div class="hr"></div>
          <div class="card-title">中文摘要</div>
          <p class="m0">${escapeHtml(record.summaryCN || '—')}</p>
          ${record.keyPointsCN && record.keyPointsCN.length ? `
            <div class="mt12">
              <div class="card-title">要点</div>
              <ul class="ul">${record.keyPointsCN.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
            </div>
          ` : ''}
        </div>
      </section>
    `;

    attachFavHandler($('#pageContent'));
  };

  const renderCasesIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '重大案例' }]);
    setPageHead({
      title: '重大案例',
      desc: '围绕数字经济、平台垄断、并购审查、卡特尔等方向收录典型案件，并提供程序时间线与要点归纳。'
    });

    const data = [...(AICDB.datasets.cases || [])].sort(byDateDesc);

    const jur = getParam('jur');
    const type = getParam('type');
    const q = getParam('q');

    const jurOptions = [''].concat(uniq(data.map(x => x.jurisdiction)))
      .map(code => `<option value="${escapeHtml(code)}" ${jur===code?'selected':''}>${code?escapeHtml(getJurName(code)):'全部法域'}</option>`)
      .join('');

    const types = uniq(data.map(x => x.type)).filter(Boolean);
    const typeOptions = [''].concat(types)
      .map(t => `<option value="${escapeHtml(t)}" ${type===t?'selected':''}>${t?escapeHtml(t):'全部类型'}</option>`)
      .join('');

    const filterBar = `
      <div class="filters">
        <div class="filter">
          <label for="fJur">法域</label>
          <select id="fJur">${jurOptions}</select>
        </div>
        <div class="filter">
          <label for="fType">类型</label>
          <select id="fType">${typeOptions}</select>
        </div>
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="标题/摘要/标签" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fj = $('#fJur').value;
      const ft = $('#fType').value;
      const fq = $('#fQ').value.trim();

      let rows = data.slice();
      if (fj) rows = rows.filter(x => x.jurisdiction === fj);
      if (ft) rows = rows.filter(x => x.type === ft);
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.titleCN || '').toLowerCase().includes(fql) ||
          (x.titleEN || '').toLowerCase().includes(fql) ||
          (x.summaryCN || '').toLowerCase().includes(fql) ||
          (x.tags || []).join(' ').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => {
        const src = getSource(x.sourceId);
        return `
          <tr>
            <td>
              <a href="${withRoot('pages/cases/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.titleCN)}</a>
              <div class="sub">${escapeHtml(x.titleEN || '')}</div>
            </td>
            <td>${escapeHtml(getJurName(x.jurisdiction))}</td>
            <td>${escapeHtml(x.type || '-')}</td>
            <td>${escapeHtml(x.statusCN || '-')}</td>
            <td>${escapeHtml(x.decisionDate || x.filedDate || '-')}</td>
            <td>${tagsToBadges(x.tags)} ${renderFavBtn(x.id)} ${src ? `<a class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">来源</a>` : ''}</td>
          </tr>
        `;
      }).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable(['案件名称','法域','类型','状态','关键日期','操作'], rowsHtml) : renderEmpty('未检索到符合条件的条目');
      attachFavHandler($('#listArea'));
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;
    applyFilters();
    $('#btnApply').addEventListener('click', applyFilters);
    $('#fQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  };

  const renderCasesDetail = () => {
    const id = getParam('id');
    const record = findRecordById(id);

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '重大案例', href: 'pages/cases/index.html' },
      { text: '案例详情' }
    ]);

    if (!record) {
      setPageHead({ title: '案例不存在', desc: '未找到对应记录。' });
      $('#pageContent').innerHTML = renderEmpty('未找到该案例');
      return;
    }

    const src = getSource(record.sourceId);

    setPageHead({
      title: record.titleCN,
      desc: record.titleEN || '',
      actionsHtml: `${renderFavBtn(record.id)} ${src ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">打开来源</a>` : ''}`
    });

    const timeline = (record.timeline || []).map(e => {
      return `
        <div class="t-item">
          <div class="t-date">${escapeHtml(e.date || '')}</div>
          <div class="t-title">${escapeHtml(e.title)}</div>
          <p class="t-desc">${escapeHtml(e.desc || '')}</p>
        </div>
      `;
    }).join('');

    const pts = (record.keyPointsCN || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');

    $('#pageContent').innerHTML = `
      <section class="grid grid-2">
        <div class="card">
          <div class="card-body">
            <div class="card-title">案件信息</div>
            <div class="kv">
              <div class="k">法域</div><div class="v">${escapeHtml(getJurName(record.jurisdiction))}</div>
              <div class="k">类型</div><div class="v">${escapeHtml(record.type || '-')}</div>
              <div class="k">程序/机关</div><div class="v">${escapeHtml(record.procedureCN || '-')}</div>
              <div class="k">立案/起诉</div><div class="v">${escapeHtml(record.filedDate || '-')}</div>
              <div class="k">决定/关键节点</div><div class="v">${escapeHtml(record.decisionDate || '-')}</div>
              <div class="k">状态</div><div class="v">${escapeHtml(record.statusCN || '-')}</div>
              <div class="k">标签</div><div class="v">${tagsToBadges(record.tags)}</div>
              <div class="k">来源</div><div class="v source-link">${src ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.name)}</a>` : '-'}</div>
            </div>
            <div class="hr"></div>
            <div class="card-title">中文摘要</div>
            <p class="m0">${escapeHtml(record.summaryCN || '—')}</p>
            ${pts ? `<div class="mt12"><div class="card-title">要点归纳</div><ul class="ul">${pts}</ul></div>` : ''}
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">程序时间线</div>
            ${timeline ? `<div class="timeline">${timeline}</div>` : renderEmpty('暂无时间线')}
          </div>
        </div>
      </section>
    `;

    attachFavHandler($('#pageContent'));
  };

  const renderAnalysisIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '数据统计' }]);
    setPageHead({
      title: '数据统计与分析',
      desc: '基于数据库条目生成覆盖度统计，并提供合作关系网络图、指标样例与导出能力。'
    });

    const d = AICDB.datasets;

    const moduleCounts = [
      { label: '双边合作文件', value: d.cooperation.mou.length },
      { label: '自贸协定章节', value: d.cooperation.fta.length },
      { label: '多边机制文件', value: d.cooperation.multilateral.length },
      { label: '域外法规', value: d.laws.length },
      { label: '机构信息', value: d.agencies.authorities.length },
      { label: '国际组织', value: d.agencies.organizations.length },
      { label: '政策动态', value: d.dynamics.length },
      { label: '重大案例', value: d.cases.length },
      { label: '专题研究', value: d.research.length }
    ];

    const indicators = d.analysis.indicators || [];

    const indRows = indicators.map(x => {
      const src = getSource(x.sourceId);
      return `
        <tr>
          <td>${escapeHtml(x.indicatorCN)}</td>
          <td>${escapeHtml(x.jurisdiction ? getJurName(x.jurisdiction) : (x.scopeCN || '-'))}</td>
          <td>${escapeHtml(x.period || '-') }</td>
          <td>${escapeHtml(String(x.value))}${x.unit ? ' ' + escapeHtml(x.unit) : ''}</td>
          <td>${src ? `<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">来源</a>` : '-'}</td>
        </tr>
      `;
    }).join('');

    $('#pageContent').innerHTML = `
      <section class="grid grid-2">
        <div class="card">
          <div class="card-body">
            <div class="card-title">数据库覆盖度（条目数）</div>
            ${renderBarChart(moduleCounts)}
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">功能入口</div>
            <div class="grid grid-2">
              ${card('合作关系网络图', '基于合作文件的机构关系示意（SVG）。', withRoot('pages/analysis/network.html'), badge('图示','primary'))}
              ${card('全库导出', '从列表页导出CSV；可扩展JSON/API。', withRoot('pages/search/index.html?tab=export'), badge('导出','primary'))}
            </div>
            <div class="hr"></div>
            <div class="card-title">指标样例（节选）</div>
            ${indRows ? renderTable(['指标','范围','期间','数值','来源'], indRows) : renderEmpty('暂无指标')}
          </div>
        </div>
      </section>
    `;
  };

  const renderAnalysisNetwork = () => {
    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '数据统计', href: 'pages/analysis/index.html' },
      { text: '合作关系网络图' }
    ]);

    setPageHead({
      title: '合作关系网络图（示例）',
      desc: '节点为机构/组织，连线来自已收录合作文件（MOU/协定）。鼠标悬停可查看关联文件。'
    });

    const agreements = AICDB.datasets.cooperation.mou || [];

    // Build nodes from parties
    const nodes = [];
    const nodeIndex = {};
    const addNode = (name) => {
      if (!name) return;
      if (nodeIndex[name] !== undefined) return;
      nodeIndex[name] = nodes.length;
      nodes.push({ name });
    };
    agreements.forEach(a => (a.parties || []).forEach(addNode));

    const edges = [];
    agreements.forEach(a => {
      const ps = a.parties || [];
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          edges.push({
            a: ps[i],
            b: ps[j],
            agreementId: a.id,
            titleCN: a.titleCN
          });
        }
      }
    });

    const width = 960;
    const height = 520;
    const r = Math.min(width, height) * 0.38;
    const cx = width / 2;
    const cy = height / 2;

    const positioned = nodes.map((n, idx) => {
      const angle = (idx / Math.max(nodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return { ...n, x, y };
    });

    const edgeSvg = edges.map(e => {
      const na = positioned[nodeIndex[e.a]];
      const nb = positioned[nodeIndex[e.b]];
      if (!na || !nb) return '';
      return `<line x1="${na.x.toFixed(2)}" y1="${na.y.toFixed(2)}" x2="${nb.x.toFixed(2)}" y2="${nb.y.toFixed(2)}" stroke="rgba(26,79,156,0.25)" stroke-width="1" data-aid="${escapeHtml(e.agreementId)}" />`;
    }).join('');

    const nodeSvg = positioned.map(n => {
      return `
        <g class="node" tabindex="0" role="button" aria-label="${escapeHtml(n.name)}" data-name="${escapeHtml(n.name)}">
          <circle cx="${n.x.toFixed(2)}" cy="${n.y.toFixed(2)}" r="8" fill="#0a7bc2" />
          <text x="${(n.x + 12).toFixed(2)}" y="${(n.y + 4).toFixed(2)}" font-size="12" fill="#1f2a37">${escapeHtml(n.name)}</text>
        </g>
      `;
    }).join('');

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="card-title">网络图</div>
          <div class="notice">提示：该图仅基于本示范站已收录的合作文件（非全量）。实际项目可接入更多条目并采用力导向布局、分组着色、过滤等增强功能。</div>
          <div class="mt12" style="overflow:auto">
            <svg id="netSvg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:#fff;border:1px solid var(--border);border-radius:12px;">
              ${edgeSvg}
              ${nodeSvg}
            </svg>
          </div>
          <div class="hr"></div>
          <div class="card-title">关联文件</div>
          <div id="netInfo" class="empty">选择节点以查看与其相关的合作文件。</div>
        </div>
      </section>
    `;

    const info = $('#netInfo');
    const svg = $('#netSvg');

    const showForName = (name) => {
      const rel = agreements.filter(a => (a.parties || []).includes(name));
      if (!rel.length) {
        info.innerHTML = renderEmpty('未找到关联合作文件');
        return;
      }
      info.innerHTML = `
        <ul class="ul">
          ${rel.map(a => `<li><a href="${withRoot('pages/cooperation/detail.html?id=' + encodeURIComponent(a.id))}">${escapeHtml(a.titleCN)}</a></li>`).join('')}
        </ul>
      `;
    };

    svg.addEventListener('click', (e) => {
      const g = e.target.closest('g.node');
      if (!g) return;
      const name = g.getAttribute('data-name');
      showForName(name);
    });
  };

  const renderResearchIndex = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '专题研究' }]);
    setPageHead({
      title: '专题研究与参考',
      desc: '收录研究报告、指南工具、经验汇编与参考文献，支持按主题与来源筛选。'
    });

    const data = [...(AICDB.datasets.research || [])].sort(byDateDesc);

    const org = getParam('org');
    const q = getParam('q');

    const orgs = uniq(data.map(x => x.orgCN).filter(Boolean));
    const orgOptions = [''].concat(orgs)
      .map(o => `<option value="${escapeHtml(o)}" ${org===o?'selected':''}>${o?escapeHtml(o):'全部来源'}</option>`)
      .join('');

    const filterBar = `
      <div class="filters">
        <div class="filter">
          <label for="fOrg">来源</label>
          <select id="fOrg">${orgOptions}</select>
        </div>
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="标题/摘要/标签" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fo = $('#fOrg').value;
      const fq = $('#fQ').value.trim();

      let rows = data.slice();
      if (fo) rows = rows.filter(x => x.orgCN === fo);
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.titleCN || '').toLowerCase().includes(fql) ||
          (x.titleEN || '').toLowerCase().includes(fql) ||
          (x.summaryCN || '').toLowerCase().includes(fql) ||
          (x.tags || []).join(' ').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => {
        const src = getSource(x.sourceId);
        return `
          <tr>
            <td>
              <a href="${withRoot('pages/research/detail.html?id=' + encodeURIComponent(x.id))}">${escapeHtml(x.titleCN)}</a>
              <div class="sub">${escapeHtml(x.titleEN || '')}</div>
            </td>
            <td>${escapeHtml(x.orgCN || '-')}</td>
            <td>${escapeHtml(x.date || x.year || '-')}</td>
            <td>${tagsToBadges(x.tags)}</td>
            <td>${renderFavBtn(x.id)} ${src ? `<a class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">来源</a>` : ''}</td>
          </tr>
        `;
      }).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable(['标题','来源','时间','标签','操作'], rowsHtml) : renderEmpty('未检索到符合条件的条目');
      attachFavHandler($('#listArea'));
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;
    applyFilters();
    $('#btnApply').addEventListener('click', applyFilters);
    $('#fQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  };

  const renderResearchDetail = () => {
    const id = getParam('id');
    const record = findRecordById(id);

    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '专题研究', href: 'pages/research/index.html' },
      { text: '条目详情' }
    ]);

    if (!record) {
      setPageHead({ title: '条目不存在', desc: '未找到对应记录。' });
      $('#pageContent').innerHTML = renderEmpty('未找到该条目');
      return;
    }

    const src = getSource(record.sourceId);

    setPageHead({
      title: record.titleCN,
      desc: record.titleEN || '',
      actionsHtml: `${renderFavBtn(record.id)} ${src ? `<a class="btn btn-outline" target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">打开来源</a>` : ''}`
    });

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="kv">
            <div class="k">来源</div><div class="v">${escapeHtml(record.orgCN || '-')}</div>
            <div class="k">时间</div><div class="v">${escapeHtml(record.date || record.year || '-')}</div>
            <div class="k">标签</div><div class="v">${tagsToBadges(record.tags)}</div>
            <div class="k">链接</div><div class="v source-link">${src ? `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.name)}</a>` : '-'}</div>
          </div>
          <div class="hr"></div>
          <div class="card-title">中文摘要</div>
          <p class="m0">${escapeHtml(record.summaryCN || '—')}</p>
          ${record.keyPointsCN && record.keyPointsCN.length ? `
            <div class="mt12">
              <div class="card-title">要点</div>
              <ul class="ul">${record.keyPointsCN.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
            </div>
          ` : ''}
        </div>
      </section>
    `;

    attachFavHandler($('#pageContent'));
  };

  const renderSearch = () => {
    const tab = getParam('tab') || 'search';
    const q = (getParam('q') || '').trim();

    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '全库检索' }]);

    setPageHead({
      title: tab === 'fav' ? '收藏夹' : (tab === 'export' ? '导出与接口' : '全库检索'),
      desc: tab === 'fav'
        ? '浏览器本地收藏（不会上传）。'
        : (tab === 'export' ? '导出说明：列表页支持CSV导出；可在后续版本扩展JSON/API。' : '跨库检索：标题/摘要/标签/参与方。')
    });

    if (tab === 'export') {
      $('#pageContent').innerHTML = `
        <section class="card">
          <div class="card-body">
            <div class="card-title">导出能力</div>
            <ul class="ul">
              <li>合作文件库/法规库/机构库列表页：提供“导出CSV”按钮。</li>
              <li>本示范站为静态原型：未实现后端API；可按项目方案在数据库层提供REST接口与权限控制。</li>
              <li>建议接口字段：id、标题（CN/EN）、法域、类型、日期、摘要、标签、来源链接、附件元数据、更新时间、密级/可见范围等。</li>
            </ul>
          </div>
        </section>
      `;
      return;
    }

    if (tab === 'fav') {
      const favs = loadFavs();
      const recs = favs.map(findRecordById).filter(Boolean);

      const rowsHtml = recs.map(r => {
        const link = recordLink(r);
        const src = getSource(r.sourceId);
        const title = r.titleCN || r.nameCN;
        const sub = r.titleEN || r.nameEN || '';
        return `
          <tr>
            <td>
              <a href="${escapeHtml(link)}">${escapeHtml(title)}</a>
              <div class="sub">${escapeHtml(sub)}</div>
            </td>
            <td>${escapeHtml(moduleNameCN(r._module))}</td>
            <td>${escapeHtml((r.jurisdiction ? getJurName(r.jurisdiction) : (r.jurisdictions||[]).map(getJurName).join(' / ')) || '-')}</td>
            <td>${src ? `<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(src.url)}">来源</a>` : '-'}</td>
            <td>${renderFavBtn(r.id)}</td>
          </tr>
        `;
      }).join('');

      $('#pageContent').innerHTML = `
        <section class="card">
          <div class="card-body">
            <div class="card-title">已收藏条目</div>
            ${rowsHtml ? renderTable(['标题','栏目','法域','来源','操作'], rowsHtml) : renderEmpty('暂无收藏。可在详情页点击“收藏”。')}
          </div>
        </section>
      `;

      attachFavHandler($('#pageContent'));
      return;
    }

    // search tab
    const inputBar = `
      <section class="card">
        <div class="card-body">
          <div class="filters" style="margin:0">
            <div class="filter" style="flex:1">
              <label for="sQ">关键词</label>
              <input id="sQ" type="search" placeholder="示例：Google / merger / OECD / cooperation" value="${escapeHtml(q)}" />
            </div>
            <div class="filter" style="align-self:end">
              <button class="btn btn-primary" id="btnSearch" type="button">检索</button>
              <a class="btn btn-outline" href="${withRoot('pages/search/index.html?tab=fav')}">收藏夹</a>
            </div>
          </div>
          <div class="note">提示：当前示范站为前端静态检索；实际项目可接入全文索引（ES/OpenSearch等）与权限控制。</div>
        </div>
      </section>
      <div id="searchResults" class="mt12"></div>
    `;

    $('#pageContent').innerHTML = inputBar;

    const doSearch = () => {
      const query = ($('#sQ').value || '').trim();
      if (!query) {
        $('#searchResults').innerHTML = renderEmpty('请输入关键词');
        return;
      }

      const ql = query.toLowerCase();
      const recs = allRecords().filter(r => {
        const text = [
          r.titleCN, r.titleEN, r.nameCN, r.nameEN, r.summaryCN,
          (r.tags || []).join(' '), (r.parties || []).join(' ')
        ].join(' ').toLowerCase();
        return text.includes(ql);
      });

      // Group by module
      const groups = {};
      recs.forEach(r => {
        groups[r._module] = groups[r._module] || [];
        groups[r._module].push(r);
      });

      const sections = Object.keys(groups).sort().map(m => {
        const items = groups[m].slice(0, 30).map(r => {
          const title = r.titleCN || r.nameCN;
          const sub = r.titleEN || r.nameEN || '';
          return `
            <div class="list-item">
              <div class="li-main">
                <div class="li-title"><a href="${escapeHtml(recordLink(r))}">${escapeHtml(title)}</a></div>
                <div class="li-sub">${escapeHtml(moduleNameCN(r._module))} · ${escapeHtml(sub)}</div>
              </div>
              <div class="li-side">${renderFavBtn(r.id)}</div>
            </div>
          `;
        }).join('');

        return `
          <section class="card mt12">
            <div class="card-body">
              <div class="card-title">${escapeHtml(moduleNameCN(m))}（${groups[m].length}）</div>
              <div class="list">${items}</div>
            </div>
          </section>
        `;
      }).join('');

      $('#searchResults').innerHTML = sections || renderEmpty('未检索到结果');
      attachFavHandler($('#searchResults'));
    };

    $('#btnSearch').addEventListener('click', doSearch);
    $('#sQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); doSearch(); }});

    // auto run if query present
    if (q) doSearch();
  };

  const renderAbout = () => {
    setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '关于' }]);
    setPageHead({
      title: '关于本示范站',
      desc: '展示“反垄断国际交流合作数据库模块”的信息架构与前端呈现方式（不含后端/权限/流程）。'
    });

    const sources = (AICDB.sources || []).map(s => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)}</a></li>`).join('');

    $('#pageContent').innerHTML = `
      <section class="card">
        <div class="card-body">
          <div class="card-title">建设目标与范围（对齐需求）</div>
          <ul class="ul">
            <li>数据库模块内容、架构与功能：栏目化管理、多维检索、详情呈现、可视化与导出。</li>
            <li>双边合作文件、自贸协定竞争章节、多边机制文件：整理归纳、要点提炼、链接与附件元数据。</li>
            <li>域外主要司法辖区反垄断法律法规：搜集、整理与（摘要级）翻译展示。</li>
            <li>域外执法机构与国际组织：机构概况、合作机制与常用资源入口。</li>
            <li>政策动态、研究报告与重大案例：按主题/法域分类，支持重点标记与时间线。</li>
          </ul>
          <div class="hr"></div>
          <div class="card-title">数据来源（本示范站已配置）</div>
          <ul class="ul">${sources}</ul>
          <div class="notice mt12">
            <b>版权提示：</b>本示范站仅展示条目元数据、摘要与要点，不复制外部网站受版权保护的全文内容；正文请以“来源链接”访问官方发布页。
          </div>
        </div>
      </section>

      <section class="grid grid-2 mt20">
        <div class="card">
          <div class="card-body">
            <div class="card-title">部署方式</div>
            <ul class="ul">
              <li>本项目为纯静态站点：直接放置到Web服务器即可访问。</li>
              <li>如需直接本地打开：建议使用浏览器打开 <code>index.html</code>；无需数据库。</li>
              <li>后续接入：可将 <code>data.js</code> 替换为后端API，前端保持不变。</li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="card-title">常见扩展点</div>
            <ul class="ul">
              <li>全文检索：ES/OpenSearch；支持分词、同义词、权重与高亮。</li>
              <li>权限与分级：按用户角色、密级、来源可见性控制。</li>
              <li>资料入库流程：采集—翻译—审核—发布—更新—归档。</li>
              <li>数据质量：去重、来源校验、版本比对、变更日志。</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="card mt20">
        <div class="card-body">
          <div class="card-title">术语表</div>
          <p class="m0">术语表用于统一中英文概念口径，建议与检索同义词库联动。</p>
          <div class="mt12"><a class="btn btn-primary" href="${withRoot('pages/about/glossary.html')}">进入术语表</a></div>
        </div>
      </section>
    `;
  };

  const renderGlossary = () => {
    setBreadcrumbs([
      { text: '首页', href: 'index.html' },
      { text: '关于', href: 'pages/about/index.html' },
      { text: '术语表' }
    ]);

    setPageHead({
      title: '术语表（示例）',
      desc: '用于统一检索词与中英文概念口径；可扩展为同义词/缩略语库。'
    });

    const data = AICDB.datasets.glossary || [];

    const q = getParam('q');

    const filterBar = `
      <div class="filters">
        <div class="filter" style="flex:1">
          <label for="fQ">关键词</label>
          <input id="fQ" type="search" placeholder="如：market / cartel / dominance" value="${escapeHtml(q || '')}" />
        </div>
        <div class="filter" style="align-self:end">
          <button class="btn btn-primary" id="btnApply" type="button">应用</button>
        </div>
      </div>
    `;

    const applyFilters = () => {
      const fq = ($('#fQ').value || '').trim();
      let rows = data.slice();
      if (fq) {
        const fql = fq.toLowerCase();
        rows = rows.filter(x =>
          (x.termCN || '').toLowerCase().includes(fql) ||
          (x.termEN || '').toLowerCase().includes(fql) ||
          (x.defCN || '').toLowerCase().includes(fql)
        );
      }

      const rowsHtml = rows.map(x => `
        <tr>
          <td>${escapeHtml(x.termCN)}</td>
          <td>${escapeHtml(x.termEN)}</td>
          <td>${escapeHtml(x.defCN)}</td>
        </tr>
      `).join('');

      $('#listArea').innerHTML = rowsHtml ? renderTable(['中文','英文','释义（中文）'], rowsHtml) : renderEmpty('未检索到结果');
    };

    $('#pageContent').innerHTML = filterBar + `<div id="listArea" class="mt12"></div>`;
    applyFilters();
    $('#btnApply').addEventListener('click', applyFilters);
    $('#fQ').addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); applyFilters(); }});
  };



  const markActiveNav = () => {
    const links = $$('.nav-link');
    if (!links.length) return;

    // Determine active section by current URL (works for http(s) and file://)
    const href = (window.location.href || '').split('#')[0];

    const isIn = (seg) => href.includes(seg);

    let suffix = 'index.html';
    if (isIn('/pages/cooperation/')) suffix = 'pages/cooperation/index.html';
    else if (isIn('/pages/laws/')) suffix = 'pages/laws/index.html';
    else if (isIn('/pages/agencies/')) suffix = 'pages/agencies/index.html';
    else if (isIn('/pages/dynamics/')) suffix = 'pages/dynamics/index.html';
    else if (isIn('/pages/cases/')) suffix = 'pages/cases/index.html';
    else if (isIn('/pages/analysis/')) suffix = 'pages/analysis/index.html';
    else if (isIn('/pages/research/')) suffix = 'pages/research/index.html';
    else if (isIn('/pages/about/')) suffix = 'pages/about/index.html';

    // Clear and set
    links.forEach(a => a.classList.remove('active'));
    const target = links.find(a => (a.getAttribute('href') || '').endsWith(suffix));
    if (target) target.classList.add('active');
  };
  // ------------------------------
  // Router
  // ------------------------------

  const route = () => {
    renderHeader();
    markActiveNav();
    renderFooter();

    const page = document.body.getAttribute('data-page') || '';

    switch (page) {
      case 'home': return renderHome();

      case 'cooperation-index': return renderCooperationIndex();
      case 'cooperation-mou': return renderCooperationList('mou');
      case 'cooperation-fta': return renderCooperationList('fta');
      case 'cooperation-multilateral': return renderCooperationList('multilateral');
      case 'cooperation-detail': return renderCooperationDetail();

      case 'laws-index': return renderLawsIndex();
      case 'laws-list': return renderLawsList();
      case 'laws-detail': return renderLawsDetail();

      case 'agencies-index': return renderAgenciesIndex();
      case 'agencies-authorities': return renderAgenciesList('authorities');
      case 'agencies-organizations': return renderAgenciesList('organizations');
      case 'agencies-detail': return renderAgenciesDetail();

      case 'dynamics-index': return renderDynamicsIndex();
      case 'dynamics-detail': return renderDynamicsDetail();

      case 'cases-index': return renderCasesIndex();
      case 'cases-detail': return renderCasesDetail();

      case 'analysis-index': return renderAnalysisIndex();
      case 'analysis-network': return renderAnalysisNetwork();

      case 'research-index': return renderResearchIndex();
      case 'research-detail': return renderResearchDetail();

      case 'search-index': return renderSearch();

      case 'about-index': return renderAbout();
      case 'about-glossary': return renderGlossary();

      default:
        setBreadcrumbs([{ text: '首页', href: 'index.html' }, { text: '页面' }]);
        setPageHead({ title: '页面未配置', desc: '该页面的 data-page 尚未配置或拼写错误。' });
        $('#pageContent').innerHTML = renderEmpty('未配置页面渲染器');
        return;
    }
  };

  // Kickoff
  document.addEventListener('DOMContentLoaded', route);

})();
