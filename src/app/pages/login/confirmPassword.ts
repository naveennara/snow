import { AbstractControl } from '@angular/forms';
export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
        const newpassword = AC.get('newpassword').value; // to get value in input tag
        const confirmnewpassword = AC.get('confirmnewpassword').value; // to get value in input tag
        if (newpassword !== confirmnewpassword) {
            AC.get('confirmnewpassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
}