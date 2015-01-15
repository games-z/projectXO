SAPIUserState = function () {

    /**
     * Сообщает, что пользователь занят.
     */
    this.isBusy = function () {
        apiRouter.executeRequest('SAPIUserState', 'isBusy', arguments, [{connectionId: null}]);
    };

    /**
     * Сообщает, что пользователь свободен.
     */
    this.isNoBusy = function () {
        apiRouter.executeRequest('SAPIUserState', 'isNoBusy', arguments, [{connectionId: null}]);
    };

    /**
     * Сообщает, что пользователь в игре.
     * @param gameId {Number} id игры.
     */
    this.onGame = function (gameId) {
        apiRouter.executeRequest('SAPIUserState', 'onGame', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUserState}
 */
SAPIUserState = new SAPIUserState();