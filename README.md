# Spark

## Getting started - iOS

**This project runs on Node v6.3.x**

### Installing React Native
If you do not have React Native, you will need to install it, along with a couple of other things.  Follow the [React Native Getting Started guide](https://facebook.github.io/react-native/docs/getting-started.html#content).


# Installing this project
1. Clone this repository
2. `cd native` and `npm install`
3. Run `react-native link`. This will link any libraries that interact with native iOS code.
4. Run `react-native run-ios`

The Xcode simulator should appear after a moment, with the app simulated.

# Issues
This project makes use of [Redux Form](http://redux-form.com/6.4.3/) for handling some of the app's form state.  It also makes use of [Exponent's Ex-Navigation](https://github.com/exponent/ex-navigation) library for navigation and routing.

There is a known issue where the [`reduxForm` decorator function](http://redux-form.com/6.4.3/docs/api/ReduxForm.md/) interferes with a component's configuration for the app's navigation bar, making the navigation bar disappear.

The problem is that `reduxForm()` does not copy over the static properties required by Ex-Navigation for the navigation bar.  We solved this by using [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics).  This module is required until problem is fixed by Redux Form.

More on this in [issue #74](https://github.com/DRDD2016/native/issues/74)
