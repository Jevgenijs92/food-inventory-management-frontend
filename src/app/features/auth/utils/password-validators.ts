import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordMismatch = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    confirmPassword?.setErrors({ passwordMismatch: true });
  } else {
    confirmPassword?.setErrors(null);
  }
  return null;
};

export const hasLowercase = (
  control: AbstractControl
): ValidationErrors | null => {
  const LOWERCASE_REGEX = /[a-z]/;
  if (!control.value.match(LOWERCASE_REGEX)) {
    return { hasLowercase: true };
  }
  return null;
};

export const hasUppercase = (
  control: AbstractControl
): ValidationErrors | null => {
  const UPPERCASE_REGEX = /[A-Z]/;
  if (!control.value.match(UPPERCASE_REGEX)) {
    return { hasUppercase: true };
  }
  return null;
};

export const hasNumber = (
  control: AbstractControl
): ValidationErrors | null => {
  const NUMBER_REGEX = /\d/;
  if (!control.value.match(NUMBER_REGEX)) {
    return { hasNumber: true };
  }
  return null;
};

export const hasSpecialCharacter = (
  control: AbstractControl
): ValidationErrors | null => {
  const SPECIAL_CHARACTER_REGEX = /[@$!%*?&]/;
  if (!control.value.match(SPECIAL_CHARACTER_REGEX)) {
    return { hasSpecialCharacter: true };
  }
  return null;
};
