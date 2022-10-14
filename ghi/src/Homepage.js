import * as React from 'react';
import SearchBar from './components/SearchBar';
import PetCard from './components/PetCard';
import StoryCard from './components/StoryCard'
import Copyright from './components/Copyright';



function HomePage() {
  return (
    <>
      <div className="px-4 my-5 text-center">
        <SearchBar />
        <div className="py-3">
          <h1 className="display-3 fw-bold">FriendsFurReal</h1>
          <div style={{ backgroundImage: "url(/images/pups.jpg)" }}>
            <img
              src="images/pups.jpg"
              width="50%"
              className="d-inline-block align-top"
              alt="Pet logo"
              shape="rounded"
            />
          </div>
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Pet Highlights</h1>
            <div className="py-3">
              <PetCard />
            </div>
          </div>
          <div className="container-fluid py-1">
            <h1 className="display-5 fw-bold">Success Stories</h1>
            <div className="py-3">
              <StoryCard />
            </div>
          </div>
        </div>
      </div >
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </>
  )
}


export default HomePage;