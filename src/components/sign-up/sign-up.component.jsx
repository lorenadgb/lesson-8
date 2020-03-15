import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { value, name } = event.target;

    const { displayName, email, password, confirmPassword } = this.state

    if(password != confirmPassword){
      alert('password do not match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }
      );
    } catch (e) {
      console.log(e);
    }
  };

  handleChange = async event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state

    return (
      <div className='sign-up'>
        <h2 className={'title'}>I do not have a account</h2>
        <span>Sign up with your email and password</span>

        <form className={'sign-up-form'} onSubmit={this.handleSubmit}>
          <FormInput
              name='displayName'
              type='text'
              handleChange={this.handleChange}
              value={displayName}
              label='Display Name'
              required
          />
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={email}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              handleChange={this.handleChange}
              label='Confirm Password'
              required
          />
          <div className={'buttons'}>
            <CustomButton type='submit'> Sign up </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
