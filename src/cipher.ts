export function crypt(key: number, word: string): string {
    // Проверка наличия ключа и слова
    if (!key || !word) {
        return "Введите ключ и слово"
    }

    // Проверка валидности ключа (число от 1 до длины слова)
    if (isNaN(key) || key < 1 || key > word.length) {
        return "Неверный ключ"
    }

    // Создание таблицы для шифрования
    let table: string[][] = []

    // создаем в массиве пустые массивы (их количество равно ключу)
    for (let i = 0; i < key; i++) {
        table.push([])
    }

    // Заполнение таблицы по столбцам
    let rowIndex = 0
    for (let i = 0; i < word.length; i++) {
        table[rowIndex].push(word[i])
        rowIndex = (rowIndex + 1) % key
    }

    // Считывание зашифрованного слова по строкам таблицы
    let result = ""
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < table[i].length; j++) {
            result += table[i][j]
        }
    }

    return result
}

export function decrypt(key: number, text: string): string {
    let result: string[] = []

    // длина зашифрованного текста
    const lengthText = text.length
    // кол-во премежутков по ключу
    const whole = Math.floor(lengthText / key)
    // не вошедший в промежуток остаток
    const reminder = lengthText - (whole * key)

    let digits: number[] = []

    // если остаток больше 0, то в массив добавится 1
    for (let i = 0; i < reminder; i++) {
        digits.push(1)
    }

    // если остаток меньше ключа, то в массив добавится 0
    for (let i = reminder; i < key; i++) {
        digits.push(0)
    }

    let begin = 0

    for (let i = 0; i < digits.length; i++) {
        const number = digits[i]
        const end = begin + whole + number
        const substring = text.slice(begin, end)
        begin += whole + number
        result.push(substring)
    }

    let decipher = ""
    const n = result[0].length

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < result.length; j++) {
            if (i < result[j].length) {
                decipher += result[j][i]
            }
        }
    }

    return decipher
}