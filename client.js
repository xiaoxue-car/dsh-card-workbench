// cache-bust 2026-10-29 account-menu
window.__ModuleLoader__.load({
  id: 'dsh-card-workbench',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const NS = 'butler'
    const API = '/dsh-butler/api'
    const HEADERS = { 'x-dsh-butler': '1' }

    const zh = {
      panelTitle: '卡片工坊',
      kicker: 'CARD WORKBENCH',
      heading: '卡片工坊',
      sub: '你只交办。拆卡、盯进度、处理卡顿、逐张核对，都由管家完成。',
      intake: '交办工作',
      placeholder:
        '把整件事贴进来：目标、范围、验收标准、参考文件……\n例如：为一个 Web 应用增加用户注册流程，包含数据模型、接口、页面和测试。',
      workdir: '工作目录',
      chooseWorkspaceHint: '请选择工作区文件夹',
      chooseWorkspaceFirst: '请先选择要交办的工作区文件夹',
      chooseFolder: '选择文件夹',
      start: '拆解开工',
      starting: '管家拆解中…',
      refresh: '刷新',
      refreshing: '刷新中…',
      refreshed: '已刷新',
      cleared: '已清理 {n} 个已结束工作',
      confirmClearFinished: '确认清理所有已结束的工作和对话组？此操作不会删除原会话。',
      nothingToClear: '没有可清理的已结束工作',
      clear: '清理已结束',
      emptyTitle: '还没有交办的工作',
      emptyBody: '把一件完整的事交给卡片工坊，或直接在工作对话里发请求；它会自动接手、拆成卡片并盯到完成。',
      howTitle: '管家怎么干活',
      how1: '拆卡',
      how1d: '交办拆卡；接管的对话按轮次自动成卡',
      how2: '盯办',
      how2d: '同时盯多个对话，卡住自动催办或中断续跑',
      how3: '核对',
      how3d: '完成即核对，缺口回到原对话继续做',
      progress: '{done}/{total} 张完成',
      runningNow: '{n} 张正在盯',
      liveStalled: '{running} 张在盯 · {stalled} 张卡顿处理中',
      ready: '待命中',
      gapRounds: '补卡 {n} 轮',
      openSession: '打开会话',
      retry: '重试',
      verify: '核对',
      skip: '跳过',
      pause: '暂停',
      resume: '继续',
      remove: '删除',
      confirmDelete: '删除这项工作？执行会话不会被删除。',
      log: '管家日志',
      acceptance: '验收',
      result: '交付',
      gaps: '缺口',
      attempts: '派单 {n}',
      tools: '工具 {n}',
      lastTool: '最近工具',
      noActivity: '暂无进展',
      error: '出错了',
      loading: '正在连接管家…',
      storage: '数据文件',
      serviceDown: '管家服务未响应',
      brief: '交办原文',
      summary: '终审结论',
      createdAt: '创建于',
      permissions: '交办执行会话自动开到最高权限；接管的对话保持原有权限。',
      kindBrief: '交办',
      kindSession: '对话组',
      groupsCount: '{n} 个对话组',
      sessionsTitle: '可接管的工作对话',
      sessionsHint: '接管后，这段对话的每一轮都会变成卡片；管家盯进度、催办、核对，不改变对话权限。',
      adopt: '接管',
      adopted: '已接管',
      adoptRecent: '接管最近对话',
      adoptWorkspace: '接管本工作区',
      adoptAll: '接管全部对话',
      pendingAdopt: '{n} 个待接管',
      stateEmpty: '待开始',
      stateRunning: '执行中 {done}/{total}',
      stateDone: '全部完成 {done}/{total}',
      stateFailed: '{n} 项失败',
      statePaused: '已暂停',
      needsUserShort: '需要你操作',
      needsUserCount: '{n} 项等待你操作',
      needsQuestion: '等待你的回答',
      needsApproval: '等待权限确认',
      openToAct: '打开对话处理',
      taskTimeline: '任务时间轴',
      taskSummary: '任务摘要',
      workspace: '工作区',
      historyWorkspaces: '历史工作区',
      historyHint: '超过 1 天没有使用的工作区会自动收进这里',
      workspaceGroups: '{n} 组',
      workspaceNodes: '{n} 节点',
      unknownWorkspace: '未指定工作区',
      timelineCollapsed: '时间轴已收起 · {n} 个节点',
      cardChat: '卡片对话',
      groupChat: '直接对话',
      groupChatPlaceholder: '不选任务节点，直接和这个对话组说…',
      groupChatWaiting: '等待回复…',
      collapseGroup: '收起对话组',
      expandGroup: '展开对话组',
      model: '模型',
      mode: '模式',
      modeStandard: '标准模式',
      modePtc: 'PTC 模式',
      modeMinimal: '精简模式',
      modeCreative: '创造模式',
      reasoning: '推理',
      permission: '权限',
      permissionReadOnly: '只读',
      dependencyLabel: '依赖',
      priorityLabel: '优先级',
      blockedLabel: '阻塞原因',
      permissionWorkspaceWrite: '工作区可写',
      permissionFullAccess: '最高权限',
      permissionCustom: '自定义',
      management: '管理',
      managementMenu: '管理菜单',
      managementHint: '鼠标悬浮展开侧栏功能',
      managementNew: '新建对话',
      managementSettings: '设置',
      managementButler: '卡片工坊',
      managementConversation: '对话',
      managementNoPanels: '暂无面板',
      account: '账号',
      accountCurrent: '当前账号',
      accountFeedback: '意见反馈',
      accountSignOut: '退出登录',
      accountSignIn: '登录',
      accountUpdate: '更新软件',
      accountAvailable: '有新版本',
      defaultReasoning: '默认',
      modelUnavailable: '模型目录加载中…',
      allowOnce: '允许一次',
      deny: '拒绝',
      submitAnswer: '提交选择',
      customAnswer: '也可以直接输入回答…',
      chatPlaceholder: '在这张卡里继续对话…',
      chatEmpty: '还没有卡片内对话，直接输入即可。',
      chatYou: '你',
      chatAssistant: '助手',
      send: '发送',
      sessionsToggleHint: '点击展开可接管列表',
      timelineCount: '{n} 个节点',
      expandAll: '全部展开',
      collapseAll: '收起全部',
      metricDone: '完成',
      metricRunning: '进行中',
      metricFailed: '失败',
      metricWaiting: '待操作',
      goal: '任务内容',
      revisionNote: '返工记录',
      revise: '重新对话',
      revisePlaceholder: '说明哪里不满意、希望怎么改…',
      reviseSubmit: '提交返工',
      reviseCancel: '取消',
      reviseQueued: '返工已提交',
      sessionsOpen: '展开列表',
      sessionsClose: '收起列表',
      adoptedBadge: '已接管',
      unadoptedBadge: '未接管',
      groupDoneBadge: '已完成',
      groupRunningBadge: '执行中',
      groupFailedBadge: '有失败',
      groupPausedBadge: '已暂停',
      liveBadge: '对话进行中',
      noCards: '暂无任务节点',
      nudge: '催办',
      openConversation: '打开对话',
      moveOut: '移出管家',
      settingsTitle: '管家设置',
      autoAdopt: '自动接管对话',
      autoJump: '新对话自动跳转',
      autoVerify: '对话完成自动核对',
      autoNudge: '卡顿自动催办',
      filterAll: '全部',
      filterBrief: '交办',
      viewTimeline: '时间轴',
      viewBoard: '看板',
      boardPending: '待处理',
      boardRunning: '进行中',
      boardVerifying: '待核对',
      boardDone: '已完成',
      boardBlocked: '阻塞',
      boardEmpty: '暂无卡片',
      current: '当前',
      sessionRunning: '进行中',
      noSessions: '当前没有可接管的工作对话',
      imported: '历史导入',
      turnOpen: '本轮进行中',
      followup: '跟进 {n}',
      groupNoCards: '这段对话还没有卡片；发一条工作请求后会自动生成。',
      autoJumpOnHint: '新对话被接管时会自动跳到管家',
      confirmRemoveGroup: '把这段对话移出管家？对话本身不会被删除。',
      'job.watching': '盯守中',
      'job.planning': '拆解中',
      'job.running': '盯办中',
      'job.paused': '已暂停',
      'job.verifying': '终审中',
      'job.done': '已完成',
      'job.failed': '失败',
      'card.queued': '排队',
      'card.starting': '开工中',
      'card.running': '进行中',
      'card.stalled': '卡顿处理中',
      'card.fixing': '补做中',
      'card.verifying': '核对中',
      'card.done': '已核对',
      'card.failed': '失败',
      'card.blocked': '已阻塞',
      'card.skipped': '已跳过',
    }

    const en = {
      panelTitle: 'Card Workbench',
      kicker: 'CARD WORKBENCH',
      heading: 'Card Workbench',
      sub: 'You hand over the job. The workbench splits it, watches every card, unsticks stalls, and verifies each result.',
      intake: 'Hand over work',
      placeholder:
        'Paste the whole job: goal, scope, acceptance, references…\nFor example: add a sign-up flow to a web app with data, API, page and tests.',
      workdir: 'Working directory',
      chooseWorkspaceHint: 'Choose a workspace folder',
      chooseWorkspaceFirst: 'Choose a workspace folder before handing over work',
      chooseFolder: 'Choose folder',
      start: 'Split & start',
      starting: 'Butler is splitting…',
      refresh: 'Refresh',
      refreshing: 'Refreshing…',
      refreshed: 'Refreshed',
      cleared: 'Cleared {n} finished jobs',
      confirmClearFinished: 'Clear all finished jobs and conversation groups? The original sessions are kept.',
      nothingToClear: 'No finished jobs to clear',
      clear: 'Clear finished',
      emptyTitle: 'No work yet',
      emptyBody: 'Hand the butler one complete job, or just send a request in a work conversation; it adopts the conversation and turns each turn into a card.',
      howTitle: 'How the butler works',
      how1: 'Split',
      how1d: 'Splits a brief; adopts conversations turn by turn',
      how2: 'Watch',
      how2d: 'Watches many conversations and unsticks quiet turns',
      how3: 'Verify',
      how3d: 'Verifies each finish and sends gaps back to the conversation',
      progress: '{done}/{total} cards done',
      runningNow: '{n} running',
      liveStalled: '{running} running · {stalled} unsticking',
      ready: 'Ready',
      gapRounds: 'gap round {n}',
      openSession: 'Open session',
      retry: 'Retry',
      verify: 'Verify',
      skip: 'Skip',
      pause: 'Pause',
      resume: 'Resume',
      remove: 'Delete',
      confirmDelete: 'Delete this job? Worker sessions are kept.',
      log: 'Butler log',
      acceptance: 'Acceptance',
      result: 'Result',
      gaps: 'Gaps',
      attempts: 'prompts {n}',
      tools: 'tools {n}',
      lastTool: 'last tool',
      noActivity: 'no activity',
      error: 'Something went wrong',
      loading: 'Connecting to the butler…',
      storage: 'Data file',
      serviceDown: 'Butler service is not responding',
      brief: 'Original brief',
      summary: 'Final audit',
      createdAt: 'created',
      permissions: 'Brief workers run with maximum permission; adopted conversations keep their own permission.',
      kindBrief: 'Brief',
      kindSession: 'Conversation',
      groupsCount: '{n} conversation groups',
      sessionsTitle: 'Work conversations to adopt',
      sessionsHint: 'Each turn becomes a card. The butler watches, nudges and verifies without changing the conversation permission.',
      adopt: 'Adopt',
      adopted: 'Adopted',
      adoptRecent: 'Adopt recent',
      adoptWorkspace: 'Adopt workspace',
      adoptAll: 'Adopt all',
      pendingAdopt: '{n} to adopt',
      stateEmpty: 'Not started',
      stateRunning: 'Running {done}/{total}',
      stateDone: 'All done {done}/{total}',
      stateFailed: '{n} failed',
      statePaused: 'Paused',
      needsUserShort: 'Needs you',
      needsUserCount: '{n} waiting for you',
      needsQuestion: 'Waiting for your answer',
      needsApproval: 'Waiting for approval',
      openToAct: 'Open conversation',
      taskTimeline: 'Task timeline',
      taskSummary: 'Task summary',
      workspace: 'Workspace',
      historyWorkspaces: 'Historical workspaces',
      historyHint: 'Workspaces unused for more than 1 day are moved here',
      workspaceGroups: '{n} groups',
      workspaceNodes: '{n} nodes',
      unknownWorkspace: 'No workspace',
      timelineCollapsed: 'Timeline collapsed · {n} nodes',
      cardChat: 'Card chat',
      groupChat: 'Chat',
      groupChatPlaceholder: 'Talk to this conversation group without picking a task…',
      groupChatWaiting: 'Waiting for reply…',
      collapseGroup: 'Collapse conversation group',
      expandGroup: 'Expand conversation group',
      model: 'Model',
      mode: 'Mode',
      modeStandard: 'Standard',
      modePtc: 'PTC',
      modeMinimal: 'Minimal',
      modeCreative: 'Creative',
      reasoning: 'Reasoning',
      permission: 'Permission',
      permissionReadOnly: 'Read only',
      dependencyLabel: 'Depends on',
      priorityLabel: 'Priority',
      blockedLabel: 'Blocked reason',
      permissionWorkspaceWrite: 'Workspace write',
      permissionFullAccess: 'Full access',
      permissionCustom: 'Custom',
      management: 'Manage',
      managementMenu: 'Manage menu',
      managementHint: 'Hover to reveal sidebar functions',
      managementNew: 'New chat',
      managementSettings: 'Settings',
      managementButler: 'Card Workbench',
      managementConversation: 'Conversation',
      managementNoPanels: 'No panels',
      account: 'Account',
      accountCurrent: 'Current account',
      accountFeedback: 'Send feedback',
      accountSignOut: 'Sign out',
      accountSignIn: 'Sign in',
      accountUpdate: 'Update software',
      accountAvailable: 'Update available',
      defaultReasoning: 'Default',
      modelUnavailable: 'Loading models…',
      allowOnce: 'Allow once',
      deny: 'Deny',
      submitAnswer: 'Submit',
      customAnswer: 'Or type an answer…',
      chatPlaceholder: 'Continue the conversation on this card…',
      chatEmpty: 'No card chat yet. Type below to start.',
      chatYou: 'You',
      chatAssistant: 'Assistant',
      send: 'Send',
      sessionsToggleHint: 'Click to expand the adopt list',
      timelineCount: '{n} nodes',
      expandAll: 'Expand all',
      collapseAll: 'Collapse all',
      metricDone: 'Done',
      metricRunning: 'Running',
      metricFailed: 'Failed',
      metricWaiting: 'Waiting',
      goal: 'Task',
      revisionNote: 'Rework',
      revise: 'Rework',
      revisePlaceholder: 'What is unsatisfactory, and what should change?',
      reviseSubmit: 'Submit rework',
      reviseCancel: 'Cancel',
      reviseQueued: 'Rework submitted',
      sessionsOpen: 'Show list',
      sessionsClose: 'Hide list',
      adoptedBadge: 'Adopted',
      unadoptedBadge: 'Not adopted',
      groupDoneBadge: 'Done',
      groupRunningBadge: 'Running',
      groupFailedBadge: 'Failed',
      groupPausedBadge: 'Paused',
      liveBadge: 'Conversation active',
      noCards: 'No task nodes yet',
      nudge: 'Nudge',
      openConversation: 'Open conversation',
      moveOut: 'Remove group',
      settingsTitle: 'Butler settings',
      autoAdopt: 'Auto-adopt conversations',
      autoJump: 'Jump to cards',
      autoVerify: 'Verify finished turns',
      autoNudge: 'Nudge stalls',
      filterAll: 'All',
      filterBrief: 'Briefs',
      viewTimeline: 'Timeline',
      viewBoard: 'Board',
      boardPending: 'Pending',
      boardRunning: 'Running',
      boardVerifying: 'Verifying',
      boardDone: 'Done',
      boardBlocked: 'Blocked',
      boardEmpty: 'No cards',
      current: 'Current',
      sessionRunning: 'Running',
      noSessions: 'No work conversations available',
      imported: 'imported',
      turnOpen: 'turn running',
      followup: 'follow-ups {n}',
      groupNoCards: 'No cards yet. Send a work request in this conversation and one will appear.',
      autoJumpOnHint: 'The butler jumps here when a new conversation is adopted',
      confirmRemoveGroup: 'Remove this conversation from the butler? The conversation itself is kept.',
      'job.watching': 'Watching',
      'job.planning': 'Splitting',
      'job.running': 'Watching',
      'job.paused': 'Paused',
      'job.verifying': 'Auditing',
      'job.done': 'Done',
      'job.failed': 'Failed',
      'card.queued': 'Queued',
      'card.starting': 'Starting',
      'card.running': 'Running',
      'card.stalled': 'Unsticking',
      'card.fixing': 'Fixing',
      'card.verifying': 'Verifying',
      'card.done': 'Verified',
      'card.failed': 'Failed',
      'card.blocked': 'Blocked',
      'card.skipped': 'Skipped',
    }

    const CSS = `
      .butler-page{position:fixed;inset:var(--dsh-frame-chrome-top,0px) 0 0 0;z-index:900;height:auto;min-height:0;padding-top:34px;box-sizing:border-box;display:flex;flex-direction:column;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:14px;overflow:hidden;}
      .butler-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px 24px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);}
      .butler-brand{display:flex;align-items:center;gap:12px;min-width:0;}
      .butler-mark{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-brand-primary);flex:none;}
      .butler-brandtext{min-width:0;}
      .butler-kicker{font-size:9.5px;letter-spacing:.15em;color:var(--dsw-alias-label-secondary);text-transform:uppercase;line-height:1.4;}
      .butler-title{font-size:16px;font-weight:650;line-height:1.35;letter-spacing:.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-headside{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end;}
      .butler-live{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;}
      .butler-live i{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-state-success-primary);animation:butler-pulse 2s ease-in-out infinite;}
      @keyframes butler-pulse{0%,100%{opacity:1}50%{opacity:.3}}
      .butler-scroll{flex:1;min-height:0;overflow:auto;padding:22px 24px 48px;}
      .butler-inner{max-width:1120px;margin:0 auto;display:flex;flex-direction:column;gap:16px;}
      .butler-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;}
      .butler-intake{padding:16px 18px;display:flex;flex-direction:column;gap:12px;border:1px solid var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary),0 8px 24px rgba(0,0,0,.08);background:var(--dsw-alias-bg-layer-1);}
      .butler-intake .butler-label{font-size:15px;font-weight:750;color:var(--dsw-alias-label-primary);letter-spacing:.01em;}
      .butler-field-hint{font-size:11px;color:var(--dsw-alias-brand-primary);line-height:1.5;}
      .butler-label{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);}
      .butler-label small{font-weight:400;font-size:11px;opacity:.85;}
      .butler-textarea{width:100%;box-sizing:border-box;min-height:104px;resize:vertical;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:11px 13px;color:inherit;font:inherit;font-size:13px;line-height:1.6;outline:none;}
      .butler-textarea:focus{border-color:var(--dsw-alias-brand-primary);}
      .butler-row{display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;}
      .butler-field{flex:1 1 320px;min-width:200px;display:flex;flex-direction:column;gap:6px;}
      .butler-field > span{font-size:11px;color:var(--dsw-alias-label-secondary);}
      .butler-input{width:100%;box-sizing:border-box;height:34px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:0 10px;color:inherit;font:inherit;font-size:12.5px;outline:none;}
      .butler-input:focus{border-color:var(--dsw-alias-brand-primary);}
      .butler-workdir-row{display:flex;gap:6px;align-items:center;}
      .butler-workdir-row .butler-input{flex:1;min-width:0;}
      .butler-btn{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border-radius:8px;padding:7px 12px;font:inherit;font-size:12.5px;line-height:1.2;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;transition:border-color .15s ease, opacity .15s ease;}
      .butler-btn:hover:not(:disabled){border-color:var(--dsw-alias-border-l2);}
      .butler-btn:disabled{opacity:.5;cursor:default;}
      .butler-btn.primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff;font-weight:600;}
      .butler-btn.primary:hover:not(:disabled){opacity:.92;}
      .butler-btn.ghost{background:transparent;}
      .butler-btn.danger:hover:not(:disabled){color:var(--dsw-alias-state-error-primary);border-color:var(--dsw-alias-state-error-primary);}
      .butler-btn.small{padding:4px 9px;font-size:11.5px;border-radius:7px;}
      .butler-alert{border:1px solid var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-bg-layer-1);border-radius:10px;padding:10px 14px;font-size:12.5px;line-height:1.5;}
      .butler-empty{padding:46px 24px;text-align:center;color:var(--dsw-alias-label-secondary);border:1px dashed var(--dsw-alias-border-l1);border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:8px;background:var(--dsw-alias-bg-layer-1);}
      .butler-empty h3{margin:6px 0 0;font-size:15px;color:var(--dsw-alias-label-primary);font-weight:650;}
      .butler-empty p{margin:0;max-width:440px;font-size:12.5px;line-height:1.65;}
      .butler-how{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
      @media (max-width:720px){.butler-how{grid-template-columns:1fr;}}
      .butler-how-item{padding:11px 13px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);}
      .butler-how-title{font-size:12px;font-weight:650;display:flex;align-items:center;gap:7px;}
      .butler-how-title b{display:inline-flex;width:18px;height:18px;border-radius:50%;background:var(--dsw-alias-bg-layer-2);align-items:center;justify-content:center;font-size:10px;color:var(--dsw-alias-brand-primary);}
      .butler-how-item p{margin:4px 0 0;font-size:11.5px;line-height:1.55;color:var(--dsw-alias-label-secondary);}
      .butler-job{padding:16px 18px;display:flex;flex-direction:column;gap:13px;}
      .butler-job-head{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;}
      .butler-job-body{display:flex;flex-direction:column;gap:13px;min-width:0;}
      .butler-job-title{font-size:15px;font-weight:650;line-height:1.4;margin:0;overflow-wrap:anywhere;}
      .butler-job-title.is-clickable{display:flex;align-items:center;gap:5px;cursor:pointer;}
      .butler-job-title.is-clickable:hover{color:var(--dsw-alias-brand-primary);}
      .butler-job-chevron{flex:none;font-size:10px;color:var(--dsw-alias-label-secondary);width:12px;text-align:center;}
      .butler-timeline-toggle{cursor:pointer;display:inline-flex;align-items:center;gap:5px;}
      .butler-timeline-toggle:hover{color:var(--dsw-alias-brand-primary);}
      .butler-timeline-chevron{flex:none;font-size:10px;color:var(--dsw-alias-label-secondary);width:12px;text-align:center;}
      .butler-job-side{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
      .butler-pill{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:2px 9px;font-size:10.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;line-height:1.7;}
      .butler-pill i{width:6px;height:6px;border-radius:50%;background:currentColor;}
      .butler-tone-run{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .butler-tone-warn{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary);}
      .butler-tone-done{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary);}
      .butler-tone-fail{color:var(--dsw-alias-state-error-primary);border-color:var(--dsw-alias-state-error-primary);}
      .butler-tone-idle{color:var(--dsw-alias-state-idle-primary);}
      .butler-meta{display:flex;flex-wrap:wrap;gap:5px 14px;font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.6;}
      .butler-meta code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10.5px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:5px;padding:1px 5px;overflow-wrap:anywhere;}
      .butler-progress{display:flex;align-items:center;gap:10px;font-size:11px;color:var(--dsw-alias-label-secondary);}
      .butler-bar{flex:1;height:6px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);overflow:hidden;border:1px solid var(--dsw-alias-border-l1);min-width:80px;}
      .butler-bar > span{display:block;height:100%;background:var(--dsw-alias-brand-primary);transition:width .3s ease;}
      .butler-note{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-bg-layer-2);border-radius:8px;padding:8px 11px;font-size:11.5px;line-height:1.6;color:var(--dsw-alias-label-secondary);}
      .butler-note.done{border-left-color:var(--dsw-alias-state-success-primary);}
      .butler-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;}
      .butler-tile{border:1px solid var(--dsw-alias-border-l1);border-left:3px solid var(--dsw-alias-state-idle-primary);border-radius:10px;padding:11px 12px;background:var(--dsw-alias-bg-base);display:flex;flex-direction:column;gap:7px;min-width:0;}
      .butler-tile.is-running,.butler-tile.is-starting,.butler-tile.is-verifying{border-left-color:var(--dsw-alias-brand-primary);}
      .butler-tile.is-stalled,.butler-tile.is-fixing{border-left-color:var(--dsw-alias-state-warn-primary);}
      .butler-tile.is-done{border-left-color:var(--dsw-alias-state-success-primary);}
      .butler-tile.is-failed{border-left-color:var(--dsw-alias-state-error-primary);}
      .butler-tile.is-skipped{opacity:.75;}
      .butler-tile-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
      .butler-tile-title{font-size:12.5px;font-weight:650;line-height:1.45;overflow-wrap:anywhere;}
      .butler-tile-status{font-size:10px;color:var(--dsw-alias-label-secondary);white-space:nowrap;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:1px 7px;line-height:1.7;}
      .butler-tile-goal{font-size:11.5px;line-height:1.55;color:var(--dsw-alias-label-secondary);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;}
      .butler-tile-accept{font-size:10.5px;line-height:1.5;color:var(--dsw-alias-label-secondary);border-top:1px dashed var(--dsw-alias-border-l1);padding-top:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
      .butler-tile-accept b{font-weight:600;color:var(--dsw-alias-label-primary);}
      .butler-tile-result{font-size:10.5px;line-height:1.55;border-radius:6px;background:var(--dsw-alias-bg-layer-2);padding:6px 8px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;}
      .butler-tile-result b{color:var(--dsw-alias-label-primary);font-weight:600;}
      .butler-tile-foot{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:10px;color:var(--dsw-alias-label-secondary);}
      .butler-tile-actions{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:2px;}
      .butler-link{appearance:none;border:0;background:transparent;color:var(--dsw-alias-brand-primary);font:inherit;font-size:10.5px;cursor:pointer;padding:2px 0;}
      .butler-link:hover{text-decoration:underline;}
      .butler-log{border-top:1px dashed var(--dsw-alias-border-l1);padding-top:9px;}
      .butler-log summary{cursor:pointer;font-size:11px;color:var(--dsw-alias-label-secondary);user-select:none;outline:none;}
      .butler-log summary:hover{color:var(--dsw-alias-label-primary);}
      .butler-log-list{display:flex;flex-direction:column;gap:3px;max-height:230px;overflow:auto;margin-top:8px;padding-right:4px;font-size:11px;line-height:1.55;}
      .butler-log-line{display:flex;gap:8px;align-items:flex-start;}
      .butler-log-time{flex:none;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);opacity:.85;}
      .butler-log-text{overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary);}
      .butler-log-line[data-level="warn"] .butler-log-text{color:var(--dsw-alias-state-warn-primary);}
      .butler-log-line[data-level="error"] .butler-log-text{color:var(--dsw-alias-state-error-primary);}
      .butler-brief summary{cursor:pointer;font-size:11px;color:var(--dsw-alias-label-secondary);}
      .butler-brief p{white-space:pre-wrap;font-size:11.5px;line-height:1.6;color:var(--dsw-alias-label-secondary);margin:6px 0 0;max-height:180px;overflow:auto;}
      .butler-kind{border:1px solid var(--dsw-alias-border-l1);border-radius:6px;padding:1px 7px;font-size:10px;font-weight:600;color:var(--dsw-alias-label-secondary);white-space:nowrap;}
      .butler-kind.is-session{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .butler-kind.is-brief{color:var(--dsw-alias-label-secondary);}
      .butler-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;}
      .butler-toolbar-side{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
      .butler-tabs{display:inline-flex;gap:3px;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;padding:3px;background:var(--dsw-alias-bg-layer-2);}
      .butler-tab{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;line-height:1.2;padding:4px 10px;border-radius:6px;cursor:pointer;white-space:nowrap;}
      .butler-tab:hover{color:var(--dsw-alias-label-primary);}
      .butler-tab.is-active{background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);box-shadow:0 0 0 1px var(--dsw-alias-border-l1) inset;}
      .butler-tab b{font-weight:600;opacity:.7;margin-left:4px;}
      .butler-settings{display:flex;flex-wrap:wrap;gap:9px 16px;padding-top:2px;}
      .butler-switch{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none;}
      .butler-switch input{width:13px;height:13px;margin:0;accent-color:var(--dsw-alias-brand-primary);}
      .butler-sessions{padding:13px 16px;}
      .butler-sessions > summary{cursor:pointer;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);display:flex;align-items:center;gap:8px;flex-wrap:wrap;outline:none;}
      .butler-sessions > summary:hover{color:var(--dsw-alias-label-primary);}
      .butler-sessions-hint{font-size:11px;color:var(--dsw-alias-label-secondary);line-height:1.55;margin:8px 0 0;}
      .butler-session-list{display:flex;flex-direction:column;gap:6px;margin-top:10px;max-height:300px;overflow:auto;padding-right:4px;}
      .butler-session-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);}
      .butler-session-main{min-width:0;display:flex;flex-direction:column;gap:2px;}
      .butler-session-title{font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-session-meta{font-size:10.5px;color:var(--dsw-alias-label-secondary);display:flex;gap:8px;flex-wrap:wrap;overflow-wrap:anywhere;}
      .butler-session-actions{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end;}
      .butler-job[data-state="done"]{border-left:3px solid var(--dsw-alias-state-success-primary);}
      .butler-job[data-state="failed"]{border-left:3px solid var(--dsw-alias-state-error-primary);}
      .butler-job[data-state="running"]{border-left:3px solid var(--dsw-alias-brand-primary);}
      .butler-job[data-state="paused"]{border-left:3px solid var(--dsw-alias-state-idle-primary);}
      .butler-summary{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:9px 11px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);}
      .butler-summary-main{display:flex;align-items:center;gap:9px;min-width:180px;flex:1;}
      .butler-summary-title{font-size:11.5px;font-weight:650;letter-spacing:.02em;}
      .butler-metrics{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:10.5px;color:var(--dsw-alias-label-secondary);}
      .butler-metrics b{font-weight:650;font-size:12px;color:var(--dsw-alias-label-primary);margin-right:3px;font-variant-numeric:tabular-nums;}
      .butler-metrics .is-run b{color:var(--dsw-alias-brand-primary);}
      .butler-metrics .is-warn b{color:var(--dsw-alias-state-warn-primary);}
      .butler-metrics .is-fail b{color:var(--dsw-alias-state-error-primary);}
      .butler-metrics .is-done b{color:var(--dsw-alias-state-success-primary);}
      .butler-complete{display:flex;align-items:center;gap:8px;padding:8px 11px;border:1px solid var(--dsw-alias-state-success-primary);border-radius:8px;color:var(--dsw-alias-state-success-primary);font-size:11.5px;font-weight:600;background:var(--dsw-alias-bg-base);}
      .butler-needs-summary{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:8px 11px;border:1px solid var(--dsw-alias-state-warn-primary);border-radius:8px;color:var(--dsw-alias-state-warn-primary);font-size:11.5px;background:var(--dsw-alias-bg-base);}
      .butler-timeline{display:flex;flex-direction:column;gap:0;margin-top:2px;}
      .butler-tl-item{display:grid;grid-template-columns:44px 14px minmax(0,1fr);gap:8px;align-items:stretch;}
      .butler-tl-time{padding-top:11px;text-align:right;font-size:10px;line-height:1.3;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;}
      .butler-tl-rail{display:flex;flex-direction:column;align-items:center;}
      .butler-tl-dot{width:8px;height:8px;border-radius:50%;margin-top:13px;background:var(--dsw-alias-state-idle-primary);box-shadow:0 0 0 3px var(--dsw-alias-bg-layer-1);z-index:1;flex:none;}
      .butler-tl-line{width:1px;flex:1;background:var(--dsw-alias-border-l1);margin-top:4px;}
      .butler-tl-item:last-child .butler-tl-line{display:none;}
      .butler-tl-card{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);overflow:hidden;margin-bottom:8px;min-width:0;}
      .butler-tl-item.is-running .butler-tl-dot,.butler-tl-item.is-starting .butler-tl-dot{background:var(--dsw-alias-brand-primary);}
      .butler-tl-item.is-stalled .butler-tl-dot,.butler-tl-item.is-fixing .butler-tl-dot{background:var(--dsw-alias-state-warn-primary);}
      .butler-tl-item.is-done .butler-tl-dot{background:var(--dsw-alias-state-success-primary);}
      .butler-tl-item.is-failed .butler-tl-dot{background:var(--dsw-alias-state-error-primary);}
      .butler-tl-item.is-verifying .butler-tl-dot{background:var(--dsw-alias-brand-primary);}
      .butler-tl-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:9px 11px;cursor:pointer;outline:none;}
      .butler-tl-head:hover{background:var(--dsw-alias-bg-layer-2);}
      .butler-tl-headmain{min-width:0;display:flex;flex-direction:column;gap:3px;}
      .butler-tl-title{font-size:12.5px;font-weight:650;line-height:1.4;overflow-wrap:anywhere;}
      .butler-tl-summary{font-size:11px;line-height:1.5;color:var(--dsw-alias-label-secondary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;}
      .butler-board{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;align-items:start;}
      .butler-board-col{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:8px;min-height:120px;display:flex;flex-direction:column;gap:7px;}
      .butler-board-col.is-blocked{border-color:var(--dsw-alias-state-error-primary);}
      .butler-board-head{display:flex;align-items:center;justify-content:space-between;font-size:11.5px;font-weight:650;color:var(--dsw-alias-label-secondary);padding:2px 3px 6px;}
      .butler-board-head b{font-size:10px;color:var(--dsw-alias-label-tertiary);}
      .butler-board-card{border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);padding:8px;display:flex;flex-direction:column;gap:3px;}
      .butler-board-job{font-size:9.5px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-board-title{font-size:11.5px;font-weight:600;line-height:1.4;}
      .butler-board-meta{font-size:9.5px;color:var(--dsw-alias-label-secondary);}
      .butler-board-blocked{font-size:9.5px;color:var(--dsw-alias-state-error-primary);line-height:1.4;}
      .butler-board-empty{font-size:10px;color:var(--dsw-alias-label-tertiary);padding:8px 3px;}
      .butler-tl-headside{display:flex;align-items:center;gap:5px;flex:none;padding-top:1px;}
      .butler-tl-chevron{width:12px;text-align:center;font-size:10px;color:var(--dsw-alias-label-secondary);}
      .butler-tl-body{padding:9px 12px 11px;border-top:1px dashed var(--dsw-alias-border-l1);display:flex;flex-direction:column;gap:8px;background:var(--dsw-alias-bg-base);}
      .butler-tl-label{font-size:9.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);}
      .butler-tl-text{font-size:11.5px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);}
      .butler-tl-text.muted{color:var(--dsw-alias-label-secondary);}
      .butler-tl-meta{display:flex;gap:8px;flex-wrap:wrap;font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;}
      .butler-tl-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;border-top:1px dashed var(--dsw-alias-border-l1);padding-top:8px;}
      .butler-needs{border:1px solid var(--dsw-alias-state-warn-primary);border-radius:7px;background:var(--dsw-alias-bg-layer-2);padding:8px 10px;margin:0 11px 9px;display:flex;flex-direction:column;gap:4px;font-size:11px;line-height:1.55;}
      .butler-needs-title{font-weight:650;color:var(--dsw-alias-state-warn-primary);font-size:11.5px;}
      .butler-needs-detail{color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;}
      .butler-needs-options{display:flex;gap:5px;flex-wrap:wrap;}
      .butler-needs-option{border:1px solid var(--dsw-alias-state-warn-primary);border-radius:999px;padding:1px 7px;font-size:10px;color:var(--dsw-alias-state-warn-primary);}
      .butler-approval-actions{display:flex;gap:6px;flex-wrap:wrap;}
      .butler-question-form{display:flex;flex-direction:column;gap:8px;margin-top:2px;}
      .butler-question{display:flex;flex-direction:column;gap:5px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px;background:var(--dsw-alias-bg-base);}
      .butler-question-title{font-size:11.5px;font-weight:650;line-height:1.5;}
      .butler-question-detail{font-size:10.5px;color:var(--dsw-alias-label-secondary);line-height:1.55;white-space:pre-wrap;}
      .butler-question-options{display:flex;gap:5px;flex-wrap:wrap;}
      .butler-option{appearance:none;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:inherit;border-radius:999px;padding:3px 9px;font:inherit;font-size:10.5px;cursor:pointer;}
      .butler-option:hover{border-color:var(--dsw-alias-brand-primary);}
      .butler-option.is-selected{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-base);}
      .butler-option:disabled{opacity:.55;cursor:default;}
      .butler-model-controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
      .butler-select-field{display:inline-flex;align-items:center;gap:4px;font-size:10px;color:var(--dsw-alias-label-secondary);}
      .butler-select{height:24px;max-width:180px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:6px;color:var(--dsw-alias-label-primary);font:inherit;font-size:10.5px;padding:0 5px;outline:none;}
      .butler-select:focus{border-color:var(--dsw-alias-brand-primary);}
      .butler-model-empty{font-size:10px;color:var(--dsw-alias-label-secondary);}
      .butler-needs-action{display:flex;gap:8px;flex-wrap:wrap;margin-top:2px;}
      .butler-revise{display:flex;flex-direction:column;gap:6px;border-top:1px dashed var(--dsw-alias-border-l1);padding-top:8px;}
      .butler-revise textarea{width:100%;box-sizing:border-box;min-height:58px;resize:vertical;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:7px 9px;color:inherit;font:inherit;font-size:11.5px;line-height:1.55;outline:none;}
      .butler-revise textarea:focus{border-color:var(--dsw-alias-brand-primary);}
      .butler-revise-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
      .butler-sessions-toggle{appearance:none;border:0;background:transparent;color:inherit;font:inherit;display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:0;cursor:pointer;text-align:left;}
      .butler-session-badges{display:flex;gap:5px;flex-wrap:wrap;align-items:center;}
      .butler-badge{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:1px 7px;font-size:10px;color:var(--dsw-alias-label-secondary);white-space:nowrap;}
      .butler-badge.is-done{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary);}
      .butler-badge.is-running{color:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);}
      .butler-badge.is-failed{color:var(--dsw-alias-state-error-primary);border-color:var(--dsw-alias-state-error-primary);}
      .butler-badge.is-warn{color:var(--dsw-alias-state-warn-primary);border-color:var(--dsw-alias-state-warn-primary);}
      .butler-badge.is-idle{color:var(--dsw-alias-state-idle-primary);}
      .butler-tl-empty{padding:16px 10px;font-size:11.5px;color:var(--dsw-alias-label-secondary);text-align:center;border:1px dashed var(--dsw-alias-border-l1);border-radius:8px;}
      .butler-workspace{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);overflow:hidden;margin-bottom:10px;}
      .butler-workspace[data-state="done"]{border-left:3px solid var(--dsw-alias-state-success-primary);}
      .butler-workspace[data-state="failed"]{border-left:3px solid var(--dsw-alias-state-error-primary);}
      .butler-workspace[data-state="running"]{border-left:3px solid var(--dsw-alias-brand-primary);}
      .butler-workspace[data-state="paused"]{border-left:3px solid var(--dsw-alias-state-idle-primary);}
      .butler-workspace-toggle{appearance:none;border:0;background:transparent;color:inherit;font:inherit;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:10px 13px;cursor:pointer;text-align:left;}
      .butler-workspace-toggle:hover{background:var(--dsw-alias-bg-layer-2);}
      .butler-workspace-head{display:flex;flex-direction:column;gap:2px;min-width:0;}
      .butler-workspace-name{font-size:12.5px;font-weight:650;letter-spacing:.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-workspace-path{font-size:10px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:360px;}
      .butler-workspace-badges{display:flex;gap:5px;flex-wrap:wrap;align-items:center;justify-content:flex-end;}
      .butler-workspace-chevron{font-size:10px;color:var(--dsw-alias-label-secondary);flex:none;width:12px;text-align:center;}
      .butler-workspace-body{display:flex;flex-direction:column;gap:10px;padding:0 10px 10px;}
      .butler-history{margin:16px 0 10px;border:1px dashed var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-base);overflow:hidden;}
      .butler-history-toggle{padding:11px 13px;}
      .butler-history .butler-workspace-path{max-width:520px;}
      .butler-history .butler-badge{color:var(--dsw-alias-label-secondary);}
      .butler-history-body{display:flex;flex-direction:column;gap:10px;padding:0 12px 12px;}
      .butler-history-body .butler-workspace{margin-bottom:0;background:var(--dsw-alias-bg-layer-1);}
      .butler-workspace .butler-job{background:var(--dsw-alias-bg-base);margin:0;}
      .butler-session-row:hover{border-color:var(--dsw-alias-border-l2);}
      .butler-session-toggle-action{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-brand-primary);border-radius:7px;padding:4px 9px;font-size:11px;font-weight:600;white-space:nowrap;flex:none;}
      .butler-sessions-collapsed-hint{font-size:10.5px;color:var(--dsw-alias-label-secondary);margin-top:6px;line-height:1.5;}
      .butler-chat{display:flex;flex-direction:column;gap:6px;border-top:1px dashed var(--dsw-alias-border-l1);padding-top:8px;}
      .butler-tl-body .butler-chat{border:1px solid var(--dsw-alias-brand-primary);border-left:4px solid var(--dsw-alias-brand-primary);border-radius:10px;padding:10px;background:var(--dsw-alias-bg-layer-1);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary),0 4px 14px rgba(0,0,0,.12);}
      .butler-tl-body .butler-chat:focus-within{box-shadow:0 0 0 2px var(--dsw-alias-brand-primary),0 4px 16px rgba(0,0,0,.16);}
      .butler-tl-body .butler-chat > .butler-tl-label{display:inline-flex;align-self:flex-start;background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-bg-base);border-radius:999px;padding:2px 8px;font-weight:700;letter-spacing:.02em;}
      .butler-tl-body .butler-chat .butler-chat-compose textarea{border-color:var(--dsw-alias-brand-primary);}
      .butler-group-chat{display:flex;flex-direction:column;gap:6px;padding:9px 11px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);}
      .butler-chat-waiting{font-size:10.5px;color:var(--dsw-alias-brand-primary);}
      .butler-chat-list{display:flex;flex-direction:column;gap:4px;max-height:190px;overflow:auto;padding-right:3px;}
      .butler-chat-msg{display:flex;gap:6px;align-items:flex-start;font-size:11px;line-height:1.55;}
      .butler-chat-role{flex:none;font-size:9.5px;font-weight:600;color:var(--dsw-alias-label-secondary);padding-top:1px;min-width:26px;}
      .butler-chat-msg.is-user .butler-chat-role{color:var(--dsw-alias-brand-primary);}
      .butler-chat-text{color:var(--dsw-alias-label-primary);white-space:pre-wrap;overflow-wrap:anywhere;min-width:0;}
      .butler-chat-msg.is-user .butler-chat-text{color:var(--dsw-alias-label-primary);}
      .butler-chat-empty{font-size:10.5px;color:var(--dsw-alias-label-secondary);line-height:1.5;}
      .butler-chat-compose{display:flex;gap:6px;align-items:flex-end;}
      .butler-chat-compose textarea{flex:1;box-sizing:border-box;min-height:34px;max-height:120px;resize:vertical;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:6px 8px;color:inherit;font:inherit;font-size:11.5px;line-height:1.5;outline:none;}
      .butler-chat-compose textarea:focus{border-color:var(--dsw-alias-brand-primary);}
.butler-group-chat .butler-chat-compose textarea{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary);}
.butler-group-chat .butler-chat-compose textarea:focus{box-shadow:0 0 0 2px var(--dsw-alias-brand-primary);}
      .butler-foot{font-size:10.5px;color:var(--dsw-alias-label-secondary);text-align:center;padding:2px 0 6px;}
    `

    function fill(template, vars) {
      return String(template).replace(/\{(\w+)\}/g, (whole, key) =>
        vars && Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole,
      )
    }

    function statusLabel(t, kind, status) {
      const key = `${kind}.${status}`
      try {
        const value = t(key)
        if (typeof value === 'string' && value && value !== key) return value
      } catch {
        /* fall through to the raw status */
      }
      return status
    }

    function statusTone(status) {
      if (status === 'done') return 'done'
      if (status === 'failed' || status === 'blocked') return 'fail'
      if (status === 'paused' || status === 'queued' || status === 'skipped') return 'idle'
      if (status === 'stalled' || status === 'fixing') return 'warn'
      return 'run'
    }

    function ago(nowTime, time) {
      if (!time) return '—'
      const delta = Math.max(0, nowTime - time)
      if (delta < 60_000) return `${Math.max(1, Math.round(delta / 1000))}s`
      if (delta < 3_600_000) return `${Math.round(delta / 60_000)}m`
      if (delta < 86_400_000) return `${Math.round(delta / 3_600_000)}h`
      return `${Math.round(delta / 86_400_000)}d`
    }

    function clock(time) {
      if (!time) return '—'
      const d = new Date(time)
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    }

    function ButlerMark({ size = 22 }) {
      return h(
        'svg',
        { viewBox: '0 0 24 24', width: size, height: size, fill: 'none', 'aria-hidden': 'true' },
        h('rect', { x: 3.4, y: 7.6, width: 14.4, height: 12.4, rx: 2.6, stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', {
          d: 'M7.2 7.6V5.9c0-1 .8-1.9 1.9-1.9h5.8c1 0 1.9.8 1.9 1.9v1.7',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M7.4 13.2l2.2 2.2 4.4-4.4',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('path', { d: 'M14.6 16.8h2.1', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
        h('circle', { cx: 19.6, cy: 5.2, r: 1.9, fill: 'currentColor', opacity: 0.9 }),
      )
    }

    function ButlerIcon({ size = 18, active = false }) {
      const edge = 18
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: size || edge,
          height: size || edge,
          fill: 'none',
          'aria-hidden': 'true',
          style: { display: 'block', opacity: active ? 1 : 0.82 },
        },
        h('rect', { x: 3.3, y: 7.4, width: 14.6, height: 12.6, rx: 2.7, stroke: 'currentColor', strokeWidth: 1.55 }),
        h('path', {
          d: 'M7.1 7.4V5.8c0-1 .8-1.9 1.9-1.9h6c1 0 1.9.8 1.9 1.9v1.6',
          stroke: 'currentColor',
          strokeWidth: 1.55,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M7.3 13.1l2.2 2.2 4.5-4.5',
          stroke: 'currentColor',
          strokeWidth: 1.85,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('circle', { cx: 19.5, cy: 5.1, r: 1.9, fill: 'currentColor' }),
      )
    }

    function Pill({ text, tone }) {
      return h('span', { className: `butler-pill butler-tone-${tone || 'idle'}` }, h('i'), text)
    }

    function Btn({ children, onClick, tone, small, ghost, danger, disabled, title }) {
      const classes = ['butler-btn']
      if (tone) classes.push(tone)
      if (small) classes.push('small')
      if (ghost) classes.push('ghost')
      if (danger) classes.push('danger')
      return h(
        'button',
        {
          type: 'button',
          className: classes.join(' '),
          onClick,
          disabled,
          title,
        },
        children,
      )
    }

    function LogDetails({ log, t }) {
      if (!log || !log.length) return null
      const entries = log.slice(-40)
      return h(
        'details',
        { className: 'butler-log' },
        h('summary', null, `${t('log')} · ${log.length}`),
        h(
          'div',
          { className: 'butler-log-list' },
          entries.map((entry, index) =>
            h(
              'div',
              { className: 'butler-log-line', key: `${entry.t}-${index}`, 'data-level': entry.level || 'info' },
              h('span', { className: 'butler-log-time' }, entry.time || clock(entry.t)),
              h('span', { className: 'butler-log-text' }, entry.text),
            ),
          ),
        ),
      )
    }

    function groupState(t, job) {
      const stats = job.stats || { total: 0, done: 0, running: 0, failed: 0 }
      if (!stats.total) return { key: 'empty', label: t('stateEmpty'), tone: 'idle' }
      if (stats.failed) return { key: 'failed', label: fill(t('stateFailed'), { n: stats.failed }), tone: 'fail' }
      if (stats.running) {
        return { key: 'running', label: fill(t('stateRunning'), { done: stats.done, total: stats.total }), tone: 'run' }
      }
      if (stats.done === stats.total) {
        return { key: 'done', label: fill(t('stateDone'), { done: stats.done, total: stats.total }), tone: 'done' }
      }
      if (job.status === 'paused') return { key: 'paused', label: t('statePaused'), tone: 'idle' }
      return { key: 'paused', label: t('statePaused'), tone: 'idle' }
    }

    function ComposerControls({ t, catalog, selection, busy, onChange, permissionCatalog, permission, onPermission, presetCatalog, preset, onPreset }) {
      const groups = catalog?.groups || []
      const fallback = catalog?.default || {}
      const provider = selection?.provider || fallback.provider || ''
      const model = selection?.model || fallback.model || ''
      const permissionOptions = permissionCatalog?.options || []
      const presetOptions = (presetCatalog?.presets || []).filter((item) => !item.broken)
      const presetLabel = (item) =>
        ({
          standard: t('modeStandard'),
          ptc: t('modePtc'),
          minimal: t('modeMinimal'),
          cordis: t('modeCreative'),
        })[item.id] || item.name || item.id
      const permissionLabel = (value) =>
        ({
          'read-only': t('permissionReadOnly'),
          'workspace-write': t('permissionWorkspaceWrite'),
          'danger-full-access': t('permissionFullAccess'),
          custom: t('permissionCustom'),
        })[value] || value
      const current = groups
        .flatMap((group) =>
          (group.models || []).map((item) => ({ ...item, provider: group.id })),
        )
        .find((item) => item.provider === provider && item.id === model)
      const efforts = current?.reasoning?.efforts || []
      const effort = selection?.reasoningEffort || current?.reasoning?.defaultEffort || ''
      const chooseModel = (value) => {
        const [nextProvider, nextModel] = value.split('/')
        const next = groups
          .flatMap((group) =>
            (group.models || []).map((item) => ({ ...item, provider: group.id })),
          )
          .find((item) => item.provider === nextProvider && item.id === nextModel)
        onChange({
          provider: nextProvider,
          model: nextModel,
          reasoningEffort: next?.reasoning?.defaultEffort || '',
        })
      }
      return h(
        'div',
        { className: 'butler-model-controls' },
        presetOptions.length
          ? h(
              'label',
              { className: 'butler-select-field', title: t('mode') },
              h('span', null, t('mode')),
              h(
                'select',
                {
                  className: 'butler-select',
                  value: preset || '',
                  disabled: busy,
                  onChange: (event) => onPreset(event.target.value),
                },
                presetOptions.map((option) =>
                  h(
                    'option',
                    { key: option.id, value: option.id },
                    presetLabel(option),
                  ),
                ),
              ),
            )
          : null,
        permissionOptions.length
          ? h(
              'label',
              { className: 'butler-select-field', title: t('permission') },
              h('span', null, t('permission')),
              h(
                'select',
                {
                  className: 'butler-select',
                  value: permission || 'custom',
                  disabled: busy,
                  onChange: (event) => onPermission(event.target.value),
                },
                permissionOptions.map((option) =>
                  h('option', { key: option.value, value: option.value }, permissionLabel(option.value)),
                ),
              ),
            )
          : null,
        groups.length
          ? h(
              'label',
              { className: 'butler-select-field', title: t('model') },
              h('span', null, t('model')),
              h(
                'select',
                {
                  className: 'butler-select',
                  value: `${provider}/${model}`,
                  disabled: busy,
                  onChange: (event) => chooseModel(event.target.value),
                },
                groups.map((group) =>
                  h(
                    'optgroup',
                    { key: group.id, label: group.name },
                    (group.models || []).map((item) =>
                      h(
                        'option',
                        { key: `${group.id}/${item.id}`, value: `${group.id}/${item.id}` },
                        item.name,
                      ),
                    ),
                  ),
                ),
              ),
            )
          : h('span', { className: 'butler-model-empty' }, t('modelUnavailable')),
        efforts.length
          ? h(
              'label',
              { className: 'butler-select-field', title: t('reasoning') },
              h('span', null, t('reasoning')),
              h(
                'select',
                {
                  className: 'butler-select',
                  value: effort,
                  disabled: busy,
                  onChange: (event) =>
                    onChange({ provider, model, reasoningEffort: event.target.value }),
                },
                h('option', { value: '' }, t('defaultReasoning')),
                efforts.map((item) =>
                  h('option', { key: item.id, value: item.id }, item.name),
                ),
              ),
            )
          : null,
      )
    }

    function QuestionForm({ t, requestId, questions, busy, onSubmit }) {
      const [answers, setAnswers] = React.useState({})
      React.useEffect(() => {
        setAnswers({})
      }, [requestId])
      const update = (questionId, patch) => {
        setAnswers((current) => ({
          ...current,
          [questionId]: { ...(current[questionId] || {}), ...patch },
        }))
      }
      const complete = questions.every((question) => {
        const answer = answers[question.id]
        return (answer?.selected?.length || 0) > 0 || Boolean(answer?.custom?.trim())
      })
      return h(
        'div',
        { className: 'butler-question-form' },
        questions.map((question) => {
          const answer = answers[question.id] || {}
          return h(
            'div',
            { className: 'butler-question', key: question.id },
            h(
              'div',
              { className: 'butler-question-title' },
              question.header || question.question,
            ),
            question.detail
              ? h('div', { className: 'butler-question-detail' }, question.detail)
              : null,
            question.options?.length
              ? h(
                  'div',
                  { className: 'butler-question-options' },
                  question.options.map((option) => {
                    const selected = (answer.selected || []).includes(option.label)
                    return h(
                      'button',
                      {
                        type: 'button',
                        key: option.label,
                        className: `butler-option${selected ? ' is-selected' : ''}`,
                        disabled: busy,
                        onClick: () => {
                          if (question.multiSelect) {
                            const current = answer.selected || []
                            update(question.id, {
                              selected: selected
                                ? current.filter((item) => item !== option.label)
                                : [...current, option.label],
                            })
                          } else {
                            update(question.id, { selected: [option.label] })
                          }
                        },
                      },
                      option.label,
                    )
                  }),
                )
              : null,
            h('input', {
              className: 'butler-input',
              value: answer.custom || '',
              placeholder: t('customAnswer'),
              disabled: busy,
              onChange: (event) => update(question.id, { custom: event.target.value }),
            }),
          )
        }),
        h(
          Btn,
          {
            small: true,
            tone: 'primary',
            disabled: busy || !complete,
            onClick: () =>
              onSubmit(
                questions.map((question) => ({
                  id: question.id,
                  selected: answers[question.id]?.selected || [],
                  custom: answers[question.id]?.custom || '',
                })),
              ),
          },
          t('submitAnswer'),
        ),
      )
    }

    function CardTile({
      card,
      job,
      t,
      nowTime,
      busy,
      openSession,
      onAction,
      expanded,
      onToggle,
      revising,
      revisionText,
      setRevisionText,
      onStartRevise,
      onCancelRevise,
      onSubmitRevise,
      chatText,
      setChatText,
      onSendChat,
      modelCatalog,
      modelSelection,
      onSelectModel,
      permissionCatalog,
      permission,
      onPermission,
      presetCatalog,
      preset,
      onPreset,
      onResolveApproval,
      onResolveQuestion,
    }) {
      const isSession = job.kind === 'session' || card.kind === 'session'
      const statusText = statusLabel(t, 'card', card.status)
      const needsUser = card.needsUser
      const showChat = isSession && Boolean(job.sessionId || card.sessionId) && card.status !== 'verifying'
      const showVerify =
        Boolean(card.sessionId) &&
        (isSession ? card.status !== 'skipped' : card.status !== 'done' && card.status !== 'skipped')
      const showRetry =
        !isSession &&
        (card.status === 'failed' || card.status === 'done' || card.status === 'skipped' || card.status === 'stalled')
      const showSkip = !isSession && !['done', 'failed', 'skipped'].includes(card.status)
      const showNudge = isSession && !['done', 'failed', 'skipped', 'verifying'].includes(card.status)
      const showRevise =
        Boolean(job.sessionId || card.sessionId) && !['skipped', 'verifying'].includes(card.status)
      const summary = needsUser
        ? `${t('needsUserShort')} · ${needsUser.title || ''}`
        : card.result?.summary || card.verify?.summary || card.note || card.goal
      const stop = (fn) => (event) => {
        event.stopPropagation()
        fn()
      }
      return h(
        'div',
        { className: `butler-tl-item is-${card.status}` },
        h('div', { className: 'butler-tl-time' }, clock(card.createdAt)),
        h(
          'div',
          { className: 'butler-tl-rail' },
          h('span', { className: 'butler-tl-dot' }),
          h('span', { className: 'butler-tl-line' }),
        ),
        h(
          'div',
          { className: 'butler-tl-card' },
          h(
            'div',
            {
              className: 'butler-tl-head',
              role: 'button',
              tabIndex: 0,
              onClick: onToggle,
              onKeyDown: (event) => {
                if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
                  event.preventDefault()
                  onToggle()
                }
              },
            },
            h(
              'div',
              { className: 'butler-tl-headmain' },
              h('div', { className: 'butler-tl-title' }, card.title),
              h('div', { className: 'butler-tl-summary' }, summary),
              h(
                'div',
                { className: 'butler-tl-meta' },
                h('span', { className: 'butler-badge is-idle' }, `${t('priorityLabel')} P${card.priority || 2}`),
                card.dependsOn?.length
                  ? h(
                      'span',
                      { className: 'butler-badge is-idle' },
                      `${t('dependencyLabel')} ${card.dependsOn.length}`,
                    )
                  : null,
                card.estimateSteps
                  ? h('span', { className: 'butler-badge is-idle' }, `~${card.estimateSteps} 步`)
                  : null,
              ),
              card.status === 'blocked' && card.blockedReason
                ? h('div', { className: 'butler-field-hint' }, `${t('blockedLabel')}：${card.blockedReason}`)
                : null,
            ),
            h(
              'div',
              { className: 'butler-tl-headside' },
              needsUser ? h('span', { className: 'butler-badge is-warn' }, t('needsUserShort')) : null,
              card.imported ? h('span', { className: 'butler-badge is-idle' }, t('imported')) : null,
              h(Pill, { text: statusText, tone: statusTone(card.status) }),
              h('span', { className: 'butler-tl-chevron' }, expanded ? '▾' : '▸'),
            ),
          ),
          needsUser
            ? h(
                'div',
                { className: 'butler-needs' },
                h(
                  'div',
                  { className: 'butler-needs-title' },
                  needsUser.type === 'approval'
                    ? `${t('needsApproval')}：${needsUser.toolName || ''}`
                    : `${t('needsQuestion')}：${needsUser.title || ''}`,
                ),
                needsUser.detail ? h('div', { className: 'butler-needs-detail' }, needsUser.detail) : null,
                needsUser.type === 'question' && needsUser.requestId && needsUser.questions?.length
                  ? h(QuestionForm, {
                      t,
                      requestId: needsUser.requestId,
                      questions: needsUser.questions,
                      busy,
                      onSubmit: (answers) =>
                        onResolveQuestion(card.id, needsUser.requestId, answers),
                    })
                  : needsUser.type !== 'approval' && needsUser.options && needsUser.options.length
                    ? h(
                        'div',
                        { className: 'butler-needs-options' },
                        needsUser.options.map((option, index) =>
                          h('span', { className: 'butler-needs-option', key: index }, option),
                        ),
                      )
                    : null,
                needsUser.type === 'approval' && needsUser.requestId
                  ? h(
                      'div',
                      { className: 'butler-approval-actions' },
                      h(
                        Btn,
                        {
                          small: true,
                          tone: 'primary',
                          disabled: busy,
                          onClick: () =>
                            onResolveApproval(card.id, needsUser.requestId, 'allowed-once'),
                        },
                        t('allowOnce'),
                      ),
                      h(
                        Btn,
                        {
                          small: true,
                          ghost: true,
                          disabled: busy,
                          onClick: () =>
                            onResolveApproval(card.id, needsUser.requestId, 'rejected'),
                        },
                        t('deny'),
                      ),
                    )
                  : null,
                h(
                  'div',
                  { className: 'butler-needs-action' },
                  card.sessionId
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          onClick: stop(() => openSession(card.sessionId)),
                        },
                        t('openToAct'),
                      )
                    : null,
                ),
              )
            : null,
          expanded
            ? h(
                'div',
                { className: 'butler-tl-body' },
                h('div', { className: 'butler-tl-label' }, t('goal')),
                h('div', { className: 'butler-tl-text' }, card.goal),
                card.acceptance
                  ? h(
                      'div',
                      null,
                      h('div', { className: 'butler-tl-label' }, t('acceptance')),
                      h('div', { className: 'butler-tl-text muted' }, card.acceptance),
                    )
                  : null,
                card.result && card.result.summary
                  ? h(
                      'div',
                      null,
                      h('div', { className: 'butler-tl-label' }, t('result')),
                      h('div', { className: 'butler-tl-text' }, card.result.summary),
                    )
                  : null,
                card.verify
                  ? h(
                      'div',
                      null,
                      h('div', { className: 'butler-tl-label' }, card.verify.pass ? t('verify') : t('gaps')),
                      h(
                        'div',
                        { className: 'butler-tl-text muted' },
                        card.verify.summary ||
                          (card.verify.gaps && card.verify.gaps.length ? card.verify.gaps.join('；') : ''),
                      ),
                    )
                  : null,
                card.revisions && card.revisions.length
                  ? h(
                      'div',
                      null,
                      h('div', { className: 'butler-tl-label' }, `${t('revisionNote')} · ${card.revisions.length}`),
                      h(
                        'div',
                        { className: 'butler-tl-text muted' },
                        card.revisions[card.revisions.length - 1].instruction,
                      ),
                    )
                  : null,
                card.note ? h('div', { className: 'butler-note' }, card.note) : null,
                h(
                  'div',
                  { className: 'butler-tl-meta' },
                  h(
                    'span',
                    null,
                    isSession
                      ? fill(t('followup'), { n: card.attempts || 0 })
                      : fill(t('attempts'), { n: card.attempts || 0 }),
                  ),
                  h('span', null, fill(t('tools'), { n: card.toolCalls || 0 })),
                  card.lastTool ? h('span', null, `${t('lastTool')} ${card.lastTool}`) : null,
                  card.turn ? h('span', null, `turn ${card.turn}`) : null,
                  card.lastActivityAt ? h('span', null, ago(nowTime, card.lastActivityAt)) : null,
                ),
                h(
                  'div',
                  { className: 'butler-tl-actions' },
                  card.sessionId
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          onClick: () => openSession(card.sessionId),
                          title: card.sessionId,
                        },
                        t(isSession ? 'openConversation' : 'openSession'),
                      )
                    : null,
                  showVerify
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          disabled: busy,
                          onClick: () =>
                            onAction('verifyCard', { jobId: job.id, cardId: card.id }, `verify:${card.id}`),
                        },
                        t('verify'),
                      )
                    : null,
                  showNudge
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          disabled: busy,
                          onClick: () =>
                            onAction('nudgeCard', { jobId: job.id, cardId: card.id }, `nudge:${card.id}`),
                        },
                        t('nudge'),
                      )
                    : null,
                  showRevise
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          disabled: busy,
                          onClick: () => onStartRevise(card.id),
                        },
                        t('revise'),
                      )
                    : null,
                  showRetry
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          disabled: busy,
                          onClick: () =>
                            onAction('retryCard', { jobId: job.id, cardId: card.id }, `retry:${card.id}`),
                        },
                        t('retry'),
                      )
                    : null,
                  showSkip
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-link',
                          disabled: busy,
                          onClick: () =>
                            onAction('skipCard', { jobId: job.id, cardId: card.id }, `skip:${card.id}`),
                        },
                        t('skip'),
                      )
                    : null,
                ),
                showChat
                  ? h(
                      'div',
                      { className: 'butler-chat' },
                      h('div', { className: 'butler-tl-label' }, t('cardChat')),
                      card.chat && card.chat.length
                        ? h(
                            'div',
                            { className: 'butler-chat-list' },
                            card.chat.slice(-8).map((message, index) =>
                              h(
                                'div',
                                {
                                  className: `butler-chat-msg is-${message.role || 'assistant'}`,
                                  key: index,
                                },
                                h(
                                  'span',
                                  { className: 'butler-chat-role' },
                                  message.role === 'user' ? t('chatYou') : t('chatAssistant'),
                                ),
                                h('span', { className: 'butler-chat-text' }, message.text),
                              ),
                            ),
                          )
                        : h('div', { className: 'butler-chat-empty' }, t('chatEmpty')),
                      h(
                        'div',
                        { className: 'butler-chat-compose' },
                        h('textarea', {
                          value: chatText,
                          placeholder: t('chatPlaceholder'),
                          onChange: (event) => setChatText(event.target.value),
                          onKeyDown: (event) => {
                            const composing =
                              event.nativeEvent?.isComposing ||
                              event.isComposing ||
                              event.keyCode === 229
                            if (event.key === 'Enter' && !event.shiftKey && !composing) {
                              event.preventDefault()
                              onSendChat(card.id)
                            }
                          },
                        }),
                        h(
                          Btn,
                          {
                            small: true,
                            tone: 'primary',
                            disabled: busy || !chatText.trim(),
                            onClick: () => onSendChat(card.id),
                          },
                          t('send'),
                        ),
                      ),
                      h(ComposerControls, {
                        t,
                        catalog: modelCatalog,
                        selection: modelSelection,
                        busy,
                        onChange: onSelectModel,
                        permissionCatalog,
                        permission,
                        onPermission,
                        presetCatalog,
                        preset,
                        onPreset,
                      }),
                    )
                  : null,
                revising
                  ? h(
                      'div',
                      { className: 'butler-revise' },
                      h('textarea', {
                        value: revisionText,
                        placeholder: t('revisePlaceholder'),
                        onChange: (event) => setRevisionText(event.target.value),
                      }),
                      h(
                        'div',
                        { className: 'butler-revise-actions' },
                        h(
                          Btn,
                          {
                            small: true,
                            tone: 'primary',
                            disabled: busy || !revisionText.trim(),
                            onClick: () => onSubmitRevise(card.id),
                          },
                          t('reviseSubmit'),
                        ),
                        h(Btn, { small: true, ghost: true, onClick: onCancelRevise }, t('reviseCancel')),
                      ),
                    )
                  : null,
              )
            : null,
        ),
      )
    }

    function JobCard({ job, t, nowTime, busy, openSession, onAction, modelCatalog, permissionCatalog, presetCatalog }) {
      const isSession = job.kind === 'session'
      const state = groupState(t, job)
      const cards = [...job.cards].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      const waiting = job.cards.filter((card) => card.needsUser).length
      const [expandAll, setExpandAll] = React.useState(false)
      const [timelineOpen, setTimelineOpen] = React.useState(false)
      const [openIds, setOpenIds] = React.useState(() => new Set())
      const [revisingId, setRevisingId] = React.useState('')
      const [revisionText, setRevisionText] = React.useState('')
      const [chatDrafts, setChatDrafts] = React.useState({})
      const [groupChatText, setGroupChatText] = React.useState(() => readDraft(`group:${job.id}`))
      const [groupOpen, setGroupOpen] = React.useState(false)
      const showPause =
        job.status === 'running' ||
        job.status === 'planning' ||
        job.status === 'verifying' ||
        job.status === 'watching'
      const showResume = job.status === 'paused'

      const toggleCard = (id) => {
        setOpenIds((current) => {
          const next = new Set(current)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        })
      }
      const startRevise = (id) => {
        setRevisingId(id)
        setRevisionText('')
      }
      const cancelRevise = () => {
        setRevisingId('')
        setRevisionText('')
      }
      const submitRevise = (id) => {
        const text = revisionText.trim()
        if (!text) return
        void onAction(
          'reviseCard',
          { jobId: job.id, cardId: id, instruction: text },
          `revise:${id}`,
        ).then((result) => {
          if (result) {
            setRevisingId('')
            setRevisionText('')
          }
        })
      }
      const cardDraft = (id) => chatDrafts[id] ?? readDraft(`card:${id}`)
      const setCardDraft = (id, value) => {
        setChatDrafts((current) => ({ ...current, [id]: value }))
        writeDraft(`card:${id}`, value)
      }
      const sendChat = (id) => {
        const text = cardDraft(id).trim()
        if (!text) return
        void onAction(
          'sendCardMessage',
          { jobId: job.id, cardId: id, message: text },
          `chat:${id}`,
        ).then((result) => {
          if (result) {
            setChatDrafts((current) => ({ ...current, [id]: '' }))
            clearDraft(`card:${id}`)
          }
        })
      }
      const sendGroupChat = () => {
        const text = groupChatText.trim()
        if (!text || job.groupChatOpen || job.liveTurnOpen) return
        void onAction(
          'sendGroupMessage',
          { jobId: job.id, message: text },
          `groupchat:${job.id}`,
        ).then((result) => {
          if (result) {
            setGroupChatText('')
            clearDraft(`group:${job.id}`)
          }
        })
      }
      const modelSelection = job.modelSelection || job.currentModel || modelCatalog?.default || null
      const permission = job.permission || 'custom'
      const changePermission = (preset) => {
        if (!preset) return
        void onAction(
          'setPermission',
          { jobId: job.id, preset },
          `permission:${job.id}`,
        )
      }
      const changePreset = (preset) => {
        if (!preset) return
        void onAction(
          'selectPreset',
          { jobId: job.id, preset },
          `preset:${job.id}`,
        )
      }
      const currentPreset =
        job.preset ||
        (presetCatalog?.presets || []).find((preset) => preset.isDefault)?.id ||
        ''
      const changeModel = (selection) => {
        if (!selection?.provider || !selection?.model) return
        void onAction(
          'selectModel',
          {
            jobId: job.id,
            provider: selection.provider,
            model: selection.model,
            reasoningEffort: selection.reasoningEffort || '',
          },
          `model:${job.id}`,
        )
      }
      const resolveApproval = (cardId, requestId, decision) => {
        void onAction(
          'resolveInteraction',
          { jobId: job.id, cardId, requestId, decision },
          `interaction:${requestId}`,
        )
      }
      const resolveQuestion = (cardId, requestId, answers) => {
        void onAction(
          'resolveInteraction',
          { jobId: job.id, cardId, requestId, answers },
          `interaction:${requestId}`,
        )
      }

      return h(
        'section',
        { className: 'butler-card butler-job', 'data-state': state.key },
        h(
          'div',
          { className: 'butler-job-head' },
          h(
            'div',
            { style: { minWidth: 0 } },
            h(
              'h2',
              {
                className: 'butler-job-title is-clickable',
                role: 'button',
                tabIndex: 0,
                'aria-expanded': groupOpen,
                'aria-label': groupOpen ? t('collapseGroup') : t('expandGroup'),
                onClick: () => setGroupOpen((value) => !value),
                onKeyDown: (event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
                    event.preventDefault()
                    setGroupOpen((value) => !value)
                  }
                },
              },
              h('span', { className: 'butler-job-chevron' }, groupOpen ? '▾' : '▸'),
              h('span', null, job.title),
            ),
            h(
              'div',
              { className: 'butler-meta' },
              h(
                'span',
                { className: `butler-kind ${isSession ? 'is-session' : 'is-brief'}` },
                isSession ? t('kindSession') : t('kindBrief'),
              ),
              h('span', null, `${t('createdAt')} ${clock(job.createdAt)}`),
              h('code', { title: job.cwd }, job.cwd),
              h('span', null, fill(t('timelineCount'), { n: cards.length })),
            ),
          ),
          h(
            'div',
            { className: 'butler-job-side' },
            waiting ? h('span', { className: 'butler-badge is-warn' }, fill(t('needsUserCount'), { n: waiting })) : null,
            h(Pill, { text: state.label, tone: state.tone }),
            isSession && job.sessionId
              ? h(
                  Btn,
                  {
                    small: true,
                    ghost: true,
                    disabled: busy,
                    onClick: () => {
                      console.log('[butler] JobCard openSession', {
                        jobId: job.id,
                        sessionId: job.sessionId,
                        cwd: job.cwd,
                      })
                      openSession(job.sessionId)
                    },
                  },
                  t('openConversation'),
                )
              : null,
            showPause
              ? h(
                  Btn,
                  {
                    small: true,
                    ghost: true,
                    disabled: busy,
                    onClick: () => onAction('pauseJob', { jobId: job.id }, `pause:${job.id}`),
                  },
                  t('pause'),
                )
              : null,
            showResume
              ? h(
                  Btn,
                  {
                    small: true,
                    disabled: busy,
                    onClick: () => onAction('resumeJob', { jobId: job.id }, `resume:${job.id}`),
                  },
                  t('resume'),
                )
              : null,
            h(
              'button',
              {
                type: 'button',
                className: 'butler-btn small ghost danger',
                disabled: busy,
                onClick: () => {
                  if (window.confirm(isSession ? t('confirmRemoveGroup') : t('confirmDelete'))) {
                    onAction('deleteJob', { jobId: job.id }, `delete:${job.id}`)
                  }
                },
              },
              isSession ? t('moveOut') : t('remove'),
            ),
          ),
        ),
        h(
          'div',
          { className: 'butler-job-body', style: { display: groupOpen ? 'flex' : 'none' } },
        isSession && job.sessionId
          ? h(
              'div',
              { className: 'butler-group-chat' },
              h('div', { className: 'butler-tl-label' }, t('groupChat')),
              job.chat && job.chat.length
                ? h(
                    'div',
                    { className: 'butler-chat-list' },
                    job.chat.slice(-6).map((message, index) =>
                      h(
                        'div',
                        {
                          className: `butler-chat-msg is-${message.role || 'assistant'}`,
                          key: index,
                        },
                        h(
                          'span',
                          { className: 'butler-chat-role' },
                          message.role === 'user' ? t('chatYou') : t('chatAssistant'),
                        ),
                        h('span', { className: 'butler-chat-text' }, message.text),
                      ),
                    ),
                  )
                : null,
              job.groupChatOpen
                ? h('div', { className: 'butler-chat-waiting' }, t('groupChatWaiting'))
                : null,
              h(
                'div',
                { className: 'butler-chat-compose' },
                h('textarea', {
                  value: groupChatText,
                  placeholder: t('groupChatPlaceholder'),
                  onChange: (event) => {
                    setGroupChatText(event.target.value)
                    writeDraft(`group:${job.id}`, event.target.value)
                  },
                  onKeyDown: (event) => {
                    const composing =
                      event.nativeEvent?.isComposing ||
                      event.isComposing ||
                      event.keyCode === 229
                    if (event.key === 'Enter' && !event.shiftKey && !composing) {
                      event.preventDefault()
                      sendGroupChat()
                    }
                  },
                }),
                h(
                  Btn,
                  {
                    small: true,
                    tone: 'primary',
                    disabled:
                      busy || job.groupChatOpen || job.liveTurnOpen || !groupChatText.trim(),
                    onClick: sendGroupChat,
                  },
                  t('send'),
                ),
              ),
              h(ComposerControls, {
                t,
                catalog: modelCatalog,
                selection: modelSelection,
                busy,
                onChange: changeModel,
                permissionCatalog,
                permission,
                onPermission: changePermission,
                presetCatalog,
                preset: currentPreset,
                onPreset: changePreset,
              }),
            )
          : null,
        h(
          'div',
          { className: 'butler-summary' },
          h(
            'div',
            { className: 'butler-summary-main' },
            h('span', { className: 'butler-summary-title' }, t('taskSummary')),
            h(Pill, { text: state.label, tone: state.tone }),
          ),
          h(
            'div',
            { className: 'butler-metrics' },
            h('span', { className: 'is-done' }, h('b', null, job.stats.done), t('metricDone')),
            h('span', { className: 'is-run' }, h('b', null, job.stats.running), t('metricRunning')),
            h(
              'span',
              { className: job.stats.failed ? 'is-fail' : '' },
              h('b', null, job.stats.failed),
              t('metricFailed'),
            ),
            waiting ? h('span', { className: 'is-warn' }, h('b', null, waiting), t('metricWaiting')) : null,
          ),
          h(
            'div',
            { className: 'butler-progress' },
            h(
              'div',
              { className: 'butler-bar' },
              h('span', { style: { width: `${job.stats.progress}%` } }),
            ),
            h('span', null, fill(t('progress'), { done: job.stats.done, total: job.stats.total })),
          ),
        ),
        state.key === 'done'
          ? h(
              'div',
              { className: 'butler-complete' },
              '✓ ',
              fill(t('stateDone'), { done: job.stats.done, total: job.stats.total }),
            )
          : null,
        waiting
          ? h('div', { className: 'butler-needs-summary' }, fill(t('needsUserCount'), { n: waiting }))
          : null,
        job.note
          ? h('div', { className: `butler-note${state.key === 'done' ? ' done' : ''}` }, job.note)
          : null,
        job.status === 'done' && job.summary
          ? h('div', { className: 'butler-note done' }, h('b', null, `${t('summary')}：`), job.summary)
          : null,
        h(
          'div',
          { className: 'butler-toolbar', style: { marginTop: '2px' } },
          h(
            'div',
            {
              className: 'butler-label butler-timeline-toggle',
              role: 'button',
              tabIndex: 0,
              'aria-expanded': timelineOpen,
              onClick: () => setTimelineOpen((value) => !value),
              onKeyDown: (event) => {
                if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
                  event.preventDefault()
                  setTimelineOpen((value) => !value)
                }
              },
            },
            h('span', { className: 'butler-timeline-chevron' }, timelineOpen ? '▾' : '▸'),
            h('span', null, `${t('taskTimeline')} · ${cards.length}`),
          ),
          h(
            'div',
            { className: 'butler-toolbar-side' },
            timelineOpen
              ? h(
                  Btn,
                  {
                    small: true,
                    ghost: true,
                    onClick: () => setExpandAll((value) => !value),
                  },
                  expandAll ? t('collapseAll') : t('expandAll'),
                )
              : null,
          ),
        ),
        timelineOpen
          ? h(
              'div',
              { className: 'butler-timeline' },
              cards.length
                ? cards.map((card) =>
                    h(CardTile, {
                      key: card.id,
                      card,
                      job,
                      t,
                      nowTime,
                      busy,
                      openSession,
                      onAction,
                      expanded: expandAll || openIds.has(card.id) || Boolean(card.needsUser),
                      onToggle: () => toggleCard(card.id),
                      revising: revisingId === card.id,
                      revisionText,
                      setRevisionText,
                      onStartRevise: startRevise,
                      onCancelRevise: cancelRevise,
                      onSubmitRevise: submitRevise,
                      chatText: cardDraft(card.id),
                      setChatText: (value) => setCardDraft(card.id, value),
                      onSendChat: sendChat,
                      modelCatalog,
                      modelSelection,
                      onSelectModel: changeModel,
                      permissionCatalog,
                      permission,
                      onPermission: changePermission,
                      presetCatalog,
                      preset: currentPreset,
                      onPreset: changePreset,
                      onResolveApproval: resolveApproval,
                      onResolveQuestion: resolveQuestion,
                    }),
                  )
                : h('div', { className: 'butler-tl-empty' }, t('noCards')),
            )
          : h('div', { className: 'butler-tl-empty' }, fill(t('timelineCollapsed'), { n: cards.length })),
        h(
          'details',
          { className: 'butler-brief' },
          h('summary', null, t('brief')),
          h('p', null, job.brief),
        ),
        h(LogDetails, { log: job.log, t }),
        ),
      )
    }

    function shortPath(cwd) {
      const value = String(cwd || '').replace(/\\/g, '/').replace(/\/+$/, '')
      const parts = value.split('/').filter(Boolean)
      return parts[parts.length - 1] || value || '—'
    }

    function workspaceState(stats) {
      if (!stats.cards) return 'paused'
      if (stats.failed) return 'failed'
      if (stats.running) return 'running'
      if (stats.done === stats.cards) return 'done'
      return 'paused'
    }

    function WorkspaceSection({ t, cwd, jobs, defaultOpen, nowTime, busy, openSession, onAction, modelCatalog, permissionCatalog, presetCatalog }) {
      const [open, setOpen] = React.useState(defaultOpen)
      const stats = React.useMemo(() => {
        const cards = jobs.reduce((all, job) => all.concat(job.cards || []), [])
        return {
          groups: jobs.length,
          cards: cards.length,
          done: cards.filter((card) => card.status === 'done').length,
          running: cards.filter((card) =>
            ['starting', 'running', 'stalled', 'fixing', 'verifying'].includes(card.status),
          ).length,
          failed: cards.filter((card) => card.status === 'failed').length,
          waiting: cards.filter((card) => card.needsUser).length,
        }
      }, [jobs])
      const state = workspaceState(stats)
      return h(
        'section',
        { className: 'butler-workspace', 'data-state': state },
        h(
          'button',
          {
            type: 'button',
            className: 'butler-workspace-toggle',
            onClick: () => setOpen((value) => !value),
            'aria-expanded': open,
          },
          h(
            'div',
            { className: 'butler-workspace-head' },
            h(
              'div',
              { className: 'butler-workspace-name' },
              `${t('workspace')} · ${shortPath(cwd)}`,
            ),
            h('code', { className: 'butler-workspace-path', title: cwd }, cwd || t('unknownWorkspace')),
          ),
          h(
            'div',
            { className: 'butler-workspace-badges' },
            h('span', { className: 'butler-badge is-idle' }, fill(t('workspaceGroups'), { n: stats.groups })),
            h('span', { className: 'butler-badge is-idle' }, fill(t('workspaceNodes'), { n: stats.cards })),
            stats.running
              ? h('span', { className: 'butler-badge is-running' }, `${t('metricRunning')} ${stats.running}`)
              : null,
            stats.done
              ? h(
                  'span',
                  { className: 'butler-badge is-done' },
                  `${t('metricDone')} ${stats.done}/${stats.cards}`,
                )
              : null,
            stats.failed
              ? h('span', { className: 'butler-badge is-failed' }, `${t('metricFailed')} ${stats.failed}`)
              : null,
            stats.waiting
              ? h('span', { className: 'butler-badge is-warn' }, `${t('metricWaiting')} ${stats.waiting}`)
              : null,
            h('span', { className: 'butler-workspace-chevron' }, open ? '▾' : '▸'),
          ),
        ),
        open
          ? h(
              'div',
              { className: 'butler-workspace-body' },
              jobs.map((job) =>
                h(JobCard, {
                  key: job.id,
                  job,
                  t,
                  nowTime,
                  busy,
                  openSession,
                  onAction,
                  modelCatalog,
                  permissionCatalog,
                  presetCatalog,
                }),
              ),
            )
          : null,
      )
    }

    const HISTORY_MS = 1 * 24 * 60 * 60 * 1000
    const DRAFT_PREFIX = 'butler:draft:'
    const readDraft = (key) => {
      try {
        return window.localStorage.getItem(DRAFT_PREFIX + key) || ''
      } catch {
        return ''
      }
    }
    const writeDraft = (key, value) => {
      try {
        if (value) window.localStorage.setItem(DRAFT_PREFIX + key, value)
        else window.localStorage.removeItem(DRAFT_PREFIX + key)
      } catch {
        /* storage may be unavailable */
      }
    }
    const clearDraft = (key) => writeDraft(key, '')

    function WorkspaceList({ jobs, t, defaultCwd, nowTime, busy, openSession, onAction, modelCatalog, permissionCatalog, presetCatalog }) {
      const [historyOpen, setHistoryOpen] = React.useState(false)
      const groups = React.useMemo(() => {
        const map = new Map()
        for (const job of jobs) {
          const key = job.cwd || ''
          if (!map.has(key)) map.set(key, [])
          map.get(key).push(job)
        }
        return [...map.entries()]
          .map(([cwd, list]) => ({
            cwd,
            jobs: [...list].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)),
            latest: Math.max(
              0,
              ...list.flatMap((job) =>
                (job.cards || []).map((card) =>
                  Math.max(card.lastActivityAt || 0, card.createdAt || 0),
                ),
              ),
              ...list
                .filter((job) => !job.cards?.length)
                .map((job) => job.updatedAt || 0),
            ),
          }))
          .sort((a, b) => {
            const current = defaultCwd || ''
            const aCurrent = a.cwd === current
            const bCurrent = b.cwd === current
            if (aCurrent !== bCurrent) return aCurrent ? -1 : 1
            return b.latest - a.latest
          })
      }, [jobs, defaultCwd])
      const now = nowTime || Date.now()
      const activeGroups = groups.filter((group) => now - group.latest <= HISTORY_MS)
      const historyGroups = groups.filter((group) => now - group.latest > HISTORY_MS)
      const renderGroup = (group, index, historical) =>
        h(WorkspaceSection, {
          key: group.cwd || '__none__',
          t,
          cwd: group.cwd,
          jobs: group.jobs,
          defaultOpen: !historical && (index === 0 || (defaultCwd && group.cwd === defaultCwd)),
          nowTime,
          busy,
          openSession,
          onAction,
          modelCatalog,
          permissionCatalog,
          presetCatalog,
        })
      return h(
        React.Fragment,
        null,
        activeGroups.map((group, index) => renderGroup(group, index, false)),
        historyGroups.length
          ? h(
              'section',
              { className: 'butler-history' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'butler-workspace-toggle butler-history-toggle',
                  onClick: () => setHistoryOpen((value) => !value),
                  'aria-expanded': historyOpen,
                },
                h(
                  'div',
                  { className: 'butler-workspace-head' },
                  h('div', { className: 'butler-workspace-name' }, t('historyWorkspaces')),
                  h('code', { className: 'butler-workspace-path' }, t('historyHint')),
                ),
                h(
                  'div',
                  { className: 'butler-workspace-badges' },
                  h('span', { className: 'butler-badge is-idle' }, historyGroups.length),
                ),
                h('span', { className: 'butler-workspace-chevron' }, historyOpen ? '▾' : '▸'),
              ),
              historyOpen
                ? h(
                    'div',
                    { className: 'butler-history-body' },
                    historyGroups.map((group, index) => renderGroup(group, index, true)),
                  )
                : null,
            )
          : null,
      )
    }

    function SettingsBar({ t, settings, busy, onToggle }) {
      const items = [
        ['autoAdopt', 'autoAdopt'],
        ['autoJump', 'autoJump'],
        ['verifyConversations', 'autoVerify'],
        ['nudgeConversations', 'autoNudge'],
      ]
      return h(
        'section',
        { className: 'butler-card butler-intake', style: { padding: '11px 16px', gap: '6px' } },
        h(
          'div',
          { className: 'butler-label' },
          h('span', null, t('settingsTitle')),
          h('small', null, settings.autoJump ? t('autoJumpOnHint') : ''),
        ),
        h(
          'div',
          { className: 'butler-settings' },
          items.map(([key, label]) =>
            h(
              'label',
              { className: 'butler-switch', key },
              h('input', {
                type: 'checkbox',
                checked: Boolean(settings[key]),
                disabled: busy,
                onChange: (event) => onToggle(key, event.target.checked),
              }),
              t(label),
            ),
          ),
        ),
      )
    }

    function SessionPanel({ t, sessions, nowTime, busy, onAdopt, onAdoptRecent, onAdoptWorkspace, onAdoptAll }) {
      const [open, setOpen] = React.useState(false)
      const list = sessions || []
      const adopted = list.filter((session) => session.adoptedJobId)
      const unadopted = list.filter((session) => !session.adoptedJobId)
      const running = adopted.filter((session) => session.groupRunning || session.running)
      const completed = adopted.filter((session) => session.groupComplete && !session.groupRunning)
      const failed = adopted.filter((session) => session.groupFailed)
      const badgeFor = (session) => {
        if (!session.adoptedJobId) {
          return h('span', { className: 'butler-badge is-idle' }, t('unadoptedBadge'))
        }
        if (session.groupComplete && !session.groupRunning) {
          return h('span', { className: 'butler-badge is-done' }, t('groupDoneBadge'))
        }
        if (session.groupRunning || session.running) {
          return h('span', { className: 'butler-badge is-running' }, t('groupRunningBadge'))
        }
        if (session.groupFailed) {
          return h('span', { className: 'butler-badge is-failed' }, t('groupFailedBadge'))
        }
        return h('span', { className: 'butler-badge is-warn' }, t('groupPausedBadge'))
      }
      return h(
        'section',
        { className: 'butler-card butler-sessions' },
        h(
          'button',
          {
            type: 'button',
            className: 'butler-sessions-toggle',
            onClick: () => setOpen((value) => !value),
            'aria-expanded': open,
          },
          h(
            'div',
            { className: 'butler-session-badges' },
            h(
              'span',
              { className: 'butler-summary-title' },
              `${t('sessionsTitle')} · ${list.length}`,
            ),
            adopted.length
              ? h('span', { className: 'butler-badge is-idle' }, `${t('adoptedBadge')} ${adopted.length}`)
              : null,
            running.length
              ? h('span', { className: 'butler-badge is-running' }, `${t('groupRunningBadge')} ${running.length}`)
              : null,
            completed.length
              ? h('span', { className: 'butler-badge is-done' }, `${t('groupDoneBadge')} ${completed.length}`)
              : null,
            failed.length
              ? h('span', { className: 'butler-badge is-failed' }, `${t('groupFailedBadge')} ${failed.length}`)
              : null,
            unadopted.length
              ? h('span', { className: 'butler-badge is-warn' }, `${t('unadoptedBadge')} ${unadopted.length}`)
              : null,
          ),
          h(
            'span',
            { className: 'butler-session-toggle-action' },
            h('span', null, open ? t('sessionsClose') : t('sessionsOpen')),
            h('span', null, open ? '▾' : '▸'),
          ),
        ),
        !open
          ? h('div', { className: 'butler-sessions-collapsed-hint' }, t('sessionsToggleHint'))
          : null,
        open
          ? h(
              'div',
              null,
              h('p', { className: 'butler-sessions-hint' }, t('sessionsHint')),
              h(
                'div',
                { className: 'butler-row', style: { marginTop: '9px' } },
                h(Btn, { small: true, disabled: busy, onClick: onAdoptRecent }, t('adoptRecent')),
                h(Btn, { small: true, disabled: busy, onClick: onAdoptWorkspace }, t('adoptWorkspace')),
                h(Btn, { small: true, disabled: busy, onClick: onAdoptAll }, t('adoptAll')),
              ),
              h(
                'div',
                { className: 'butler-session-list' },
                list.length
                  ? list.map((session) =>
                      h(
                        'div',
                        { className: 'butler-session-row', key: session.id },
                        h(
                          'div',
                          { className: 'butler-session-main' },
                          h(
                            'div',
                            { className: 'butler-session-title', title: session.title },
                            session.title,
                            session.current ? ` · ${t('current')}` : '',
                          ),
                          h(
                            'div',
                            { className: 'butler-session-meta' },
                            h('code', { title: session.cwd || '' }, session.cwd || '—'),
                            h('span', null, ago(nowTime, session.updatedAt)),
                            session.running ? h('span', null, t('liveBadge')) : null,
                            session.groupTotal
                              ? h(
                                  'span',
                                  null,
                                  `${session.groupDone || 0}/${session.groupTotal} ${t('metricDone')}`,
                                )
                              : null,
                          ),
                        ),
                        h(
                          'div',
                          { className: 'butler-session-actions' },
                          h(
                            'div',
                            { className: 'butler-session-badges' },
                            session.adoptedJobId
                              ? h('span', { className: 'butler-badge is-idle' }, t('adoptedBadge'))
                              : null,
                            badgeFor(session),
                          ),
                          session.adoptedJobId
                            ? null
                            : h(
                                Btn,
                                {
                                  small: true,
                                  disabled: busy,
                                  onClick: () => onAdopt(session.id),
                                },
                                t('adopt'),
                              ),
                        ),
                      ),
                    )
                  : h('div', { className: 'butler-session-meta' }, t('noSessions')),
              ),
            )
          : null,
      )
    }

    function Intake({ t, brief, setBrief, cwd, setCwd, busy, error, onSubmit, onPickDirectory }) {
      return h(
        'section',
        { className: 'butler-card butler-intake' },
        error ? h('div', { className: 'butler-alert' }, `${t('error')}：${error}`) : null,
        h(
          'div',
          { className: 'butler-label' },
          h('span', null, t('intake')),
          h('small', null, t('permissions')),
        ),
        h('textarea', {
          className: 'butler-textarea',
          value: brief,
          placeholder: t('placeholder'),
          onChange: (event) => setBrief(event.target.value),
          onKeyDown: (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
              event.preventDefault()
              onSubmit()
            }
          },
          'aria-label': t('intake'),
        }),
        h(
          'div',
          { className: 'butler-row' },
          h(
            'div',
            { className: 'butler-field' },
            h('span', null, t('workdir')),
            h(
              'div',
              { className: 'butler-workdir-row' },
              h('input', {
                className: 'butler-input',
                value: cwd,
                placeholder: t('chooseWorkspaceHint'),
                onChange: (event) => setCwd(event.target.value),
                spellCheck: false,
              }),
              onPickDirectory
                ? h(
                    Btn,
                    {
                      small: true,
                      ghost: true,
                      onClick: async () => {
                        try {
                          const picked = await onPickDirectory()
                          if (picked) setCwd(picked)
                        } catch {
                          /* the native picker may be cancelled */
                        }
                      },
                    },
                    t('chooseFolder'),
                  )
                : null,
            ),
            cwd.trim()
              ? null
              : h('div', { className: 'butler-field-hint' }, t('chooseWorkspaceFirst')),
          ),
          h(
            Btn,
            { tone: 'primary', disabled: busy || !brief.trim() || !cwd.trim(), onClick: onSubmit },
            busy ? t('starting') : t('start'),
          ),
        ),
      )
    }

    function HowItWorks({ t }) {
      return h(
        'div',
        { className: 'butler-how' },
        h(
          'div',
          { className: 'butler-how-item' },
          h('div', { className: 'butler-how-title' }, h('b', null, '1'), t('how1')),
          h('p', null, t('how1d')),
        ),
        h(
          'div',
          { className: 'butler-how-item' },
          h('div', { className: 'butler-how-title' }, h('b', null, '2'), t('how2')),
          h('p', null, t('how2d')),
        ),
        h(
          'div',
          { className: 'butler-how-item' },
          h('div', { className: 'butler-how-title' }, h('b', null, '3'), t('how3')),
          h('p', null, t('how3d')),
        ),
      )
    }

    const jobActivity = (job) =>
      Math.max(
        0,
        ...((job?.cards || []).map((card) =>
          Math.max(card.lastActivityAt || 0, card.createdAt || 0),
        ) || []),
      )
    const jobSnapshot = (job) => ({
      activity: jobActivity(job),
      status: job?.status || '',
      needsUser: Boolean(
        (job?.cards || []).some((card) => card.needsUser?.requestId),
      ),
    })

    function navigationReturn(track, job, now = Date.now()) {
      if (!track) return 'none'
      const active = Boolean(
        job &&
          (job.liveTurn?.open ||
            (job.cards || []).some(
              (card) => card.turnOpen || card.needsUser?.requestId,
            )),
      )
      const snapshot = jobSnapshot(job)
      const changed = Boolean(
        track.baseline &&
          (snapshot.activity > track.baseline.activity ||
            snapshot.status !== track.baseline.status ||
            snapshot.needsUser !== track.baseline.needsUser),
      )
      if (active || changed) track.sawOpen = true
      if (track.sawOpen && !active) return 'return'
      if (!track.sawOpen && now - track.at > 300000) return 'expire'
      return 'wait'
    }

    function BoardView({ jobs, t }) {
      const columns = [
        { key: 'pending', label: 'boardPending', states: ['queued'] },
        { key: 'running', label: 'boardRunning', states: ['starting', 'running', 'fixing'] },
        { key: 'verifying', label: 'boardVerifying', states: ['verifying'] },
        { key: 'done', label: 'boardDone', states: ['done', 'skipped'] },
        { key: 'blocked', label: 'boardBlocked', states: ['stalled', 'failed', 'blocked'] },
      ]
      const items = jobs.flatMap((job) =>
        (job.cards || []).map((card) => ({ job, card })),
      )
      return h(
        'div',
        { className: 'butler-board' },
        columns.map((column) => {
          const cards = items.filter(({ card }) => column.states.includes(card.status))
          return h(
            'section',
            { className: `butler-board-col is-${column.key}`, key: column.key },
            h(
              'div',
              { className: 'butler-board-head' },
              h('span', null, t(column.label)),
              h('b', null, cards.length),
            ),
            cards.length
              ? cards.map(({ job, card }) =>
                  h(
                    'div',
                    { className: 'butler-board-card', key: `${job.id}:${card.id}` },
                    h('div', { className: 'butler-board-job' }, job.title),
                    h('div', { className: 'butler-board-title' }, card.title),
                    card.dependsOn?.length
                      ? h(
                          'div',
                          { className: 'butler-board-meta' },
                          `${t('dependencyLabel')} ${card.dependsOn.length}`,
                        )
                      : null,
                    card.status === 'blocked' && card.blockedReason
                      ? h('div', { className: 'butler-board-blocked' }, card.blockedReason)
                      : null,
                  ),
                )
              : h('div', { className: 'butler-board-empty' }, t('boardEmpty')),
          )
        }),
      )
    }

    function ButlerPage(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => (zh[key] || key)
      const returnTrack = React.useRef(null)
      const openSession = (id) => {
        const job = (data?.jobs || []).find((item) => item.sessionId === id)
        returnTrack.current = {
          sessionId: id,
          baseline: jobSnapshot(job),
          sawOpen: false,
          at: Date.now(),
        }
        try {
          props.openSession?.(id)
        } catch {
          /* navigation is best-effort */
        }
      }
      const [data, setData] = React.useState(null)
      const [error, setError] = React.useState('')
      const [busy, setBusy] = React.useState('')
      const [refreshing, setRefreshing] = React.useState(false)
      const [notice, setNotice] = React.useState('')
      const [brief, setBrief] = React.useState('')
      const [cwd, setCwd] = React.useState('')
      const [filter, setFilter] = React.useState('all')
      const [viewMode, setViewMode] = React.useState('timeline')
      const waitingSeen = React.useRef(false)

      const load = React.useCallback(async () => {
        try {
          const response = await fetch(`${API}/state`, { headers: HEADERS, cache: 'no-store' })
          const payload = await response.json()
          if (!response.ok || !payload.ok) throw new Error(payload.error || `HTTP ${response.status}`)
          setData(payload.data)
          setError('')
        } catch (err) {
          setError(err?.message || String(err))
        }
      }, [])

      React.useEffect(() => {
        void load()
        const timer = setInterval(() => {
          void load()
        }, 1500)
        return () => clearInterval(timer)
      }, [load])

      React.useEffect(() => {
        const waiting = (data?.jobs || []).flatMap((job) =>
          (job.cards || [])
            .filter((card) => card.needsUser?.requestId)
            .map((card) => ({ job, card })),
        )
        if (waiting.length) {
          if (!waitingSeen.current) {
            waitingSeen.current = true
            const first = waiting[0]
            const sessionId = first.card.sessionId || first.job.sessionId
            if (sessionId) openSession(sessionId)
          }
        } else if (waitingSeen.current) {
          waitingSeen.current = false
          returnTrack.current = null
          props.returnToButler?.()
        }
      }, [data])

      React.useEffect(() => {
        const track = returnTrack.current
        if (!track) return
        const job = (data?.jobs || []).find((item) => item.sessionId === track.sessionId)
        const decision = navigationReturn(track, job)
        if (decision === 'return') {
          returnTrack.current = null
          props.returnToButler?.()
        } else if (decision === 'expire') {
          returnTrack.current = null
        }
      }, [data])

      const act = React.useCallback(
        async (action, payload, key) => {
          setBusy(key || action)
          setError('')
          try {
            const response = await fetch(`${API}/action`, {
              method: 'POST',
              headers: { ...HEADERS, 'content-type': 'application/json' },
              body: JSON.stringify({ action, ...(payload || {}) }),
            })
            const result = await response.json()
            if (!response.ok || !result.ok) throw new Error(result.error || `HTTP ${response.status}`)
            await load()
            return result.data
          } catch (err) {
            setError(err?.message || String(err))
            return null
          } finally {
            setBusy('')
          }
        },
        [load],
      )

      const announce = (text) => {
        setNotice(text)
        setTimeout(() => setNotice(''), 3200)
      }
      const refreshNow = async () => {
        setRefreshing(true)
        await load()
        setRefreshing(false)
        announce(t('refreshed'))
      }
      const clearFinished = () => {
        if (!window.confirm(t('confirmClearFinished'))) return
        void act('clearFinished', {}, 'clear').then((result) => {
          if (!result) return
          const removed = Number(result.removed) || 0
          announce(
            removed > 0 ? fill(t('cleared'), { n: removed }) : t('nothingToClear'),
          )
        })
      }

      const submit = () => {
        const value = brief.trim()
        if (!value || busy) return
        if (!cwd.trim()) {
          setError(t('chooseWorkspaceFirst'))
          return
        }
        void act('createJob', { brief: value, cwd: cwd.trim() }, 'create').then((created) => {
          if (created) setBrief('')
        })
      }

      const toggleSetting = (key, value) => {
        const current = data?.settings || {}
        void act('updateSettings', { settings: { ...current, [key]: value } }, `setting:${key}`)
      }

      const adoptSession = (sessionId) => {
        void act('adoptSession', { sessionId }, `adopt:${sessionId}`).then((job) => {
          if (job) setFilter('session')
        })
      }

      const adoptRecent = () => {
        void act('adoptRecent', {}, 'adoptRecent').then((job) => {
          if (job) setFilter('session')
        })
      }

      const adoptWorkspace = () => {
        void act('adoptWorkspace', {}, 'adoptWorkspace').then((result) => {
          if (result) setFilter('session')
        })
      }

      const adoptAll = () => {
        void act('adoptAll', {}, 'adoptAll').then((result) => {
          if (result) setFilter('session')
        })
      }

      const nowTime = data?.now || Date.now()
      const jobs = data?.jobs || []
      const sessions = data?.sessions || []
      const settings = data?.settings || {}
      const running = jobs.reduce((count, job) => count + (job.stats?.running || 0), 0)
      const stalled = jobs.reduce(
        (count, job) => count + job.cards.filter((card) => card.status === 'stalled').length,
        0,
      )
      const waiting = jobs.reduce(
        (count, job) => count + job.cards.filter((card) => card.needsUser).length,
        0,
      )
      const groups = jobs.filter((job) => job.kind === 'session').length
      const counts = {
        all: jobs.length,
        brief: jobs.filter((job) => job.kind !== 'session').length,
        session: groups,
      }
      const visibleJobs = filter === 'all' ? jobs : jobs.filter((job) => (job.kind || 'brief') === filter)
      const filterLabels = { all: 'filterAll', brief: 'filterBrief', session: 'filterSession' }

      return h(
        'div',
        { className: 'butler-page' },
        h('style', { key: 'butler-style' }, CSS),
        props.topbar ? props.topbar() : null,
        h(
          'header',
          { className: 'butler-head' },
          h(
            'div',
            { className: 'butler-brand' },
            h('div', { className: 'butler-mark' }, h(ButlerMark, { size: 24 })),
            h(
              'div',
              { className: 'butler-brandtext' },
              h('div', { className: 'butler-kicker' }, t('kicker')),
              h('div', { className: 'butler-title' }, t('heading')),
            ),
          ),
          h(
            'div',
            { className: 'butler-headside' },
            data
              ? h(
                  'span',
                  { className: 'butler-live' },
                  h('i', {
                    style:
                      waiting || stalled
                        ? { background: 'var(--dsw-alias-state-warn-primary)' }
                        : undefined,
                  }),
                  waiting
                    ? fill(t('needsUserCount'), { n: waiting })
                    : stalled
                      ? fill(t('liveStalled'), { running, stalled })
                      : running
                        ? fill(t('runningNow'), { n: running })
                        : groups
                          ? fill(t('groupsCount'), { n: groups })
                          : t('ready'),
                )
              : h('span', { className: 'butler-live' }, h('i'), t('loading')),
            settings.autoJump
              ? h('span', { className: 'butler-pill butler-tone-run' }, t('autoJump'))
              : null,
            h(
              Btn,
              {
                small: true,
                ghost: true,
                disabled: refreshing,
                onClick: () => void refreshNow(),
              },
              refreshing ? t('refreshing') : t('refresh'),
            ),
            h(
              Btn,
              {
                small: true,
                ghost: true,
                disabled: busy,
                onClick: clearFinished,
              },
              t('clear'),
            ),
            notice ? h('span', { className: 'butler-live' }, notice) : null,
          ),
        ),
        h(
          'div',
          { className: 'butler-scroll' },
          h(
            'div',
            { className: 'butler-inner' },
            h(Intake, {
              t,
              brief,
              setBrief,
              cwd,
              setCwd,
              busy: busy === 'create',
              error,
              onSubmit: submit,
              onPickDirectory: props.pickDirectory,
            }),
            h(SettingsBar, {
              t,
              settings,
              busy: Boolean(busy),
              onToggle: toggleSetting,
            }),
            h(
              'div',
              { className: 'butler-toolbar' },
              h(
                'div',
                { className: 'butler-tabs' },
                ['all', 'brief', 'session'].map((key) =>
                  h(
                    'button',
                    {
                      type: 'button',
                      key,
                      className: `butler-tab${filter === key ? ' is-active' : ''}`,
                      onClick: () => setFilter(key),
                    },
                    t(filterLabels[key]),
                    h('b', null, counts[key]),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'butler-tabs' },
                ['timeline', 'board'].map((key) =>
                  h(
                    'button',
                    {
                      type: 'button',
                      key,
                      className: `butler-tab${viewMode === key ? ' is-active' : ''}`,
                      onClick: () => setViewMode(key),
                    },
                    key === 'board' ? t('viewBoard') : t('viewTimeline'),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'butler-toolbar-side' },
                h(Btn, { small: true, disabled: Boolean(busy), onClick: adoptRecent }, t('adoptRecent')),
                h(Btn, { small: true, disabled: Boolean(busy), onClick: adoptWorkspace }, t('adoptWorkspace')),
              ),
            ),
            data
              ? h(SessionPanel, {
                  t,
                  sessions,
                  nowTime,
                  busy: Boolean(busy),
                  onAdopt: adoptSession,
                  onAdoptRecent: adoptRecent,
                  onAdoptWorkspace: adoptWorkspace,
                  onAdoptAll: adoptAll,
                })
              : null,
            viewMode === 'board'
              ? h(BoardView, { jobs: visibleJobs, t })
              : visibleJobs.length
              ? h(WorkspaceList, {
                  jobs: visibleJobs,
                  t,
                  defaultCwd: data?.defaultCwd || '',
                  nowTime,
                  busy: Boolean(busy),
                  openSession,
                  onAction: act,
                  modelCatalog: data?.modelCatalog || null,
                  permissionCatalog: data?.permissionCatalog || null,
                  presetCatalog: data?.presetCatalog || null,
                })
              : h(
                  'div',
                  { className: 'butler-empty' },
                  h(ButlerMark, { size: 42 }),
                  h('h3', null, t('emptyTitle')),
                  h('p', null, t('emptyBody')),
                ),
            h(HowItWorks, { t }),
            data?.storageFile
              ? h('div', { className: 'butler-foot' }, `${t('storage')} · ${data.storageFile}`)
              : null,
          ),
        ),
      )
    }

    function ButlerTopbarV2({ t, ctx, enterFullscreen, exitFullscreen }) {
      const [open, setOpen] = React.useState(false)
      const [accountOpen, setAccountOpen] = React.useState(false)
      const [accountName, setAccountName] = React.useState('')
      const [accountSignedOut, setAccountSignedOut] = React.useState(false)
      const [panels, setPanels] = React.useState([])
      const rootRef = React.useRef(null)

      const click = (selector) => document.querySelector(selector)?.click()
      const listButtons = (selector) =>
        Array.from(new Set(document.querySelectorAll(selector)))
      const accountTrigger = () => {
        const area = document.querySelector('[class*="_settingsArea"]')
        return (
          area?.querySelector('button[aria-haspopup="menu"]') ||
          document.querySelector('button[aria-haspopup="menu"]')
        )
      }
      const openSettings = () => {
        console.log('[butler] account action: settings')
        const area = document.querySelector('[class*="_settingsArea"]')
        const button =
          area?.querySelector('button[aria-haspopup="dialog"]') ||
          area?.querySelector('button,[role="button"]')
        if (!button) return
        const fiberKey = Object.getOwnPropertyNames(button).find((key) =>
          key.startsWith('__reactFiber$'),
        )
        let fiber = fiberKey ? button[fiberKey] : null
        while (fiber) {
          const props = fiber.memoizedProps
          if (props && typeof props.actions?.open === 'function') {
            props.actions.open()
            return
          }
          if (props && typeof props.openSettings === 'function') {
            props.openSettings()
            return
          }
          fiber = fiber.return
        }
        const propsKey = Object.getOwnPropertyNames(button).find((key) =>
          key.startsWith('__reactProps$'),
        )
        const onClick = propsKey ? button[propsKey]?.onClick : undefined
        if (typeof onClick === 'function') {
          onClick({
            currentTarget: button,
            target: button,
            preventDefault() {},
            stopPropagation() {},
          })
          return
        }
        button.click()
      }
      const refreshAccount = () => {
        const trigger = accountTrigger()
        const label =
          trigger?.querySelector('span:last-child')?.textContent.trim() ||
          trigger?.textContent.trim()
        setAccountName(label || t('account'))
        setAccountSignedOut(trigger?.getAttribute('data-signed-out') === 'true')
      }
      const clickNativeAccountItem = (index) => {
        console.log('[butler] account action: native menu item', index)
        const trigger = accountTrigger()
        if (!trigger) return
        trigger.click()
        setTimeout(() => {
          const items = [...document.querySelectorAll('[role="menuitem"]')]
          items[index]?.click()
        }, 80)
      }
      const openUpdate = () => {
        const updates = window.dshDesktop?.updates
        console.log('[butler] account action: update', {
          hasBridge: Boolean(updates && typeof updates.open === 'function'),
        })
        if (updates && typeof updates.open === 'function') {
          Promise.resolve(updates.open()).then(
            (result) => console.log('[butler] updates.open resolved', result),
            (error) => console.error('[butler] update failed', error),
          )
        } else {
          openSettings()
        }
      }
      const refresh = () => {
        setPanels(
          listButtons('nav[aria-label] button,nav[aria-label] [role="button"]').map(
            (button, index) => ({
              index,
              label:
                button.getAttribute('aria-label') ||
                button.textContent.trim() ||
                `Panel ${index + 1}`,
            }),
          ),
        )
      }
      const close = () => {
        setOpen(false)
        setAccountOpen(false)
      }
      const run = (handler) => {
        close()
        handler()
      }

      React.useEffect(() => {
        const onDocumentClick = (event) => {
          if (!rootRef.current?.contains(event.target)) close()
        }
        const onKeyDown = (event) => {
          if (event.key === 'Escape') close()
        }
        document.addEventListener('click', onDocumentClick)
        document.addEventListener('keydown', onKeyDown)
        return () => {
          document.removeEventListener('click', onDocumentClick)
          document.removeEventListener('keydown', onKeyDown)
        }
      }, [])

      const baseButton = {
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-1)',
        color: 'var(--dsw-alias-label-primary)',
        borderRadius: '8px',
        padding: '5px 11px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        font: 'inherit',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 8px rgba(0,0,0,.12)',
        pointerEvents: 'auto',
        WebkitAppRegion: 'no-drag',
        webkitAppRegion: 'no-drag',
      }
      const itemStyle = {
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: '0',
        background: 'transparent',
        color: 'var(--dsw-alias-label-primary)',
        borderRadius: '7px',
        padding: '7px 9px',
        font: 'inherit',
        fontSize: '12px',
        cursor: 'pointer',
        pointerEvents: 'auto',
        WebkitAppRegion: 'no-drag',
        webkitAppRegion: 'no-drag',
      }
      const item = (label, handler, key) =>
        h(
          'button',
          {
            key,
            type: 'button',
            style: itemStyle,
            onMouseEnter: (event) => {
              event.currentTarget.style.background = 'var(--dsw-alias-interactive-bg-hover)'
            },
            onMouseLeave: (event) => {
              event.currentTarget.style.background = 'transparent'
            },
            onClick: (event) => {
              event.stopPropagation()
              run(handler)
            },
          },
          label,
        )

      return h(
        'div',
        {
          ref: rootRef,
          'data-butler-topbar': '1',
          style: {
            position: 'fixed',
            top: '46px',
            right: /Electron/i.test(navigator.userAgent) ? '180px' : '12px',
            zIndex: '2147483647',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            maxWidth: 'calc(100vw - 24px)',
            pointerEvents: 'auto',
            WebkitAppRegion: 'no-drag',
            webkitAppRegion: 'no-drag',
          },
        },
        h(
          'button',
          {
            type: 'button',
            style: baseButton,
            onClick: (event) => {
              event.stopPropagation()
              setAccountOpen(false)
              if (open) {
                close()
              } else {
                refresh()
                setOpen(true)
              }
            },
          },
          t('management'),
        ),
        h(
          'button',
          {
            type: 'button',
            style: baseButton,
            'data-butler-account': '1',
            'aria-label': t('account'),
            onClick: (event) => {
              event.stopPropagation()
              setOpen(false)
              if (accountOpen) {
                setAccountOpen(false)
              } else {
                refreshAccount()
                setAccountOpen(true)
              }
            },
          },
          h('span', null, t('account')),
          h('span', {
            'data-butler-update-badge': '1',
            style: {
              display: 'none',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--dsw-alias-brand-primary)',
              flex: 'none',
            },
          }),
        ),
        open
          ? h(
              'div',
              {
                style: {
                  position: 'absolute',
                  top: '34px',
                  right: '0',
                  minWidth: '180px',
                  maxHeight: '62vh',
                  overflowY: 'auto',
                  padding: '6px',
                  border: '1px solid var(--dsw-alias-border-l1)',
                  borderRadius: '10px',
                  background: 'var(--dsw-alias-bg-layer-1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,.24)',
                  WebkitAppRegion: 'no-drag',
                  webkitAppRegion: 'no-drag',
                },
              },
              h(
                'div',
                {
                  style: {
                    padding: '5px 9px 7px',
                    fontWeight: '700',
                    color: 'var(--dsw-alias-brand-primary)',
                    fontSize: '12px',
                  },
                },
                t('managementMenu'),
              ),
              item(
                t('managementNew'),
                () => {
                  click('[class*="_newSession"]')
                  setTimeout(enterFullscreen, 300)
                },
                'new',
              ),
              item(
                t('managementButler'),
                () => {
                  exitFullscreen()
                  ctx.layout.selectPanel('butler')
                },
                'butler',
              ),
              panels
                .filter(
                  (panel) =>
                    panel.label !== t('managementButler') &&
                    !panel.label.startsWith('__TEST_') &&
                    !/^Panel \d+$/.test(panel.label) &&
                    !/第\s*\d+\s*轮/.test(panel.label) &&
                    !panel.label.includes('加载并跳转'),
                )
                .map((panel) =>
                  item(
                    panel.label,
                    () => {
                      exitFullscreen()
                      listButtons(
                        'nav[aria-label] button,nav[aria-label] [role="button"]',
                      )[panel.index]?.click()
                    },
                    `panel-${panel.index}`,
                  ),
                ),
              item(
                t('managementSettings'),
                () => {
                  exitFullscreen()
                  openSettings()
                },
                'settings',
              ),
            )
          : null,
        accountOpen
          ? h(
              'div',
              {
                style: {
                  position: 'absolute',
                  top: '34px',
                  right: '0',
                  minWidth: '200px',
                  maxHeight: '62vh',
                  overflowY: 'auto',
                  padding: '6px',
                  border: '1px solid var(--dsw-alias-border-l1)',
                  borderRadius: '10px',
                  background: 'var(--dsw-alias-bg-layer-1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,.24)',
                  WebkitAppRegion: 'no-drag',
                  webkitAppRegion: 'no-drag',
                },
              },
              h(
                'div',
                {
                  style: {
                    padding: '5px 9px 7px',
                    borderBottom: '1px solid var(--dsw-alias-border-l1)',
                    marginBottom: '4px',
                  },
                },
                h(
                  'div',
                  {
                    style: {
                      fontWeight: '700',
                      color: 'var(--dsw-alias-label-primary)',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  },
                  accountName,
                ),
                h(
                  'div',
                  {
                    style: {
                      color: 'var(--dsw-alias-label-secondary)',
                      fontSize: '11px',
                      marginTop: '2px',
                    },
                  },
                  t('accountCurrent'),
                ),
              ),
              item(t('managementSettings'), openSettings, 'account-settings'),
              item(
                t('accountFeedback'),
                () => clickNativeAccountItem(1),
                'account-feedback',
              ),
              item(
                accountSignedOut ? t('accountSignIn') : t('accountSignOut'),
                () => clickNativeAccountItem(2),
                'account-auth',
              ),
              item(t('accountUpdate'), openUpdate, 'account-update'),
            )
          : null,
      )
    }

    function apply(ctx) {
      ctx.effect(
        () =>
          ctx.locale.register(NS, {
            zh,
            en,
          }),
        'butler: locale',
      )
      const t = ctx.locale.bind(NS)
      const enterConversationFullscreen = () => {}
      const exitConversationFullscreen = () => {}
      ctx.effect(() => {
        document.getElementById('butler-debug')?.remove()
        document.getElementById('butler-test-panel')?.remove()
        document
          .querySelectorAll('[aria-label="__TEST_PLUGIN__"]')
          .forEach((node) => node.remove())
        document.querySelectorAll('*').forEach((node) => {
          if (node.style.top === '42px' && node.style.right === '180px') {
            ;['position', 'top', 'right', 'left', 'bottom', 'transform', 'z-index'].forEach(
              (name) => node.style.removeProperty(name),
            )
          }
        })
        const applied = []
        const style = document.createElement('style')
        style.dataset.butlerFullWidth = '1'
        style.textContent =
          '[class*="_sidebarCol"]{visibility:hidden!important;pointer-events:none!important;}' +
          'div[class*="_frame"]{grid-template-columns:0 minmax(0,1fr) 0!important;}'
        document.head.appendChild(style)
        const restore = () => {
          applied.forEach((node) => {
            node.style.removeProperty('visibility')
            node.style.removeProperty('pointer-events')
            node.style.removeProperty('grid-template-columns')
            if (node.dataset.butlerVisibility) node.style.visibility = node.dataset.butlerVisibility
            if (node.dataset.butlerPointer) node.style.pointerEvents = node.dataset.butlerPointer
            if (node.dataset.butlerColumns) node.style.gridTemplateColumns = node.dataset.butlerColumns
            delete node.dataset.butlerFullWidth
            delete node.dataset.butlerVisibility
            delete node.dataset.butlerPointer
            delete node.dataset.butlerColumns
          })
          applied.length = 0
        }
        const setImportantIfChanged = (node, name, value) => {
          if (
            node.style.getPropertyValue(name) === value &&
            node.style.getPropertyPriority(name) === 'important'
          ) {
            return
          }
          node.style.setProperty(name, value, 'important')
        }
        const apply = () => {
          if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
          document.querySelectorAll('[data-shell-overlay]').forEach((node) => {
            setImportantIfChanged(node, 'position', 'fixed')
            setImportantIfChanged(node, 'inset', '0')
            setImportantIfChanged(node, 'z-index', '2147483647')
            setImportantIfChanged(node, 'overflow', 'visible')
            setImportantIfChanged(node, 'pointer-events', 'none')
          })
          document.querySelectorAll('[class*="_sidebarCol"]').forEach((node) => {
            if (!node.dataset.butlerFullWidth) {
              node.dataset.butlerFullWidth = '1'
              node.dataset.butlerVisibility = node.style.visibility || ''
              node.dataset.butlerPointer = node.style.pointerEvents || ''
              node.style.setProperty('visibility', 'hidden', 'important')
              node.style.setProperty('pointer-events', 'none', 'important')
              applied.push(node)
            }
            const frame =
              node.closest('div[class*="_frame"]') || node.parentElement
            if (frame && !frame.dataset.butlerFullWidth) {
              frame.dataset.butlerFullWidth = '1'
              frame.dataset.butlerColumns = frame.style.gridTemplateColumns || ''
              frame.style.setProperty('grid-template-columns', '0 minmax(0,1fr) 0', 'important')
              applied.push(frame)
            }
          })
        }
        apply()
        const timer = setInterval(apply, 500)
        return () => {
          clearInterval(timer)
          style.remove()
          restore()
        }
      }, 'butler: permanent full width layout')

      ctx.effect(() => {
        let updates
        try {
          updates = window.dshDesktop?.updates
        } catch {
          return
        }
        if (!updates) return
        let active = false
        let version = ''
        let badge
        const ensure = () => {
          try {
            const account = document.querySelector('[data-butler-account]')
            if (!account) return
            badge = account.querySelector('[data-butler-update-badge]')
            const title = active
              ? `${t('account')} · ${t('accountUpdate')}${version ? ` ${version}` : ''}`
              : t('account')
            const aria = active ? `${t('account')} · ${t('accountUpdate')}` : t('account')
            if (account.title !== title) account.title = title
            if (account.getAttribute('aria-label') !== aria) account.setAttribute('aria-label', aria)
            if (badge) {
              const display = active ? 'inline-block' : 'none'
              if (badge.style.display !== display) badge.style.display = display
            }
          } catch {}
        }
        const applyState = (presentation) => {
          try {
            active = Boolean(presentation?.phase && presentation.phase !== 'idle')
            version = presentation?.version || ''
            ensure()
          } catch {}
        }
        let unsubscribe
        try {
          unsubscribe = updates.subscribe?.(applyState)
        } catch {}
        Promise.resolve()
          .then(() => updates.status?.())
          .then(applyState, () => {})
        const timer = setInterval(ensure, 1000)
        return () => {
          clearInterval(timer)
          if (typeof unsubscribe === 'function') unsubscribe()
          const account = document.querySelector('[data-butler-account]')
          if (account) {
            account.removeAttribute('title')
            account.setAttribute('aria-label', t('account'))
          }
        }
      }, 'butler: account update badge')

      ctx.effect(() => {
        const onKeyDown = (event) => {
          if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'b') {
            event.preventDefault()
            exitConversationFullscreen()
            ctx.layout.selectPanel('butler')
          }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
      }, 'butler: keyboard shortcut')
      ctx.effect(() => {
        let disposed = false
        let lastToken = null
        const check = async () => {
          try {
            const response = await fetch(`${API}/state`, { headers: HEADERS, cache: 'no-store' })
            const payload = await response.json()
            if (!payload.ok || disposed) return
            const token = payload.data?.autoJump?.at || 0
            if (lastToken == null) {
              lastToken = token
              return
            }
            if (token > lastToken) {
              lastToken = token
              const visible = typeof document === 'undefined' || document.visibilityState === 'visible'
              if (payload.data?.settings?.autoJump && visible) {
                try {
                  exitConversationFullscreen()
                  ctx.layout.selectPanel('butler')
                } catch {
                  /* the layout service may be unavailable while booting */
                }
              }
            }
          } catch {
            /* the bridge may be temporarily unavailable */
          }
        }
        void check()
        const timer = setInterval(check, 4000)
        return () => {
          disposed = true
          clearInterval(timer)
        }
      }, 'butler: auto-jump watcher')
      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: 'butler',
            locale: NS,
            inject: () => ({
              t,
              pickDirectory: () => ctx.uiWorkspace.pickDirectory(),
              topbar: () =>
                h(ButlerTopbarV2, {
                  t,
                  ctx,
                  enterFullscreen: enterConversationFullscreen,
                  exitFullscreen: exitConversationFullscreen,
                }),
              openSession: (sessionId) => {
                console.log('[butler] ButlerPage openSession', sessionId)
                enterConversationFullscreen()
                try {
                  const result = ctx.uiWorkspace.openSession(sessionId)
                  console.log('[butler] ctx.uiWorkspace.openSession called', sessionId)
                  return result
                } catch {
                  /* the session may no longer be openable */
                }
              },
              returnToButler: () => {
                try {
                  exitConversationFullscreen()
                  ctx.layout.selectPanel('butler')
                } catch {
                  /* the layout service may be unavailable */
                }
              },
            }),
          },
          ButlerPage,
        ),
      )
      ctx.slots.inject('shell.overlay', () =>
        ctx.slots.register(
          {
            name: 'shell.overlay',
            id: 'butler-topbar',
            order: -100,
          },
          () =>
            React.createElement(ButlerTopbarV2, {
              t,
              ctx,
              enterFullscreen: enterConversationFullscreen,
              exitFullscreen: exitConversationFullscreen,
            }),
        ),
      )
      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: 'butler',
            order: 8,
            locale: NS,
            label: () => t('panelTitle'),
          },
          ButlerIcon,
        ),
      )
      ctx.slots.inject('conversation.input.right', () =>
        ctx.slots.register(
          {
            name: 'conversation.input.right',
            id: 'butler-open',
            order: 30,
          },
          () =>
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  exitConversationFullscreen()
                  ctx.layout.selectPanel('butler')
                },
                title: t('managementButler'),
                style: {
                  border: '1px solid var(--dsw-alias-brand-primary)',
                  background: 'var(--dsw-alias-bg-layer-1)',
                  color: 'var(--dsw-alias-brand-primary)',
                  borderRadius: '999px',
                  padding: '3px 9px',
                  font: 'inherit',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                },
              },
              t('managementButler'),
            ),
        ),
      )
    }

    return {
      inject: ['slots', 'locale', 'uiWorkspace', 'layout'],
      apply,
    }
  },
})






