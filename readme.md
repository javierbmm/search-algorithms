# Search algorithms

Project to explore different search-path algorithms within a set of routes given in a json file.

## How to

In order to execute/run the program, you must setup a local server and execute the project as a plain/static web.

Or you can just check it in this GitHub Pages (from this repository):
https://javierbmm.github.io/search-algorithms/

## About

### A*

From https://www.educative.io/edpresso/what-is-the-a-star-algorithm

*A * algorithm is a searching algorithm that searches for the shortest path between the initial and the final state. It
is used in various applications, such as maps.*

*In maps the A\* algorithm is used to calculate the shortest distance between the source (initial state) and the
destination
(final state).*

The algorithm has three parameters: the costs of moving from the initial cell to current cell, the heuristic value, and
the sum of the two parameters. The algorithm will then rearrange the distances from the shortest to longest distance, at
every node visited. It also allows us to cut execution costs by not having to visit every node in the map. This is
because the duration between cities of the two places are taken into consideration, not the closest one.

#### Heuristic value

As mentioned before, A* algorithms have heuristics Euclidean distance values from itself to the node destination. In our
program, we allow the user to choose both the source and destination city. We were asked to calculate the distances in a
straight line, so we chose to do the calculations as Euclidian, in order to provide an estimate that is less or equal to
the actual cost of the path.

### CSP

Standard search problems can search in a space of states, while constraint search problems serve as a generally proposed
heuristic. Constraint satisfaction problems are made up of a finite set of variables that represent the finite domain of
values, and a set of constraints. Each variable in this space must have to satisfy constraints that they are given. We
used the backtracking algorithm in order to loop through each set, in our solution space, checking at each branch, if
the path meets the constraints we specify in our CSP.

#### Constraints

The constraints that we chose to consider for our CSP was that we should not go through the same city twice and to
eliminate loops. Another constraint was to not travel more than the sum of all the distances calculated in the map. We
want to find a path that is less than or equal to the best path cost so we cannot take distances that are larger than
needed.

####Heuristic value

In the case of our implementation, we calculated the heuristic distance between the node and the destination node as the
straight line between them based on the longitude and latitude values.