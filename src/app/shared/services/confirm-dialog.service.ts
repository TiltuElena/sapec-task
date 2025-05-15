import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private resolveFn!: (value: boolean) => void;

  readonly state = signal<'open' | 'closed'>('closed');
  readonly title = signal<string>('Are you sure?');
  readonly description = signal<string>('This action cannot be undone.');

  confirm(title = 'Are you sure?', description = 'This action cannot be undone.'): Promise<boolean> {
    this.title.set(title);
    this.description.set(description);
    this.state.set('open');

    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  resolve(result: boolean) {
    this.resolveFn?.(result);
    this.close();
  }

  close() {
    this.state.set('closed');
  }
}
