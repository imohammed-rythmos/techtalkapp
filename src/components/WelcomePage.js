import React, { Component } from "react";
import InputText from "./InputText";
import { inject, observer } from "mobx-react";

const WelcomePage = inject("WelcomePageStore")(
  observer(
    class WelcomePage extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      async componentWillMount() {
        let { WelcomePageStore } = this.props;
        let getPersonDetailsPromise = await WelcomePageStore.getPersonalInfo();
        await Promise.all([getPersonDetailsPromise]);
      }

      DisplayWelcomePage = inject("WelcomePageStore")(
        observer(
          class WelcomePageStore extends Component {
            render() {
              let { WelcomePageStore } = this.props;
              let fieldType = "text";
              return (
                <>
                  <label>
                    <h1>Personal Details: </h1>
                    <InputText
                      fieldName="First Name"
                      fieldType={fieldType}
                      fieldValue={WelcomePageStore.firstName}
                      onChangHandler={WelcomePageStore.setFirstName}
                    />
                    <InputText
                      fieldName="Last Name"
                      fieldType={fieldType}
                      fieldValue={WelcomePageStore.lastName}
                      onChangHandler={WelcomePageStore.setLastName}
                    />
                    <InputText
                      fieldName="age"
                      fieldType={fieldType}
                      fieldValue={WelcomePageStore.age}
                      onChangHandler={WelcomePageStore.setAge}
                    />
                  </label>
                </>
              );
            }
          }
        )
      );

      render() {
        let { WelcomePageStore } = this.props;
        let Content = this.DisplayWelcomePage;
        return (
          <>
            {WelcomePageStore.gotData ? <Content /> : "Loading data!"}
          </>
        );
      }
    }
  )
);

export default WelcomePage;
