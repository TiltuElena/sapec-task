import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { Inventory } from '../../../shared/interfaces';

@Component({
  selector: 'app-inventory-dialog',
  imports: [
    HlmButtonDirective,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inventory-dialog.component.html',
  standalone: true,
})
export class InventoryDialogComponent {
  inventoryForm: FormGroup;
  isEditMode = false;
  // categories = ['phones', 'tablets', 'laptops', 'PCs'];
  private readonly context = injectBrnDialogContext<{ entry?: Inventory }>();

  constructor(
    private fb: FormBuilder,
    private readonly dialogRef: BrnDialogRef<Inventory>,
  ) {
    this.inventoryForm = this.fb.group({
      productName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      pricePerUnit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      stockCount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const entry = this.context.entry;

    if (entry) {
      this.isEditMode = true;
      this.inventoryForm.patchValue(entry);
    }
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      const formValues = this.inventoryForm.getRawValue();
      const result = {
        ...this.context.entry,
        ...formValues,
      };
      this.dialogRef.close(result);
    } else {
      this.inventoryForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
