function anagrams(str1, str2) {
  // Your code here
  if (str1.length !== str2.length) return false;

  const chars = {};

  for (let i = 0; i < str1.length; i++) {
    if (!chars[str1[i]]) {
      chars[str1[i]] = 0;
    }

    chars[str1[i]]++;
  }

  for (let i = 0; i < str2.length; i++) {
    if (!chars[str2[i]]) {
      return false;
    } else {
      chars[str2[i]]--;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {
  // Your code here
  const elements = new Set(arr1);
  const commons = [];

  for (let i = 0; i < arr2.length; i++) {
    if (elements.has(arr2[i])) {
      commons.push(arr2[i]);
    }
  }

  return commons;
}


function duplicate(arr) {
  // Your code here
  const numbers = {};

  for (let i = 0; i < arr.length; i++) {
    if (numbers[arr[i]]) {
      return arr[i];
    }

    numbers[arr[i]] = true;
  }
}


function twoSum(nums, target) {
  // Your code here
  const numsTable = {};

  for (let i = 0; i < nums.length; i++) {
    if (numsTable[target - nums[i]]) return true;

    numsTable[nums[i]] = true;
  }

  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let count = 0;
  const patternsTable = {};

  for (let i = 0; i < strings.length; i++) {
    if (!patternsTable[strings[i]]) {
      patternsTable[strings[i]] = alphabet[count];
      count++;
    }

    if (pattern[i] !== patternsTable[strings[i]]) return false;
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
