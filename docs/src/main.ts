import './style.css'
import logoSvg from './assets/wordmark.svg';
import '@charged-ui/accordion';
import '@charged-ui/disclosure';
import '@charged-ui/navbar';

import { accordion } from './components/accordion';
import { navbar } from './components/navbar';
import { tabs } from './components/tabs';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="border-b px-8 py-4 bg-white">
    <img src="${logoSvg}" class="h-8" />
  </header>
  <main class="flex flex-1 overflow-hidden">
    <div class="w-[320px] p-8 border-r bg-neutral-50">
      <nav class="flex flex-col gap-3 font-medium text-sm mb-6">
        <div>Overview</div>
        <ul class="text-gray-500 flex flex-col -mx-2">
          <li class="p-2 bg-neutral-200 rounded-lg">
            Introduction
          </li>
          <li class="p-2">
            Get Started
          </li>
          <li class="p-2">
            Releases
          </li>
        </ul>
      </nav>
      <nav class="flex flex-col gap-3 font-medium text-sm">
        <div>Components</div>
        <ul class="text-gray-500 flex flex-col -mx-2">
          <li class="p-2">Accordion</li>
          <li class="p-2">Alert</li>
          <li class="p-2">Disclosure</li>
          <li class="p-2">Drawer</li>
          <li class="p-2">Navbar</li>
          <li class="p-2">Progress</li>
          <li class="p-2">Tabs</li>
        </ul>
      </nav>
    </div>
    <div class="flex flex-1 overflow-auto">
      <div class="max-w-screen-md w-full mx-auto p-8 flex flex-col gap-8">
        ${accordion}
        ${navbar}
        ${tabs}
      </div>
      <div class="w-[320px] p-8 sticky top-0 ">
        <div class="text-sm font-medium">Quick Navigation
        </div>
      </div>
    </div>
  </main>
`;

// <div class="w-[320px] p-8">
// Navigation
// </div>