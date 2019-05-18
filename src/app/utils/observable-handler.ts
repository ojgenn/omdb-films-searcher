import { ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { isNullOrUndefined } from './is-null-or-undefined';
import { safeDetectChanges } from './safe-detect-changes';

/**
 * Абстрактный менеджер для observable.<br>
 * Создает {@link Subscription} на привязаный observable, в котором сохраняет значение и вызывает установленные коллбэки.
 */
export class ObservableHandler<T> {

  latestValue: T;

  private readonly _subscription;

  /**
   * Стэк коллбэков, вызываемых при полученнии новых данных из observable.
   * @private
   */
  private _callsStack: Array<Function> = [];

  /**
   * @param {Observable<T>} observable - поток данных, которым будет управлять этот ObservableHandler
   * @param {(value: T) => void} onChange - пользовательский коллбэк, добавляется всегда в начало стэка коллбэков
   * @param {ChangeDetectorRef} changeDetectorRef - если указан, то добавляется коллбэк с вызовом {@link detectChanges}
   */
  constructor(public readonly observable: Observable<T>,
              public onChange?: (value: T) => void,
              public readonly changeDetectorRef?: ChangeDetectorRef) {
    if (typeof onChange === 'function') {
      this._callsStack.push(onChange);
    }
    if (!isNullOrUndefined(changeDetectorRef)) {
      this._callsStack.push(() => safeDetectChanges(changeDetectorRef));
    }
    this._subscription = this.observable.subscribe((value: T) => {
      this.latestValue = value;
      this._callsStack.forEach((fn: Function) => fn(value));
    });
  }

  kill() {
    this._subscription.unsubscribe();
    this['killed'] = true;
  }
}
