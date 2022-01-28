import {
  ChangeEvent,
  createContext,
  MouseEvent,
  ReactNode,
  useEffect,
  useState
} from 'react'

interface AdvancedSearchSettings {
  regionCode: string | null;
  videoCategoryId: number | null;
  publishedBefore: Date | null;
  publishedAfter: Date | null;
  order: string | null;
  videoDuration: string | null;
  type: { [key: string]: string };
  features: { [key: string]: string };
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

const initialAdvancedSearchSettings: AdvancedSearchSettings = {
  regionCode: null,
  videoCategoryId: null,
  publishedBefore: null,
  publishedAfter: null,
  order: null,
  videoDuration: null,
  type: {},
  features: {}
}

export function AdvancedSearchProvider ({
  children
}: AdvancedSearchProviderProps) {
  const [advancedSearchSettings, setAdvancedSearchSettings] =
    useState<AdvancedSearchSettings>(initialAdvancedSearchSettings)
  const [isAdvancedSearchModalOpen, setIsAdvancedSearchModalOpen] =
    useState(false)

  useEffect(() => {
    const advancedSearchSettings = localStorage.getItem(
      'advancedSearchSettings'
    )

    if (advancedSearchSettings) {
      const advancedSearchSettingsParsed = JSON.parse(advancedSearchSettings)
      advancedSearchSettingsParsed.publishedBefore =
        advancedSearchSettingsParsed.publishedBefore
          ? new Date(advancedSearchSettingsParsed.publishedBefore)
          : null
      advancedSearchSettingsParsed.publishedAfter =
        advancedSearchSettingsParsed.publishedAfter
          ? new Date(advancedSearchSettingsParsed.publishedAfter)
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
      if (curr instanceof Object && !(curr instanceof Date)) {
        return acc + Object.keys(curr).length
      }
      return curr !== null && curr !== '' ? acc + 1 : acc
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
    currentTarget: { name, value }
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
    currentTarget: { name, value: selectedValue }
  }: MouseEvent<HTMLButtonElement>) {
    const options = advancedSearchSettings[
      name as keyof AdvancedSearchSettings
    ] as {}
    const { key, value } = JSON.parse(selectedValue)

    if (Object.keys(options).includes(key)) {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        [name]: {
          ...Object.fromEntries(
            Object.entries(options).filter(([k]) => k !== key)
          )
        }
      }))
    } else {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        [name]: {
          ...options,
          [key]: value
        }
      }))
    }
  }

  // function handleSelectMany ({
  //   currentTarget: { name, innerText: value }
  // }: MouseEvent<HTMLButtonElement>) {
  //   const options = advancedSearchSettings[
  //     name as keyof AdvancedSearchSettings
  //   ] as string

  //   if (options.includes(value)) {
  //     setAdvancedSearchSettings((prevState) => ({
  //       ...prevState,
  //       [name]: options.filter((v) => v !== value)
  //     }))
  //   } else {
  //     setAdvancedSearchSettings((prevState) => ({
  //       ...prevState,
  //       [name]: [...options, value]
  //     }))
  //   }
  // }

  function handleResetSettings () {
    setAdvancedSearchSettings(initialAdvancedSearchSettings)
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
