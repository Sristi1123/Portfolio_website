/* ==========================================
   SRISTI PORTFOLIO – script.js
   ========================================== */

// ==========================================
// AOS – Animate on Scroll
// ==========================================
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

// ==========================================
// PARTICLES.JS CONFIG
// ==========================================
particlesJS('particles-js', {
  particles: {
    number: { value: 70, density: { enable: true, value_area: 900 } },
    color: { value: ['#3B82F6', '#22D3EE', '#ffffff'] },
    shape: { type: 'circle' },
    opacity: {
      value: 0.4,
      random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2.5,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#3B82F6',
      opacity: 0.15,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 3 }
    }
  },
  retina_detect: true
});

// ==========================================
// TYPED.JS – Hero typing effect
// ==========================================
const typed = new Typed('#typed', {
  strings: [
    'Data Science Student',
    'Machine Learning Enthusiast',
    'Aspiring Data Scientist',
    'Python Developer',
    'AI Explorer',
    'Power BI Analyst'
  ],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 1800,
  startDelay: 400,
  loop: true,
  showCursor: true,
  cursorChar: '|',
});

// ==========================================
// NAVBAR – Scroll behaviour + active links
// ==========================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled class
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', onScroll);

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// MOBILE HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ==========================================
// SKILL BARS – Animate on viewport entry
// ==========================================
const skillFills = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      // Small delay so AOS card animation runs first
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 300);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.2 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ==========================================
// PROJECT FILTER
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category');
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease-out forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;
  
  const prefix = parts[0].toLowerCase();
  
  // Reject very short prefixes
  if (prefix.length < 3) return false;
  
  // Reject repetitive characters e.g. "aaa", "1111"
  if (/^(.)\1+$/.test(prefix)) return false;
  
  // Reject obvious fakes completely
  const fakePrefixes = ['abc', 'test', 'fake', 'dummy', '123', 'admin', 'user', 'qwe', 'asd', '1234'];
  if (fakePrefixes.includes(prefix)) return false;
  
  for (let f of fakePrefixes) {
    if (prefix.startsWith(f)) return false;
  }
  
  return true;
}

contactForm.addEventListener('submit', function(e) {
  let valid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const nameErr = document.getElementById('nameError');
  const emailErr = document.getElementById('emailError');
  const msgErr = document.getElementById('messageError');

  // Reset errors
  [nameErr, emailErr, msgErr].forEach(el => el.textContent = '');

  if (name.value.trim().length < 2) {
    nameErr.textContent = 'Please enter your name (at least 2 characters).';
    valid = false;
  }
  if (!validateEmail(email.value.trim())) {
    emailErr.textContent = 'Please enter a real, registered email address (e.g., no "abc@" or "test@").';
    valid = false;
  }
  if (message.value.trim().length < 10) {
    msgErr.textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  // IF INVALID: Stop the form from submitting!
  if (!valid) {
    e.preventDefault(); 
  } else {
    // IF VALID: Do NOT prevent default. Let HTML natively POST to FormSubmit.co
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to Secure Server...';
  }
});

// ==========================================
// CHART.JS – 4 Charts
// ==========================================

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: '#94A3B8',
        font: { family: "\'Inter\', sans-serif", size: 11 },
        boxWidth: 12,
        padding: 16,
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(59,130,246,0.3)',
      borderWidth: 1,
      titleColor: '#E5E7EB',
      bodyColor: '#94A3B8',
      padding: 12,
      cornerRadius: 8,
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94A3B8', font: { size: 11 } }
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94A3B8', font: { size: 11 } }
    }
  }
};

// 1. Line Chart – Skills Growth Over Time
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Jan\\\'26'],
    datasets: [
      {
        label: 'Python',
        data: [40, 52, 60, 72, 78, 85, 90],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointRadius: 4,
      },
      {
        label: 'Machine Learning',
        data: [15, 28, 38, 50, 62, 72, 80],
        borderColor: '#22D3EE',
        backgroundColor: 'rgba(34,211,238,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22D3EE',
        pointRadius: 4,
      },
      {
        label: 'SQL',
        data: [30, 40, 50, 58, 65, 75, 80],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168,85,247,0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#a855f7',
        pointRadius: 4,
      }
    ]
  },
  options: {
    ...chartDefaults,
    animation: { duration: 1500, easing: 'easeInOutQuart' },
    scales: {
      ...chartDefaults.scales,
      y: {
        ...chartDefaults.scales.y,
        min: 0, max: 100,
        ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + '%' }
      }
    }
  }
});

