const STORAGE_KEYS = {
  users: "campusSpiderUsers",
  session: "campusSpiderSession",
  words: "campusSpiderWords",
  games: "campusSpiderGames"
};

const DEFAULT_WORDS = [
  { word: "Ensino", theme: "Educação", difficulty: 1 },
  { word: "Estudo", theme: "Aprendizagem", difficulty: 2 },
  { word: "Aluno", theme: "Educação", difficulty: 3 },
  { word: "Desafio", theme: "Gamificação", difficulty: 4 },
  { word: "Progresso", theme: "Gamificação", difficulty: 5 },
  { word: "Motivação", theme: "Aprendizagem", difficulty: 6 },
  { word: "Interação", theme: "Tecnologia", difficulty: 7 },
  { word: "Estratégia", theme: "Jogos", difficulty: 8 },
  { word: "Engajamento", theme: "Gamificação", difficulty: 9 },
  { word: "Cognição", theme: "Aprendizagem", difficulty: 10 },
  { word: "Metodologia", theme: "Educação", difficulty: 11 },
  { word: "Interatividade", theme: "Tecnologia", difficulty: 12 },
  { word: "Aprendizagem", theme: "Educação", difficulty: 13 }
];

const DEFAULT_GAMES = [];

const SUITS = [
  { id: "hearts", symbol: "♥" },
  { id: "diamonds", symbol: "♦" },
  { id: "clubs", symbol: "♣" },
  { id: "spades", symbol: "♠" }
];

const state = {
  currentUser: null,
  authMode: "login",
  teacherView: "home",
  studentView: "home",
  selectedCard: null,
  board: Array.from({ length: 10 }, () => []),
  stock: [],
  completedRuns: [],
  undoStack: [],
  gameStats: {
    moves: 0,
    roundScore: 0,
    elapsedSeconds: 0,
    invalidMoves: 0,
    timerId: null
  },
  gameConfig: {
    suitCount: null,
    suitTopics: []
  },
  pendingDelete: null,
  showInstructionsOnLogin: false,
  instructionsReturnView: null,
  draggingCard: false
};

const els = {
  authSection: document.getElementById("authSection"),
  topbar: document.getElementById("topbar"),
  studentSection: document.getElementById("studentSection"),
  teacherSection: document.getElementById("teacherSection"),
  sessionInfo: document.getElementById("sessionInfo"),
  logoutBtn: document.getElementById("logoutBtn"),
  authCard: document.querySelector(".auth-card"),
  authTitle: document.getElementById("authTitle"),
  showLoginBtn: document.getElementById("showLoginBtn"),
  showRegisterBtn: document.getElementById("showRegisterBtn"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  registerName: document.getElementById("registerName"),
  registerEmail: document.getElementById("registerEmail"),
  registerPassword: document.getElementById("registerPassword"),
  registerPasswordConfirm: document.getElementById("registerPasswordConfirm"),
  passwordToggleButtons: Array.from(document.querySelectorAll(".password-toggle")),
  authMessage: document.getElementById("authMessage"),
  studentWelcome: document.getElementById("studentWelcome"),
  xpValue: document.getElementById("xpValue"),
  levelValue: document.getElementById("levelValue"),
  matchesValue: document.getElementById("matchesValue"),
  lastScoreValue: document.getElementById("lastScoreValue"),
  bestScoreValue: document.getElementById("bestScoreValue"),
  newGameBtn: document.getElementById("newGameBtn"),
  dealBtn: document.getElementById("dealBtn"),
  undoBtn: document.getElementById("undoBtn"),
  gameMessage: document.getElementById("gameMessage"),
  board: document.getElementById("board"),
  stockBtn: document.getElementById("stockBtn"),
  stockCount: document.getElementById("stockCount"),
  metricTime: document.getElementById("metricTime"),
  metricMoves: document.getElementById("metricMoves"),
  metricScore: document.getElementById("metricScore"),
  homeHighlights: document.getElementById("homeHighlights"),
  homeRecommendedTheme: document.getElementById("homeRecommendedTheme"),
  homeRecommendedAction: document.getElementById("homeRecommendedAction"),
  homeThemeList: document.getElementById("homeThemeList"),
  moduleGrid: document.getElementById("moduleGrid"),
  challengeTheme: document.getElementById("challengeTheme"),
  challengeObjective: document.getElementById("challengeObjective"),
  challengePageObjective: document.getElementById("challengePageObjective"),
  challengeProgressSummary: document.getElementById("challengeProgressSummary"),
  challengeRunList: document.getElementById("challengeRunList"),
  studentRanking: document.getElementById("studentRanking"),
  studentRankingSummary: document.getElementById("studentRankingSummary"),
  studentRankingTableBody: document.getElementById("studentRankingTableBody"),
  profileName: document.getElementById("profileName"),
  profileEmail: document.getElementById("profileEmail"),
  profileRole: document.getElementById("profileRole"),
  profileXp: document.getElementById("profileXp"),
  profileLevel: document.getElementById("profileLevel"),
  profileMatches: document.getElementById("profileMatches"),
  profileLastScore: document.getElementById("profileLastScore"),
  profileBestScore: document.getElementById("profileBestScore"),
  teacherProfileName: document.getElementById("teacherProfileName"),
  teacherProfileEmail: document.getElementById("teacherProfileEmail"),
  teacherProfileRole: document.getElementById("teacherProfileRole"),
  teacherProfileWords: document.getElementById("teacherProfileWords"),
  teacherProfileStudents: document.getElementById("teacherProfileStudents"),
  teacherProfileGames: document.getElementById("teacherProfileGames"),
  progressAccuracy: document.getElementById("progressAccuracy"),
  progressChallenges: document.getElementById("progressChallenges"),
  progressMedals: document.getElementById("progressMedals"),
  progressXpBar: document.getElementById("progressXpBar"),
  progressXpCurrent: document.getElementById("progressXpCurrent"),
  progressXpTarget: document.getElementById("progressXpTarget"),
  streakInfo: document.getElementById("streakInfo"),
  levelPill: document.getElementById("levelPill"),
  topXpValue: document.getElementById("topXpValue"),
  xpPill: document.getElementById("xpPill"),
  avatarPill: document.getElementById("avatarPill"),
  completedBoard: document.getElementById("completedBoard"),
  completedCount: document.getElementById("completedCount"),
  suitModal: document.getElementById("suitModal"),
  suitModalMessage: document.getElementById("suitModalMessage"),
  closeSuitModalBtn: document.getElementById("closeSuitModalBtn"),
  winModal: document.getElementById("winModal"),
  instructionsModal: document.getElementById("instructionsModal"),
  closeInstructionsBtn: document.getElementById("closeInstructionsBtn"),
  deleteModal: document.getElementById("deleteModal"),
  deleteModalMessage: document.getElementById("deleteModalMessage"),
  cancelDeleteBtn: document.getElementById("cancelDeleteBtn"),
  confirmDeleteBtn: document.getElementById("confirmDeleteBtn"),
  winScoreValue: document.getElementById("winScoreValue"),
  winMovesValue: document.getElementById("winMovesValue"),
  winTimeValue: document.getElementById("winTimeValue"),
  winLastScoreValue: document.getElementById("winLastScoreValue"),
  winBestScoreValue: document.getElementById("winBestScoreValue"),
  playAgainBtn: document.getElementById("playAgainBtn"),
  closeToHomeBtn: document.getElementById("closeToHomeBtn"),
  wordForm: document.getElementById("wordForm"),
  wordIdInput: document.getElementById("wordIdInput"),
  wordInput: document.getElementById("wordInput"),
  themeInput: document.getElementById("themeInput"),
  difficultyInput: document.getElementById("difficultyInput"),
  wordCrudBody: document.getElementById("wordCrudBody"),
  cancelWordEditBtn: document.getElementById("cancelWordEditBtn"),
  rankingBody: document.getElementById("rankingBody"),
  teacherMessage: document.getElementById("teacherMessage"),
  userForm: document.getElementById("userForm"),
  userIdInput: document.getElementById("userIdInput"),
  userNameInput: document.getElementById("userNameInput"),
  userEmailInput: document.getElementById("userEmailInput"),
  userPasswordInput: document.getElementById("userPasswordInput"),
  userRoleInput: document.getElementById("userRoleInput"),
  userXpInput: document.getElementById("userXpInput"),
  userMatchesInput: document.getElementById("userMatchesInput"),
  cancelUserEditBtn: document.getElementById("cancelUserEditBtn"),
  userCrudBody: document.getElementById("userCrudBody"),
  gameForm: document.getElementById("gameForm"),
  gameIdInput: document.getElementById("gameIdInput"),
  gameUserInput: document.getElementById("gameUserInput"),
  gameSuitCountInput: document.getElementById("gameSuitCountInput"),
  gameResultInput: document.getElementById("gameResultInput"),
  gameScoreInput: document.getElementById("gameScoreInput"),
  gameMovesInput: document.getElementById("gameMovesInput"),
  gameDurationInput: document.getElementById("gameDurationInput"),
  cancelGameEditBtn: document.getElementById("cancelGameEditBtn"),
  gameCrudBody: document.getElementById("gameCrudBody"),
  teacherHomeStats: document.getElementById("teacherHomeStats"),
  teacherHomeSpotlight: document.getElementById("teacherHomeSpotlight"),
  teacherHomeRecentGames: document.getElementById("teacherHomeRecentGames"),
  topNavItems: Array.from(document.querySelectorAll(".top-nav li")),
  studentViews: Array.from(document.querySelectorAll("[data-student-view]")),
  teacherPanels: Array.from(document.querySelectorAll("[data-teacher-view]"))
};

let appInitialized = false;

async function loadMenuConfigs() {
  const result = { student: null, teacher: null };
  try {
    const [sRes, tRes] = await Promise.all([
      fetch("/data/menu-student.json?v=2", { cache: "force-cache" }),
      fetch("/data/menu-teacher.json?v=2", { cache: "force-cache" })
    ]);

    if (sRes.ok) {
      result.student = await sRes.json();
    }

    if (tRes.ok) {
      result.teacher = await tRes.json();
    }
  } catch (e) {
    console.warn("Falha ao carregar configs de menu:", e);
  }

  state.menuConfigs = result;
}

async function init() {
  if (appInitialized) {
    return;
  }

  appInitialized = true;
  await loadMenuConfigs();
  seedData();
  hydrateFromDatabase();
  syncAllToDatabase();
  bindEvents();
  restoreSession();
}

window.initializeSpiderEduApp = init;

function seedData() {
  if (!localStorage.getItem(STORAGE_KEYS.words)) {
    localStorage.setItem(STORAGE_KEYS.words, JSON.stringify(DEFAULT_WORDS));
  }

  if (!localStorage.getItem(STORAGE_KEYS.games)) {
    localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(DEFAULT_GAMES));
  }
}

