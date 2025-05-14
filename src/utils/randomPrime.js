import isPrime from "./isPrime";

export default function randomPrime (min = 0, max = 1000) {
    let prime = 0;
    while (!isPrime(prime)) {
        const test = Math.floor(Math.random() * (max - min + 1)) + min;
        if (isPrime(test)) {
        prime = test;
        }
    }

    return prime;
}