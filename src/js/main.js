import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
function initAnimations() {
  console.log("Initialisation des animations...");

  if (typeof gsap === "undefined") {
    console.error("GSAP non chargé !");
    return;
  }

  if (typeof ScrollTrigger === "undefined") {
    console.error("ScrollTrigger non chargé !");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log("ScrollTrigger enregistré avec succès");

  const imgGalaxy = document.querySelector(".part-1-image");
  const part1Book = document.querySelector(".part-1-store");

  let isExpanded = false;

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

  // Animation partie 1 galaxie
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

  // Animation Part 2 Cloud
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

    if (document.querySelector("#cloud-1")) {
      part2Timeline.to("#cloud-1", { opacity: 1, x: 800 });
    }
    if (document.querySelector("#cloud-2")) {
      part2Timeline.to("#cloud-2", { opacity: 0.5, x: -280 });
    }
    if (document.querySelector("#cloud-3")) {
      part2Timeline.to("#cloud-3", { opacity: 0.7, x: 100 });
    }
  }

  // Animation Part 3 BD cases
  if (document.querySelector(".part-3-parallaxeffect")) {
    const effectCase = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-3-parallaxeffect",
        scrub: true,
        end: "+=1200vh",
        pin: ".part-3-parallaxeffect",
        pinSpacing: true,
        markers: false,
      },
    });

    if (document.querySelector("#case-1")) {
      effectCase.to("#case-1", { opacity: 1, y: -30 });
    }
    if (document.querySelector("#case-2")) {
      effectCase.to("#case-2", { opacity: 1, y: -30 });
    }
  }

  // Animation Part 3 éclair
  if (document.querySelector(".part-3-thunderstorm")) {
    const storm = gsap.timeline({
      scrollTrigger: {
        trigger: ".part-3-thunderstorm",
        scrub: true,
        end: "+=1100vh",
        start: "top top",
        pin: ".part-3-thunderstorm",
        pinSpacing: true,
        markers: false,
      },
    });

    if (document.querySelector("#lightning-1")) {
      storm.to("#lightning-1", { opacity: 1 });
    }
  }

  // transition Part 4 fondu au noir
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

    if (document.querySelector(".part-4-baby")) {
      blackout.to(".part-4-baby", { opacity: 0 });
    }
    if (document.querySelector(".part-4-fade")) {
      blackout.to(".part-4-fade", { opacity: 0 });
    }
    if (document.querySelector(".part-4-outside")) {
      blackout.to(".part-4-outside", { opacity: 1 }, "<");
    }
  }

  // Animation partie horizontale scroll
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
  const partSnow = gsap.timeline({
    scrollTrigger: {
      trigger: ".part-5-snowing",
      start: "top top",
      end: "+=5500vh",
      pin: ".part-5-snowing",
      scrub: 4,
      markers: true,
      pinSpacing: true,
    },
  });

  gsap.set(".part-5-crystal", { x: "-45%", y: "-10%" });

  partSnow
    .to(".part-5-crystal", {
      motionPath: {
        path: [
          { x: "-45%", y: "-10%" },
          { x: "-25%", y: "5%" },
          { x: "5%", y: "10%" },
          { x: "-15%", y: "50%" },
          { x: "-15%", y: "60%" },
        ],
        curviness: 1.2,
      },
      duration: 60,
      ease: "none",
    })
    .to(".part-5-crystal", {
      duration: 20,
      ease: "none",
    })
    .to(".part-5-crystal", {
      x: "-5%",
      y: "75%",
      duration: 20,
      ease: "none",
    });

  // Effet parallax
  const parallaxSection = document.querySelector(".parallax-end");
  const backImage = document.getElementById("parallax-back");

  if (parallaxSection && backImage) {
    window.addEventListener("scroll", () => {
      const rect = parallaxSection.getBoundingClientRect();
      const scrollProgress = -rect.top / window.innerHeight;
      const moveAmount = scrollProgress * -120;
      backImage.style.transform = `translateY(${moveAmount}px)`;
    });
  }

  // dropdown book bouton
  function toggleMenu() {
    const dropdown = document.getElementById("dropdown");
    const leaderSvg = document.querySelector(".book-button-leader svg");

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

  // ScrollTrigger Rafraîchir
  setTimeout(() => {
    ScrollTrigger.refresh();
    console.log("Animations initialisées avec succès !");
  }, 100);
}

window.addEventListener("load", initAnimations);
