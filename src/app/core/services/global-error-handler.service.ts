import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '@/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private toastService: ToastService) {}
  handleError(error: any): void {
    console.error('Global Error Handler:', error);

    const message =
      error?.message || error?.toString() || 'An unexpected error occurred';

    this.toastService.showErrorToast('Error', message);
  }
}
