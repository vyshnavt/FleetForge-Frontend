import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleHttpError(error: HttpErrorResponse) {
  let userFriendlyMessage = 'An unexpected error occurred.';

  console.log('Error Status Code:', error);
  console.log('Error Status Code:', error.status, 'Error Message:', error.message);
  switch (error.status) {
    case 401:
      userFriendlyMessage = 'Session expired. Please log in again.';
      // Global Action: Redirect to login page
      break;

    case 404:
      userFriendlyMessage = 'The requested resource was not found.';
      // Global Action: Show a global toast/alert alert
      alert(`[Global Alert 404]: ${userFriendlyMessage}`);
      break;

    case 500:
      userFriendlyMessage = 'Server error. Please try again later.';
      // Global Action: Show a global toast/alert alert
      alert(`[Global Alert 500]: ${userFriendlyMessage}`);
      break;

    case 422:
      // Client validation error (e.g., "Email already exists")
      // Do NOT show a global popup. Let the component handle it.
      userFriendlyMessage = error.error?.message || 'Validation failed.';
      break;

    default:
      userFriendlyMessage = `Error ${error.status}: ${error.statusText}`;
  }

  // 2. Pass the error down to the component
  // The component can choose to read this message or ignore it
  return throwError(() => ({
    status: error.status,
    message: userFriendlyMessage,
    originalError: error
  }));
}