// 2. Bar Chart – Project Tech Stack Usage
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['Python', 'Power BI', 'JavaScript', 'Scikit-learn', 'Pandas', 'Gemini API'],
    datasets: [{
      label: 'Times Used in Projects',
      data: [5, 2, 2, 3, 4, 1],
      backgroundColor: [
        'rgba(59,130,246,0.7)',
        'rgba(34,211,238,0.7)',
        'rgba(168,85,247,0.7)',
        'rgba(34,211,238,0.7)',
        'rgba(59,130,246,0.7)',
        'rgba(251,191,36,0.7)',
      ],
      borderColor: [
        '#3B82F6','#22D3EE','#a855f7','#22D3EE','#3B82F6','#FBBF24'
      ],
      borderWidth: 2,
      borderRadius: 6,
    }]
  },
  options: {
    ...chartDefaults,
    animation: { duration: 1500, easing: 'easeInOutQuart' },
    scales: {
      ...chartDefaults.scales,
      y: { ...chartDefaults.scales.y, min: 0, max: 6, ticks: { ...chartDefaults.scales.y.ticks, stepSize: 1 } }
    }
  }
});

// 3. Doughnut Chart – Skills Distribution
const doughCtx = document.getElementById('doughnutChart').getContext('2d');
new Chart(doughCtx, {
  type: 'doughnut',
  data: {
    labels: ['Python / ML', 'Data Analysis', 'Web Dev', 'BI / Visualization', 'Problem Solving'],
    datasets: [{
      data: [35, 25, 15, 15, 10],
      backgroundColor: [
        'rgba(59,130,246,0.8)',
        'rgba(34,211,238,0.8)',
        'rgba(168,85,247,0.8)',
        'rgba(251,191,36,0.8)',
        'rgba(74,222,128,0.8)',
      ],
      borderColor: '#0F172A',
      borderWidth: 3,
      hoverOffset: 8,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    animation: { animateRotate: true, duration: 1500 },
    plugins: {
      legend: chartDefaults.plugins.legend,
      tooltip: chartDefaults.plugins.tooltip,
    }
  }
});

// 4. Area Chart – Academic Performance
const areaCtx = document.getElementById('areaChart').getContext('2d');
new Chart(areaCtx, {
  type: 'line',
  data: {
    labels: ['Class X (2020)', 'Class XII (2022)', 'Sem 1', 'Sem 2', 'Sem 3', 'Current'],
    datasets: [{
      label: 'Academic Score / CGPA-equiv (%)',
      data: [87.8, 85.2, 84, 84.5, 84.2, 84.0],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59,130,246,0.15)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  },
  options: {
    ...chartDefaults,
    animation: { duration: 1800, easing: 'easeInOutQuart' },
    scales: {
      ...chartDefaults.scales,
      y: {
        ...chartDefaults.scales.y,
        min: 70, max: 95,
        ticks: { ...chartDefaults.scales.y.ticks, callback: v => v + '%' }
      }
    }
  }
});

// 5. Radar Chart in Skills section
const radarCtx = document.getElementById('radarChart').getContext('2d');
new Chart(radarCtx, {
  type: 'radar',
  data: {
    labels: ['Python', 'ML / AI', 'Analytics', 'SQL', 'Visualization', 'Problem Solving'],
    datasets: [{
      label: 'Proficiency',
      data: [90, 78, 82, 80, 75, 85],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59,130,246,0.15)',
      pointBackgroundColor: '#22D3EE',
      pointBorderColor: '#fff',
      pointRadius: 5,
      borderWidth: 2,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 1500 },
    scales: {
      r: {
        min: 0, max: 100,
        grid: { color: 'rgba(255,255,255,0.07)' },
        angleLines: { color: 'rgba(255,255,255,0.07)' },
        pointLabels: { color: '#94A3B8', font: { size: 11 } },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: chartDefaults.plugins.tooltip,
    }
  }
});

// ==========================================
// Chart animation on viewport entry
// ==========================================
const chartCards = document.querySelectorAll('.chart-card');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

chartCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  chartObserver.observe(card);
});

// ==========================================
// Smooth highlight on nav link click
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==========================================
// Add fade-in keyframe dynamically
// ==========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ==========================================
// RESUME PDF GENERATOR
// ==========================================
document.getElementById('downloadResumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  
  const btn = e.currentTarget;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading PDF...';
  
  // Create window immediately to avoid popup blockers
  const newWin = window.open('', '_blank');
  
  if (newWin) {
    newWin.document.body.innerHTML = '<h3 style="font-family:sans-serif; text-align:center; color:#333; margin-top:50px;">Generating PDF...</h3>';
  }

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = 'Pics/Sristi_Resume.png';
  document.getElementById('downloadResumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  window.open('SristiCV.pdf', '_blank');
});
  img.onload = () => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: img.width > img.height ? 'l' : 'p',
        unit: 'px',
        format: [img.width, img.height]
      });
      
      doc.addImage(img, 'PNG', 0, 0, img.width, img.height);
      const blobUrl = doc.output('bloburl');
      
      if (newWin) {
        newWin.location.href = blobUrl;
      } else {
        // Fallback: If popup was blocked, force a direct download
        doc.save('Sristi_Resume.pdf');
      }
    } catch(err) {
      if(newWin) newWin.close();
      console.error("PDF Generation error:", err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      btn.innerHTML = originalHtml;
    }
  };
  
  img.onerror = () => {
    if(newWin) newWin.close();
    alert('Failed to load resume image.');
    btn.innerHTML = originalHtml;
  };
});
