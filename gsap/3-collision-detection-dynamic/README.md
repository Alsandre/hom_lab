currently only thing that I achieved for dynamicty of elastic collision system is dynamic creation of elements.
general dynamic logic does not work, not for floor collision (because element does not stop as it should) nor element collision (they do overlap)

on the performance hand detection logic should be fired per frame and per frame O(n^2) time complexity task is run. this is very inefficient.
