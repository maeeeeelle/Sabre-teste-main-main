import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Attendre que le DOM et les images soient chargés
window.addEventListener("load", () => {
  // Initialisation des éléments
  const blackHole = document.querySelector("#part-1-blackHole");
  const imgGalaxy = document.querySelector(".part-1-img");
  const part1Book = document.querySelector(".part-1-shop");

  let isExpanded = false;

  // Curseur texte "Scroll"
  const cursorText = document.createElement("div");
  cursorText.textContent = "Scroll";
  cursorText.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    font-family: "rama-gothic-c", sans-serif;
    font-size: 70px;
    font-weight: 500;
    color: var(--yellow);
    opacity: 0;
    transform: translate(-50%, 20%);
  `;
  document.body.appendChild(cursorText);

  document.addEventListener("mousemove", (e) => {
    cursorText.style.left = e.clientX + "px";
    cursorText.style.top = e.clientY + 50 + "px";
  });

  // Animation galaxie
  if (imgGalaxy) {
    imgGalaxy.addEventListener("click", () => {
      if (!isExpanded) {
        gsap.to(imgGalaxy, {
          scale: 8,
          duration: 0.3,
          borderRadius: 0,
          ease: "power2.out",
        });

        gsap.to(imgGalaxy, {
          scaleY: 33,
          scaleX: 40,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            document.body.style.overflow = "auto";
            isExpanded = true;

            if (part1Book) {
              gsap.to(part1Book, {
                opacity: 0,
                display: "none",
                duration: 0.1,
                ease: "power2.out",
              });
            }

            gsap.to(cursorText, {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        });
      } else {
        gsap.to(imgGalaxy, {
          scale: 1,
          x: "0%",
          y: "0%",
          duration: 0.3,
          borderRadius: 100,
          ease: "power2.in",
        });

        gsap.to(imgGalaxy, {
          scale: 1,
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = "hidden";
            isExpanded = false;

            if (part1Book) {
              gsap.to(part1Book, {
                opacity: 1,
                display: "block",
                duration: 0.1,
                ease: "power2.in",
              });
            }

            gsap.to(cursorText, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            });
          },
        });
      }
    });
  }

  // Animation Part 2 - Nuages
  if (document.querySelector(".container-part-2")) {
    const part2Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-part-2",
        scrub: true,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    part2Timeline.to("#cloud-1", { opacity: 1, x: 800 });
    part2Timeline.to("#cloud-2", { opacity: 0.5, x: -280 });
    part2Timeline.to("#cloud-3", { opacity: 0.7, x: 100 });
  }

  // Animation Part 3 - Cases
  if (document.querySelector(".part-3-parallax")) {
    const effectCase = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-3-parallax",
        scrub: true,
        end: "+=1200vh",
        pin: ".part-3-parallax",
        pinSpacing: true,
        markers: false,
      },
    });
    effectCase.to("#case-1", { opacity: 1, y: -30 });
    effectCase.to("#case-2", { opacity: 1, y: -30 });
  }

  // Animation Part 3 - Foudre
  if (document.querySelector(".part-3-foudre")) {
    const storm = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-3-foudre",
        scrub: true,
        end: "+=1100vh",
        start: "top top",
        pin: ".part-3-foudre",
        pinSpacing: true,
        markers: false,
      },
    });
    storm.to("#lightning-1", { opacity: 1 });
  }

  // Animation Part 4 - Blackout
  if (document.querySelector(".container-part-4")) {
    const blackout = gsap.timeline({
      scrollTrigger: {
        trigger: ".container-part-4",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: false,
        markers: false,
      },
    });
    blackout.to(".part-4-baby", { opacity: 0 });
    blackout.to(".part-4-effect", { opacity: 0 });
    blackout.to(".part-4-looking", { opacity: 1 }, "<");
  }

  // Animation horizontale slider
  const track = document.querySelector(".slider-track");
  const container = document.querySelector(".horizontal-mask");
  const img = document.querySelector(".horizontal-goinging img");

  if (track && container && img) {
    const distance = img.offsetWidth - container.offsetWidth;

    gsap.to(".slider-track", {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-mask",
        start: "top top",
        end: "+=" + distance,
        pin: true,
        scrub: 1,
        markers: false,
        anticipatePin: 1,
      },
    });
  }

  // Effet parallax Part 5
  const parallaxSection = document.querySelector(".parallax-fin");
  const backImage = document.getElementById("parallax-back");

  if (parallaxSection && backImage) {
    window.addEventListener("scroll", () => {
      const rect = parallaxSection.getBoundingClientRect();
      const scrollProgress = -rect.top / window.innerHeight;
      const moveAmount = scrollProgress * -120;
      backImage.style.transform = `translateY(${moveAmount}px)`;
    });
  }

  // Menu toggle
  function toggleMenu() {
    const dropdown = document.getElementById("dropdown");
    const leaderSvg = document.getElementById("leader-svg");

    if (dropdown && leaderSvg) {
      dropdown.classList.toggle("open");
      leaderSvg.classList.toggle("rotate");

      const isOpen = dropdown.classList.contains("open");
      dropdown.setAttribute("aria-hidden", !isOpen);
    }
  }

  const btn = document.getElementById("main-btn");
  if (btn) {
    btn.addEventListener("click", toggleMenu);
  }

  // Rafraîchir ScrollTrigger après le chargement complet
  ScrollTrigger.refresh();
});
