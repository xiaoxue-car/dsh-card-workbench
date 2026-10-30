#!/usr/bin/env node
/**
 * Static UI contract for this change:
 *   - the butler page is a full-viewport panel below the top chrome;
 *   - the whole app uses the butler full-width layout with the sidebar hidden;
 *   - top application-row bar exposes Manage and Account;
 *   - Manage opens on click only, without turn-jump footer actions;
 *   - the Account button opens the same account menu as the sidebar account;
 *   - card timelines render newest first;
 *   - no in-panel management card and no left floating button;
 *   - conversation composer entry plus shortcut;
 *   - both chat composers receive permission catalog/selection/handler;
 *   - permission labels are Chinese;
 *   - the card chat has a distinct highlighted style.
 *
 * Run: node scripts/test-ui.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = fs.readFileSync(path.join(root, 'client.js'), 'utf8')

const fullPage =
  /\.butler-page\{position:fixed;inset:var\(--dsh-frame-chrome-top,0px\) 0 0 0;z-index:900;height:auto/
const conversationFullscreen =
  /\[class\*="_sidebarCol"\][\s\S]*?setProperty\('visibility', 'hidden', 'important'\)[\s\S]*?grid-template-columns', '0 minmax\(0,1fr\) 0', 'important'/
const permanentFull = /const timer = setInterval\(apply, 500\)/
const persistentCss =
  /\[class\*="_sidebarCol"\]\{visibility:hidden!important/
const noPageRestore = !/isFullscreenPage|fullWidthPending|missingSince/.test(source)
const topbarNoDrag = /webkitAppRegion: 'no-drag'/
const topbarClickOnly = /if \(open\) \{[\s\S]*?close\(\)[\s\S]*?setOpen\(true\)/
const noManageHover = !/onMouseEnter: \(\) => \{\s*refresh\(\)/.test(source)
const topbar = /function ButlerTopbarV2/
const topbarManage = /ButlerTopbar[\s\S]*?t\('management'\)/
const topbarAccount = /ButlerTopbar[\s\S]*?t\('account'\)/
const topbarMenu =
  /t\('managementNew'\)[\s\S]*?managementButler[\s\S]*?nav\[aria-label\][\s\S]*?managementSettings/
const noFooterActions = !/footerActions/.test(source)
const noTurnJumpPanels = /第\\s\*\\d\+\\s\*轮[\s\S]*?加载并跳转/
const accountMenu = /aria-haspopup="menu"/
const accountActions =
  /accountFeedback[\s\S]*?accountSignOut[\s\S]*?accountUpdate/
const accountMenuItems =
  /'account-settings'[\s\S]*?'account-feedback'[\s\S]*?'account-auth'[\s\S]*?'account-update'/
const accountUpdateBridge = /window\.dshDesktop\?\.updates/
const accountUpdateBridgeActive = !/const updates = null/.test(source)
const accountSignout = /clickNativeAccountItem\(2\)/
const accountUpdateBadge = /updates\.subscribe\?\.\(applyState\)/
const accountBadgeElement = /data-butler-update-badge/
const accountAvailable = /accountAvailable: '有新版本'/
const noAccountSidebarReveal = !/openAccount\(\)|BynINW_sidebarCol[\s\S]{0,120}visibility', 'visible/.test(source)
const timelineDescending =
  /const cards = \[\.\.\.job\.cards\]\.sort\(\(a, b\) => \(b\.createdAt \|\| 0\) - \(a\.createdAt \|\| 0\)\)/
const overlaySlot = /shell\.overlay[\s\S]*?butler-topbar/
const noManagementCard = !/butler-management/.test(source)
const shortcut = /event\.ctrlKey \|\| event\.metaKey[\s\S]*?event\.shiftKey[\s\S]*?selectPanel\('butler'\)/
const noLauncher = !/butlerLauncher|launcher\.textContent/.test(source)
const composerEntry = /conversation\.input\.right[\s\S]*?selectPanel\('butler'\)/
const permissionControl =
  /permissionOptions[\s\S]*?onPermission\(event\.target\.value\)/
const permissionChinese = /permissionFullAccess: '最高权限'/
const groupPermission =
  /h\(ComposerControls,[\s\S]*?onClick: sendGroupChat[\s\S]*?permissionCatalog[\s\S]*?onPermission: changePermission/
const groupChatEnter =
  /event\.key === 'Enter' && !event\.shiftKey && !composing[\s\S]*?sendGroupChat\(\)/
const cardChatEnter =
  /event\.key === 'Enter' && !event\.shiftKey && !composing[\s\S]*?onSendChat\(card\.id\)/
const cardPermission =
  /onSendChat: sendChat[\s\S]*?permissionCatalog[\s\S]*?onPermission:\s*changePermission/
const cardHighlight =
  /\.butler-tl-body \.butler-chat\{border:1px solid var\(--dsw-alias-brand-primary\)/
const groupChatBlue =
  /\.butler-group-chat \.butler-chat-compose textarea\{border-color:var\(--dsw-alias-brand-primary\)/
const historyWorkspace =
  /const HISTORY_MS = 1 \* 24 \* 60 \* 60 \* 1000[\s\S]*?historyGroups\.length[\s\S]*?butler-history/
const historyDefaultClosed =
  /const \[historyOpen, setHistoryOpen\] = React\.useState\(false\)/
const draftStorage =
  /const DRAFT_PREFIX = 'butler:draft:'[\s\S]*?localStorage\.setItem\(DRAFT_PREFIX \+ key, value\)/
const automaticNeedsUserOpen =
  /const waiting = \(data\?\.jobs[\s\S]*?if \(sessionId\) openSession\(sessionId\)/
const noAnalysisAutoOpen =
  !/turn\/end[\s\S]{0,200}openSession\(/.test(source)
const manualOpenReturn =
  /returnTrack\.current = \{[\s\S]*?sessionId: id,[\s\S]*?navigationReturn\([\s\S]*?decision === 'return'[\s\S]*?props\.returnToButler\?\.\(\)/
const refreshFeedback = /refreshNow[\s\S]*?announce\(t\('refreshed'\)\)/
const clearFeedback = /clearFinished[\s\S]*?fill\(t\('cleared'\)/
const historyCardSource =
  /\(job\.cards \|\| \[\]\)\.map\(\(card\) =>[\s\S]*?card\.lastActivityAt/
const managementHeader = /managementMenu: '管理菜单'/
const panelNoiseFilter = /!\/\^Panel \\d\+\$\/\.test\(panel\.label\)/
const testArtifactFilter = /!panel\.label\.startsWith\('__TEST_'\)/
const testArtifactCleanup = /getElementById\('butler-test-panel'\)/
const workbenchOnlyTitle =
  /heading: '卡片工坊'/.test(source) && !/总管家/.test(source)
const workspaceRequired =
  /className: 'butler-input',[\s\S]*?placeholder: t\('chooseWorkspaceHint'\)[\s\S]*?!cwd\.trim\(\)[\s\S]*?butler-field-hint/
const noDefaultCwd =
  !/if \(!cwdTouched\.current && data\?\.defaultCwd\) setCwd/.test(source)
const presetSelector =
  /presetCatalog[\s\S]*?presetOptions[\s\S]*?onPreset\(event\.target\.value\)[\s\S]*?preset: currentPreset/
const presetAction = /'selectPreset',[\s\S]*?jobId: job\.id,[\s\S]*?preset/
const chineseModeLabels =
  /modeStandard: '标准模式'[\s\S]*?modePtc: 'PTC 模式'[\s\S]*?modeMinimal: '精简模式'[\s\S]*?modeCreative: '创造模式'/
const boardView = /function BoardView[\s\S]*?butler-board/
const dependencyBadge = /dependsOn\?\.length/
const guardedOverlayWrites = /setImportantIfChanged[\s\S]*?document\.visibilityState === 'hidden'/
const guardedAccountWrites = /if \(account\.title !== title\)/
const activeTaskCard =
  /function ActiveTaskCard[\s\S]*?activeTaskKicker[\s\S]*?taskCompleted[\s\S]*?h\(ActiveTaskCard[\s\S]*?h\(Intake/
const activeTaskClick = /onOpen: openSession/
const completedMerge = /const merged = new Map[\s\S]*?\.slice\(0, 20\)/
const intakeSameRow = /\.butler-intake > \.butler-row\{[^}]*display:grid[^}]*grid-template-columns:minmax\(0,1fr\) auto/
const compactPicker = /\.butler-intake \.butler-workdir-row \.butler-btn\.small\{[^}]*height:28px/
const taskStack = /function TaskBoard[\s\S]*?butler-task-deck[\s\S]*?butler-task-completed-list/
const completedClickRemoval = /setCompletedTasks[\s\S]*?openSession\(sessionId\)/
const planningPlaceholder = /job\.status === 'planning'[\s\S]*?planning:\$\{job\.id\}/
const stableWorkspaceOrder = /workspaceOrder\.current\.get\(a\.cwd\)/
const persistedWorkspaceOrder = /const WORKSPACE_ORDER_KEY = 'butler:workspace-order'[\s\S]*?saveWorkspaceOrder\(workspaceOrder\.current\)/
const strongJobActions = /butler-action-strong[\s\S]*?openConversation[\s\S]*?pauseJob[\s\S]*?deleteJob/
const clearCompleted = /butler-clear-completed[\s\S]*?onClearCompleted/
const clearCompletedReset = /onClearCompleted: \(\) => setCompletedTasks\(\[\]\)/
const hideEmptyCompletedLane = /completed\.length\s*\?\s*h\(\s*'section'[\s\S]*?\) : null/
const workspaceDropdown = /workspaces && workspaces\.length[\s\S]*?butler-select/

assert.ok(fullPage.test(source), 'butler page must be fixed below the top chrome and fill the viewport')
assert.ok(conversationFullscreen.test(source), 'the app layout must hide the sidebar and fill the grid')
assert.ok(permanentFull.test(source), 'full-width layout must be applied continuously on every page')
assert.ok(persistentCss.test(source), 'a persistent stylesheet must hide the sidebar immediately')
assert.ok(noPageRestore, 'no page transition may restore the sidebar')
assert.ok(topbarNoDrag.test(source), 'topbar buttons must opt out of the native drag region')
assert.ok(topbarClickOnly.test(source), 'topbar Manage must open and close on click only')
assert.ok(noManageHover, 'topbar Manage must not open on hover')
assert.ok(topbar.test(source), 'a top application-row bar must exist')
assert.ok(overlaySlot.test(source), 'the topbar must render in the shell overlay slot')
assert.ok(topbarManage.test(source), 'the topbar must expose 管理')
assert.ok(topbarAccount.test(source), 'the topbar must expose 账号')
assert.ok(topbarMenu.test(source), '管理 must expose new chat, butler, panels and settings')
assert.ok(noFooterActions, '管理 must not include footer actions')
assert.ok(noTurnJumpPanels.test(source), '管理 must filter turn-jump items from panels')
assert.ok(accountMenu.test(source), '账号 must click the sidebar account menu trigger')
assert.ok(accountActions.test(source), '账号 menu must expose feedback, sign-out and update')
assert.ok(accountMenuItems.test(source), '账号 menu must wire settings, feedback, auth and update keys')
assert.ok(accountUpdateBridge.test(source), '更新软件 must call the desktop update bridge')
assert.ok(accountUpdateBridgeActive, 'update badge must subscribe to the live desktop bridge')
assert.ok(accountSignout.test(source), '退出登录 must use the native account menu item')
assert.ok(accountUpdateBadge.test(source), '账号 button must subscribe to update state')
assert.ok(accountBadgeElement.test(source), '账号 button must render an update badge element')
assert.ok(accountAvailable.test(source), 'update badge must have a localized new-version label')
assert.ok(noAccountSidebarReveal, 'opening the account menu must not reveal the hidden sidebar')
assert.ok(timelineDescending.test(source), 'card timelines must render newest first')
assert.ok(noManagementCard, 'the in-panel management card must be removed')
assert.ok(shortcut.test(source), 'Ctrl/Cmd+Shift+B must open the butler')
assert.ok(noLauncher, 'no left floating butler button may remain')
assert.ok(composerEntry.test(source), 'the conversation composer must expose a butler entry')
assert.ok(permissionControl.test(source), 'ComposerControls must render permission select and call onPermission')
assert.ok(permissionChinese.test(source), 'permission labels must be Chinese')
assert.ok(groupPermission.test(source), 'group composer must receive permission props')
assert.ok(groupChatEnter.test(source), 'group composer must send on Enter; Shift+Enter inserts a newline')
assert.ok(cardChatEnter.test(source), 'timeline card composer must send on Enter; Shift+Enter inserts a newline')
assert.ok(cardPermission.test(source), 'card composer must receive permission props')
assert.ok(cardHighlight.test(source), 'card chat must have a distinct highlighted border')
assert.ok(groupChatBlue.test(source), 'workspace group chat input must use a blue border')
assert.ok(historyWorkspace.test(source), 'workspaces unused for 1 day must render in a history section')
assert.ok(historyDefaultClosed.test(source), 'history workspaces must start collapsed')
assert.ok(historyCardSource.test(source), 'history age must use real card activity, not internal job updates')
assert.ok(refreshFeedback.test(source), 'refresh must show a visible result')
assert.ok(clearFeedback.test(source), 'clear must report how many finished jobs were removed')
assert.ok(managementHeader.test(source), 'manage menu must use a distinct header, not a duplicate 总管家 item')
assert.ok(panelNoiseFilter.test(source), 'manage menu must hide unlabeled Panel N entries')
assert.ok(testArtifactFilter.test(source), 'manage menu must hide injected __TEST_ artifacts')
assert.ok(testArtifactCleanup.test(source), 'plugin startup must remove the injected test nav node')
assert.ok(workbenchOnlyTitle, 'visible UI must use 卡片工坊 and remove 总管家 wording')
assert.ok(workspaceRequired, 'empty workspace must show the choose-folder prompt')
assert.ok(noDefaultCwd, 'workspace must not be prefilled with the default directory')
assert.ok(presetSelector.test(source), 'all composers must expose a per-conversation mode selector')
assert.ok(presetAction.test(source), 'mode selector must call the selectPreset action')
assert.ok(chineseModeLabels.test(source), 'mode options must display Chinese labels')
assert.ok(boardView.test(source), 'the workbench must provide a board view')
assert.ok(dependencyBadge.test(source), 'cards must display dependency metadata')
assert.ok(guardedOverlayWrites.test(source), 'overlay layout writes must be change-guarded and skip hidden tabs')
assert.ok(guardedAccountWrites.test(source), 'account badge writes must not run unconditionally')
assert.ok(activeTaskCard.test(source), 'active task card must render above Intake and expose completion state')
assert.ok(activeTaskClick.test(source), 'clicking the active task card must open its conversation')
assert.ok(completedMerge.test(source), 'completed tasks must merge and deduplicate')
assert.ok(intakeSameRow.test(source), 'Intake workdir and start button must stay on one row')
assert.ok(compactPicker.test(source), 'the choose-folder button must be compact')
assert.ok(taskStack.test(source), 'all active tasks must render in the task deck')
assert.ok(completedClickRemoval.test(source), 'clicking a completed task must remove it and open its conversation')
assert.ok(planningPlaceholder.test(source), 'a newly created planning job must render immediately')
assert.ok(stableWorkspaceOrder.test(source), 'workspace order must not follow activity')
assert.ok(persistedWorkspaceOrder.test(source), 'workspace order must persist across reloads and active-session changes')
assert.ok(strongJobActions.test(source), 'open, pause and remove buttons must use the strong action style')
assert.ok(clearCompleted.test(source), 'the completed lane must expose a clear-all button')
assert.ok(clearCompletedReset.test(source), 'clicking clear-all must reset completedTasks')
assert.ok(hideEmptyCompletedLane.test(source), 'an empty completed lane must be removed')
assert.ok(workspaceDropdown.test(source), 'the intake workdir must offer an existing-workspace dropdown')
assert.ok(draftStorage.test(source), 'unsent composer text must be persisted to local storage')
assert.ok(!automaticNeedsUserOpen.test(source), 'needsUser must not auto-open; the user clicks the task card')
assert.ok(manualOpenReturn.test(source), 'manual 打开对话 must return to cards after a turn/answer ends')
assert.ok(noAnalysisAutoOpen, 'analysis completion must not auto-open a conversation')

console.log('PASS page: fixed full viewport below top chrome')
console.log('PASS layout: sidebar hidden and frame grid full width')
console.log('PASS layout: permanent full width on every page; no page transition restores sidebar')
console.log('PASS layout: persistent CSS hides sidebar immediately during route/module refresh')
console.log('PASS topbar interaction: no-drag + click-only Manage')
console.log('PASS topbar: 管理 + 账号 in the application row')
console.log('PASS topbar Manage: new chat, butler, panels, settings; no turn-jump items')
console.log('PASS account: native account actions + update, no sidebar reveal')
console.log('PASS account: settings/feedback/auth/update items are wired')
console.log('PASS account: update subscription + badge + localized new-version label')
console.log('PASS timeline: cards render newest first')
console.log('PASS in-panel management removed: no butler-management card')
console.log('PASS shortcut: Ctrl/Cmd+Shift+B opens the butler')
console.log('PASS no left launcher: floating button removed')
console.log('PASS conversation composer: butler entry present')
console.log('PASS permission control: catalog options + Chinese labels')
console.log('PASS both composers: group and card receive permission props')
console.log('PASS group composer: Enter sends, Shift+Enter keeps newline, IME is ignored')
console.log('PASS timeline card composer: Enter sends, Shift+Enter keeps newline, IME is ignored')
console.log('PASS card highlight: brand border/padding style present')
console.log('PASS group chat input: blue border + focus ring')
console.log('PASS history workspaces: 1-day split, collapsed by default')
console.log('PASS refresh: visible loading/result feedback')
console.log('PASS clear: visible removed-count feedback')
console.log('PASS manage menu: unique header and no stray Panel N entries')
console.log('PASS manage menu: injected __TEST_ nav artifact is removed and filtered')
console.log('PASS title: only 卡片工坊 is visible; 总管家 wording removed')
console.log('PASS workdir: empty by default with choose-folder prompt')
console.log('PASS mode: per-conversation selector wired to selectPreset')
console.log('PASS mode: Chinese labels 标准/PTC/精简/创造')
console.log('PASS board view: timeline/board toggle with dependency metadata')
console.log('PASS render loop: overlay/account writes are change-guarded')
console.log('PASS active task: current task card above Intake with completion state')
console.log('PASS task board: running deck and completed lane render together')
console.log('PASS task board: new planning task renders before cards exist')
console.log('PASS completed task: clicking removes it and opens the conversation')
console.log('PASS workspace order: first-seen order is stable across activity')
console.log('PASS workspace order: first-seen order is persisted in localStorage')
console.log('PASS conversation actions: open, pause and remove are visually strong')
console.log('PASS completed lane: clear-all button is present')
console.log('PASS completed lane: clear-all resets completedTasks to []')
console.log('PASS completed lane: empty lane is removed after the last item')
console.log('PASS intake: existing workspace dropdown is present')
console.log('PASS no auto jump: user messages and needsUser do not navigate automatically')
console.log('PASS navigation: no automatic conversation open; task-card click only')
console.log('PASS navigation: manual 打开对话 returns after the turn ends')
console.log('PASS drafts: unsent text persisted across close/reload')

