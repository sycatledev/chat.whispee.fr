// Module pattern
export const cookieManager = (function () {
    // Private functions
    function setExpiration(days) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
        return expirationDate.toUTCString();
    }

    // Public functions
    function setCookie(name, value, days) {
        const expiration = setExpiration(days);
        document.cookie = `${name}=${value}; expires=${expiration}; SameSite=None; Secure; path=/`;
    }

    function getCookie(name) {
        const search = `${name}=`;
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(search) == 0) {
                return cookie.substring(search.length, cookie.length);
            }
        }
        return '';
    }

    // Interface
    return {
        setCookie: setCookie,
        getCookie: getCookie
    };
})();

// Facade pattern
export const cookieFacade = (function () {
    // Private constants
    const DEFAULT_EXPIRATION_DAYS = 1;

    // Public functions
    function set(name, value, days = DEFAULT_EXPIRATION_DAYS) {
        cookieManager.setCookie(name, value, days);
    }

    function get(name) {
        return cookieManager.getCookie(name);
    }

    // Interface
    return {
        set: set,
        get: get
    };

})();