function bindEvents() {
  els.loginForm?.addEventListener("submit", handleLogin);
  els.registerForm?.addEventListener("submit", handleRegister);
  els.showLoginBtn?.addEventListener("click", () => setAuthMode("login"));
  els.showRegisterBtn?.addEventListener("click", () => setAuthMode("register"));
  els.passwordToggleButtons.forEach((button) => {
    button.addEventListener("click", () => togglePasswordVisibility(button));
  });
  els.email?.addEventListener("input", clearAuthInputErrors);
  els.password?.addEventListener("input", clearAuthInputErrors);
  els.registerName?.addEventListener("input", clearAuthInputErrors);
  els.registerEmail?.addEventListener("input", clearAuthInputErrors);
  els.registerPassword?.addEventListener("input", clearAuthInputErrors);
  els.registerPasswordConfirm?.addEventListener("input", clearAuthInputErrors);
  els.logoutBtn.addEventListener("click", logout);
  els.newGameBtn.addEventListener("click", startNewGame);
  els.dealBtn.addEventListener("click", dealFromStock);
  els.undoBtn.addEventListener("click", undoLastAction);
  els.stockBtn.addEventListener("click", dealFromStock);
  els.wordForm.addEventListener("submit", saveWord);
  els.cancelWordEditBtn?.addEventListener("click", resetWordForm);
  els.wordCrudBody?.addEventListener("click", handleWordCrudAction);
  els.userForm?.addEventListener("submit", saveUser);
  els.cancelUserEditBtn?.addEventListener("click", resetUserForm);
  els.userCrudBody?.addEventListener("click", handleUserCrudAction);
  els.gameForm?.addEventListener("submit", saveGame);
  els.cancelGameEditBtn?.addEventListener("click", resetGameForm);
  els.gameCrudBody?.addEventListener("click", handleGameCrudAction);
  els.playAgainBtn?.addEventListener("click", handlePlayAgain);
  els.closeToHomeBtn?.addEventListener("click", handleCloseToHome);
  els.closeSuitModalBtn?.addEventListener("click", closeSuitModal);
  els.closeInstructionsBtn?.addEventListener("click", closeInstructionsModal);
  document.querySelector("[data-close-instructions]")?.addEventListener("click", closeInstructionsModal);
  els.cancelDeleteBtn?.addEventListener("click", closeDeleteModal);
  els.confirmDeleteBtn?.addEventListener("click", confirmPendingDelete);
  document.querySelector("[data-close-delete-modal]")?.addEventListener("click", closeDeleteModal);
  document.addEventListener("keydown", handleGlobalKeydown);
  document.addEventListener("click", handleGlobalClick);
  els.topNavItems.forEach((item) => item.addEventListener("click", handleTopMenuClick));
  document.querySelectorAll(".suit-choice-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const suits = Number(button.dataset.suits);
      applyGameConfig(suits);
    });
  });
}

function handleGlobalClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const aboutNavItem = target.closest('.top-nav li[data-modal="instructions"]');
  if (aboutNavItem && state.currentUser) {
    event.preventDefault();
    openInstructionsModal();
    return;
  }

  const topNavItem = target.closest('.top-nav li[data-view]');
  if (topNavItem && state.currentUser) {
    const view = topNavItem.dataset.view;
    if (!view) {
      return;
    }

    if (state.currentUser.role === 'teacher') {
      setTeacherView(view);
      return;
    }

    setStudentView(view);
    return;
  }

  if (target.closest("#closeSuitModalBtn")) {
    closeSuitModal();
    return;
  }

  const moduleCard = target.closest(".module-card[data-action='start-module']");
  if (moduleCard && state.currentUser?.role === "student") {
    setStudentView("home");
    openSuitModal();
    setMessage(
      els.suitModalMessage,
      `Escolha a quantidade de naipes para iniciar o tema ${moduleCard.dataset.theme}.`
    );
    return;
  }

  const targetViewButton = target.closest("button[data-target-view]");
  if (targetViewButton) {
    const targetView = targetViewButton.dataset.targetView;
    if (!targetView) {
      return;
    }

    if (state.currentUser?.role === "teacher") {
      setTeacherView(targetView);
      return;
    }

    setStudentView(targetView);
    return;
  }

  const actionButton = target.closest("button[data-action]");
  if (actionButton?.dataset.action === "start-game") {
    if (state.currentUser?.role === "student") {
      setStudentView("home");
      openSuitModal();
      return;
    }

    startNewGame();
  }
}

function handleGlobalKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const moduleCard = event.target.closest?.(".module-card[data-action='start-module']");
  if (!moduleCard) {
    return;
  }

  event.preventDefault();
  moduleCard.click();
}

function restoreSession() {
  const sessionRaw = localStorage.getItem(STORAGE_KEYS.session);
  if (!sessionRaw) {
    showAuth();
    return;
  }

  const users = getUsers();
  const session = JSON.parse(sessionRaw);
  state.showInstructionsOnLogin = session.showInstructions === true;
  const user = users.find((item) => item.id === session.userId);

  if (!user) {
    showAuth();
    return;
  }

  state.currentUser = user;
  renderByRole();
}

async function hashPassword(password) {
  const plainPassword = String(password ?? "").trim();
  if (!plainPassword) {
    return "";
  }

  if (window.crypto?.subtle) {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const saltB64 = btoa(String.fromCharCode(...salt));
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(plainPassword),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const derivedBits = await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 120000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    const hashB64 = btoa(String.fromCharCode(...new Uint8Array(derivedBits)));
    return `pbkdf2_sha256$120000$${saltB64}$${hashB64}`;
  }

  return `sha256$${btoa(unescape(encodeURIComponent(plainPassword)))}`;
}

async function verifyPassword(password, storedPassword) {
  if (!password || !storedPassword) {
    return false;
  }

  if (storedPassword === password) {
    return true;
  }

  if (typeof storedPassword !== "string") {
    return false;
  }

  if (storedPassword.startsWith("pbkdf2_sha256$")) {
    const [algorithm, iterations, saltB64, hashB64] = storedPassword.split("$");
    if (algorithm !== "pbkdf2_sha256" || !saltB64 || !hashB64) {
      return false;
    }

    try {
      const salt = Uint8Array.from(atob(saltB64), (char) => char.charCodeAt(0));
      const encoder = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(String(password)),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );
      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt,
          iterations: Number(iterations),
          hash: "SHA-256"
        },
        keyMaterial,
        256
      );
      const computed = btoa(String.fromCharCode(...new Uint8Array(derivedBits)));
      return computed === hashB64;
    } catch {
      return false;
    }
  }

  return false;
}

async function handleLogin(event) {
  event.preventDefault();
  const email = els.email.value.trim().toLowerCase();
  const password = els.password.value.trim();
  const users = getUsers();
  const user = users.find((item) => item.email === email);

  if (!user || !(await verifyPassword(password, user.password))) {
    setAuthInputErrors();
    setMessage(els.authMessage, "Credenciais inválidas.", true);
    return;
  }

  clearAuthInputErrors();
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ userId: user.id }));
  state.currentUser = user;
  setMessage(els.authMessage, "");
  renderByRole();
}

async function handleRegister(event) {
  event.preventDefault();

  const name = (els.registerName?.value || "").trim();
  const email = (els.registerEmail?.value || "").trim().toLowerCase();
  const password = (els.registerPassword?.value || "").trim();
  const passwordConfirm = (els.registerPasswordConfirm?.value || "").trim();

  clearAuthInputErrors();

  if (!name || !email || !password || !passwordConfirm) {
    setAuthInputErrors(els.registerName, els.registerEmail, els.registerPassword, els.registerPasswordConfirm);
    setMessage(els.authMessage, "Preencha todos os campos para cadastrar.", true);
    return;
  }

  if (password.length < 8) {
    setAuthInputErrors(els.registerPassword, els.registerPasswordConfirm);
    setMessage(els.authMessage, "A senha deve ter pelo menos 8 caracteres.", true);
    return;
  }

  if (password !== passwordConfirm) {
    setAuthInputErrors(els.registerPassword, els.registerPasswordConfirm);
    setMessage(els.authMessage, "As senhas não coincidem.", true);
    return;
  }

  const users = getUsers();
  const exists = users.some((item) => item.email === email);
  if (exists) {
    setAuthInputErrors(els.registerEmail);
    setMessage(els.authMessage, "Ja existe uma conta com esse email.", true);
    return;
  }

  const nextId = users.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1;
  const passwordHash = await hashPassword(password);
  const newUser = {
    id: nextId,
    name,
    email,
    password: passwordHash,
    role: "student",
    xp: 0,
    matches: 0
  };

  users.push(newUser);
  setUsers(users);

  localStorage.setItem(
    STORAGE_KEYS.session,
    JSON.stringify({ userId: newUser.id, showInstructions: true })
  );
  state.currentUser = newUser;
  state.showInstructionsOnLogin = true;
  setMessage(els.authMessage, "Conta criada com sucesso.");
  renderByRole();
}

function logout() {
  stopGameTimer();
  localStorage.removeItem(STORAGE_KEYS.session);
  state.currentUser = null;
  state.selectedCard = null;
  state.gameConfig = { suitCount: null, suitTopics: [] };
  state.gameStats = { moves: 0, roundScore: 0, elapsedSeconds: 0, invalidMoves: 0, timerId: null };
  closeSuitModal();
  closeWinModal();
  closeInstructionsModal();
  closeDeleteModal();
  exitGameFocusMode();
  showAuth();
}

function renderByRole() {
  if (!state.currentUser) {
    showAuth();
    return;
  }

  document.body.classList.remove("auth-view");
  els.topbar?.classList.remove("hidden");
  els.topbar?.classList.remove("logged-out");
  els.authSection.classList.add("hidden");
  els.logoutBtn.classList.remove("hidden");
  els.sessionInfo.classList.remove("hidden");
  els.levelPill?.classList.remove("hidden");
  els.xpPill?.classList.remove("hidden");
  els.avatarPill?.classList.remove("hidden");
  els.sessionInfo.textContent = `${state.currentUser.name} (${state.currentUser.role === "teacher" ? "Professor" : "Aluno"})`;

  if (state.currentUser.role === "teacher") {
    exitGameFocusMode();
    configureTopMenuForTeacher();
    els.studentSection.classList.add("hidden");
    els.teacherSection.classList.remove("hidden");
    renderTeacherArea();
    return;
  }

  configureTopMenuForStudent();
  els.teacherSection.classList.add("hidden");
  els.studentSection.classList.remove("hidden");

  if (!state.gameConfig.suitCount || !state.gameConfig.suitTopics.length) {
    state.gameConfig.suitCount = 1;
    state.gameConfig.suitTopics = buildSuitTopics(1);
  }

  renderStudentInfo();
  setStudentView(state.studentView || "home");
  if (state.showInstructionsOnLogin) {
    state.showInstructionsOnLogin = false;
    openInstructionsModal();
  }
}

