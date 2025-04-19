class CookieManager {
    constructor() {
        this.cookieConsent = null;
        this.cookieBanner = null;
        this.init();
    }

    init() {
        this.cookieConsent = this.getCookie('cookieConsent');
        this.cookieBanner = document.getElementById('cookieConsent');
        
        if (!this.cookieConsent && this.cookieBanner) {
            this.cookieBanner.style.display = 'block';
        }
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    acceptCookies() {
        this.setCookie('cookieConsent', 'accepted', 365);
        if (this.cookieBanner) {
            this.cookieBanner.style.display = 'none';
        }
    }

    rejectCookies() {
        this.setCookie('cookieConsent', 'rejected', 365);
        if (this.cookieBanner) {
            this.cookieBanner.style.display = 'none';
        }
    }
}

// Initialize cookie manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
}); 