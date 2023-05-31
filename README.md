# wikipedia-search-engine

* introduce a debounce function that wraps the generateResults function call within a timer. The debounce function clears any previous timers and sets a new timer based on the specified delay. This ensures that the generateResults function is only called once the user stops typing for the specified delay period (300 milliseconds in this example).
* By using the debounce technique, we can prevent excessive API requests and improve performance by reducing unnecessary requests while the user is actively typing.