function showAuth() {
  exitGameFocusMode();
  state.studentView = "home";
  state.teacherView = "home";
  document.body.classList.add("auth-view");
  els.topbar?.classList.add("hidden");
  els.topbar?.classList.add("logged-out");
  els.authSection.classList.remove("hidden");
  els.studentSection.classList.add("hidden");
  els.teacherSection.classList.add("hidden");
  els.logoutBtn.classList.add("hidden");
  els.sessionInfo.classList.add("hidden");
  els.levelPill?.classList.add("hidden");
  els.xpPill?.classList.add("hidden");
  els.avatarPill?.classList.add("hidden");
  if (els.topXpValue) {
    els.topXpValue.textContent = "0 XP";
  }
  if (els.levelPill) {
    const levelLabel = els.levelPill.querySelector(".level-title");
    const levelFill = els.levelPill.querySelector(".level-progress-fill");
    if (levelLabel) {
      levelLabel.textContent = "Nivel 1";
    }
    if (levelFill) {
      levelFill.style.width = "0%";
    }
  }
  clearAuthInputErrors();
  els.loginForm?.reset();
  els.registerForm?.reset();
  setMessage(els.authMessage, "");
  setAuthMode("login", false);
  configureTopMenuForStudent();
}

function setAuthInputErrors(...inputs) {
  if (inputs.length) {
    inputs.forEach((input) => input?.classList?.add("input-error"));
    return;
  }

  els.email?.classList.add("input-error");
  els.password?.classList.add("input-error");
}

function clearAuthInputErrors() {
  els.email?.classList.remove("input-error");
  els.password?.classList.remove("input-error");
  els.registerName?.classList.remove("input-error");
  els.registerEmail?.classList.remove("input-error");
  els.registerPassword?.classList.remove("input-error");
  els.registerPasswordConfirm?.classList.remove("input-error");
}

function setAuthMode(mode, animate = true) {
  state.authMode = mode;
  const isRegister = mode === "register";
  const cardEl = els.authCard;
  const fromHeight = cardEl?.offsetHeight || 0;

  els.authTitle.textContent = isRegister ? "Cadastrar" : "Entrar";
  els.showLoginBtn?.classList.toggle("active", !isRegister);
  els.showRegisterBtn?.classList.toggle("active", isRegister);
  els.showLoginBtn?.setAttribute("aria-selected", String(!isRegister));
  els.showRegisterBtn?.setAttribute("aria-selected", String(isRegister));

  els.loginForm?.classList.toggle("auth-form-active", !isRegister);
  els.registerForm?.classList.toggle("auth-form-active", isRegister);

  if (animate && cardEl) {
    requestAnimationFrame(() => {
      const toHeight = cardEl.offsetHeight;
      if (!fromHeight || !toHeight || fromHeight === toHeight) {
        return;
      }

      cardEl.classList.add("auth-card-height-animating");
      cardEl.style.height = `${fromHeight}px`;
      requestAnimationFrame(() => {
        cardEl.style.height = `${toHeight}px`;
      });

      setTimeout(() => {
        cardEl.style.height = "";
        cardEl.classList.remove("auth-card-height-animating");
      }, 340);
    });
  }

  if (animate) {
    const activeForm = isRegister ? els.registerForm : els.loginForm;
    activeForm?.classList.remove("auth-form-animate");
    void activeForm?.offsetWidth;
    activeForm?.classList.add("auth-form-animate");
  }
}

function togglePasswordVisibility(button) {
  const targetId = button.dataset.targetInput;
  if (!targetId) {
    return;
  }

  const input = document.getElementById(targetId);
  if (!input) {
    return;
  }

  const show = input.type === "password";
  input.type = show ? "text" : "password";
  button.textContent = show ? "🙈" : "👁";
  button.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
}

function renderStudentInfo() {
  const student = refreshCurrentUser();
  const level = getLevel(student.xp || 0);
  els.studentWelcome.textContent = `Bom estudo, ${student.name}. Forme sequências completas para ganhar XP.`;
  els.xpValue.textContent = String(student.xp || 0);
  els.levelValue.textContent = String(level);
  els.matchesValue.textContent = String(student.matches || 0);
  if (els.lastScoreValue) {
    els.lastScoreValue.textContent = String(student.lastScore || 0);
  }
  if (els.bestScoreValue) {
    els.bestScoreValue.textContent = String(student.bestScore || 0);
  }
  if (els.levelPill) {
    const levelLabel = els.levelPill.querySelector(".level-title");
    const levelFill = els.levelPill.querySelector(".level-progress-fill");
    const xp = student.xp || 0;
    const levelFloor = (level - 1) * 150;
    const levelTarget = level * 150;
    const levelSpan = levelTarget - levelFloor;
    const levelPct = Math.max(0, Math.min(100, Math.round(((xp - levelFloor) / levelSpan) * 100)));

    if (levelLabel) {
      levelLabel.textContent = `Nivel ${level}`;
    }

    if (levelFill) {
      levelFill.style.width = `${levelPct}%`;
    }
  }

  if (els.topXpValue) {
    els.topXpValue.textContent = `${student.xp || 0} XP`;
  }
  renderStudentSidebar();
  renderLiveMetrics();
  renderStudentView(state.studentView || "home");
}

function renderTeacherArea() {
  renderWords();
  renderRanking();
  renderUsersCrud();
  renderGamesCrud();
  resetUserForm();
  resetGameForm();
  setTeacherView(state.teacherView || "home");
}

function handleTopMenuClick(event) {
  const item = event.currentTarget;

  if (state.currentUser?.role !== "teacher") {
    setStudentView(item.dataset.view || "home");
    return;
  }

  const view = item.dataset.view;
  if (!view) {
    return;
  }

  setTeacherView(view);
}

function configureTopMenuForTeacher() {
  const teacherItems = (state.menuConfigs && state.menuConfigs.teacher) || [
    { view: "home", icon: "fa-solid fa-house", label: "Início" },
    { view: "words", icon: "fa-solid fa-layer-group", label: "Palavras" },
    { view: "users", icon: "fa-solid fa-circle-user", label: "Usuários" },
    { view: "games", icon: "fa-solid fa-bullseye", label: "Jogos" },
    { view: "ranking", icon: "fa-solid fa-ranking-star", label: "Ranking" },
    { view: "profile", icon: "fa-solid fa-circle-user", label: "Perfil" },
    { view: "about", icon: "fa-solid fa-circle-info", label: "Sobre" }
  ];

  els.topNavItems.forEach((item, index) => {
    const config = teacherItems[index];
    if (!config) {
      item.classList.add("hidden");
      return;
    }

    item.classList.remove("hidden");
    if (config.view === "about") {
      item.removeAttribute("data-view");
      item.dataset.modal = "instructions";
    } else {
      item.dataset.view = config.view;
      item.removeAttribute("data-modal");
    }
    const iconEl = item.querySelector(".nav-icon");
    const labelEl = item.querySelector("span:last-child");
    if (iconEl) {
      iconEl.innerHTML = `<i class="${config.icon}" aria-hidden="true"></i>`;
    }
    if (labelEl) {
      labelEl.textContent = config.label;
    }
  });

  setTopMenuActive(state.teacherView || "home");
}

function configureTopMenuForStudent() {
  const studentItems = (state.menuConfigs && state.menuConfigs.student) || [
    { view: "home", icon: "fa-solid fa-house", label: "Início" },
    { view: "modules", icon: "fa-solid fa-layer-group", label: "Módulos" },
    { view: "challenges", icon: "fa-solid fa-bullseye", label: "Desafios" },
    { view: "ranking", icon: "fa-solid fa-ranking-star", label: "Ranking" },
    { view: "profile", icon: "fa-solid fa-circle-user", label: "Perfil" },
    { view: "about", icon: "fa-solid fa-circle-info", label: "Sobre" }
  ];

  els.topNavItems.forEach((item, index) => {
    const config = studentItems[index];
    if (!config) {
      item.classList.add("hidden");
      return;
    }

    item.classList.remove("hidden");
    if (config.view === "about") {
      item.removeAttribute("data-view");
      item.dataset.modal = "instructions";
    } else {
      item.dataset.view = config.view;
      item.removeAttribute("data-modal");
    }
    const iconEl = item.querySelector(".nav-icon");
    const labelEl = item.querySelector("span:last-child");
    if (iconEl) {
      iconEl.innerHTML = `<i class="${config.icon}" aria-hidden="true"></i>`;
    }
    if (labelEl) {
      labelEl.textContent = config.label;
    }
  });

  setTopMenuActive("home");
}

function setStudentView(view) {
  state.studentView = view;
  els.studentViews.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.studentView !== view);
  });
  setTopMenuActive(view);

  if (view === "home") {
    const hasActiveGame = state.board.some((column) => column.length > 0) || state.stock.length > 0;
    if (hasActiveGame) {
      enterGameFocusMode();
    } else {
      exitGameFocusMode();
    }
  } else {
    exitGameFocusMode();
  }

  renderStudentView(view);
}

function setTeacherView(view) {
  state.teacherView = view;
  els.teacherPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.teacherView !== view);
  });
  setTopMenuActive(view);
  renderTeacherView(view);
}

function setTopMenuActive(view) {
  els.topNavItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });
}

function renderStudentView(view) {
  if (!state.currentUser || state.currentUser.role !== "student") {
    return;
  }

  if (view === "home") {
    const hasActiveGame = state.board.some((column) => column.length > 0) || state.stock.length > 0;
    if (!hasActiveGame && !state.gameConfig.suitCount) {
      openSuitModal();
      setMessage(els.suitModalMessage, "Escolha os naipes para iniciar uma partida.");
    }
    renderBoard();
    renderCompletedRuns();
    renderLiveMetrics();
    renderStudentSidebar();
    renderStudentHomePage();
    return;
  }

  if (view === "modules") {
    renderModulesPage();
    return;
  }

  if (view === "challenges") {
    renderChallengesPage();
    return;
  }

  if (view === "ranking") {
    renderStudentRankingPage();
    return;
  }

  if (view === "profile") {
    renderProfilePage();
  }
}

function renderTeacherView(view) {
  if (!state.currentUser || state.currentUser.role !== "teacher") {
    return;
  }

  if (view === "home") {
    renderTeacherHomePage();
    return;
  }

  if (view === "words") {
    renderWords();
    return;
  }

  if (view === "users") {
    renderUsersCrud();
    return;
  }

  if (view === "games") {
    renderGamesCrud();
    return;
  }

  if (view === "ranking") {
    renderRanking();
    return;
  }

  if (view === "profile") {
    renderTeacherProfile();
  }
}

function renderTeacherProfile() {
  const teacher = state.currentUser;
  if (!teacher) {
    return;
  }

  const users = getUsers();
  const games = getGames();
  const setText = (element, value) => {
    if (element) {
      element.textContent = String(value);
    }
  };

  setText(els.teacherProfileName, teacher.name || "-");
  setText(els.teacherProfileEmail, teacher.email || "-");
  setText(els.teacherProfileRole, "Professor");
  setText(els.teacherProfileWords, getWords().length);
  setText(els.teacherProfileStudents, users.filter((user) => user.role === "student").length);
  setText(els.teacherProfileGames, games.length);
}

