/**
 * Маленький грязный хак, который безопасно реализует переданнную функцию fn.<br>
 * Служит что бы получить свойство с методом длинной цепочки, где некоторая часть цепочки может быть неопределенной.
 *
 * @example
 * if (safe(() => this.foo[0].bar.isUseful)) { ...
 * // returns 'this.foo[0].bar.isUseful' или undefined, избегая создания исключений.
 *
 * @param fn - некоторые простые функции, предпочтительно лямбда.
 * @returns {T | undefined}
 */
export function safe<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}
