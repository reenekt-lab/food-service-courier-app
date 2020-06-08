<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-container v-show="$vuetify.breakpoint.smAndUp">
      <v-row dense>
        <v-col
          :cols="12"
        >
          <v-card>
            <v-card-title class="headline" style="word-break: break-word;">
              Добро пожаловать в приложение для курьеров
            </v-card-title>
            <v-card-text>
              <p>Все доступные разделы можно увидеть в левом меню. Чтобы открыть меню нажмите на кнопку <v-icon>mdi-menu</v-icon> в верхнем левом углу.</p>
              <div v-if="false">
                <span>Разработчик сайта: </span> <span class="font-weight-medium">Андрей Семенцов</span>
                <div class="d-inline-block">
                  <a target="_blank" href="https://github.com/reenekt" style="text-decoration: none;"><v-icon class="text--primary">mdi-github</v-icon></a>
                  <a target="_blank" href="https://vk.com/reenekt" style="text-decoration: none;"><v-icon style="color: #0D47A1 !important;">mdi-vk</v-icon></a>
                </div>
                <div><b>Внимание: </b>Этот сайт является частью демонстрационного проекта Food Service</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row dense>
        <!-- eslint-disable -->
<!--        <v-col-->
<!--          :cols="12"-->
<!--          :sm="6"-->
<!--        >-->
<!--          <v-card-->
<!--            color="light-blue lighten-5"-->
<!--            :loading="newOrdersCountLoading"-->
<!--          >-->
<!--            <v-card-title>Доступные заказы</v-card-title>-->
<!--            <v-card-text v-if="newOrdersCountLoading">-->
<!--              Считаем количество доступных заказов-->
<!--            </v-card-text>-->
<!--            <v-card-text v-else-if="newOrdersCount">-->
<!--              Вам ДОСТУПНО(todo как следующие) <b>{{ newOrdersCount }}</b> {{ getCounterWordForm('new', newOrdersCount) }} {{ getCounterWordForm('order', newOrdersCount) }}-->
<!--            </v-card-text>-->
<!--            <v-card-text v-else>-->
<!--              Нет заказов, которые можно взять в работу-->
<!--            </v-card-text>-->
<!--            <v-card-actions>-->
<!--              <v-spacer />-->
<!--              <v-btn-->
<!--                text-->
<!--                nuxt-->
<!--                :to="{ name: 'order-type', params: { type: 'cooked' } }"-->
<!--              >-->
<!--                Перейти-->
<!--              </v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </v-col>-->
        <!-- eslint-enable -->
        <v-col
          :cols="12"
          :sm="6"
        >
          <v-card
            color="teal lighten-5"
            :loading="deliveringOrdersCountLoading"
          >
            <v-card-title>Заказы в работе</v-card-title>
            <v-card-text v-if="deliveringOrdersCountLoading">
              Считаем количество заказов, которые вы доставляете
            </v-card-text>
            <v-card-text v-else-if="deliveringOrdersCount">
              Сейчас вы доставляете <b>{{ deliveringOrdersCount }}</b> {{ getCounterWordForm('order', deliveringOrdersCount) }}
            </v-card-text>
            <v-card-text v-else>
              Нет заказов в работе
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                nuxt
                :to="{ name: 'order-type', params: { type: 'delivering' } }"
              >
                Перейти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col
          :cols="12"
          :sm="6"
        >
          <v-card
            color="blue lighten-5"
            :loading="deliveredOrdersCountLoading"
            height="100%"
          >
            <v-card-title>Доставлено заказов</v-card-title>
            <v-card-text v-if="deliveredOrdersCountLoading">
              Считаем количество заказов, которые вы уже доставили
            </v-card-text>
            <v-card-text v-else-if="deliveredOrdersCount">
              Вы доставили уже <b>{{ deliveredOrdersCount }}</b> {{ getCounterWordForm('order', deliveredOrdersCount) }}
            </v-card-text>
            <v-card-text v-else>
              Вы еще не доставили ни один заказ
            </v-card-text>
            <!-- eslint-disable -->
<!--            <v-card-actions>-->
<!--              <v-spacer />-->
<!--              <v-btn-->
<!--                text-->
<!--                nuxt-->
<!--                :to="{ name: 'order-type', params: { type: 'delivered' } }"-->
<!--              >-->
<!--                Перейти-->
<!--              </v-btn>-->
<!--            </v-card-actions>-->
            <!-- eslint-enable -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      newOrdersCountLoading: 'light-blue',
      newOrdersCount: 0,
      deliveringOrdersCountLoading: 'teal',
      deliveringOrdersCount: 0,
      deliveredOrdersCountLoading: 'teal',
      deliveredOrdersCount: 0,
      counterWordForms: {
        order: {
          lastIsOne: 'заказ',
          lastFromTwoToFour: 'заказа',
          lastIsFiveAndMore: 'заказов'
        },
        new: {
          lastIsOne: 'новый',
          lastFromTwoToFour: 'новых',
          lastIsFiveAndMore: 'новых'
        }
      }
    }
  },
  created () {
    this.$dataSchema.loadResource('order')
      .then((resource) => {
        const apiEndpoint = resource.apiPath
        this.$axios.get(apiEndpoint, {
          params: {
            status: 'cooked',
            courier: this.$auth.user.id
          }
        })
          .then((response) => {
            this.newOrdersCount = response.data.meta.total
          })
          .finally(() => {
            this.newOrdersCountLoading = false
          })
        this.$axios.get(apiEndpoint, {
          params: {
            status: 'delivering',
            courier: this.$auth.user.id
          }
        })
          .then((response) => {
            this.deliveringOrdersCount = response.data.meta.total
          })
          .finally(() => {
            this.deliveringOrdersCountLoading = false
          })
        this.$axios.get(apiEndpoint, {
          params: {
            status: 'delivered',
            courier: this.$auth.user.id
          }
        })
          .then((response) => {
            this.deliveredOrdersCount = response.data.meta.total
          })
          .finally(() => {
            this.deliveredOrdersCountLoading = false
          })
      })
  },
  methods: {
    getCounterWordForm (wordKey, count) {
      const reminder = count % 10
      let form = 'lastIsFiveAndMore'
      if (reminder === 1) {
        form = 'lastIsOne'
      }
      if (reminder >= 2 && reminder <= 4) {
        form = 'lastFromTwoToFour'
      }
      return this.counterWordForms[wordKey][form]
    }
  },
  head () {
    return {
      title: 'Главная'
    }
  }
}
</script>
