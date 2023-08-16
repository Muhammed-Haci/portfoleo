import data from "./data.json" assert { type: "json" };

// ========= Set preloader function ============ //
let preloader = document.querySelector(".preloader");
window.addEventListener("load", () => {
  document.body.style.height = "unset";
  preloader.style.display = "none";
});

// ============ toggle Theme Mode ================ //
// === Get the variables ===:
let checkbox = document.querySelector("#checkbox");
let color_scheme = localStorage.getItem("color_scheme");

// === Check the localStorage Theme ===:
if (color_scheme) {
  document.documentElement.setAttribute("color_scheme", color_scheme);
}

// === Change The Theme function ===:

checkbox.addEventListener("click", () => {
  const hasAttribute = document.documentElement.hasAttribute("color_scheme");
  const attributeValue = document.documentElement.getAttribute("color_scheme");

  if (hasAttribute) {
    if (attributeValue == "light") {
      document.documentElement.setAttribute("color_scheme", "dark");
      localStorage.setItem("color_scheme", "dark");
      // === add the audio to the body ===:
      const audio = document.createElement("audio");
      audio.src = "assets/audio/audio_light-on.mp3";
      audio.play();
      audio.remove();
    } else {
      document.documentElement.setAttribute("color_scheme", "light");
      localStorage.setItem("color_scheme", "light");
      // === add the audio to the body ===:
      const audio = document.createElement("audio");
      audio.src = "assets/audio/audio_light-off.mp3";
      audio.play();
      audio.remove();
    }
  } else {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    if (prefersDarkMode) {
      document.documentElement.setAttribute("color_scheme", "dark");
      localStorage.setItem("color_scheme", "dark");
      checkbox.setAttribute("checked", "");
    } else {
      document.documentElement.setAttribute("color_scheme", "light");
      localStorage.setItem("color_scheme", "light");
    }
  }
});
// create the skills' circles
const content = document.querySelector(".skills .content");

function createSkillsCircles(data) {
  data.skills.map((item) => {
    let skill = document.createElement("div");
    let progress = document.createElement("div");
    let name = document.createElement("div");
    let percentage = document.createElement("div");
    let number = document.createElement("span");
    let subSpan = document.createElement("span");

    skill.classList.add("skill");
    progress.classList.add("progress");
    name.classList.add("name");
    percentage.classList.add("percentage");
    number.classList.add("number");

    number.textContent = 0;
    number.setAttribute("data-number", item.progress);
    subSpan.textContent = "%";
    progress.innerHTML = `    
    <svg>
      <circle cx="60" cy="60" r="50" />
      <circle data-number= ${item.progress} class="circle" cx="60" cy="60" r="50" />
    </svg>`;
    name.textContent = item.name;

    percentage.appendChild(number);
    percentage.appendChild(subSpan);
    progress.appendChild(percentage);
    skill.appendChild(progress);
    skill.appendChild(name);
    content.appendChild(skill);
  });
}
createSkillsCircles(data);

// ============ Animate The Svg ================ //
let skillsSection = document.querySelector(".skills");
let progress = document.querySelectorAll(".skills .number");
let circle = document.querySelectorAll(".skills .circle");
let start = false;

window.addEventListener("scroll", () => {
  if (window.scrollY >= skillsSection.offsetTop - window.innerHeight / 2) {
    if (!start) {
      progress.forEach((prog) => {
        let counter = setInterval(() => {
          prog.textContent++;
          if (prog.textContent === prog.dataset.number) {
            clearInterval(counter);
          }
        }, 1500 / prog.dataset.number);
      });
      circle.forEach((cir) => {
        cir.style.strokeDashoffset = 314 - (cir.dataset.number / 100) * 314;
      });
    }
    start = true;
  }
});

