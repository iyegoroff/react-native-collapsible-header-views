import * as React from 'react'
import { NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const Header = ({ goBack }: { goBack: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={goBack}>
      <View style={styles.backButton}>
        <Text style={styles.title}>{'<-'}</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.title}>BASIC</Text>
  </View>
)

export const Basic = ({ navigation }: NavigationScreenConfigProps) => (
  <>
    <StatusBar
      showHideTransition={'slide'}
      hidden={false}
      translucent={true}
      backgroundColor={'transparent'}
    />
    <CollapsibleHeaderFlatList
      CollapsibleHeaderComponent={<Header goBack={() => navigation.goBack()} />}
      headerHeight={100}
      statusBarHeight={getStatusBarHeight(true)}
      headerContainerBackgroundColor={'green'}
      data={data}
      renderItem={Item}
      ItemSeparatorComponent={Separator}
      keyExtractor={keyExtractor}
    />
  </>
)

const keyExtractor = (item: number, _index: number) => `${item}`

const data = Array(50).fill(0).map((_, i) => i)

const Item = ({ item }: { item: number }) => (
  <Text style={styles.item}>{item}</Text>
)

const Separator = () => (
  <View style={styles.separator} />
)

const styles = StyleSheet.create({
  item: {
    paddingLeft: 20,
    paddingVertical: 20,
    backgroundColor: 'wheat'
  },
  separator: {
    height: 1,
    backgroundColor: 'gray'
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
