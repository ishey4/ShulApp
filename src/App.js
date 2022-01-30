import moment from "moment";

import "./App.css";
import { AppContextComponent } from "./contexts/appContext/appContext";

import { useProcessActions } from "./fireStore/hooks/processAction";
import { Group } from "./Group/Group";
import { getUpcomingDavenings } from './utils/getUpcomingDavening'
import { ConfigArea } from "./configArea/ConfigArea";
import { useCheckVersion } from './fireStore/hooks/checkVersion'

const App = () => {
    const date = moment(new Date()).format("MM/DD/YYYY");
    const davenings = getUpcomingDavenings();

    useProcessActions(date);
    useCheckVersion()

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
