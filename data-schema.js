import restaurant from './data-schema/resources/restaurant'
import commonCategory from './data-schema/resources/commonCategory'
import food from './data-schema/resources/food'
import foodCategory from './data-schema/resources/foodCategory'
import foodTag from './data-schema/resources/foodTag'
import restaurantManager from './data-schema/resources/restaurantManager'
import courier from './data-schema/resources/courier'
import customer from './data-schema/resources/customer'
import order from './data-schema/resources/order'

// TODO overwrite resources (and in general everything) on typescript

const schema = {
  resources: {
    restaurant,
    commonCategory,
    food,
    foodCategory,
    foodTag,
    restaurantManager,
    courier,
    customer,
    order
  }
}

const drawerMenuItems = [
  [
    {
      icon: 'mdi-home-outline',
      title: 'Главная страница',
      to: '/'
    },
    {
      group: true,
      icon: 'mdi-store-outline',
      title: 'Заказы',
      items: [
        // {
        //   icon: 'mdi-clipboard-plus-outline',
        //   title: 'Новые заказы',
        //   to: { name: 'order-type', params: { type: 'new' } }
        // },
        {
          icon: 'mdi-truck-delivery-outline',
          title: 'Заказы в работе',
          to: { name: 'order-type', params: { type: 'delivering' } }
        }
      ]
    }
  ],
  [
    {
      condition (auth) {
        if (!auth) {
          return false
        }
        return auth.check() && auth.user.restaurant_id
      },
      icon: 'mdi-table-chair',
      title: 'Мой ресторан',
      to: { name: 'restaurant' }
    },
    {
      icon: 'mdi-account-circle',
      title: 'Профиль',
      to: { name: 'courier' }
    }
  ]
]

export { schema, drawerMenuItems }

export default schema
