import { ChangeDetectorRef } from '@angular/core';

/**
 * Обертка для безопасного вызова detectChanges.
 */
export function safeDetectChanges(changeDetectorRef: ChangeDetectorRef): void {
  setTimeout(() => {
    if (!changeDetectorRef['destroyed']) {
      changeDetectorRef.detectChanges();
    }
  });
}
