// 对vant组件按需导入
import Vue from 'vue'

import { Tab, Tabs, Popup, Area, AddressEdit, AddressList, Checkbox, CheckboxGroup, Dialog, ActionSheet, Icon, Search, Swipe, SwipeItem, Grid, GridItem, Button, Rate, Tabbar, TabbarItem, NavBar, Toast } from 'vant'

Vue.config.productionTip = false

Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Rate)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Icon)
Vue.use(ActionSheet)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(Area)
Vue.use(Popup)
Vue.use(Tab)
Vue.use(Tabs)
