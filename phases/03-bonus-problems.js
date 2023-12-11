function kth(str, k) {
    // char frequency table
    const countTable = {};

    // counting each char's frequency
    for (let i = 0; i < str.length; i++) {
        if (!countTable[str[i]]) {
            countTable[str[i]] = 0;
        }

        countTable[str[i]]++;
    }

    // order table's keys according to the frequency
    const order = Object.keys(countTable).sort((a, b) => countTable[b] - countTable[a]);

    return order[k - 1];
}

// console.log(kth('aaabbc', 1));     //  => 'a'
// console.log(kth('aaabbc', 2));     //  => 'b'
// console.log(kth('aaabbc', 3));     //  => 'c'

function newAlphabet(str, order) {
    const lettersOrder = {};

    for (let i = 0; i < order.length; i++) {
        lettersOrder[order[i]] = i;
    }

    for (let i = 0; i < str.length; i++) {
        if (lettersOrder[str[i]] < lettersOrder[str[i - 1]]) {
            return false;
        }
    }

    return true;
}

// console.log(newAlphabet('dino', 'abcdefghijklmnopqrstuvwxyz'));           // => true
// console.log(newAlphabet('leetcode', 'abcdefghijklmnopqrstuvwxyz'));       // => false
// console.log(newAlphabet('leetcod', 'labefghijkmnpqrstucvowxdyz'));        // => true

function longestPalindrome(str) {
    const charFrequency = {};

    for (let i = 0; i < str.length; i++) {
        if (!charFrequency[str[i]]) {
            charFrequency[str[i]] = 0;
        }

        charFrequency[str[i]]++;
    }

    const charValues = Object.values(charFrequency);
    let length = 0;
    let hasOddValues = false;

    for (let i = 0; i < charValues.length; i++) {
        if (charValues[i] % 2 !== 0 && !hasOddValues) {
            length++;
            hasOddValues = true;
        }

        length += charValues[i] - (charValues[i] % 2);
    }

    return length;
}

// console.log(longestPalindrome("abccccdd"));     //  => 7 because the palindrome "dccaccd" can be built.

function longestSubstr(str) {
    return new Set(str).size;
}

// console.log(longestSubstr("abcabcbb"));      // => 3, where the longest substring is "abc"
// console.log(longestSubstr("bbbbb"));         // => 1, where the longest substring is "b"

function maxSubarr(arr) {
    const numbersFrequency = {};

    for (let i = 0; i < arr.length; i++) {
        if (!numbersFrequency[arr[i]]) {
            numbersFrequency[arr[i]] = 0;
        }

        numbersFrequency[arr[i]]++;
    }

    const nums = Object.keys(numbersFrequency);
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        let length = 0;
        length += numbersFrequency[nums[i]];
        let possibleMax = parseInt(nums[i]) + 1;

        if (numbersFrequency[possibleMax]) {
            length += numbersFrequency[possibleMax];
        }

        if (length > max) max = length;
    }

    return max;
}

// console.log(maxSubarr([1,3,2,2,5,2,3,7]));  // => 5 because the longest subarray is [3,2,2,2,3]
// console.log(maxSubarr([1,1,1,1,3]));     // => 4 because the longest subarray is [1,1,1,1]

function coinChange(coins, value) {
    // cache for the minimum amount of coins needed for the remain values
    const minCache = {};

    // set the minCache values
    const setMin = function(remain = value) {
        // base case
        if (remain === 0) {
            minCache[0] = 0;
            return 0;
        } else if (minCache[remain]) { // accessing cache, saving time
            return minCache[remain];
        }

        // iterate through each coin to find all combinations
        for (let i = 0; i < coins.length; i++) {
            // look for a coin that don't exceed the change
            if (remain - coins[i] >= 0) {
                // if found, add one to the amount, + the minimum for the remain value
                const currAmount = 1 + setMin(remain - coins[i]);

                // create the current remain cache or change it if a minor amount was found
                if (!minCache[remain] || (typeof currAmount === 'number' && currAmount < minCache[remain])) {
                    minCache[remain] = currAmount;
                }
            }
        }

        return minCache[remain];
    }

    setMin();

    return minCache[value] !== undefined ? minCache[value] : -1;
}

// const coins = [1, 5, 10, 25];
// const coins2 = [5];

// console.log(coinChange(coins, 11));      // => 2, 10 + 1 = 11
// console.log(coinChange(coins2, 3));      // => -1
// console.log(coinChange(coins2, 0));      // => 0

function climbingSteps(n) {
    // steps cache
    const stepCache = {};

    const checkStepCombinations = function(remain = n) {
        // base case: +1 if all steps was taken or +cache of remaining steps
        if (remain === 0) {
            return 1;
        } else if (stepCache[remain]) {
            return stepCache[remain];
        }

        stepCache[remain] = 0;

        // iterate through each possible steps / turn
        for (let i = 1; i <= 3; i++) {
            if (remain - i >= 0) {
                // add amount of combinations of the remaining steps (step case)
                stepCache[remain] += checkStepCombinations(remain - i);
            }
        }

        return stepCache[remain];
    }

    return checkStepCombinations();
}

// // There is 1 way to climb zero steps:
// //   1. 0 steps
// console.log(climbingSteps(0));  // 1

// // There is 1 ways to climb one step:
// //   1. 1 step
// console.log(climbingSteps(1));  // 1

// // There are 2 ways to climb two steps:
// //   1. 1 step + 1 step
// //   2. 2 steps
// console.log(climbingSteps(2));  // 2

// // There are 4 ways to climb three steps:
// //   1. 1 step + 1 step + 1 step
// //   2. 1 step + 2 steps
// //   3. 2 steps + 1 step
// //   4. 3 steps
// console.log(climbingSteps(3));  // 4

// // There are 7 ways to climb four steps:
// //   1. 1 step + 1 step + 1 step + 1 step
// //   2. 1 step + 1 step + 2 steps
// //   3. 1 step + 2 steps + 1 step
// //   4. 2 steps + 1 step + 1 step
// //   5. 1 step + 3 steps
// //   6. 3 steps + 1 steps
// //   7. 2 steps + 2 steps ** forgot
// console.log(climbingSteps(4));  // 7
