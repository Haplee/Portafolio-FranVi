const fs = require('fs');
const path = require('path');

// Mock a simple DOM to simulate the browser environment in Node.js
const FAKE_DOM = {
    _hamburger: {
        classList: {
            _classes: new Set(),
            add: function(c) { this._classes.add(c); },
            remove: function(c) { this._classes.delete(c); },
            contains: function(c) { return this._classes.has(c); },
            toggle: function(c) { if (this.contains(c)) this.remove(c); else this.add(c); },
            toString: function() { return Array.from(this._classes).join(' '); }
        },
        addEventListener: function() {} // Mock function
    },
    _navMenu: {
        classList: {
            _classes: new Set(),
            add: function(c) { this._classes.add(c); },
            remove: function(c) { this._classes.delete(c); },
            contains: function(c) { return this._classes.has(c); },
            toggle: function(c) { if (this.contains(c)) this.remove(c); else this.add(c); },
            toString: function() { return Array.from(this._classes).join(' '); }
        }
    },
    _themeToggle: { addEventListener: function() {} },
    _contactForm: { addEventListener: function() {}, querySelector: function() { return {}; } },
    _navLinks: [],
    head: { appendChild: function() {} }, // Mock for injected styles
    querySelector: function(selector) {
        if (selector === '.hamburger') return this._hamburger;
        if (selector === '.nav-menu') return this._navMenu;
        return null;
    },
    querySelectorAll: function(selector) {
        if (selector === '.nav-link') return this._navLinks;
        if (selector === 'a, button, .project-card, .hamburger') return [];
        return [];
    },
    getElementById: function(id) {
        if (id === 'theme-toggle') return this._themeToggle;
        if (id === 'contact-form') return this._contactForm;
        return null;
    },
    addEventListener: function(event, callback) {
        if (event === 'DOMContentLoaded') callback();
    },
    createElement: function() { return { type: '', innerText: '' }; } // Mock for injected styles
};

// Mock the window object
const FAKE_WINDOW = {
    _innerWidth: 500,
    _eventListeners: { resize: [], mousemove: [] },
    addEventListener: function(event, listener) {
        if (this._eventListeners[event]) {
            this._eventListeners[event].push(listener);
        }
    },
    _trigger: function(event, data = {}) {
        if (this._eventListeners[event]) {
            this._eventListeners[event].forEach(l => l(data));
        }
    },
    get innerWidth() { return this._innerWidth; },
    set innerWidth(width) {
        this._innerWidth = width;
        this._trigger('resize');
    },
    matchMedia: () => ({ matches: true }) // Mock for cursor logic
};

// Mock GSAP and other globals
const gsap = { ticker: { add: () => {}, lagSmoothing: () => {} }, to: () => {}, timeline: function() { return this; }, from: function() { return this; }, set: () => {}, registerPlugin: () => {}, utils: { toArray: () => [] }, matchMedia: function() { return { add: () => {} }; } };
const Lenis = function() { return { on: () => {}, raf: () => {} }; };
const ScrollTrigger = { update: () => {}, create: () => {} };
const SplitType = function() { return { chars: [] }; };
const localStorage = { getItem: () => 'light', setItem: () => {} };

function applyApplicationLogic(document, window) {
    const mainJsPath = path.resolve(__dirname, '../js/main.js');
    const mainJsCode = fs.readFileSync(mainJsPath, 'utf8');
    const runInScope = new Function('document', 'window', 'gsap', 'Lenis', 'ScrollTrigger', 'SplitType', 'localStorage', mainJsCode);
    runInScope(document, window, gsap, Lenis, ScrollTrigger, SplitType, localStorage);
}

function testHamburgerMenuFix() {
    console.log('Running test: Hamburger menu should reset on resize after fix');

    const document = FAKE_DOM;
    const window = FAKE_WINDOW;
    const hamburger = document.querySelector('.hamburger');

    // Mock documentElement for theme switching logic
    document.documentElement = {
        _attributes: {},
        setAttribute: function(key, value) { this._attributes[key] = value; },
        getAttribute: function(key) { return this._attributes[key] || 'light'; }
    };

    applyApplicationLogic(document, window);

    // 1. Start in mobile view and open the menu
    window.innerWidth = 500;
    hamburger.classList.add('active');
    console.log(`State 1 (Mobile @ ${window.innerWidth}px, Menu Open): hamburger classes -> "${hamburger.classList}"`);

    // 2. Resize to desktop. The listener from main.js should now fire and reset the menu.
    window.innerWidth = 1024;
    console.log(`State 2 (Desktop @ ${window.innerWidth}px): hamburger classes -> "${hamburger.classList}"`);

    // Assertion: The menu should now be closed.
    if (hamburger.classList.contains('active')) {
        console.error('Test Failed: Hamburger menu is still active after resize.');
        process.exit(1);
    } else {
        console.log('Test Passed: Hamburger menu was correctly reset.');
    }
}

testHamburgerMenuFix();
