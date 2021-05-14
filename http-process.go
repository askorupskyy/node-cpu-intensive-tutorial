package main

import (
  "fmt"
  "net/http"
)

func main() {
  http.HandleFunc("/", HelloServer)
  http.ListenAndServe(":7000", nil)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	var sum uint64 = 0
	var i uint64
	for i = 0; i < 999999999; i++ {
		sum += i
	}
  fmt.Fprintf(w, "%d",sum)
}