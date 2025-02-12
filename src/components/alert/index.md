# Alert

The <code>&lt;ui-alert&gt;</code> component provides contextual feedback messages, keeping users informed of important and sometimes time-sensitive changes.

<script setup>
import './alert';
</script>

## Examples

<div class="p-8 bg-preview flex flex-col gap-4 justify-center rounded-2xl">
  <ui-alert variant="success">
    <svg slot="icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    <div slot="heading">Success</div>
    <div slot="message">Operation completed successfully.</div>
  </ui-alert>
  <ui-alert variant="error">
    <svg slot="icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
    <div slot="heading">Error</div>
    <div slot="message">Something went wrong.</div>
  </ui-alert>
  <ui-alert variant="warning">
    <svg slot="icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
    <div slot="heading">Warning</div>
    <div slot="message">Please be cautious.</div>
  </ui-alert>
  <ui-alert variant="info">
    <svg slot="icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
    <div slot="heading">Status</div>
    <div slot="message">Here is some important information.</div>
  </ui-alert>
</div>
