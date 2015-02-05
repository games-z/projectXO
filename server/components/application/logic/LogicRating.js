LogicRating = function () {

    /**
     * Тут мы сохраним id юзеров для обработки, так мы создадим последовательную очередь обработки.
     * Это нужно, т.к. паралельная обработка может нарушить целостность данных, а так же для оптимизиации типа отложенное выполнение.
     * @type {int[]}
     */
    var updatePositionUserIds = [];

    /**
     * Блокировка обновления позиций рейтинга.
     * @type {boolean} true - означает, что в данный момент еще не завершено обновление какой то позиции.
     */
    var updatePositionBlocked = false;

    /**
     * Метод должен быть вызыван при создании пользователя.
     * Создаст для него запись в таблице рейтинга.
     * @param user {Object} инфо пользователя.
     */
    this.onUserCreated = function (user) {
        DataRating.addPosition(user.id);
    };

    /**
     * Метод должен вызываться, когда пользователь получил одно очередное очко.
     * Метод должен обеспечить правильное позицию игрока в рейтинге.
     * @param userId {Number}
     */
    this.onPositionScoreUp = function (userId) {
        updatePositionUserIds.push(userId);
        tryUpdateNextPosition();
    };

    /**
     * Попытка запуска апдейта позиции.
     * Если уже идёт обновление, мы ничего не делаем.
     * Иначе запускаем процесс обновления.
     */
    var tryUpdateNextPosition = function () {
        if (updatePositionBlocked) {
            return;
        }
        if (updatePositionUserIds.length == 0) {
            return;
        }
        updatePositionBlocked = true;
        executeUpdatePosition(function () {
            updatePositionBlocked = false;
            tryUpdateNextPosition();
        });
    };

    /**
     * Процесс обновления очередной позиции.
     * @param onFinishCallback {Function}
     */
    var executeUpdatePosition = function (onFinishCallback) {
        var userId;
        userId = updatePositionUserIds.shift();
        Logs.log("Execute update position. userId= " + userId, Logs.LEVEL_DETAIL);
        /* Get target user from database. */
        var step_1 = function () {
            DB.query("SELECT * FROM rating WHERE userId = " + userId, function (rows) {
                if (!rows[0]) {
                    Logs.log("Position does not exists with userId = " + userId, Logs.LEVEL_ERROR);
                    onFinishCallback();
                    return;
                }
                step_2(rows[0]);
            });
        };
        /* Get user with same score and lowest position. */
        var step_2 = function (target) {
            DB.query("SELECT * FROM rating WHERE score = " + target.score + " ORDER BY position ASC LIMIT 1", function (rows) {
                step_3(target, rows[0]);
            });
        };
        /* Update block users with same score and lower positions. */
        var step_3 = function (target, nearest) {
            DB.query("UPDATE rating SET position = position + 1 WHERE score = " + nearest.score + " AND position < " + target.position, function () {
                step_4(target, nearest);
            });
        };
        /* Update score for target user. */
        /* Update position for target user. */
        var step_4 = function (target, nearest) {
            DB.query("UPDATE rating SET score = " + (target.score + 1) + ", position = " + nearest.position + " WHERE userId = " + userId, function () {
                onFinishCallback();
            });
        };
        /* Begin process here. */
        step_1();
    };
};

/**
 * Статичный класс.
 * @type {LogicRating}
 */
LogicRating = new LogicRating();