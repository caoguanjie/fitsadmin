/*
 * @Author: caoguanjie 
 * @Date: 2023-10-23 15:03:59 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2023-10-23 17:07:47
 */

/**
 * 一个判断设备当前处于什么平台的工具
 */
const platform = new Map<string, string[]>()

export type Platforms = keyof typeof PLATFORMS_MAP;

/**
 * 判断某个当前设备属于某个平台
 * @type {}
 * @param winOrPlatform 
 * @param platform 
 * @returns 
 */
export function isPlatform(winOrPlatform: Window | Platforms, platform?: Platforms) {
    if (typeof winOrPlatform === 'string') {
        platform = winOrPlatform;
        winOrPlatform = window;
    }
    return getPlatforms(winOrPlatform as any).includes(platform as string);
}

export function setupPlatforms(win = window) {
    if (typeof win === 'undefined') {
        return [];
    }
    return detectPlatforms(win)
}


/**
 * 获取您的应用程序当前在哪些平台上运行
 * @param {Window} win 
 * @returns 
 */
export function getPlatforms(win = window) {
    return setupPlatforms(win);
}


/**
 * 检测当前项目处于哪些平台
 * @param {Window} win 
 * @returns 
 */
export function detectPlatforms(win = window) {
    const customPlatformMethods: any = PLATFORMS_MAP
    return Object.keys(PLATFORMS_MAP).filter((p) => {
        const customMethod = customPlatformMethods[p];
        return customMethod(win);
    });
}



/**
 * 通过正则表达式判断是否通过
 * @param win window对象
 * @param expr 正则表达式
 * @returns 
 */
export function testUserAgent(win = window, expr: RegExp) {
    return expr.test(win.navigator.userAgent)
}


/**
 * 判断是否移动设备
 * 这个方法是通过检查用户是否在触摸设备上
 * @param win 
 * @returns {boolean}
 */
export function isMobile(win = window): boolean {
    const _a = win.matchMedia;
    return _a === null || _a === void 0 ? false : _a.call(win, '(any-pointer:coarse)').matches;
}


/**
 * 判断是否在移动设备上运行的网络浏览器
 * @param win 
 * @returns {boolean}
 */
export function isMobileWeb(win = window): boolean {
    return isMobile(win) && !isHybrid(win)
}


/**
 * 判断是否是桌面端设备，不管什么系统，如果没有触摸设备，就是桌面端设备
 * @param win 
 * @returns {boolean}
 */
export function isDesktop(win = window): boolean {
    return !isMobile(win)
}


/**
 * 判断是否ipad
 * @param win 
 * @returns {boolean}
 */
export function isIpad(win = window): boolean {
    // iOS 12 及之前的旧设备
    if (testUserAgent(win, /iPad/i)) {
        return true;
    }
    // iOS 13+
    if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
        return true;
    }
    return false;
}

/**
 * 判断是否IOS系统，包括手机、平板，mp4
 * @param win 
 * @returns {boolean}
 */
export function isIOS(win = window): boolean {
    return testUserAgent(win, /iPhone|iPod/i) || isIpad(win);
}

/**
 * 判断是否苹果手机
 * @param win 
 * @returns {boolean}
 */
export function isIphone(win = window): boolean {
    return testUserAgent(win, /iPhone/i);
}

/**
 * 判断是否安卓设备，只要是Android系统的，校验都通过，包括平板，手机
 * @param win 
 * @returns {boolean}
 */
export function isAndroid(win = window): boolean {
    return testUserAgent(win, /android|sink/i);
}

/**
 * 判断是否安卓设备中的平板设备
 * @param win 
 * @returns {boolean}
 */
export function isAndroidTablet(win = window): boolean {
    return isAndroid(win) && !testUserAgent(win, /mobile/i);
}

/**
 * 判断是否是平板设备，包括ipad和Android系统的平台，或者是其他系统，尺寸在平板范围大小的设备
 * @param win 
 * @returns {boolean}
 */
export function isTablet(win = window): boolean {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return isIpad(win) || isAndroidTablet(win) || (smallest > 460 && smallest < 820 && largest > 780 && largest < 1400);
}



/**
 * 判断是否是基于cordova平台
 * @param win 
 * @returns {boolean}
 */
export function isCordova(win = window as any): boolean {
    return !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
}

/**
 * 判断是否是基于Capacitor平台
 * @param win 
 * @returns {boolean}
 */
export function isCapacitor(win = window as any): boolean {
    const capacitor = win['Capacitor'];
    return !!(capacitor === null || capacitor === void 0 ? void 0 : capacitor.isNative);
}


/**
 * 判断是否是基于electron平台
 * @param win 
 * @returns {boolean}
 */
export function isElectron(win = window): boolean {
    return testUserAgent(win, /electron/i)
}

/**
 * 判断是否是属于混合开发的设备，包括electron、cordova、capacitor开发的设备
 * @param win 
 * @returns {boolean}
 */
export function isHybrid(win = window): boolean {
    return isCordova(win) || isCapacitor(win) || isElectron(win);
}

/**
 * 判断是否是PWA平台
 * @param win 
 * @returns {boolean}
 */
export function isPWA(win = window): boolean {
    const _a = win.matchMedia;
    return !!((_a === null || _a === void 0 ? void 0 : _a.call(win, '(display-mode: standalone)').matches) || (win.navigator as any).standalone);
}

const PLATFORMS_MAP = {
    ipad: isIpad,
    iphone: isIphone,
    ios: isIOS,
    android: isAndroid,
    tablet: isTablet,
    cordova: isCordova,
    capacitor: isCapacitor,
    electron: isElectron,
    pwa: isPWA,
    mobile: isMobile,
    mobileweb: isMobileWeb,
    desktop: isDesktop,
    hybrid: isHybrid,
};