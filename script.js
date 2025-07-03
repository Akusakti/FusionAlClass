// AI Text Generator Function
function generateText() {
    const input = document.getElementById('userInput').value;
    const output = document.getElementById('output');
    
    if (!input.trim()) {
        output.innerHTML = 'Sila tulis sesuatu terlebih dahulu...';
        return;
    }

    // Show loading animation
    output.innerHTML = '<div class="loading">🤖 AI sedang berfikir...</div>';

    // Simulasi AI response dengan delay
    setTimeout(() => {
        const responses = [
            `"${input}" - Ini adalah permulaan yang menarik! AI boleh membantu melengkapkan idea anda dengan pelbagai cara.`,
            `Berdasarkan input "${input}", AI boleh menganalisis dan memberikan insight yang mendalam tentang topik ini.`,
            `"${input}" menunjukkan pemahaman yang baik tentang konsep AI. Mari kita kembangkan idea ini lebih lanjut!`,
            `AI akan memproses "${input}" dan boleh memberikan cadangan untuk meningkatkan kandungan atau idea anda.`,
            `Input anda "${input}" adalah contoh yang baik tentang bagaimana manusia berinteraksi dengan AI.`
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        output.innerHTML = `
            <strong>AI Response:</strong><br>
            ${randomResponse}<br><br>
            <em>💡 Ini adalah simulasi. AI sebenar akan memberikan respons yang lebih kompleks dan kontekstual.</em>
        `;
    }, 1500);
}

// Typing Animation Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Animate cards on scroll
function animateCards() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Dark/Light Mode Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const isDark = body.classList.contains('light-mode');
    
    if (isDark) {
        body.classList.remove('light-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// Particle Effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Quiz Function
function startQuiz() {
    const questions = [
        {
            question: "Apa itu AI?",
            options: ["Kecerdasan Buatan", "Kecerdasan Biasa", "Kecerdasan Komputer", "Kecerdasan Digital"],
            correct: 0
        },
        {
            question: "Contoh AI dalam kehidupan seharian?",
            options: ["Siri", "Kalkulator", "Jam tangan", "Semua di atas"],
            correct: 0
        },
        {
            question: "Bahasa pengaturcaraan utama untuk AI?",
            options: ["Java", "Python", "C++", "JavaScript"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        const quizContainer = document.getElementById('quiz-container');
        const question = questions[currentQuestion];
        
        quizContainer.style.display = 'block';
        quizContainer.innerHTML = `
            <h3>Soalan ${currentQuestion + 1}/${questions.length}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<button onclick="selectAnswer(${index})" class="quiz-option">${option}</button>`
                ).join('')}
            </div>
        `;
    }

    window.selectAnswer = function(selected) {
        const question = questions[currentQuestion];
        if (selected === question.correct) {
            score++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = `
                <h3>Quiz Selesai!</h3>
                <p>Skor anda: ${score}/${questions.length}</p>
                <button onclick="startQuiz()" class="demo-button">Cuba Lagi</button>
            `;
        }
    };

    showQuestion();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards
    animateCards();
    
    // Create particles
    createParticles();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }
    
    // Add typing effect to header
    const headerTitle = document.querySelector('.header h1');
    const originalText = headerTitle.textContent;
    typeWriter(headerTitle, originalText, 100);

    // Add Enter key support for AI demo
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateText();
            }
        });
    }

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function renderAIPlatformList() {
  const listDiv = document.getElementById('ai-platform-list');
  if (!listDiv) return;
  
  fetch('ai_platforms.json')
    .then(response => response.json())
    .then(aiPlatforms => {
      listDiv.innerHTML = aiPlatforms.map(platform => `
        <div class="ai-platform-card">
          <h3><a href="${platform.url}" target="_blank" rel="noopener">${platform.name}</a></h3>
          <p>${platform.description}</p>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error loading AI platforms:', error);
      listDiv.innerHTML = "<p>Gagal memuatkan senarai platform AI. Sila cuba lagi.</p>";
    });
}

document.addEventListener('DOMContentLoaded', renderAIPlatformList);

// --- Supabase Client Init ---
const supabaseUrl = 'https://arieiqemusnnvqfzwson.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaWVpcWVtdXNubnZxZnp3c29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTIxOTYsImV4cCI6MjA2Njk2ODE5Nn0.ciM-FFq26xEYRsjNjaaBkBznlheiwOiNcFG7YGxtXcM';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Contoh fungsi fetch data dari table Supabase (ganti 'pelajar' dengan nama table sebenar)
async function fetchPelajar() {
    let { data, error } = await supabase
        .from('pelajar')
        .select('*');
    if (error) {
        console.error('Supabase error:', error);
        alert('Gagal fetch data dari Supabase!');
    } else {
        console.log('Data pelajar:', data);
        // Anda boleh render data ke HTML di sini
    }
} 