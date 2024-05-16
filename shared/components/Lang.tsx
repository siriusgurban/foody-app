import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Lang = () => {
  const { t, i18n } = useTranslation()

  const [langDropdown, setLangDropdown] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  const clickHandle = async (lang: string) => {
    await i18n.changeLanguage(lang)
    setSelectedLanguage(lang)
    setLangDropdown(false)
  }

  const toggleDropDown = () => {
    setLangDropdown(!langDropdown)
  }

  return (
    <div className=" relative max-w-[41px]">
      <Image
        className="cursor-pointer mx-2"
        width={40}
        height={0}
        src={`/languages/${selectedLanguage}.svg`}
        alt={`/${selectedLanguage}Flag`}
        onClick={toggleDropDown}
      />
      {langDropdown && (
        <div
          className={`flex flex-col gap-4 w-max bg-admin-secondary
           px-2 py-4 absolute shadow-lg z-10 top-12 left-0 `}
        >
          <Image
            className="cursor-pointer hover:scale-95 transition-all duration-500"
            width={40}
            height={0}
            src={'/languages/en.svg'}
            alt="EnFlag"
            onClick={() => clickHandle('en')}
          />
          <hr />
          <Image
            className="cursor-pointer hover:scale-95 transition-all duration-500"
            width={40}
            height={0}
            src={'/languages/az.svg'}
            alt="AzFlag"
            onClick={() => clickHandle('az')}
          />
        </div>
      )}
    </div>
  )
}
