import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';

export default class Admin extends Component {
  render() {
    const user: any = memoryUtils.user

    if(!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        Hello {user.username}
      </div>
    )
  }
}
