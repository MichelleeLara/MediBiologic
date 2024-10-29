/* empty css                                 */
import { k as createComponent, l as renderTemplate, p as renderComponent, o as createAstro, m as maybeRenderHead, n as addAttribute } from './astro/server_D3GDgl8T.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$LanguageSelector, a as $$PreFooter, b as $$Footer, c as $$Layout } from './Footer_BeUbQKiu.mjs';
import { $ as $$Post } from './Post_jVJcQH6j.mjs';
/* empty css                                 */

const $$Astro = createAstro();
const $$DoctorRicardo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DoctorRicardo;
  const { currentLocale } = Astro2;
  const url = Astro2.url;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-jymykuwp": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", null, { "client:only": "react", "currentLocale": currentLocale, "url": url, "client:component-hydration": "only", "data-astro-cid-jymykuwp": true, "client:component-path": "@/components/NavBar.jsx", "client:component-export": "default" })} ${maybeRenderHead()}<main class="relative " data-astro-cid-jymykuwp> <div class="hidden lg:block fixed right-5 top-7 z-[100]" data-astro-cid-jymykuwp> ${renderComponent($$result2, "LanguageSelector", $$LanguageSelector, { "data-astro-cid-jymykuwp": true })} </div> <a href="#" class="absolute top-3 left-5 filter z-[5]" data-astro-cid-jymykuwp> <img src="/logo_medicaBio.svg" class="w-52" alt=""${addAttribute({ filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));" }, "style")} data-astro-cid-jymykuwp> </a> <section class="pt-40 h-min flex justify-center w-full" data-astro-cid-jymykuwp> <div class="w-full bg-[#13182f] pt-40  rounded-bl-[2.1rem] rounded-br-[2.1rem] min-h-72 max-h-72 top-0 absolute" data-astro-cid-jymykuwp></div> <div class=" mx-7 max-w-screen-xl b  flex flex-col md:flex-row  w-full relative top-[-2rem] gap-10" data-astro-cid-jymykuwp> <article class="flex flex-col items-center justify-center relative top-[0rem] w-full" data-astro-cid-jymykuwp> <div class="bg-[#1c73b7] h-40 z-[3] py-20 w-full rounded-tr-3xl rounded-tl-3xl relative overflow-hidden" data-astro-cid-jymykuwp> <img src="/single_cross.svg" alt="" class="absolute w-[20rem] top-[-11rem] opacity-5 left-[-4rem] " data-astro-cid-jymykuwp> <img src="/single_cross.svg" alt="" class="absolute w-[20rem] top-[1rem] opacity-5 right-[-5rem]" data-astro-cid-jymykuwp> <!-- <img src="/single_cross.svg" alt="" class="absolute w-[20rem] opacity-5 right-[35rem] top-[.3rem]"> --> </div> <div class="relative -top-28 bg-gray-100 pb-14 rounded-3xl w-full px-10 flex flex-col gap-4 " data-astro-cid-jymykuwp> <header class="flex flex-col items-center gap-5 md:flex-row md:items-end md:gap-5" data-astro-cid-jymykuwp> <div class="flex items-start justify-start h-full relative z-[5]" data-astro-cid-jymykuwp> <img src="/DrDueñas.svg" alt="" class="w-64 bg-gray-100 rounded-full  shadow-md  border-white border-[5px]" data-astro-cid-jymykuwp> </div> <div class="flex flex-col gap-4 items-start md:mt-32 w-full" data-astro-cid-jymykuwp> <h1 class="text-3xl font-semibold" data-astro-cid-jymykuwp>Dr. Ricardo Dueñas</h1> <div class="flex items-center justify-between w-full gap-10 " data-astro-cid-jymykuwp> <div class="py-1.5 px-5 rounded-full bg-tertiary bg-opacity-15 w-fit text-tertiary" data-astro-cid-jymykuwp>Meidco Cirujano</div> <div class="flex gap-4 items-center" data-astro-cid-jymykuwp> <div class=" border-[1px] border-tertiary rounded-full p-3 flex items-center justify-center" data-astro-cid-jymykuwp> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#1c73b7" fill="none" data-astro-cid-jymykuwp> <path d="M13 3C17.4183 3 21 6.58172 21 11M13.5 6.5C15.7091 6.5 17.5 8.29086 17.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jymykuwp></path> <path d="M9.15825 5.71223L8.7556 4.80625C8.49232 4.21388 8.36068 3.91768 8.1638 3.69101C7.91707 3.40694 7.59547 3.19794 7.23567 3.08785C6.94858 3 6.62446 3 5.97621 3C5.02791 3 4.55375 3 4.15573 3.18229C3.68687 3.39702 3.26343 3.86328 3.09473 4.3506C2.95151 4.76429 2.99253 5.18943 3.07458 6.0397C3.94791 15.0902 8.90981 20.0521 17.9603 20.9254C18.8106 21.0075 19.2357 21.0485 19.6494 20.9053C20.1367 20.7366 20.603 20.3131 20.8177 19.8443C21 19.4462 21 18.9721 21 18.0238C21 17.3755 21 17.0514 20.9122 16.7643C20.8021 16.4045 20.5931 16.0829 20.309 15.8362C20.0823 15.6393 19.7861 15.5077 19.1937 15.2444L18.2878 14.8417C17.6462 14.5566 17.3255 14.4141 16.9995 14.3831C16.6876 14.3534 16.3731 14.3972 16.0811 14.5109C15.776 14.6297 15.5063 14.8544 14.967 15.3038C14.4301 15.7512 14.1617 15.9749 13.8337 16.0947C13.543 16.2009 13.1586 16.2403 12.8523 16.1951C12.5069 16.1442 12.2423 16.0029 11.7133 15.7201C10.0672 14.8405 9.15953 13.9328 8.27986 12.2867C7.99714 11.7577 7.85578 11.4931 7.80487 11.1477C7.75974 10.8414 7.79908 10.457 7.9053 10.1663C8.02512 9.83828 8.24881 9.56986 8.69619 9.033C9.14562 8.49368 9.37034 8.22402 9.48915 7.91891C9.60285 7.62694 9.64661 7.3124 9.61694 7.00048C9.58594 6.67452 9.44338 6.35376 9.15825 5.71223Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-astro-cid-jymykuwp></path> </svg> </div> <div class="" data-astro-cid-jymykuwp> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="black" fill="black" data-astro-cid-jymykuwp> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" data-astro-cid-jymykuwp></path> </svg> </div> </div> </div> </div> </header> <hr class="w-full mt-8" data-astro-cid-jymykuwp> <h2 class="text-start text-2xl font-semibold" data-astro-cid-jymykuwp>Acerca de mi</h2> <p class="text-gray-700 text-balance" data-astro-cid-jymykuwp>Soy egresado de la carrera de Medicina de la Universidad Autónoma de Nuevo León (1984-1991) con más de 30 años de experiencia en medicina integrativa. Mi enfoque se centra en homotoxicología, homeopatía, medicina hiperbárica, inmunología y terapias con ozono. Me mantengo actualizado a través de diplomados, cursos, certificaciones y simposios, especialmente en el tratamiento de enfermedades crónico degenerativas.</p> <hr class="w-full mt-8" data-astro-cid-jymykuwp> <h2 class="text-start text-2xl font-semibold" data-astro-cid-jymykuwp>Experiencia</h2> <p class="text-gray-700 text-balance" data-astro-cid-jymykuwp>Soy egresado de la carrera de Medicina de la Universidad Autónoma de Nuevo León (1984-1991) con más de 30 años de experiencia en medicina integrativa.</p> <ul class="list-disc mx-10 text-gray-700" data-astro-cid-jymykuwp> <li data-astro-cid-jymykuwp>paps</li> <li data-astro-cid-jymykuwp>paps</li> <li data-astro-cid-jymykuwp>paps</li> </ul> <hr class="w-full mt-8" data-astro-cid-jymykuwp> <h2 class="text-start text-2xl font-semibold" data-astro-cid-jymykuwp>Credenciales</h2> <p class="text-gray-700 text-balance" data-astro-cid-jymykuwp>Soy egresado de la carrera de Medicina de la Universidad Autónoma de Nuevo León (1984-1991) con más de 30 años de experiencia en medicina integrativa.</p> <p class="text-gray-700 text-balance mt-10" data-astro-cid-jymykuwp>Permiso de cofrepris _ 11221</p> </div> </article> <article class="p-10 bg-[#f3f8ff] rounded-2xl flex flex-col gap-8 sticky top-[2rem] h-min md:max-w-[450px]" data-astro-cid-jymykuwp> <div class="" data-astro-cid-jymykuwp> <h3 class="text-xl font-semibold" data-astro-cid-jymykuwp>Más detalles</h3> <p class="mt-3 text-sm" data-astro-cid-jymykuwp>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id doloribus architecto non aspernatur, nisi obcaecati aliquam fuga exercitationem ipsam quisquam!</p> </div> <div class="flex flex-col gap-3" data-astro-cid-jymykuwp> <div class="flex gap-2 items-center text-xs font-semibold" data-astro-cid-jymykuwp> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#1c73b7" fill="none" data-astro-cid-jymykuwp> <path d="M9.1585 5.71223L8.75584 4.80625C8.49256 4.21388 8.36092 3.91768 8.16405 3.69101C7.91732 3.40694 7.59571 3.19794 7.23592 3.08785C6.94883 3 6.6247 3 5.97645 3C5.02815 3 4.554 3 4.15597 3.18229C3.68711 3.39702 3.26368 3.86328 3.09497 4.3506C2.95175 4.76429 2.99278 5.18943 3.07482 6.0397C3.94815 15.0902 8.91006 20.0521 17.9605 20.9254C18.8108 21.0075 19.236 21.0485 19.6496 20.9053C20.137 20.7366 20.6032 20.3131 20.818 19.8443C21.0002 19.4462 21.0002 18.9721 21.0002 18.0238C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8362C20.0826 15.6393 19.7864 15.5077 19.194 15.2444L18.288 14.8417C17.6465 14.5566 17.3257 14.4141 16.9998 14.3831C16.6878 14.3534 16.3733 14.3972 16.0813 14.5109C15.7762 14.6297 15.5066 14.8544 14.9672 15.3038C14.4304 15.7512 14.162 15.9749 13.834 16.0947C13.5432 16.2009 13.1588 16.2403 12.8526 16.1951C12.5071 16.1442 12.2426 16.0029 11.7135 15.7201C10.0675 14.8405 9.15977 13.9328 8.28011 12.2867C7.99738 11.7577 7.85602 11.4931 7.80511 11.1477C7.75998 10.8414 7.79932 10.457 7.90554 10.1663C8.02536 9.83828 8.24905 9.56986 8.69643 9.033C9.14586 8.49368 9.37058 8.22402 9.48939 7.91891C9.60309 7.62694 9.64686 7.3124 9.61719 7.00048C9.58618 6.67452 9.44362 6.35376 9.1585 5.71223Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-astro-cid-jymykuwp></path> </svg>
(664) 686-3177
</div> <div class="flex gap-2 items-center text-xs font-semibold" data-astro-cid-jymykuwp> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#1c73b7" fill="none" data-astro-cid-jymykuwp> <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" data-astro-cid-jymykuwp></path> <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" data-astro-cid-jymykuwp></path> </svg>
info@medibiologica.com
</div> <div class="flex gap-2 items-center text-xs font-semibold" data-astro-cid-jymykuwp> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#1c73b7" fill="none" data-astro-cid-jymykuwp> <path d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z" stroke="currentColor" stroke-width="1.5" data-astro-cid-jymykuwp></path> <path d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z" stroke="currentColor" stroke-width="1.5" data-astro-cid-jymykuwp></path> <path d="M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-astro-cid-jymykuwp></path> </svg>
Tijuana, Mex
</div> </div> </article> </div> </section> <section class="flex items-center justify-center w-full pb-32" data-astro-cid-jymykuwp> <div class="mx-7 max-w-screen-xl w-full flex flex-col gap-8" data-astro-cid-jymykuwp> <header data-astro-cid-jymykuwp> <h2 class="text-start text-3xl font-semibold" data-astro-cid-jymykuwp>Articulos escritos por Dr. Ricardo</h2> <a href="" data-astro-cid-jymykuwp>Ver todos los artículos</a> </header> <div class="grid gap-10 place-content-center md:grid-cols-2 lg:grid-cols-3" data-astro-cid-jymykuwp> ${renderComponent($$result2, "Post", $$Post, { "title": "Quelaci\xF3n: Soluci\xF3n Eficaz para Enfermedad Cardiovascular y Desintoxicaci\xF3n", "desc": "Tratamiento natural que mejora la salud arterial y elimina metales pesados del cuerpo.", "url": "/chelation.svg", "category": "Quelaci\xF3n", "date": "julio 22, 2023", "data-astro-cid-jymykuwp": true })} ${renderComponent($$result2, "Post", $$Post, { "title": "Tratamiento K-Laser Blue Derma: Innovaci\xF3n en Terapias Dermatol\xF3gicas", "desc": "Avanzada terapia l\xE1ser para mejorar diversas condiciones de la piel.", "url": "/derma.svg", "category": "Dematolog\xEDa", "date": "julio 22, 2023", "data-astro-cid-jymykuwp": true })} ${renderComponent($$result2, "Post", $$Post, { "title": "Tratamiento Biol\xF3gico Integral del C\xE1ncer: Desintoxicaci\xF3n, Nutrici\xF3n y Apoyo Emocional", "desc": "Enfoque integral que combina desintoxicaci\xF3n, nutrici\xF3n y apoyo emocional.", "url": "/biologicalTreatment.svg", "category": "Medicina Biol\xF3gica", "date": "julio 22, 2023", "data-astro-cid-jymykuwp": true })} </div> </div> </section> ${renderComponent($$result2, "PreFooter", $$PreFooter, { "data-astro-cid-jymykuwp": true })} ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-jymykuwp": true })} <!-- <img src="gout.svg" class="absolute w-[40rem] h-[80rem] opacity-25 top-[60rem] right-[-13.9rem] rotate-[9.4deg]" alt=""> --> <!-- <img src="/gout.svg" alt="" class="absolute top-[228rem] -z-[11] right-0 w-[66rem]">
		 --> </main> ` })} `;
}, "C:/Users/MichI/workspace/clients/mediBiologica/src/pages/en/doctorRicardo.astro", void 0);

const $$file = "C:/Users/MichI/workspace/clients/mediBiologica/src/pages/en/doctorRicardo.astro";
const $$url = "/en/doctorRicardo";

export { $$DoctorRicardo as default, $$file as file, $$url as url };
