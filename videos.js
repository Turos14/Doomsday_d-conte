// ============================================================
//  FICHIER À MODIFIER : contenu des 15 cases et liste des films
// ============================================================
//  - DEBUT : date (AAAA-MM-JJ) où la case 1 se débloque à minuit.
//    Chaque case suivante se débloque le jour d'après à minuit.
//  - DOOMSDAY : date et heure de sortie pour le compte à rebours.
//  - TEST : true = toutes les cases sont déverrouillées (à remettre
//    à false avant la mise en service).
//  - CASES : 15 entrées dans l'ordre des cases, soit
//      { titre, lien }   -> vidéo (lien vide = « bientôt disponible »)
//      { titre, photo }  -> photo affichée + bouton télécharger
//  - FILMS : films essentiels à voir avant Doomsday (cochables).
// ============================================================

const CONFIG = {
  DEBUT: "2026-12-01",
  DOOMSDAY: "2026-12-18T00:00:00",
  TEST: true,
};

const CASES = [
  { titre: "Bande-annonce Doomsday (VF)", lien: "https://www.youtube.com/watch?v=opI0klN3-Pw" },
  { titre: "Photo Doom", photo: "img/photo-j2.jpg" },
  { titre: "Case mystère", lien: "" },
  { titre: "Photo Doom", photo: "img/photo-j4.jpg" },
  { titre: "Case mystère", lien: "" },
  { titre: "Bande-annonce Doomsday (VF)", lien: "https://www.youtube.com/watch?v=g9NAGSPpfjs" },
  { titre: "Case mystère", lien: "" },
  { titre: "Photo Doom", photo: "img/photo-j8.jpg" },
  { titre: "Scène bonus Thunderbolts*", lien: "https://www.youtube.com/watch?v=ws-QVLXCisI" },
  { titre: "Case mystère", lien: "" },
  { titre: "Photo Doom", photo: "img/photo-j11.jpg" },
  { titre: "Scène bonus Spider-Man: Brand New Day", lien: "https://www.youtube.com/watch?v=Ct3PBpDAHR0" },
  { titre: "Photo Doom", photo: "img/photo-j13.jpg" },
  { titre: "Scène bonus Les Quatre Fantastiques: Premiers Pas", lien: "https://www.youtube.com/watch?v=3ZJWwpjCKaw" },
  { titre: "77 détails cachés dans le trailer d'Avengers: Doomsday", lien: "https://www.youtube.com/watch?v=8x-YfFJbAQI" },
];

const FILMS = [
  { titre: "X-Men (2000)", lien: "https://www.google.com/search?kgmid=%2Fm%2F0d90m&q=X-Men" },
  { titre: "X-Men 2 (2003)", lien: "https://www.google.com/search?kgmid=%2Fm%2F01qb5d&q=X-Men+2" },
  { titre: "Captain America: The First Avenger (2011)", lien: "https://www.google.com/search?kgmid=%2Fm%2F0cc846d&q=Captain+America%3A+The+First+Avenger" },
  { titre: "Avengers (2012)", lien: "https://www.google.com/search?kgmid=%2Fm%2F062zm5h&q=Avengers" },
  { titre: "Avengers: Infinity War (2018)", lien: "https://www.google.com/search?kgmid=%2Fm%2F0126b8kn&q=Avengers%3A+Infinity+War" },
  { titre: "Avengers: Endgame (2019)", lien: "https://www.google.com/search?kgmid=%2Fm%2F0126b8kv&q=Avengers%3A+Endgame" },
  { titre: "Loki (saisons 1 et 2, 2021–2023)", note: "Pour comprendre les règles du multivers et de la TVA", lien: "https://www.google.com/search?kgmid=%2Fg%2F11hz_kmycc&q=Loki" },
  { titre: "Shang-Chi et la Légende des Dix Anneaux (2021)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11fmjthy_8&q=Shang-Chi+et+la+L%C3%A9gende+des+Dix+Anneaux" },
  { titre: "Spider-Man: No Way Home (2021)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11f630v_lv&q=Spider-Man%3A+No+Way+Home" },
  { titre: "Doctor Strange in the Multiverse of Madness (2022)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11fmhx17vl&q=Doctor+Strange+in+the+Multiverse+of+Madness" },
  { titre: "Black Panther: Wakanda Forever (2022)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11h_3t6v1q&q=Black+Panther%3A+Wakanda+Forever" },
  { titre: "Deadpool & Wolverine (2024)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11g073clwl&q=Deadpool+%26+Wolverine" },
  { titre: "Captain America: Brave New World (2025)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11s573z128&q=Captain+America%3A+Brave+New+World" },
  { titre: "Thunderbolts* (2025)", lien: "" },
  { titre: "Les Quatre Fantastiques: Premiers Pas (2025)", lien: "https://www.google.com/search?kgmid=%2Fg%2F11pc04s3qv&q=Les+Quatre+Fantastiques%3A+Premiers+Pas" },
];
