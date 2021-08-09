import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Home/>    
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;