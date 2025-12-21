// Three.js Background Setup
function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-background').appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x1E90FF,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;

        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js when DOM is loaded
document.addEventListener('DOMContentLoaded', initThreeJS);

// Algorithm tooltips
const algorithmTooltips = {
    caesar: "A substitution cipher where each letter is shifted by a fixed number of positions.",
    playfair: "A digraph substitution cipher using a 5x5 grid of letters.",
    hill: "A polygraphic substitution cipher based on linear algebra.",
    substitution: "Each letter is replaced by another letter according to a fixed rule.",
    simpleblock: "A basic block cipher that divides text into blocks and encrypts each block.",
    des: "Data Encryption Standard - a symmetric-key algorithm.",
    '3des': "Triple DES - applies DES three times for enhanced security.",
    aes: "Advanced Encryption Standard - a symmetric encryption algorithm.",
    rsa: "RSA - an asymmetric cryptographic algorithm using prime numbers."
};

// Show tooltip on algorithm change
document.getElementById('algorithm').addEventListener('change', function() {
    const tooltip = document.getElementById('tooltip');
    const selectedAlgo = this.value;
    tooltip.textContent = algorithmTooltips[selectedAlgo];
    tooltip.classList.remove('hidden');
    tooltip.classList.add('show');

    // Position tooltip near the select element
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 10) + 'px';

    // Hide tooltip after 3 seconds
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => tooltip.classList.add('hidden'), 300);
    }, 3000);
});

// Copy to clipboard functionality
document.getElementById('copy-btn').addEventListener('click', function() {
    const outputText = document.getElementById('output-text');
    outputText.select();
    document.execCommand('copy');

    // Animation
    this.textContent = 'Copied!';
    this.style.background = 'linear-gradient(135deg, #00FF94, #1E90FF)';
    setTimeout(() => {
        this.textContent = 'Copy to Clipboard';
        this.style.background = 'linear-gradient(135deg, #1E90FF, #00CED1)';
    }, 2000);
});

// Event listeners for encrypt/decrypt buttons
document.getElementById('encrypt-btn').addEventListener('click', function() {
    processText('encrypt');
});

document.getElementById('decrypt-btn').addEventListener('click', function() {
    processText('decrypt');
});

function processText(mode) {
    const algorithm = document.getElementById('algorithm').value;
    const key = document.getElementById('key').value;
    const inputText = document.getElementById('input-text').value;
    const outputText = document.getElementById('output-text');
    const loader = document.getElementById('loader');

    // Basic validation
    if (!inputText.trim()) {
        alert('Please enter some text to ' + mode + '.');
        return;
    }

    if (!key.trim() && algorithm !== 'rsa') { // RSA generates its own keys
        alert('Please enter a key.');
        return;
    }

    // Show loader for complex algorithms
    if (['rsa', 'aes', 'des', '3des'].includes(algorithm)) {
        loader.classList.remove('hidden');
    }

    // Simulate processing time for complex algorithms
    setTimeout(() => {
        try {
            let result;
            if (mode === 'encrypt') {
                result = encryptText(algorithm, inputText, key);
            } else {
                result = decryptText(algorithm, inputText, key);
            }
            outputText.value = result;
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            loader.classList.add('hidden');
        }
    }, ['rsa', 'aes', 'des', '3des'].includes(algorithm) ? 1000 : 100);
}

// Main encryption/decryption dispatcher functions
function encryptText(algorithm, text, key) {
    switch (algorithm) {
        case 'caesar':
            return caesarEncrypt(text, parseInt(key));
        case 'playfair':
            return playfairEncrypt(text, key);
        case 'hill':
            return hillEncrypt(text, key);
        case 'substitution':
            return substitutionEncrypt(text, key);
        case 'simpleblock':
            return simpleBlockEncrypt(text, key);
        case 'des':
            return desEncrypt(text, key);
        case '3des':
            return tripleDesEncrypt(text, key);
        case 'aes':
            return aesEncrypt(text, key);
        case 'rsa':
            return rsaEncrypt(text, key);
        default:
            throw new Error('Unknown algorithm');
    }
}

function decryptText(algorithm, text, key) {
    switch (algorithm) {
        case 'caesar':
            return caesarDecrypt(text, parseInt(key));
        case 'playfair':
            return playfairDecrypt(text, key);
        case 'hill':
            return hillDecrypt(text, key);
        case 'substitution':
            return substitutionDecrypt(text, key);
        case 'simpleblock':
            return simpleBlockDecrypt(text, key);
        case 'des':
            return desDecrypt(text, key);
        case '3des':
            return tripleDesDecrypt(text, key);
        case 'aes':
            return aesDecrypt(text, key);
        case 'rsa':
            return rsaDecrypt(text, key);
        default:
            throw new Error('Unknown algorithm');
    }
}