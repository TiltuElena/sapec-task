import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showToast(
    message: string,
    description: string,
  ) {
    toast(message, {
      description
    });
  }

  showSimpleToast(message: string) {
    toast(message);
  }
}
