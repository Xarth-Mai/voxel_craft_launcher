
// 全局变量
let currentTab = 'launch';
let playerNameEl;
let versionSelectEl;
let launchButtonEl;
let statusMsgEl;
let progressBarEl;
let statsEl;

// 标签页切换功能
function switchTab(tabName) {
  // 隐藏所有标签页内容
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // 移除所有导航项的active状态
  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.classList.remove('active');
  });

  // 显示选中的标签页
  document.getElementById(`${tabName}-tab`).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  currentTab = tabName;
}

// 启动游戏功能
async function launchGame() {
  const playerName = playerNameEl.value.trim();
  const selectedVersion = versionSelectEl.value;

  if (!playerName) {
    showStatus('请输入玩家名称！', 'error');
    return;
  }

  try {
    // 显示启动状态
    showStatus('正在启动游戏...', 'info');
    launchButtonEl.disabled = true;
    launchButtonEl.textContent = '启动中...';

    // 模拟进度条
    animateProgress(0, 100, 3000);

    // 模拟游戏启动过程
    setTimeout(() => {
      showStatus(`${selectedVersion} 启动成功！玩家: ${playerName}`, 'success');
      launchButtonEl.disabled = false;
      launchButtonEl.innerHTML = '<span class="launch-icon">▶️</span>启动游戏';
      resetProgress();
    }, 3000);
  } catch (error) {
    showStatus(`启动失败: ${error}`, 'error');
    launchButtonEl.disabled = false;
    launchButtonEl.innerHTML = '<span class="launch-icon">▶️</span>启动游戏';
    resetProgress();
  }
}

// 显示状态消息
function showStatus(message, type = 'info') {
  statusMsgEl.textContent = message;
  statusMsgEl.className = `status-message ${type === 'error' ? 'error-message' : type === 'success' ? 'success-message' : ''}`;
}

// 进度条动画
function animateProgress(start, end, duration) {
  const progressFill = progressBarEl.querySelector('.progress-fill');
  const startTime = Date.now();

  function updateProgress() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * (end - start) + start, end);

    progressFill.style.width = `${progress}%`;

    if (progress < end) {
      requestAnimationFrame(updateProgress);
    }
  }

  updateProgress();
}

// 重置进度条
function resetProgress() {
  const progressFill = progressBarEl.querySelector('.progress-fill');
  setTimeout(() => {
    progressFill.style.width = '0%';
  }, 1000);
}


// 初始化应用
window.addEventListener("DOMContentLoaded", async () => {
  // 获取DOM元素
  playerNameEl = document.querySelector("#player-name");
  versionSelectEl = document.querySelector("#version-select");
  launchButtonEl = document.querySelector("#launch-game");
  statusMsgEl = document.querySelector("#status-msg");
  progressBarEl = document.querySelector("#progress-bar");

  // 绑定事件监听器

  // 导航标签页切换
  document.querySelectorAll('.nav-item').forEach(navItem => {
    navItem.addEventListener('click', () => {
      const tabName = navItem.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // 启动游戏按钮
  launchButtonEl.addEventListener('click', launchGame);

  // 玩家名称输入框回车启动
  playerNameEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      launchGame();
    }
  });

  // 初始化状态
  showStatus('准备就绪', 'info');

  console.log('Voxel Craft Launcher 初始化完成');
});
