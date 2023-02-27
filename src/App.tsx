import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonCol,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Edit from "./components/edit";
import CreateTweet from "./components/createTweet";
import TweetList from "./components/tweets";
import createUser from "./components/createUser";
import UserList from "./components/userList";
import NavBar from "./components/navbar";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" exact component={TweetList} />
          <Route path="/edit/:id" exact component={Edit}></Route>
          <Route path="/createTweet" exact component={CreateTweet} />
          <Route path="/tweets" exact component={TweetList} />
          <Route path="/users" exact component={UserList} />

          <Route path="/createUser" exact component={createUser} />
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tweets">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>tweets</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/createTweet">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Create tweets</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/createUser">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Create user</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
