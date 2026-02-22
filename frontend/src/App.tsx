import { ReiBot } from "./components/chatbot/ReiBot"
import { Footer } from "./components/ui/Footer"

import { Portfolio } from "./pages/Portfolio"


const App = () => {
  return (
    <>
      <ReiBot />
      <Portfolio />
      <Footer />
    </>
  )
}

export default App