import React from 'react';
import Head from 'next/head';

function Page(props: any) {
  return (
    <>
      <Head>
        <title>TuneFeed</title>
        <meta name="description" content="Search for an artist and retrieve information about his/her albums." />
        <meta property="og:title" content="TuneFeed | Find your favourite artist music" key="title" />
        <meta property="og:description" content="Search for an artist and retrieve information about his/her albums." />
        {/* <meta property="og:image" content="" /> */}
        <meta name="keywords" content="Spotify, TuneFeed, Music" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" type='text/css' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" type='text/css' />
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <>
        {props.children}
      </>
    </>
  );
};

export default Page;