// create projects' cards
function createCards(data) {
  const content = document.querySelector(".projects .content");
  data.projects.map((item) => {
    const card = document.createElement("div");
    card.classList.add(item.name, item.category);

    const front = document.createElement("div");
    front.classList.add("face", "front");

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("imageWrapper");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const scroll = document.createElement("button");
    scroll.classList.add("scroll");
    scroll.setAttribute("data-height", item.height);
    scroll.innerHTML = "scroll";
    const flip = document.createElement("button");
    flip.classList.add("flip");
    flip.setAttribute("data-project", item.name);
    flip.innerHTML = "flip";

    imageWrapper.appendChild(image);
    front.appendChild(imageWrapper);

    buttons.appendChild(scroll);
    buttons.appendChild(flip);
    front.appendChild(buttons);
    card.appendChild(front);

    const back = document.createElement("div");
    back.classList.add("face", "back");

    const details = document.createElement("div");
    details.classList.add("details");

    const title = document.createElement("h4");
    const titleSpan = document.createElement("span");
    titleSpan.innerHTML = "Name: ";
    const tech = document.createElement("p");
    const techSpan = document.createElement("span");
    techSpan.innerHTML = "used technologies: ";
    const desc = document.createElement("p");
    const descSpan = document.createElement("span");
    descSpan.innerHTML = "Description: ";

    title.appendChild(titleSpan);
    tech.appendChild(techSpan);
    desc.appendChild(descSpan);
    title.innerHTML += item.name;
    tech.innerHTML += item.technologies;
    desc.innerHTML += item.description;

    details.appendChild(title);
    details.appendChild(tech);
    details.appendChild(desc);
    back.appendChild(details);

    const links = document.createElement("div");
    links.classList.add("links");
    const code = document.createElement("a");
    code.href = item.code;
    code.target = "_blank";
    const codeImage = document.createElement("img");
    codeImage.src = "./assets/svg/code.svg";
    codeImage.alt = "code svg";
    const codeSpan = document.createElement("span");
    codeSpan.innerHTML = "code";

    const demo = document.createElement("a");
    demo.href = item.demo;
    demo.target = "_blank";
    const demoImage = document.createElement("img");
    demoImage.src = "./assets/svg/computer.svg";
    demoImage.alt = "computer svg";
    const demoSpan = document.createElement("span");
    demoSpan.innerHTML = "demo";

    code.appendChild(codeImage);
    code.appendChild(codeSpan);

    demo.appendChild(demoImage);
    demo.appendChild(demoSpan);

    links.appendChild(code);
    links.appendChild(demo);

    back.appendChild(links);
    card.appendChild(back);
    content.appendChild(card);
  });
}
createCards(data);

// ========= Flip The project card ============= //
let cards = document.querySelectorAll(".projects .content > div");
let flipBtn = document.querySelectorAll(".projects .flip");

flipBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    cards.forEach((card) => {
      card.classList.remove("flipped");
    });
    document
      .querySelector(`.${[e.target.dataset.project]}`)
      .classList.add("flipped");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("flip")) {
    cards.forEach((card) => {
      card.classList.remove("flipped");
    });
  }
});

// ======== Scroll The project img ============= //
let scrollBtn = document.querySelectorAll(".projects .scroll");
let scrolled = false;

scrollBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (scrolled) {
      e.currentTarget.parentElement.previousElementSibling.firstElementChild.style.marginTop = `0`;
      scrolled = false;
    } else {
      e.currentTarget.parentElement.previousElementSibling.firstElementChild.style.marginTop = `-${
        e.target.dataset.height - 187
      }px`;
      scrolled = true;
    }
  });
});
// ===== toggle between the projects filter ======= //
let filterButtons = document.querySelectorAll(".projects .filter ul li");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    if (e.target.dataset.text == "all") {
      cards.forEach((el) => {
        el.style.cssText = `display: block`;
      });
    } else {
      cards.forEach((card) => {
        card.style.cssText = `display: none`;
        document
          .querySelectorAll(`.projects .${e.target.dataset.text}`)
          .forEach((el) => {
            el.style.cssText = `display: block`;
          });
      });
    }
  });
});
// ============ init emailjs ================ //

let inputs = document.querySelectorAll("form input");
let textarea = document.querySelector("textarea");
let btn = document.getElementById("subBtn");
let btnInnerText = btn.textContent;

document.getElementById("form").addEventListener("submit", function (event) {
  let username = document.querySelector("input[name= username]").value;
  console.log(username);
  event.preventDefault();
  switch (btnInnerText) {
    case "Send":
      btn.textContent = "Sending..";
      break;
    case "Gönder":
      btn.textContent = "Gönderiyor..";
      break;
    case "إرسال":
      btn.textContent = "جاري الإرسال";
      break;
    default:
      btn.textContent = "Sending..";
  }
  const serviceID = "default_service";
  const templateID = "template_rfg3boh";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.textContent = btnInnerText;
      inputs.forEach((input) => {
        input.value = "";
      });
      textarea.value = "";

      switch (btnInnerText) {
        case "Send":
          alert(
            `Hello ${username}, Your message has been sent successfully, I will reply as soon as I see your message, Thank You for contacting me 😊`
          );
          break;
        case "Gönder":
          alert(
            `Merhaba ${username}, Mesajınız başarıyla gönderildi, mesajınızı görür görmez cevap vereceğim, benimle iletişime geçtiğiniz için teşekkür ederim 😊`
          );
          break;
        case "إرسال":
          alert(
            `تم إرسال رسالتكم بنجاح ، سأرد عليكم بأقرب وقت ممكن ، شكرًا لكم على التواصل 😊`
          );
          break;
        default:
          btn.textContent = "Sending..";
      }
    },
    (err) => {
      btn.textContent = btnValue;
      alert(JSON.stringify(err));
    }
  );
});

// ======= Set Copyright year in the footer ======== //
let year = document.querySelector("footer .year");
year.textContent = new Date().getFullYear();
