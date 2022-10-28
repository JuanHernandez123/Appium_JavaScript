const {join} = require('path');

exports.config = {
    port: 4723,
    path: '/wd/hub',
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [
        {
            platformName: 'Android',
            maxInstances: 1,
            'appium:deviceName': 'AndroidDevice',
            'appium:platformVersion': '13',
            'appium:orientation': 'PORTRAIT',
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), './apps/Elevate-1.0.apk'),
            'appium:newCommandTimeout': 240,
        }
    ],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 45000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 3 * 60 * 1000
    }
}
