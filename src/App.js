import "./App.css";

import moment from "moment";

import { useProcessActions } from "./fireStore/hooks/processAction";
import { Group } from "./Group/Group";
import { getId } from "./utils/getId";
import { getUpcomingDavenings } from './utils/getUpcomingDavening'
import { ConfigArea } from "./configArea/ConfigArea";



const id = getId();

const App = () => {
    const date = moment(new Date()).format("MM/DD/YYYY");
    const davenings = getUpcomingDavenings();

    useProcessActions(id, date);

    return (
        <div className="App">
            <h1>Minyan App</h1>
            {davenings.map((davening) => <Group {...{ ...davening, id }} />)}
            <ConfigArea UID={id} />
        </div>
    );
};

export default App;
