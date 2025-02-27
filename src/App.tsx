
import { Button } from "./components/Button"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"
import Card from './components/Card';

function App() {
  
  return (
    <>
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>
        <Button variant="secondary" text="Share" startIcon={<ShareIcon/>}></Button>
        <Card/>
    </>
  )
}

export default App
