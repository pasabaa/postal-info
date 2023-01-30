import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"

function App() {

  return (
    <main className="min-h-screen flex flex-col w-9/12 xl:w-6/12 mx-auto">
      <HomePage />
      <Footer />
    </main>
  )
}

export default App
