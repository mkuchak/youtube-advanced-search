import {
  ChangeEvent,
  createContext,
  MouseEvent,
  ReactNode,
  useEffect,
  useState
} from 'react'

interface AdvancedSearchSettings {
  country: string | null;
  category: number | null;
  startDate: Date | null;
  endDate: Date | null;
  sortBy: string | null;
  duration: string | null;
  features: string[];
}

interface AdvancedSearchContextData {
  advancedSearchSettings: AdvancedSearchSettings;
  totalSelectedSettings: (settings: AdvancedSearchSettings) => number;
  handleSelectOption: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (date: Date, type: string) => void;
  handleSelectOne: (e: MouseEvent<HTMLButtonElement>) => void;
  handleSelectMany: (e: MouseEvent<HTMLButtonElement>) => void;
  handleResetSettings: () => void;
  isAdvancedSearchModalOpen: boolean;
  handleOpenAdvancedSearchModal(): void;
  handleCloseAdvancedSearchModal(): void;
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
  const [advancedSearchSettings, setAdvancedSearchSettings] =
    useState<AdvancedSearchSettings>({
      country: null,
      category: null,
      startDate: null,
      endDate: null,
      sortBy: null,
      duration: null,
      features: []
    })
  const [isAdvancedSearchModalOpen, setIsAdvancedSearchModalOpen] =
    useState(false)

  useEffect(() => {
    const advancedSearchSettings = localStorage.getItem(
      'advancedSearchSettings'
    )

    if (advancedSearchSettings) {
      const advancedSearchSettingsParsed = JSON.parse(advancedSearchSettings)
      advancedSearchSettingsParsed.startDate =
        advancedSearchSettingsParsed.startDate
          ? new Date(advancedSearchSettingsParsed.startDate)
          : null
      advancedSearchSettingsParsed.endDate =
        advancedSearchSettingsParsed.endDate
          ? new Date(advancedSearchSettingsParsed.endDate)
          : null
      setAdvancedSearchSettings(advancedSearchSettingsParsed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'advancedSearchSettings',
      JSON.stringify(advancedSearchSettings)
    )
  }, [advancedSearchSettings])

  function totalSelectedSettings (settings: AdvancedSearchSettings) {
    return Object.values(settings).reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        return acc + curr.length
      }
      return (curr !== null && curr !== '') ? acc + 1 : acc
    }, 0)
  }

  function handleSelectOption ({
    currentTarget: { name, value }
  }: ChangeEvent<HTMLSelectElement>) {
    setAdvancedSearchSettings((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  function handleDateChange (date: Date | null, type: string) {
    setAdvancedSearchSettings((prevState) => ({
      ...prevState,
      [type]: date
    }))
  }

  function handleSelectOne ({
    currentTarget: { name, innerText: value }
  }: MouseEvent<HTMLButtonElement>) {
    const option = advancedSearchSettings[name as keyof AdvancedSearchSettings]

    if (option === value) {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        [name]: null
      }))
    } else {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  function handleSelectMany ({
    currentTarget: { name, innerText: value }
  }: MouseEvent<HTMLButtonElement>) {
    const options = advancedSearchSettings[
      name as keyof AdvancedSearchSettings
    ] as string[]

    if (options.includes(value)) {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        [name]: options.filter((v) => v !== value)
      }))
    } else {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        [name]: [...options, value]
      }))
    }
  }

  function handleResetSettings () {
    setAdvancedSearchSettings({
      country: null,
      category: null,
      startDate: null,
      endDate: null,
      sortBy: null,
      duration: null,
      features: []
    })
  }

  function handleOpenAdvancedSearchModal () {
    setIsAdvancedSearchModalOpen(true)
  }

  function handleCloseAdvancedSearchModal () {
    setIsAdvancedSearchModalOpen(false)
  }

  return (
    <AdvancedSearchContext.Provider
      value={{
        advancedSearchSettings,
        totalSelectedSettings,
        handleSelectOption,
        handleDateChange,
        handleSelectOne,
        handleSelectMany,
        handleResetSettings,
        isAdvancedSearchModalOpen,
        handleOpenAdvancedSearchModal,
        handleCloseAdvancedSearchModal
      }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  )
}
