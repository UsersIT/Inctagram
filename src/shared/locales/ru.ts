export const ru = {
  buttons: {
    back: 'Вернуться назад',
    backToSignIn: 'Вернуться ко входу',
    backToSignUp: 'Вернуться к регистрации',
    closeSearchFieldIcon: 'Удалить введённый поисковый запрос',
    expandMenu: 'Развернуть меню',
    eyeIcon: 'Скрыть введённый пароль',
    eyeOffIcon: 'Показать введённый пароль',
    imageUploader: 'Загрузить с компьютера',
    languageSelection: 'Выбор языка',
    login: 'Войти',
    logout: 'Выйти',
    openMenu: 'Открыть меню',
    resendLink: 'Отправить повторно',
    save: 'Сохранить',
    sendLink: 'Отправить ссылку',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
  },
  calendar: {
    months: {
      april: 'Апрель',
      august: 'Август',
      december: 'Декабрь',
      february: 'Февраль',
      january: 'Январь',
      july: 'Июль',
      june: 'Июнь',
      march: 'Март',
      may: 'Май',
      november: 'Ноябрь',
      october: 'Октябрь',
      september: 'Сентябрь',
    },
    weekDays: {
      fr: 'Пт',
      mo: 'Пн',
      sa: 'Сб',
      su: 'Вс',
      th: 'Вт',
      tu: 'Чт',
      we: 'Ср',
    },
  },
  errors: {
    characterLimit: 'Достигнуто максимальное количество символов',
    errorWord: 'Ошибка!',
    imageSize: (imageSizeInMB: number) =>
      `Размер фотографии должен быть меньше ${imageSizeInMB} MB!`,
    imageType: 'Формат загруженной фотографии должен быть PNG или JPEG',
    somethingWentWrong:
      'Что-то пошло не так. Пожалуйста, проверьте Ваше интернет-соединение и попробуйте снова.',
  },
  label: {
    city: 'Введите Ваш город',
    email: 'Электронная почта',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    username: 'Имя пользователя',
  },
  navigation: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    messenger: 'Мессенджер',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    settings: 'Настройки',
    statistics: 'Статистика',
  },
  pages: {
    createNewPassword: {
      instruction: 'Пароль должен содержать от 6ти до 20ти символов',
      title: 'Создайте новый пароль',
    },
    forgotPassword: {
      iMNotRobot: 'Я не робот',
      instruction: 'Введите свой email адрес, и мы вышлем вам дальнейшею инструкцию',
      invalidEmail: 'Некорректный адрес почты',
      nonEmpty: 'Введите электронную почту',
      title: 'Забыли пароль',
    },
    policies: {
      policy: {
        childrenText: 'Наш Сервис не предназначен для лиц младше 13 лет ("Дети").',
        childrenTitle: 'Конфиденциальность детей',
        cookieText:
          'Мы не используем файлы cookie для отслеживания вашей активности на нашем Сервисе.',
        cookieTitle: 'Файлы cookie',
        infoText: 'Мы не собираем никакую персональную информацию от пользователей нашего Сервиса.',
        infoTitle: 'Сбор и использование информации',
        logText: 'Мы не собираем никаких данных журнала, когда вы используете Сервис.',
        logTitle: 'Данные журнала',
        providersText:
          'Мы не привлекаем компании и частных лиц для оказания услуг по облегчению нашего Сервиса.',
        providersTitle: 'Поставщики услуг',
        securityText:
          'Мы не храним и не передаем персональную информацию, поэтому мы не применяем меры безопасности для защиты ваших данных.',
        securityTitle: 'Безопасность',
        title: 'Политика конфиденциальности',
        welcomeText: `<1>Picthentic ("мы", "наш", или "наши") управляет веб-сайтом и мобильным приложением Picthentic («Сервис»).</1><2>Эта страница информирует вас о наших политиках в отношении сбора, использования и раскрытия личной информации при использовании нашего Сервиса и о выборах, которые вы связываете с этими данными.</2><3>Мы используем ваши данные для предоставления и улучшения Сервиса. Используя Сервис, вы соглашаетесь на сбор и использование информации в соответствии с этой политикой. За исключением случаев, определенных иначе в этой Политике конфиденциальности, термины, используемые в этой Политике конфиденциальности, имеют те же значения, что и в наших Условиях использования.</3>`,
      },
      terms: {
        accountsText: `<1>При создании учетной записи с нами вы обязаны предоставить нам точную, полную и актуальную информацию на протяжении всего времени. Невыполнение этого требования составляет нарушение Условий, которое может привести к немедленному прекращению вашей учетной записи в нашем Сервисе.</1><2>Вы несете ответственность за защиту пароля, который вы используете для доступа к Сервису, и за любые действия или операции, производимые с помощью вашего пароля, независимо от того, был ли пароль получен от нас или от третьей стороны.</2><3>Вы обязуетесь не раскрывать свой пароль третьим лицам. Вы обязуетесь уведомить нас немедленно после узнавания о любом нарушении безопасности или несанкционированном использовании вашей учетной записи.</3>`,
        accountsTitle: 'Учетные записи',
        contentText: `<1>Наш Сервис позволяет вам размещать, ссылаться, хранить, делиться и иным образом предоставлять определенную информацию, текст, графику, видео или другие материалы ("Контент"). Вы несете ответственность за Контент, который вы размещаете на Сервисе, включая его законность, надежность и соответствие.</1><2>Размещая Контент на Сервисе, вы подтверждаете и гарантируете, что: (i) Контент принадлежит вам (вы владеете им) и/или у вас есть право использовать его и право предоставить нам права и лицензию, предусмотренные настоящими Условиями, и (ii) размещение вашего Контента на Сервисе не нарушает права конфиденциальности, права на образ жизни, авторские права, контрактные права или какие-либо другие права любого лица или организации. Мы оставляем за собой право прекратить учетную запись любого пользователя, нарушающего авторские права.</2><3>Вы сохраняете все свои права на любой размещенный вами Контент и несете ответственность за защиту этих прав. Мы не несем ответственности за Контент, который вы или любое третье лицо размещаете на Сервисе. Однако, размещая Контент с использованием Сервиса, вы предоставляете нам право и лицензию на использование, изменение, публичное исполнение, публичное показ и распространение такого Контента через Сервис. Вы соглашаетесь, что эта лицензия включает в себя право для нас предоставлять ваш Контент другим пользователям Сервиса, которые также могут использовать ваш Контент в соответствии с этими Условиями.</3>`,
        contentTitle: 'Контент',
        linksText: `<1>Наш Сервис может содержать ссылки на веб-сайты или услуги третьих лиц, которые не принадлежат или не контролируются Picthentic.</1><2>Picthentic не имеет контроля над содержанием, политикой конфиденциальности или практиками любых веб-сайтов или услуг третьих лиц. Вы дополнительно признаете и соглашаетесь с тем, что Picthentic не несет ответственности непосредственно или косвенно за любой ущерб или убытки, вызванные или предполагаемые вызванными использованием или доверием к такому контенту, товарам или услугам, доступным на или через любые такие веб-сайты или услуги.</2><3>Мы настоятельно рекомендуем вам прочитать условия использования и политику конфиденциальности любых веб-сайтов или услуг третьих лиц, которые вы посещаете.</3>`,
        linksTitle: 'Ссылки на другие веб-сайты',
        terminationText: `<1>Мы можем немедленно прекратить или приостановить доступ к нашему Сервису по любой причине, включая, но не ограничиваясь, нарушением Условий.</1><2>Все положения Условий, которые по своей природе должны выжить после прекращения, сохраняют свое действие после прекращения, включая, без ограничений, положения об обладании, отказ от гарантий, индемнизации и ограничений ответственности.</2><3>Мы можем немедленно прекратить или приостановить вашу учетную запись по любой причине, включая, но не ограничиваясь, нарушением Условий.</3><4>После прекращения вашего права на использование Сервиса немедленно прекращается. Если вы хотите прекратить свою учетную запись, вы можете просто прекратить использование Сервиса.</4>`,
        terminationTitle: 'Прекращение',
        title: 'Условия использования',
        welcomeText: `<1>Добро пожаловать в Picthentic!</1><2>Пожалуйста, внимательно прочтите эти условия использования ("Условия", "Пользовательское соглашение") перед использованием веб-сайта и мобильного приложения Picthentic («Сервис»), управляемого компанией Picthentic ("мы", "нас" или "наш").</2><3>Доступ к и использование Сервиса подразумевает ваше согласие с данными Условиями. Эти Условия применяются ко всем посетителям, пользователям и другим лицам, которые получают доступ к Сервису или используют его.</3><4>Используя или получая доступ к Сервису, вы соглашаетесь соблюдать эти Условия. Если вы не согласны с какой-либо частью условий, вы не можете получать доступ к Сервису.</4>`,
      },
    },
    registration: {
      form: {
        agreementText:
          'Я соглашаюсь с <1>Условиями использования</1> и <2>Политикой конфиденциальности</2>',
      },
      modal: {
        text: 'Мы отправили письмо со ссылкой для подтверждения Вашей электронной почты на',
        title: 'Письмо отправлено',
      },
      signInSuggestion: 'Уже есть аккаунт?',
      title: 'Создание аккаунта',
    },
    registrationConfirmation: {
      errorMessage: 'Электронная почта недействительна или уже подтверждена',
      successText: 'Ваш email подтвержден',
      successTitle: 'Поздравляем!',
      warningText:
        'Похоже, срок действия ссылки для проверки истек. Не волнуйтесь, мы можем отправить ссылку снова',
      warningTitle: 'Срок действия ссылки для проверки email истек',
    },
    signIn: {
      forgotPassword: 'Забыли пароль?',
      metaDescription:
        'Войдите в свою учетную запись, чтобы получить доступ к персонализированным функциям и контенту.',
      metaTitle: 'Войти',
      signUpSuggestion: 'У вас нет аккаунта?',
      title: 'Войти',
    },
  },
  placeholders: {
    city: 'Город',
    email: 'email@picthentic.online',
    password: '**********',
  },
  profile: {
    addProfilePhoto: 'Добавить фотографию профиля',
    deletePhoto: 'Удалить фото',
    deleteProfilePhoto: 'Вы уверены, что хотите удалить фотографию профиля?',
    logOutConfirmation: 'Вы действительно хотите выйти из своей учетной записи',
  },
  validation: {
    ageRestriction: 'Пользователь младше 13 лет не может создать профиль.',
    cityNotFound: 'Город не найден.',
    cityQuery: 'Пожалуйста, введите валидное название города.',
    emailExists: 'Пользователь с таким email уже зарегистрирован',
    emailFormat: 'Email должен соответствовать формату example@example.com',
    emailVerification: 'Недействительный адрес электронной почты',
    invalidCredentials: 'Введенные email или пароль неверны. Пожалуйста, попробуйте еще раз',
    maxLength: (len: number) => `Максимальное количество символов ${len}`,
    minLength: (len: number) => `Минимальное количество символов ${len}`,
    passwordConfirmation: 'Пароли должны совпадать',
    passwordVerification:
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ ',
    required: 'Обязательное поле',
    userExist: 'Пользователя с этим email не существует',
    userNameVerification: 'Имя пользователя может содержать 0-9, a-z, A-Z, _, -',
    usernameExists: 'Пользователь с таким именем пользователя уже зарегистрирован',
  },
  widgets: {
    linkExpiredLayout: {
      text: 'Похоже, срок действия ссылки для проверки истек. Не волнуйтесь, мы можем отправить ссылку снова',
      title: 'Срок действия ссылки для проверки email истек',
    },
  },
}
export type LocaleType = typeof ru
