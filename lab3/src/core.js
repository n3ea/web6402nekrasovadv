/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const evenNumbers = [];
    for (let i = 2; i <= 20; i += 2) {
        evenNumbers.push(i);
    }
    return evenNumbers;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0; 
    for (let i = 1; i <= n; i++) { 
        sum += i; 
    }
    return sum; 
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    if (n === 1) {
        return 1;
    }
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    if (n < 0) {
        throw new Error("Факториал не определен для отрицательных чисел.");
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    if (n <= 0) {
        return false;
    }
    return (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n < 0) {
        throw new Error("n должно быть неотрицательным числом");
    }
    if (n === 0) return 0;
    if (n === 1) return 1;

    let f0 = 0; 
    let f1 = 1; 
    let fib = 0;

    for (let i = 2; i <= n; i++) {
        fib = f0 + f1; // F(n) = F(n-1) + F(n-2)
        f0 = f1; // Сдвигаем a на следующее число
        f1 = fib; // Сдвигаем b на следующее число
    }
    return fib;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    let currentValue = initialValue; // Храним текущее значение
    return function(newValue) {
        if (typeof operatorFn === 'function') {
            currentValue = operatorFn(currentValue, newValue); // Выполняем операцию
        }
        return currentValue; // Возвращаем текущее значение
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let current = start; // Храним текущее значение

    return function() {
        const valueToReturn = current; // Сохраняем текущее значение для возврата
        current += step; 
        return valueToReturn; 
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
        if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
            return true;
        }
        
        if (firstObject === secondObject) { 
            return true;
        }
    
        
        if (firstObject == null || secondObject == null || typeof firstObject !== 'object' || typeof secondObject !== 'object') {
            return false;
        }
    
        // Получаем массивы ключей обоих объектов
        const keysA = Object.keys(firstObject);
        const keysB = Object.keys(secondObject);
    
        // Сравниваем количество ключей
        if (keysA.length !== keysB.length) {
            return false;
        }
    
        // Сравниваем значения по ключам рекурсивно
        for (let key of keysA) {
            // Проверяем наличие ключа во втором объекте и сравниваем значения
            if (!keysB.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
                return false;
            }
        }
    
        return true; 
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
