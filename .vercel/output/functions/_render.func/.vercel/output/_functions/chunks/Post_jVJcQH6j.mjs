import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, o as createAstro } from './astro/server_D3GDgl8T.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$Post = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Post;
  const { title, desc, date, category, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="shadow-lg w-fit rounded-xl"> <img${addAttribute(url, "src")} alt="" class=" w-full rounded-tl-xl rounded-tr-xl"> <div class="p-6 flex gap-2 flex-col"> <h2 class="font-semibold text-lg min-h-[84px]">${title}</h2> <p class="text-gray-700 text-sm text-wrap">${desc}</p> <div class="flex gap-3 items-center mt-4"> <div class="py-0.5 px-2.5 text-sm rounded-xl bg-tertiary bg-opacity-15 w-fit text-tertiary">${category}</div> <p class="text-xs font-medium">${date}</p> </div> </div> </article>`;
}, "C:/Users/MichI/workspace/clients/mediBiologica/src/components/Post.astro", void 0);

export { $$Post as $ };
