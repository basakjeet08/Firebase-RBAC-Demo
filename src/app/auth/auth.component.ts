import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // This is the data for the component
  userInput = { name: '', email: '', password: '', confirmPassword: '' };

  // These contains the loading and the error state
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    console.log(this.userInput);
  }

  // This function is invoked when the user clicks on the cancel button
  onCancelClick() {
    console.log('Cancel Button Clicked');
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
