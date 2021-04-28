import React from 'react';

// import 'src/components/home/home.component.scss';

const BEM_BLOCK = 'c-home';

function Home() {
  return (
    <div className={BEM_BLOCK}>
      <h1>TuneFeed</h1>
      <p>Search for an artist and retrieve information about his/her albums</p>
    </div>
  );
}

export default Home;
