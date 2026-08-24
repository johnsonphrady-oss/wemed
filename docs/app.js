/* ===== 模擬資料 ===== */

const recentDocs = [
  { name: '製程管制程序書', version: 'v3.2', date: '2026-08-20', summary: '更新第 4.2 節取樣頻率規定，由每班次改為每 2 小時。' },
  { name: '供應商評鑑準則', version: 'v2.0', date: '2026-08-15', summary: '新增環境面評分項目，權重調整為 20%。' },
  { name: '不合格品管制程序', version: 'v1.5', date: '2026-08-10', summary: '增訂第 5 節緊急放行審查流程。' },
  { name: '內部稽核作業程序', version: 'v4.0', date: '2026-07-28', summary: '配合組織重組，更新稽核小組成員職稱。' },
  { name: '量測設備管理辦法', version: 'v2.3', date: '2026-07-20', summary: '校正週期由 12 個月縮短為 6 個月。' }
];

const auditIssues = [
  { id: 'NC-2026-001', desc: '量測設備校正記錄不完整', status: '處理中', owner: '王小明', dueDate: '2026-09-15' },
  { id: 'NC-2026-002', desc: '供應商評鑑未依程序執行', status: '處理中', owner: '李大華', dueDate: '2026-09-30' },
  { id: 'NC-2026-003', desc: '不合格品標識貼附位置錯誤', status: '已結案', owner: '陳美玲', dueDate: '2026-08-01' },
  { id: 'NC-2026-004', desc: '文件版本未及時更新發行', status: '處理中', owner: '張志遠', dueDate: '2026-10-05' },
  { id: 'NC-2026-005', desc: '人員教育訓練記錄缺漏', status: '已結案', owner: '林雅婷', dueDate: '2026-07-31' }
];

const versionDiffs = [
  { name: '製程管制程序書', oldVer: 'v3.1', newVer: 'v3.2', diff: '第 4.2 節：取樣頻率由「每班次一次」改為「每 2 小時一次」；新增附件三取樣記錄表格式。' },
  { name: '供應商評鑑準則', oldVer: 'v1.0', newVer: 'v2.0', diff: '評分架構新增「環境與永續」面向，佔比 20%；原「交期」面向佔比由 30% 調整為 20%。' },
  { name: '不合格品管制程序', oldVer: 'v1.4', newVer: 'v1.5', diff: '第 5 節新增「緊急放行審查」子程序，明定審查授權層級與記錄要求。' },
  { name: '內部稽核作業程序', oldVer: 'v3.2', newVer: 'v4.0', diff: '全文更新稽核小組職稱（品管課長改為品質管理師）；稽核頻率由每年 1 次改為每年 2 次。' },
  { name: '量測設備管理辦法', oldVer: 'v2.2', newVer: 'v2.3', diff: '第 3.1 節：A 類設備校正週期由 12 個月縮短為 6 個月；新增逾期校正通知流程。' }
];

const quizItems = [
  {
    question: '依製程管制程序書 v3.2，A 線取樣頻率為何？',
    docName: '製程管制程序書',
    options: ['每小時', '每 2 小時', '每班次', '每日'],
    answer: '每 2 小時'
  },
  {
    question: '供應商評鑑準則中「環境與永續」面向佔比為何？',
    docName: '供應商評鑑準則',
    options: ['10%', '15%', '20%', '30%'],
    answer: '20%'
  },
  {
    question: '不合格品緊急放行須經哪個程序審查？',
    docName: '不合格品管制程序',
    options: ['一般放行程序', '緊急放行審查', '客戶特採', '主管口頭核准'],
    answer: '緊急放行審查'
  },
  {
    question: '依內部稽核作業程序 v4.0，內部稽核每年執行幾次？',
    docName: '內部稽核作業程序',
    options: ['1 次', '2 次', '3 次', '4 次'],
    answer: '2 次'
  },
  {
    question: '量測設備管理辦法中，A 類設備校正週期為何？',
    docName: '量測設備管理辦法',
    options: ['3 個月', '6 個月', '12 個月', '24 個月'],
    answer: '6 個月'
  }
];

/* ===== 工具：切換展開 ===== */
function toggleOpen(li) {
  li.classList.toggle('open');
}

/* ===== 渲染：近期更新文件 ===== */
function renderRecentDocs() {
  var ul = document.querySelector('#recent-docs ul');
  recentDocs.forEach(function(doc) {
    var li = document.createElement('li');
    li.innerHTML =
      '<div class="summary">' +
        '<span class="title">' + doc.name + '</span>' +
        '<span class="meta">' + doc.version + '　' + doc.date + '</span>' +
      '</div>' +
      '<div class="detail">' + doc.summary + '</div>';
    li.addEventListener('click', function() { toggleOpen(li); });
    ul.appendChild(li);
  });
}

/* ===== 渲染：稽核缺失修改 ===== */
function renderAuditIssues() {
  var ul = document.querySelector('#audit-issues ul');
  auditIssues.forEach(function(issue) {
    var badgeClass = issue.status === '處理中' ? 'processing' : 'closed';
    var li = document.createElement('li');
    li.innerHTML =
      '<div class="summary">' +
        '<span class="title">[' + issue.id + '] ' + issue.desc + '</span>' +
        '<span class="badge ' + badgeClass + '">' + issue.status + '</span>' +
      '</div>' +
      '<div class="detail">負責人：' + issue.owner + '　預計完成：' + issue.dueDate + '</div>';
    li.addEventListener('click', function() { toggleOpen(li); });
    ul.appendChild(li);
  });
}

/* ===== 渲染：版本更新差異 ===== */
function renderVersionDiffs() {
  var ul = document.querySelector('#version-diff ul');
  versionDiffs.forEach(function(item) {
    var li = document.createElement('li');
    li.innerHTML =
      '<div class="summary">' +
        '<span class="title">' + item.name + '</span>' +
        '<span class="meta">' + item.oldVer + ' → ' + item.newVer + '</span>' +
      '</div>' +
      '<div class="detail">' + item.diff + '</div>';
    li.addEventListener('click', function() { toggleOpen(li); });
    ul.appendChild(li);
  });
}

/* ===== 渲染：考題 ===== */
function renderQuiz() {
  var ul = document.querySelector('#quiz ul');
  quizItems.forEach(function(item) {
    var optionsHtml = item.options.map(function(opt) {
      var mark = opt === item.answer ? '　✓' : '';
      return '<span style="display:block">' + opt + mark + '</span>';
    }).join('');
    var li = document.createElement('li');
    li.innerHTML =
      '<div class="summary">' +
        '<span class="title">' + item.question + '</span>' +
        '<span class="meta">' + item.docName + '</span>' +
      '</div>' +
      '<div class="detail">' + optionsHtml + '</div>';
    li.addEventListener('click', function() { toggleOpen(li); });
    ul.appendChild(li);
  });
}

/* ===== 初始化 ===== */
renderRecentDocs();
renderAuditIssues();
renderVersionDiffs();
renderQuiz();
