import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showErrorToast(message: string, description: string) {
    toast.error(message, {
      description,
    });
  }

  showSuccessToast(message: string, description: string) {
    toast.success(message, {
      description,
    });
  }
}
