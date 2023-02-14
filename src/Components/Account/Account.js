import React from 'react'
import './Account.css';

const Account = ({ account, img, link }) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };
  return (
    <div className='main-account-div' >
      <div>
        <div className='logo-div' style={{backgroundImage: `url(${img})`}} onClick={handleClick} />
        <div className='account-name-div'>{account}</div>
      </div>
    </div>
  )
}

export default Account
