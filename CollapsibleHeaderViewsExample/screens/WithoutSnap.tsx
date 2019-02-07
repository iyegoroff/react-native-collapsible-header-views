import * as React from 'react'
import { NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const Header = ({ goBack }: { goBack: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={goBack}>
      <View style={styles.backButton}>
        <Text style={styles.title}>{'<-'}</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.title}>WITHOUT SNAP</Text>
  </View>
)

export const WithoutSnap = ({ navigation }: NavigationScreenConfigProps) => (
  <>
    <StatusBar
      showHideTransition={'slide'}
      hidden={false}
      translucent={true}
      backgroundColor={'transparent'}
    />
    <CollapsibleHeaderScrollView
      CollapsibleHeaderComponent={<Header goBack={() => navigation.goBack()} />}
      headerHeight={100}
      statusBarHeight={getStatusBarHeight(true)}
      headerContainerBackgroundColor={'green'}
      disableHeaderSnap={true}
    >
      <View style={styles.content} />
    </CollapsibleHeaderScrollView>
  </>
)

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: 2000,
    backgroundColor: 'wheat',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: 'orange'
  },
  header: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  backButton: {
    height: 94,
    width: 94,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  }
})
