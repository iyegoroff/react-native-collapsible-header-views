import { withCollapsibleHeader } from './with-collapsible-header'
import { ScrollView, FlatList, SectionList } from 'react-native'

export { withCollapsibleHeader } from './with-collapsible-header'
export const CollapsibleHeaderScrollView = withCollapsibleHeader(ScrollView)
export const CollapsibleHeaderFlatList = withCollapsibleHeader(FlatList)
export const CollapsibleHeaderSectionList = withCollapsibleHeader(SectionList)
