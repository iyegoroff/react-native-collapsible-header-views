module Fable.Import.ReactNativeCollapsibleHeaderViews

open Fable.Helpers.React
open Fable.Import.ReactNative
open Fable.Helpers.ReactNative.Props
open Fable.Helpers.ReactNative
open Fable.Core
open Fable.Core.JsInterop


module Props =

  type AnimationConfig =
    { animated: bool }
  
  type CollapsibleHeaderProps =
    { interpolatedHeaderTranslation: (float -> float -> Animated.AnimatedInterpolation)
      showHeader: (AnimationConfig -> unit)
      hideHeader: (AnimationConfig -> unit) }

  type IAnimatedComponent =
    interface end

  type CollapsibleHeaderView =
    inherit React.ComponentClass<ScrollViewProperties>
    abstract showHeader: (AnimationConfig -> unit) with get, set
    abstract hideHeader: (AnimationConfig -> unit) with get, set
    abstract animatedComponent: (unit -> IAnimatedComponent) with get, set

  type CollapsibleHeaderViewProps =
    | StatusBarHeight of float
    | HeaderContainerBackgroundColor of string
    | DisableHeaderSnap of bool
    | HeaderAnimationDuration of float
    | Ref of Ref<CollapsibleHeaderView>


open Props

[<Emit("$0 ? ($0._component.scrollTo ? $0._component : $0._component._listRef._scrollRef) : null")>]
let scrollView (_ref: IAnimatedComponent): ScrollView option = jsNative

let inline collapsibleHeaderScrollView
  (header: (CollapsibleHeaderProps -> React.ReactElement))
  (headerHeight: float)
  (collapsibleProps: CollapsibleHeaderViewProps list)
  (props: ScrollViewProperties list)
  (children: React.ReactElement list): React.ReactElement =

  ofImport
    "CollapsibleHeaderScrollView"
    "react-native-collapsible-header-views"
    (JS.Object.assign(
      createObj
        [ "CollapsibleHeaderComponent" ==> header
          "headerHeight" ==> headerHeight ],
      keyValueList CaseRules.LowerFirst collapsibleProps,
      keyValueList CaseRules.LowerFirst props
    ))
    children

let inline collapsibleHeaderFlatList<'a>
  (data:'a [])
  (header: (CollapsibleHeaderProps -> React.ReactElement))
  (headerHeight: float)
  (collapsibleProps: CollapsibleHeaderViewProps list)
  (props: IFlatListProperties<'a> list): React.ReactElement =

  let pascalCaseProps =
    List.filter (function
                 | ItemSeparatorComponent _ -> true
                 | ListEmptyComponent _ -> true
                 | ListFooterComponent _ -> true
                 | ListHeaderComponent _ -> true
                 | _ -> false)
                 (unbox<FlatListProperties<'a> list> props)

  ofImport
    "CollapsibleHeaderFlatList"
    "react-native-collapsible-header-views"
    (JS.Object.assign(
      createObj
        [ "data" ==> data
          "CollapsibleHeaderComponent" ==> header
          "headerHeight" ==> headerHeight ],
      keyValueList CaseRules.LowerFirst collapsibleProps,
      keyValueList CaseRules.LowerFirst props,
      keyValueList CaseRules.None pascalCaseProps
    ))
    []

let inline collapsibleHeaderSectionList<'a>
  (sections: SectionListData<'a> [])
  (header: (CollapsibleHeaderProps -> React.ReactElement))
  (headerHeight: float)
  (collapsibleProps: CollapsibleHeaderViewProps list)
  (props: ISectionListProperties<'a> list): React.ReactElement =

  let pascalCaseProps =
    List.filter (function
                 | SectionListProperties.ItemSeparatorComponent _ -> true
                 | SectionListProperties.ListEmptyComponent _ -> true
                 | SectionListProperties.ListFooterComponent _ -> true
                 | SectionListProperties.ListHeaderComponent _ -> true
                 | SectionSeparatorComponent _ -> true
                 | _ -> false)
                 (unbox<SectionListProperties<'a> list> props)

  ofImport
    "CollapsibleHeaderSectionList"
    "react-native-collapsible-header-views"
    (JS.Object.assign(
      createObj
        [ "sections" ==> sections
          "CollapsibleHeaderComponent" ==> header
          "headerHeight" ==> headerHeight ],
      keyValueList CaseRules.LowerFirst collapsibleProps,
      keyValueList CaseRules.LowerFirst props,
      keyValueList CaseRules.None pascalCaseProps
    ))
    []
