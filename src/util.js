import ora from "ora";
/**
 * @description loading 执行函数
 * @param {Function} fn 所需执行函数
 * @param {Object} message 线程执行时的提示信息
 * @param {any[]} ...args fn所传递的参数
 * @return Promise
 */

const threadLoading = async (fn,{
    load = '',
    success = '',
    fail = 'request fail, refetching'
},...args) => {
    const loading = ora({text:load});
    loading.start();
    try {
        const res = await fn(...args);
        loading.succeed(success);
        return res
    } catch (error) {
        loading.fail(fail);
        console.log(error);

        sleep(1000);

        await threadLoading(fn,{load,success,fail},...args);
    }
}

/**
 * 睡觉函数
 * @param {Number} second fs 睡眠时间
 * @return Promise
 */
 function sleep(second) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, second);
    });
}

/**
 * 单词首字母大写
 * @param {String} key 需要转换的单词
 * @return {String}
 */

const capitalize = (key) => key.charAt(0).toUpperCase() + key.slice(1)



export {
    threadLoading,
    sleep,
    capitalize
}