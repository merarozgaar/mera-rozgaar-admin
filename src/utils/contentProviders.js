// @flow
export function getAppName(): string {
  return 'ERC';
}

type InputType =
  | 'email'
  | 'phoneNumber'
  | 'otp'
  | 'date'
  | 'password'
  | 'confirmPassword';

export function getErrorMessage(
  type: ?string = 'required',
  inputName: ?InputType,
): string {
  const genericMessage = 'This input is invalid.';

  switch (type) {
    case 'required':
      return 'This input is required.';

    case 'error': {
      const messages = {
        email: 'This is an invalid email.',
        phoneNumber: 'This is an invalid phone number.',
        otp: 'This is an invalid OTP.',
        date: 'This is an invalid date.',
        password: 'Password must contain 8 characters.',
        // password:
        // 'Password must contain 8 characters including at least 1 uppercase, 1 lowercase, 1 digit and 1 special character.',
        confirmPassword: 'Password and Confirm Password must match.',
      };

      return inputName ? messages[inputName] : genericMessage;
    }

    default:
      return genericMessage;
  }
}

export const months: Array<string> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getAppRoutes(): {
  home: string,
  employer: string,
  employee: string,
  jobs: string,
  interviews: string,
  notifications: string,
} {
  return {
    home: '/',
    employer: '/employers',
    employee: '/employees',
    jobs: '/jobs',
    interviews: '/interviews',
    notifications: '/notifications',
  };
}
