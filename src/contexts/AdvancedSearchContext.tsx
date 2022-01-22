import { createContext, ReactNode, useEffect, useState } from 'react'

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
  handleSelectCountry: (country: string) => void;
  handleSelectCategory: (category: number) => void;
  handleStartDateChange: (date: Date) => void;
  handleEndDateChange: (date: Date) => void;
  handleSelectSortBy: (sortBy: string) => void;
  handleSelectDuration: (duration: string) => void;
  handleSelectFeature: (feature: string) => void;
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
      setAdvancedSearchSettings(JSON.parse(advancedSearchSettings))
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
        return curr.length > 0 ? acc + curr.length : acc
      }
      return curr !== null && curr !== 'any' && curr !== -1 ? acc + 1 : acc
    }, 0)
  }

  function handleSelectCountry (country: string) {
    setAdvancedSearchSettings((prevState) => ({
      ...prevState,
      country
    }))
  }

  function handleSelectCategory (category: number) {
    setAdvancedSearchSettings((prevState) => ({
      ...prevState,
      category
    }))
  }

  function handleStartDateChange (date: Date | null) {
    setAdvancedSearchSettings((prevState) => ({
      ...prevState,
      startDate: date
    }))
  }

  function handleEndDateChange (date: Date | null) {
    setAdvancedSearchSettings((prevState) => ({
      ...prevState,
      endDate: date
    }))
  }

  function handleSelectSortBy (sortBy: string) {
    if (advancedSearchSettings.sortBy === sortBy) {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        sortBy: null
      }))
    } else {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        sortBy
      }))
    }
  }

  function handleSelectDuration (duration: string) {
    if (advancedSearchSettings.duration === duration) {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        duration: null
      }))
    } else {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        duration
      }))
    }
  }

  function handleSelectFeature (feature: string) {
    const features = advancedSearchSettings.features

    if (features.includes(feature)) {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        features: features.filter((f) => f !== feature)
      }))
    } else {
      setAdvancedSearchSettings((prevState) => ({
        ...prevState,
        features: [...features, feature]
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
        handleSelectCountry,
        handleSelectCategory,
        handleStartDateChange,
        handleEndDateChange,
        handleSelectSortBy,
        handleSelectDuration,
        handleSelectFeature,
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
