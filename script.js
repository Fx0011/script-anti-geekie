(function () {
    console.log(
        "%cAnti-Geekie Injetado...",
        "color: blue; font-size: 30px;"
    );

    const eventsToBlock = ["beforeunload", "visibilitychange", "blur", "focus"];

    eventsToBlock.forEach(eventType => {
        document.addEventListener(
            eventType,
            function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
            },
            true
        );
    });

    try {
        Object.defineProperty(document, "hidden", {
            get: function () {
                return false;
            },
            configurable: true,
        });

        Object.defineProperty(document, "visibilityState", {
            get: function () {
                return "visible";
            },
            configurable: true,
        });
    } catch (error) {
        console.log(
            "%cNão foi possível remover a visibilidade da página. Erro: " +
                error,
            "color:red; font-size:20px;"
        );
    }

    try {
        window.onblur = null;
        window.onfocus = null;
        document.onblur = null;
        document.onfocus = null;
    } catch (error) {
        console.log(
            "%cNão foi possível remover a visibilidade da página. Erro: " +
                error,
            "color:red; font-size:20px;"
        );
    }

    const originalAddEventListeners = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (type, listener) {
        if (eventsToBlock.includes(type)) {
            console.log(
                "%cO evento " + type + " foi bloqueado.",
                "color:green; font-size:15px;"
            );
            return;
        }
        originalAddEventListeners.call(this, type, listener);
    };

    const blockedURLs = [
        "*://api-iam.intercom.io/messenger/web/metrics*",
        "*://one.geekie.com.br/fonts/personalizationStudyPlanIcon.svg*",
        "*://api-iam.intercom.io/messenger/web/metrics*",
        "*://one.geekie.com.br/*",
        "*://shangrird.prod.gkn.io/auto-save-data*",
        "*://sg-content.geekie.com.br/exercises/*",
        "*://sg-content.geekie.com.br/exercise_solutions/*",
        "*://sg-content.geekie.com.br/collections/*/learning-objects/*",
        "*://api-iam.intercom.io/messenger/web/events*",
        "*://platform.api.geekielab.com.br/collection/*/chapters/*/exercise-solutions*",
        "*://eventsrecorder.gkn.io/track/*",
        "*://one.geekie.com.br/fonts/strikethroughBlue.svg*",
        "*://platform.api.geekielab.com.br/homeworks/*/helped-mes*",
        "*://platform.api.geekielab.com.br/app-version*",
        "*://sentry.io/api/1290795/envelope/*",
        "*://platform.api.geekielab.com.br/activities/*/finish*",
        "*://platform.api.geekielab.com.br/syllabi?year=all*",
        "https://one.geekie.com.br/images/assetIllustraFeedbackSuccess.png",
    ];

    const autoSaveURL = "*://shangrird.prod.gkn.io/auto-save-data*";

    const originalFetch = window.fetch;
    window.fetch = function (url, options) {
        const shouldBlock = blockedURLs.some(blockedURL => {
            const regex = new RegExp(blockedURL.replace(/\*/g, ".*"));
            return regex.test(url) && !url.includes(autoSaveURL);
        });

        const shouldBlockAutoSave = new RegExp(
            autoSaveURL.replace(/\*/g, ".*")
        ).test(url);

        if (shouldBlock) {
            console.log(
                `%cA URL ${url} foi bloqueada.`,
                "color:green; font-size:15px;"
            );
            return Promise.resolve(new Response("{}"));
        }
        if (shouldBlockAutoSave) {
            console.log(
                `%cA URL de auto-save ${url} foi bloqueada.`,
                "color:green; font-size:15px;"
            );
            return Promise.resolve(new Response("{}"));
        }
        return originalFetch.apply(this, arguments);
    };

    const originalXHR = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (method, url) {
        const shouldBlock = blockedURLs.some(blockedURL => {
            const regex = new RegExp(blockedURL.replace(/\*/g, ".*"));
            return regex.test(url) && !url.includes(autoSaveURL);
        });

        const shouldBlockAutoSave = new RegExp(
            autoSaveURL.replace(/\*/g, ".*")
        ).test(url);

        if (shouldBlock) {
            console.log(
                `%cBloqueado XHR para: ${url}`,
                "color:green; font-size:15px;"
            );
            arguments[1] = "about:blank";
        }
        if (shouldBlockAutoSave) {
            console.log(
                `%cBloqueado XHR para: ${url}`,
                "color:green; font-size:15px;"
            );
            arguments[1] = "about:blank";
        }
        return originalXHR.apply(this, arguments);
    };

    const disableSelectors = [
        "body",
        "html",
        "*",
        "[oncontextmenu]",
        "[onselectstart]",
        "[ondragstart]",
    ];

    disableSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.oncontextmenu = null;
            el.onselectstart = null;
            el.ondragstart = null;
            el.style.userSelect = "text";
            el.style.webkitUserSelect = "text";
            el.style.MozUserSelect = "text";
        });
    });

    window.onbeforeunload = null;

    console.log(
        "%cScript Anti-Geekie Concluído",
        "color:green; font-size:20px;"
    );
    console.log(
        "%cBloqueados eventos comuns de monitoramento e tracking",
        "color:green; font-size:20px;"
    );
    console.log(
        "%cBypass feito na detecção de visibilidade e foco",
        "color:green; font-size:20px;"
    );
    console.log(
        "%cDesativadas requisições de rede de rastreamento",
        "color:green; font-size:20px;"
    );
    console.log(
        "%c✍Restaurado clique direito e seleção de texto",
        "color:green; font-size:20px;"
    );

    return function reapplyProtection() {
        window.onbeforeunload = null;
        window.onblur = null;
        window.onfocus = null;
        console.log("Proteção reaplicada");
    };
})();
