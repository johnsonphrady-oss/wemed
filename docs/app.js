/* ===== 模擬資料：文件版本總覽 ===== */
const versionOverview = [
  { id: 'iMET-SOP01', name: 'iMET 產品組裝作業標準書（SOP）', version: 'V3.1', date: '2026-08-20', status: '現行' },
  { id: 'iMET-SOP02', name: 'iMET 產品包裝作業標準書（SOP）', version: 'V1.1', date: '2026-07-15', status: '現行' },
  { id: 'iMET-SOP03', name: 'iMET 產品安裝作業標準書（SOP）', version: 'V1.1', date: '2026-07-15', status: '現行' },
  { id: 'iMET-SOP04', name: 'iMET 產品服務作業標準書（SOP）', version: 'V1.1', date: '2026-07-10', status: '現行' },
  { id: 'iMET-SOP05', name: 'iMET 產品儲存作業標準書（SOP）', version: 'V1.1', date: '2026-06-30', status: '現行' },
  { id: 'iMET-SOP06', name: 'iMET 產品搬運作業標準書（SOP）', version: 'V1.1', date: '2026-06-30', status: '現行' },
  { id: 'iMET-SOP07', name: 'iMET 產品運銷作業標準書（SOP）', version: 'V1.1', date: '2026-06-28', status: '審查中' },
  { id: 'iMET-QP01',  name: '製程管制程序書',                  version: 'V3.2', date: '2026-08-20', status: '現行' },
  { id: 'iMET-QP02',  name: '供應商評鑑準則',                  version: 'V2.0', date: '2026-08-15', status: '現行' },
  { id: 'iMET-QP03',  name: '不合格品管制程序',                version: 'V1.5', date: '2026-08-10', status: '現行' },
  { id: 'iMET-QP04',  name: '內部稽核作業程序',                version: 'V4.0', date: '2026-07-28', status: '現行' },
  { id: 'iMET-QP05',  name: '量測設備管理辦法',                version: 'V2.3', date: '2026-07-20', status: '現行' }
];

