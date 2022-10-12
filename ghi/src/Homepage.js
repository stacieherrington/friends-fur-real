import React from 'react';
import PetCard from './components/PetCard';
import StoryCard from './components/StoryCard';

function HomePage() {
  return (
    <div className="px-4 my-3 text-center">
      <div className="form-floating mb-3 input-group">
        <input placeholder="Search" type="text" name="search" id="search"
          className="form-control" />
        <span className="input-group-text" id="basic-addon2"><button className="btn btn-outline-secondary">Search</button></span>
      </div>
      <div>
        <h1 className="display-5 fw-bold">FriendsFurReal</h1>
        <div style={{ backgroundImage: "url(/images/pups.jpg)" }}>
          <img
            src="images/pups.jpg"
            width="60%"
            className="d-inline-block align-top"
            alt="Pet logo"
            shape="rounded"
          />
        </div>
      </div>
      <div className='py-4'>
        <h1 className='display-5 fw-bold'>Pet Highlights</h1>
        <PetCard />
      </div>
      <div className='py-1 "border border-secondary"'>
        <h1 className='display-5 fw-bold'>Success Stories</h1>
        <StoryCard />
      </div>
    </div >
  )
}

export default HomePage;