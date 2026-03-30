declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.scss';
declare module '*.css';

declare module 'swiper/css';
declare module 'swiper/css/bundle';
declare module 'swiper/css/*';
