import { throttle } from '@pacote/throttle'
import { addClass, removeClass } from './element'

const CLASS_FULLY_SCROLLED = 'is-fully-scrolled'

const scrollHandler = (popover: HTMLElement) => (event: WheelEvent) => {
  const content = event.currentTarget as HTMLElement | null
  const delta = -event.deltaY

  if (delta > 0) {
    removeClass(popover, CLASS_FULLY_SCROLLED)
  }

  if (content) {
    const isOverflowing = content.scrollHeight > content.clientHeight;

    if (!isOverflowing) {
      // If content fits, no need for scroll
      popover.style.maxHeight = 'auto';
      removeClass(popover, CLASS_FULLY_SCROLLED);
    } else {
      // Dynamically scale the popover's maxHeight to fit its content without overflow
      const marginSize = 20;  // Add margin around the content
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - marginSize * 2;
      const contentHeight = Math.min(content.scrollHeight, availableHeight);

      // Inside your scrollHandler function
      popover.style.maxHeight = `${Math.min(content.scrollHeight, window.innerHeight * 0.9)}px`;

    }

    // Manage the scrolling behavior if content is too long
    if (delta <= 0 && delta < content.clientHeight + content.scrollTop - content.scrollHeight) {
      addClass(popover, CLASS_FULLY_SCROLLED)
    }
  }
}

export function bindScrollHandler(
  content: HTMLElement,
  popover: HTMLElement,
): void {
  content.addEventListener('wheel', throttle(scrollHandler(popover), 16))
}
