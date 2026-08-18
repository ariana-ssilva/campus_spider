const PARTIALS = [
  { target: "headerSlot", file: "components/header.html" },
  { target: "authSlot", file: "components/auth.html" },
  { target: "studentHomeSlot", file: "components/student-home.html" },
  { target: "studentModulesSlot", file: "components/student-modules.html" },
  { target: "studentChallengesSlot", file: "components/student-challenges.html" },
  { target: "studentRankingSlot", file: "components/student-ranking.html" },
  { target: "studentProfileSlot", file: "components/student-profile.html" },
  { target: "teacherHomeSlot", file: "components/teacher-home.html" },
  { target: "teacherWordsSlot", file: "components/teacher-words.html" },
  { target: "teacherUsersSlot", file: "components/teacher-users.html" },
  { target: "teacherGamesSlot", file: "components/teacher-games.html" },
  { target: "teacherRankingSlot", file: "components/teacher-ranking.html" },
  { target: "modalSlot", file: "components/suit-modal.html" }
];

async function loadPartials() {
  const tasks = PARTIALS.map(async ({ target, file }) => {
    const host = document.getElementById(target);
    if (!host) {
      throw new Error(`Container ausente: ${target}`);
    }

    const response = await fetch(file, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar ${file}`);
    }

    const html = await response.text();
    // If host already has content, append to it; otherwise set innerHTML.
    if (host.innerHTML && host.innerHTML.trim().length > 0) {
      host.insertAdjacentHTML("beforeend", html);
    } else {
      host.innerHTML = html;
    }
  });

  await Promise.all(tasks);
}

function loadAppScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "app.js?v=4";
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Falha ao carregar app.js"));
    document.body.appendChild(script);
  });
}

async function bootstrap() {
  try {
    await loadPartials();
    await loadAppScript();

    if (typeof window.initializeSpiderEduApp === "function") {
      window.initializeSpiderEduApp();
    }

    document.getElementById("appLoading")?.classList.add("hidden");
  } catch (error) {
    console.error(error);
    document.getElementById("appLoading")?.classList.add("hidden");
    const fallback = document.createElement("p");
    fallback.textContent = "Erro ao montar a interface. Recarregue a pagina.";
    fallback.style.color = "#ef4444";
    fallback.style.fontWeight = "800";
    fallback.style.padding = "1rem";
    document.body.prepend(fallback);
  }
}

bootstrap();
