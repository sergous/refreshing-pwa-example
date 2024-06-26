import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

interface AppProps {
  appUpdatePending: boolean;
  updateAction: () => void;
}

export default function App(props: AppProps) {
  const { appUpdatePending, updateAction } = props;
  const [showUpdateBtn, setShowUpdateBtn] = useState(appUpdatePending);

  useEffect(() => {
    setShowUpdateBtn(appUpdatePending);
  }, [appUpdatePending]);

  const getFormattedVersion = () => {
    const REQUEST_ID = process.env.REACT_APP_VERCEL_GIT_PULL_REQUEST_ID
    const BRANCH_NAME = process.env.REACT_APP_VERCEL_GIT_COMMIT_REF
    const COMMIT_MESSAGE = process.env.REACT_APP_VERCEL_GIT_COMMIT_MESSAGE
    const AUTHOR_NAME = process.env.REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME
    return (REQUEST_ID ? `#${REQUEST_ID}-${BRANCH_NAME}` : `${AUTHOR_NAME}: ${COMMIT_MESSAGE}`) || process.env.REACT_APP_VERSION_ID || 'development' 
  }

  return (
    <div className="App">
      <header className="App-header">
        { showUpdateBtn ? 
            <Button label="Click to Update" action={() => updateAction()}/> : null
        }
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a PWA Version test app!
        </p>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </div>
      <footer>
        <p title={`${process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA}-${process.env.REACT_APP_VERCEL_GIT_REPO_SLUG}`}>
          Version: {getFormattedVersion()}
        </p>
      </footer>
    </div>
  );
}

function Button({ label = '', action = () => {}}) {
  const onClick = () => action();
  return (
    <button className="Update-btn" onClick={onClick}>{label}</button>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul className='App-nav'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
