import * as React from 'react'
import { ScrollViewProps, Animated, FlatListProps, SectionListProps } from 'react-native'

export type InterpolatedHeaderTranslation = (from: number, to: number) => Animated.AnimatedInterpolation
export type AnimationConfig = { animated?: boolean }

export type CollapsibleHeaderProps = {
  interpolatedHeaderTranslation: InterpolatedHeaderTranslation
  showHeader: (options: AnimationConfig | unknown) => void
  hideHeader: (options: AnimationConfig | unknown) => void
}

export type CollapsibleHeaderViewProps<T extends ScrollViewProps> = T & {
  readonly CollapsibleHeaderComponent: React.ReactElement<unknown>
    | React.ComponentType<CollapsibleHeaderProps>
  readonly headerHeight: number
  readonly statusBarHeight?: number
  readonly headerContainerBackgroundColor?: string
  readonly disableHeaderSnap?: boolean
  readonly headerAnimationDuration?: number
  readonly clipHeader?: boolean
}

declare class CollapsibleHeaderView<T extends ScrollViewProps> extends React.Component<
  CollapsibleHeaderViewProps<T>
> {
  public showHeader: (options: AnimationConfig | unknown) => void
  public hideHeader: (options: AnimationConfig | unknown) => void
  public animatedComponent: () => any | null
}

export declare class CollapsibleHeaderScrollView extends CollapsibleHeaderView<ScrollViewProps> { }
export declare class CollapsibleHeaderFlatList<I> extends CollapsibleHeaderView<FlatListProps<I>> { }
export declare class CollapsibleHeaderSectionList<I> extends CollapsibleHeaderView<SectionListProps<I>> { }

export function withCollapsibleHeader<T extends ScrollViewProps>(
  Component: React.ComponentClass<T>
): React.ComponentClass<CollapsibleHeaderViewProps<T>>
