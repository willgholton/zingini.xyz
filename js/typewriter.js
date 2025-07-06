class TypewriterManager {
    constructor() {
        this.activeTypewriters = new Map();
    }

    startTypewriter(elementId, text, speed = 50) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with id '${elementId}' not found`);
            return;
        }

        this.stopTypewriter(elementId);

        element.textContent = '';
        element.classList.add("visible");

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                const codePoint = text.codePointAt(i);
                element.textContent += String.fromCodePoint(codePoint);
                i += codePoint > 0xFFFF ? 2 : 1;
                const timeoutId = setTimeout(typeWriter, speed);
                this.activeTypewriters.set(elementId, timeoutId);
            } else {
                this.activeTypewriters.delete(elementId);
            }
        };

        typeWriter();
    }

    stopTypewriter(elementId) {
        const timeoutId = this.activeTypewriters.get(elementId);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.activeTypewriters.delete(elementId);
        }
    }

    stopAllTypewriters() {
        this.activeTypewriters.forEach((timeoutId, elementId) => {
            clearTimeout(timeoutId);
        });
        this.activeTypewriters.clear();
    }

    isTypewriterActive(elementId) {
        return this.activeTypewriters.has(elementId);
    }
}

const typewriterManager = new TypewriterManager(); 