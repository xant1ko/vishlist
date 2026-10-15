import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'system',

    themes: {
      light: {
        dark: false,

        colors: {
          // Основные цвета
          primary: '#D94835',
          secondary: '#F2C078',

          // Фон и поверхности
          background: '#FAF3E8',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-light': '#F5EBDD',
          'surface-variant': '#EDE0D0',
          'on-surface-variant': '#65564D',

          // Контрастный текст
          'on-primary': '#FFFFFF',
          'on-secondary': '#352B28',
          'on-background': '#352B28',
          'on-surface': '#352B28',

          // Границы
          outline: '#CDBFB1',
          'outline-variant': '#E5D9CC',

          // Статусы
          success: '#347653',
          'on-success': '#FFFFFF',

          warning: '#B7791F',
          'on-warning': '#FFFFFF',

          error: '#B42318',
          'on-error': '#FFFFFF',

          info: '#49758A',
          'on-info': '#FFFFFF',

          // Дополнительные цвета
          anchor: '#B83B2A',
          'inverse-surface': '#352B28',
          'inverse-on-surface': '#FAF3E8',
          'inverse-primary': '#F28B78',
        },
      },

      dark: {
        dark: true,

        colors: {
          // Основные цвета
          primary: '#F28B78',
          secondary: '#F2C078',

          // Фон и поверхности
          background: '#211C1A',
          surface: '#2B2421',
          'surface-bright': '#40332E',
          'surface-light': '#352B27',
          'surface-variant': '#51413A',
          'on-surface-variant': '#D1BFB4',

          // Контрастный текст
          'on-primary': '#35140F',
          'on-secondary': '#352B28',
          'on-background': '#F5EBDD',
          'on-surface': '#F5EBDD',

          // Границы
          outline: '#8C766A',
          'outline-variant': '#51413A',

          // Статусы
          success: '#8DD3A8',
          'on-success': '#163D28',

          warning: '#F2C078',
          'on-warning': '#35230A',

          error: '#FFB4AB',
          'on-error': '#690005',

          info: '#A4C9DB',
          'on-info': '#173747',

          // Дополнительные цвета
          anchor: '#F5A091',
          'inverse-surface': '#F5EBDD',
          'inverse-on-surface': '#352B28',
          'inverse-primary': '#D94835',
        },
      },
    },
  },

  defaults: {
    // Кнопки
    VBtn: {
      rounded: 'lg',
      elevation: 0,
    },

    // Карточки
    VCard: {
      rounded: 'lg',
      elevation: 0,
      border: true,
    },

    VCardTitle: {
      class: 'font-weight-bold',
    },

    // Поля ввода
    VTextField: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      density: 'comfortable',
      hideDetails: 'auto',
    },

    VTextarea: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      hideDetails: 'auto',
    },

    VSelect: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      hideDetails: 'auto',
    },

    VAutocomplete: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      hideDetails: 'auto',
    },

    VCombobox: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      hideDetails: 'auto',
    },

    VFileInput: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      hideDetails: 'auto',
    },

    VNumberInput: {
      variant: 'outlined',
      rounded: 'lg',
      color: 'primary',
      hideDetails: 'auto',
    },

    VCheckbox: {
      color: 'primary',
      hideDetails: 'auto',
    },

    VRadioGroup: {
      color: 'primary',
      hideDetails: 'auto',
    },

    VRadio: {
      color: 'primary',
    },

    VSwitch: {
      color: 'primary',
      hideDetails: 'auto',
    },

    VSlider: {
      color: 'primary',
      trackColor: 'surface-variant',
    },

    // Чипы и статусы
    VChip: {
      rounded: 'lg',
    },

    VBadge: {
      color: 'primary',
    },

    VAlert: {
      rounded: 'lg',
    },

    // Таблицы
    VTable: {
      density: 'comfortable',
    },

    VDataTable: {
      density: 'comfortable',
    },

    // Навигация
    VAppBar: {
      elevation: 0,
      color: 'surface',
    },

    VNavigationDrawer: {
      color: 'surface',
      elevation: 0,
    },

    VList: {
      bgColor: 'transparent',
      nav: true,
    },

    VListItem: {
      rounded: 'lg',
      color: 'primary',
    },

    VTabs: {
      color: 'primary',
    },

    VTab: {
      rounded: 'lg',
    },

    VBottomNavigation: {
      color: 'primary',
      elevation: 0,
    },

    VBreadcrumbs: {
      color: 'on-surface-variant',
    },

    // Диалоги и меню
    VDialog: {
      maxWidth: 600,
    },

    VMenu: {
      rounded: 'lg',
    },

    VTooltip: {
      color: 'inverse-surface',
    },

    VSnackbar: {
      rounded: 'lg',
    },

    // Индикаторы загрузки
    VProgressLinear: {
      color: 'primary',
      rounded: true,
    },

    VProgressCircular: {
      color: 'primary',
    },

    // Пагинация
    VPagination: {
      rounded: 'lg',
      activeColor: 'primary',
    },

    // Раскрывающиеся панели
    VExpansionPanels: {
      rounded: 'lg',
    },

    VExpansionPanel: {
      rounded: 'lg',
      elevation: 0,
    },

    // Пошаговые сценарии
    VStepper: {
      color: 'primary',
    },

    // Переключатели
    VBtnToggle: {
      rounded: 'lg',
      color: 'primary',
    },

    VSegmentedButton: {
      color: 'primary',
    },

    // Календарь
    VDatePicker: {
      color: 'primary',
    },

    VTimePicker: {
      color: 'primary',
    },
  },
})

export default vuetify
