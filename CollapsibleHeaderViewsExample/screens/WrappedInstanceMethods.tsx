import * as React from 'react'
import { NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const Header = ({ goBack }: { goBack: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={goBack}>
      <View style={styles.backButton}>
        <Text style={styles.arrow}>{'<-'}</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.title}>WRAPPED INSTANCE METHODS</Text>
  </View>
)

export const WrappedInstanceMethods = ({ navigation }: NavigationScreenConfigProps) => {
  const ref: React.RefObject<CollapsibleHeaderFlatList<number>> = React.createRef()

  const scrollToTop = () => {
    if (ref.current && ref.current.animatedComponent()) {
      ref.current.animatedComponent()
        ._component._listRef._scrollRef.scrollTo({ y: 0, animated: true })
    }
  }

  const scrollToBottom = () => {
    if (ref.current && ref.current.animatedComponent()) {
      ref.current.animatedComponent()
        ._component._listRef._scrollRef.scrollToEnd({ animated: true })
    }
  }

  const Item = ({ item }: { item: number }) => (
    <TouchableOpacity onPress={item % 2 ? scrollToTop : scrollToBottom}>
      <View>
        <Text style={styles.item}>{`Scroll to ${item % 2 ? 'top' : 'bottom'}`}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <>
      <StatusBar
        showHideTransition={'slide'}
        hidden={false}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={<Header goBack={() => navigation.goBack()} />}
        headerHeight={116}
        statusBarHeight={getStatusBarHeight(true)}
        disableHeaderSnap={true}
        ref={ref}
        data={data}
        renderItem={Item}
        ItemSeparatorComponent={Separator}
        keyExtractor={keyExtractor}
      />
    </>
  )
}

const keyExtractor = (item: number, _index: number) => `${item}`

const data = Array(50).fill(0).map((_, i) => i)

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
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrow: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  }
})
