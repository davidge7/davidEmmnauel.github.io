const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");
const yearEl = document.querySelector(".footer-text span");

const toggleNav = () => {
  nav.classList.toggle("hidden");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  if (nav.classList.contains("hidden")) {
    btnToggleNav.textContent = "menu";
  } else {
    // When menu is opened after transition change text respectively
    setTimeout(() => {
      btnToggleNav.textContent = "close";
    }, 475);
  }
};

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    toggleNav();
  }
});

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

// Rotating logos animation

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

yearEl.textContent = new Date().getFullYear();

// Dynamic skills data for toolkit section
const skills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Typescript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "AngularJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Core Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Swagger", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
  { name: "Unit Tests", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "AWS", logo: "https://github.com/devicons/devicon/raw/v2.16.0/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  // Add more as needed, use placeholders if no official logo exists
];

function renderSkills() {
  const skillsContainer = document.querySelector('.skills-imgs');
  if (!skillsContainer) return;
  skillsContainer.innerHTML = '';
  skills.forEach(skill => {
    const wrapper = document.createElement('div');
    wrapper.className = 'skill-wrapper';
    wrapper.style.display = 'inline-block';
    wrapper.style.position = 'relative';
    wrapper.style.margin = '8px';
    wrapper.style.cursor = 'pointer';

    const img = document.createElement('img');
    img.src = skill.logo;
    img.alt = skill.name;
    img.title = skill.name + ' - Click for more info';
    img.className = 'skills-img';
    img.loading = 'lazy';
    img.style.pointerEvents = 'none';

    // Tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = skill.name;
    tooltip.style.visibility = 'hidden';
    tooltip.style.background = '#222';
    tooltip.style.color = '#fff';
    tooltip.style.textAlign = 'center';
    tooltip.style.borderRadius = '4px';
    tooltip.style.padding = '4px 8px';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '10';
    tooltip.style.bottom = '110%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.fontSize = '0.9em';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s';

    wrapper.addEventListener('mouseenter', () => {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    });
    wrapper.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    });

    wrapper.appendChild(img);
    wrapper.appendChild(tooltip);
    skillsContainer.appendChild(wrapper);
  });
}

// Fetch and render Dev.to articles dynamically
async function fetchDevToArticles() {
  const username = 'david_emmanuelg'; // Updated to your dev.to username
  const apiUrl = `https://dev.to/api/articles?username=${username}&per_page=6`;
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Failed to fetch articles');
    const articles = await res.json();
    const container = document.querySelector('.article-boxes');
    if (!container) return;
    container.innerHTML = '';
    articles.forEach((article, i) => {
      const articleBox = document.createElement('article');
      articleBox.className = 'article-box' + (i === 0 ? ' featured-article' : '');
      articleBox.innerHTML = `
        <div class="article-textbox">
          <div>
            <h3 class="${i === 0 ? 'h3' : 'h4'}">${article.title}</h3>
            <p class="article-text">${article.description || ''}</p>
          </div>
          <div class="article-info">
            <a href="${article.url}" class="link" target="_blank" rel="noopener">Continue reading</a>
            <span class="reaction-count">
              <img src="./assets/images/heart-outline.svg" alt="heart" loading="lazy" />
              ${article.public_reactions_count || 0}
            </span>
          </div>
        </div>
        ${article.cover_image ? `<picture class="article-illustration"><img src="${article.cover_image}" alt="${article.title}" loading="lazy" /></picture>` : ''}
      `;
      container.appendChild(articleBox);
    });
  } catch (err) {
    console.error('Error fetching articles:', err);
  }
}

// Fetch and render testimonials dynamically from JSON file
async function fetchTestimonials() {
  try {
    const res = await fetch('testimonials.json');
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    const testimonials = await res.json();
    const container = document.querySelector('.testimonials');
    if (!container) return;
    container.innerHTML = '';
    testimonials.forEach(t => {
      const li = document.createElement('li');
      li.className = 'testimonial';
      li.innerHTML = `
        <blockquote class="testimonial-text">
          ${t.text}
        </blockquote>
        <figure class="testimonial-author">
          <img src="${t.authorImg}" alt="${t.authorName}" loading="lazy" />
          <figcaption>
            <h3 class="testimonial-author-name">${t.authorName}</h3>
            <p class="testimonial-author-job">${t.authorJob}</p>
          </figcaption>
        </figure>
      `;
      container.appendChild(li);
    });
  } catch (err) {
    console.error('Error fetching testimonials:', err);
  }
}

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/davidge7",
    icon: "https://github.com/devicons/devicon/raw/v2.16.0/icons/github/github-original.svg"
  },
  {
    name: "Codepen",
    url: "https://codepen.io/davidge7",
    icon: "https://github.com/devicons/devicon/raw/v2.16.0/icons/codepen/codepen-original.svg"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/davidge97",
    icon: "https://github.com/devicons/devicon/raw/v2.16.0/icons/linkedin/linkedin-original.svg"
  },
  {
    name: "Dev.to",
    url: "https://dev.to/david_emmanuelg",
    icon: "https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
  },
  {
    name: "Medium",
    url: "https://medium.com/@david97.de16",
    icon: "assets/images/medium.svg"
  }
];

function renderSocialLinks() {
  const list = document.getElementById('footer-links-list');
  if (!list) return;
  list.innerHTML = '';
  socialLinks.forEach(link => {
    const li = document.createElement('li');
    li.className = 'footer-link';
    li.innerHTML = `
      <a title="${link.name}" href="${link.url}" target="_blank" rel="noopener">
        <img loading="lazy" src="${link.icon}" alt="${link.name}" />
      </a>
    `;
    list.appendChild(li);
  });
}

// Load EmailJS SDK dynamically
(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  script.onload = function () {
    if (window.emailjs) {
      emailjs.init(
        'H84ouPd7LoG0XzrIX' // <-- Uses the variable from config.js
      );
    }
  };
  document.head.appendChild(script);
})();

// Contact form email trigger (EmailJS integration)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // Show loading or disable button if desired
    if (window.emailjs) {
      emailjs.send('service_usgneri', 'template_q0b4cy9', {
        from_name: name,
        from_email: email,
        message: message
      })
        .then(function (response) {
          alert('Message sent successfully!');
          contactForm.reset();
        }, function (error) {
          alert('Failed to send message. Please try again later.');
        });
    } else {
      alert('Email service not loaded. Please try again.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  fetchDevToArticles();
  renderSocialLinks();
  fetchTestimonials();
});
