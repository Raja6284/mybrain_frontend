
import { Button } from "./components/Button"
import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"
import Card from './components/Card';

function App() {

  return (
    <>
      <div className="p-4">
        <div className="flex justify-end gap-4  ">
          <Button variant="secondary" text="Share" startIcon={<ShareIcon />}></Button>
          <Button variant="primary" text="Add Content" startIcon={<PlusIcon />}></Button>
        </div>

        <div className="flex gap-2">
          <Card link="https://x.com/wyckoffweb/status/1895439430141329663" type="twitter" title="Boost your pi network mining" />

          <Card link="https://www.youtube.com/watch?v=Ym4ti89tItw" type="youtube" title="Yung DSA song" />

          <Card link="https://www.youtube.com/watch?v=SfsaNZJ08Xs" type="youtube" title="Trumb Vs Zelensky in White House" />
        </div>
      </div>


    </>
  )
}

export default App
