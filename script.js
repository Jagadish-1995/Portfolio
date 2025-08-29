
/*=================== toggle icon navbar ==================*/ 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*=================== scroll sections active links ==================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

        };
    });

/*=================== sticky navbar ==================*/ 
let header = document.querySelector('header');

header.classList.toggle('sticky', window.scrolly > 100);

/*=================== remove toggle icon and navbar when click navbar link(scroll) ==================*/ 
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*=================== scroll reveal ==================*/
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-image, .services-container, .portfolio-box, .contact form', {origin: 'botttom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin: 'right'});


/*=================== typed js ==================*/
const typed = new Typed('.multiple-text', {
    strings: ['AI/ML Developer', 'Data Analyst', 'Cyber Security Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


/*=================== About Section ==================*/
const aboutBtn = document.getElementById('aboutBtn');
const aboutMore = document.getElementById('about-more');

aboutBtn.addEventListener('click', () => {
    if (aboutMore.style.display === "none") {
        aboutMore.style.display = "block";
        aboutBtn.textContent = "Read Less";
    } else {
        aboutMore.style.display = "none";
        aboutBtn.textContent = "Read More";
    }
});




/*=================== Form submission ==================*/
document.getElementById("contactForm").addEventListener("load", function() {
    let iframe = document.getElementById("contactForm");
    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDoc.body.innerText.includes("Your response has been recorded")) {
        let popup = document.getElementById("popupMessage");
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 3000);
    }
});



/*=================== Background Animation ==================*/
window.onload = function () {
    const canvas = document.getElementById('network-bg');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let triangle = { x: window.innerWidth / 2, y: window.innerHeight / 2, size: 12, angle: 0 };

    const neonColors = ['#00f5ff', '#ff00e6', '#00ff88', '#ffaa00', '#ff4444'];
    let colorIndex = 0;
    let hueShift = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function Particle(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;

        this.draw = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.fill();
        };

        this.update = () => {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
            if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
            this.x += this.dx;
            this.y += this.dy;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                this.x -= dx / 20;
                this.y -= dy / 20;
            }
            this.draw();
        };
    }

    function init() {
        particles = [];
        for (let i = 0; i < 160; i++) { // More particles
            let size = Math.random() * 2 + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let dx = (Math.random() - 0.5) * 1;
            let dy = (Math.random() - 0.5) * 1;
            let color = neonColors[Math.floor(Math.random() * neonColors.length)];
            particles.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx * dx + dy * dy;
                if (distance < 9000) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[a].color + '33'; // Faint color line
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function drawTriangle() {
        if (!mouse.x || !mouse.y) return;

        triangle.x += (mouse.x - triangle.x) * 0.05;
        triangle.y += (mouse.y - triangle.y) * 0.05;
        triangle.angle += 0.03;

        let pulse = Math.sin(Date.now() / 250) * 1.2;

        hueShift += 0.01;
        if (hueShift >= 1) {
            hueShift = 0;
            colorIndex = (colorIndex + 1) % neonColors.length;
        }
        let color = neonColors[colorIndex];

        ctx.save();
        ctx.translate(triangle.x, triangle.y);
        ctx.rotate(triangle.angle);

        // Outer glowing triangle
        ctx.beginPath();
        ctx.moveTo(0, -triangle.size - pulse);
        ctx.lineTo(triangle.size + pulse, triangle.size + pulse);
        ctx.lineTo(-triangle.size - pulse, triangle.size + pulse);
        ctx.closePath();

        let gradient = ctx.createLinearGradient(-triangle.size, -triangle.size, triangle.size, triangle.size);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, '#ffffff');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Internal scan lines
        ctx.clip();
        for (let i = -triangle.size; i < triangle.size; i += 3) {
            ctx.beginPath();
            ctx.moveTo(-triangle.size, i);
            ctx.lineTo(triangle.size, i);
            ctx.strokeStyle = 'rgba(255,255,255,0.07)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.update());
        connectParticles();
        drawTriangle();
        requestAnimationFrame(animate);
    }

    init();
    animate();
};
