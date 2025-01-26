import Sidebar from "./components/Sidebar"
import { BrowserRouter as Router } from "react-router-dom"
const App = () => {
  return <Router>
    <div>
      <Sidebar/>
    </div>
  </Router>
}

export default App
