import { required, sameAs } from 'vuelidate/lib/validators'

const customer = {
  // todo add icon
  // drawerMenu: {
  //   icon: 'mdi-table-chair',
  //   title: 'Рестораны'
  // },

  // Middleware abilities
  createAbility: false,
  editAbility (context) {
    return false
  },
  // Page abilities
  canCreate (user) {
    return false
  },
  canEdit (user, entity) {
    return false
  },
  canDelete (user, entity) {
    return false
  },

  titles: {
    entity: 'Клиент',
    entities: 'Клиенты'
  },
  apiPath: '/customer',
  getResourceEndpoint (id) {
    return `${this.apiPath}/${id}`
  },
  headers: [
    { text: 'ID', value: 'id' },
    { text: 'Фамилия', value: 'surname' },
    { text: 'Имя', value: 'first_name' },
    { text: 'Отчество', value: 'middle_name' },
    { text: 'Телефон', value: 'phone_number' },
    { text: 'E-mail', value: 'email' },
    // { text: 'Название', value: 'is_admin' }, // todo maybe
    { text: 'Добавлен', value: 'created_at' },
    { text: 'Изменен', value: 'updated_at' }
    // { text: 'Главное изображение', value: 'main_image', type: 'image' } // todo maybe
  ],
  editableFields: {
    surname: {
      label: 'Фамилия',
      fieldType: 'input',
      fieldParams: {
        required: true,
        type: 'text'
      }
    },
    first_name: {
      label: 'Имя',
      fieldType: 'input',
      fieldParams: {
        required: true,
        type: 'text'
      }
    },
    middle_name: {
      label: 'Отчество',
      fieldType: 'input',
      fieldParams: {
        required: true,
        type: 'text'
      }
    },
    phone_number: {
      label: 'Телефон',
      fieldType: 'input',
      fieldParams: {
        required: true,
        type: 'text'
      }
    },
    email: {
      label: 'E-mail',
      fieldType: 'input',
      fieldParams: {
        required: true,
        type: 'text'
      }
    },
    password: {
      label: 'Пароль',
      fieldType: 'password',
      confirmed: true,
      confirmationSuffix: '_confirmation', // this is default
      confirmationSuffixLabel: '(повтор)', // this is default
      fieldParams: {
        required: true,
        type: 'password'
      }
    }
    // main_image: {
    //   label: 'Главное изображение',
    //   fieldType: 'image',
    //   fieldParams: {}
    // }
  },
  // TODO validationContext as type (when rewrite on TypeScript)
  validations (validationContext = null) {
    const rules = {
      surname: {
        required
      },
      first_name: {
        required
      },
      middle_name: {

      },
      phone_number: {
        required
      },
      email: {
        required
      },
      password: {
        // required
      }
    }

    if (validationContext !== null && validationContext.pageType === 'create') {
      rules.password = {
        required
      }

      rules[`password${this.editableFields.password.confirmationSuffix}`] = {
        required,
        sameAsPassword: sameAs('password')
      }
    } else {
      rules[`password${this.editableFields.password.confirmationSuffix}`] = {}
    }

    return rules
  }
}

export default customer
