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
      chooseWorkspace: '选择已有工作区',
      chooseWorkspaceFirst: '请先选择要交办的工作区文件夹',
      start: '拆解开工',
      starting: '管家拆解中…',
      activeTaskKicker: 'CURRENT OPERATION',
      activeTask: '当前执行',
      taskRunning: '执行中',
      taskVerifying: '核对中',
      taskQueued: '排队中',
      taskPlanning: '拆解中',
      taskQueuedCount: '另有 {n} 个排队',
      taskRunningLane: '进行中',
      taskCompletedLane: '已完成',
      taskNoRunning: '暂无进行中任务',
      taskNoCompleted: '暂无已完成任务',
      taskClearCompleted: '清空已完成',
      taskExpandHint: '悬浮或点击展开全部',
      archiveTitle: '已完成工作',
      archiveButton: '已完成记录',
      archiveSub: '按完成时间倒序排列；选择左侧事项查看回复结果',
      archiveBack: '返回卡片工坊',
      archiveEmpty: '暂无已完成工作',
      archiveSelect: '从左侧选择一项已完成工作',
      archiveSummary: '完成摘要',
      archiveResult: '回复结果',
      archiveEvidence: '证据',
      archiveOpen: '打开对应对话',
      archiveCount: '{n} 项已完成',
      archiveClearAll: '全部清理',
      archiveCloseRecord: '关闭这条已完成记录',
      archiveClose: '关闭',
      archiveViewAll: '查看全部 {n} 项',
      taskBlocked: '待处理',
      taskCompleted: '任务已完成',
      taskCompletedHint: '点击查看结果，或关闭此提示',
      taskOpenHint: '点击任务进入对话',
      taskLatest: '最近更新',
      taskProgress: '进度',
      taskNoSession: '该任务暂无对话',
      taskDismiss: '关闭完成提示',
      taskSteps: '{done}/{total}',
      taskParallel: '{n} 个任务并行',
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
      fullAccessWarning: '当前为最高权限：管家可直接修改文件、执行命令，请确认这是你要的权限。',
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
      chooseWorkspace: 'Choose an existing workspace',
      chooseWorkspaceFirst: 'Choose a workspace folder before handing over work',
      start: 'Split & start',
      starting: 'Butler is splitting…',
      activeTaskKicker: 'CURRENT OPERATION',
      activeTask: 'Current task',
      taskRunning: 'Running',
      taskVerifying: 'Verifying',
      taskQueued: 'Queued',
      taskPlanning: 'Planning',
      taskQueuedCount: '{n} more queued',
      taskRunningLane: 'Running',
      taskCompletedLane: 'Completed',
      taskNoRunning: 'No running tasks',
      taskNoCompleted: 'No completed tasks',
      taskClearCompleted: 'Clear completed',
      taskExpandHint: 'Hover or click to expand',
      archiveTitle: 'Completed work',
      archiveButton: 'Completed log',
      archiveSub: 'Newest first; choose an item on the left to read its result',
      archiveBack: 'Back to workbench',
      archiveEmpty: 'No completed work yet',
      archiveSelect: 'Choose a completed item on the left',
      archiveSummary: 'Summary',
      archiveResult: 'Result',
      archiveEvidence: 'Evidence',
      archiveOpen: 'Open conversation',
      archiveCount: '{n} completed',
      archiveClearAll: 'Clear all',
      archiveCloseRecord: 'Close this completed record',
      archiveClose: 'Close',
      archiveViewAll: 'View all {n}',
      taskBlocked: 'Needs attention',
      taskCompleted: 'Task complete',
      taskCompletedHint: 'Open the result or dismiss this notice',
      taskOpenHint: 'Open the conversation for this task',
      taskLatest: 'Last update',
      taskProgress: 'Progress',
      taskNoSession: 'No conversation for this task',
      taskDismiss: 'Dismiss completion notice',
      taskSteps: '{done}/{total}',
      taskParallel: '{n} tasks in parallel',
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
      fullAccessWarning: 'Full access is active: the butler can modify files and run commands directly. Continue only if intended.',
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
      .butler-scroll{flex:1;min-height:0;overflow:auto;padding:14px 24px 22px;min-width:0;}
      .butler-inner{max-width:1120px;margin:0 auto;display:flex;flex-direction:column;gap:12px;min-width:0;}
      .butler-inner > *{min-width:0;max-width:100%;}
      .butler-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;box-sizing:border-box;}
      .butler-task-board{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(250px,.8fr);gap:12px;margin-bottom:0;min-width:0;padding:9px 12px;border:1px solid rgba(34,211,238,.42);border-radius:12px;background:linear-gradient(135deg,rgba(34,211,238,.07),transparent 44%),linear-gradient(180deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));box-shadow:0 0 0 1px rgba(34,211,238,.05),0 10px 28px rgba(0,0,0,.12);box-sizing:border-box;}
      .butler-task-board.is-single{grid-template-columns:minmax(0,1fr);}
      .butler-task-lane{border:0;border-radius:0;background:transparent;padding:0;min-width:0;box-sizing:border-box;}
      .butler-task-lane.is-completed{border-left:1px solid rgba(148,163,184,.16);padding-left:12px;}
      .butler-task-lane-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:1px 3px 8px;font-size:10px;font-weight:650;letter-spacing:.08em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);}
      .butler-task-lane-head small{font-size:9px;font-weight:400;letter-spacing:0;text-transform:none;color:var(--dsw-alias-label-tertiary);}
      .butler-task-deck{position:relative;display:flex;flex-direction:column;gap:8px;min-width:0;transition:height .26s cubic-bezier(.22,.8,.3,1);}
      .butler-task-deck.is-multi:not(.is-expanded){display:block;overflow:hidden;}
      .butler-task-deck.is-multi:not(.is-expanded) .butler-task-deck-item{position:absolute;left:0;right:0;top:0;transform:translateY(calc(var(--deck-index) * 34px)) rotate(calc((var(--deck-index) - 1) * -0.35deg));transform-origin:50% 0;transition:transform .26s cubic-bezier(.22,.8,.3,1),opacity .2s ease;animation:butler-deck-enter .28s cubic-bezier(.22,.8,.3,1) both;animation-delay:calc(var(--deck-index) * 35ms);}
      .butler-task-deck.is-multi:not(.is-expanded) .butler-active-task.is-compact{height:92px;padding:8px 12px;overflow:hidden;}
      .butler-task-deck.is-multi:not(.is-expanded) .butler-active-task.is-compact .butler-active-foot{display:none;}
      .butler-task-deck.is-multi:not(.is-expanded) .butler-active-task.is-compact .butler-active-top{margin-bottom:0;}
      .butler-task-deck.is-multi:not(.is-expanded) .butler-active-task.is-compact .butler-active-orbit{opacity:.18;}
      .butler-task-deck.is-expanded .butler-task-deck-item{transform:none;animation:butler-deck-open .24s cubic-bezier(.22,.8,.3,1) both;animation-delay:calc(var(--deck-index) * 30ms);}
      .butler-task-deck.is-expanded{max-height:390px;overflow:auto;padding-right:2px;}
      .butler-task-deck.is-expanded .butler-active-task:hover{transform:translateY(-2px);}
      .butler-task-deck-item{min-width:0;}      .butler-task-deck-item .butler-active-task{margin-bottom:0;}
      .butler-task-completed-list{display:flex;flex-direction:column;gap:0;max-height:none;overflow:visible;padding:2px 5px;border:1px solid rgba(52,211,153,.18);border-radius:9px;background:rgba(52,211,153,.035);box-sizing:border-box;width:100%;}
      .butler-task-completed-row{position:relative;appearance:none;width:100%;box-sizing:border-box;border:0;border-bottom:1px solid rgba(148,163,184,.13);background:transparent;color:inherit;border-radius:0;padding:6px 27px 6px 4px;display:flex;align-items:center;gap:6px;text-align:left;cursor:pointer;min-width:0;overflow:hidden;transition:background .16s ease,color .16s ease;animation:butler-row-in .22s cubic-bezier(.22,.8,.3,1) both;animation-delay:calc(var(--row-index) * 24ms);}
      .butler-task-completed-row:last-of-type{border-bottom:0;}
      .butler-task-completed-row:hover{border-bottom-color:rgba(52,211,153,.3);background:rgba(52,211,153,.08);}
      .butler-task-completed-row:active{background:rgba(52,211,153,.12);}
      .butler-task-completed-more{appearance:none;width:100%;border:0;border-top:1px solid rgba(148,163,184,.13);background:transparent;color:#059669;padding:6px 5px 2px;font:inherit;font-size:9.5px;font-weight:650;cursor:pointer;text-align:center;}
      .butler-task-completed-more:hover{background:rgba(52,211,153,.07);}
      .butler-task-completed-row.is-removing{pointer-events:none;animation:butler-row-out .16s ease forwards;}
      .butler-task-lane.is-clearing{animation:butler-lane-out .18s ease forwards;pointer-events:none;}
      @keyframes butler-deck-enter{from{opacity:0;transform:translateY(calc(var(--deck-index) * 34px + 8px)) rotate(calc((var(--deck-index) - 1) * -0.35deg)) scale(.985);}to{opacity:1;transform:translateY(calc(var(--deck-index) * 34px)) rotate(calc((var(--deck-index) - 1) * -0.35deg)) scale(1);}}
      @keyframes butler-deck-open{from{opacity:.35;transform:translateY(-4px);}to{opacity:1;transform:none;}}
      @keyframes butler-row-in{from{opacity:0;transform:translateX(-5px);}to{opacity:1;transform:none;}}
      @keyframes butler-row-out{to{opacity:0;transform:translateX(14px);max-height:0;padding-top:0;padding-bottom:0;margin-top:-5px;border-width:0;}}
      @keyframes butler-lane-out{to{opacity:0;transform:translateY(-4px);}}
      @media (prefers-reduced-motion: reduce){.butler-task-deck,.butler-task-deck-item,.butler-task-completed-row,.butler-active-task{animation:none!important;transition:none!important;}}
      .butler-task-completed-check{flex:none;width:16px;height:16px;border-radius:50%;display:grid;place-items:center;background:rgba(52,211,153,.14);color:#34d399;font-size:10px;}
      .butler-task-completed-copy{min-width:0;display:flex;flex-direction:row;align-items:baseline;gap:6px;flex:1;overflow:hidden;}
      .butler-task-completed-title{min-width:0;font-size:11px;font-weight:600;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-task-completed-sub{min-width:0;font-size:9px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-task-completed-arrow{flex:none;color:#6ee7b7;font-size:12px;}
      .butler-task-completed-close{position:absolute;right:4px;top:50%;transform:translateY(-50%);appearance:none;border:1px solid rgba(244,63,94,.28);background:rgba(244,63,94,.06);color:#be123c;border-radius:4px;width:18px;height:18px;display:grid;place-items:center;font-size:13px;line-height:1;cursor:pointer;padding:0;}
      .butler-task-completed-close:hover{border-color:rgba(244,63,94,.65);background:rgba(244,63,94,.15);}
      .butler-clear-completed{appearance:none;border:1px solid rgba(244,63,94,.5);background:rgba(244,63,94,.12);color:#e11d48;border-radius:6px;padding:2px 7px;font:inherit;font-size:9px;font-weight:700;letter-spacing:0;text-transform:none;cursor:pointer;white-space:nowrap;}
      .butler-clear-completed:hover{border-color:rgba(244,63,94,.85);background:rgba(244,63,94,.2);}
      .butler-task-empty{font-size:10.5px;color:var(--dsw-alias-label-tertiary);padding:12px 4px;text-align:center;}
      @media (max-width:850px){.butler-task-board{grid-template-columns:minmax(0,1fr);}.butler-task-lane.is-completed{border-left:0;border-top:1px solid rgba(148,163,184,.16);padding-left:0;padding-top:10px;}}
      .butler-archive{flex:1;min-height:0;display:flex;flex-direction:column;gap:14px;padding:20px 24px 28px;max-width:1120px;width:100%;margin:0 auto;box-sizing:border-box;overflow:hidden;}
      .butler-archive-head{flex:none;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;}
      .butler-archive-title-wrap{display:flex;flex-direction:column;align-items:flex-start;gap:5px;}
      .butler-archive-title-wrap h2{margin:0;font-size:20px;line-height:1.25;color:var(--dsw-alias-label-primary);}
      .butler-archive-title-wrap p{margin:0;font-size:11px;color:var(--dsw-alias-label-secondary);}
      .butler-archive-count{align-self:center;border:1px solid rgba(52,211,153,.3);background:rgba(52,211,153,.08);color:#059669;border-radius:999px;padding:3px 9px;font-size:10px;font-weight:700;white-space:nowrap;}
      .butler-archive-head-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
      .butler-archive-clear{appearance:none;border:1px solid rgba(244,63,94,.5);background:rgba(244,63,94,.10);color:#be123c;border-radius:6px;padding:4px 9px;font:inherit;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;}
      .butler-archive-clear:hover:not(:disabled){border-color:rgba(244,63,94,.85);background:rgba(244,63,94,.18);}
      .butler-archive-clear:disabled{opacity:.45;cursor:default;}
      .butler-archive-grid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(250px,.72fr) minmax(0,1.28fr);gap:12px;}
      .butler-archive-list,.butler-archive-detail{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);min-height:0;overflow:auto;padding:9px;box-sizing:border-box;}
      .butler-archive-list{display:flex;flex-direction:column;gap:5px;width:100%;padding:9px;}
      .butler-archive-item{position:relative;appearance:none;width:100%;box-sizing:border-box;min-width:0;min-height:72px;border:1px solid transparent;background:transparent;color:inherit;border-radius:8px;padding:10px 42px 11px 9px;display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .16s ease;overflow:visible;}
      .butler-archive-item:hover{border-color:rgba(52,211,153,.24);background:rgba(52,211,153,.06);transform:translateX(2px);}
      .butler-archive-item.is-active{border-color:rgba(52,211,153,.55);background:rgba(52,211,153,.1);}
      .butler-archive-item-time{display:block;width:100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9.5px;color:var(--dsw-alias-label-tertiary);font-family:ui-monospace,Consolas,monospace;}
      .butler-archive-item-title{display:block;width:100%;min-width:0;font-size:13px;font-weight:650;line-height:1.8;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;overflow-wrap:normal;word-break:normal;color:var(--dsw-alias-label-primary);padding:2px 0 4px;}
      .butler-archive-item-summary{display:block;width:100%;min-width:0;font-size:10.5px;line-height:1.4;color:var(--dsw-alias-label-secondary);max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-archive-item small{display:block;width:100%;min-width:0;font-size:10px;line-height:1.8;color:var(--dsw-alias-label-secondary);max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:2px 0 4px;}
      .butler-archive-item-close{position:absolute;top:4px;right:4px;flex:none;appearance:none;border:1px solid rgba(244,63,94,.28);background:rgba(244,63,94,.06);color:#be123c;border-radius:5px;min-width:30px;height:20px;display:grid;place-items:center;font-size:9px;font-weight:700;line-height:1;cursor:pointer;padding:0 4px;}
      .butler-archive-item-close:hover{border-color:rgba(244,63,94,.4);background:rgba(244,63,94,.1);color:#be123c;}
      .butler-archive-tip{position:fixed;z-index:1000;max-width:340px;padding:7px 9px;border:1px solid rgba(52,211,153,.35);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:11px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere;box-shadow:0 10px 26px rgba(15,23,42,.18);pointer-events:none;}
      .butler-archive-detail{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:16px 18px;box-sizing:border-box;width:100%;}
      .butler-archive-detail-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;width:100%;box-sizing:border-box;}
      .butler-archive-detail-copy{min-width:0;flex:1;display:flex;flex-direction:column;align-items:flex-start;}
      .butler-archive-detail-head h3{max-width:100%;margin:2px 0 4px;font-size:18px;line-height:1.3;overflow-wrap:anywhere;}
      .butler-archive-detail-head p{max-width:100%;margin:0;font-size:11px;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;}
      .butler-archive-detail-close{flex:none;appearance:none;border:1px solid rgba(244,63,94,.42);background:rgba(244,63,94,.08);color:#be123c;border-radius:6px;padding:4px 8px;font:inherit;font-size:10px;font-weight:700;cursor:pointer;}
      .butler-archive-detail-close:hover{border-color:rgba(244,63,94,.8);background:rgba(244,63,94,.16);}
      .butler-archive-kicker{font-size:9px;letter-spacing:.06em;color:#059669;font-family:ui-monospace,Consolas,monospace;}
      .butler-archive-block{width:100%;border-top:1px solid var(--dsw-alias-border-l1);padding-top:10px;}
      .butler-archive-block h4{margin:0 0 5px;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);}
      .butler-archive-block p,.butler-archive-block li{font-size:12px;line-height:1.65;color:var(--dsw-alias-label-primary);white-space:pre-wrap;overflow-wrap:anywhere;}
      .butler-archive-block ul{margin:0;padding-left:18px;}
      .butler-archive-placeholder{display:grid;place-items:center;min-height:180px;width:100%;color:var(--dsw-alias-label-tertiary);font-size:11px;}
      @media (max-width:850px){.butler-archive-grid{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(150px,.65fr) minmax(0,1.35fr);}}
      .butler-active-task.is-compact{padding:10px 14px 9px;}
      .butler-active-task.is-compact .butler-active-top{margin-bottom:5px;}
      .butler-active-task.is-compact .butler-active-title{font-size:14px;}
      .butler-active-task.is-compact .butler-active-foot{margin-top:7px;}
      .butler-active-task{position:relative;overflow:hidden;margin-bottom:14px;padding:14px 16px 12px;border:1px solid var(--task-accent,rgba(34,211,238,.52));border-radius:12px;background:linear-gradient(135deg,rgba(34,211,238,.10),transparent 44%),linear-gradient(180deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));box-shadow:0 0 0 1px rgba(34,211,238,.06),0 12px 34px rgba(0,0,0,.16);cursor:pointer;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;box-sizing:border-box;}
      .butler-active-task::before{content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(34,211,238,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.07) 1px,transparent 1px);background-size:22px 22px;opacity:.55;mask-image:linear-gradient(120deg,black,transparent 70%);}
      .butler-active-task:hover{transform:translateY(-1px);border-color:rgba(34,211,238,.9);box-shadow:0 0 0 1px rgba(34,211,238,.12),0 16px 40px rgba(0,0,0,.22);}
      .butler-active-task:focus-visible{outline:2px solid rgba(34,211,238,.9);outline-offset:2px;}
      .butler-active-task.is-complete{border-color:rgba(52,211,153,.55);background:linear-gradient(135deg,rgba(52,211,153,.09),transparent 44%),linear-gradient(180deg,var(--dsw-alias-bg-layer-1),var(--dsw-alias-bg-layer-2));}
      .butler-active-orbit{position:absolute;right:-26px;top:-30px;width:112px;height:112px;border:1px solid rgba(34,211,238,.22);border-radius:50%;pointer-events:none;}
      .butler-active-orbit::after{content:'';position:absolute;inset:12px;border:1px dashed rgba(34,211,238,.16);border-radius:50%;}
      .is-complete .butler-active-orbit{border-color:rgba(52,211,153,.25);}
      .butler-active-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;}
      .butler-active-label{display:inline-flex;align-items:center;gap:7px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:9px;font-weight:650;letter-spacing:.18em;text-transform:uppercase;color:#67e8f9;}
      .butler-active-dot{width:6px;height:6px;border-radius:50%;background:var(--task-accent,#22d3ee);box-shadow:0 0 10px rgba(34,211,238,.95);animation:butler-task-pulse 1.8s ease-in-out infinite;}
      .is-complete .butler-active-dot{background:#34d399;box-shadow:0 0 10px rgba(52,211,153,.75);animation:none;}
      .butler-active-status{flex:none;border:1px solid rgba(34,211,238,.34);border-radius:999px;padding:3px 9px;font-size:10px;font-weight:650;letter-spacing:.04em;color:#a5f3fc;background:rgba(34,211,238,.08);}
      .butler-active-status.is-complete{border-color:rgba(52,211,153,.38);color:#a7f3d0;background:rgba(52,211,153,.08);}
      .butler-active-parallel{flex:none;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;padding:3px 8px;font-size:9.5px;color:var(--dsw-alias-label-secondary);background:rgba(148,163,184,.06);white-space:nowrap;}
      .butler-active-main{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:space-between;gap:14px;}
      .butler-active-copy{min-width:0;display:flex;flex-direction:column;gap:3px;}
      .butler-active-title{font-size:17px;line-height:1.35;font-weight:720;letter-spacing:-.01em;color:var(--dsw-alias-label-primary);overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
      .butler-active-sub{font-size:10.5px;line-height:1.5;color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;}
      .butler-active-arrow{flex:none;width:26px;height:26px;border:1px solid rgba(34,211,238,.28);border-radius:50%;display:grid;place-items:center;color:var(--task-accent,#67e8f9);font-size:13px;margin-top:1px;}
      .is-complete .butler-active-arrow{border-color:rgba(52,211,153,.3);color:#6ee7b7;}
      .butler-active-foot{position:relative;z-index:1;display:flex;align-items:center;gap:12px;margin-top:11px;}
      .butler-active-progress{flex:1;height:3px;border-radius:999px;background:rgba(148,163,184,.2);overflow:hidden;}
      .butler-active-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#0891b2,#22d3ee,#a5f3fc);transition:width .35s ease;}
      .is-complete .butler-active-progress span{background:linear-gradient(90deg,#059669,#34d399,#a7f3d0);}
      .butler-active-meta{display:flex;gap:12px;flex-wrap:wrap;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:9.5px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;}
      .butler-active-dismiss{position:absolute;right:10px;bottom:9px;z-index:2;appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-tertiary);font-size:15px;line-height:1;cursor:pointer;padding:3px 5px;border-radius:5px;}
      .butler-active-dismiss:hover{color:var(--dsw-alias-label-primary);background:rgba(148,163,184,.12);}
      .butler-active-nosession{margin-top:7px;font-size:10px;color:var(--dsw-alias-label-tertiary);}
      @keyframes butler-task-pulse{0%,100%{opacity:.55;transform:scale(.9);}50%{opacity:1;transform:scale(1.1);}}
      @media (prefers-reduced-motion:reduce){.butler-active-dot{animation:none;}.butler-active-task,.butler-active-progress span{transition:none;}}
      @media (max-width:700px){.butler-active-task{padding-right:40px;}.butler-active-foot{align-items:flex-start;flex-direction:column;gap:6px;}.butler-active-meta{white-space:normal;}}
      .butler-intake{padding:11px 14px;display:flex;flex-direction:column;gap:8px;border:1px solid var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary),0 8px 24px rgba(0,0,0,.08);background:var(--dsw-alias-bg-layer-1);min-width:0;max-width:100%;width:100%;box-sizing:border-box;}
      .butler-intake .butler-label{font-size:13px;font-weight:750;color:var(--dsw-alias-label-primary);letter-spacing:.01em;}
      .butler-field-hint{font-size:11px;color:var(--dsw-alias-brand-primary);line-height:1.5;}
      .butler-label{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);}
      .butler-label small{font-weight:400;font-size:11px;opacity:.85;}
      .butler-textarea{width:100%;box-sizing:border-box;min-height:66px;height:66px;resize:none;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px 10px;color:inherit;font:inherit;font-size:12.5px;line-height:1.55;outline:none;}
      .butler-textarea:focus{border-color:var(--dsw-alias-brand-primary);}
      .butler-row{display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;}
      .butler-field{flex:1 1 320px;min-width:200px;display:flex;flex-direction:column;gap:6px;}
      .butler-field > span{font-size:11px;color:var(--dsw-alias-label-secondary);}
      .butler-input{width:100%;box-sizing:border-box;height:34px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:0 10px;color:inherit;font:inherit;font-size:12.5px;outline:none;}
      .butler-select{width:100%;box-sizing:border-box;height:34px;background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:0 8px;color:inherit;font:inherit;font-size:12px;outline:none;cursor:pointer;min-width:0;}
      .butler-input:focus{border-color:var(--dsw-alias-brand-primary);}
      .butler-workdir-row{display:flex;gap:6px;align-items:center;}
      .butler-intake-settings{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding-top:2px;}
      .butler-intake-settings .butler-select-field{font-size:10.5px;}
      .butler-permission-warning{display:flex;align-items:flex-start;gap:8px;border:1px solid rgba(244,63,94,.55);background:rgba(244,63,94,.10);color:#be123c;border-radius:8px;padding:7px 9px;font-size:10.5px;line-height:1.45;}
      .butler-permission-warning b{flex:none;font-size:10px;letter-spacing:.04em;}
      .butler-permission-warning span{min-width:0;}
      .butler-intake > .butler-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:start;min-width:0;width:100%;box-sizing:border-box;}
      .butler-intake > .butler-row > .butler-field{flex:1 1 auto;min-width:0;}
      .butler-intake .butler-workdir-row{min-width:0;}
      .butler-intake > .butler-row > .butler-btn{flex:none;align-self:flex-start;margin-top:26px;height:34px;}
      .butler-workdir{position:relative;flex:1;min-width:0;}
      .butler-workdir-trigger{appearance:none;width:100%;min-height:34px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 9px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-base);color:inherit;font:inherit;text-align:left;cursor:pointer;outline:none;}
      .butler-workdir-trigger:hover:not(:disabled){border-color:var(--dsw-alias-border-l2);}
      .butler-workdir-trigger:focus-visible,.butler-workdir-trigger.is-open{border-color:var(--dsw-alias-brand-primary);box-shadow:0 0 0 1px var(--dsw-alias-brand-primary);}
      .butler-workdir-trigger:disabled{opacity:.55;cursor:default;}
      .butler-workdir-value{min-width:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;line-height:1.4;white-space:normal;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary);background:transparent;border:0;padding:0;}
      .butler-workdir-placeholder{min-width:0;font-size:12.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .butler-workdir-caret{flex:none;font-size:10px;color:var(--dsw-alias-label-secondary);}
      .butler-dir-panel{position:absolute;left:0;right:0;top:calc(100% + 5px);z-index:60;display:flex;flex-direction:column;max-height:340px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);box-shadow:0 16px 42px rgba(0,0,0,.3);overflow:hidden;}
      .butler-dir-head{flex:none;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);}
      .butler-dir-title{font-size:11.5px;font-weight:650;color:var(--dsw-alias-label-primary);white-space:nowrap;}
      .butler-dir-hint{font-size:9.5px;color:var(--dsw-alias-label-tertiary);text-align:right;}
      .butler-dir-tree{flex:1;min-height:0;overflow:auto;padding:5px;outline:none;}
      .butler-dir-section{padding:6px 7px 3px;font-size:9px;font-weight:650;letter-spacing:.08em;text-transform:uppercase;color:var(--dsw-alias-label-tertiary);}
      .butler-dir-row{display:flex;align-items:center;gap:5px;min-height:29px;box-sizing:border-box;padding:3px 6px 3px 2px;border-radius:6px;cursor:pointer;font-size:12px;line-height:1.35;color:var(--dsw-alias-label-primary);user-select:none;}
      .butler-dir-row:hover{background:var(--dsw-alias-bg-layer-2);}
      .butler-dir-row:focus-visible{outline:1px solid var(--dsw-alias-brand-primary);outline-offset:-1px;}
      .butler-dir-row.is-selected{background:rgba(34,211,238,.14);color:var(--dsw-alias-brand-primary);}
      .butler-dir-chevron{appearance:none;flex:none;width:16px;height:16px;display:grid;place-items:center;padding:0;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:9px;line-height:1;cursor:pointer;}
      .butler-dir-chevron:hover{background:rgba(148,163,184,.16);color:var(--dsw-alias-label-primary);}
      .butler-dir-chevron.is-empty{visibility:hidden;pointer-events:none;}
      .butler-dir-folder{position:relative;flex:none;width:13px;height:10px;border:1px solid currentColor;border-radius:2px;color:var(--dsw-alias-label-secondary);opacity:.9;}
      .butler-dir-folder::before{content:'';position:absolute;left:0;top:-3px;width:6px;height:3px;border:1px solid currentColor;border-bottom:0;border-radius:2px 2px 0 0;background:var(--dsw-alias-bg-layer-1);}
      .butler-dir-row.is-selected .butler-dir-folder{color:var(--dsw-alias-brand-primary);}
      .butler-dir-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .butler-dir-check{flex:none;margin-left:auto;font-size:11px;font-weight:700;color:var(--dsw-alias-brand-primary);}
      .butler-dir-state{padding:7px 10px;font-size:10.5px;line-height:1.5;color:var(--dsw-alias-label-secondary);}
      .butler-dir-state.is-error{color:var(--dsw-alias-state-error-primary);cursor:pointer;}
      .butler-dir-retry{margin-left:6px;text-decoration:underline;white-space:nowrap;}
      @media (max-width:640px){.butler-intake > .butler-row{grid-template-columns:minmax(0,1fr);}.butler-intake > .butler-row > .butler-btn{margin-top:0;justify-content:center;}.butler-dir-panel{max-height:46vh;}.butler-dir-hint{display:none;}}
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
      .butler-job-mode-controls{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
      .butler-job-mode-controls .butler-select{height:26px;max-width:150px;font-size:10.5px;}
      .butler-permission-danger{flex:none;border:1px solid rgba(244,63,94,.5);background:rgba(244,63,94,.12);color:#be123c;border-radius:999px;padding:2px 7px;font-size:9px;font-weight:700;white-space:nowrap;}
      .butler-job-side .butler-action-strong{height:28px;padding:4px 10px;border-radius:7px;border-color:rgba(34,211,238,.48);background:rgba(34,211,238,.10);color:#0e7490;font-size:11.5px;font-weight:700;box-shadow:0 0 0 1px rgba(34,211,238,.08);}
      .butler-job-side .butler-action-strong:hover:not(:disabled){border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);}
      .butler-job-side .butler-action-strong.is-warn{border-color:rgba(245,158,11,.5);background:rgba(245,158,11,.10);color:#b45309;}
      .butler-job-side .butler-action-strong.danger{border-color:rgba(244,63,94,.45);background:rgba(244,63,94,.09);color:#be123c;}
      .butler-job-side .butler-action-strong.danger:hover:not(:disabled){border-color:rgba(244,63,94,.8);background:rgba(244,63,94,.15);}
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

    function Btn({ children, onClick, tone, small, ghost, danger, disabled, title, className }) {
      const classes = ['butler-btn']
      if (tone) classes.push(tone)
      if (small) classes.push('small')
      if (ghost) classes.push('ghost')
      if (danger) classes.push('danger')
      if (className) classes.push(className)
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
        h('summary', null, `${t('log')} 路 ${log.length}`),
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

    function JobModeControls({ t, job, presetCatalog, permissionCatalog, busy, onPreset, onPermission }) {
      const presets = (presetCatalog?.presets || []).filter((item) => !item.broken)
      const permissions = permissionCatalog?.options || []
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
      return h(
        'div',
        { className: 'butler-job-mode-controls' },
        presets.length
          ? h(
              'label',
              { className: 'butler-select-field', title: t('mode') },
              h('span', null, t('mode')),
              h(
                'select',
                {
                  className: 'butler-select',
                  value: job.preset || '',
                  disabled: busy,
                  onChange: (event) => onPreset(event.target.value),
                },
                presets.map((item) =>
                  h('option', { key: item.id, value: item.id }, presetLabel(item)),
                ),
              ),
            )
          : null,
        permissions.length
          ? h(
              'label',
              { className: 'butler-select-field', title: t('permission') },
              h('span', null, t('permission')),
              h(
                'select',
                {
                  className: 'butler-select',
                  value: job.permission || 'custom',
                  disabled: busy,
                  onChange: (event) => onPermission(event.target.value),
                },
                permissions.map((item) =>
                  h(
                    'option',
                    { key: item.value, value: item.value },
                    permissionLabel(item.value),
                  ),
                ),
              ),
            )
          : null,
        job.permission === 'danger-full-access'
          ? h(
              'span',
              { className: 'butler-permission-danger', role: 'status' },
              t('permissionFullAccess'),
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
        ? `${t('needsUserShort')} 路 ${needsUser.title || ''}`
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
                ? h('div', { className: 'butler-field-hint' }, `${t('blockedLabel')}锛?{card.blockedReason}`)
                : null,
            ),
            h(
              'div',
              { className: 'butler-tl-headside' },
              needsUser ? h('span', { className: 'butler-badge is-warn' }, t('needsUserShort')) : null,
              card.imported ? h('span', { className: 'butler-badge is-idle' }, t('imported')) : null,
              h(Pill, { text: statusText, tone: statusTone(card.status) }),
              h('span', { className: 'butler-tl-chevron' }, expanded ? '▴' : '▾'),
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
                    ? `${t('needsApproval')}锛?{needsUser.toolName || ''}`
                    : `${t('needsQuestion')}锛?{needsUser.title || ''}`,
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
                          (card.verify.gaps && card.verify.gaps.length ? card.verify.gaps.join('，') : '')
                      ),
                    )
                  : null,
                card.revisions && card.revisions.length
                  ? h(
                      'div',
                      null,
                      h('div', { className: 'butler-tl-label' }, `${t('revisionNote')} 路 ${card.revisions.length}`),
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
                      h(ChatMessages, {
                        key: chatThreadKey(job, card),
                        t,
                        threadKey: chatThreadKey(job, card),
                        messages: card.chat || [],
                        emptyText: t('chatEmpty'),
                      }),
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
      const groupChatThread = chatThreadKey(job, null)
      const [groupOpen, setGroupOpen] = React.useState(() =>
        sessionChatStore.readGroupOpen(groupChatThread),
      )
      const toggleGroup = () => {
        setGroupOpen((value) => {
          const next = !value
          sessionChatStore.writeGroupOpen(groupChatThread, next)
          return next
        })
      }
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
                onClick: () => toggleGroup(),
                onKeyDown: (event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && event.target === event.currentTarget) {
                    event.preventDefault()
                    toggleGroup()
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
              ? h(JobModeControls, {
                  t,
                  job,
                  presetCatalog,
                  permissionCatalog,
                  busy,
                  onPreset: changePreset,
                  onPermission: changePermission,
                })
              : null,
            isSession && job.sessionId
              ? h(
                  Btn,
                  {
                    small: true,
                    ghost: true,
                    className: 'butler-action-strong',
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
                    className: 'butler-action-strong is-warn',
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
                    className: 'butler-action-strong',
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
                className: 'butler-btn small ghost danger butler-action-strong',
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
              h(ChatMessages, {
                key: chatThreadKey(job, null),
                t,
                threadKey: chatThreadKey(job, null),
                messages: job.chat || [],
              }),
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
              '鉁?',
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
            h('span', { className: 'butler-timeline-chevron' }, timelineOpen ? '▴' : '▾'),
            h('span', null, `${t('taskTimeline')} 路 ${cards.length}`),
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
              `${t('workspace')} 路 ${shortPath(cwd)}`,
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
            h('span', { className: 'butler-workspace-chevron' }, open ? '▴' : '▾'),
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
    const readJsonDraft = (key) => {
      try {
        const raw = readDraft(key)
        return raw ? JSON.parse(raw) : null
      } catch {
        return null
      }
    }

    // --- session chat store -------------------------------------------------
    // Every conversation dialog (a group's direct chat and a task card's chat)
    // is addressed by its Session id. The Host already persists `job.chat` /
    // `card.chat`, but the panel used to render only the tail of that list and
    // rebuilt it on every remount, so switching dialogs looked like the
    // messages had been cleared. Keep one merged thread per Session in memory
    // and the reader's scroll offset in localStorage, then render the whole
    // thread with stable keys. The Host remains the source of truth across a
    // page reload; only the UI scroll state is stored in the browser.
    const CHAT_SCROLL_KEY = 'butler:chat-scroll:v1'
    const CHAT_MESSAGE_LIMIT = 40
    const EMPTY_CHAT = []

    function chatMessageKey(message) {
      if (message && typeof message.id === 'string' && message.id) return `id:${message.id}`
      const role = typeof message?.role === 'string' ? message.role : ''
      const at = Number.isFinite(Number(message?.at)) ? String(message.at) : ''
      const text = typeof message?.text === 'string' ? message.text : ''
      return `${role}|${at}|${text}`
    }

    function chatThreadKey(job, card) {
      const session = card?.sessionId || job?.sessionId || (job?.id ? `job:${job.id}` : 'unknown')
      return card?.id ? `${session}:card:${card.id}` : `${session}:group`
    }

    function readChatScrollState() {
      try {
        const raw = JSON.parse(window.localStorage.getItem(CHAT_SCROLL_KEY) || '{}')
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
        const state = {}
        for (const [key, value] of Object.entries(raw)) {
          if (!value || typeof value !== 'object') continue
          const top = Number(value.top)
          state[key] = {
            top: Number.isFinite(top) && top > 0 ? top : 0,
            atBottom: value.atBottom === true,
          }
        }
        return state
      } catch {
        return {}
      }
    }

    const sessionChatStore = (() => {
      const threads = new Map()
      const listeners = new Map()
      const ui = new Map(Object.entries(readChatScrollState()))
      let persistTimer = null

      const uiFor = (key) => ui.get(key) || { top: 0, atBottom: false }

      const notify = (key) => {
        const set = listeners.get(key)
        if (!set) return
        for (const listener of [...set]) {
          try {
            listener()
          } catch {
            /* a listener must not break the store */
          }
        }
      }

      const persist = () => {
        persistTimer = null
        try {
          const payload = {}
          for (const [key, value] of ui) {
            payload[key] = { top: value.top || 0, atBottom: value.atBottom === true }
          }
          window.localStorage.setItem(CHAT_SCROLL_KEY, JSON.stringify(payload))
        } catch {
          /* storage may be unavailable */
        }
      }

      const schedulePersist = () => {
        if (persistTimer !== null) return
        persistTimer = setTimeout(persist, 250)
      }

      const ingest = (key, messages) => {
        if (!key) return EMPTY_CHAT
        const incoming = Array.isArray(messages) ? messages : EMPTY_CHAT
        const previous = threads.get(key) || EMPTY_CHAT
        if (!incoming.length && !previous.length) return EMPTY_CHAT
        // Merge by occurrence count, not by a plain Set: sending the exact same
        // text twice in one millisecond must still render two bubbles, while a
        // repeated poll of the same snapshot must not duplicate them.
        const valid = (message) =>
          message && typeof message === 'object' && typeof message.text === 'string' && message.text
        const previousCounts = new Map()
        for (const message of previous) {
          if (!valid(message)) continue
          const fingerprint = chatMessageKey(message)
          previousCounts.set(fingerprint, (previousCounts.get(fingerprint) || 0) + 1)
        }
        const merged = []
        const used = new Map()
        const add = (message) => {
          if (!valid(message)) return
          const fingerprint = chatMessageKey(message)
          used.set(fingerprint, (used.get(fingerprint) || 0) + 1)
          merged.push(message)
        }
        for (const message of incoming) add(message)
        for (const message of previous) {
          if (!valid(message)) continue
          const fingerprint = chatMessageKey(message)
          if ((used.get(fingerprint) || 0) < (previousCounts.get(fingerprint) || 0)) {
            used.set(fingerprint, (used.get(fingerprint) || 0) + 1)
            merged.push(message)
          }
        }
        merged.sort((a, b) => (Number(a.at) || 0) - (Number(b.at) || 0))
        if (merged.length > CHAT_MESSAGE_LIMIT) merged.splice(0, merged.length - CHAT_MESSAGE_LIMIT)
        if (
          merged.length === previous.length &&
          merged.every((message, index) => message === previous[index])
        ) {
          return previous
        }
        threads.set(key, merged)
        notify(key)
        return merged
      }

      const subscribe = (key, listener) => {
        if (typeof listener !== 'function') return () => {}
        let set = listeners.get(key)
        if (!set) {
          set = new Set()
          listeners.set(key, set)
        }
        set.add(listener)
        return () => {
          set.delete(listener)
          if (!set.size) listeners.delete(key)
        }
      }

      const readScroll = (key) => {
        const value = uiFor(key)
        return { top: value.top || 0, atBottom: value.atBottom === true }
      }

      const writeScroll = (key, top, atBottom) => {
        if (!key) return
        const value = uiFor(key)
        const nextTop = Number.isFinite(Number(top)) && Number(top) > 0 ? Number(top) : 0
        const nextBottom = atBottom === true
        if (value.top === nextTop && value.atBottom === nextBottom) return
        ui.set(key, { ...value, top: nextTop, atBottom: nextBottom })
        schedulePersist()
      }

      const readGroupOpen = (key) => uiFor(key).open === true

      const writeGroupOpen = (key, open) => {
        if (!key) return
        const value = uiFor(key)
        const nextOpen = open === true
        if (value.open === nextOpen) return
        // Expanded/collapsed state is a within-session convenience only: a page
        // reload keeps the documented "all groups collapsed" default.
        ui.set(key, { ...value, open: nextOpen })
      }

      const flush = () => {
        if (persistTimer === null) return
        clearTimeout(persistTimer)
        persist()
      }

      return {
        read: (key) => threads.get(key) || EMPTY_CHAT,
        subscribe,
        ingest,
        readScroll,
        writeScroll,
        readGroupOpen,
        writeGroupOpen,
        flush,
      }
    })()

    function ChatMessages({ t, threadKey, messages, emptyText }) {
      const [log, setLog] = React.useState(() => {
        const cached = sessionChatStore.read(threadKey)
        return cached.length ? cached : Array.isArray(messages) ? messages : EMPTY_CHAT
      })
      const listRef = React.useRef(null)
      const stickRef = React.useRef(true)

      React.useEffect(() => {
        sessionChatStore.ingest(threadKey, messages)
        setLog(sessionChatStore.read(threadKey))
        return sessionChatStore.subscribe(threadKey, () => {
          setLog(sessionChatStore.read(threadKey))
        })
      }, [threadKey, messages])

      React.useLayoutEffect(() => {
        const node = listRef.current
        if (!node) return
        const saved = sessionChatStore.readScroll(threadKey)
        stickRef.current = saved.atBottom || saved.top === 0
        let restored = false
        const restore = () => {
          // A collapsed group has zero height; wait until it is expanded so the
          // saved offset applies to a real scrollport instead of being clamped.
          if (restored || !node.clientHeight) return
          restored = true
          node.scrollTop = saved.atBottom ? node.scrollHeight : saved.top
        }
        restore()
        if (typeof ResizeObserver === 'undefined') return
        const observer = new ResizeObserver(restore)
        observer.observe(node)
        return () => observer.disconnect()
      }, [threadKey])

      React.useLayoutEffect(() => {
        const node = listRef.current
        if (!node || !stickRef.current) return
        node.scrollTop = node.scrollHeight
        sessionChatStore.writeScroll(threadKey, node.scrollTop, true)
      }, [log])

      if (!log.length) {
        return emptyText ? h('div', { className: 'butler-chat-empty' }, emptyText) : null
      }

      const keyed = []
      const seen = new Map()
      for (const message of log) {
        const base = chatMessageKey(message)
        const count = seen.get(base) || 0
        seen.set(base, count + 1)
        keyed.push({ message, key: count ? `${base}#${count}` : base })
      }

      return h(
        'div',
        {
          ref: listRef,
          className: 'butler-chat-list',
          'data-thread-key': threadKey,
          'data-message-count': log.length,
          onScroll: (event) => {
            const node = event.currentTarget
            const atBottom = node.scrollHeight - node.scrollTop - node.clientHeight <= 8
            stickRef.current = atBottom
            sessionChatStore.writeScroll(threadKey, node.scrollTop, atBottom)
          },
        },
        keyed.map(({ message, key }) =>
          h(
            'div',
            { className: `butler-chat-msg is-${message.role || 'assistant'}`, key },
            h(
              'span',
              { className: 'butler-chat-role' },
              message.role === 'user' ? t('chatYou') : t('chatAssistant'),
            ),
            h('span', { className: 'butler-chat-text' }, message.text),
          ),
        ),
      )
    }
    // --- end session chat store ---------------------------------------------

    const WORKSPACE_ORDER_KEY = 'butler:workspace-order'
    const readWorkspaceOrder = () => {
      try {
        const raw = JSON.parse(window.localStorage.getItem(WORKSPACE_ORDER_KEY) || '[]')
        if (!Array.isArray(raw)) return new Map()
        return new Map(
          raw.filter(
            (entry) =>
              Array.isArray(entry) &&
              typeof entry[0] === 'string' &&
              Number.isFinite(entry[1]),
          ),
        )
      } catch {
        return new Map()
      }
    }
    const saveWorkspaceOrder = (order) => {
      try {
        window.localStorage.setItem(WORKSPACE_ORDER_KEY, JSON.stringify([...order.entries()]))
      } catch {
        /* storage may be unavailable */
      }
    }

    function WorkspaceList({ jobs, t, defaultCwd, nowTime, busy, openSession, onAction, modelCatalog, permissionCatalog, presetCatalog }) {
      const [historyOpen, setHistoryOpen] = React.useState(false)
      const workspaceOrder = React.useRef(readWorkspaceOrder())
      const groups = React.useMemo(() => {
        const map = new Map()
        for (const job of jobs) {
          const key = job.cwd || ''
          if (!map.has(key)) map.set(key, [])
          map.get(key).push(job)
        }
        let changed = false
        for (const key of map.keys()) {
          if (!workspaceOrder.current.has(key)) {
            workspaceOrder.current.set(key, workspaceOrder.current.size)
            changed = true
          }
        }
        if (changed) saveWorkspaceOrder(workspaceOrder.current)
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
            // Persistent first-seen order: activity and active-session changes
            // cannot move a workspace block.
            return workspaceOrder.current.get(a.cwd) - workspaceOrder.current.get(b.cwd)
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
        ['verifyConversations', 'autoVerify'],
        ['nudgeConversations', 'autoNudge'],
      ]
      return h(
        'section',
        { className: 'butler-card butler-intake', style: { padding: '8px 14px', gap: '4px' } },
        h(
          'div',
          { className: 'butler-label' },
          h('span', null, t('settingsTitle')),
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
              `${t('sessionsTitle')} 路 ${list.length}`,
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
            h('span', null, open ? '▴' : '▾'),
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
                            session.current ? ` 路 ${t('current')}` : '',
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

    const DIR_ROOT_KEY = '__roots__'

    /**
     * Dropdown directory tree used by the intake form. The Host lists one
     * folder at a time (`/api/dirs?path=...`); expanding a node is lazy.
     * Clicking a folder selects it and closes the panel.
     */
    function DirectoryPicker({ t, value, onSelect, disabled }) {
      const [open, setOpen] = React.useState(false)
      const [expanded, setExpanded] = React.useState(() => new Set())
      const [, forceRender] = React.useState(0)
      const cache = React.useRef(new Map())
      const loading = React.useRef(new Set())
      const rootRef = React.useRef(null)
      const triggerRef = React.useRef(null)
      const selected = String(value || '')

      const load = React.useCallback(async (target) => {
        const key = target || DIR_ROOT_KEY
        const cached = cache.current.get(key)
        if (cached?.status === 'ready') return cached
        if (loading.current.has(key)) return null
        loading.current.add(key)
        cache.current.set(key, { status: 'loading' })
        forceRender((n) => n + 1)
        try {
          const query = target ? `?path=${encodeURIComponent(target)}` : ''
          const response = await fetch(`${API}/dirs${query}`, {
            headers: HEADERS,
            cache: 'no-store',
          })
          const payload = await response.json()
          if (!response.ok || !payload.ok) throw new Error(payload.error || `HTTP ${response.status}`)
          const data = { status: 'ready', ...payload.data }
          cache.current.set(key, data)
          return data
        } catch (err) {
          const data = { status: 'error', error: err?.message || String(err) }
          cache.current.set(key, data)
          return data
        } finally {
          loading.current.delete(key)
          forceRender((n) => n + 1)
        }
      }, [])

      const toggle = (pathValue) => {
        setExpanded((previous) => {
          const next = new Set(previous)
          if (next.has(pathValue)) next.delete(pathValue)
          else next.add(pathValue)
          return next
        })
        void load(pathValue)
      }

      const select = (pathValue) => {
        onSelect(pathValue)
        setOpen(false)
        triggerRef.current?.focus()
      }

      React.useEffect(() => {
        if (!open) return undefined
        let cancelled = false
        ;(async () => {
          await load('')
          if (!selected) return
          const chain = []
          const seen = new Set()
          let current = selected
          while (current && !seen.has(current)) {
            seen.add(current)
            const node = await load(current)
            if (cancelled) return
            if (!node || node.status !== 'ready' || !node.parent) break
            chain.push(node.parent)
            current = node.parent
          }
          if (!cancelled && chain.length) {
            setExpanded((previous) => {
              const next = new Set(previous)
              for (const parent of chain) next.add(parent)
              return next
            })
          }
        })()
        return () => {
          cancelled = true
        }
      }, [open, selected, load])

      React.useEffect(() => {
        if (disabled) setOpen(false)
      }, [disabled])

      React.useEffect(() => {
        if (!open) return undefined
        const onPointerDown = (event) => {
          if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
        }
        const onKeyDown = (event) => {
          if (event.key !== 'Escape') return
          event.stopPropagation()
          setOpen(false)
          triggerRef.current?.focus()
        }
        document.addEventListener('mousedown', onPointerDown, true)
        document.addEventListener('keydown', onKeyDown)
        return () => {
          document.removeEventListener('mousedown', onPointerDown, true)
          document.removeEventListener('keydown', onKeyDown)
        }
      }, [open])

      const renderDir = (dir, depth) => {
        const node = cache.current.get(dir.path)
        const isExpanded = expanded.has(dir.path)
        const isSelected = selected === dir.path
        const children = node?.status === 'ready' ? node.dirs || [] : []
        const indent = { paddingLeft: `${6 + depth * 14}px` }
        const state = (text, extra) =>
          h('div', { className: `butler-dir-state${extra || ''}`, style: indent }, text)
        return h(
          React.Fragment,
          { key: dir.path },
          h(
            'div',
            {
              className: `butler-dir-row${isSelected ? ' is-selected' : ''}`,
              role: 'treeitem',
              'aria-selected': isSelected ? 'true' : 'false',
              'aria-expanded': node?.status === 'ready' && children.length ? String(isExpanded) : undefined,
              tabIndex: 0,
              title: dir.path,
              style: indent,
              onClick: () => select(dir.path),
              onKeyDown: (event) => {
                if (event.target?.tagName === 'BUTTON') return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  select(dir.path)
                } else if (event.key === 'ArrowRight' && !isExpanded) {
                  event.preventDefault()
                  toggle(dir.path)
                } else if (event.key === 'ArrowLeft' && isExpanded) {
                  event.preventDefault()
                  toggle(dir.path)
                }
              },
            },
            h(
              'button',
              {
                type: 'button',
                className: `butler-dir-chevron${node?.status === 'ready' && !children.length ? ' is-empty' : ''}`,
                'aria-label': isExpanded ? t('dirCollapse') : t('dirExpand'),
                onClick: (event) => {
                  event.stopPropagation()
                  toggle(dir.path)
                },
              },
              isExpanded ? '▴' : '▾',
            ),
            h('span', { className: 'butler-dir-folder', 'aria-hidden': 'true' }),
            h('span', { className: 'butler-dir-name' }, dir.name),
            isSelected
              ? h('span', { className: 'butler-dir-check', 'aria-label': t('dirSelected') }, '✓')
              : null,
          ),
          isExpanded && node?.status === 'loading' ? state(t('dirLoading')) : null,
          isExpanded && node?.status === 'error'
            ? h(
                'div',
                {
                  className: 'butler-dir-state is-error',
                  style: indent,
                  onClick: (event) => {
                    event.stopPropagation()
                    cache.current.delete(dir.path)
                    void load(dir.path)
                  },
                },
                `${t('dirError')}锛?{node.error}`,
                h('span', { className: 'butler-dir-retry' }, t('dirRetry')),
              )
            : null,
          isExpanded && node?.status === 'ready' && !children.length
            ? state(t('dirEmpty'))
            : null,
          isExpanded && node?.status === 'ready' && children.length
            ? h(
                'div',
                { role: 'group' },
                children.map((child) => renderDir(child, depth + 1)),
              )
            : null,
        )
      }

      const rootsNode = cache.current.get(DIR_ROOT_KEY)
      const roots = rootsNode?.status === 'ready' ? rootsNode.roots || [] : []
      const treeState = (() => {
        if (!rootsNode || rootsNode.status === 'loading') {
          return h('div', { className: 'butler-dir-state' }, t('dirLoading'))
        }
        if (rootsNode.status === 'error') {
          return h(
            'div',
            {
              className: 'butler-dir-state is-error',
              onClick: () => {
                cache.current.delete(DIR_ROOT_KEY)
                void load('')
              },
            },
            `${t('dirError')}锛?{rootsNode.error}`,
            h('span', { className: 'butler-dir-retry' }, t('dirRetry')),
          )
        }
        if (!roots.length) return h('div', { className: 'butler-dir-state' }, t('dirEmpty'))
        return [
          h('div', { key: 'roots-label', className: 'butler-dir-section' }, t('dirRoots')),
          ...roots.map((root) => renderDir(root, 0)),
        ]
      })()

      return h(
        'div',
        { className: 'butler-workdir', ref: rootRef },
        h(
          'button',
          {
            ref: triggerRef,
            type: 'button',
            className: `butler-workdir-trigger${open ? ' is-open' : ''}`,
            onClick: () => setOpen((previous) => !previous),
            'aria-haspopup': 'tree',
            'aria-expanded': open ? 'true' : 'false',
            'aria-label': `${t('workdir')}锛?{selected || t('chooseWorkspaceHint')}`,
            title: selected || t('chooseWorkspaceHint'),
            disabled,
          },
          selected
            ? h('code', { className: 'butler-workdir-value' }, selected)
            : h('span', { className: 'butler-workdir-placeholder' }, t('chooseWorkspaceHint')),
          h('span', { className: 'butler-workdir-caret', 'aria-hidden': 'true' }, open ? '▴' : '▾'),
        ),
        open
          ? h(
              'div',
              { className: 'butler-dir-panel', role: 'dialog', 'aria-label': t('dirTreeTitle') },
              h(
                'div',
                { className: 'butler-dir-head' },
                h('span', { className: 'butler-dir-title' }, t('dirTreeTitle')),
                h('span', { className: 'butler-dir-hint' }, t('dirTreeHint')),
              ),
              h(
                'div',
                { className: 'butler-dir-tree', role: 'tree', 'aria-label': t('dirTreeTitle') },
                treeState,
              ),
            )
          : null,
      )
    }

    function Intake({ t, brief, setBrief, cwd, setCwd, modelCatalog, modelSelection, onModelChange, presetCatalog, permissionCatalog, preset, setPreset, permission, setPermission, busy, error, onSubmit }) {
      const composing = React.useRef(false)
      return h(
        'section',
        { className: 'butler-card butler-intake' },
        error ? h('div', { className: 'butler-alert' }, `${t('error')}锛?{error}`) : null,
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
          onCompositionStart: () => {
            composing.current = true
          },
          onCompositionEnd: () => {
            composing.current = false
          },
          onKeyDown: (event) => {
            if (event.key !== 'Enter' || event.shiftKey) return
            const native = event.nativeEvent || {}
            const isComposing =
              composing.current ||
              native.isComposing ||
              event.isComposing ||
              event.keyCode === 229 ||
              native.keyCode === 229
            if (isComposing) return
            event.preventDefault()
            if (busy || !brief.trim() || !cwd.trim()) return
            onSubmit()
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
              h(DirectoryPicker, {
                t,
                value: cwd,
                onSelect: setCwd,
                disabled: Boolean(busy),
              }),
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
        h(
          'div',
          { className: 'butler-intake-settings' },
          h(ComposerControls, {
            t,
            catalog: modelCatalog,
            selection: modelSelection,
            busy,
            onChange: onModelChange,
            permissionCatalog,
            permission,
            onPermission: setPermission,
            presetCatalog,
            preset,
            onPreset: setPreset,
          }),
        ),
        permission === 'danger-full-access'
          ? h(
              'div',
              { className: 'butler-permission-warning', role: 'alert' },
              h('b', null, t('permissionFullAccess')),
              h('span', null, t('fullAccessWarning')),
            )
          : null,
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

    const ACTIVE_TASK_STATES = new Set(['starting', 'running', 'stalled', 'fixing', 'verifying'])

    function allActiveTasks(jobs) {
      const items = []
      for (const job of jobs || []) {
        const cards = job.cards || []
        if (!cards.length) {
          if (job.status === 'planning' || job.status === 'queued') {
            items.push({
              job,
              card: {
                id: `planning:${job.id}`,
                title: job.title,
                status: job.status,
                createdAt: job.createdAt,
                lastActivityAt: job.updatedAt,
              },
              at: job.createdAt || job.updatedAt || 0,
            })
          }
          continue
        }
        for (const card of cards) {
          if (['done', 'failed', 'skipped'].includes(card.status)) continue
          items.push({
            job,
            card,
            at: Math.max(card.lastActivityAt || 0, card.createdAt || 0),
          })
        }
      }
      items.sort((a, b) => b.at - a.at)
      return items
    }

    const DISMISSED_COMPLETED_KEY = 'butler:dismissed-completed'
    const COMPLETED_CLEARED_AT_KEY = 'butler:completed-cleared-at'
    const completedTaskKey = (item) => `${item.job.id}:${item.card.id}`
    const completedTaskAt = (card) =>
      card.finishedAt || card.lastActivityAt || card.createdAt || 0
    const readDismissedCompleted = () => {
      try {
        const raw = JSON.parse(window.localStorage.getItem(DISMISSED_COMPLETED_KEY) || '[]')
        return new Set(Array.isArray(raw) ? raw.filter((key) => typeof key === 'string') : [])
      } catch {
        return new Set()
      }
    }
    const writeDismissedCompleted = (dismissed) => {
      try {
        window.localStorage.setItem(
          DISMISSED_COMPLETED_KEY,
          JSON.stringify([...dismissed].slice(-200)),
        )
      } catch {
        /* storage may be unavailable */
      }
    }
    const readCompletedClearedAt = () => {
      try {
        const at = Number(window.localStorage.getItem(COMPLETED_CLEARED_AT_KEY))
        return Number.isFinite(at) && at > 0 ? at : 0
      } catch {
        return 0
      }
    }
    const writeCompletedClearedAt = (at) => {
      try {
        window.localStorage.setItem(COMPLETED_CLEARED_AT_KEY, String(at))
      } catch {
        /* storage may be unavailable */
      }
    }
    /**
     * Every finished card in the board is hidden once its finish time is not
     * newer than the last "clear completed" action. A plain `Date.now()` would
     * work too, but the newest card timestamp keeps the boundary in the same
     * clock domain as the cards and cannot hide a genuinely new completion
     * because of a skewed wall clock.
     */
    const latestCompletedAt = (jobs) => {
      let latest = 0
      for (const job of jobs || []) {
        for (const card of job.cards || []) {
          if (card.status !== 'done') continue
          const at = completedTaskAt(card)
          if (at > latest) latest = at
        }
      }
      return latest || Date.now()
    }

    function currentCompletedTasks(jobs, limit = 8, dismissed = null, clearedAt = 0) {
      const items = []
      for (const job of jobs || []) {
        for (const card of job.cards || []) {
          if (card.status !== 'done') continue
          if (dismissed?.has(`${job.id}:${card.id}`)) continue
          const at = completedTaskAt(card)
          if (clearedAt > 0 && at <= clearedAt) continue
          items.push({ job, card, at })
        }
      }
      items.sort((a, b) => b.at - a.at)
      return items.slice(0, limit)
    }

    const COMPLETED_ARCHIVE_KEY = 'butler:completed-archive'
    const COMPLETED_ARCHIVE_CLOSED_KEY = 'butler:completed-archive-closed'
    const archiveKeyOf = (job, card) => `${job.id}:${card.id}`
    const archiveRecordFrom = (job, card) => ({
      key: archiveKeyOf(job, card),
      jobId: job.id,
      cardId: card.id,
      jobTitle: job.title || '',
      title: card.title || job.title || '',
      at: completedTaskAt(card),
      summary: job.summary || '',
      resultSummary: card.result?.summary || '',
      verifySummary: card.verify?.summary || '',
      evidence: Array.isArray(card.result?.evidence) ? card.result.evidence : [],
      gaps: Array.isArray(card.verify?.gaps) ? card.verify.gaps : [],
      note: card.butlerNote || '',
      sessionId: card.sessionId || job.sessionId || '',
    })
    const readArchiveRecords = () => {
      try {
        const raw = JSON.parse(window.localStorage.getItem(COMPLETED_ARCHIVE_KEY) || '[]')
        return Array.isArray(raw) ? raw.filter((record) => record?.key) : []
      } catch {
        return []
      }
    }
    const writeArchiveRecords = (records) => {
      try {
        window.localStorage.setItem(COMPLETED_ARCHIVE_KEY, JSON.stringify(records))
      } catch {
        /* storage may be unavailable */
      }
    }
    const readArchiveClosed = () => {
      try {
        const raw = JSON.parse(window.localStorage.getItem(COMPLETED_ARCHIVE_CLOSED_KEY) || '[]')
        return new Set(Array.isArray(raw) ? raw.filter((key) => typeof key === 'string') : [])
      } catch {
        return new Set()
      }
    }
    const writeArchiveClosed = (closed) => {
      try {
        window.localStorage.setItem(
          COMPLETED_ARCHIVE_CLOSED_KEY,
          JSON.stringify([...closed].slice(-1000)),
        )
      } catch {
        /* storage may be unavailable */
      }
    }

    function ActiveTaskCard({ t, active, completed, compact, queued, accent, nowTime, onOpen, onDismiss }) {
      const source = completed || active
      if (!source) return null
      const { job, card } = source
      const isComplete = Boolean(completed)
      const sessionId = card.sessionId || job.sessionId
      const cards = job.cards || []
      const done = cards.filter((item) => item.status === 'done' || item.status === 'skipped').length
      const total = cards.length
      const percent = total ? Math.min(100, Math.round((done / total) * 100)) : 0
      const status = isComplete
        ? t('taskCompleted')
        : card.needsUser
          ? t('taskBlocked')
          : card.status === 'verifying'
            ? t('taskVerifying')
            : card.status === 'queued'
              ? t('taskQueued')
              : card.status === 'planning'
                ? t('taskPlanning')
                : t('taskRunning')
      const open = () => {
        if (sessionId) onOpen?.(sessionId)
      }
      return h(
        'section',
        {
          className: `butler-active-task${isComplete ? ' is-complete' : ''}${compact ? ' is-compact' : ''}${sessionId ? ' is-openable' : ''}`,
          style: accent ? { '--task-accent': accent } : undefined,
          role: sessionId ? 'button' : undefined,
          tabIndex: sessionId ? 0 : undefined,
          'aria-label': sessionId ? `${card.title || job.title} 路 ${t('taskOpenHint')}` : undefined,
          onClick: open,
          onKeyDown: (event) => {
            if ((event.key === 'Enter' || event.key === ' ') && sessionId) {
              event.preventDefault()
              open()
            }
          },
        },
        h('span', { className: 'butler-active-orbit', 'aria-hidden': true }),
        h(
          'div',
          { className: 'butler-active-top' },
          h(
            'div',
            { className: 'butler-active-label' },
            h('span', { className: 'butler-active-dot' }),
            t('activeTaskKicker'),
          ),
          h('span', { className: `butler-active-status${isComplete ? ' is-complete' : ''}` }, status),
        ),
        h(
          'div',
          { className: 'butler-active-main' },
          h(
            'div',
            { className: 'butler-active-copy' },
            h('div', { className: 'butler-active-title' }, card.title || job.title),
            h(
              'div',
              { className: 'butler-active-sub' },
              isComplete
                ? `${job.title} 路 ${t('taskCompletedHint')}`
                : `${job.title} 路 ${t('taskOpenHint')}`,
            ),
          ),
          h('span', { className: 'butler-active-arrow', 'aria-hidden': true }, sessionId ? '↗' : '·'),
        ),
        h(
          'div',
          { className: 'butler-active-foot' },
          h(
            'div',
            { className: 'butler-active-progress', 'aria-hidden': true },
            h('span', { style: { width: `${percent}%` } }),
          ),
          h(
            'div',
            { className: 'butler-active-meta' },
            h('span', null, `${t('taskProgress')} ${t('taskSteps').replace('{done}', done).replace('{total}', total)}`),
            queued > 0
              ? h('span', null, t('taskQueuedCount').replace('{n}', queued))
              : null,
            h('span', null, `${t('taskLatest')} ${ago(nowTime, card.lastActivityAt || card.createdAt)}`),
          ),
        ),
        isComplete
          ? h(
              'button',
              {
                type: 'button',
                className: 'butler-active-dismiss',
                'aria-label': t('taskDismiss'),
                title: t('taskDismiss'),
                onClick: (event) => {
                  event.stopPropagation()
                  onDismiss?.()
                },
              },
              '脳',
            )
          : null,
        !sessionId
          ? h('div', { className: 'butler-active-nosession' }, t('taskNoSession'))
          : null,
      )
    }

    const TASK_ACCENTS = ['#22d3ee', '#a78bfa', '#f59e0b', '#f472b6', '#34d399']

    function TaskBoard({ t, activeTasks, completedTasks, nowTime, onOpen, onOpenArchive, onOpenArchiveAll, onCloseLane, onClearCompleted }) {
      const [expanded, setExpanded] = React.useState(false)
      const [clearing, setClearing] = React.useState(false)
      const clearTimer = React.useRef(null)
      const active = activeTasks || []
      const completed = completedTasks || []
      React.useEffect(
        () => () => {
          if (clearTimer.current) clearTimeout(clearTimer.current)
        },
        [],
      )
      if (!active.length && !completed.length) return null
      const multi = active.length > 1
      const deckHeight = multi && !expanded ? Math.min(92 + (active.length - 1) * 34, 220) : undefined
      const collapseOnBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false)
      }
      const openArchive = (item) => {
        if (clearing) return
        onOpenArchive(item)
      }
      const clearAllCompleted = () => {
        if (!completed.length || clearing) return
        setClearing(true)
        clearTimer.current = setTimeout(() => {
          clearTimer.current = null
          setClearing(false)
          onClearCompleted()
        }, 180)
      }
      return h(
        'div',
        { className: `butler-task-board${completed.length ? '' : ' is-single'}` },
        h(
          'section',
          { className: 'butler-task-lane is-running' },
          h(
            'div',
            { className: 'butler-task-lane-head' },
            h('span', null, `${t('taskRunningLane')} ${active.length}`),
            multi ? h('small', null, t('taskExpandHint')) : null,
          ),
          active.length
            ? h(
                'div',
                {
                  className: `butler-task-deck${multi ? ' is-multi' : ''}${expanded ? ' is-expanded' : ''}`,
                  style: deckHeight ? { height: `${deckHeight}px` } : undefined,
                  onMouseEnter: () => {
                    if (multi) setExpanded(true)
                  },
                  onMouseLeave: () => {
                    if (multi) setExpanded(false)
                  },
                  onFocusCapture: () => {
                    if (multi) setExpanded(true)
                  },
                  onBlurCapture: collapseOnBlur,
                  onClick: (event) => {
                    if (multi && !expanded) {
                      event.preventDefault()
                      setExpanded(true)
                    }
                  },
                  onKeyDown: (event) => {
                    if (
                      multi &&
                      !expanded &&
                      (event.key === 'Enter' || event.key === ' ')
                    ) {
                      event.preventDefault()
                      setExpanded(true)
                    }
                  },
                },
                active.map((item, index) =>
                  h(
                    'div',
                    {
                      key: `${item.job.id}:${item.card.id}`,
                      className: 'butler-task-deck-item',
                      style: { zIndex: active.length - index, '--deck-index': index },
                    },
                    h(ActiveTaskCard, {
                      t,
                      active: item,
                      compact: true,
                      accent: TASK_ACCENTS[index % TASK_ACCENTS.length],
                      nowTime,
                      onOpen: multi && !expanded ? null : onOpen,
                    }),
                  ),
                ),
              )
            : h('div', { className: 'butler-task-empty' }, t('taskNoRunning')),
        ),
        completed.length
          ? h(
          'section',
          { className: `butler-task-lane is-completed${clearing ? ' is-clearing' : ''}` },
          h(
            'div',
            { className: 'butler-task-lane-head' },
            h('span', null, `${t('taskCompletedLane')} ${completed.length}`),
            completed.length
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'butler-clear-completed',
                    onClick: clearAllCompleted,
                    disabled: clearing,
                    title: t('taskClearCompleted'),
                  },
                  t('taskClearCompleted'),
                )
              : null,
          ),
          completed.length
            ? h(
                'div',
                { className: 'butler-task-completed-list' },
                completed.slice(0, 3).map((item, index) =>
                  h(
                    'div',
                    {
                      key: `${item.job.id}:${item.card.id}`,
                      role: 'button',
                      tabIndex: 0,
                      className: 'butler-task-completed-row',
                      style: { '--row-index': index },
                      title: `${item.card.title || item.job.title} 路 ${item.job.title}`,
                      onClick: () => openArchive(item),
                      onKeyDown: (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          openArchive(item)
                        }
                      },
                    },
                    h('span', { className: 'butler-task-completed-check' }, '✓'),
                    h(
                      'span',
                      { className: 'butler-task-completed-copy' },
                      h('span', { className: 'butler-task-completed-title' }, item.card.title || item.job.title),
                      h('span', { className: 'butler-task-completed-sub' }, item.job.title),
                    ),
                    h('span', { className: 'butler-task-completed-arrow', 'aria-hidden': true }, '↗'),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'butler-task-completed-close',
                        title: t('archiveCloseRecord'),
                        'aria-label': t('archiveCloseRecord'),
                        onClick: (event) => {
                          event.stopPropagation()
                          onCloseLane(item)
                        },
                      },
                      '×',
                    ),
                  ),
                ),
                completed.length > 3
                  ? h(
                      'button',
                      {
                        type: 'button',
                        className: 'butler-task-completed-more',
                        onClick: onOpenArchiveAll,
                      },
                      t('archiveViewAll').replace('{n}', completed.length),
                    )
                  : null,
              )
            : h('div', { className: 'butler-task-empty' }, t('taskNoCompleted')),
        ) : null,
      )
    }

    function CompletedArchivePage({ t, records, initialKey, onBack, onOpenSession, onCloseRecord, onClearAll }) {
      const items = records || []
      const [selectedKey, setSelectedKey] = React.useState(initialKey || '')
      const [hoverTip, setHoverTip] = React.useState(null)
      const selected =
        items.find((item) => item.key === selectedKey) || items[0] || null
      React.useEffect(() => {
        if (!selected && items.length) setSelectedKey(items[0].key)
      }, [items, selected])
      const when = (item) => {
        if (!item?.at) return '—'
        try {
          return new Date(item.at).toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        } catch {
          return clock(item.at)
        }
      }
      const showArchiveTip = (event, item) => {
        const title = event.currentTarget.querySelector('.butler-archive-item-title')
        const workspace = event.currentTarget.querySelector('small')
        const clipped = [title, workspace].some(
          (node) => node && node.scrollWidth > node.clientWidth + 1,
        )
        if (!clipped) {
          setHoverTip(null)
          return
        }
        const text = [...new Set([item.title, item.summary, item.jobTitle].filter(Boolean))].join('\n')
        const rect = event.currentTarget.getBoundingClientRect()
        const x = Math.max(8, Math.min(rect.left, (window.innerWidth || 360) - 340))
        const y = Math.min(rect.bottom + 6, (window.innerHeight || 600) - 120)
        setHoverTip({ text, x, y })
      }
      const hideArchiveTip = () => setHoverTip(null)
      return h(
        'div',
        { className: 'butler-archive' },
        h(
          'header',
          { className: 'butler-archive-head' },
          h(
            'div',
            { className: 'butler-archive-title-wrap' },
            h('button', { type: 'button', className: 'butler-btn small ghost', onClick: onBack }, `← ${t('archiveBack')}`),
            h('h2', null, t('archiveTitle')),
            h('p', null, t('archiveSub')),
          ),
          h(
            'div',
            { className: 'butler-archive-head-actions' },
            h('span', { className: 'butler-archive-count' }, t('archiveCount').replace('{n}', items.length)),
            h(
              'button',
              {
                type: 'button',
                className: 'butler-archive-clear',
                disabled: !items.length,
                onClick: onClearAll,
              },
              t('archiveClearAll'),
            ),
          ),
        ),
        h(
          'div',
          { className: 'butler-archive-grid' },
          h(
            'aside',
            { className: 'butler-archive-list', 'aria-label': t('archiveTitle') },
            items.length
              ? items.map((item) =>
                  h(
                    'div',
                    {
                      key: item.key,
                      role: 'button',
                      tabIndex: 0,
                      className: `butler-archive-item${selected?.key === item.key ? ' is-active' : ''}`,
                      title: [...new Set([item.title, item.summary, item.jobTitle].filter(Boolean))].join('\n'),
                      onClick: () => setSelectedKey(item.key),
                      onMouseEnter: (event) => showArchiveTip(event, item),
                      onMouseLeave: hideArchiveTip,
                      onKeyDown: (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedKey(item.key)
                        }
                      },
                    },
                    h('span', { className: 'butler-archive-item-time' }, when(item)),
                    h(
                      'strong',
                      { className: 'butler-archive-item-title' },
                      item.title || item.summary || item.resultSummary || item.jobTitle || '已完成任务',
                    ),
                    h('small', null, item.jobTitle),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'butler-archive-item-close',
                        title: t('archiveCloseRecord'),
                        'aria-label': t('archiveCloseRecord'),
                        onClick: (event) => {
                          event.stopPropagation()
                          onCloseRecord(item.key)
                        },
                      },
                      t('archiveClose'),
                    ),
                  ),
                )
              : h('div', { className: 'butler-task-empty' }, t('archiveEmpty')),
          ),
          h(
            'section',
            { className: 'butler-archive-detail' },
            selected
              ? h(
                  React.Fragment,
                  null,
                  h(
                    'div',
                    { className: 'butler-archive-detail-head' },
                    h(
                      'div',
                      { className: 'butler-archive-detail-copy' },
                      h('span', { className: 'butler-archive-kicker' }, when(selected)),
                      h('h3', null, selected.title || selected.summary || selected.resultSummary || '已完成任务'),
                      h('p', null, selected.jobTitle),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'butler-archive-detail-close',
                        onClick: () => onCloseRecord(selected.key),
                      },
                      t('archiveClose'),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'butler-archive-block' },
                    h('h4', null, t('archiveSummary')),
                    h('p', null, selected.summary || selected.resultSummary || selected.verifySummary || '—'),
                  ),
                  h(
                    'div',
                    { className: 'butler-archive-block' },
                    h('h4', null, t('archiveResult')),
                    h('p', null, selected.resultSummary || selected.verifySummary || selected.note || '—'),
                    selected.gaps?.length
                      ? h(
                          'ul',
                          null,
                          selected.gaps.map((gap, index) => h('li', { key: index }, gap)),
                        )
                      : null,
                  ),
                  selected.evidence?.length
                    ? h(
                        'div',
                        { className: 'butler-archive-block' },
                        h('h4', null, t('archiveEvidence')),
                        h(
                          'ul',
                          null,
                          selected.evidence.map((entry, index) =>
                            h('li', { key: index }, typeof entry === 'string' ? entry : JSON.stringify(entry)),
                          ),
                        ),
                      )
                    : null,
                  selected.sessionId
                    ? h(
                        'button',
                        {
                          type: 'button',
                          className: 'butler-btn small',
                          onClick: () => onOpenSession(selected.sessionId),
                        },
                        t('archiveOpen'),
                      )
                    : null,
                )
              : h('div', { className: 'butler-archive-placeholder' }, t('archiveSelect')),
          ),
        ),
        hoverTip
          ? h(
              'div',
              {
                className: 'butler-archive-tip',
                style: { left: hoverTip.x, top: hoverTip.y },
              },
              hoverTip.text,
            )
          : null,
      )
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

    // ---- global status store (test seam: scripts/test-global-store.mjs) ----
    const PULSE_POLL_MS = 1_000
    const DETAIL_POLL_MS = 5_000
    const SESSIONS_POLL_MS = 30_000

    /**
     * Merge a live status pulse into the last full snapshot. Pulse jobs/cards
     * only carry status fields; prompts, logs, chat and evidence stay from the
     * full snapshot. Unknown ids ask the caller for a full refresh.
     */
    const revisionOf = (value) => {
      const revision = Number(value?.revision)
      return Number.isFinite(revision) ? revision : null
    }

    function mergePulseIntoData(previous, pulse) {
      if (!previous) return { data: null, needsFull: false }
      if (!pulse || !Array.isArray(pulse.jobs)) return { data: previous, needsFull: false }
      // Responses can overtake each other. A pulse produced before the last
      // applied snapshot must never move a card back from done/failed to
      // running/queued (the visible "status rollback" after page switches).
      const previousRevision = revisionOf(previous)
      const pulseRevision = revisionOf(pulse)
      if (
        previousRevision != null &&
        pulseRevision != null &&
        pulseRevision < previousRevision
      ) {
        return { data: previous, needsFull: false, stale: true }
      }
      let needsFull = false
      const previousJobs = new Map((previous.jobs || []).map((job) => [job.id, job]))
      const jobs = pulse.jobs.map((pulseJob) => {
        const oldJob = previousJobs.get(pulseJob.id)
        if (!oldJob) {
          needsFull = true
          return { ...pulseJob, cards: pulseJob.cards || [] }
        }
        const oldCards = new Map((oldJob.cards || []).map((card) => [card.id, card]))
        const cards = (pulseJob.cards || []).map((pulseCard) => {
          const oldCard = oldCards.get(pulseCard.id)
          if (!oldCard) {
            needsFull = true
            return pulseCard
          }
          return { ...oldCard, ...pulseCard }
        })
        if ((oldJob.cards || []).length !== (pulseJob.cards || []).length) needsFull = true
        return { ...oldJob, ...pulseJob, cards }
      })
      if (jobs.length !== (previous.jobs || []).length) needsFull = true
      return { data: { ...previous, ...pulse, jobs }, needsFull }
    }

    function createButlerStatusStore() {
      let snapshot = { data: null, pulse: null, error: '', updatedAt: 0 }
      const listeners = new Set()
      let pulseTimer = null
      let detailTimer = null
      let pulseInFlight = null
      let stateInFlight = null
      let sessionsInFlight = null
      let started = false
      let pageOpen = false
      let lightMode = true
      let pulseMode = true
      let lastSessionsAt = 0
      let fullScheduled = false

      const visible = () =>
        typeof document === 'undefined' || document.visibilityState !== 'hidden'

      const emit = (patch) => {
        snapshot = { ...snapshot, ...patch }
        for (const listener of [...listeners]) {
          try {
            listener()
          } catch {
            /* one subscriber must not break the store */
          }
        }
      }

      const fetchJson = async (url) => {
        const response = await fetch(url, { headers: HEADERS, cache: 'no-store' })
        const payload = await response.json()
        if (!response.ok || !payload?.ok) throw new Error(payload?.error || `HTTP ${response.status}`)
        return payload.data
      }

      const scheduleFull = () => {
        if (fullScheduled) return
        fullScheduled = true
        setTimeout(() => {
          fullScheduled = false
          if (pageOpen && visible()) void refreshState()
        }, 300)
      }

      const refreshPulse = async () => {
        if (pulseInFlight) return pulseInFlight
        pulseInFlight = (async () => {
          try {
            if (!pulseMode) {
              if (pageOpen && visible()) await refreshState()
              return
            }
            const pulse = await fetchJson(`${API}/pulse`)
            const merged = mergePulseIntoData(snapshot.data, pulse)
            emit({
              pulse,
              data: merged.data || snapshot.data,
              error: '',
              updatedAt: Date.now(),
            })
            if (merged.needsFull) scheduleFull()
          } catch (error) {
            if (!snapshot.pulse) pulseMode = false
            if (!snapshot.data) emit({ error: error?.message || String(error), updatedAt: Date.now() })
          } finally {
            pulseInFlight = null
          }
        })()
        return pulseInFlight
      }

      const refreshState = async () => {
        if (stateInFlight) return stateInFlight
        stateInFlight = (async () => {
          try {
            const state = await fetchJson(`${API}/state${lightMode ? '?light=1' : ''}`)
            const currentRevision = revisionOf(snapshot.data)
            const incomingRevision = revisionOf(state)
            if (
              currentRevision != null &&
              incomingRevision != null &&
              incomingRevision < currentRevision
            ) {
              // A slower full snapshot can arrive after a newer pulse. Keep the
              // newer statuses; the next detail refresh fills any missing text.
              emit({ error: '', updatedAt: Date.now() })
              return
            }
            const sessions = state?.sessions?.length
              ? state.sessions
              : snapshot.data?.sessions || []
            emit({
              data: { ...state, sessions },
              error: '',
              updatedAt: Date.now(),
            })
          } catch (error) {
            emit({ error: error?.message || String(error), updatedAt: Date.now() })
          } finally {
            stateInFlight = null
          }
        })()
        return stateInFlight
      }

      const refreshSessions = async ({ force = false } = {}) => {
        if (sessionsInFlight) return sessionsInFlight
        sessionsInFlight = (async () => {
          try {
            const payload = await fetchJson(`${API}/sessions${force ? '?force=1' : ''}`)
            const items = Array.isArray(payload?.items)
              ? payload.items
              : Array.isArray(payload)
                ? payload
                : []
            lastSessionsAt = Date.now()
            lightMode = true
            emit({
              data: {
                ...(snapshot.data || {}),
                sessions: items,
                sessionsAt: payload?.at || lastSessionsAt,
              },
              sessionsUpdatedAt: lastSessionsAt,
            })
          } catch (error) {
            // A Host that predates /api/sessions still serves the full state.
            lightMode = false
            if (!snapshot.data) emit({ error: error?.message || String(error), updatedAt: Date.now() })
          } finally {
            sessionsInFlight = null
          }
        })()
        return sessionsInFlight
      }

      const refresh = async ({ state = true, sessions = false, forceSessions = false } = {}) => {
        if (sessions) await refreshSessions({ force: forceSessions })
        if (state) await refreshState()
        return snapshot
      }

      const enterPage = () => {
        if (pageOpen) return
        pageOpen = true
        void refresh({ state: true, sessions: true })
        if (detailTimer) clearInterval(detailTimer)
        detailTimer = setInterval(() => {
          if (!visible()) return
          void refreshState()
          if (Date.now() - lastSessionsAt >= SESSIONS_POLL_MS) void refreshSessions({ force: true })
        }, DETAIL_POLL_MS)
      }

      const leavePage = () => {
        pageOpen = false
        if (detailTimer) clearInterval(detailTimer)
        detailTimer = null
      }

      const onVisibility = () => {
        if (!visible()) return
        void refreshPulse()
        if (pageOpen) {
          void refresh({
            state: true,
            sessions: Date.now() - lastSessionsAt >= SESSIONS_POLL_MS,
          })
        }
      }

      const start = () => {
        if (started) return
        started = true
        void refreshPulse()
        pulseTimer = setInterval(() => {
          if (visible()) void refreshPulse()
        }, PULSE_POLL_MS)
        if (typeof document !== 'undefined') {
          document.addEventListener('visibilitychange', onVisibility)
        }
      }

      const stop = () => {
        if (!started) return
        started = false
        if (pulseTimer) clearInterval(pulseTimer)
        pulseTimer = null
        leavePage()
        if (typeof document !== 'undefined') {
          document.removeEventListener('visibilitychange', onVisibility)
        }
      }

      const subscribe = (listener) => {
        listeners.add(listener)
        if (!started) start()
        return () => listeners.delete(listener)
      }

      return {
        start,
        stop,
        subscribe,
        getSnapshot: () => snapshot,
        refresh,
        refreshState,
        refreshSessions,
        refreshPulse,
        enterPage,
        leavePage,
      }
    }

    const butlerStatusStore = createButlerStatusStore()

    function useButlerStatus() {
      const [snapshot, setSnapshot] = React.useState(() => butlerStatusStore.getSnapshot())
      React.useEffect(() => {
        setSnapshot(butlerStatusStore.getSnapshot())
        const unsubscribe = butlerStatusStore.subscribe(() => setSnapshot(butlerStatusStore.getSnapshot()))
        butlerStatusStore.enterPage()
        return () => {
          unsubscribe()
          butlerStatusStore.leavePage()
        }
      }, [])
      return snapshot
    }
    // ---- end global status store ----

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
      const status = useButlerStatus()
      const data = status.data
      const [error, setError] = React.useState('')
      const [busy, setBusy] = React.useState('')
      const [refreshing, setRefreshing] = React.useState(false)
      const [notice, setNotice] = React.useState('')
      const [brief, setBrief] = React.useState(() => readDraft('intake:brief'))
      const [cwd, setCwd] = React.useState(() => readDraft('intake:cwd'))
      const [newPreset, setNewPreset] = React.useState(() => readDraft('intake:preset'))
      const [newPermission, setNewPermission] = React.useState(() => readDraft('intake:permission'))
      const [newModelSelection, setNewModelSelection] = React.useState(() =>
        readJsonDraft('intake:model'),
      )
      const [filter, setFilter] = React.useState('all')
      const [viewMode, setViewMode] = React.useState('timeline')
      const [archiveKey, setArchiveKey] = React.useState('')
      const [archiveRecords, setArchiveRecords] = React.useState(readArchiveRecords)
      const archiveClosed = React.useRef(readArchiveClosed())
      const [completedTasks, setCompletedTasks] = React.useState([])
      const dismissedCompleted = React.useRef(readDismissedCompleted())
      const completedClearedAt = React.useRef(readCompletedClearedAt())
      const previousTasks = React.useRef(new Map())
      const initializedTask = React.useRef(false)
      const submitting = React.useRef(false)

      React.useEffect(() => {
        if (!data || initializedTask.current) return
        initializedTask.current = true
        const recent = currentCompletedTasks(
          data.jobs || [],
          8,
          dismissedCompleted.current,
          completedClearedAt.current,
        )
        if (recent.length) setCompletedTasks((previous) => (previous.length ? previous : recent))
      }, [data])

      React.useEffect(() => {
        if (!data) return
        setArchiveRecords((previous) => {
          const merged = new Map(previous.map((record) => [record.key, record]))
          let changed = false
          for (const job of data.jobs || []) {
            for (const card of job.cards || []) {
              if (card.status !== 'done') continue
              const key = archiveKeyOf(job, card)
              if (merged.has(key) || archiveClosed.current.has(key)) continue
              merged.set(key, archiveRecordFrom(job, card))
              changed = true
            }
          }
          if (!changed) return previous
          const next = [...merged.values()]
            .sort((a, b) => b.at - a.at)
            .slice(0, 500)
          writeArchiveRecords(next)
          return next
        })
      }, [data])

      React.useEffect(() => {
        writeDraft('intake:brief', brief)
      }, [brief])

      React.useEffect(() => {
        writeDraft('intake:cwd', cwd)
      }, [cwd])

      React.useEffect(() => {
        writeDraft('intake:preset', newPreset)
      }, [newPreset])

      React.useEffect(() => {
        writeDraft('intake:permission', newPermission)
      }, [newPermission])

      React.useEffect(() => {
        writeDraft('intake:model', newModelSelection ? JSON.stringify(newModelSelection) : '')
      }, [newModelSelection])

      React.useEffect(() => {
        if (newPreset) return
        const presets = (data?.presetCatalog?.presets || []).filter((item) => !item.broken)
        const next = presets.find((item) => item.isDefault)?.id || presets[0]?.id || ''
        if (next) setNewPreset(next)
      }, [data, newPreset])

      React.useEffect(() => {
        if (newPermission) return
        const options = data?.permissionCatalog?.options || []
        const next =
          options.find((item) => item.value === 'workspace-write')?.value ||
          options[0]?.value ||
          ''
        if (next) setNewPermission(next)
      }, [data, newPermission])

      React.useEffect(() => {
        if (newModelSelection) return
        const fallback = data?.modelCatalog?.default
        if (fallback?.provider && fallback?.model) setNewModelSelection(fallback)
      }, [data, newModelSelection])

      React.useEffect(() => {
        if (cwd) return
        const first =
          data?.defaultCwd ||
          (data?.jobs || []).find((job) => job.cwd)?.cwd ||
          ''
        if (first) setCwd(first)
      }, [data, cwd])

      React.useEffect(() => {
        const jobs = data?.jobs || []
        const current = allActiveTasks(jobs)
        const currentIds = new Set(current.map((item) => item.card.id))
        const finished = []
        for (const [cardId, snapshot] of previousTasks.current) {
          if (currentIds.has(cardId)) continue
          const job = jobs.find((item) => item.id === snapshot.jobId)
          const card = (job?.cards || []).find((item) => item.id === cardId)
          if (card?.status === 'done') finished.push({ job, card, at: completedTaskAt(card) })
        }
        previousTasks.current = new Map(
          current.map((item) => [item.card.id, { jobId: item.job.id }]),
        )
        if (finished.length) {
          finished.sort((a, b) => b.at - a.at)
          setCompletedTasks((previous) => {
            const merged = new Map(previous.map((item) => [`${item.job.id}:${item.card.id}`, item]))
            for (const item of finished) {
              if (dismissedCompleted.current.has(`${item.job.id}:${item.card.id}`)) continue
              if (
                completedClearedAt.current > 0 &&
                item.at <= completedClearedAt.current
              ) {
                continue
              }
              merged.set(`${item.job.id}:${item.card.id}`, item)
            }
            return [...merged.values()].sort((a, b) => b.at - a.at).slice(0, 20)
          })
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
            await butlerStatusStore.refresh({
              state: true,
              sessions: [
                'adoptSession',
                'adoptRecent',
                'adoptWorkspace',
                'adoptAll',
                'hideSession',
                'archiveSession',
                'clearFinished',
              ].includes(action),
            })
            return result.data
          } catch (err) {
            setError(err?.message || String(err))
            return null
          } finally {
            setBusy('')
          }
        },
        [],
      )

      const announce = (text) => {
        setNotice(text)
        setTimeout(() => setNotice(''), 3200)
      }
      const refreshNow = async () => {
        setRefreshing(true)
        await butlerStatusStore.refresh({ state: true, sessions: true, forceSessions: true })
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

      const submit = () => {        const value = brief.trim()
        if (!value || busy || submitting.current) return
        if (!cwd.trim()) {
          setError(t('chooseWorkspaceFirst'))
          return
        }
        submitting.current = true
        void act('createJob', {
          brief: value,
          cwd: cwd.trim(),
          mergeRelated: true,
          preset: newPreset || undefined,
          permission: newPermission || undefined,
          modelSelection: newModelSelection || undefined,
        }, 'create')
          .then((created) => {
            if (created) {
              setBrief('')
              clearDraft('intake:brief')
            }
          })
          .finally(() => {
            submitting.current = false
          })
      }

      const updateBrief = (value) => {
        setBrief(value)
        writeDraft('intake:brief', value)
      }
      const updateCwd = (value) => {
        setCwd(value)
        writeDraft('intake:cwd', value)
      }
      const updatePresetChoice = (value) => {
        setNewPreset(value)
        writeDraft('intake:preset', value)
      }
      const updatePermissionChoice = (value) => {
        setNewPermission(value)
        writeDraft('intake:permission', value)
      }
      const updateModelChoice = (selection) => {
        setNewModelSelection(selection)
        writeDraft('intake:model', selection ? JSON.stringify(selection) : '')
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
      const activeTasks = allActiveTasks(jobs)
      const dismissTaskLane = (item) => {
        const key = archiveKeyOf(item.job, item.card)
        dismissedCompleted.current.add(key)
        writeDismissedCompleted(dismissedCompleted.current)
        setCompletedTasks((previous) =>
          previous.filter((entry) => !(entry.job.id === item.job.id && entry.card.id === item.card.id)),
        )
      }
      const closeTaskLane = (item) => {
        dismissTaskLane(item)
      }
      const openCompletedArchive = (item) => {
        const key = archiveKeyOf(item.job, item.card)
        dismissTaskLane(item)
        if (!archiveClosed.current.has(key)) {
          setArchiveRecords((previous) => {
            if (previous.some((record) => record.key === key)) return previous
            const next = [archiveRecordFrom(item.job, item.card), ...previous].sort(
              (a, b) => b.at - a.at,
            )
            writeArchiveRecords(next)
            return next
          })
        }
        setArchiveKey(key)
      }
      const ensureArchiveFromData = () => {
        if (!data) return
        setArchiveRecords((previous) => {
          const merged = new Map(previous.map((record) => [record.key, record]))
          let changed = false
          for (const job of data.jobs || []) {
            for (const card of job.cards || []) {
              if (card.status !== 'done') continue
              const key = archiveKeyOf(job, card)
              if (merged.has(key) || archiveClosed.current.has(key)) continue
              merged.set(key, archiveRecordFrom(job, card))
              changed = true
            }
          }
          if (!changed) return previous
          const next = [...merged.values()].sort((a, b) => b.at - a.at).slice(0, 500)
          writeArchiveRecords(next)
          return next
        })
      }
      const openCompletedArchiveList = () => {
        ensureArchiveFromData()
        setArchiveKey('__archive__')
      }
      const closeArchiveRecord = (key) => {
        archiveClosed.current.add(key)
        writeArchiveClosed(archiveClosed.current)
        setArchiveRecords((previous) => {
          const next = previous.filter((record) => record.key !== key)
          writeArchiveRecords(next)
          return next
        })
      }
      const clearArchiveRecords = () => {
        for (const record of archiveRecords) archiveClosed.current.add(record.key)
        writeArchiveClosed(archiveClosed.current)
        writeArchiveRecords([])
        setArchiveRecords([])
      }
      const clearCompleted = () => {
        const clearedAt = latestCompletedAt(data?.jobs || [])
        completedClearedAt.current = clearedAt
        writeCompletedClearedAt(clearedAt)
        setCompletedTasks([])
      }
      if (archiveKey) {
        return h(
          'div',
          { className: 'butler-page' },
          h('style', { key: 'butler-style' }, CSS),
          props.topbar ? props.topbar() : null,
          h(CompletedArchivePage, {
            t,
            records: archiveRecords,
            initialKey: archiveKey,
            onBack: () => setArchiveKey(''),
            onOpenSession: openSession,
            onCloseRecord: closeArchiveRecord,
            onClearAll: clearArchiveRecords,
          }),
        )
      }
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
                onClick: openCompletedArchiveList,
                title: t('archiveButton'),
              },
              t('archiveButton'),
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
            h(TaskBoard, {
              t,
              activeTasks,
              completedTasks,
              nowTime: Date.now(),
              onOpen: openSession,
              onOpenArchive: openCompletedArchive,
              onOpenArchiveAll: openCompletedArchiveList,
              onCloseLane: closeTaskLane,
              onClearCompleted: clearCompleted,
            }),
            h(Intake, {
              t,
              brief,
              setBrief: updateBrief,
              cwd,
              setCwd: updateCwd,
              presetCatalog: data?.presetCatalog || null,
              permissionCatalog: data?.permissionCatalog || null,
              modelCatalog: data?.modelCatalog || null,
              modelSelection: newModelSelection,
              onModelChange: updateModelChoice,
              preset: newPreset,
              setPreset: updatePresetChoice,
              permission: newPermission,
              setPermission: updatePermissionChoice,
              busy: busy === 'create',
              error: error || status.error,
              onSubmit: submit,
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
              ? h('div', { className: 'butler-foot' }, `${t('storage')} 路 ${data.storageFile}`)
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

      // The Windows caption menu (应用 / 编辑) is rendered by the desktop
      // preload into a shadow root. Restyle its buttons so the five top-row
      // entries share one height, font-size and gap. The host itself stays in
      // place; only its shadow stylesheet is touched.
      React.useEffect(() => {
        if (typeof document === 'undefined') return
        const captionCss = `
          [role=menubar] { gap: 6px !important; }
          button {
            height: 28px !important;
            box-sizing: border-box !important;
            padding: 0 12px !important;
            border: 1px solid var(--dsw-alias-border-l1) !important;
            border-radius: 8px !important;
            background: var(--dsw-alias-bg-layer-1) !important;
            color: var(--dsw-alias-label-primary) !important;
            font: inherit !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            line-height: 1 !important;
            cursor: pointer !important;
            box-shadow: 0 2px 8px rgba(0,0,0,.12) !important;
          }
          button:hover, button[aria-expanded=true] {
            background: var(--dsw-alias-interactive-bg-hover) !important;
            border-color: var(--dsw-alias-border-l2) !important;
            color: var(--dsw-alias-label-primary) !important;
          }
          @media (max-width: 860px) {
            [role=menubar] { gap: 4px !important; }
            button { padding: 0 9px !important; font-size: 11.5px !important; }
          }
        `
        let host = null
        let injected = null
        const apply = () => {
          const node = document.querySelector('[data-windows-menu]')
          if (!node || !node.shadowRoot) return
          if (node !== host) {
            host = node
            injected = node.shadowRoot.querySelector('style[data-butler-caption="1"]')
          }
          if (!injected || !injected.isConnected) {
            injected = document.createElement('style')
            injected.dataset.butlerCaption = '1'
            injected.textContent = captionCss
            node.shadowRoot.appendChild(injected)
          }
        }
        apply()
        const timer = setInterval(apply, 1000)
        return () => {
          clearInterval(timer)
          // The main-slot and shell-overlay topbars can coexist; only remove the
          // shared shadow stylesheet after the last one has gone.
          setTimeout(() => {
            if (typeof document === 'undefined') return
            if (!document.querySelector('[data-butler-topbar]')) injected?.remove()
          }, 0)
        }
      }, [])

      // Shared hover / compact rules for the plugin-owned buttons.
      // (Kept separate from the component so HMR can refresh it in place.)
      React.useEffect(() => {
        if (typeof document === 'undefined') return
        const style = document.createElement('style')
        style.dataset.butlerNavStyle = '1'
        style.textContent = `
          .butler-nav-btn:hover {
            background: var(--dsw-alias-interactive-bg-hover) !important;
            border-color: var(--dsw-alias-border-l2) !important;
          }
          .butler-nav-btn:active { transform: translateY(1px); }
          @media (max-width: 860px) {
            [data-butler-topbar] { gap: 4px !important; }
            .butler-nav-btn { padding: 0 9px !important; font-size: 11.5px !important; }
          }
        `
        document.head.appendChild(style)
        return () => style.remove()
      }, [])

      const windowsCaption =
        typeof document !== 'undefined' &&
        document.documentElement.hasAttribute('data-windows-titlebar')
      const baseButton = {
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-1)',
        color: 'var(--dsw-alias-label-primary)',
        borderRadius: '8px',
        padding: '0 12px',
        height: '28px',
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        font: 'inherit',
        fontSize: '12px',
        fontWeight: '600',
        lineHeight: '1',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 8px rgba(0,0,0,.12)',
        pointerEvents: 'auto',
        flex: 'none',
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
            // The Windows caption row is 40px tall and its 28px menu buttons
            // are vertically centred at 6px. On other platforms keep the
            // previous offset below the native chrome.
            top: windowsCaption ? '6px' : '46px',
            // The Windows caption buttons occupy the top-right corner. Keep
            // the five entries fully clear of minimize / maximize / close.
            right:
              windowsCaption || /Electron/i.test(navigator.userAgent) ? '180px' : '12px',
            zIndex: '2147483647',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            flexWrap: 'nowrap',
            height: '28px',
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
            className: 'butler-nav-btn',
            style: baseButton,
            'data-butler-workbench': '1',
            'aria-label': t('managementButler'),
            onClick: (event) => {
              event.stopPropagation()
              run(() => {
                exitFullscreen()
                ctx.layout.selectPanel('butler')
              })
            },
          },
          t('managementButler'),
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'butler-nav-btn',
            style: baseButton,
            'data-butler-manage': '1',
            'aria-expanded': open ? 'true' : 'false',
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
            className: 'butler-nav-btn',
            style: baseButton,
            'data-butler-account': '1',
            'aria-label': t('account'),
            'aria-expanded': accountOpen ? 'true' : 'false',
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
        // Global status store: it starts with the plugin, not with ButlerPage.
        // Conversation, settings, market and workbench routes therefore share
        // one live task snapshot instead of unmounting the only poller.
        butlerStatusStore.start()
        return () => butlerStatusStore.stop()
      }, 'butler: global status store')
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
        const overlayStyles = new Map()
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
          overlayStyles.forEach((styles, node) => {
            for (const [name, entry] of Object.entries(styles)) {
              if (entry.value) node.style.setProperty(name, entry.value, entry.priority)
              else node.style.removeProperty(name)
            }
          })
          overlayStyles.clear()
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
            if (!overlayStyles.has(node)) {
              const snapshot = {}
              for (const name of ['position', 'inset', 'z-index', 'overflow', 'pointer-events']) {
                snapshot[name] = {
                  value: node.style.getPropertyValue(name),
                  priority: node.style.getPropertyPriority(name),
                }
              }
              overlayStyles.set(node, snapshot)
            }
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
              ? `${t('account')} 路 ${t('accountUpdate')}${version ? ` ${version}` : ''}`
              : t('account')
            const aria = active ? `${t('account')} 路 ${t('accountUpdate')}` : t('account')
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

      // No automatic panel jump on new user messages. Only a needsUser
      // interaction or an explicit task-card click may open a conversation.
      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: 'butler',
            locale: NS,
            inject: () => ({
              t,
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