function renderTeacherHomePage() {
  const words = getWords();
  const users = getUsers();
  const students = users.filter((item) => item.role === "student");
  const games = getGames();
  const topStudent = students.slice().sort((a, b) => (b.xp || 0) - (a.xp || 0))[0];
  const winCount = games.filter((game) => game.result === "win").length;
  const avgScore = games.length
    ? Math.round(games.reduce((sum, game) => sum + (Number(game.score) || 0), 0) / games.length)
    : 0;

  if (els.teacherHomeStats) {
    els.teacherHomeStats.innerHTML = `
      <article class="mini-stat"><span>Palavras</span><strong>${words.length}</strong></article>
      <article class="mini-stat"><span>Alunos</span><strong>${students.length}</strong></article>
      <article class="mini-stat"><span>Jogos</span><strong>${games.length}</strong></article>
      <article class="mini-stat"><span>Vitórias</span><strong>${winCount}</strong></article>
    `;
  }

  if (els.teacherHomeSpotlight) {
    els.teacherHomeSpotlight.innerHTML = `
      <p><strong>Melhor aluno:</strong> ${topStudent ? `${topStudent.name} - ${topStudent.xp || 0} XP` : "Ainda sem alunos cadastrados."}</p>
      <p><strong>Média de pontuação:</strong> ${avgScore} pontos</p>
      <p><strong>Total de palavras:</strong> ${words.length} palavras ativas</p>
    `;
  }

  if (els.teacherHomeRecentGames) {
    const recentGames = games
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const usersById = new Map(users.map((user) => [user.id, user]));
    els.teacherHomeRecentGames.innerHTML = recentGames.length
      ? recentGames
        .map((game) => {
          const player = usersById.get(game.userId);
          return `<li>${player ? player.name : "Usuário removido"} - ${game.result} - ${game.score} pontos</li>`;
        })
        .join("")
      : "<li>Nenhuma partida registrada ainda.</li>";
  }
}

function renderStudentHomePage() {
  const words = getWords();
  const themes = [...new Set(words.map((item) => item.theme))].sort();

  if (els.homeHighlights) {
    els.homeHighlights.innerHTML = `
      <article class="mini-stat"><span>Temas</span><strong>${themes.length}</strong></article>
      <article class="mini-stat"><span>Palavras</span><strong>${words.length}</strong></article>
      <article class="mini-stat"><span>Sequências</span><strong>${state.completedRuns.length}/8</strong></article>
      <article class="mini-stat"><span>Jogadas</span><strong>${state.gameStats.moves || 0}</strong></article>
    `;
  }

  if (els.homeRecommendedTheme) {
    els.homeRecommendedTheme.textContent = themes.length ? themes[0] : "Aguardando banco de palavras";
  }

  if (els.homeRecommendedAction) {
    els.homeRecommendedAction.textContent = state.gameConfig.suitCount
      ? "Continue sua partida ou volte aos desafios para revisar seu progresso."
      : "Escolha os naipes no painel de jogo para iniciar uma partida.";
  }

  if (els.homeThemeList) {
    els.homeThemeList.innerHTML = themes.length
      ? themes
        .map((theme) => {
          const themeWords = words.filter((item) => item.theme === theme);
          return `<li><strong>${theme}</strong> — ${themeWords.length} palavras</li>`;
        })
        .join("")
      : "<li>Nenhum módulo encontrado.</li>";
  }
}

function renderModulesPage() {
  const words = getWords();
  const byTheme = new Map();
  const difficultySummary = new Map();

  words.forEach((entry) => {
    if (!byTheme.has(entry.theme)) {
      byTheme.set(entry.theme, []);
    }
    byTheme.get(entry.theme).push(entry);

    if (!difficultySummary.has(entry.difficulty)) {
      difficultySummary.set(entry.difficulty, 0);
    }
    difficultySummary.set(entry.difficulty, difficultySummary.get(entry.difficulty) + 1);
  });

  const themes = [...byTheme.keys()].sort((a, b) => a.localeCompare(b));

  if (els.homeHighlights) {
    els.homeHighlights.innerHTML = `
      <article class="mini-stat"><span>Temas</span><strong>${themes.length}</strong></article>
      <article class="mini-stat"><span>Palavras</span><strong>${words.length}</strong></article>
      <article class="mini-stat"><span>Nível mais comum</span><strong>${getMostCommonDifficulty(difficultySummary) || 0}</strong></article>
      <article class="mini-stat"><span>Faixa</span><strong>${themes.length ? "1-13" : "-"}</strong></article>
    `;
  }

  if (els.homeRecommendedTheme) {
    els.homeRecommendedTheme.textContent = themes.length ? themes[0] : "Aguardando banco de palavras";
  }

  if (els.homeRecommendedAction) {
    const strongestTheme = getLargestTheme(byTheme);
    els.homeRecommendedAction.textContent = strongestTheme
      ? `Comece por ${strongestTheme.theme}, que tem ${strongestTheme.count} palavras cadastradas.`
      : "Adicione palavras no painel do professor para liberar módulos.";
  }

  if (els.homeThemeList) {
    els.homeThemeList.innerHTML = themes.length
      ? themes
        .map((theme) => {
          const themeWords = byTheme.get(theme) || [];
          const minDifficulty = Math.min(...themeWords.map((item) => item.difficulty));
          const maxDifficulty = Math.max(...themeWords.map((item) => item.difficulty));
          return `<li><strong>${theme}</strong> — ${themeWords.length} palavras (dificuldade ${minDifficulty}-${maxDifficulty})</li>`;
        })
        .join("")
      : "<li>Nenhum módulo encontrado.</li>";
  }

  if (els.moduleGrid) {
    const cards = themes
      .map((theme) => {
        const themeWords = byTheme.get(theme) || [];
        const minDifficulty = Math.min(...themeWords.map((item) => item.difficulty));
        const maxDifficulty = Math.max(...themeWords.map((item) => item.difficulty));
        const samples = themeWords.slice(0, 4).map((item) => item.word).join(", ");
        const spanLabel = minDifficulty === maxDifficulty ? `${minDifficulty}` : `${minDifficulty} a ${maxDifficulty}`;

        return `
          <article
            class="module-card"
            data-action="start-module"
            data-theme="${theme}"
            role="button"
            tabindex="0"
            aria-label="Iniciar desafio do tema ${theme}"
          >
            <div class="module-card-topline">
              <span class="module-card-icon"><i class="fa-solid fa-book-open" aria-hidden="true"></i></span>
              <span class="module-difficulty">Níveis ${spanLabel}</span>
            </div>
            <h3>${theme}</h3>
            <p class="module-count">${themeWords.length} palavra(s) cadastradas</p>
            <p class="module-samples">${samples || "Sem palavras ainda"}</p>
          </article>
        `;
      })
      .filter(Boolean);

    els.moduleGrid.innerHTML = cards.length
      ? cards.join("")
      : '<div class="empty-state">Adicione palavras no painel do professor para liberar módulos.</div>';
  }
}

function getMostCommonDifficulty(difficultySummary) {
  let topDifficulty = null;
  let topCount = -1;

  difficultySummary.forEach((count, difficulty) => {
    if (count > topCount) {
      topCount = count;
      topDifficulty = difficulty;
    }
  });

  return topDifficulty;
}

function getLargestTheme(byTheme) {
  let topTheme = null;
  let topCount = -1;

  byTheme.forEach((items, theme) => {
    if (items.length > topCount) {
      topCount = items.length;
      topTheme = { theme, count: items.length };
    }
  });

  return topTheme;
}

function renderChallengesPage() {
  if (els.challengePageObjective) {
    els.challengePageObjective.textContent = state.gameConfig.suitCount
      ? `Objetivo atual: ${state.completedRuns.length}/8 sequências concluídas com ${state.gameConfig.suitCount} naipe(s).`
      : "Nenhum desafio iniciado ainda. Escolha os naipes para começar.";
  }

  if (els.challengeProgressSummary) {
    const validMoves = state.gameStats.moves || 0;
    const invalidMoves = state.gameStats.invalidMoves || 0;
    const totalAttempts = validMoves + invalidMoves;
    const accuracy = totalAttempts ? Math.round((validMoves / totalAttempts) * 100) : 100;

    els.challengeProgressSummary.innerHTML = `
      <p><strong>Sequências concluídas:</strong> ${state.completedRuns.length}/8</p>
      <p><strong>Jogadas válidas:</strong> ${state.gameStats.moves || 0}</p>
      <p><strong>Precisão:</strong> ${accuracy}%</p>
      <p><strong>Tempo:</strong> ${formatDuration(state.gameStats.elapsedSeconds || 0)}</p>
    `;
  }

  if (els.challengeRunList) {
    const runs = state.completedRuns.slice().reverse();
    els.challengeRunList.innerHTML = runs.length
      ? runs.map((run, index) => `<li>${index + 1}. ${run.suitSymbol} ${run.theme}</li>`).join("")
      : "<li>Nenhuma sequência concluída ainda.</li>";
  }
}

function renderStudentRankingPage() {
  const students = getUsers()
    .filter((item) => item.role === "student")
    .sort((a, b) => (b.xp || 0) - (a.xp || 0));

  if (els.studentRankingTableBody) {
    els.studentRankingTableBody.innerHTML = students
      .map((student, index) => {
        const isCurrent = student.id === state.currentUser?.id;
        return `
          <tr class="${isCurrent ? "current-row" : ""}">
            <td>${index + 1}º</td>
            <td>${student.name}</td>
            <td>${student.xp || 0}</td>
            <td>${getLevel(student.xp || 0)}</td>
            <td>${student.matches || 0}</td>
          </tr>
        `;
      })
      .join("");
  }

  if (els.studentRankingSummary) {
    const position = students.findIndex((student) => student.id === state.currentUser?.id);
    els.studentRankingSummary.textContent = position >= 0
      ? `Sua posição atual é ${position + 1}º entre ${students.length} aluno(s).`
      : "Você ainda não aparece no ranking de alunos.";
  }
}

function renderProfilePage() {
  const user = state.currentUser;
  if (!user) {
    return;
  }

  if (els.profileName) {
    els.profileName.textContent = user.name || "-";
  }
  if (els.profileEmail) {
    els.profileEmail.textContent = user.email || "-";
  }
  if (els.profileRole) {
    els.profileRole.textContent = user.role === "teacher" ? "Professor" : "Aluno";
  }
  if (els.profileXp) {
    els.profileXp.textContent = String(user.xp || 0);
  }
  if (els.profileLevel) {
    els.profileLevel.textContent = String(getLevel(user.xp || 0));
  }
  if (els.profileMatches) {
    els.profileMatches.textContent = String(user.matches || 0);
  }
  if (els.profileLastScore) {
    els.profileLastScore.textContent = String(user.lastScore || 0);
  }
  if (els.profileBestScore) {
    els.profileBestScore.textContent = String(user.bestScore || 0);
  }
}

