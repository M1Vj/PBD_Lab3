# Part 1: Static Limitations

The static reference is useful for showing the planned UI, but it has clear limits:

- It does not connect to a weather API, so the values can become outdated immediately.
- The city field cannot trigger a new search.
- The interface cannot show loading, success, or error states.
- Every content change has to be edited by hand in the HTML.
- The layout can demonstrate the design, but it cannot prove that the application works like a real weather app.

In short, the static version is good for presentation but not good for real use. That is why the project moves into the React implementation in Part 2.
