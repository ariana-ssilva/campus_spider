const PARTIALS = [
  { target: "headerSlot", file: "components/header.html" },
  { target: "mainSlot", file: "components/main-content.html" },
  { target: "modalSlot", file: "components/suit-modal.html" }
];

async function loadPartials() {
  const tasks = PARTIALS.map(async ({ target, file }) => {
    const host = document.getElementById(target);
    if (!host) {
      throw new Error(`Container ausente: ${target}`);
    }

    const response = await fetch(file, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar ${file}`);
    }

    host.innerHTML = await response.text();
  });

  await Promise.all(tasks);
}

function loadAppScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "app.js";
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
  } catch (error) {
    console.error(error);
    const fallback = document.createElement("p");
    fallback.textContent = "Erro ao montar a interface. Recarregue a pagina.";
    fallback.style.color = "#ef4444";
    fallback.style.fontWeight = "800";
    fallback.style.padding = "1rem";
    document.body.prepend(fallback);
  }
}

bootstrap();
