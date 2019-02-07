import * as React from 'react'
import { NavigationScreenConfigProps } from 'react-navigation'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions
} from 'react-native'
import {
  CollapsibleHeaderFlatList,
  CollapsibleHeaderProps
} from 'react-native-collapsible-header-views'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const Header = ({
  goBack,
  interpolatedHeaderTranslation
}: { goBack: () => void } & CollapsibleHeaderProps) => (
  <Animated.View style={[
    styles.header,
    {
      opacity: interpolatedHeaderTranslation(1, 0),
      transform: [{ translateX: interpolatedHeaderTranslation(0, Dimensions.get('screen').width) }]
    }
  ]}>
    <TouchableOpacity onPress={goBack}>
      <View style={styles.backButton}>
        <Text style={styles.arrow}>{'<-'}</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.title}>INTERPOLATED TRANSLATION</Text>
  </Animated.View>
)

export const InterpolatedTranslation = ({ navigation }: NavigationScreenConfigProps) => (
  <>
    <StatusBar
      showHideTransition={'slide'}
      hidden={false}
      translucent={true}
      backgroundColor={'transparent'}
    />
    <CollapsibleHeaderFlatList
      CollapsibleHeaderComponent={
        (props) => <Header {...props} goBack={() => navigation.goBack()} />
      }
      headerHeight={90}
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
    paddingVertical: 20
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
    height: 84,
    width: 84,
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
    fontSize: 28,
    color: 'white'
  }
})
