import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ViewStyle, StatusBar } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'

const route = (routeName: string) => ({ routeName, key: 'example' })

export const Home = ({ navigation }: NavigationScreenConfigProps) => {
  return (
    <View style={styles.container}>
      <StatusBar
        hidden={true}
        showHideTransition={'slide'}
        backgroundColor={'#64E1FF'}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(route('Basic'))}
        style={styles.basic}
      >
        <View>
          <Text style={styles.text}>BASIC</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(route('WithoutSnap'))}
        style={styles.withoutSnap}
      >
        <View>
          <Text style={styles.text}>WITHOUT SNAP</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(route('InterpolatedTranslation'))}
        style={styles.interpolatedTranslation}
      >
        <View>
          <Text style={styles.text}>INTERPOLATED TRANSLATION</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(route('ShowAndHide'))}
        style={styles.showAndHide}
      >
        <View>
          <Text style={styles.text}>SHOW AND HIDE (+ IPHONE-X)</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(route('WrappedInstanceMethods'))}
        style={styles.wrappedInstanceMethods}
      >
        <View>
          <Text style={styles.text}>WRAPPED INSTANCE METHODS</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const buttonStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  basic: {
    ...buttonStyle,
    backgroundColor: '#64E1FF'
  },
  interpolatedTranslation: {
    ...buttonStyle,
    backgroundColor: '#76E85B'
  },
  showAndHide: {
    ...buttonStyle,
    backgroundColor: '#E8614F'
  },
  withoutSnap: {
    ...buttonStyle,
    backgroundColor: '#A157FF'
  },
  wrappedInstanceMethods: {
    ...buttonStyle,
    backgroundColor: '#FFDA6C'
  }
})
