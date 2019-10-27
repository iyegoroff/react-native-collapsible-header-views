import * as React from 'react'
import memoize from 'fast-memoize'
import {
  ScrollViewProps,
  View,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle
} from 'react-native'

const noop = () => { /**/ }

export type AnimationConfig = { animated?: boolean }

export type CollapsibleHeaderProps = {
  interpolatedHeaderTranslation: (from: number, to: number) => Animated.AnimatedInterpolation
  showHeader: (options: AnimationConfig | unknown) => void
  hideHeader: (options: AnimationConfig | unknown) => void
}

export type CollapsibleHeaderViewProps<T extends ScrollViewProps> = T & {
  readonly CollapsibleHeaderComponent: React.ReactElement<unknown>
    | React.ComponentType<CollapsibleHeaderProps>
  readonly headerHeight: number
  readonly statusBarHeight: number
  readonly headerContainerBackgroundColor: string
  readonly disableHeaderSnap: boolean
  readonly headerAnimationDuration: number
  readonly clipHeader: boolean
}

interface CollapsibleHeaderViewStyle {
  readonly fill: ViewStyle
  readonly header: ViewStyle
  readonly container: ViewStyle
}

export const withCollapsibleHeader = <T extends ScrollViewProps>(
  Component: React.ComponentClass<T>
) => {
  const AnimatedComponent =
    Animated.createAnimatedComponent(Component) as React.ComponentClass<ScrollViewProps>

  return class CollapsibleHeaderView extends React.Component<CollapsibleHeaderViewProps<T>> {

    static defaultProps = {
      statusBarHeight: 0,
      disableHeaderMomentum: false,
      headerMomentumDuration: 350,
      headerContainerBackgroundColor: 'white'
    }

    private scrollAnim = new Animated.Value(0)
    private offsetAnim = new Animated.Value(0)
    private clampedScroll?: Animated.AnimatedDiffClamp
    private scrollValue = 0
    private offsetValue = 0
    private clampedScrollValue = 0
    private scrollEndTimer = 0
    private headerSnap?: Animated.CompositeAnimation
    private headerTranslation?: Animated.AnimatedInterpolation
    private currentHeaderHeight?: number
    private currentStatusBarHeight?: number
    private wrappedComponent: React.RefObject<any> = React.createRef()

    public constructor(props: CollapsibleHeaderViewProps<T>) {
      super(props)

      const { headerHeight, statusBarHeight } = props

      this.initAnimations(headerHeight, statusBarHeight)
    }

    private initAnimations(headerHeight: number, statusBarHeight: number) {
      this.scrollAnim.addListener(({ value }) => {
        const diff = value - this.scrollValue
        this.scrollValue = value
        this.clampedScrollValue = Math.min(
          Math.max(this.clampedScrollValue + diff, 0),
          headerHeight - statusBarHeight
        )
      })

      this.offsetAnim.addListener(({ value }) => {
        this.offsetValue = value
      })

      this.clampedScroll = Animated.diffClamp(
        Animated.add(
          this.scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp'
          }),
          this.offsetAnim
        ),
        0,
        headerHeight - statusBarHeight
      )

      this.headerTranslation = this.clampedScroll.interpolate({
        inputRange: [0, headerHeight - statusBarHeight],
        outputRange: [0, -(headerHeight - statusBarHeight)],
        extrapolate: 'clamp'
      })

      this.currentHeaderHeight = headerHeight
      this.currentStatusBarHeight = statusBarHeight
    }

    private cleanupAnimations() {
      this.scrollAnim.removeAllListeners()
      this.offsetAnim.removeAllListeners()
      clearTimeout(this.scrollEndTimer)

      if (this.headerSnap) {
        this.headerSnap.stop()
      }
    }

    private resetAnimations(headerHeight: number, statusBarHeight: number) {
      if (this.currentHeaderHeight !== headerHeight ||
        this.currentStatusBarHeight !== statusBarHeight
      ) {
        this.cleanupAnimations()
        this.initAnimations(headerHeight, statusBarHeight)
      }
    }

    public componentWillUnmount() {
      this.cleanupAnimations()
    }

    public render() {
      const {
        statusBarHeight,
        CollapsibleHeaderComponent,
        contentContainerStyle,
        headerHeight,
        onScroll,
        headerContainerBackgroundColor,
        clipHeader,
        ...props
      } = this.props as CollapsibleHeaderViewProps<ScrollViewProps>

      this.resetAnimations(headerHeight, statusBarHeight)

      const headerProps = {
        interpolatedHeaderTranslation: this.interpolatedHeaderTranslation,
        showHeader: this.showHeader,
        hideHeader: this.hideHeader
      }

      const Header = CollapsibleHeaderComponent as React.ComponentType<CollapsibleHeaderProps>

      const styles = style(
        headerHeight,
        statusBarHeight,
        headerContainerBackgroundColor,
        clipHeader
      )

      return (
        <View style={styles.fill}>
          <AnimatedComponent
            bounces={false}
            overScrollMode={'never'}
            scrollEventThrottle={1}
            {...props}
            ref={this.wrappedComponent}
            contentContainerStyle={[contentContainerStyle, styles.container]}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            onScrollEndDrag={this.onScrollEndDrag}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollAnim } } }],
              { useNativeDriver: true, listener: onScroll }
            )}
          />
          <Animated.View
            style={[styles.header, [{ transform: [{ translateY: this.headerTranslation }] }]]}
          >
            {React.isValidElement(Header) ? Header : <Header {...headerProps} />}
          </Animated.View>
        </View>
      )
    }

    private onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { onScrollEndDrag = noop, disableHeaderSnap } = this.props

      if (!disableHeaderSnap) {
        this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250)
      }

      onScrollEndDrag(event)
    }

    private onMomentumScrollBegin = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { onMomentumScrollBegin = noop, disableHeaderSnap } = this.props

      if (!disableHeaderSnap) {
        clearTimeout(this.scrollEndTimer)
      }

      onMomentumScrollBegin(event)
    }

    private onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {
        statusBarHeight,
        onMomentumScrollEnd = noop,
        headerHeight,
        disableHeaderSnap
      } = this.props

      if (!disableHeaderSnap) {
        this.moveHeader(
          (this.scrollValue > headerHeight &&
          this.clampedScrollValue > (headerHeight - statusBarHeight) / 2)
            ? this.offsetValue + headerHeight
            : this.offsetValue - headerHeight
        )
      }

      onMomentumScrollEnd(event)
    }

    private interpolatedHeaderTranslation = (from: number, to: number) => {
      const { headerHeight, statusBarHeight } = this.props

      return this.clampedScroll!.interpolate({
        inputRange: [0, headerHeight - statusBarHeight],
        outputRange: [from, to],
        extrapolate: 'clamp'
      })
    }

    private static isAnimationConfig(options: AnimationConfig | unknown): boolean {
      return options && (options as AnimationConfig).animated !== undefined
    }

    public animatedComponent = () => {
      return this.wrappedComponent.current
    }

    public getNode = () => {
      return this.wrappedComponent.current.getNode()
    }

    public showHeader = (options: AnimationConfig | unknown) => {
      this.moveHeader(
        this.offsetValue - this.props.headerHeight,
        !CollapsibleHeaderView.isAnimationConfig(options) || (options as AnimationConfig).animated
      )
    }

    public hideHeader = (options: AnimationConfig | unknown) => {
      const { headerHeight } = this.props

      this.moveHeader(
        this.offsetValue + (this.scrollValue > headerHeight ? headerHeight : this.scrollValue),
        !CollapsibleHeaderView.isAnimationConfig(options) || (options as AnimationConfig).animated
      )
    }

    private moveHeader(toValue: number, animated: boolean = true) {
      if (this.headerSnap) {
        this.headerSnap.stop()
      }

      if (animated) {
        this.headerSnap = Animated.timing(this.offsetAnim, {
          toValue,
          duration: this.props.headerAnimationDuration,
          useNativeDriver: true
        })

        this.headerSnap.start()

      } else {
        this.offsetAnim.setValue(toValue)
      }
    }
  }
}

const style = memoize((
  headerHeight: number,
  statusBarHeight: number,
  headerBackgroundColor: string,
  clipHeader: boolean
) =>
    StyleSheet.create<CollapsibleHeaderViewStyle>({
      fill: {
        flex: 1,
        overflow: clipHeader ? 'hidden' : undefined
      },
      header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: headerHeight,
        paddingTop: statusBarHeight,
        backgroundColor: headerBackgroundColor
      },
      container: {
        paddingTop: headerHeight
      }
    }
  )
)
