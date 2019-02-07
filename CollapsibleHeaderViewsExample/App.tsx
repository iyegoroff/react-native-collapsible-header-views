import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Home } from './screens/Home'
import { Basic } from './screens/Basic'
import { InterpolatedTranslation } from './screens/InterpolatedTranslation'
import { ShowAndHide } from './screens/ShowAndHide'
import { WithoutSnap } from './screens/WithoutSnap'
import { WrappedInstanceMethods } from './screens/WrappedInstanceMethods'

const RootStack = createStackNavigator({
  Home: { screen: Home },
  Basic: { screen: Basic },
  InterpolatedTranslation: { screen: InterpolatedTranslation },
  ShowAndHide: { screen: ShowAndHide },
  WithoutSnap: { screen: WithoutSnap },
  WrappedInstanceMethods: { screen: WrappedInstanceMethods }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})

type Props = {}

export default class App extends React.Component<Props> {
  render() {
    return <RootStack />
  }
}
