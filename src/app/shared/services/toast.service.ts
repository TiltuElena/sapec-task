import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // showToast(message: string, description: string) {
  //   toast(message, {
  //     description,
  //   });
  // }

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
