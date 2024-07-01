class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}
// console.log(new TrieNode());
class Trie {
  constructor() {
    this.root = new TrieNode();
    // root  = TriNodes Children
  }

  insert(word) {
    console.log(word);
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  getWords(prefix) {
    let node = this.root;
    const words = [];

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children[char]) {
        return words;
      }
      node = node.children[char];
    }

    this.traverseWords(node, prefix, words);
    return words;
  }

  traverseWords(node, word, words) {
    if (node.isEndOfWord) {
      words.push(word);
    }

    for (const char in node.children) {
      this.traverseWords(node.children[char], word + char, words);
    }
  }
}

export default function createTrie(words) {
  const trie = new Trie();
  words && words?.forEach((word) => trie.insert(word));
  return trie;
}
