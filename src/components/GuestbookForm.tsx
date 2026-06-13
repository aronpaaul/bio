import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from '../i18n/useTranslation'

interface GuestbookFormProps {
  onSubmit: (name: string, message: string) => Promise<boolean>
}

export function GuestbookForm({ onSubmit }: GuestbookFormProps) {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (website) {
      return
    }
    const accepted = await onSubmit(name, message)
    if (accepted) {
      setName('')
      setMessage('')
    }
  }

  return (
    <form className="guestForm" onSubmit={handleSubmit}>
      <input
        className="hpField"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
      />
      <div className="formRow">
        <label>{t.formName}</label>
        <input
          className="retroInput"
          maxLength={32}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="formRow">
        <label>{t.formMessage}</label>
        <textarea
          className="retroInput"
          maxLength={280}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <button type="submit" className="navButton">{t.formSubmit}</button>
    </form>
  )
}