function renderWords() {
  if (!els.wordCrudBody) {
    return;
  }

  const words = getWords()
    .map((word, index) => ({ word, id: Number(word.id) || index + 1 }))
    .sort((a, b) => b.word.difficulty - a.word.difficulty);

  els.wordCrudBody.innerHTML = words
    .map(
      ({ word, id }) => `
        <tr>
          <td>${word.word}</td>
          <td>${word.theme}</td>
          <td>${word.difficulty}</td>
          <td class="action-cell">
            <button type="button" class="btn-outline btn-mini" data-action="edit-word" data-id="${id}"><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Editar</button>
            <button type="button" class="btn-outline btn-mini danger" data-action="delete-word" data-id="${id}"><i class="fa-solid fa-trash" aria-hidden="true"></i> Excluir</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderRanking() {
  const users = getUsers()
    .filter((item) => item.role === "student")
    .sort((a, b) => (b.xp || 0) - (a.xp || 0));

  els.rankingBody.innerHTML = "";

  users.forEach((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.xp || 0}</td>
      <td>${getLevel(student.xp || 0)}</td>
      <td>${student.matches || 0}</td>
    `;
    els.rankingBody.appendChild(tr);
  });
}

function saveWord(event) {
  event.preventDefault();
  const id = Number(els.wordIdInput.value);
  const isEditing = Boolean(id);
  const word = els.wordInput.value.trim();
  const theme = els.themeInput.value.trim();
  const difficulty = Number(els.difficultyInput.value);

  if (!word || !theme || Number.isNaN(difficulty) || difficulty < 1 || difficulty > 13) {
    setMessage(els.teacherMessage, "Preencha os campos corretamente.", true);
    return;
  }

  const words = getWords();
  if (isEditing) {
    const index = words.findIndex((item, itemIndex) => (Number(item.id) || itemIndex + 1) === id);
    if (index === -1) {
      setMessage(els.teacherMessage, "Palavra não encontrada.", true);
      return;
    }

    words[index] = { ...words[index], id: words[index].id || id, word, theme, difficulty };
  } else {
    const nextId = words.reduce(
      (max, item, itemIndex) => Math.max(max, Number(item.id) || itemIndex + 1),
      0
    ) + 1;
    words.push({ id: nextId, word, theme, difficulty });
  }

  setWords(words);

  setMessage(els.teacherMessage, isEditing ? "Palavra atualizada com sucesso." : "Palavra adicionada com sucesso.");
  renderWords();
  resetWordForm();
}

function handleWordCrudAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  const words = getWords();
  const index = words.findIndex((item, itemIndex) => (Number(item.id) || itemIndex + 1) === id);
  const selectedWord = index === -1 ? null : words[index];

  if (!selectedWord) {
    setMessage(els.teacherMessage, "Palavra não encontrada.", true);
    return;
  }

  if (action === "edit-word") {
    els.wordIdInput.value = String(id);
    els.wordInput.value = selectedWord.word || "";
    els.themeInput.value = selectedWord.theme || "";
    els.difficultyInput.value = String(selectedWord.difficulty || 1);
    setMessage(els.teacherMessage, `Editando palavra: ${selectedWord.word}`);
    return;
  }

  if (action === "delete-word") {
    openDeleteModal("delete-word", id, `a palavra “${selectedWord.word}”`);
  }
}

function resetWordForm() {
  if (!els.wordForm) {
    return;
  }

  els.wordForm.reset();
  if (els.wordIdInput) {
    els.wordIdInput.value = "";
  }
}

function renderUsersCrud() {
  if (!els.userCrudBody) {
    return;
  }

  const users = getUsers().sort((a, b) => a.name.localeCompare(b.name));
  els.userCrudBody.innerHTML = users
    .map(
      (user) => `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role === "teacher" ? "Professor" : "Aluno"}</td>
        <td>${user.xp || 0}</td>
        <td>${user.matches || 0}</td>
        <td class="action-cell">
          <button type="button" class="btn-outline btn-mini" data-action="edit-user" data-id="${user.id}"><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Editar</button>
          <button type="button" class="btn-outline btn-mini danger" data-action="delete-user" data-id="${user.id}"><i class="fa-solid fa-trash" aria-hidden="true"></i> Excluir</button>
        </td>
      </tr>
    `
    )
    .join("");
}

async function saveUser(event) {
  event.preventDefault();

  const id = Number(els.userIdInput.value);
  const isEditing = Boolean(id);
  const name = els.userNameInput.value.trim();
  const email = els.userEmailInput.value.trim().toLowerCase();
  const passwordInput = els.userPasswordInput.value.trim();
  const role = els.userRoleInput.value;
  const xp = Math.max(0, Number(els.userXpInput.value) || 0);
  const matches = Math.max(0, Number(els.userMatchesInput.value) || 0);

  const users = getUsers();
  const existingUser = users.find((user) => user.id === id) || null;
  const password = passwordInput || (existingUser ? existingUser.password || "" : "");

  if (!name || !email || !password || !["student", "teacher"].includes(role)) {
    setMessage(els.teacherMessage, "Preencha os campos de usuário corretamente.", true);
    return;
  }

  const emailTaken = users.some((user) => user.email === email && user.id !== id);
  if (emailTaken) {
    setMessage(els.teacherMessage, "Já existe um usuário com este e-mail.", true);
    return;
  }

  const passwordHash = await hashPassword(password);

  if (isEditing) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      setMessage(els.teacherMessage, "Usuário não encontrado.", true);
      return;
    }

    users[index] = {
      ...users[index],
      name,
      email,
      password: passwordHash,
      role,
      xp: role === "student" ? xp : 0,
      matches: role === "student" ? matches : 0
    };
  } else {
    const nextId = users.reduce((max, user) => Math.max(max, user.id || 0), 0) + 1;
    users.push({
      id: nextId,
      name,
      email,
      password: passwordHash,
      role,
      xp: role === "student" ? xp : 0,
      matches: role === "student" ? matches : 0
    });
  }

  setUsers(users);
  renderUsersCrud();
  renderRanking();
  renderStudentSidebar();
  populateGameUserOptions();

  if (state.currentUser) {
    const updatedCurrent = users.find((user) => user.id === state.currentUser.id);
    if (!updatedCurrent) {
      logout();
      return;
    }

    state.currentUser = updatedCurrent;
    if (updatedCurrent.role === "student") {
      renderStudentInfo();
    } else {
      els.sessionInfo.textContent = `${updatedCurrent.name} (Professor)`;
    }
  }

  resetUserForm();
  setMessage(els.teacherMessage, isEditing ? "Usuário atualizado com sucesso." : "Usuário criado com sucesso.");
}

function handleUserCrudAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  const users = getUsers();
  const user = users.find((item) => item.id === id);

  if (!user) {
    setMessage(els.teacherMessage, "Usuário não encontrado.", true);
    return;
  }

  if (action === "edit-user") {
    els.userIdInput.value = String(user.id);
    els.userNameInput.value = user.name || "";
    els.userEmailInput.value = user.email || "";
    els.userPasswordInput.value = "";
    els.userRoleInput.value = user.role || "student";
    els.userXpInput.value = String(user.xp || 0);
    els.userMatchesInput.value = String(user.matches || 0);
    setMessage(els.teacherMessage, `Editando usuário: ${user.name}`);
    return;
  }

  if (action === "delete-user") {
    if (state.currentUser?.id === user.id) {
      setMessage(els.teacherMessage, "Não é permitido excluir o usuário conectado.", true);
      return;
    }

    openDeleteModal("delete-user", id, `o usuário “${user.name}”`);
  }
}

function resetUserForm() {
  if (!els.userForm) {
    return;
  }

  els.userForm.reset();
  if (els.userIdInput) {
    els.userIdInput.value = "";
  }
  if (els.userXpInput) {
    els.userXpInput.value = "0";
  }
  if (els.userMatchesInput) {
    els.userMatchesInput.value = "0";
  }
}

