const JOUR_MS = 24 * 60 * 60 * 1000;

// Date locale à minuit (évite le décalage UTC de new Date("AAAA-MM-JJ"))
function minuitLocal(iso) {
  const [a, m, j] = iso.split("-").map(Number);
  return new Date(a, m - 1, j);
}

const debut = minuitLocal(CONFIG.DEBUT);
const doomsday = new Date(CONFIG.DOOMSDAY);

function dateOuverture(index) {
  const d = new Date(debut);
  d.setDate(d.getDate() + index);
  return d;
}

function nbOuvertes(maintenant) {
  let n = 0;
  while (n < VIDEOS.length && dateOuverture(n) <= maintenant) n++;
  return n;
}

// ---------- Grille ----------
const grid = document.getElementById("grid");
let dernierEtat = -1;

function rendreGrille() {
  const ouvertes = nbOuvertes(new Date());
  if (ouvertes === dernierEtat) return;
  dernierEtat = ouvertes;

  grid.innerHTML = "";
  VIDEOS.forEach((video, i) => {
    const b = document.createElement("button");
    b.className = "case";
    const ouverte = i < ouvertes;
    if (ouverte) {
      b.classList.add("ouverte");
      if (i === ouvertes - 1) b.classList.add("aujourdhui");
      b.innerHTML = `${i + 1}`;
      b.addEventListener("click", () => ouvrirModal(i));
    } else {
      b.innerHTML = `🔒<small>${i + 1}</small>`;
      b.disabled = true;
      b.title = "Se débloque le " + dateOuverture(i).toLocaleDateString("fr-FR");
    }
    grid.appendChild(b);
  });
}

// ---------- Modale ----------
const modal = document.getElementById("modal");
const modalLink = document.getElementById("modal-link");

function ouvrirModal(i) {
  const v = VIDEOS[i];
  document.getElementById("modal-day").textContent = "Case " + (i + 1);
  document.getElementById("modal-title").textContent = v.titre;
  if (v.lien) {
    modalLink.href = v.lien;
    modalLink.classList.remove("desactive");
    modalLink.textContent = "Voir la vidéo";
  } else {
    modalLink.removeAttribute("href");
    modalLink.classList.add("desactive");
    modalLink.textContent = "Lien bientôt disponible";
  }
  modal.hidden = false;
}

function fermerModal() { modal.hidden = true; }
document.getElementById("modal-close").addEventListener("click", fermerModal);
modal.addEventListener("click", (e) => { if (e.target === modal) fermerModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fermerModal(); });

// ---------- Compte à rebours ----------
const pad = (n) => String(n).padStart(2, "0");

function majCompteur() {
  const maintenant = new Date();
  let reste = Math.max(0, doomsday - maintenant);
  const j = Math.floor(reste / JOUR_MS); reste %= JOUR_MS;
  const h = Math.floor(reste / 3600000); reste %= 3600000;
  const m = Math.floor(reste / 60000); reste %= 60000;
  const s = Math.floor(reste / 1000);
  document.getElementById("cd-j").textContent = j;
  document.getElementById("cd-h").textContent = pad(h);
  document.getElementById("cd-m").textContent = pad(m);
  document.getElementById("cd-s").textContent = pad(s);

  const ouvertes = nbOuvertes(maintenant);
  const next = document.getElementById("next");
  if (doomsday <= maintenant) {
    next.textContent = "DOOMSDAY EST ARRIVÉ !";
  } else if (ouvertes < VIDEOS.length) {
    next.textContent = "Prochaine case : le " +
      dateOuverture(ouvertes).toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) + " à minuit";
  } else {
    next.textContent = "Toutes les cases sont ouvertes";
  }

  rendreGrille();
}

majCompteur();
setInterval(majCompteur, 1000);

// ---------- PWA ----------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

let promptInstall;
const btnInstall = document.getElementById("install");
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  promptInstall = e;
  btnInstall.hidden = false;
});
btnInstall.addEventListener("click", async () => {
  if (!promptInstall) return;
  promptInstall.prompt();
  await promptInstall.userChoice;
  promptInstall = null;
  btnInstall.hidden = true;
});
