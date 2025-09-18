import { useAccordionContext } from './Accordion.jsx';
import { useAccordionItemContext } from './AccordionItem.jsx';

export default function AccordionContent({ className, children }) {
  const { activeItemId } = useAccordionContext();
  const id = useAccordionItemContext();

  const isOpen = activeItemId === id;

  return (
    <div className={`${className ?? ''} ${isOpen ? 'open' : 'closed'}`}>
      { children }
    </div>
  );
}