function renderGamesCrud() {
  if (!els.gameCrudBody) {
    return;
  }

  const usersById = new Map(getUsers().map((user) => [user.id, user]));
  const games = getGames().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  els.gameCrudBody.innerHTML = games
    .map((game) => {
      const user = usersById.get(game.userId);
      const playerName = user ? user.name : "Usuário removido";
      const resultLabel =
        game.result === "win" ? "Vitória" : game.result === "loss" ? "Derrota" : "Abandonada";
      return `
        <tr>
          <td>${playerName}</td>
          <td>${resultLabel}</td>
          <td>${game.suitCount}</td>
          <td>${game.score}</td>
          <td>${game.moves}</td>
          <td>${formatDuration(game.durationSeconds)}</td>
          <td>${formatDateTime(game.createdAt)}</td>
          <td class="action-cell">
            <button type="button" class="btn-outline btn-mini" data-action="edit-game" data-id="${game.id}"><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Editar</button>
            <button type="button" class="btn-outline btn-mini danger" data-action="delete-game" data-id="${game.id}"><i class="fa-solid fa-trash" aria-hidden="true"></i> Excluir</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function saveGame(event) {
  event.preventDefault();

  const id = Number(els.gameIdInput.value);
  const isEditing = Boolean(id);
  const userId = Number(els.gameUserInput.value);
  const suitCount = Number(els.gameSuitCountInput.value);
  const result = els.gameResultInput.value;
  const score = Math.max(0, Number(els.gameScoreInput.value) || 0);
  const moves = Math.max(0, Number(els.gameMovesInput.value) || 0);
  const durationSeconds = Math.max(0, Number(els.gameDurationInput.value) || 0);

  if (!userId || ![1, 2, 4].includes(suitCount) || !["win", "loss", "abandoned"].includes(result)) {
    setMessage(els.teacherMessage, "Preencha os campos de jogo corretamente.", true);
    return;
  }

  const users = getUsers();
  const hasUser = users.some((user) => user.id === userId);
  if (!hasUser) {
    setMessage(els.teacherMessage, "Jogador invalido para o jogo.", true);
    return;
  }

  const games = getGames();
  if (isEditing) {
    const index = games.findIndex((game) => game.id === id);
    if (index === -1) {
      setMessage(els.teacherMessage, "Jogo não encontrado.", true);
      return;
    }

    games[index] = {
      ...games[index],
      userId,
      suitCount,
      result,
      score,
      moves,
      durationSeconds
    };
  } else {
    const nextId = games.reduce((max, game) => Math.max(max, game.id || 0), 0) + 1;
    games.push({
      id: nextId,
      userId,
      suitCount,
      result,
      score,
      moves,
      durationSeconds,
      createdAt: new Date().toISOString()
    });
  }

  setGames(games);
  renderGamesCrud();
  resetGameForm();
  setMessage(els.teacherMessage, isEditing ? "Jogo atualizado com sucesso." : "Jogo criado com sucesso.");
}

function handleGameCrudAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  const games = getGames();
  const game = games.find((item) => item.id === id);

  if (!game) {
    setMessage(els.teacherMessage, "Jogo não encontrado.", true);
    return;
  }

  if (action === "edit-game") {
    els.gameIdInput.value = String(game.id);
    els.gameUserInput.value = String(game.userId);
    els.gameSuitCountInput.value = String(game.suitCount);
    els.gameResultInput.value = game.result;
    els.gameScoreInput.value = String(game.score || 0);
    els.gameMovesInput.value = String(game.moves || 0);
    els.gameDurationInput.value = String(game.durationSeconds || 0);
    setMessage(els.teacherMessage, `Editando jogo #${game.id}`);
    return;
  }

  if (action === "delete-game") {
    openDeleteModal("delete-game", id, `o jogo #${game.id}`);
  }
}

function resetGameForm() {
  if (!els.gameForm) {
    return;
  }

  populateGameUserOptions();
  els.gameForm.reset();
  if (els.gameIdInput) {
    els.gameIdInput.value = "";
  }
  if (els.gameScoreInput) {
    els.gameScoreInput.value = "0";
  }
  if (els.gameMovesInput) {
    els.gameMovesInput.value = "0";
  }
  if (els.gameDurationInput) {
    els.gameDurationInput.value = "0";
  }
}

function openDeleteModal(action, id, label) {
  state.pendingDelete = { action, id };
  if (els.deleteModalMessage) {
    els.deleteModalMessage.textContent = `Tem certeza que deseja excluir ${label}?`;
  }
  els.deleteModal?.classList.remove("hidden");
}

function closeDeleteModal() {
  state.pendingDelete = null;
  els.deleteModal?.classList.add("hidden");
}

function confirmPendingDelete() {
  const pendingDelete = state.pendingDelete;
  if (!pendingDelete) {
    closeDeleteModal();
    return;
  }

  if (pendingDelete.action === "delete-word") {
    const words = getWords();
    const index = words.findIndex(
      (item, itemIndex) => (Number(item.id) || itemIndex + 1) === pendingDelete.id
    );
    if (index !== -1) {
      setWords(words.filter((_, itemIndex) => itemIndex !== index));
      renderWords();
      resetWordForm();
      setMessage(els.teacherMessage, "Palavra excluída com sucesso.");
    }
  }

  if (pendingDelete.action === "delete-user") {
    const users = getUsers();
    const user = users.find((item) => item.id === pendingDelete.id);
    if (user && state.currentUser?.id !== user.id) {
      setUsers(users.filter((item) => item.id !== user.id));
      setGames(getGames().filter((game) => game.userId !== user.id));
      renderUsersCrud();
      renderGamesCrud();
      renderRanking();
      populateGameUserOptions();
      resetUserForm();
      setMessage(els.teacherMessage, "Usuário excluído com sucesso.");
    }
  }

  if (pendingDelete.action === "delete-game") {
    const games = getGames();
    setGames(games.filter((item) => item.id !== pendingDelete.id));
    renderGamesCrud();
    resetGameForm();
    setMessage(els.teacherMessage, "Jogo excluído com sucesso.");
  }

  closeDeleteModal();
}

function populateGameUserOptions() {
  if (!els.gameUserInput) {
    return;
  }

  const students = getUsers().filter((user) => user.role === "student");
  els.gameUserInput.innerHTML = students
    .map((student) => `<option value="${student.id}">${student.name}</option>`)
    .join("");
}

function createGameRecordForCurrentStudent(result) {
  if (!state.currentUser || state.currentUser.role !== "student") {
    return;
  }

  const games = getGames();
  const nextId = games.reduce((max, game) => Math.max(max, game.id || 0), 0) + 1;
  games.push({
    id: nextId,
    userId: state.currentUser.id,
    suitCount: state.gameConfig.suitCount || 1,
    result,
    score: state.gameStats.roundScore || 0,
    moves: state.gameStats.moves || 0,
    durationSeconds: state.gameStats.elapsedSeconds || 0,
    createdAt: new Date().toISOString()
  });
  setGames(games);
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("pt-BR");
}

function formatDuration(totalSeconds) {
  const sec = Math.max(0, Number(totalSeconds) || 0);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function startNewGame() {
  if (!state.gameConfig.suitCount || !state.gameConfig.suitTopics.length) {
    openSuitModal();
    setMessage(els.gameMessage, "Escolha os naipes para iniciar a partida.", true);
    return;
  }

  state.selectedCard = null;
  closeWinModal();
  state.board = Array.from({ length: 10 }, () => []);
  state.completedRuns = [];
  state.undoStack = [];
  state.gameStats.moves = 0;
  state.gameStats.roundScore = 0;
  state.gameStats.elapsedSeconds = 0;
  state.gameStats.invalidMoves = 0;

  const deck = buildDeck();
  shuffle(deck);

  for (let col = 0; col < 10; col += 1) {
    const cardsInColumn = col < 4 ? 6 : 5;
    for (let i = 0; i < cardsInColumn; i += 1) {
      const card = deck.pop();
      card.faceUp = i === cardsInColumn - 1;
      state.board[col].push(card);
    }
  }

  state.stock = deck;
  enterGameFocusMode();
  startGameTimer();
  renderBoard();
  renderCompletedRuns();
  renderLiveMetrics();
  renderStudentSidebar();
  setMessage(
    els.gameMessage,
    `Novo jogo iniciado com ${state.gameConfig.suitCount} naipe(s): ${state.gameConfig.suitTopics
      .map((item) => `${item.suitSymbol} ${item.theme}`)
      .join(" | ")}`
  );
}

function buildDeck() {
  const words = getWords();
  const byThemeAndDifficulty = indexWordsByThemeAndDifficulty(words);
  const byDifficulty = indexWordsByDifficulty(words);

  const deck = [];
  const copiesPerSuit = 8 / state.gameConfig.suitCount;

  state.gameConfig.suitTopics.forEach((suitTopic, suitIndex) => {
    for (let copy = 0; copy < copiesPerSuit; copy += 1) {
      for (let rank = 1; rank <= 13; rank += 1) {
        const chosen = pickWordForRankAndTheme(
          byThemeAndDifficulty,
          byDifficulty,
          suitTopic.theme,
          rank
        );
        deck.push({
          id: `${suitIndex}-${copy}-${rank}-${Math.random().toString(36).slice(2, 9)}`,
          word: chosen.word,
          theme: suitTopic.theme,
          rank,
          suitId: suitTopic.suitId,
          suitSymbol: suitTopic.suitSymbol,
          faceUp: false
        });
      }
    }
  });

  return deck;
}

function indexWordsByThemeAndDifficulty(words) {
  const map = new Map();

  words.forEach((entry) => {
    const key = `${entry.theme}|${entry.difficulty}`;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(entry);
  });

  return map;
}

function indexWordsByDifficulty(words) {
  const map = new Map();

  words.forEach((entry) => {
    if (!map.has(entry.difficulty)) {
      map.set(entry.difficulty, []);
    }
    map.get(entry.difficulty).push(entry);
  });

  return map;
}

function pickWordForRankAndTheme(byThemeAndDifficulty, byDifficulty, theme, rank) {
  const exact = byThemeAndDifficulty.get(`${theme}|${rank}`);
  if (exact && exact.length) {
    return exact[Math.floor(Math.random() * exact.length)];
  }

  const rankPool = byDifficulty.get(rank);
  if (rankPool && rankPool.length) {
    return rankPool[Math.floor(Math.random() * rankPool.length)];
  }

  return DEFAULT_WORDS.find((item) => item.difficulty === rank);
}

function openSuitModal() {
  const modal = els.suitModal || document.getElementById("suitModal");
  modal?.classList.remove("hidden");
  setMessage(els.suitModalMessage, "Escolha para iniciar.");
}

function closeSuitModal() {
  const modal = els.suitModal || document.getElementById("suitModal");
  modal?.classList.add("hidden");
}

function openWinModal() {
  if (!els.winModal) {
    return;
  }

  if (els.winScoreValue) {
    els.winScoreValue.textContent = String(state.gameStats.roundScore || 0);
  }

  if (els.winMovesValue) {
    els.winMovesValue.textContent = String(state.gameStats.moves || 0);
  }

  if (els.winTimeValue) {
    const total = state.gameStats.elapsedSeconds || 0;
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    els.winTimeValue.textContent = `${mm}:${ss}`;
  }

  if (els.winLastScoreValue) {
    els.winLastScoreValue.textContent = String(state.currentUser?.lastScore || 0);
  }

  if (els.winBestScoreValue) {
    els.winBestScoreValue.textContent = String(state.currentUser?.bestScore || 0);
  }

  els.winModal.classList.remove("hidden");
}

function closeWinModal() {
  els.winModal?.classList.add("hidden");
}

function openInstructionsModal() {
  state.instructionsReturnView = state.currentUser?.role === "teacher" ? state.teacherView : state.studentView;
  setTopMenuActive(state.instructionsReturnView);
  els.instructionsModal?.classList.remove("hidden");
}

function closeInstructionsModal() {
  els.instructionsModal?.classList.add("hidden");
  const currentView = state.instructionsReturnView || (state.currentUser?.role === "teacher" ? state.teacherView : state.studentView) || "home";
  state.instructionsReturnView = null;
  if (state.currentUser?.role === "teacher" && state.teacherView !== currentView) {
    setTeacherView(currentView);
  } else if (state.currentUser?.role === "student" && state.studentView !== currentView) {
    setStudentView(currentView);
  } else {
    setTopMenuActive(currentView);
  }
  if (state.currentUser) {
    localStorage.setItem(
      STORAGE_KEYS.session,
      JSON.stringify({ userId: state.currentUser.id, showInstructions: false })
    );
  }
}

function handlePlayAgain() {
  closeWinModal();
  openSuitModal();
}

function handleCloseToHome() {
  closeWinModal();
  resetStudentHomeState();
  exitGameFocusMode();
}

function resetStudentHomeState() {
  stopGameTimer();
  state.selectedCard = null;
  state.board = Array.from({ length: 10 }, () => []);
  state.stock = [];
  state.completedRuns = [];
  state.undoStack = [];
  state.gameConfig = { suitCount: null, suitTopics: [] };
  state.gameStats.moves = 0;
  state.gameStats.roundScore = 0;
  state.gameStats.elapsedSeconds = 0;
  state.gameStats.invalidMoves = 0;

  renderBoard();
  renderCompletedRuns();
  renderLiveMetrics();
  renderStudentSidebar();
  setMessage(els.gameMessage, "Partida finalizada. Volte quando quiser iniciar uma nova.");
}

function enterGameFocusMode() {
  if (state.currentUser?.role !== "student") {
    return;
  }

  document.body.classList.add("game-focus");
}

function exitGameFocusMode() {
  document.body.classList.remove("game-focus");
}

function applyGameConfig(suitCount) {
  const valid = [1, 2, 4];
  if (!valid.includes(suitCount)) {
    setMessage(els.suitModalMessage, "Opção de naipe inválida.", true);
    return;
  }

  state.gameConfig.suitCount = suitCount;
  state.gameConfig.suitTopics = buildSuitTopics(suitCount);
  closeSuitModal();
  startNewGame();
}

function buildSuitTopics(suitCount) {
  const uniqueThemes = [...new Set(getWords().map((item) => item.theme))];
  const themes = uniqueThemes.length ? uniqueThemes : [...new Set(DEFAULT_WORDS.map((item) => item.theme))];
  shuffle(themes);

  const preferredOrder = ["spades", "hearts", "clubs", "diamonds"];
  const selectedSuitDefs = preferredOrder
    .map((suitId) => SUITS.find((item) => item.id === suitId))
    .filter(Boolean)
    .slice(0, suitCount);

  return selectedSuitDefs.map((suit, index) => ({
    suitId: suit.id,
    suitSymbol: suit.symbol,
    theme: themes[index % themes.length]
  }));
}

function renderBoard() {
  els.board.innerHTML = "";

  const hasActiveGame = state.board.some((column) => column.length > 0) || state.stock.length > 0;
  if (!hasActiveGame) {
    const emptyState = document.createElement("div");
    emptyState.className = "board-empty-state";
    emptyState.innerHTML = `
      <p>Nenhuma partida iniciada.</p>
      <button type="button" class="btn-primary board-empty-cta" data-action="start-game">Escolher naipes</button>
    `;
    els.board.appendChild(emptyState);
    return;
  }

  state.board.forEach((columnCards, columnIndex) => {
    const offsets = getStackOffsets(columnCards);
    const column = document.createElement("div");
    column.className = "column";
    column.dataset.columnIndex = String(columnIndex);

    columnCards.forEach((card, cardIndex) => {
      const cardEl = document.createElement("div");
      cardEl.className = `card ${card.faceUp ? `suit-${card.suitId}` : "hidden-card"}`;
      if (
        state.selectedCard &&
        state.selectedCard.fromColumn === columnIndex &&
        cardIndex >= state.selectedCard.fromIndex
      ) {
        cardEl.classList.add("selected");
      }

      if (card.faceUp) {
        cardEl.innerHTML = `
          <span class="card-corner top">${card.rank} <span class="card-suit-symbol">${card.suitSymbol}</span></span>
          <span class="card-center-suit">${card.suitSymbol}</span>
          <span class="card-word">${card.word}</span>
          <span class="card-theme">${card.theme}</span>
        `;
      } else {
        cardEl.innerHTML = '<span class="card-back-pattern"></span>';
      }
      cardEl.style.marginTop = cardIndex === 0 ? "0px" : `${offsets[cardIndex]}px`;
      cardEl.style.zIndex = String(Math.max(1, cardIndex + 1));
      cardEl.dataset.columnIndex = String(columnIndex);
      cardEl.dataset.cardIndex = String(cardIndex);
      cardEl.draggable = card.faceUp;
      if (card.faceUp) {
        cardEl.addEventListener("dragstart", onCardDragStart);
        cardEl.addEventListener("dragend", onCardDragEnd);
      }
      cardEl.addEventListener("click", onCardClick);
      column.appendChild(cardEl);
    });

    column.addEventListener("dragover", onColumnDragOver);
    column.addEventListener("drop", (event) => onColumnDrop(event, columnIndex));
    column.addEventListener("click", () => tryMoveToColumn(columnIndex));
    els.board.appendChild(column);
  });

  if (els.stockCount) {
    els.stockCount.textContent = String(state.stock.length);
  } else {
    els.stockBtn.textContent = String(state.stock.length);
  }
}

function renderCompletedRuns() {
  if (!els.completedBoard || !els.completedCount) {
    return;
  }

  els.completedBoard.innerHTML = "";
  for (let i = 0; i < 8; i += 1) {
    const slot = document.createElement("div");
    const completed = state.completedRuns[i];
    slot.className = `completed-slot ${completed ? "filled" : ""}`;
    slot.textContent = completed ? `${completed.suitSymbol} 13-1` : "-";
    if (completed) {
      slot.title = `Assunto: ${completed.theme}`;
    }
    els.completedBoard.appendChild(slot);
  }

  els.completedCount.textContent = `${state.completedRuns.length}/8`;
}

function getStackOffsets(columnCards) {
  if (columnCards.length <= 1) {
    return [0];
  }

  const cardHeight = 96;
  const isGameFocus = document.body.classList.contains("game-focus");
  const maxColumnHeight = isGameFocus
    ? Math.round(Math.max(250, Math.min(440, window.innerHeight * 0.56)))
    : Math.round(Math.max(180, Math.min(320, window.innerHeight * 0.45)));
  const stackSize = columnCards.length;
  const growth = Math.max(0, stackSize - 4);

  // Keep pile compact while preserving a board proportion consistent with the rest of the app.
  const faceUpOverlap = Math.max(-30, -10 - growth * 1.2);
  // Hidden cards remain overlapped, but not so aggressively that they distort the board.
  const hiddenOverlap = Math.max(-52, -26 - growth * 0.9);

  const offsets = [0];
  let estimatedHeight = cardHeight;

  for (let i = 1; i < columnCards.length; i += 1) {
    const overlap = columnCards[i - 1].faceUp ? faceUpOverlap : hiddenOverlap;
    offsets.push(overlap);
    estimatedHeight += cardHeight + overlap;
  }

  if (estimatedHeight > maxColumnHeight) {
    const allMovable = [];
    const faceUpMovable = [];

    for (let i = 1; i < offsets.length; i += 1) {
      allMovable.push(i);
      if (columnCards[i - 1].faceUp) {
        faceUpMovable.push(i);
      }
    }

    const primaryTargets = faceUpMovable.length ? faceUpMovable : allMovable;
    const overflowPrimary = estimatedHeight - maxColumnHeight;
    const primaryStep = Math.ceil(overflowPrimary / Math.max(1, primaryTargets.length));

    primaryTargets.forEach((index) => {
      offsets[index] = Math.max(-36, offsets[index] - primaryStep);
    });

    // Final clamp in extreme piles so column height stays bounded.
    estimatedHeight = cardHeight;
    for (let i = 1; i < offsets.length; i += 1) {
      estimatedHeight += cardHeight + offsets[i];
    }

    if (estimatedHeight > maxColumnHeight) {
      const overflowAll = estimatedHeight - maxColumnHeight;
      const allStep = Math.ceil(overflowAll / Math.max(1, allMovable.length));
      allMovable.forEach((index) => {
        offsets[index] = Math.max(-48, offsets[index] - allStep);
      });
    }
  }

  return offsets;
}

function onCardClick(event) {
  event.stopPropagation();
  if (state.draggingCard) {
    return;
  }
  const columnIndex = Number(event.currentTarget.dataset.columnIndex);
  const cardIndex = Number(event.currentTarget.dataset.cardIndex);
  const card = state.board[columnIndex][cardIndex];

  // If a stack is already selected, clicking another column's card tries the move directly.
  if (state.selectedCard && state.selectedCard.fromColumn !== columnIndex) {
    const moved = tryMoveToColumn(columnIndex);
    if (moved) {
      return;
    }

    // If move was invalid, clear stale selection and treat this click as a fresh selection attempt.
    state.selectedCard = null;
  }

  if (
    state.selectedCard &&
    state.selectedCard.fromColumn === columnIndex &&
    state.selectedCard.fromIndex === cardIndex
  ) {
    state.selectedCard = null;
    renderBoard();
    return;
  }

  if (!card.faceUp) {
    return;
  }

  if (!isMovableStack(state.board[columnIndex], cardIndex)) {
    state.gameStats.invalidMoves += 1;
    renderStudentSidebar();
    setMessage(
      els.gameMessage,
      "No Spider real, o grupo móvel precisa estar em sequência e ser do mesmo naipe.",
      true
    );
    return;
  }

  state.selectedCard = {
    id: card.id,
    fromColumn: columnIndex,
    fromIndex: cardIndex,
    rank: card.rank,
    theme: card.theme
  };

  renderBoard();
}

function onCardDragStart(event) {
  const card = event.currentTarget;
  const columnIndex = Number(card.dataset.columnIndex);
  const cardIndex = Number(card.dataset.cardIndex);

  if (!isMovableStack(state.board[columnIndex], cardIndex)) {
    event.preventDefault();
    return;
  }

  state.draggingCard = true;
  state.selectedCard = {
    id: state.board[columnIndex][cardIndex].id,
    fromColumn: columnIndex,
    fromIndex: cardIndex,
    rank: state.board[columnIndex][cardIndex].rank,
    theme: state.board[columnIndex][cardIndex].theme
  };
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", state.selectedCard.id);
  card.classList.add("dragging");
}

function onCardDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  state.draggingCard = false;
}

function onColumnDragOver(event) {
  if (!state.selectedCard) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function onColumnDrop(event, columnIndex) {
  event.preventDefault();
  if (!state.selectedCard) {
    return;
  }

  tryMoveToColumn(columnIndex);
  state.draggingCard = false;
}

function tryMoveToColumn(targetColumnIndex) {
  if (!state.selectedCard) {
    return false;
  }

  const fromColumnIndex = state.selectedCard.fromColumn;
  if (fromColumnIndex === targetColumnIndex) {
    return false;
  }

  const fromColumn = state.board[fromColumnIndex];
  const movingCards = fromColumn.slice(state.selectedCard.fromIndex);
  const movingCard = movingCards[0];
  const targetColumn = state.board[targetColumnIndex];
  const targetTop = targetColumn[targetColumn.length - 1];

  if (!canPlaceCard(movingCard, targetTop)) {
    state.gameStats.invalidMoves += 1;
    renderStudentSidebar();
    setMessage(els.gameMessage, "Jogada inválida. A carta deve ser colocada sobre outra de valor imediatamente maior.", true);
    return false;
  }

  pushUndoSnapshot();

  fromColumn.splice(state.selectedCard.fromIndex);
  targetColumn.push(...movingCards);

  // Vira a carta anterior quando o topo e removido.
  if (fromColumn.length > 0) {
    fromColumn[fromColumn.length - 1].faceUp = true;
  }

  state.selectedCard = null;
  state.gameStats.moves += 1;
  resolveCompletedRun(fromColumnIndex);
  resolveCompletedRun(targetColumnIndex);
  renderLiveMetrics();
  renderBoard();
  return true;
}

function isMovableStack(column, startIndex) {
  if (startIndex < 0 || startIndex >= column.length) {
    return false;
  }

  for (let i = startIndex; i < column.length; i += 1) {
    if (!column[i].faceUp) {
      return false;
    }
  }

  if (startIndex === column.length - 1) {
    return true;
  }

  for (let i = startIndex; i < column.length - 1; i += 1) {
    const current = column[i];
    const next = column[i + 1];
    if (current.rank !== next.rank + 1 || current.suitId !== next.suitId) {
      return false;
    }
  }

  return true;
}

function canPlaceCard(card, targetTop) {
  if (!targetTop) {
    return true;
  }

  if (!targetTop.faceUp) {
    return false;
  }

  return targetTop.rank === card.rank + 1;
}

function resolveCompletedRun(columnIndex) {
  const column = state.board[columnIndex];
  let removedRuns = 0;

  while (column.length >= 13) {
    const run = column.slice(-13);
    const sameSuit = run.every((card) => card.suitId === run[0].suitId);
    const descending = run.every((card, idx) =>
      idx === 0 ? card.rank === 13 : run[idx - 1].rank - 1 === card.rank
    );

    if (!descending || !sameSuit) {
      break;
    }

    column.splice(column.length - 13, 13);
    state.completedRuns.push({
      theme: run[0].theme,
      suitSymbol: run[0].suitSymbol
    });
    removedRuns += 1;
    awardStudent(120);

    if (column.length > 0) {
      column[column.length - 1].faceUp = true;
    }
  }

  if (!removedRuns) {
    return;
  }

  renderCompletedRuns();
  setMessage(
    els.gameMessage,
    `${removedRuns} sequência(s) enviada(s) para a pilha de concluídas. +${removedRuns * 120} XP`,
    false
  );

  if (state.completedRuns.length >= 8) {
    stopGameTimer();
    awardStudent(250);
    saveStudentRoundScore();
    createGameRecordForCurrentStudent("win");
    updateStudentMatches();
    setMessage(els.gameMessage, "Vitória total no estilo Spider! Bônus de +250 XP.");
    openWinModal();
  }
}

function dealFromStock() {
  if (!state.stock.length) {
    setMessage(els.gameMessage, "A pilha acabou.", true);
    return;
  }

  const columnsWithCards = state.board.every((col) => col.length > 0);
  if (!columnsWithCards) {
    setMessage(els.gameMessage, "Preencha as colunas vazias antes de distribuir.", true);
    return;
  }

  pushUndoSnapshot();

  for (let i = 0; i < 10; i += 1) {
    const card = state.stock.pop();
    card.faceUp = true;
    state.board[i].push(card);
  }

  for (let i = 0; i < state.board.length; i += 1) {
    resolveCompletedRun(i);
  }

  state.gameStats.moves += 1;
  awardStudent(10);
  renderLiveMetrics();
  renderBoard();
}

function pushUndoSnapshot() {
  const snapshot = {
    board: JSON.parse(JSON.stringify(state.board)),
    stock: JSON.parse(JSON.stringify(state.stock)),
    completedRuns: JSON.parse(JSON.stringify(state.completedRuns)),
    gameStats: {
      moves: state.gameStats.moves,
      roundScore: state.gameStats.roundScore,
      elapsedSeconds: state.gameStats.elapsedSeconds,
      invalidMoves: state.gameStats.invalidMoves
    },
    selectedCard: null
  };

  state.undoStack.push(snapshot);
  if (state.undoStack.length > 40) {
    state.undoStack.shift();
  }
}

function undoLastAction() {
  if (!state.undoStack.length) {
    setMessage(els.gameMessage, "Nada para desfazer.", true);
    return;
  }

  const snapshot = state.undoStack.pop();
  state.board = snapshot.board;
  state.stock = snapshot.stock;
  state.completedRuns = snapshot.completedRuns;
  state.gameStats.moves = snapshot.gameStats?.moves || 0;
  state.gameStats.roundScore = snapshot.gameStats?.roundScore || 0;
  state.gameStats.elapsedSeconds = snapshot.gameStats?.elapsedSeconds || 0;
  state.gameStats.invalidMoves = snapshot.gameStats?.invalidMoves || 0;
  state.selectedCard = snapshot.selectedCard;

  renderLiveMetrics();
  renderStudentSidebar();
  renderBoard();
  renderCompletedRuns();
  setMessage(els.gameMessage, "Última jogada desfeita.");
}

function awardStudent(points) {
  if (!state.currentUser || state.currentUser.role !== "student") {
    return;
  }

  const users = getUsers();
  const index = users.findIndex((item) => item.id === state.currentUser.id);
  if (index === -1) {
    return;
  }

  users[index].xp = (users[index].xp || 0) + points;
  state.gameStats.roundScore += points;
  setUsers(users);
  state.currentUser = users[index];
  renderStudentInfo();
}

function updateStudentMatches() {
  if (!state.currentUser || state.currentUser.role !== "student") {
    return;
  }

  const users = getUsers();
  const index = users.findIndex((item) => item.id === state.currentUser.id);
  if (index === -1) {
    return;
  }

  users[index].matches = (users[index].matches || 0) + 1;
  setUsers(users);
  state.currentUser = users[index];
  renderStudentInfo();
  renderStudentSidebar();
}

function saveStudentRoundScore() {
  if (!state.currentUser || state.currentUser.role !== "student") {
    return;
  }

  const users = getUsers();
  const index = users.findIndex((item) => item.id === state.currentUser.id);
  if (index === -1) {
    return;
  }

  const score = state.gameStats.roundScore || 0;
  users[index].lastScore = score;
  users[index].bestScore = Math.max(users[index].bestScore || 0, score);
  setUsers(users);
  state.currentUser = users[index];
}

function refreshCurrentUser() {
  const users = getUsers();
  const user = users.find((item) => item.id === state.currentUser.id);
  if (user) {
    state.currentUser = user;
  }

  return state.currentUser;
}

function renderStudentSidebar() {
  if (!state.currentUser || state.currentUser.role !== "student") {
    return;
  }

  const topics = state.gameConfig.suitTopics || [];
  const topicLabel = topics.length
    ? topics.map((item) => `${item.suitSymbol} ${item.theme}`).join(" / ")
    : "Aguardando escolha de naipes";

  if (els.challengeTheme) {
    els.challengeTheme.textContent = topicLabel;
  }

  if (els.challengeObjective) {
    const objective = state.gameConfig.suitCount
      ? `Monte sequências completas de 13 a 1 do mesmo naipe (${state.gameConfig.suitCount} naipe(s)).`
      : "Escolha os naipes para iniciar o desafio.";
    els.challengeObjective.textContent = objective;
  }

  if (els.streakInfo) {
    els.streakInfo.textContent = `${state.currentUser.matches || 0} vitórias`;
  }

  const validMoves = state.gameStats.moves || 0;
  const invalidMoves = state.gameStats.invalidMoves || 0;
  const totalAttempts = validMoves + invalidMoves;
  const accuracy = totalAttempts ? Math.round((validMoves / totalAttempts) * 100) : 100;
  const solved = state.completedRuns.length;
  const medals = Math.max(0, Math.floor((state.currentUser.matches || 0) / 2) + solved);
  const xp = state.currentUser.xp || 0;
  const level = getLevel(xp);
  const levelFloor = (level - 1) * 150;
  const levelTarget = level * 150;
  const levelProgressXp = xp - levelFloor;
  const levelSpan = levelTarget - levelFloor;
  const levelPct = Math.max(0, Math.min(100, Math.round((levelProgressXp / levelSpan) * 100)));

  if (els.progressAccuracy) {
    els.progressAccuracy.textContent = `${accuracy}%`;
  }

  if (els.progressChallenges) {
    els.progressChallenges.textContent = `${solved}/8`;
  }

  if (els.progressMedals) {
    els.progressMedals.textContent = String(medals);
  }

  if (els.progressXpCurrent) {
    els.progressXpCurrent.textContent = String(levelProgressXp);
  }

  if (els.progressXpTarget) {
    els.progressXpTarget.textContent = String(levelSpan);
  }

  if (els.progressXpBar) {
    els.progressXpBar.style.width = `${levelPct}%`;
  }

  if (els.studentRanking) {
    const users = getUsers()
      .filter((item) => item.role === "student")
      .sort((a, b) => (b.xp || 0) - (a.xp || 0));

    const rows = users.slice(0, 4).map((user, index) => {
      const isCurrent = user.id === state.currentUser.id;
      const label = isCurrent ? "Você" : user.name;
      return `
        <div class="ranking-item ${isCurrent ? "current" : ""}">
          <span class="rank-pos">${index + 1}º</span>
          <span class="rank-name">${label}</span>
          <strong class="rank-xp">${user.xp || 0} XP</strong>
        </div>
      `;
    });

    els.studentRanking.innerHTML = `<div class="ranking-list">${rows.join("")}</div>`;
  }
}

function renderLiveMetrics() {
  if (els.metricMoves) {
    animateMetricNumber(els.metricMoves, state.gameStats.moves || 0, 180);
  }

  if (els.metricScore) {
    animateMetricNumber(els.metricScore, state.gameStats.roundScore || 0, 220);
  }

  if (els.metricTime) {
    const total = state.gameStats.elapsedSeconds || 0;
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    const nextTime = `${mm}:${ss}`;
    if (els.metricTime.textContent !== nextTime) {
      els.metricTime.textContent = nextTime;
      pulseMetric(els.metricTime, "tick", 120);
    }
  }
}

function animateMetricNumber(el, targetValue, durationMs) {
  const target = Number(targetValue) || 0;
  const current = Number(el.dataset.value || 0);

  if (current === target) {
    return;
  }

  if (el._metricAnimFrame) {
    cancelAnimationFrame(el._metricAnimFrame);
  }

  const start = current;
  const startTime = performance.now();
  const delta = target - start;

  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / durationMs);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + delta * eased);
    el.textContent = String(value);
    el.dataset.value = String(value);

    if (progress < 1) {
      el._metricAnimFrame = requestAnimationFrame(step);
      return;
    }

    pulseMetric(el, "bump", 160);
    el._metricAnimFrame = null;
  };

  el._metricAnimFrame = requestAnimationFrame(step);
}

