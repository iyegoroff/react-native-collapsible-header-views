# react-native-collapsible-header-views
[![npm version](https://badge.fury.io/js/react-native-collapsible-header-views.svg?t=1495378566925)](https://badge.fury.io/js/react-native-collapsible-header-views)
[![CircleCI](https://circleci.com/gh/iyegoroff/react-native-collapsible-header-views.svg?style=svg)](https://circleci.com/gh/iyegoroff/react-native-collapsible-header-views)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Dependency Status](https://david-dm.org/iyegoroff/react-native-collapsible-header-views.svg?t=1495378566925)](https://david-dm.org/iyegoroff/react-native-collapsible-header-views)
[![devDependencies Status](https://david-dm.org/iyegoroff/react-native-collapsible-header-views/dev-status.svg)](https://david-dm.org/iyegoroff/react-native-collapsible-header-views?type=dev)
[![typings included](https://img.shields.io/badge/typings-included-brightgreen.svg?t=1495378566925)](src/index.d.ts)
[![npm](https://img.shields.io/npm/l/express.svg?t=1495378566925)](https://www.npmjs.com/package/react-native-collapsible-header-views)

ScrollView, FlatList, SectionList with collapsible headers + HOC for wrapping custom scrollables

## Getting started

`$ npm install react-native-collapsible-header-views --save`

## Demo

 Android                                       |  iOS
:---------------------------------------------:|:---------------------------------------------:
<img src="https://raw.githubusercontent.com/iyegoroff/react-native-collapsible-header-views/master/demo/android.gif" align="left" height="500">  |  <img src="https://raw.githubusercontent.com/iyegoroff/react-native-collapsible-header-views/master/demo/ios.gif" align="right" height="500">

## Example

```javascript
import * as React from 'react';
import { View, Platform } from 'react-native';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';

export const Basic = () => (
  <CollapsibleHeaderScrollView
    CollapsibleHeaderComponent={<View style={{ backgroundColor: 'white' }} />}
    headerHeight={100}
    statusBarHeight={Platform.OS === 'ios' ? 20 : 0}
  >
    <View style={{ height: 2000, backgroundColor: 'wheat' }} />
  </CollapsibleHeaderScrollView>
);
```

## Description

Library exports three components `CollapsibleHeaderScrollView`, `CollapsibleHeaderFlatList`,
`CollapsibleHeaderSectionList` and a HOC `withCollapsibleHeader` for wrapping custom scrollable
components. Provided components support all props and instance methods of corresponding wrapped
components. Note that components are also wrapped with `Animated.createAnimatedComponent` under the
hood.

## Reference

### Props

#### CollapsibleHeaderScrollViewProps, CollapsibleHeaderFlatListProps, CollapsibleHeaderSectionListProps

- `CollapsibleHeaderComponent: React.ReactElement<unknown> | React.ComponentType<CollapsibleHeaderProps>` -
  React element or component/function that receives `CollapsibleHeaderProps` object. <strong>Required</strong>;
- `headerHeight: number` - height of `CollapsibleHeaderComponent`. <strong>Required</strong>;
- `statusBarHeight?: number` - height of status bar. Defaults to `0`;
- `headerContainerBackgroundColor?: string` - background color for `CollapsibleHeaderComponent` and
  status bar container. Defaults to `'white'`;
- `disableHeaderSnap?: boolean` - pass `true` to disable header snap animations. Defaults to `false`;
- `headerAnimationDuration?: number` - duration of snap and `showHeader`, `hideHeader` animations.
  Defaults to `350`;
- `clipHeader?: boolean` - if `true` header will be clipped with `overflow: 'hidden'` style.

Also some of `ScrollView` props have new defaults: `bounces` defaults to `false`, `overScrollMode`
to `'never'` and `scrollEventThrottle` to `1`.

#### CollapsibleHeaderProps

- `interpolatedHeaderTranslation: (from: number, to: number) => Animated.AnimatedInterpolation` -
  creates new `AnimatedInterpolation` object, whose input range corresponds to header translation and
  output range is specified by `from` and `to` params. Can be used for custom animations, like setting
  opacity etc.;
- `showHeader: (options: { animated: boolean } | unknown) => void` - pushes header down with animation
  enabled by default;
- `hideHeader: (options: { animated: boolean } | unknown) => void` - pulls header up with animation
  enabled by default.

### Methods

#### CollapsibleHeaderScrollView, CollapsibleHeaderFlatList, CollapsibleHeaderSectionList

- `animatedComponent: () => any | null` - returns result of `Animated.createAnimatedComponent` applied
  to original component;
- `showHeader: (options: { animated: boolean } | unknown) => void` - pushes header down with animation
  enabled by default;
- `hideHeader: (options: { animated: boolean } | unknown) => void` - pulls header up with animation
  enabled by default.

#### withCollapsibleHeader

- `function withCollapsibleHeader<T extends ScrollViewProps>(Component: React.ComponentClass<T>): React.ComponentClass<CollapsibleHeaderViewProps<T>>` -
  creates new component with collapsible header, it is assumed that input component has all of `ScrollView` props.


## Credits

- Key concepts were taken from [collapsible-navbar](https://github.com/janicduplessis/collapsible-navbar)
  demo by @janicduplessis
