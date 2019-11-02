
## High Priority

- desktop view has a side bar instead of dialog (get instant feedback, no need to save changes in dialog), but still use dialog for mobile.

- dragging multiple items (might have to build drag code from scratch…)

- when key press arrow keys, move selected item 1 pixel in that direction, then run collision test.

- collision test procedure – check to see if item is within page, if not, move it.

- create new puzzle

- delete selected puzzle.

- When create word search puzzle, it is part of a group. if you delete either puzzle or words list, you delete them all.

- implement undo/redo

- implement creating text boxes

- random word placement is too mechanical, and hence predictable. If a couple of words are placed along one axis first (ie horizontal, vertical or diagonally(, its more than likely that all of them will be. Ideas:
  - change algortihm so we try a random direction for all cells, before switching to another random direction and then trying that for all cells. at the moment we try all random directions for one cell at a time.
  - divide number of avaliable directions by number of words. Apply 33% chance that each word will be assigned its pre-set direction, or otherwise randomly chose a direction as normal. 

- export selected puzzle as svg


## Low Priority

- interactive placement hints for making crossword puzzles (??)

- seed for random puzzle generation, that way you can reproduce a particular puzzle, making debugging easier

- rearrange word tags once youve added them

## Tutorial

```
Welcome to Puzzle Pad - a simple website for making printable puzzles
Each puzzle you make is randomly generated. After you add a puzzle, select it and click Settings to change how it looks. Have fun!
[ok]
```

```
Notes for word search generation:
The following words will be filtered out:
if not 2-25 characters in length
duplicate words
offensive words
If the size of the grid you specified is too small it will be enlarged to fit the words.
The grid will also be enlarged to ensure there is at least 15% room left for random fill characters.
If you don’t allow offensive words, any offensive words in your list will be removed, as well as checking for the accidental creation of new offensive words when making the puzzle
```
