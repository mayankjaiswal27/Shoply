import Routes from "./routes";

import './App.css'
import { AuthProvider } from "./auth/AuthProvider";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Footer from "./Footer";

function App() {
  return (
    <AuthProvider>

      <Routes/>
      <Footer/>
    </AuthProvider>
    
);
}

export default App;
