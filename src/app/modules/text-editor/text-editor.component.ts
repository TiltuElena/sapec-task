import { Component } from '@angular/core';
import { SharedModule } from '@/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CustomOption, QuillEditorComponent } from 'ngx-quill';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text-editor',
  imports: [SharedModule, FormsModule, QuillEditorComponent],
  templateUrl: './text-editor.component.html',
  standalone: true,
  styleUrl: './text-editor.component.css',
})
export class TextEditorComponent {
  model: string = '';

  trustedHtml: any = '';

  constructor(private sanitizer: DomSanitizer) {}

  onModelChange(value: string) {
    this.model = value;
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  customOptions: CustomOption[] = [
    {
      import: 'attributors/style/size',
      whitelist: ['14px', '18px', '22px'],
    },
    // You can import additional attributors for alignments, colors etc. here
  ];

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

      [{ size: ['14px', '18px', '22px'] }], // custom dropdown

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image'], // link and image, video
    ],
  };

  ngAfterViewInit(): void {
    const observer = new MutationObserver(() => {
      const sizePicker = document.querySelector('.ql-size .ql-picker-label') as HTMLElement;
      const selected = document.querySelector('.ql-size .ql-picker-item.ql-selected') as HTMLElement;

      if (sizePicker && selected) {
        sizePicker.innerText = selected.innerText || selected.getAttribute('data-value') || 'Normal';
      }
    });

    const toolbar = document.querySelector('.ql-toolbar');
    if (toolbar) {
      observer.observe(toolbar, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }
}
