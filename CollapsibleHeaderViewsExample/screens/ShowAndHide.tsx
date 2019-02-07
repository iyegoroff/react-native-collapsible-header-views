import * as React from 'react'
import { NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native'
import {
  CollapsibleHeaderFlatList,
  CollapsibleHeaderProps
} from 'react-native-collapsible-header-views'
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { all } from 'cat-names'

export class ShowAndHide extends React.Component<NavigationScreenConfigProps, { text: string }> {

  public state = { text: '' }

  private header = (props: CollapsibleHeaderProps) => (
    <Animated.View style={[
      styles.header,
      { transform: [{ translateY: props.interpolatedHeaderTranslation(0, -statusBarHeight()) }] }
    ]}>
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <View style={styles.backButton}>
          <Text style={styles.title}>{'<-'}</Text>
        </View>
      </TouchableOpacity>
      <TextInput
        placeholder={'click to show, \nsubmit/blur to hide, \ntype to find your cat name'}
        multiline={true}
        autoCapitalize={'words'}
        onFocus={props.showHeader}
        onBlur={props.hideHeader}
        style={styles.headerInput}
        onChangeText={text => this.setState({ text })}
        value={this.state.text}
      />
    </Animated.View>
  )

  render() {
    return (
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={this.header}
        headerHeight={100}
        headerContainerBackgroundColor={'transparent'}
        disableHeaderSnap={true}
        contentContainerStyle={styles.container}
        data={all.filter(cat => cat.includes(this.state.text))}
        renderItem={Item}
        ItemSeparatorComponent={Separator}
        keyExtractor={keyExtractor}
      />
    )
  }
}

const keyExtractor = (item: string, _index: number) => `${item}`
const statusBarHeight = () => isIphoneX() ? getStatusBarHeight(false) : 0

const Item = ({ item }: { item: string }) => (
  <Text style={styles.item}>{item}</Text>
)

const Separator = () => (
  <View style={styles.separator} />
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'wheat',
    marginTop: statusBarHeight()
  },
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: statusBarHeight()
  },
  backButton: {
    height: 94,
    width: 94,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'green'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  headerInput: {
    height: 94,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 3,
    margin: 3
  }
})
