import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import HomePage from './pages/HomePage'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;
