import { Directive } from '@angular/core';
import { HlmButtonDirective } from '@/shared/components/libs/ui/ui-button-helm/src';

@Directive({
	selector: 'button[hlmAlertDialogAction]',
	standalone: true,
	hostDirectives: [HlmButtonDirective],
})
export class HlmAlertDialogActionButtonDirective {}
