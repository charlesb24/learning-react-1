import { useAccordionContext } from './Accordion.jsx';

export default function AccordionItem({ id, title, className, children }) {
  const { activeItemId, openItem, closeItem } = useAccordionContext();

  const isOpen = activeItemId === id;

  function handleClick() {
    if (isOpen) {
      closeItem();
    } else {
      openItem(id);
    }
  }

  return (
    <li className={className}>
      <h3 className="accordion-item-title" onClick={handleClick}>{ title }</h3>
      <div className={`accordion-item-content ${isOpen ? 'open' : ''}`}>{ children }</div>
    </li>
  );
}