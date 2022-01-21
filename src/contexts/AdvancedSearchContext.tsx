import { createContext, ReactNode, useState } from 'react'

interface AdvancedSearchContextData {
  // doSomething(): Promise<void>;
  isAdvancedSearchModalOpen: boolean;
  handleOpenAdvancedSearchModal(): void;
  handleCloseAdvancedSearchModal(): void;
  // info: Info | undefined;
}

interface AdvancedSearchProviderProps {
  children: ReactNode;
}

export const AdvancedSearchContext = createContext(
  {} as AdvancedSearchContextData
)

export function AdvancedSearchProvider ({
  children
}: AdvancedSearchProviderProps) {
  // const [info, setInfo] = useState<Info>()
  const [isAdvancedSearchModalOpen, setIsAdvancedSearchModalOpen] =
    useState(false)
  // const doSomething = async () => {}

  function handleOpenAdvancedSearchModal () {
    setIsAdvancedSearchModalOpen(true)
  }

  function handleCloseAdvancedSearchModal () {
    setIsAdvancedSearchModalOpen(false)
  }

  return (
    <AdvancedSearchContext.Provider
      value={{
        isAdvancedSearchModalOpen,
        handleOpenAdvancedSearchModal,
        handleCloseAdvancedSearchModal
      }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  )
}
