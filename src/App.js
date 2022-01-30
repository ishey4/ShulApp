import "./App.css";
import { AppContextComponent } from "./contexts/appContext/appContext";

import { Group } from "./Group/Group";
import { getUpcomingDavenings } from './utils/getUpcomingDavening'
import { ConfigArea } from "./configArea/ConfigArea";

const App = () => {
    const davenings = getUpcomingDavenings();


    return (
        <AppContextComponent>
            <div className="App">
                <h1>Minyan App</h1>
                {davenings.map((davening) => <Group {...{ ...davening }} />)}
                <ConfigArea />
            </div>
        </AppContextComponent>
    );
};

export default App;
