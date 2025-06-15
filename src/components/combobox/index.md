# Combobox

The <code>&lt;ui-alert&gt;</code> component provides contextual feedback messages, keeping users informed of important and sometimes time-sensitive changes.

<script setup>
import './combobox';
import '../icon/icon';
</script>

## Examples

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl padding-8">
      <ui-combobox placeholder="Search or use commands">
        <!-- Option items are provided as children -->
        <li
          id="option-1"
          class="flex items-center p-3 gap-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-blue-500"
          role="option"
          aria-selected="false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <path d="M3 12l3 3l3 -3l-3 -3z"></path>
            <path d="M15 12l3 3l3 -3l-3 -3z"></path>
            <path d="M9 6l3 3l3 -3l-3 -3z"></path>
            <path d="M9 18l3 3l3 -3l-3 -3z"></path>
          </svg>
          Search projects
        </li>
        <li
          id="option-2"
          class="flex items-center p-3 gap-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-blue-500"
          role="option"
          aria-selected="false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
          Create a new project
        </li>
        <li
          id="option-3"
          class="flex items-center p-3 gap-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-blue-500"
          role="option"
          aria-selected="false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
            <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
            <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
          </svg>
          Search team
        </li>
      </ui-combobox>
</div>

## Code

```html
<ui-alert variant="success">
  <ui-icon slot="icon" name="check-circle" />
  <div slot="heading">Success</div>
  <div slot="message">Operation completed successfully.</div>
</ui-alert>
<ui-alert variant="error">
  <ui-icon slot="icon" name="exclamation-circle" />
  <div slot="heading">Error</div>
  <div slot="message">Something went wrong.</div>
</ui-alert>
<ui-alert variant="warning">
  <ui-icon slot="icon" name="exclamation-triangle" />
  <div slot="heading">Warning</div>
  <div slot="message">Please be cautious.</div>
</ui-alert>
<ui-alert variant="info">
  <ui-icon slot="icon" name="information-circle" />
  <div slot="heading">Status</div>
  <div slot="message">Here is some important information.</div>
</ui-alert>
```
