import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Login} exact/>
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;