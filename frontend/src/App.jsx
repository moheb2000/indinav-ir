import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App;
