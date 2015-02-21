/**
 * Страница шаблон.
 * @constructor
 */
PageOnlineScore = function PageOnlineScore() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент-текст отображающий количество онлайн игроков.
     * @type {ElementGraphicText}
     */
    this.elementOnlineIndicator = null;

    /**
     * Элемент-текст отображает количество очков игрока.
     * @type {ElementGraphicText}
     */
    this.elementScoreIndicator = null;

    this.init = function () {
        var element;
        /* Тут создаются элементы страницы. */
        /* online indicator */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 425,
            width: 140,
            text: 'онлайн: -'
        });
        self.elements.push(element);
        self.elementOnlineIndicator = element;
        /* score indicator */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 455,
            width: 140,
            text: 'очки: -'
        });
        self.elements.push(element);
        self.elementScoreIndicator = element;
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрачем все элементы на странице.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var onlineCount, score;
        /* Возможны какие то обновления, до отрисовки. */
        onlineCount = LogicUser.getOnlineCount();
        score = LogicUser.getCurrentUser().score;
        self.elementOnlineIndicator.setText('онлайн: ' + (typeof onlineCount == 'number' ? onlineCount : '-'));
        self.elementScoreIndicator.setText('очки: ' + (typeof score == 'number' ? score : '-'));
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};