function pulseMetric(el, className, timeoutMs) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), timeoutMs);
}

function startGameTimer() {
  stopGameTimer();
  state.gameStats.timerId = setInterval(() => {
    state.gameStats.elapsedSeconds += 1;
    renderLiveMetrics();
  }, 1000);
}

function stopGameTimer() {
  if (state.gameStats.timerId) {
    clearInterval(state.gameStats.timerId);
    state.gameStats.timerId = null;
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
}

function setUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  syncAllToDatabase();
}

function getGames() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.games) || "[]");
}

function setGames(games) {
  localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(games));
  syncAllToDatabase();
}

function getWords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.words) || "[]");
}

function setWords(words) {
  localStorage.setItem(STORAGE_KEYS.words, JSON.stringify(words));
  syncAllToDatabase();
}

function hydrateFromDatabase() {
  const response = requestJson("GET", "/api/bootstrap");
  if (!response.ok || !response.data) {
    return;
  }

  const { users, words, games } = response.data;

  if (Array.isArray(users) && users.length) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }

  if (Array.isArray(words) && words.length) {
    localStorage.setItem(STORAGE_KEYS.words, JSON.stringify(words));
  }

  if (Array.isArray(games)) {
    localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(games));
  }
}

function syncAllToDatabase() {
  requestJson("POST", "/api/sync", {
    users: getUsers(),
    words: getWords(),
    games: getGames()
  });
}

function requestJson(method, url, body) {
  const xhr = new XMLHttpRequest();
  try {
    xhr.open(method, url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body ? JSON.stringify(body) : null);

    const text = xhr.responseText || "";
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    }

    return { ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

function getLevel(xp) {
  return Math.floor(xp / 150) + 1;
}

function setMessage(el, text, isError = false) {
  if (!el) {
    return;
  }

  el.textContent = text;
  el.classList.remove("success", "error");
  if (!text) {
    return;
  }

  el.classList.add(isError ? "error" : "success");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
