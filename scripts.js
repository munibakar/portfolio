// Matrix Background Effect
document.addEventListener('DOMContentLoaded', function() {
    // Matrix Canvas Effect
    const canvas = document.getElementById('matrix-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match window size
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        
        // Characters to be used in the matrix rain
        const characters = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        const columns = canvas.width / 15; // Adjust character width here
        
        // Array to store the y position of each column
        const drops = [];
        
        // Initialize all drops to start at random y positions
        for(let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        // Function to draw the matrix rain
        function drawMatrix() {
            // Set semi-transparent black background for trailing effect
            ctx.fillStyle = 'rgba(1, 4, 9, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Set the color and font of the characters
            ctx.fillStyle = '#00ff41'; // Matrix green
            ctx.font = '15px Roboto Mono';
            
            // Loop through each drop
            for(let i = 0; i < drops.length; i++) {
                // Choose a random character
                const char = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw the character
                ctx.fillText(char, i * 15, drops[i] * 1);
                
                // Reset drop when it reaches bottom or randomly
                if(drops[i] * 15 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move the drop down
                drops[i]++;
            }
        }
        
        // Update the matrix every 35ms
        setInterval(drawMatrix, 35);
        
        // Resize the canvas when the window is resized
        window.addEventListener('resize', function() {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            
            // Reset drops array based on new width
            const newColumns = canvas.width / 15;
            if(newColumns > drops.length) {
                for(let i = drops.length; i < newColumns; i++) {
                    drops[i] = Math.random() * -100;
                }
            }
        });
    }
    
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            
            // Add animation to hamburger spans
            const spans = hamburger.querySelectorAll('span');
            if(isActive) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Make header sticky on scroll
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Update current year in footer
    const yearElement = document.getElementById('year');
    if(yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Typing effect for hero section
    const typingTextElement = document.querySelector('.typing-text');
    if(typingTextElement) {
        const phrases = [
            "Software Engineer",
            "Cybersecurity Enthusiast",
            "Web Developer",
            "Problem Solver"
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;
        const typingSpeed = 100; // ms between characters
        const deleteSpeed = 50; // ms between deletion
        const waitBetweenPhrases = 1500; // Wait time at end of phrase
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if(isWaiting) {
                setTimeout(function() {
                    isWaiting = false;
                    isDeleting = true;
                    typeEffect();
                }, waitBetweenPhrases);
                return;
            }
            
            // Determine the speed based on typing or deleting
            const speed = isDeleting ? deleteSpeed : typingSpeed;
            
            if(!isDeleting && charIndex < currentPhrase.length) {
                // Add a character
                typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                
                // If completed typing
                if(charIndex === currentPhrase.length) {
                    isWaiting = true;
                }
            } else if(isDeleting && charIndex > 0) {
                // Remove a character
                typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                
                // If completed deleting
                if(charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }
            
            setTimeout(typeEffect, speed);
        }
        
        // Start the typing effect
        typeEffect();
    }
    
    // Animate numbers in stats section
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        if(statNumbers.length > 0) {
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / 60; // 60 frames for 1 second at 60fps
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    number.textContent = Math.floor(current);
                    
                    if(current >= target) {
                        clearInterval(timer);
                        number.textContent = target;
                    }
                }, duration / 60);
            });
        }
    }
    
    // Animate on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Stats section observer
    const statsSection = document.querySelector('.stats-section');
    if(statsSection) {
        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statsObserver.observe(statsSection);
    }
    
    // Skills section - animate progress bars when in view
    const progressBars = document.querySelectorAll('.progress');
    if(progressBars.length > 0) {
        const progressObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // Get the width value from data attribute
                    const width = entry.target.getAttribute('data-width');
                    // Animate the progress bar
                    entry.target.style.width = width;
                    // Once animated, unobserve
                    progressObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Project Filtering
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    if(projectTabs.length > 0 && projectCards.length > 0) {
        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                projectTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                const filter = tab.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if(filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Terminal simulation for about page
    const terminalOutput = document.getElementById('terminalOutput');
    if(terminalOutput) {
        const commands = [
            { command: "whoami", output: "Münib Akar - Software Engineering Student" },
            { command: "cat about.txt", output: "I'm a third-year Software Engineering student at Muğla Sıtkı Koçman University with a passion for cybersecurity and web development." },
            { command: "ls -la hobbies/", output: "total 4\ndrwxr-xr-x 2 munib munib 4096 Jul 15 10:24 .\ndrwxr-xr-x 7 munib munib 4096 Jul 15 10:24 ..\n-rw-r--r-- 1 munib munib  512 Jul 15 10:25 soccer.txt\n-rw-r--r-- 1 munib munib  384 Jul 15 10:25 table_tennis.txt\n-rw-r--r-- 1 munib munib  256 Jul 15 10:25 climbing.txt\n-rw-r--r-- 1 munib munib  640 Jul 15 10:25 painting.txt" },
            { command: "cd projects && ls", output: "pre-pair/\nspeedscroll/\nage-gender-detection/\naudivo/\ncrypto-analysis/\nmatematik-kulubu/" }
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        let currentOutput = '';
        let isTypingCommand = true;
        
        function simulateTerminal() {
            const currentCommand = commands[commandIndex];
            
            if(isTypingCommand) {
                // Typing the command
                if(charIndex < currentCommand.command.length) {
                    const commandElement = document.querySelector('.terminal-about-command');
                    if(commandElement) {
                        commandElement.textContent = currentCommand.command.substring(0, charIndex + 1);
                        charIndex++;
                        setTimeout(simulateTerminal, 100);
                    }
                } else {
                    // Finished typing command, show output
                    isTypingCommand = false;
                    charIndex = 0;
                    currentOutput = '';
                    setTimeout(simulateTerminal, 500);
                }
            } else {
                // Showing the output
                if(charIndex < currentCommand.output.length) {
                    currentOutput += currentCommand.output.charAt(charIndex);
                    const outputElement = document.querySelector('.terminal-about-output');
                    if(outputElement) {
                        outputElement.innerHTML = currentOutput.replace(/\n/g, '<br>');
                        charIndex++;
                        setTimeout(simulateTerminal, 10);
                    }
                } else {
                    // Move to next command
                    commandIndex = (commandIndex + 1) % commands.length;
                    charIndex = 0;
                    isTypingCommand = true;
                    
                    // Create a new command line
                    setTimeout(function() {
                        const newCommandLine = document.createElement('div');
                        newCommandLine.className = 'terminal-about-line';
                        newCommandLine.innerHTML = `<span class="terminal-about-prompt">munib@kali:~$</span> <span class="terminal-about-command"></span>`;
                        
                        const newOutputLine = document.createElement('div');
                        newOutputLine.className = 'terminal-about-line';
                        newOutputLine.innerHTML = `<span class="terminal-about-output"></span>`;
                        
                        terminalOutput.appendChild(newCommandLine);
                        terminalOutput.appendChild(newOutputLine);
                        
                        // Scroll to bottom
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                        
                        simulateTerminal();
                    }, 1000);
                }
            }
        }
        
        // Start the terminal simulation after a delay
        setTimeout(simulateTerminal, 2000);
    }
}); 