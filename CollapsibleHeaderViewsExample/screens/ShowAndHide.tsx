import * as React from 'react';
import { NavigationScreenConfigProps } from 'react-navigation';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import {
  CollapsibleHeaderFlatList,
  CollapsibleHeaderProps
} from 'react-native-collapsible-header-views';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

const keyExtractor = (item: number, _index: number) => `${item}`;
const statusBarHeight = () => isIphoneX() ? getStatusBarHeight(false) : 0;

const Header = ({
  goBack,
  showHeader,
  hideHeader,
  interpolatedHeaderTranslation
}: { goBack: () => void } & CollapsibleHeaderProps) => (
    <Animated.View style={[
      styles.header,
      { transform: [{ translateY: interpolatedHeaderTranslation(0, -statusBarHeight()) }] }
    ]}>
      <TouchableOpacity onPress={goBack}>
        <View style={styles.backButton}>
          <Text style={styles.title}>{'<-'}</Text>
        </View>
      </TouchableOpacity>
      <TextInput
        placeholder={'Click to show, submit/blur to hide'}
        onFocus={showHeader}
        onBlur={hideHeader}
        style={styles.headerInput}
      />
    </Animated.View>
  );

export const ShowAndHide = ({ navigation }: NavigationScreenConfigProps) => (
  <CollapsibleHeaderFlatList
    CollapsibleHeaderComponent={(props) => <Header {...props} goBack={() => navigation.goBack()} />}
    headerHeight={100}
    headerContainerBackgroundColor={'transparent'}
    disableHeaderSnap={true}
    contentContainerStyle={styles.container}
    data={data}
    renderItem={Item}
    ItemSeparatorComponent={Separator}
    keyExtractor={keyExtractor}
  />
);

const data = Array(50).fill(0).map((_, i) => i);

const Item = ({ item }: { item: number }) => (
  <Text style={styles.item}>{item}</Text>
);

const Separator = () => (
  <View style={styles.separator} />
);

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
});
