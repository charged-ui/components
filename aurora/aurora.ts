import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import './aurora.css';

export type AuroraProps = {
  showRadialGradient?: boolean;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-bg-aurora')
export class AuroraBackground extends LitElement {
  @property({ type: Boolean })
  showRadialGradient = true;

  static styles = css`
    /* ── Design tokens ───────────────────────────────────────────────────────── */
    /*
     * The aurora effect is a layered illusion:
     *   1. A diagonal "blend stripe" creates the streaked banding
     *   2. A color gradient sits underneath providing the hue variation
     *   3. An animated ::after copy + mix-blend-mode: difference creates
     *      the iridescent shimmer as positions shift
     *
     * The blend stripe stays white in BOTH modes — only --aurora-filter and
     * the color palette swap. This preserves the difference-blend shimmer
     * (a black stripe would flatten the effect to a simple inversion).
     */
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--aurora-background);
      color: var(--aurora-foreground);
      transition:
        background-color 0.3s ease,
        color 0.3s ease;

      /* Background / foreground (Tailwind 4 zinc / slate scale) */
      --aurora-background: rgb(250, 250, 250);
      --aurora-foreground: rgb(2, 6, 23);

      /* Aurora gradient colors — light mode (cool blues + violet pastels) */
      --aurora-color-1: var(--color-blue-500, rgba(59, 130, 246, 1));
      --aurora-color-2: var(--color-indigo-300, rgba(165, 180, 252, 1));
      --aurora-color-3: var(--color-blue-300, rgba(147, 197, 253, 1));
      --aurora-color-4: var(--color-violet-200, rgba(221, 214, 254, 1));
      --aurora-color-5: var(--color-blue-400, rgba(96, 165, 250, 1));

      /* Effect parameters — also overridable per consumer */
      --aurora-opacity: 0.5;
      --aurora-blur: 10px;
      --aurora-filter: blur(var(--aurora-blur)) invert(1);

      /*
       * Stripe + blend mode work as a pair:
       *  • Light: opaque white stripe + difference → iridescent pastels
       *    (the white-stripe-after-invert becomes a black banded mask whose
       *     difference against the animated copy creates the shimmer)
       *  • Dark: hidden stripe + screen → colors glow additively on the
       *    dark bg, exposing the actual blue/indigo/violet hues
       */
      --aurora-stripe-opacity: 1;
      --aurora-blend-mode: difference;
    }

    /* TODO: Re-enable dark mode — media query block disabled
    @media (prefers-color-scheme: dark) {
      :host {
        --aurora-background: rgb(2, 6, 23);
        --aurora-foreground: rgb(248, 250, 252);
        --aurora-color-1: var(--color-blue-800, rgba(30, 64, 175, 1));
        --aurora-color-2: var(--color-indigo-600, rgba(79, 70, 229, 1));
        --aurora-color-3: var(--color-blue-600, rgba(37, 99, 235, 1));
        --aurora-color-4: var(--color-violet-500, rgba(139, 92, 246, 1));
        --aurora-color-5: var(--color-blue-700, rgba(29, 78, 216, 1));
        --aurora-opacity: 0.7;
        --aurora-blur: 18px;
        --aurora-filter: blur(var(--aurora-blur));
        --aurora-stripe-opacity: 0;
        --aurora-blend-mode: screen;
      }
    }
    end TODO */

    /* TODO: Re-enable dark mode — class-based block disabled
    :host-context(.dark),
    :host(.dark) {
      --aurora-background: rgb(2, 6, 23);
      --aurora-foreground: rgb(248, 250, 252);
      --aurora-color-1: var(--color-blue-800, rgba(30, 64, 175, 1));
      --aurora-color-2: var(--color-indigo-600, rgba(79, 70, 229, 1));
      --aurora-color-3: var(--color-blue-600, rgba(37, 99, 235, 1));
      --aurora-color-4: var(--color-violet-500, rgba(139, 92, 246, 1));
      --aurora-color-5: var(--color-blue-700, rgba(29, 78, 216, 1));
      --aurora-opacity: 0.7;
      --aurora-blur: 18px;
      --aurora-filter: blur(var(--aurora-blur));
      --aurora-stripe-opacity: 0;
      --aurora-blend-mode: screen;
    }
    end TODO */

    /* ── Layout ───────────────────────────────────────────────────────────────── */
    .aurora-overlay {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    /* ── Aurora effect ────────────────────────────────────────────────────────── */
    .aurora-effect {
      /*
       * Stripe is fully white in light mode (gets inverted to a black
       * banded mask via filter:invert(1)). In dark mode --aurora-stripe-opacity
       * goes to 0 so this layer disappears, leaving only the colored gradient
       * to glow additively via mix-blend-mode: screen.
       */
      /*
       * Gap stops use transparent BLACK (not transparent white) — gradient
       * interpolation in sRGB passes through gray between an opaque white
       * stop and rgba(0,0,0,0), which is what the original light-mode look
       * relied on. Switching to rgba(255,255,255,0) would fade cleanly
       * through white and visibly soften the banding after invert+difference.
       * In dark mode the stripe layer is fully transparent (stripe-opacity 0)
       * so this stop's color doesn't matter there.
       */
      --_blend-stripe: repeating-linear-gradient(
        100deg,
        rgba(255, 255, 255, var(--aurora-stripe-opacity)) 0%,
        rgba(255, 255, 255, var(--aurora-stripe-opacity)) 7%,
        rgba(0, 0, 0, 0) 10%,
        rgba(0, 0, 0, 0) 12%,
        rgba(255, 255, 255, var(--aurora-stripe-opacity)) 16%
      );
      --_aurora: repeating-linear-gradient(
        100deg,
        var(--aurora-color-1) 10%,
        var(--aurora-color-2) 15%,
        var(--aurora-color-3) 20%,
        var(--aurora-color-4) 25%,
        var(--aurora-color-5) 30%
      );

      position: absolute;
      inset: 0px;
      overflow: hidden;
      opacity: var(--aurora-opacity);
      pointer-events: none;
      will-change: transform;
      filter: var(--aurora-filter);
      background-image: var(--_blend-stripe), var(--_aurora);
      background-size: 300%, 200%;
      background-position:
        50% 50%,
        50% 50%;
      transition:
        opacity 0.3s ease,
        filter 0.3s ease;
    }

    .aurora-effect::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--_blend-stripe), var(--_aurora);
      background-size: 200%, 100%;
      background-attachment: fixed;
      mix-blend-mode: var(--aurora-blend-mode);
      animation: aurora 60s linear infinite;
    }

    .radial-mask {
      mask-image: radial-gradient(
        ellipse at 100% 0%,
        black 10%,
        rgba(0, 0, 0, 0) 70%
      );
      -webkit-mask-image: radial-gradient(
        ellipse at 100% 0%,
        black 10%,
        rgba(0, 0, 0, 0) 70%
      );
    }

    @keyframes aurora {
      0% {
        background-position:
          0% 0%,
          0% 0%;
      }
      50% {
        background-position:
          100% 100%,
          100% 100%;
      }
      100% {
        background-position:
          0% 0%,
          0% 0%;
      }
    }

    .content-slot {
      position: relative;
      z-index: 1;
    }
  `;

  render() {
    return html`
      <div class="aurora-overlay">
        <div
          class="aurora-effect ${this.showRadialGradient ? 'radial-mask' : ''}"
        ></div>
      </div>
      <div class="content-slot">
        <slot></slot>
      </div>
    `;
  }
}
