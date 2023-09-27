import { useState } from 'react'
import { toast } from 'react-toastify'

import { crypt, decrypt } from './cipher'
import { useMediaQuery } from './hooks/useMediaQuery'

function App() {
    const [message, setMessage] = useState<string>('')
    const [key, setKey] = useState<number>(5)
    const [result, setResult] = useState<string>('')

    const isMedia568 = useMediaQuery(568)

    const handleCrypt = () => {
        const encryptedMessage = crypt(key, message.replace(/\s/g, ""))
        setResult(encryptedMessage)
    }

    const handleDecrypt = () => {
        const encryptedMessage = decrypt(key, message)
        setResult(encryptedMessage)
    }

    const copy = async (): Promise<void> => {
        await navigator.clipboard.writeText(result)
        toast.success('Текст скопирован!')
    }

    return (
        <div className='container'>
            <div className='input-block'>
                <input
                    className='input'
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Введите сообщение...'
                />
                {message && (
                    <button
                        className='clear'
                        onClick={() => setMessage('')}
                    >
                        X
                    </button>
                )}
                <button
                    className='btn'
                    onClick={handleCrypt}
                >
                    {!isMedia568 ? 'Зашифровать' : 'Crypt'}
                </button>
                <button
                    className='btn right'
                    onClick={handleDecrypt}
                >
                    {!isMedia568 ? 'Расшифровать' : 'Decrypt'}
                </button>
            </div>
            <div className='block-key'>
                <input
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Ключ для шифрования (к примеру 5)"
                    type="number"
                    value={key}
                    className='input key'
                    onChange={(e) => setKey(+e.target.value)}
                />
            </div>
            {!!result && (
                <div className='result'>
                    <span>Результат:</span>
                    <span>{result}</span>
                    <button
                        className='btn copy'
                        onClick={copy}
                        disabled={!result}
                    >
                        Скопировать
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
