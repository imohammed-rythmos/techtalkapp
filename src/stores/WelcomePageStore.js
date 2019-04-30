import axios from "axios";
import { decorate, observable, action } from "mobx";

class WelcomePageStore {
  firstName;
  lastName;
  age;
  gotData = false;
  getPersonalInfo = async () => {
    try {
      let getDetailsPromise = axios.get(
        "http://www.mocky.io/v2/5cc3e457340000550076546c"
      );
      let [getDetails] = await Promise.all([getDetailsPromise]);
      this.firstName = getDetails.data.firstName;
      this.lastName = getDetails.data.lastname;
      this.age = getDetails.data.age;
      this.gotData = true;
    } catch (error) {}
  };

  setFirstName = firstName => {
    this.firstName = firstName;
  };
  setLastName = lastName => {
    this.lastName = lastName;
  };
  setAge = age => {
    this.age = age;
  };
}
decorate(WelcomePageStore, {
  firstName: observable,
  lastName: observable,
  age: observable,
  gotData: observable,
  getPersonalInfo: action,
  setAge: action,
  setFirstName: action,
  setLastName: action
});

const Store = new WelcomePageStore();

export { WelcomePageStore };

export default Store;