/* ===== 渲染：文件版本總覽表 ===== */
function renderVersionOverview() {
  var tbody = document.querySelector('#version-table tbody');
  versionOverview.forEach(function(doc) {
    var statusClass = doc.status === '審查中' ? 'status-review' : 'status-active';
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + doc.id + '</td>' +
      '<td>' + doc.name + '</td>' +
      '<td><span class="ver-badge">' + doc.version + '</span></td>' +
      '<td>' + doc.date + '</td>' +
      '<td><span class="' + statusClass + '">' + doc.status + '</span></td>' +
      '<td><button class="btn-rev" data-id="' + doc.id + '">製修訂</button></td>';
    tbody.appendChild(tr);
  });

  /* 製修訂按鈕點擊 */
  tbody.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-rev')) {
      var id = e.target.getAttribute('data-id');
      var doc = versionOverview.find(function(d) { return d.id === id; });
      if (doc) openRevModal(doc);
    }
  });
}

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
  var sorted = recentDocs.slice().sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });
  sorted.forEach(function(doc) {
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
renderVersionOverview();
renderRecentDocs();
renderAuditIssues();
renderVersionDiffs();
renderQuiz();

/* ===== 製修訂 Modal ===== */
(function () {
  var overlay  = document.getElementById('rev-overlay');
  var closeBtn = document.getElementById('rev-close');
  var form     = document.getElementById('rev-form');
  var preview  = document.getElementById('rev-preview');
  var previewContent = document.getElementById('rev-preview-content');

  function openRevModal(doc) {
    document.getElementById('rev-doc-id').value   = doc.id;
    document.getElementById('rev-doc-name').value = doc.name;
    document.getElementById('rev-old-ver').value  = doc.version;
    document.getElementById('rev-new-ver').value  = '';
    document.getElementById('rev-date').value     = new Date().toISOString().slice(0, 10);
    document.getElementById('rev-reason').value   = '';
    document.getElementById('rev-summary').value  = '';
    document.getElementById('rev-author').value   = '';
    document.getElementById('rev-reviewer').value = '';
    document.getElementById('rev-approver').value = '';
    form.style.display    = '';
    preview.style.display = 'none';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.getElementById('rev-new-ver').focus();
  }

  /* 關閉 */
  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });

  /* 取得表單值 */
  function getFormData() {
    return {
      id:       document.getElementById('rev-doc-id').value,
      name:     document.getElementById('rev-doc-name').value,
      oldVer:   document.getElementById('rev-old-ver').value,
      newVer:   document.getElementById('rev-new-ver').value || '（未填）',
      date:     document.getElementById('rev-date').value,
      reason:   document.getElementById('rev-reason').value || '（未填）',
      summary:  document.getElementById('rev-summary').value || '（未填）',
      author:   document.getElementById('rev-author').value || '（未填）',
      reviewer: document.getElementById('rev-reviewer').value || '（未填）',
      approver: document.getElementById('rev-approver').value || '（未填）'
    };
  }

  /* 即時預覽 */
  document.getElementById('rev-preview-btn').addEventListener('click', function() {
    var d = getFormData();
    previewContent.innerHTML =
      '<h3>文件製修訂申請表</h3>' +
      '<table class="preview-table">' +
        '<tr><td>文件編號</td><td>' + d.id + '</td></tr>' +
        '<tr><td>文件名稱</td><td>' + d.name + '</td></tr>' +
        '<tr><td>現行版次</td><td>' + d.oldVer + '</td></tr>' +
        '<tr><td>修訂後版次</td><td>' + d.newVer + '</td></tr>' +
        '<tr><td>修訂日期</td><td>' + d.date + '</td></tr>' +
        '<tr><td>修訂原因</td><td>' + d.reason + '</td></tr>' +
        '<tr><td>修訂內容摘要</td><td>' + d.summary + '</td></tr>' +
      '</table>' +
      '<div class="preview-sign">' +
        '<div class="preview-sign-box"><div class="label">修訂者</div><div class="value">' + d.author + '</div></div>' +
        '<div class="preview-sign-box"><div class="label">審核者</div><div class="value">' + d.reviewer + '</div></div>' +
        '<div class="preview-sign-box"><div class="label">核准者</div><div class="value">' + d.approver + '</div></div>' +
      '</div>';
    form.style.display    = 'none';
    preview.style.display = '';
  });

  /* 返回編輯 */
  document.getElementById('rev-back-btn').addEventListener('click', function() {
    form.style.display    = '';
    preview.style.display = 'none';
  });

  /* 下載 Word */
  document.getElementById('rev-word-btn').addEventListener('click', function() {
    var d = getFormData();
    var html =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
             'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
             'xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="UTF-8">' +
      '<style>' +
        'body{font-family:"微軟正黑體",Arial,sans-serif;font-size:12pt;margin:2cm;}' +
        'h2{text-align:center;color:#1d4ed8;margin-bottom:16pt;}' +
        'table{width:100%;border-collapse:collapse;margin-bottom:12pt;}' +
        'td{border:1px solid #999;padding:6pt 8pt;font-size:11pt;vertical-align:top;}' +
        'td:first-child{background:#f1f5f9;font-weight:bold;width:30%;white-space:nowrap;}' +
        '.sign-row td{text-align:center;height:40pt;}' +
      '</style></head><body>' +
      '<h2>文件製修訂申請表</h2>' +
      '<table>' +
        '<tr><td>文件編號</td><td>' + d.id + '</td></tr>' +
        '<tr><td>文件名稱</td><td>' + d.name + '</td></tr>' +
        '<tr><td>現行版次</td><td>' + d.oldVer + '</td></tr>' +
        '<tr><td>修訂後版次</td><td>' + d.newVer + '</td></tr>' +
        '<tr><td>修訂日期</td><td>' + d.date + '</td></tr>' +
        '<tr><td>修訂原因</td><td>' + d.reason + '</td></tr>' +
        '<tr><td>修訂內容摘要</td><td>' + d.summary + '</td></tr>' +
      '</table>' +
      '<table>' +
        '<tr><td>修訂者</td><td>審核者</td><td>核准者</td></tr>' +
        '<tr class="sign-row"><td>' + d.author + '</td><td>' + d.reviewer + '</td><td>' + d.approver + '</td></tr>' +
      '</table>' +
      '</body></html>';

    var blob = new Blob(['\ufeff' + html], { type: 'application/msword;charset=utf-8' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href     = url;
    a.download = d.id + '_製修訂申請表_' + d.date + '.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  /* 掛載給 renderVersionOverview 使用 */
  window.openRevModal = openRevModal;
}());
(function () {
  var fab = document.getElementById('chat-fab');
  var panel = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');
  var fileInput = document.getElementById('chat-file');
  var messages = document.getElementById('chat-messages');

  /* 模擬系統回覆 */
  var autoReplies = [
    '已收到，資料寫入成功。',
    '已記錄，稍後將由相關人員處理。',
    '檔案已上傳，系統正在處理中。',
    '謝謝您的回報，資料已存入資料庫。',
    '已完成登錄，您可繼續輸入下一筆。'
  ];
  var replyIndex = 0;

  function addMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + type;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    input.value = '';
    /* 模擬系統延遲回覆 */
    setTimeout(function () {
      addMessage(autoReplies[replyIndex % autoReplies.length], 'system');
      replyIndex++;
    }, 600);
  }

  /* 開關面板 */
  fab.addEventListener('click', function () {
    var isOpen = panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) input.focus();
  });

  closeBtn.addEventListener('click', function () {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });

  /* 送出訊息 */
  sendBtn.addEventListener('click', function () {
    sendMessage(input.value);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  /* 上傳檔案 */
  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    if (!file) return;
    addMessage('📄 已上傳：' + file.name, 'user');
    fileInput.value = '';
    setTimeout(function () {
      addMessage('檔案「' + file.name + '」已收到，資料寫入成功。', 'system');
    }, 600);
  });

  /* 初始歡迎訊息 */
  addMessage('您好！請輸入訊息或上傳檔案，資料將寫入系統。', 'system');
}());
