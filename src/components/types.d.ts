declare global {
  interface HTMLElementTagNameMap {
    'ui-alert': import('./alert/alert').UIAlert;
    'ui-bg-meteors': import('./meteors/meteors').MeteorsComponent;
    'ui-bg-dots': import('./dots/dots').DotsBackground;
    'ui-bg-ripple': import('./ripple/ripple').RippleBackground;
    'ui-modal': import('./modal/modal').UIModal;
    'ui-combobox': import('./combobox/combobox').UICombobox;
  }
}

export {}; // Make this a module
