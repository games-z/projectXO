/**
 * Файл конфигурации.
 * @type {Object}
 */
Config = {
    Logs: {
        triggerLevel: 1 // detail
    },
    DB: {
        host: 'localhost',
        username: 'root',
        password: 'root',
        database: 'xo',
        charset: 'UTF8'
    },
    SocNet: {
        secretKey: 'X0x2PuCZQbC5wwX0lB5R',
        appId: 4467180
    },
    Chat: {
        /**v
         * Размер кэша, после заполнения, будет сливаться в БД.
         */
        cacheSize: 1000,
        /**
         * Кол-во сообщений, считающихся последними.
         */
        lastMessagesCount: 5,
        /**
         * Максимальная длина сообщения в чате.
         */
        messageLengthLimit: 128
    },
    Rating: {
        TopLimitSize: 10
    },
    ApiRouterMetric: {
        reportTimeout: 1000 * 60 * 60 // one hour
    },
    Profiler: {
        reportTimeout: 1000 * 60 * 60, // one hour
        saveToDBTimeout: 1000 * 60 * 10 // ten minutes
    },
    UrlCache: {
        lifeTime: 1000 * 60 * 30
    },
    WebSocketServer: {
        reloadClientCodeEveryRequest: false,
        compressJSClientCode: false,
        port: 3000,
        portSSL: 443,
        clientCodePath: '../client/',
        imagesPath: '../images/'
    },
    Statistic: {
        checkInterval: 1000,
        cacheLimit: 1000
    }
};