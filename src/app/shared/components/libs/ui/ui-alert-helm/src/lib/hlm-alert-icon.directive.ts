import { Directive } from '@angular/core';
import { provideHlmIconConfig } from '@/shared/components/libs/ui/ui-icon-helm/src';

@Directive({
	selector: '[hlmAlertIcon]',
	standalone: true,
	providers: [provideHlmIconConfig({ size: 'sm' })],
})
export class HlmAlertIconDirective {}
