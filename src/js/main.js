import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // document.body.style.overflow = "hidden";

  const blackHole = document.querySelector("#part-1-blackHole");
  const imgGalaxy = document.querySelector(".part-1-img");
  const part1Book = document.querySelector(".part-1-shop");

  let isExpanded = false; // Variable pour savoir si le cercle est agrandi

  imgGalaxy.addEventListener("click", () => {
    if (!isExpanded) {
      // Animation d'agrandissement du trou noir
      gsap.to(imgGalaxy, {
        scale: 2,
        duration: 0.3,
        borderRadius: 0,
        ease: "power2.out",
      });

      gsap.to(imgGalaxy, {
        scale: 40, // correction de la syntaxe
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          document.body.style.overflow = "auto";
          isExpanded = true;

          // Masquer le part-1-book
          gsap.to(part1Book, {
            opacity: 0,
            display: "none",
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    } else {
      // Animation inverse (rétrécissement)
      gsap.to(imgGalaxy, {
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

          // Réafficher le part-1-book
          gsap.to(part1Book, {
            opacity: 1,
            display: "block",
            duration: 0.5,
            ease: "power2.in",
          });
        },
      });
    }
  });

  //

  //
  const part2Timline = gsap.timeline({
    scrollTrigger: {
      trigger: ".container-part-2",
      scrub: true,
      // pin: ".container-part-2",
      pin: true,
      pinSpacing: true,
      markers: true,
    },
  });

  part2Timline.to("#cloud-1", { opacity: 1, x: 800 });
  part2Timline.to("#cloud-2", { opacity: 0.5, x: -280 });
  part2Timline.to("#cloud-3", { opacity: 0.7, x: 100 });

  // === Animation verticale part-4 ===
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".container-part-4",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: false,
        markers: true,
      },
    })
    .to(".part-4-baby", { opacity: 0 })
    .to(".part-4-effect", { opacity: 0 }, "<")
    .to(".part-4-looking", { opacity: 1 }, "<");

  const track = document.querySelector(".slider-track");
  const container = document.querySelector(".horizontal-mask");
  const img = document.querySelector(".horizontal-goinging img");

  if (!track || !container || !img) return;

  const distance = img.offsetWidth - container.offsetWidth;

  gsap.to(".slider-track", {
    x: -distance,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-mask",
      start: "top top",
      // end: "+=500%",
      pin: true,
      scrub: 1,
      markers: true,
      anticipatePin: 1,
    },
  });

  // IMPORTANT : rafraîchir après création
  // ScrollTrigger.refresh();

  /// Vérifier que ça fonctionne

  const part3Timline = gsap.timeline({
    scrollTrigger: {
      trigger: ".part-3-cave",
      start: "top top",
      scrub: true,
      pin: ".part-3-parallax",
      pinSpacing: true,
      markers: true,
    },
  });
  part3Timline.to("#lightning-1", { opacity: 1 });

  //

  // document.addEventListener("scroll", () => {
  //   document.querySelectorAll(".part-3-case").forEach((el) => {
  //     const rect = el.getBoundingClientRect();
  //     const inMiddle =
  //       rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  //     el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  //     if (inMiddle) {
  //       el.style.opacity = "1";
  //       el.style.transform = "scale(1.05)";
  //     } else {
  //       el.style.opacity = "0";
  //       el.style.transform = "scale(1)";
  //     }
  //   });
  // });

  /////
  //

  ///////

  ///
  //
  //
  //
  // HORIZONTAL
  // gsap.to(".slider-track", {
  //   scrollTrigger: {
  //     trigger: ".horizontal-mask",
  //     start: "top top",
  //     end: "+800%",
  //     pin: true,
  //     scrub: true,
  //     markers: true, //false pour retiré le text qui intique end scrolling
  //   },
  //   x: "-75%",
  //   ease: "sine.inOut",
  // });

  // const img = document.querySelector(".screen img");
  // const distance = img.naturalWidth - window.innerWidth; // largeur réelle - viewport

  // gsap.to(".slider-track", {
  //   x: -distance, // déplace exactement la largeur de l'image
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: ".slider-mask",
  //     start: "top top",
  //     end: "+=" + distance, // scroll sur toute la distance
  //     pin: true,
  //     scrub: true,
  //     markers: true,
  //   },
  // });

  // Animation horizontale
  /////
  //
  ///
  //
  //
  //

  // Animation du flocon de neige avec mouvement zigzag
  gsap.to(".part-5-snowflake", {
    scrollTrigger: {
      trigger: ".part-5-snow",
      start: "top top",
      end: "bottom bottom",
      pin: true,
      scrub: true,
      markers: true, // false pour retirer le texte qui indique end scrolling
    },
    y: "220vh", // Descend jusqu'en bas
    x: "+=100vw", // Mouvement horizontal pour créer le zigzag
    ease: "sine.inOut",
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: 100, y: "25vh" },
        { x: -50, y: "50vh" },
        { x: 120, y: "75vh" },
        { x: -80, y: "100vh" },
        { x: 90, y: "125vh" },
        { x: -40, y: "150vh" },
        { x: 60, y: "175vh" },
        { x: 0, y: "200vh" },
      ],
      curviness: 1.5,
    },
  });

  const parallax = gsap.parallax({
    scrollTrigger: {
      trigger: ".part-3-parallax",
      start: "top top",
      end: "+300%",
      scrub: true,
      pin: true,
      markers: true,
    },
  });
  parallax.to("#case-1", {
    y: -100,
  });
  parallax.to(
    "#case-2",
    {
      y: -400,
    },
    0
  );

  // document.body.style.overflow = "hidden";

  // blackHole.addEventListener("click", () => {
  //   const img = blackHole.querySelector("img");

  //   // Réduire le zoom de l'image pendant l'agrandissement du cercle
  //   gsap.to(img, {
  //     scale: 1, // Revient à la taille normale
  //     duration: 0.3,
  //     x: 20,
  //     y: 10,
  //     ease: "power2.out",
  //   });

  //   gsap.to(blackHole, {
  //     scale: 45,
  //     duration: 0.8,
  //     ease: "power2.out",
  //     onComplete: () => {
  //       document.body.style.overflow = "auto";
  //     },
  //   });
  // });

  // Attendre que l'image soit chargée pour avoir les bonnes dimensions

  // === Scroll horizontal ===
});
