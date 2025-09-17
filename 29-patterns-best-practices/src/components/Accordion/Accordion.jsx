import { createContext, useContext, useState } from 'react';

const AccordionContext = createContext();

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('useAccordionContext must be used within an AccordionContext Provider');
  }

  return context;
}

export default function Accordion({ className, children }) {
  const [ activeItemId, setActiveItemId ] = useState(null);

  function openItem(id) {
    setActiveItemId(id);
  }

  function closeItem() {
    setActiveItemId(null);
  }

  const contextValue = {
    activeItemId,
    openItem,
    closeItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>
        { children }
      </ul>
    </AccordionContext.Provider>
  );
}