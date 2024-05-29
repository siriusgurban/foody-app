import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Lang = ({ bg = 'admin-secondary' }) => {
  const { i18n } = useTranslation()

  const { locale, locales, push, pathname } = useRouter()

  const [langDropdown, setLangDropdown] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  const clickHandle = async (lang: string) => {
    await i18n.changeLanguage(lang)
    setSelectedLanguage(lang)
    setLangDropdown(false)
    push('/', undefined, { locale: lang + `${pathname}` })
  }

  // const clickHandle = async (lang: string) => {
  //   await i18n.changeLanguage(lang)
  //   setSelectedLanguage(lang)
  //   setLangDropdown(false)
  // }

  const toggleDropDown = () => {
    setLangDropdown(!langDropdown)
  }

  return (
    <div className="relative max-w-10">
      <Image
        className="cursor-pointer"
        width={40}
        height={0}
        src={`/languages/${selectedLanguage}.svg`}
        alt={`/${selectedLanguage}Flag`}
        onClick={toggleDropDown}
      />
      {langDropdown && (
        <div
          className={`flex flex-col gap-4 w-max bg-${bg}
           px-2 py-4 absolute shadow-lg z-10 top-12 -left-2 `}
        >
          <Image
            className="cursor-pointer hover:scale-95 transition-all duration-500"
            width={40}
            height={40}
            src={'/languages/en.svg'}
            alt="EnFlag"
            onClick={() => clickHandle('en')}
          />
          <hr />
          <Image
            className="cursor-pointer hover:scale-95 transition-all duration-500"
            width={40}
            height={40}
            src={'/languages/az.svg'}
            alt="AzFlag"
            onClick={() => clickHandle('az')}
          />
        </div>
      )}
    </div>
  )
}
