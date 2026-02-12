// Rutas: effects → LNTM; sounds → canciones; images → captcha (1–9) y carrusel (10+)

const config = {
  recaptchaSound: '/effects/LNTM.mp3',
  acceptSound: '/sounds/Cambiando_De_Color.mp3',
  name: 'San Valentín',
  recipientName: 'Dolo',
  loveMessage: '¿Queres ser mi San Valentín? 💛',
}

const captchaImages = [
  { id: 1, src: '/images/img-1.jpg', alt: 'Captcha 1' },
  { id: 2, src: '/images/img-2.JPG', alt: 'Captcha 2' },
  { id: 3, src: '/images/img-3.jpg', alt: 'Captcha 3' },
  { id: 4, src: '/images/img-4.jpg', alt: 'Captcha 4' },
  { id: 5, src: '/images/img-5.JPG', alt: 'Captcha 5' },
  { id: 6, src: '/images/img-6.jpg', alt: 'Captcha 6' },
  { id: 7, src: '/images/img-7.jpg', alt: 'Captcha 7' },
  { id: 8, src: '/images/img-8.jpg', alt: 'Captcha 8' },
  { id: 9, src: '/images/img-9.jpg', alt: 'Captcha 9' },
]

const carouselImages = [
  { id: 'c1', src: '/images/img-1.jpg', alt: 'Recuerdo 1' },
  { id: 'c2', src: '/images/img-2.JPG', alt: 'Recuerdo 2' },
  { id: 'c3', src: '/images/img-3.jpg', alt: 'Recuerdo 3' },
  { id: 'c4', src: '/images/img-4.jpg', alt: 'Recuerdo 4' },
  { id: 'c5', src: '/images/img-5.JPG', alt: 'Recuerdo 5' },
  { id: 'c6', src: '/images/img-6.jpg', alt: 'Recuerdo 6' },
  { id: 'c7', src: '/images/img-7.jpg', alt: 'Recuerdo 7' },
  { id: 'c8', src: '/images/img-8.jpg', alt: 'Recuerdo 8' },
  { id: 'c9', src: '/images/img-9.jpg', alt: 'Recuerdo 9' },
  { id: 'c10', src: '/images/img-10.jpg', alt: 'Recuerdo 10' },
  { id: 'c12', src: '/images/img-12.jpg', alt: 'Recuerdo 12' },
  { id: 'c13', src: '/images/img-13.jpg', alt: 'Recuerdo 13' },
  { id: 'c14', src: '/images/img-14.jpg', alt: 'Recuerdo 14' },
  { id: 'c15', src: '/images/img-15.jpg', alt: 'Recuerdo 15' },
  { id: 'c16', src: '/images/img-16.jpg', alt: 'Recuerdo 16' },
  { id: 'c17', src: '/images/img-17.jpg', alt: 'Recuerdo 17' },
  { id: 'c18', src: '/images/img-18.jpg', alt: 'Recuerdo 18' },
  { id: 'c19', src: '/images/img-19.JPG', alt: 'Recuerdo 19' },
  { id: 'c20', src: '/images/img-20.jpg', alt: 'Recuerdo 20' },
]

const playlist = [
  { src: '/sounds/Cambiando_De_Color.mp3', title: 'Cambiando de color' },
  { src: '/sounds/Terminales.mp3', title: 'Terminales' },
  { src: '/sounds/Coleccionando_Cicatrices.mp3', title: 'Coleccionando cicatrices' },
  { src: '/sounds/Lo_Nuestro_Tiene_Magia.mp3', title: 'Lo nuestro tiene magia' },
  { src: '/sounds/A_Mil.mp3', title: 'A Mil' },
  { src: '/sounds/El_Trato.mp3', title: 'El trato' },
  { src: '/sounds/Juntos.mp3', title: 'Juntos' },
  { src: '/sounds/La_ultima_carta.mp3', title: 'La última carta' },
]

export { config, captchaImages, carouselImages, playlist }
